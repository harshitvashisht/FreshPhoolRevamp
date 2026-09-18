import { Prisma, type RecurringStatus } from "@prisma/client";
import { e164, normalizePhone } from "./auth.service.js";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../lib/httpError.js";

const MEMBER_RECURRING: RecurringStatus[] = ["paused", "active", "cancelled"];

export async function listAddresses(memberId: string) {
  return prisma.address.findMany({
    where: { memberId },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });
}

export async function createAddress(
  memberId: string,
  input: { community: string; blockFlat: string; pincode?: string; isDefault?: boolean },
) {
  const count = await prisma.address.count({ where: { memberId } });
  const isDefault = input.isDefault || count === 0;

  return prisma.$transaction(async (tx) => {
    if (isDefault) {
      await tx.address.updateMany({ where: { memberId }, data: { isDefault: false } });
    }
    return tx.address.create({
      data: {
        memberId,
        community: input.community.trim(),
        blockFlat: input.blockFlat.trim(),
        pincode: input.pincode?.trim() || null,
        isDefault,
      },
    });
  });
}

export async function updateAddress(
  memberId: string,
  id: string,
  input: { community?: string; blockFlat?: string; pincode?: string | null; isDefault?: boolean },
) {
  const existing = await prisma.address.findFirst({ where: { id, memberId } });
  if (!existing) throw new HttpError(404, "Address not found");

  return prisma.$transaction(async (tx) => {
    if (input.isDefault) {
      await tx.address.updateMany({ where: { memberId }, data: { isDefault: false } });
    }
    return tx.address.update({
      where: { id },
      data: {
        community: input.community?.trim(),
        blockFlat: input.blockFlat?.trim(),
        pincode: input.pincode === undefined ? undefined : input.pincode,
        isDefault: input.isDefault,
      },
    });
  });
}

export async function deleteAddress(memberId: string, id: string) {
  const existing = await prisma.address.findFirst({ where: { id, memberId } });
  if (!existing) throw new HttpError(404, "Address not found");
  await prisma.address.delete({ where: { id } });
  if (existing.isDefault) {
    const next = await prisma.address.findFirst({
      where: { memberId },
      orderBy: { createdAt: "desc" },
    });
    if (next) {
      await prisma.address.update({ where: { id: next.id }, data: { isDefault: true } });
    }
  }
  return { ok: true };
}

export async function listMyRecurring(memberId: string) {
  return prisma.recurringOrder.findMany({
    where: { memberId },
    orderBy: { createdAt: "desc" },
  });
}

export async function patchMyRecurring(memberId: string, id: string, status: RecurringStatus) {
  if (!MEMBER_RECURRING.includes(status)) {
    throw new HttpError(400, "Members can only pause, resume, or cancel a subscription");
  }
  const row = await prisma.recurringOrder.findFirst({ where: { id, memberId } });
  if (!row) throw new HttpError(404, "Subscription not found");
  if (row.status === "pending_payment" && status === "active") {
    throw new HttpError(400, "Pay for this subscription before it can go active");
  }
  return prisma.recurringOrder.update({ where: { id }, data: { status } });
}

export async function updateProfile(userId: string, input: { name: string; phone?: string }) {
  const name = input.name.trim();
  let phoneE164: string | undefined;
  if (input.phone !== undefined) {
    const phone = normalizePhone(input.phone);
    if (!phone || !/^91[6-9]\d{9}$/.test(phone)) {
      throw new HttpError(400, "Enter a valid 10-digit Indian mobile number");
    }
    phoneE164 = e164(phone);
    const existing = await prisma.user.findFirst({ where: { phoneE164, NOT: { id: userId } }, select: { id: true } });
    if (existing) throw new HttpError(409, "An account already exists for this mobile number");
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phoneE164,
        member: { update: { name, phoneE164 } },
      },
      include: { member: true },
    });
    return { id: user.id, email: user.email, name: user.name, phoneE164: user.phoneE164, role: user.role };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new HttpError(409, "An account already exists for this mobile number");
    }
    throw error;
  }
}
