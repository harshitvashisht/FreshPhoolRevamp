import React, { useEffect, useState } from "react";
import { api, rupee } from "../../lib/api";

declare global { interface Window { Razorpay?: new (options: Record<string, unknown>) => { open(): void } } }

type Order = {
  orderNumber: string;
  subtotalRupee: number;
  community: string;
  blockFlat: string;
  status: string;
  lines: { id: string; name: string; qty: number; lineTotal: number }[];
  payments?: { provider: string; status: string; razorpayOrderId?: string | null }[];
  recurring?: { id: string; status: string }[];
};
type PaymentOrder = { keyId: string; razorpayOrderId: string; amountPaise: number; currency: string; orderNumber: string; expiresAt: string; customer: { name: string; email?: string; contact?: string } };
type Invoice = { invoiceNumber: string; amountRupee: number; issuedAt: string; order: Order; payment: { razorpayPaymentId: string | null } | null };

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Razorpay Checkout"));
    document.body.appendChild(script);
  });
}

export default function PayIndexPage() {
  const orderNumber = new URLSearchParams(window.location.search).get("order");
  const [order, setOrder] = useState<Order | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [onlinePaymentStarted, setOnlinePaymentStarted] = useState(false);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!orderNumber) { setError("Your order number is missing. Return to the storefront and try again."); return; }
    api<Order>(`/orders/${encodeURIComponent(orderNumber)}`)
      .then((loaded) => {
        setOrder(loaded);
        setCashOnDelivery(loaded.payments?.some((payment) => payment.status === "cash_on_delivery") ?? false);
        setCancelled(loaded.status === "cancelled");
        setOnlinePaymentStarted(loaded.payments?.some((payment) => payment.status === "pending" && payment.provider === "razorpay" && Boolean(payment.razorpayOrderId)) ?? false);
        return api<Invoice>(`/orders/${encodeURIComponent(orderNumber)}/invoice`).then(setInvoice).catch(() => undefined);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load order"));
  }, [orderNumber]);

  useEffect(() => {
    if (!expiresAt) return;
    const update = () => setSecondsLeft(Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 1000)));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [expiresAt]);

  async function pay() {
    if (!orderNumber || !order) return;
    setBusy(true); setError("");
    try {
      const paymentOrder = await api<PaymentOrder>(`/orders/${encodeURIComponent(orderNumber)}/payment-order`, { method: "POST" });
      setExpiresAt(paymentOrder.expiresAt);
      setOnlinePaymentStarted(true);
      await loadRazorpay();
      if (!window.Razorpay) throw new Error("Razorpay Checkout is unavailable");
      new window.Razorpay({
        key: paymentOrder.keyId, amount: paymentOrder.amountPaise, currency: paymentOrder.currency,
        name: "FreshPhool", description: `Order ${paymentOrder.orderNumber}`, order_id: paymentOrder.razorpayOrderId,
        prefill: paymentOrder.customer, theme: { color: "#C1440E" }, modal: { ondismiss: () => setBusy(false) },
        handler: async (response: Record<string, string>) => {
          try {
            await api(`/orders/${encodeURIComponent(orderNumber)}/verify-payment`, { method: "POST", body: JSON.stringify({ razorpayOrderId: response.razorpay_order_id, razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature }) });
            setInvoice(await api<Invoice>(`/orders/${encodeURIComponent(orderNumber)}/invoice`));
          } catch (err) { setError(err instanceof Error ? err.message : "Payment could not be verified"); }
          finally { setBusy(false); }
        },
      }).open();
    } catch (err) { setError(err instanceof Error ? err.message : "Could not start payment"); setBusy(false); }
  }

  async function chooseCashOnDelivery() {
    if (!orderNumber || !order) return;
    setBusy(true); setError("");
    try {
      await api(`/orders/${encodeURIComponent(orderNumber)}/cash-on-delivery`, { method: "POST" });
      setCashOnDelivery(true);
    } catch (err) { setError(err instanceof Error ? err.message : "Could not select cash on delivery"); }
    finally { setBusy(false); }
  }

  async function cancelOrder() {
    if (!orderNumber || !order || !window.confirm(`Cancel order ${orderNumber}?`)) return;
    setBusy(true); setError("");
    try {
      await api(`/orders/${encodeURIComponent(orderNumber)}/cancel`, { method: "POST" });
      setCancelled(true);
      setOrder({ ...order, status: "cancelled" });
    } catch (err) { setError(err instanceof Error ? err.message : "Could not cancel order"); }
    finally { setBusy(false); }
  }

  const receipt = invoice?.order ?? order;
  const hasSubscription = receipt?.recurring && receipt.recurring.length > 0;
  const expiryNotice = secondsLeft !== null ? (secondsLeft > 0 ? `Complete payment within ${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}.` : "This payment session expired. Start payment again to get a new two-minute session.") : null;
  return <main className="wrap">
    <a className="logo" href="/"><img src="/images/logo-nav.svg" alt="FreshPhool" /></a>
    <h1>{invoice ? "Payment complete" : cancelled ? "Order cancelled" : cashOnDelivery ? "Payment method updated" : "Choose payment"}</h1>
    <p>{invoice ? `Invoice ${invoice.invoiceNumber} has been created for your confirmed order.` : cancelled ? `Order ${orderNumber} has been cancelled. No payment will be collected.` : cashOnDelivery ? `Cash on Delivery is selected for order ${orderNumber}. No new order has been created; your invoice will be issued after collection.` : "Choose secure online payment with Razorpay or pay cash when your order is delivered."}</p>
    <div className="card"><h2>{invoice ? "Payment invoice" : "Order summary"}</h2>
      {receipt ? <><p>Order {receipt.orderNumber} · {receipt.community}, {receipt.blockFlat}</p>
        {receipt.lines.map((line) => <div className="row" key={line.id}><span>{line.name} × {line.qty}</span><span>{rupee(line.lineTotal)}</span></div>)}
        <div className="row"><span>Total</span><span>{rupee(receipt.subtotalRupee)}</span></div>
        {invoice ? <p>Paid via Razorpay · {invoice.payment?.razorpayPaymentId || "Confirmed"}</p> : null}
        {cashOnDelivery ? <p>Payment method: Cash on Delivery</p> : null}
      </> : <p>Loading your order…</p>}
    </div>
    {error ? <p style={{ color: "#b42318" }}>{error}</p> : null}
{!invoice && !cashOnDelivery && !cancelled ? <section className="payment-options" aria-label="Payment options">
      <h2>Payment options</h2>
      <button className="payment-option payment-option-online" type="button" disabled={!order || busy} onClick={pay}>
        <span className="payment-option-icon">₹</span>
        <span className="payment-option-copy"><strong>{busy ? "Opening secure checkout…" : onlinePaymentStarted ? "Continue Razorpay payment" : order ? `Pay online · ${rupee(order.subtotalRupee)}` : "Loading order…"}</strong><small>{onlinePaymentStarted ? "Reuses this order's payment session — no second charge" : "Secure Razorpay checkout · UPI, cards and net banking"}</small></span>
        <span className="payment-option-arrow" aria-hidden="true">→</span>
      </button>
      {!onlinePaymentStarted && !hasSubscription ? <button className="payment-option payment-option-cod" type="button" disabled={!order || busy} onClick={chooseCashOnDelivery}>
          <span className="payment-option-icon">₹</span>
          <span className="payment-option-copy"><strong>Cash on Delivery</strong><small>Pay the delivery partner when your flowers arrive</small></span>
          <span className="payment-option-arrow" aria-hidden="true">→</span>
        </button> : hasSubscription ? <div className="payment-option payment-option-disabled" style={{ opacity: 0.6, pointerEvents: "none" }}>
          <span className="payment-option-icon">🔒</span>
          <span className="payment-option-copy"><strong>Cash on Delivery unavailable</strong><small>Subscriptions require online payment for recurring billing</small></span>
        </div> : null}
      {expiryNotice ? <p className="payment-expiry">{expiryNotice}</p> : null}
    </section> : null}
    <div className="actions">{invoice ? <><button className="btn btn-primary" type="button" onClick={() => window.print()}>Download invoice</button><a className="btn btn-ghost" href="/dashboard/orders">View my orders</a></> : cancelled ? <><a className="btn btn-primary" href="/">Continue shopping</a><a className="btn btn-ghost" href="/dashboard/orders">View my orders</a></> : cashOnDelivery ? <><a className="btn btn-primary" href="/dashboard/orders">View my orders</a><a className="btn btn-ghost" href="/">Continue shopping</a></> : <><button className="btn btn-ghost" type="button" disabled={!order || busy} onClick={() => void cancelOrder()}>Cancel order</button><a className="btn btn-ghost" href="/">Back to storefront</a></>}</div>
  </main>;
}
