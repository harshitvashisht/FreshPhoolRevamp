import type { OrderStatus, RecurringStatus } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../lib/httpError.js";

const ORDER_LABEL: Record<OrderStatus, string> = {
  payment_pending: "Payment Pending",
  payment_received: "Payment Received",
  being_prepared: "Being Prepared",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const LABEL_TO_STATUS: Record<string, OrderStatus> = Object.fromEntries(
  Object.entries(ORDER_LABEL).map(([k, v]) => [v, k as OrderStatus]),
) as Record<string, OrderStatus>;

function istStart(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
  return new Date(`${parts}T00:00:00+05:30`);
}

export function serializeOrder(order: {
  id: string;
  orderNumber: string;
  community: string;
  blockFlat: string;
  kind: string;
  deliveryWindow: string;
  status: OrderStatus;
  subtotalRupee: number;
  items: unknown;
  paidAt: Date | null;
  createdAt: Date;
  notes: string | null;
  payments?: { provider: string; status: string }[];
}) {
  return {
    id: order.id,
    order_number: order.orderNumber,
    community: order.community,
    block_flat: order.blockFlat,
    kind: order.kind,
    delivery_window: order.deliveryWindow,
    status: ORDER_LABEL[order.status],
    subtotal: order.subtotalRupee,
    items: order.items,
    paid_at: order.paidAt,
    created_at: order.createdAt,
    notes: order.notes,
    payment_method: order.payments?.[0]?.provider ?? null,
    payment_status: order.payments?.[0]?.status ?? null,
  };
}

export async function listOpsBoard() {
  const [orders, recurring, members, payments, addresses] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { lines: true, payments: { orderBy: { createdAt: "desc" }, take: 1 } },
    }),
    prisma.recurringOrder.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.member.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.payment.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.address.findMany(),
  ]);

  const today = istStart();
  const week = new Date(today);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
  }).format(today);
  const map: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  week.setDate(week.getDate() - (map[weekday] ?? 0));
  const monthParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
  }).format(today);
  const month = new Date(`${monthParts}-01T00:00:00+05:30`);

  const kpis = (from: Date) => {
    const slice = orders.filter((o) => o.createdAt >= from);
    const paid = slice.filter((o) => o.status !== "payment_pending" && o.status !== "cancelled");
    const pending = slice.filter((o) => o.status === "payment_pending");
    return {
      orders: slice.length,
      paid: paid.length,
      pending: pending.length,
      gmv: paid.reduce((s, o) => s + o.subtotalRupee, 0),
      newMembers: members.filter((m) => m.createdAt >= from).length,
      pendingPayments: payments.filter((p) => ["pending", "cash_on_delivery"].includes(p.status) && p.createdAt >= from).length,
      activeRecurring: recurring.filter((r) => r.status === "active").length,
    };
  };

  return {
    orders: orders.map(serializeOrder),
    recurring: recurring.map((r) => ({
      id: r.id,
      subscription_number: r.subscriptionNumber,
      offering: r.offering,
      name: r.name,
      size: r.size,
      qty: r.qty,
      duration_days: r.durationDays,
      prepaid_amount: r.prepaidAmountRupee,
      community: r.community,
      block_flat: r.blockFlat,
      status: r.status,
      period_start: r.periodStart.toISOString().slice(0, 10),
      period_end: r.periodEnd.toISOString().slice(0, 10),
      source_order_id: r.sourceOrderId,
    })),
    members,
    payments,
    addresses,
    kpis: {
      today: kpis(today),
      week: kpis(week),
      month: kpis(month),
    },
  };
}

export async function patchOrderStatus(id: string, statusLabel: string) {
  const status = LABEL_TO_STATUS[statusLabel] ?? (statusLabel as OrderStatus);
  if (!ORDER_LABEL[status as OrderStatus]) {
    throw new HttpError(400, "Unknown order status");
  }
  const data: { status: OrderStatus; paidAt?: Date } = { status: status as OrderStatus };
  if (status === "payment_received") data.paidAt = new Date();

  const order = await prisma.$transaction(async (tx) => {
    const updated = await tx.order.update({ where: { id }, data });
    if (status === "payment_received") {
      const confirmedAt = new Date();
      await tx.payment.updateMany({
        where: { orderId: id, status: { in: ["pending", "cash_on_delivery"] } },
        data: { status: "confirmed", confirmedAt },
      });
      const payment = await tx.payment.findFirst({ where: { orderId: id, status: "confirmed" }, orderBy: { confirmedAt: "desc" } });
      if (payment) {
        await tx.invoice.upsert({
          where: { orderId: id },
          create: {
            orderId: id,
            paymentId: payment.id,
            invoiceNumber: `INV-${updated.orderNumber}`,
            amountRupee: payment.amountRupee,
          },
          update: { paymentId: payment.id, amountRupee: payment.amountRupee, issuedAt: confirmedAt },
        });
      }
      await tx.recurringOrder.updateMany({
        where: { sourceOrderId: id, status: "pending_payment" },
        data: { status: "active" },
      });
    }
    return updated;
  });
  return serializeOrder(order);
}

