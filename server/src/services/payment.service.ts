import crypto from "node:crypto";
import { env } from "../config/env.js";
import { HttpError } from "../lib/httpError.js";
import { prisma } from "../lib/prisma.js";

type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
};

function credentials() {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new HttpError(503, "Razorpay is not configured yet");
  }
  return { keyId: env.RAZORPAY_KEY_ID, keySecret: env.RAZORPAY_KEY_SECRET };
}

async function razorpay(path: string, init: RequestInit = {}) {
  const { keyId, keySecret } = credentials();
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new HttpError(502, data?.error?.description || "Razorpay request failed");
  }
  return data;
}

async function ownedOrder(orderNumber: string, memberId?: string) {
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { member: true, payments: { orderBy: { createdAt: "desc" } }, invoice: true },
  });
  if (!order) throw new HttpError(404, "Order not found");
  if (memberId && order.memberId !== memberId) throw new HttpError(403, "Forbidden");
  return order;
}

export async function createPaymentOrder(orderNumber: string, memberId?: string) {
  const order = await ownedOrder(orderNumber, memberId);
  if (order.status !== "payment_pending") {
    throw new HttpError(409, "This order has already been paid or cannot be paid");
  }
  if (order.subtotalRupee <= 0) {
    throw new HttpError(400, "This order has items that need a price confirmation");
  }

  const existing = order.payments.find((payment) => payment.razorpayOrderId && payment.status === "pending");
  if (existing?.razorpayOrderId) {
    return {
      keyId: credentials().keyId,
      razorpayOrderId: existing.razorpayOrderId,
      amountPaise: existing.amountRupee * 100,
      currency: "INR",
      orderNumber: order.orderNumber,
      customer: { name: order.member?.name ?? "FreshPhool customer", email: order.member?.email ?? undefined, contact: order.member?.phoneE164 ?? undefined },
    };
  }

  const razorpayOrder = await razorpay("/orders", {
    method: "POST",
    body: JSON.stringify({
      amount: order.subtotalRupee * 100,
      currency: "INR",
      receipt: order.orderNumber,
      notes: { freshphool_order: order.orderNumber },
    }),
  }) as RazorpayOrder;

  const payment = order.payments[0]
    ? await prisma.payment.update({
        where: { id: order.payments[0].id },
        data: { provider: "razorpay", razorpayOrderId: razorpayOrder.id, providerRef: razorpayOrder.id },
      })
    : await prisma.payment.create({
        data: {
          orderId: order.id,
          amountRupee: order.subtotalRupee,
          provider: "razorpay",
          razorpayOrderId: razorpayOrder.id,
          providerRef: razorpayOrder.id,
        },
      });

  return {
    keyId: credentials().keyId,
    razorpayOrderId: payment.razorpayOrderId,
    amountPaise: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    orderNumber: order.orderNumber,
    customer: { name: order.member?.name ?? "FreshPhool customer", email: order.member?.email ?? undefined, contact: order.member?.phoneE164 ?? undefined },
  };
}

function validPaymentSignature(orderId: string, paymentId: string, signature: string) {
  const { keySecret } = credentials();
  const expected = crypto.createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  const actual = Buffer.from(signature);
  return actual.length === expected.length && crypto.timingSafeEqual(Buffer.from(expected), actual);
}

async function confirmPayment(input: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature?: string }) {
  const payment = await prisma.payment.findUnique({
    where: { razorpayOrderId: input.razorpayOrderId },
    include: { order: { include: { recurring: true, invoice: true } } },
  });
  if (!payment) throw new HttpError(404, "Payment order not found");

  const invoice = await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "confirmed",
        providerRef: input.razorpayPaymentId,
        razorpayPaymentId: input.razorpayPaymentId,
        razorpaySignature: input.razorpaySignature ?? null,
        confirmedAt: new Date(),
      },
    });
    await tx.order.update({
      where: { id: payment.orderId },
      data: { status: "payment_received", paidAt: new Date() },
    });
    await tx.recurringOrder.updateMany({
      where: { sourceOrderId: payment.orderId, status: "pending_payment" },
      data: { status: "active" },
    });
    return tx.invoice.upsert({
      where: { orderId: payment.orderId },
      create: {
        orderId: payment.orderId,
        paymentId: payment.id,
        invoiceNumber: `INV-${payment.order.orderNumber}`,
        amountRupee: payment.amountRupee,
      },
      update: { paymentId: payment.id, amountRupee: payment.amountRupee },
    });
  });
  return { invoice, orderNumber: payment.order.orderNumber };
}

export async function verifyCheckoutPayment(input: {
  orderNumber: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  memberId?: string;
}) {
  const order = await ownedOrder(input.orderNumber, input.memberId);
  if (!validPaymentSignature(input.razorpayOrderId, input.razorpayPaymentId, input.razorpaySignature)) {
    throw new HttpError(400, "Payment signature verification failed");
  }
  const payment = await prisma.payment.findUnique({ where: { razorpayOrderId: input.razorpayOrderId } });
  if (!payment || payment.orderId !== order.id) throw new HttpError(400, "Payment does not belong to this order");
  return confirmPayment(input);
}

export async function getInvoice(orderNumber: string, memberId?: string) {
  const order = await ownedOrder(orderNumber, memberId);
  if (!order.invoice) throw new HttpError(404, "Invoice is not available until payment is confirmed");
  return prisma.invoice.findUniqueOrThrow({
    where: { id: order.invoice.id },
    include: { order: { include: { lines: true, member: true } }, payment: true },
  });
}

export async function processWebhook(rawBody: Buffer, signature: string | undefined) {
  if (!env.RAZORPAY_WEBHOOK_SECRET || !signature) throw new HttpError(401, "Invalid webhook signature");
  const expected = crypto.createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest("hex");
  const actual = Buffer.from(signature);
  if (actual.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(expected), actual)) {
    throw new HttpError(401, "Invalid webhook signature");
  }
  const event = JSON.parse(rawBody.toString("utf8"));
  const payment = event?.payload?.payment?.entity;
  if (!payment?.order_id || !payment?.id) return;
  if (event.event === "payment.captured" || event.event === "order.paid") {
    await confirmPayment({ razorpayOrderId: payment.order_id, razorpayPaymentId: payment.id });
  }
  if (event.event === "payment.failed") {
    await prisma.payment.updateMany({
      where: { razorpayOrderId: payment.order_id, status: "pending" },
      data: { status: "failed", providerRef: payment.id },
    });
  }
}
