import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { router } from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { asyncHandler } from "./lib/asyncHandler.js";
import { processWebhook } from "./services/payment.service.js";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  asyncHandler(async (req, res) => {
    await processWebhook(req.body as Buffer, req.header("x-razorpay-signature") ?? undefined);
    res.status(200).json({ ok: true });
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use("/api", router);
app.use(notFound);
app.use(errorHandler);
