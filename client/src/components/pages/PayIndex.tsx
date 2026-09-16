import React from "react";
import { runInlineHandler } from "../../lib/inlineHandler";

export function PayIndexSection1() {
  return (
    <div className="wrap">
      <a className="logo" href="../">
        <img src="../images/logo-nav.svg" alt="FreshPhool" />
      </a>
      <h1>Payment coming soon</h1>
      <p>Your order is saved with a unique order number. Razorpay checkout will open here after merchant KYC. Until then, our team can confirm payment over WhatsApp — quote the order number.</p>
      <span className="badge">Razorpay placeholder</span>
      <div className="card" id="summary">
        <h2>Order summary</h2>
        <p id="emptyNote">Loading…</p>
      </div>
      <div className="actions">
        <a className="btn btn-primary" href="https://wa.me/918147613636" target="_blank">WhatsApp support</a>
        <a className="btn btn-ghost" href="../">Back to storefront</a>
      </div>
    </div>
  );
}

export default function PayIndexPage() {
  return (
    <>
      <PayIndexSection1 />
    </>
  );
}
