import { Router } from "express";
import { z } from "zod";
import { RecurringStatus } from "@prisma/client";
import { asyncHandler } from "../lib/asyncHandler.js";
import { HttpError } from "../lib/httpError.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import * as member from "../services/member.service.js";

export const memberRouter = Router();

memberRouter.use(requireAuth, requireRole("MEMBER"));

function memberId(req: { user?: { memberId?: string | null } }) {
  if (!req.user?.memberId) throw new HttpError(400, "Member profile required");
  return req.user.memberId;
}

memberRouter.patch(
  "/profile",
  asyncHandler(async (req, res) => {
    const body = z.object({ name: z.string().trim().min(2), phone: z.string().trim().min(10).optional() }).parse(req.body);
    res.json(await member.updateProfile(req.user!.sub, body));
  }),
);

memberRouter.get(
  "/addresses",
  asyncHandler(async (req, res) => {
    res.json(await member.listAddresses(memberId(req)));
  }),
);

memberRouter.post(
  "/addresses",
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        community: z.string().min(1),
        blockFlat: z.string().min(1),
        pincode: z.string().optional(),
        isDefault: z.boolean().optional(),
      })
      .parse(req.body);
    res.status(201).json(await member.createAddress(memberId(req), body));
  }),
);

memberRouter.patch(
  "/addresses/:id",
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        community: z.string().min(1).optional(),
        blockFlat: z.string().min(1).optional(),
        pincode: z.string().nullable().optional(),
        isDefault: z.boolean().optional(),
      })
      .parse(req.body);
    res.json(await member.updateAddress(memberId(req), req.params.id, body));
  }),
);

memberRouter.delete(
  "/addresses/:id",
  asyncHandler(async (req, res) => {
    res.json(await member.deleteAddress(memberId(req), req.params.id));
  }),
);

memberRouter.get(
  "/recurring",
  asyncHandler(async (req, res) => {
    res.json(await member.listMyRecurring(memberId(req)));
  }),
);

memberRouter.patch(
  "/recurring/:id",
  asyncHandler(async (req, res) => {
    const body = z.object({ status: z.nativeEnum(RecurringStatus) }).parse(req.body);
    res.json(await member.patchMyRecurring(memberId(req), req.params.id, body.status));
  }),
);
