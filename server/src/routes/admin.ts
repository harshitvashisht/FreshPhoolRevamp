import { Router } from "express";
import { z } from "zod";
import { RecurringStatus } from "@prisma/client";
import { asyncHandler } from "../lib/asyncHandler.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import * as admin from "../services/admin.service.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("ADMIN"));

adminRouter.get(
  "/board",
  asyncHandler(async (_req, res) => {
    res.json(await admin.listOpsBoard());
  }),
);

adminRouter.patch(
  "/orders/:id",
  asyncHandler(async (req, res) => {
    const body = z.object({ status: z.string().min(1) }).parse(req.body);
    res.json(await admin.patchOrderStatus(req.params.id, body.status));
  }),
);

adminRouter.patch(
  "/recurring/:id",
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        status: z.nativeEnum(RecurringStatus).optional(),
        qty: z.number().int().positive().optional(),
      })
      .parse(req.body);
    res.json(await admin.patchRecurring(req.params.id, body));
  }),
);

adminRouter.get(
  "/export",
  asyncHandler(async (req, res) => {
    const query = z
      .object({
        dataset: z.enum(["orders", "lines", "members", "payments", "recurring"]),
        from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      })
      .parse(req.query);

    const from = new Date(`${query.from}T00:00:00+05:30`);
    const to = new Date(`${query.to}T23:59:59.999+05:30`);
    const rows = await admin.exportRows(query.dataset, from, to);
    res.json({ dataset: query.dataset, from: query.from, to: query.to, rows });
  }),
);

adminRouter.get(
  "/members",
  asyncHandler(async (_req, res) => {
    res.json(await admin.listMembers());
  }),
);

adminRouter.get(
  "/products",
  asyncHandler(async (_req, res) => {
    res.json(await admin.listAllProducts());
  }),
);

adminRouter.post(
  "/products",
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        slug: z.string().min(1),
        name: z.string().min(1),
        category: z.enum(["STEM", "PUJA", "GARLAND", "PACK"]),
        unit: z.string().min(1),
        priceRupee: z.number().int().nullable().optional(),
        imageUrl: z.string().nullable().optional(),
        active: z.boolean().optional(),
        sortOrder: z.number().int().optional(),
      })
      .parse(req.body);
    res.status(201).json(await admin.upsertProduct(body));
  }),
);

adminRouter.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        slug: z.string().min(1),
        name: z.string().min(1),
        category: z.enum(["STEM", "PUJA", "GARLAND", "PACK"]),
        unit: z.string().min(1),
        priceRupee: z.number().int().nullable().optional(),
        imageUrl: z.string().nullable().optional(),
        active: z.boolean().optional(),
        sortOrder: z.number().int().optional(),
      })
      .parse(req.body);
    res.json(await admin.upsertProduct({ id: req.params.id, ...body }));
  }),
);

adminRouter.get(
  "/zones",
  asyncHandler(async (_req, res) => {
    res.json(await admin.listAllZones());
  }),
);

adminRouter.post(
  "/zones",
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        pincode: z.string().min(6),
        locality: z.string().min(1),
        active: z.boolean().optional(),
        notes: z.string().nullable().optional(),
      })
      .parse(req.body);
    res.status(201).json(await admin.upsertZone(body));
  }),
);

adminRouter.patch(
  "/zones/:id",
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        pincode: z.string().min(6),
        locality: z.string().min(1),
        active: z.boolean().optional(),
        notes: z.string().nullable().optional(),
      })
      .parse(req.body);
    res.json(await admin.upsertZone({ id: req.params.id, ...body }));
  }),
);
