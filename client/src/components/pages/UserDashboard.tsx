import React, { useEffect, useMemo, useState } from "react";
import { DashShell, Gate } from "../dash/DashShell";
import { useAuth } from "../../auth/AuthProvider";
import { api, rupee, whenIst, type Address } from "../../lib/api";

type Order = {
  id: string;
  orderNumber: string;
  community: string;
  blockFlat: string;
  kind: string;
  deliveryWindow: string;
  status: string;
  subtotalRupee: number;
  createdAt: string;
  notes: string | null;
  lines: { id: string; name: string; qty: number; unit: string; lineTotal: number }[];
};

type Recurring = {
  id: string;
  subscriptionNumber: string;
  offering: string;
  name: string;
  size: string | null;
  qty: number;
  durationDays: number;
  cadence: string;
  prepaidAmountRupee: number;
  community: string;
  blockFlat: string;
  status: string;
  periodStart: string;
  periodEnd: string;
};

const LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/subscriptions", label: "Subscriptions" },
  { href: "/dashboard/addresses", label: "Addresses" },
  { href: "/dashboard/account", label: "Account" },
];

function page() {
  const path = window.location.pathname.replace(/\/$/, "") || "/dashboard";
  if (path.startsWith("/dashboard/orders/")) return "order";
  if (path === "/dashboard/orders") return "orders";
  if (path === "/dashboard/subscriptions") return "subs";
  if (path === "/dashboard/addresses") return "addresses";
  if (path === "/dashboard/account") return "account";
  return "home";
}

