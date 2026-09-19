export type Role = "MEMBER" | "ADMIN";

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
  memberId: string | null;
};

export type Profile = {
  id: string;
  email: string;
  name: string;
  phoneE164: string | null;
  role: Role;
  member: {
    id: string;
    phoneE164: string;
    name: string;
    email: string | null;
    addresses: Address[];
  } | null;
};

export type Address = {
  id: string;
  community: string;
  blockFlat: string;
  pincode: string | null;
  isDefault: boolean;
};

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`/api${path}`, { ...init, headers, credentials: "include" });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const message = data?.error || data?.message || res.statusText;
    throw new Error(typeof message === "string" ? message : "Request failed");
  }
  return data as T;
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
}

export function rupee(n: number) {
  return "₹" + (Number(n) || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function whenIst(iso: string | Date) {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function navigate(path: string) {
  window.location.href = path;
}
