import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as auth from "../services/auth.service.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(2),
        phone: z.string().min(10),
      })
      .parse(req.body);
    const session = await auth.registerMember(body);
    res.status(201).json(session);
  }),
);

authRouter.post(
  "/login",
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