function Overview() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [subs, setSubs] = useState<Recurring[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api<Order[]>("/orders/me"), api<Recurring[]>("/me/recurring")])
      .then(([o, r]) => {
        setOrders(o);
        setSubs(r);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  const active = subs.filter((s) => s.status === "active").length;
  const latest = orders[0];

  return (
    <>
      <h1>Good morning, {profile?.name?.split(" ")[0]}</h1>
      <p className="fp-muted" style={{ margin: "8px 0 0" }}>
        Your flowers, deliveries, and subscriptions for North Bangalore.
      </p>
      <div className="fp-grid">
        <div className="fp-stat">
          <b>Orders</b>
          <strong>{orders.length}</strong>
        </div>
        <div className="fp-stat">
          <b>Active daily</b>
          <strong>{active}</strong>
        </div>
        <div className="fp-stat">
          <b>Addresses</b>
          <strong>{profile?.member?.addresses.length ?? 0}</strong>
        </div>
      </div>
      {error ? <p className="fp-err">{error}</p> : null}
      <div className="fp-card">
        <h2 style={{ fontSize: 22 }}>Latest order</h2>
        {latest ? (
          <p style={{ marginTop: 10 }}>
            <a href={`/dashboard/orders/${latest.orderNumber}`}>{latest.orderNumber}</a> · {latest.status.replaceAll("_", " ")} ·{" "}
            {rupee(latest.subtotalRupee)}
          </p>
        ) : (
          <p className="fp-muted" style={{ marginTop: 10 }}>
            No orders yet. <a href="/daily-flowers">Shop today’s stems</a>
          </p>
        )}
      </div>
    </>
  );
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Order[]>("/orders/me")
      .then(setOrders)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  return (
    <>
      <h1>Orders</h1>
      <p className="fp-muted">Every checkout on this member account.</p>
      {error ? <p className="fp-err">{error}</p> : null}
      <div className="fp-card" style={{ marginTop: 16, overflowX: "auto" }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>When</th>
              <th>Delivery</th>
              <th>Kind</th>
              <th>₹</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>
                  <a href={`/dashboard/orders/${o.orderNumber}`}>{o.orderNumber}</a>
                </td>
                <td>{whenIst(o.createdAt)}</td>
                <td>
                  {o.community}
                  <br />
                  {o.blockFlat}
                </td>
                <td>
                  {o.kind} · {o.deliveryWindow}
                </td>
                <td>{rupee(o.subtotalRupee)}</td>
                <td>
                  <span className="fp-pill">{o.status.replaceAll("_", " ")}</span>
                </td>
              </tr>
            ))}
            {!orders.length ? (
              <tr>
                <td colSpan={6} className="fp-muted">
                  No orders yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
}

function OrderDetail() {
  const number = decodeURIComponent(window.location.pathname.split("/").pop() || "");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Order>(`/orders/${number}`)
      .then(setOrder)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [number]);

  if (error) return <p className="fp-err">{error}</p>;
  if (!order) return <p className="fp-muted">Loading order…</p>;

  return (
    <>
      <p className="fp-muted">
        <a href="/dashboard/orders">← All orders</a>
      </p>
      <h1>{order.orderNumber}</h1>
      <p className="fp-muted">
        {whenIst(order.createdAt)} · {order.community} {order.blockFlat}
      </p>
      <div className="fp-card" style={{ marginTop: 16 }}>
        <p>
          Status <span className="fp-pill">{order.status.replaceAll("_", " ")}</span> · {rupee(order.subtotalRupee)}
        </p>
        <table className="fp-table" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>₹</th>
            </tr>
          </thead>
          <tbody>
            {order.lines.map((line) => (
              <tr key={line.id}>
                <td>
                  {line.name} <span className="fp-muted">{line.unit}</span>
                </td>
                <td>{line.qty}</td>
                <td>{rupee(line.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {order.notes ? <p style={{ marginTop: 12 }}>Notes: {order.notes}</p> : null}
      </div>
    </>
  );
}

function Subscriptions() {
  const [rows, setRows] = useState<Recurring[]>([]);
  const [error, setError] = useState("");

  async function load() {
    setRows(await api<Recurring[]>("/me/recurring"));
  }

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  async function setStatus(id: string, status: string) {
    setError("");
    try {
      await api(`/me/recurring/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  return (
    <>
      <h1>Subscriptions</h1>
      <p className="fp-muted">Pause, resume, or cancel Daily Puja Pack and custom repeat orders.</p>
      {error ? <p className="fp-err">{error}</p> : null}
      <div className="fp-card" style={{ marginTop: 16, overflowX: "auto" }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Subscription</th>
              <th>Item</th>
              <th>Window</th>
              <th>Prepaid</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.subscriptionNumber}</td>
                <td>
                  {r.qty}× {r.name} {r.size || ""} · {r.cadence}
                </td>
                <td>
                  {String(r.periodStart).slice(0, 10)} → {String(r.periodEnd).slice(0, 10)}
                </td>
                <td>{rupee(r.prepaidAmountRupee)}</td>
                <td>
                  <span className="fp-pill">{r.status.replaceAll("_", " ")}</span>
                </td>
                <td className="fp-row">
                  {r.status === "active" ? (
                    <button className="fp-btn fp-btn-ghost" type="button" onClick={() => setStatus(r.id, "paused")}>
                      Pause
                    </button>
                  ) : null}
                  {r.status === "paused" ? (
                    <button className="fp-btn fp-btn-primary" type="button" onClick={() => setStatus(r.id, "active")}>
                      Resume
                    </button>
                  ) : null}
                  {r.status !== "cancelled" ? (
                    <button className="fp-btn fp-btn-danger" type="button" onClick={() => setStatus(r.id, "cancelled")}>
                      Cancel
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td colSpan={6} className="fp-muted">
                  No subscriptions yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Addresses() {
  const { refresh } = useAuth();
  const [rows, setRows] = useState<Address[]>([]);
  const [community, setCommunity] = useState("");
  const [blockFlat, setBlockFlat] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const list = await api<Address[]>("/me/addresses");
    setRows(list);
    await refresh();
  }

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api("/me/addresses", {
        method: "POST",
        body: JSON.stringify({ community, blockFlat, pincode }),
      });
      setCommunity("");
      setBlockFlat("");
      setPincode("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    }
  }

  return (
    <>
      <h1>Addresses</h1>
      <p className="fp-muted">Community and block/flat used at checkout.</p>
      {error ? <p className="fp-err">{error}</p> : null}
      <div className="fp-stack" style={{ marginTop: 16 }}>
        {rows.map((a) => (
          <div className="fp-card" key={a.id}>
            <strong>
              {a.community} · {a.blockFlat}
            </strong>
            <p className="fp-muted">{a.pincode || "No pincode"}</p>
            <div className="fp-row" style={{ marginTop: 10 }}>
              {a.isDefault ? (
                <span className="fp-pill">Default</span>
              ) : (
                <button
                  className="fp-btn fp-btn-ghost"
                  type="button"
                  onClick={() =>
                    api(`/me/addresses/${a.id}`, {
                      method: "PATCH",
                      body: JSON.stringify({ isDefault: true }),
                    }).then(load)
                  }
                >
                  Make default
                </button>
              )}
              <button
                className="fp-btn fp-btn-danger"
                type="button"
                onClick={() => api(`/me/addresses/${a.id}`, { method: "DELETE" }).then(load)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <form className="fp-card fp-form" onSubmit={add}>
          <h2 style={{ fontSize: 22 }}>Add address</h2>
          <label>Community</label>
          <input value={community} onChange={(e) => setCommunity(e.target.value)} required />
          <label>Block / flat</label>
          <input value={blockFlat} onChange={(e) => setBlockFlat(e.target.value)} required />
          <label>Pincode</label>
          <input value={pincode} onChange={(e) => setPincode(e.target.value)} />
          <div style={{ marginTop: 14 }}>
            <button className="fp-btn fp-btn-primary" type="submit">
              Save address
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function Account() {
  const { profile, refresh } = useAuth();
  const [name, setName] = useState(profile?.name || "");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMsg("");
    try {
      await api("/me/profile", { method: "PATCH", body: JSON.stringify({ name }) });
      await refresh();
      setMsg("Saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    }
  }

  return (
    <>
      <h1>Account</h1>
      <form className="fp-card fp-form" style={{ marginTop: 16 }} onSubmit={save}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Email</label>
        <input value={profile?.email || ""} readOnly />
        <label>Phone</label>
        <input value={profile?.phoneE164 || ""} readOnly />
        <div style={{ marginTop: 14 }}>
          <button className="fp-btn fp-btn-primary" type="submit">
            Save
          </button>
        </div>
        {msg ? <p className="fp-ok">{msg}</p> : null}
        {error ? <p className="fp-err">{error}</p> : null}
      </form>
    </>
  );
}

function Inner() {
  const view = page();
  const body = useMemo(() => {
    if (view === "orders") return <Orders />;
    if (view === "order") return <OrderDetail />;
    if (view === "subs") return <Subscriptions />;
    if (view === "addresses") return <Addresses />;
    if (view === "account") return <Account />;
    return <Overview />;
  }, [view]);

  return (
    <DashShell title="Member" links={LINKS}>
      {body}
    </DashShell>
  );
}

export default function UserDashboardPage() {
  return (
    <Gate allow="MEMBER">
      <Inner />
    </Gate>
  );
}
