import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/asyncHandler.js";
import { HttpError } from "../lib/httpError.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import * as checkout from "../services/checkout.service.js";
import * as payment from "../services/payment.service.js";

export const ordersRouter = Router();

const cartItem = z.object({
  // Prices, units, and product IDs are deliberately never accepted from a browser.
  // Zod strips legacy display-only fields such as `price` from older cart payloads.
  name: z.string().trim().min(1).max(140),
  qty: z.number().int().min(1).max(100),
  cadence: z.enum(["one_time", "daily", "weekly", "monthly"]).optional(),
  duration_days: z.number().int().min(1).max(365).optional(),
  durationDays: z.number().int().min(1).max(365).optional(),
  offering: z.enum(["puja_pack", "garland", "stem", "custom"]).optional(),
  size: z.string().trim().min(1).max(40).optional(),
});

ordersRouter.post(
  "/checkout",
  requireAuth,
  requireRole("MEMBER", "ADMIN"),
  asyncHandler(async (req, res) => {
    if (!req.user?.memberId) throw new HttpError(400, "Member profile required");
    const body = z
      .object({
        community: z.string().optional(),
        block_flat: z.string().optional(),
        blockFlat: z.string().optional(),
        addressId: z.string().uuid().optional(),
        notes: z.string().nullable().optional(),
        items: z.array(cartItem).min(1),
      })
      .parse(req.body);

    const blockFlat = body.blockFlat || body.block_flat || "";
    if (!body.addressId && (!body.community || !blockFlat)) {
      throw new HttpError(400, "Apartment and block / flat are required");
    }

    const result = await checkout.placeCheckout({
      memberId: req.user.memberId,
      community: body.community || "",
      blockFlat,
      addressId: body.addressId,
      notes: body.notes,
      items: body.items,
    });
    res.status(201).json(result);
  }),
);

ordersRouter.get(
  "/me",
  requireAuth,
  requireRole("MEMBER", "ADMIN"),
  asyncHandler(async (req, res) => {
    if (!req.user?.memberId) throw new HttpError(400, "Member profile required");
    const orders = await checkout.listMyOrders(req.user.memberId);
    res.json(orders);
  }),
);

ordersRouter.post(
  "/:orderNumber/payment-order",
  requireAuth,
  requireRole("MEMBER", "ADMIN"),
  asyncHandler(async (req, res) => {
    const memberId = req.user?.role === "ADMIN" ? undefined : req.user?.memberId ?? undefined;
    res.json(await payment.createPaymentOrder(req.params.orderNumber, memberId));
  }),
);

ordersRouter.post(
  "/:orderNumber/verify-payment",
  requireAuth,
  requireRole("MEMBER", "ADMIN"),
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        razorpayOrderId: z.string().min(1),
        razorpayPaymentId: z.string().min(1),
        razorpaySignature: z.string().min(1),
      })
      .parse(req.body);
    const memberId = req.user?.role === "ADMIN" ? undefined : req.user?.memberId ?? undefined;
    res.json(await payment.verifyCheckoutPayment({ orderNumber: req.params.orderNumber, memberId, ...body }));
  }),
);

ordersRouter.post(
  "/:orderNumber/cash-on-delivery",
  requireAuth,
  requireRole("MEMBER", "ADMIN"),
  asyncHandler(async (req, res) => {
    const memberId = req.user?.role === "ADMIN" ? undefined : req.user?.memberId ?? undefined;
    res.json(await payment.chooseCashOnDelivery(req.params.orderNumber, memberId));
  }),
);

ordersRouter.post(
  "/:orderNumber/cancel",
  requireAuth,
  requireRole("MEMBER", "ADMIN"),
  asyncHandler(async (req, res) => {
    const memberId = req.user?.role === "ADMIN" ? undefined : req.user?.memberId ?? undefined;
    res.json(await payment.cancelOrder(req.params.orderNumber, memberId));
  }),
);

ordersRouter.get(
  "/:orderNumber/invoice",
  requireAuth,
  requireRole("MEMBER", "ADMIN"),
  asyncHandler(async (req, res) => {
    const memberId = req.user?.role === "ADMIN" ? undefined : req.user?.memberId ?? undefined;
    res.json(await payment.getInvoice(req.params.orderNumber, memberId));
  }),
);

ordersRouter.get(
  "/:orderNumber",
  requireAuth,
  requireRole("MEMBER", "ADMIN"),
  asyncHandler(async (req, res) => {
    const memberId = req.user?.role === "ADMIN" ? undefined : req.user?.memberId ?? undefined;
    const order = await checkout.getOrderByNumber(req.params.orderNumber, memberId);
    res.json(order);
  }),
);
