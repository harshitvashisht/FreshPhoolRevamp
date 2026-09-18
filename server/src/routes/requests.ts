import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/asyncHandler.js";
import { HttpError } from "../lib/httpError.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import * as requests from "../services/request.service.js";

export const requestsRouter = Router();

requestsRouter.post(
  "/",
  requireAuth,
  requireRole("MEMBER"),
  rateLimit({ windowMs: 15 * 60 * 1000, max: 12, key: (req) => `${req.user?.sub ?? req.ip}:product-request` }),
  asyncHandler(async (req, res) => {
    if (!req.user?.memberId) throw new HttpError(400, "Member profile required");
    const body = z.object({
      productName: z.string().trim().min(1).max(140),
      qty: z.number().int().min(1).max(100),
      variant: z.string().trim().min(1).max(60).optional(),
    }).parse(req.body);
    res.status(201).json(await requests.createProductRequest({ memberId: req.user.memberId, ...body }));
  }),
);
