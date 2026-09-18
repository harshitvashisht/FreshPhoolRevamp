import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { authRouter } from "./auth.js";
import { catalogRouter } from "./catalog.js";
import { ordersRouter } from "./orders.js";
import { adminRouter } from "./admin.js";
import { memberRouter } from "./member.js";
import { requestsRouter } from "./requests.js";

export const router = Router();

router.get(
  "/health",
  asyncHandler(async (_req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, service: "freshphool-api" });
  }),
);

router.use("/auth", authRouter);
router.use("/catalog", catalogRouter);
router.use("/orders", ordersRouter);
router.use("/me", memberRouter);
router.use("/requests", requestsRouter);
router.use("/admin", adminRouter);
