import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import * as auth from "../services/auth.service.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  rateLimit({ windowMs: 60 * 60 * 1000, max: 5 }),
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        email: z.string().trim().toLowerCase().email(),
        password: z.string().min(8).max(128),
        name: z.string().trim().min(2),
        phone: z.string().trim().min(10),
      })
      .parse(req.body);
    const session = await auth.registerMember(body);
    res.status(201).json(session);
  }),
);

authRouter.post(
  "/login",
  rateLimit({ windowMs: 15 * 60 * 1000, max: 8 }),
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        email: z.string().email(),
        password: z.string().min(1),
      })
      .parse(req.body);
    const session = await auth.login(body.email, body.password);
    res.json(session);
  }),
);

authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const profile = await auth.me(req.user!.sub);
    res.json(profile);
  }),
);
