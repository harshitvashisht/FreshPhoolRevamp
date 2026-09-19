import { Router, type Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import * as auth from "../services/auth.service.js";

declare module "express" {
  interface Response {
    cookie(name: string, val: string, options: CookieOptions): this;
    clearCookie(name: string, options: CookieOptions): this;
  }
  interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
    maxAge?: number;
    path?: string;
    domain?: string;
  }
}

export const authRouter = Router();

function setAuthCookie(res: Response, token: string) {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("fp_token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "lax" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

function clearAuthCookie(res: Response) {
  res.clearCookie("fp_token", { path: "/" });
}

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
    setAuthCookie(res, session.accessToken);
    res.status(201).json({ user: session.user });
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
    setAuthCookie(res, session.accessToken);
    res.json({ user: session.user });
  }),
);

authRouter.post(
  "/logout",
  asyncHandler(async (_req, res) => {
    clearAuthCookie(res);
    res.json({ success: true });
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

authRouter.delete(
  "/account",
  requireAuth,
  asyncHandler(async (req, res) => {
    await auth.deleteAccount(req.user!.sub);
    res.json({ success: true });
  }),
);
