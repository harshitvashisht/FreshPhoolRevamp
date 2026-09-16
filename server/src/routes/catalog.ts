import { Router } from "express";
import { asyncHandler } from "../lib/asyncHandler.js";
import { prisma } from "../lib/prisma.js";

export const catalogRouter = Router();

catalogRouter.get(
  "/products",
  asyncHandler(async (_req, res) => {
    const products = await prisma.product.findMany({
      where: { active: true },
      include: { variants: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });
    res.json(products);
  }),
);

catalogRouter.get(
  "/zones",
  asyncHandler(async (_req, res) => {
    const zones = await prisma.deliveryZone.findMany({
      where: { active: true },
      orderBy: { pincode: "asc" },
    });
    res.json(zones);
  }),
);

catalogRouter.get(
  "/zones/:pincode",
  asyncHandler(async (req, res) => {
    const zone = await prisma.deliveryZone.findUnique({
      where: { pincode: req.params.pincode },
    });
    res.json({
      pincode: req.params.pincode,
      deliverable: Boolean(zone?.active),
      zone,
    });
  }),
);
