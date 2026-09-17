import React, { useState } from "react";
import { useAuth, homeFor } from "../../auth/AuthProvider";

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
    <main className="fp-dash">
      <div className="fp-card fp-auth">
        <p className="fp-muted" style={{ letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700 }}>
          FreshPhool
        </p>
        <h1 style={{ marginTop: 8 }}>Sign in</h1>
        <p className="fp-muted">Sign in to continue to checkout or open your dashboard.</p>
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
          <div style={{ marginTop: 16 }}>
            <button className="fp-btn fp-btn-primary" type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Continue"}
            </button>
          </div>
          {error ? <p className="fp-err">{error}</p> : null}
        </form>
        <p className="fp-muted" style={{ marginTop: 18 }}>
          New here? <a href={safeNext ? `/register?next=${encodeURIComponent(safeNext)}` : "/register"}>Create a member account</a>
        </p>
      </div>
    </main>
  );
}
