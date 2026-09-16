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
