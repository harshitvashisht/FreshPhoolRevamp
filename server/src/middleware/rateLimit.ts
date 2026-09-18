import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../lib/httpError.js";

type Entry = { count: number; resetAt: number };

/**
 * Small, deliberately local throttle for abuse-prone public endpoints.
 * Move this state to Redis when the API runs on more than one server.
 */
export function rateLimit(options: { windowMs: number; max: number; key?: (req: Request) => string }) {
  const entries = new Map<string, Entry>();
  const keyFor = options.key ?? ((req: Request) => req.ip || "unknown");

  return (req: Request, _res: Response, next: NextFunction) => {
    const now = Date.now();
    const key = keyFor(req);
    const current = entries.get(key);
    if (!current || current.resetAt <= now) {
      entries.set(key, { count: 1, resetAt: now + options.windowMs });
      next();
      return;
    }
    if (current.count >= options.max) {
      throw new HttpError(429, "Too many attempts. Please wait and try again.");
    }
    current.count += 1;
    next();
  };
}
