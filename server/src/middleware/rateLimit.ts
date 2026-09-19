import type { NextFunction, Request, Response } from "express";
import { Redis } from "ioredis";
import { env } from "../config/env.js";
import { HttpError } from "../lib/httpError.js";

let redis: Redis | null = null;

function getRedis() {
  if (!redis && env.REDIS_URL) {
    redis = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: true,
    });
    redis.on("error", (err: Error) => {
      console.warn("Redis connection error:", err.message);
    });
  }
  return redis;
}

const memoryStore = new Map<string, { count: number; resetAt: number }>();

/**
 * Redis-backed rate limiter with in-memory fallback.
 * Uses fixed window algorithm.
 */
export function rateLimit(options: { windowMs: number; max: number; key?: (req: Request) => string }) {
  const windowSec = Math.ceil(options.windowMs / 1000);
  const keyFor = options.key ?? ((req: Request) => req.ip || "unknown");

  return async (req: Request, _res: Response, next: NextFunction) => {
    const key = `rl:${keyFor(req)}`;
    const now = Date.now();
    const windowStart = now - options.windowMs;

    const client = getRedis();

    if (client) {
      try {
        await client.connect();
        const count = await client.incr(key);
        if (count === 1) {
          await client.expire(key, windowSec);
        }
        if (count > options.max) {
          const ttl = await client.ttl(key);
          throw new HttpError(429, `Too many attempts. Please wait ${ttl}s and try again.`);
        }
        next();
        return;
      } catch (err) {
        if (err instanceof HttpError) throw err;
        console.warn("Redis rate limit error, falling back to memory:", err);
      }
    }

    const current = memoryStore.get(key);
    if (!current || current.resetAt <= now) {
      memoryStore.set(key, { count: 1, resetAt: now + options.windowMs });
      next();
      return;
    }
    if (current.count >= options.max) {
      const retrySec = Math.ceil((current.resetAt - now) / 1000);
      throw new HttpError(429, `Too many attempts. Please wait ${retrySec}s and try again.`);
    }
    current.count += 1;
    next();
  };
}