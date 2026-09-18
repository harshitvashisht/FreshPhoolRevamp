import React from "react";

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AuthLayout({ eyebrow, title, description, children }: AuthLayoutProps) {
  return (
    <main className="fp-auth-page">
      <section className="fp-auth-story">
        <a className="fp-auth-logo" href="/" aria-label="FreshPhool home">
          <img src="/images/logo-nav.svg" alt="FreshPhool" />
        </a>
        <div className="fp-auth-story-copy">
          <p>Fresh flowers, every morning</p>
          <h2>From farm to your doorstep before breakfast.</h2>
          <span>Bengaluru’s daily flower ritual</span>
        </div>
      </section>
      <section className="fp-auth-panel" aria-label={title}>
        <a className="fp-auth-mobile-logo" href="/" aria-label="FreshPhool home">
          <img src="/images/logo-nav.svg" alt="FreshPhool" />
        </a>
        <div className="fp-auth-card">
          <p className="fp-auth-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="fp-auth-description">{description}</p>
          {children}
        </div>
      </section>
    </main>
  );
}
