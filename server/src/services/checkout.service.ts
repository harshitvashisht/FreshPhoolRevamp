import { Cadence, Offering, ProductCategory, type Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../lib/httpError.js";

const PUJA_HINT =
  /puja|jasmine|marigold|lotus|tulsi|bilva|betel|mango/i;

export type CartItem = {
  name: string;
  qty: number;
  cadence?: string;
  duration_days?: number;
  durationDays?: number;
  offering?: string;
  size?: string;
};

function asCadence(value: string | undefined): Cadence {
  if (value === "daily" || value === "weekly" || value === "monthly") return value;
  return "one_time";
}

function isRecurring(cadence: Cadence) {
  return cadence === "daily" || cadence === "weekly" || cadence === "monthly";
}

function deliveries(item: { cadence: Cadence; durationDays: number }) {
  if (item.cadence === "daily") return item.durationDays;
  if (item.cadence === "weekly") return Math.max(1, Math.round(item.durationDays / 7));
  if (item.cadence === "monthly") return Math.max(1, Math.round(item.durationDays / 30));
  return 1;
}

function lineTotal(item: {
  price: number;
  qty: number;
  cadence: Cadence;
  durationDays: number;
  offering: Offering;
}) {
  if (!item.price) return 0;
  if (item.offering === "puja_pack") return item.price * item.qty;
  return item.price * item.qty * deliveries(item);
}

function displayProductName(rawName: string) {
  // Colour choices are a storefront display concern. They map back to the base
  // catalog product; neither arbitrary product names nor prices are trusted.
  return rawName.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

async function resolveCatalogItems(items: CartItem[]) {
  const requestedNames = [...new Set(items.map((item) => item.offering === "puja_pack" ? "Daily Puja Pack" : displayProductName(item.name)))];
  const products = await prisma.product.findMany({
    where: { name: { in: requestedNames }, active: true },
    include: { variants: true },
  });
  const byName = new Map(products.map((product) => [product.name, product]));

  return items.map((raw) => {
    const productName = raw.offering === "puja_pack" ? "Daily Puja Pack" : displayProductName(raw.name);
    const product = byName.get(productName);
    if (!product) throw new HttpError(400, `\"${productName}\" is unavailable. Refresh the shop and try again.`);

    const cadence = asCadence(raw.cadence);
    const durationDays = Number(raw.duration_days ?? raw.durationDays ?? 1) || 1;
    const qty = Math.max(1, Number(raw.qty) || 1);
    const offering: Offering = product.category === ProductCategory.PACK
      ? "puja_pack"
      : product.category === ProductCategory.GARLAND
        ? "garland"
        : "stem";
    const variant = product.category === ProductCategory.PACK
      // Puja packs are priced by size and duration; delivery cadence controls the
      // fulfilment schedule, not the package price.
      ? product.variants.find((row) => row.size === raw.size && row.durationDays === durationDays)
      : undefined;
    const price = variant?.priceRupee ?? product.priceRupee;
    if (price === null || price === undefined || price <= 0) {
      throw new HttpError(400, `\"${product.name}\" is awaiting an admin price and cannot be checked out yet.`);
    }
    if (product.category === ProductCategory.PACK && !variant) {
      throw new HttpError(400, "That Puja Pack selection is no longer available. Refresh the shop and choose it again.");
    }
    return {
      productId: product.id,
      name: product.category === ProductCategory.PACK ? `Puja Pack · ${raw.size} · ${durationDays} days` : product.name,
      qty,
      unit: product.unit,
      price,
      cadence,
      durationDays,
      offering,
      size: product.category === ProductCategory.PACK ? raw.size ?? null : null,
      lineTotal: lineTotal({ price, qty, cadence, durationDays, offering }),
    };
  });
}

function orderKind(items: { cadence: Cadence }[]) {
  const rec = items.some((i) => isRecurring(i.cadence));
  const once = items.some((i) => !isRecurring(i.cadence));
  if (rec && once) return "mixed" as const;
  if (rec) return "subscription" as const;
  return "one_time" as const;
}

function deliveryWindow(items: { name: string }[]) {
  return items.some((i) => PUJA_HINT.test(i.name)) ? "puja" : "decorative";
}

async function nextOrderNumber(prefix: string) {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const head = `${prefix}-${today}-`;
  const last = await prisma.order.findFirst({
    where: { orderNumber: { startsWith: head } },
    orderBy: { orderNumber: "desc" },
    select: { orderNumber: true },
  });
  const n = last ? Number(last.orderNumber.slice(head.length)) + 1 : 1;
  return `${head}${String(n).padStart(4, "0")}`;
}

function addDays(d: Date, days: number) {
  const next = new Date(d);
  next.setDate(next.getDate() + days);
  return next;
}

export async function placeCheckout(input: {
  memberId: string;
  community: string;
  blockFlat: string;
  addressId?: string;
  notes?: string | null;
  items: CartItem[];
}) {
  if (!input.items.length) throw new HttpError(400, "Add flowers first");
  const member = await prisma.member.findUnique({ where: { id: input.memberId } });
  if (!member) throw new HttpError(401, "Member profile missing");

  const normalized = await resolveCatalogItems(input.items);

  const subtotal = normalized.reduce((sum, i) => sum + i.lineTotal, 0);
  const kind = orderKind(normalized);
  const window = deliveryWindow(normalized);

  const orderNumber = await nextOrderNumber("FP");
  const subHead = `SUB-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-`;
  const lastSub = await prisma.recurringOrder.findFirst({
    where: { subscriptionNumber: { startsWith: subHead } },
    orderBy: { subscriptionNumber: "desc" },
    select: { subscriptionNumber: true },
  });
  let subSeq = lastSub ? Number(lastSub.subscriptionNumber.slice(subHead.length)) : 0;

  const result = await prisma.$transaction(async (tx) => {
    const address = input.addressId
      ? await tx.address.findFirst({ where: { id: input.addressId, memberId: member.id } })
      : null;
    if (input.addressId && !address) throw new HttpError(404, "Selected delivery address was not found");
    if (!address && (!input.community.trim() || !input.blockFlat.trim())) {
      throw new HttpError(400, "Apartment and block / flat are required");
    }
    const deliveryAddress = address ?? await tx.address.create({
      data: {
        memberId: member.id,
        community: input.community.trim(),
        blockFlat: input.blockFlat.trim(),
        isDefault: false,
      },
    });

    const order = await tx.order.create({
      data: {
        orderNumber,
        memberId: member.id,
        addressId: deliveryAddress.id,
        community: deliveryAddress.community,
        blockFlat: deliveryAddress.blockFlat,
        kind,
        deliveryWindow: window,
        status: "payment_pending",
        subtotalRupee: subtotal,
        notes: input.notes ?? null,
        items: normalized as Prisma.InputJsonValue,
        lines: {
          create: normalized.map((i) => ({
            productId: i.productId,
            name: i.name,
            qty: i.qty,
            unit: i.unit,
            unitPrice: i.price,
            lineTotal: i.lineTotal,
            cadence: i.cadence,
            durationDays: i.durationDays,
            offering: i.offering,
            size: i.size,
          })),
        },
        payments: {
          create: {
            amountRupee: subtotal,
            status: "pending",
            provider: "razorpay",
          },
        },
      },
    });

    const start = new Date();
    const subscriptionNumbers: string[] = [];
    for (const item of normalized.filter((i) => isRecurring(i.cadence))) {
      subSeq += 1;
      const subscriptionNumber = `${subHead}${String(subSeq).padStart(4, "0")}`;
      subscriptionNumbers.push(subscriptionNumber);
      await tx.recurringOrder.create({
        data: {
          subscriptionNumber,
          memberId: member.id,
          sourceOrderId: order.id,
          offering: item.offering,
          name: item.name,
          size: item.size,
          qty: item.qty,
          durationDays: item.durationDays,
          cadence: item.cadence,
          prepaidAmountRupee: item.lineTotal,
          community: deliveryAddress.community,
          blockFlat: deliveryAddress.blockFlat,
          status: "pending_payment",
          periodStart: start,
          periodEnd: addDays(start, item.durationDays),
        },
      });
    }

    return { order, subscriptionNumbers };
  });

  return {
    orderNumber: result.order.orderNumber,
    subscriptionNumbers: result.subscriptionNumbers,
    deliveryOrderNumbers: [result.order.orderNumber],
    subtotalRupee: result.order.subtotalRupee,
    status: result.order.status,
  };
}

export async function getOrderByNumber(orderNumber: string, memberId?: string) {
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { lines: true, payments: true, recurring: true },
  });
  if (!order) throw new HttpError(404, "Order not found");
  if (memberId && order.memberId !== memberId) {
    throw new HttpError(403, "Forbidden");
  }
  return order;
}

export async function listMyOrders(memberId: string) {
  return prisma.order.findMany({
    where: { memberId },
    include: { lines: true, payments: true },
    orderBy: { createdAt: "desc" },
  });
}
