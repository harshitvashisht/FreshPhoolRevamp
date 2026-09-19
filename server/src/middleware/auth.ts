import type { NextFunction, Request, Response } from "express";
import type { Role } from "@prisma/client";
import { verifyToken, type JwtPayload } from "../lib/jwt.js";
import { HttpError } from "../lib/httpError.js";
import { prisma } from "../lib/prisma.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

function getToken(req: Request): string | null {
  if (req.cookies?.fp_token) return req.cookies.fp_token;
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) return header.slice(7);
  return null;
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = getToken(req);
  if (!token) throw new HttpError(401, "Missing access token");
  try {
    const claims = verifyToken(token);
    // Do not rely solely on role/member claims issued days ago. This also makes a
    // deleted account or an admin demotion effective immediately.
    void prisma.user.findUnique({ where: { id: claims.sub }, include: { member: true } })
      .then((user) => {
        if (!user) return next(new HttpError(401, "Account no longer exists"));
        req.user = {
          sub: user.id,
          email: user.email,
          role: user.role,
          memberId: user.member?.id ?? null,
        };
        next();
      })
      .catch(next);
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
