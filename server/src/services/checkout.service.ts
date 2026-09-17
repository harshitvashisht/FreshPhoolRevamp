import { Cadence, Offering, type Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../lib/httpError.js";

const PUJA_HINT =
  /puja|jasmine|marigold|lotus|tulsi|bilva|betel|mango/i;

export type CartItem = {
  name: string;
  qty: number;
  unit?: string;
  price?: number;
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

function asOffering(value: string | undefined): Offering {
  if (value === "puja_pack" || value === "garland" || value === "stem") return value;
  return "custom";
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

  const normalized = input.items.map((raw) => {
    const cadence = asCadence(raw.cadence);
    const offering = asOffering(raw.offering);
    const durationDays = Number(raw.duration_days ?? raw.durationDays ?? 1) || 1;
    const qty = Math.max(1, Number(raw.qty) || 1);
    const price = Number(raw.price) || 0;
    return {
      name: raw.name,
      qty,
      unit: raw.unit || "",
      price,
      cadence,
      durationDays,
      offering,
      size: raw.size ?? null,
      lineTotal: lineTotal({ price, qty, cadence, durationDays, offering }),
    };
  });

  const subtotal = normalized.reduce((sum, i) => sum + i.lineTotal, 0);
  const kind = orderKind(normalized);
  const window = deliveryWindow(normalized);

  const products = await prisma.product.findMany({
    where: { name: { in: [...new Set(normalized.map((i) => i.name.split(" (")[0]))] } },
  });
  const byName = Object.fromEntries(products.map((p) => [p.name, p]));

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
            productId: byName[i.name.split(" (")[0]]?.id ?? null,
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
