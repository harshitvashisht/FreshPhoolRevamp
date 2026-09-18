import React, { useState } from "react";
import { useAuth, homeFor } from "../../auth/AuthProvider";
import AuthLayout from "../auth/AuthLayout";

export default function LoginPage() {
  const { login, role, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const next = new URLSearchParams(window.location.search).get("next");
  const safeNext = next?.startsWith("/") && !next.startsWith("//") ? next : null;

  if (!loading && role) {
    window.location.replace(safeNext || homeFor(role));
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const profile = await login(email, password);
      window.location.href = safeNext || homeFor(profile.role);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to FreshPhool"
      description="Continue to checkout, manage orders, and keep your morning flowers on schedule."
    >
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="fp-auth-submit">
            <button className="fp-btn fp-btn-primary" type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Continue"}
            </button>
          </div>
          {error ? <p className="fp-err">{error}</p> : null}
        </form>
        <p className="fp-auth-switch">
          New here? <a href={safeNext ? `/register?next=${encodeURIComponent(safeNext)}` : "/register"}>Create a member account</a>
        </p>
    </AuthLayout>
  );
}