export async function patchRecurring(
  id: string,
  body: { status?: RecurringStatus; qty?: number },
) {
  const data: { status?: RecurringStatus; qty?: number } = {};
  if (body.status) data.status = body.status;
  if (typeof body.qty === "number") data.qty = Math.max(1, body.qty);
  const row = await prisma.recurringOrder.update({ where: { id }, data });
  return row;
}

export async function exportRows(dataset: string, from: Date, to: Date) {
  if (dataset === "orders") {
    return prisma.order.findMany({
      where: { createdAt: { gte: from, lte: to } },
      orderBy: { createdAt: "desc" },
    });
  }
  if (dataset === "lines") {
    return prisma.orderLine.findMany({
      where: { order: { createdAt: { gte: from, lte: to } } },
    });
  }
  if (dataset === "members") {
    return prisma.member.findMany({
      where: { createdAt: { gte: from, lte: to } },
      orderBy: { createdAt: "desc" },
    });
  }
  if (dataset === "payments") {
    return prisma.payment.findMany({
      where: { createdAt: { gte: from, lte: to } },
      orderBy: { createdAt: "desc" },
    });
  }
  if (dataset === "recurring") {
    return prisma.recurringOrder.findMany({
      where: { createdAt: { gte: from, lte: to } },
      orderBy: { createdAt: "desc" },
    });
  }
  throw new HttpError(400, "Unknown dataset");
}

export async function listMembers() {
  return prisma.member.findMany({
    include: {
      user: { select: { email: true, role: true, createdAt: true } },
      addresses: true,
      _count: { select: { orders: true, recurring: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function upsertProduct(input: {
  id?: string;
  slug: string;
  name: string;
  category: "STEM" | "PUJA" | "GARLAND" | "PACK";
  unit: string;
  priceRupee?: number | null;
  imageUrl?: string | null;
  active?: boolean;
  sortOrder?: number;
}) {
  if (input.id) {
    return prisma.product.update({
      where: { id: input.id },
      data: {
        slug: input.slug,
        name: input.name,
        category: input.category,
        unit: input.unit,
        priceRupee: input.priceRupee ?? null,
        imageUrl: input.imageUrl ?? null,
        active: input.active ?? true,
        sortOrder: input.sortOrder ?? 0,
      },
      include: { variants: true },
    });
  }
  return prisma.product.create({
    data: {
      slug: input.slug,
      name: input.name,
      category: input.category,
      unit: input.unit,
      priceRupee: input.priceRupee ?? null,
      imageUrl: input.imageUrl ?? null,
      active: input.active ?? true,
      sortOrder: input.sortOrder ?? 0,
    },
    include: { variants: true },
  });
}

export async function listAllProducts() {
  return prisma.product.findMany({
    include: { variants: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

export async function listCatalogSkus() {
  return prisma.catalogSku.findMany({
    orderBy: [{ sourceCategory: "asc" }, { name: "asc" }, { color: "asc" }],
  });
}

export async function listAllZones() {
  return prisma.deliveryZone.findMany({ orderBy: { pincode: "asc" } });
}

export async function upsertZone(input: {
  id?: string;
  pincode: string;
  locality: string;
  active?: boolean;
  notes?: string | null;
}) {
  if (input.id) {
    return prisma.deliveryZone.update({
      where: { id: input.id },
      data: {
        pincode: input.pincode,
        locality: input.locality,
        active: input.active ?? true,
        notes: input.notes ?? null,
      },
    });
  }
  return prisma.deliveryZone.create({
    data: {
      pincode: input.pincode,
      locality: input.locality,
      active: input.active ?? true,
      notes: input.notes ?? null,
    },
  });
}
