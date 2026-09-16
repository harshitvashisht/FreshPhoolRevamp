import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, getToken, setToken, type Profile, type Role, type SessionUser } from "../lib/api";

type AuthState = {
  loading: boolean;
  profile: Profile | null;
  role: Role | null;
  login: (email: string, password: string) => Promise<Profile>;
  register: (input: { email: string; password: string; name: string; phone: string }) => Promise<Profile>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

async function loadProfile(): Promise<Profile | null> {
  if (!getToken()) return null;
  try {
    return await api<Profile>("/auth/me");
  } catch {
    setToken(null);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  const refresh = async () => {
    setProfile(await loadProfile());
  };

  useEffect(() => {
    void loadProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      loading,
      profile,
      role: profile?.role ?? null,
      refresh,
      logout: () => {
        setToken(null);
        setProfile(null);
        window.location.href = "/login";
      },
      login: async (email, password) => {
        const session = await api<{ accessToken: string; user: SessionUser }>("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        setToken(session.accessToken);
        const next = await api<Profile>("/auth/me");
        setProfile(next);
        return next;
      },
      register: async (input) => {
        const session = await api<{ accessToken: string; user: SessionUser }>("/auth/register", {
          method: "POST",
          body: JSON.stringify(input),
        });
        setToken(session.accessToken);
        const next = await api<Profile>("/auth/me");
        setProfile(next);
        return next;
      },
    }),
    [loading, profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function homeFor(role: Role | null) {
  if (role === "ADMIN") return "/admin";
  if (role === "MEMBER") return "/dashboard";
  return "/login";
}
