import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export type AuditAction =
  | "ORDER_STATUS_CHANGED"
  | "RECURRING_STATUS_CHANGED"
  | "PRODUCT_CREATED"
  | "PRODUCT_UPDATED"
  | "PRODUCT_DELETED"
  | "ZONE_CREATED"
  | "ZONE_UPDATED"
  | "ZONE_DELETED"
  | "MEMBER_VIEWED"
  | "EXPORT_DOWNLOADED"
  | "ORDER_VIEWED"
  | "PAYMENT_VIEWED"
  | "ADMIN_LOGIN";

export interface AuditLogInput {
  adminId: string;
  action: AuditAction;
  targetType?: string;
  targetId?: string;
  metadata?: Prisma.InputJsonValue;
  ip?: string;
  userAgent?: string;
}

export async function logAudit(input: AuditLogInput) {
  try {
    await prisma.auditLog.create({
      data: {
        adminId: input.adminId,
        action: input.action,
        targetType: input.targetType,
        targetId: input.targetId,
        metadata: input.metadata as Prisma.InputJsonValue,
        ip: input.ip,
        userAgent: input.userAgent,
      },
    });
  } catch (err) {
    console.warn("Failed to write audit log:", err);
  }
}

export async function getAuditLogs(options: {
  adminId?: string;
  action?: AuditAction;
  from?: Date;
  to?: Date;
  limit?: number;
  offset?: number;
}) {
  const { adminId, action, from, to, limit = 100, offset = 0 } = options;
  return prisma.auditLog.findMany({
    where: {
      ...(adminId && { adminId }),
      ...(action && { action }),
      ...(from || to ? { createdAt: { ...(from && { gte: from }), ...(to && { lte: to }) } } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
    include: {
      admin: { select: { email: true, name: true } },
    },
  });
}

export async function getAuditLogCount(options: {
  adminId?: string;
  action?: AuditAction;
  from?: Date;
  to?: Date;
}) {
  const { adminId, action, from, to } = options;
  return prisma.auditLog.count({
    where: {
      ...(adminId && { adminId }),
      ...(action && { action }),
      ...(from || to ? { createdAt: { ...(from && { gte: from }), ...(to && { lte: to }) } } : {}),
    },
  });
}