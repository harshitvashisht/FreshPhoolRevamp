import React, { useState } from "react";
import { useAuth, homeFor } from "../../auth/AuthProvider";
import AuthLayout from "../auth/AuthLayout";

export default function RegisterPage() {
  const { register, role, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
      const profile = await register({ name, email, phone, password });
      window.location.href = safeNext || homeFor(profile.role);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not register");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Fresh mornings start here"
      title="Create your member account"
      description="Save your delivery details, track orders, and make every morning a little more beautiful."
    >
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="phone">Mobile</label>
          <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="fp-auth-submit">
            <button className="fp-btn fp-btn-primary" type="submit" disabled={busy}>
              {busy ? "Creating…" : "Create account"}
            </button>
          </div>
          {error ? <p className="fp-err">{error}</p> : null}
        </form>
        <p className="fp-auth-switch">
          Already a member? <a href={safeNext ? `/login?next=${encodeURIComponent(safeNext)}` : "/login"}>Sign in</a>
        </p>
    </AuthLayout>
  );
}
