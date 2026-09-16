import bcrypt from "bcryptjs";
import type { Role } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { signToken } from "../lib/jwt.js";
import { HttpError } from "../lib/httpError.js";

const PHONE_RE = /^(91)?[6-9]\d{9}$/;

export function normalizePhone(raw: string | undefined | null) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.length === 10) return "91" + digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  if (digits.length === 11 && digits.startsWith("0")) return "91" + digits.slice(1);
  return null;
}

export function e164(phone91: string) {
  return "+" + phone91;
}

async function issueSession(user: {
  id: string;
  email: string;
  role: Role;
  member: { id: string } | null;
}) {
  const accessToken = signToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    memberId: user.member?.id ?? null,
  });
  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      memberId: user.member?.id ?? null,
    },
  };
}

export async function registerMember(input: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) {
  const email = input.email.trim().toLowerCase();
  const phone = normalizePhone(input.phone);
  if (!phone || !PHONE_RE.test(phone)) {
    throw new HttpError(400, "Enter a valid 10-digit Indian mobile number");
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { phoneE164: e164(phone) }] },
  });
  if (existing) throw new HttpError(409, "Email or phone already registered");

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: input.name.trim(),
      phoneE164: e164(phone),
      role: "MEMBER",
      member: {
        create: {
          phoneE164: e164(phone),
          name: input.name.trim(),
          email,
        },
      },
    },
    include: { member: true },
  });

  return issueSession(user);
}

export async function login(emailRaw: string, password: string) {
  const email = emailRaw.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email },
    include: { member: true },
  });
  if (!user) throw new HttpError(401, "Invalid email or password");
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new HttpError(401, "Invalid email or password");
  return issueSession(user);
}

export async function me(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { member: { include: { addresses: true } } },
  });
  if (!user) throw new HttpError(404, "User not found");
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phoneE164: user.phoneE164,
    role: user.role,
    member: user.member,
  };
}
