import type { NextFunction, Request, Response } from "express";
import type { Role } from "@prisma/client";
import { verifyToken, type JwtPayload } from "../lib/jwt.js";
import { HttpError } from "../lib/httpError.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

function bearer(req: Request) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = bearer(req);
  if (!token) throw new HttpError(401, "Missing access token");
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    throw new HttpError(401, "Invalid or expired token");
  }
}

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw new HttpError(401, "Unauthorized");
    if (!roles.includes(req.user.role)) {
      throw new HttpError(403, "Forbidden");
    }
    next();
  };
}
