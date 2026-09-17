import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().default(4000),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("7d"),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(6),
  RAZORPAY_KEY_ID: z.string().min(1).optional(),
  RAZORPAY_KEY_SECRET: z.string().min(1).optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().min(1).optional(),
});

export const env = envSchema.parse(process.env);
