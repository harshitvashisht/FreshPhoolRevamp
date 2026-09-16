import React from "react";
import { useAuth } from "../../auth/AuthProvider";

type Link = { href: string; label: string };

export function DashShell({
  title,
  links,
  children,
}: {
  title: string;
  links: Link[];
  children: React.ReactNode;
}) {
  const { profile, logout } = useAuth();
  const path = window.location.pathname.replace(/\/$/, "") || "/";

  return (
    <div className="fp-dash">
      <header className="fp-top">
        <a className="fp-brand" href="/">
          <img src="/images/logo.svg" alt="FreshPhool" />
          {title}
        </a>
        <div className="fp-top-meta">
          <span>{profile?.name}</span>
          <span>{profile?.email}</span>
          <button className="fp-btn fp-btn-ghost" type="button" onClick={logout}>
            Sign out
          </button>
        </div>
      </header>
      <div className="fp-shell">
        <nav className="fp-side">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={path === link.href ? "active" : ""}>
              {link.label}
            </a>
          ))}
        </nav>
        <main className="fp-main">{children}</main>
      </div>
    </div>
  );
}

export function Gate({
  allow,
  children,
}: {
  allow: "MEMBER" | "ADMIN";
  children: React.ReactNode;
}) {
  const { loading, role } = useAuth();
  if (loading) {
    return (
      <div className="fp-dash">
        <p className="fp-muted" style={{ padding: 40 }}>
          Loading…
        </p>
      </div>
    );
  }
  if (!role) {
    window.location.replace(`/login`);
    return null;
  }
  if (role !== allow) {
    window.location.replace(role === "ADMIN" ? "/admin" : "/dashboard");
    return null;
  }
  return <>{children}</>;
}
