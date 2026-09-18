import React, { useEffect, useMemo, useState } from "react";
import { DashShell, Gate } from "../dash/DashShell";
import { api, rupee, whenIst } from "../../lib/api";

type Kpis = {
  orders: number;
  paid: number;
  pending: number;
  gmv: number;
  newMembers: number;
  pendingPayments: number;
  activeRecurring: number;
};

type BoardOrder = {
  id: string;
  order_number: string;
  community: string;
  block_flat: string;
  kind: string;
  delivery_window: string;
  status: string;
  subtotal: number;
  items: { name?: string; qty?: number }[];
  created_at: string;
  payment_method?: string | null;
  payment_status?: string | null;
};

type Recurring = {
  id: string;
  subscription_number: string;
  offering: string;
  name: string;
  size: string | null;
  qty: number;
  prepaid_amount: number;
  community: string;
  block_flat: string;
  status: string;
  period_start: string;
  period_end: string;
};

type Board = {
  orders: BoardOrder[];
  recurring: Recurring[];
  members: { id: string; name: string; phoneE164: string; email: string | null; createdAt: string }[];
  kpis: { today: Kpis; week: Kpis; month: Kpis };
};

type MemberRow = {
  id: string;
  name: string;
  phoneE164: string;
  email: string | null;
  createdAt: string;
  user: { email: string; role: string };
  _count: { orders: number; recurring: number };
};

type Product = {
  id: string;
  sku?: string | null;
  slug: string;
  name: string;
  category: "STEM" | "PUJA" | "GARLAND" | "PACK";
  unit: string;
  priceRupee: number | null;
  active: boolean;
  sortOrder: number;
};

type CatalogSku = {
  id: string;
  sku: string;
  sourceCategory: string;
  name: string;
  color: string;
  unit: string;
  active: boolean;
};

type Zone = {
  id: string;
  pincode: string;
  locality: string;
  active: boolean;
  notes: string | null;
};

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/recurring", label: "Recurring" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/catalog", label: "Catalog" },
  { href: "/admin/zones", label: "Zones" },
  { href: "/admin/export", label: "Export" },
];

const STATUSES = [
  "Payment Pending",
  "Payment Received",
  "Being Prepared",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function page() {
  const path = window.location.pathname.replace(/\/$/, "") || "/admin";
  if (path === "/admin/orders") return "orders";
  if (path === "/admin/payments") return "payments";
  if (path === "/admin/recurring") return "recurring";
  if (path === "/admin/members") return "members";
  if (path === "/admin/catalog") return "catalog";
  if (path === "/admin/zones") return "zones";
  if (path === "/admin/export") return "export";
  return "home";
}

function itemSummary(items: BoardOrder["items"]) {
  if (!Array.isArray(items) || !items.length) return "—";
  return items.map((i) => `${i.qty || 1}× ${i.name || "item"}`).join(", ");
}

function useBoard() {
  const [board, setBoard] = useState<Board | null>(null);
  const [error, setError] = useState("");

  async function load() {
    setBoard(await api<Board>("/admin/board"));
  }

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  return { board, error, setError, load };
}

function KpiGrid({ title, k }: { title: string; k: Kpis }) {
  return (
    <>
      <h2 style={{ fontSize: 20, margin: "18px 0 10px" }}>{title}</h2>
      <div className="fp-grid">
        <div className="fp-stat">
          <b>GMV</b>
          <strong>{rupee(k.gmv)}</strong>
        </div>
        <div className="fp-stat">
          <b>Paid</b>
          <strong>{k.paid}</strong>
        </div>
        <div className="fp-stat">
          <b>Pending</b>
          <strong>{k.pending}</strong>
        </div>
        <div className="fp-stat">
          <b>New members</b>
          <strong>{k.newMembers}</strong>
        </div>
      </div>
    </>
  );
}

function Overview({ board }: { board: Board }) {
  return (
    <>
      <h1>Morning board</h1>
      <p className="fp-muted">Asia/Kolkata windows. Confirm payment only after money has landed.</p>
      <KpiGrid title="Today" k={board.kpis.today} />
      <KpiGrid title="This week" k={board.kpis.week} />
      <KpiGrid title="This month" k={board.kpis.month} />
    </>
  );
}

function OrdersPage({ board, onChange }: { board: Board; onChange: () => Promise<void> }) {
  const paid = board.orders.filter((o) => o.status !== "Payment Pending" && o.status !== "Cancelled");

  async function patch(id: string, status: string) {
    await api(`/admin/orders/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    await onChange();
  }

  return (
    <>
      <h1>Paid orders</h1>
      <p className="fp-muted">Community → block → flat. Advance fulfilment from here.</p>
      <div className="fp-card" style={{ marginTop: 16, overflowX: "auto" }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>When</th>
              <th>Where</th>
              <th>Items</th>
              <th>₹</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paid.map((o) => (
              <tr key={o.id}>
                <td>{o.order_number}</td>
                <td>{whenIst(o.created_at)}</td>
                <td>
                  {o.community}
                  <br />
                  {o.block_flat}
                </td>
                <td>{itemSummary(o.items)}</td>
                <td>{rupee(o.subtotal)}</td>
                <td>
                  <select value={o.status} onChange={(e) => void patch(o.id, e.target.value)}>
                    {STATUSES.filter((s) => s !== "Payment Pending").map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PaymentsPage({ board, onChange }: { board: Board; onChange: () => Promise<void> }) {
  const pending = board.orders.filter((o) => o.status === "Payment Pending");

  return (
    <>
      <h1>Pending payment</h1>
      <p className="fp-muted">Confirm Razorpay only after settlement; confirm Cash on Delivery after cash is collected. Confirmation creates the invoice.</p>
      <div className="fp-card" style={{ marginTop: 16, overflowX: "auto" }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>When</th>
              <th>Where</th>
              <th>Items</th>
              <th>Method</th>
              <th>₹</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pending.map((o) => (
              <tr key={o.id}>
                <td>{o.order_number}</td>
                <td>{whenIst(o.created_at)}</td>
                <td>
                  {o.community} {o.block_flat}
                </td>
                <td>{itemSummary(o.items)}</td>
                <td>{o.payment_method === "cash_on_delivery" ? "Cash on Delivery" : "Razorpay"}</td>
                <td>{rupee(o.subtotal)}</td>
                <td>
                  <button
                    className="fp-btn fp-btn-primary"
                    type="button"
                    onClick={() =>
                      api(`/admin/orders/${o.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({ status: "Payment Received" }),
                      }).then(onChange)
                    }
                  >
                    Confirm payment
                  </button>
                </td>
              </tr>
            ))}
            {!pending.length ? (
              <tr>
                <td colSpan={7} className="fp-muted">
                  Nothing waiting.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
}

function RecurringPage({ board, onChange }: { board: Board; onChange: () => Promise<void> }) {
  async function patch(id: string, status: string) {
    await api(`/admin/recurring/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    await onChange();
  }

  async function qty(id: string, next: number) {
    await api(`/admin/recurring/${id}`, { method: "PATCH", body: JSON.stringify({ qty: next }) });
    await onChange();
  }

  const packs = board.recurring.filter((r) => r.offering === "puja_pack");
  const custom = board.recurring.filter((r) => r.offering !== "puja_pack");

  function table(rows: Recurring[], title: string, copy: string) {
    return (
      <div className="fp-card" style={{ marginTop: 16, overflowX: "auto" }}>
        <h2 style={{ fontSize: 22 }}>{title}</h2>
        <p className="fp-muted">{copy}</p>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Subscription</th>
              <th>Item</th>
              <th>Where</th>
              <th>Qty</th>
              <th>Prepaid</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.subscription_number}</td>
                <td>
                  {r.name} {r.size || ""}
                </td>
                <td>
                  {r.community} {r.block_flat}
                </td>
                <td>
                  <input
                    type="number"
                    min={1}
                    defaultValue={r.qty}
                    style={{ width: 64 }}
                    onBlur={(e) => {
                      const n = Number(e.target.value);
                      if (n && n !== r.qty) void qty(r.id, n);
                    }}
                  />
                </td>
                <td>{rupee(r.prepaid_amount)}</td>
                <td>
                  <select value={r.status} onChange={(e) => void patch(r.id, e.target.value)}>
                    {["pending_payment", "active", "paused", "cancelled"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <h1>Recurring</h1>
      {table(packs, "Daily Puja Pack", "Predefined pack offering.")}
      {table(custom, "Custom daily", "Customer-built Repeat Daily.")}
    </>
  );
}

function MembersPage() {
  const [rows, setRows] = useState<MemberRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api<MemberRow[]>("/admin/members")
      .then(setRows)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  return (
    <>
      <h1>Members</h1>
      {error ? <p className="fp-err">{error}</p> : null}
      <div className="fp-card" style={{ marginTop: 16, overflowX: "auto" }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Orders</th>
              <th>Subs</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>
                  {m.user.email}
                  <br />
                  {m.phoneE164}
                </td>
                <td>{m._count.orders}</td>
                <td>{m._count.recurring}</td>
                <td>{whenIst(m.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function CatalogPage() {
  const [rows, setRows] = useState<Product[]>([]);
  const [skus, setSkus] = useState<CatalogSku[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    slug: "",
    name: "",
    category: "STEM" as Product["category"],
    unit: "stem",
    priceRupee: "",
  });

  async function load() {
    const [products, importedSkus] = await Promise.all([api<Product[]>("/admin/products"), api<CatalogSku[]>("/admin/skus")]);
    setRows(products);
    setSkus(importedSkus);
  }

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  async function saveProduct(p: Product) {
    await api(`/admin/products/${p.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        slug: p.slug,
        name: p.name,
        category: p.category,
        unit: p.unit,
        priceRupee: p.priceRupee,
        active: p.active,
        sortOrder: p.sortOrder,
      }),
    });
    await load();
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api("/admin/products", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          priceRupee: form.priceRupee === "" ? null : Number(form.priceRupee),
        }),
      });
      setForm({ slug: "", name: "", category: "STEM", unit: "stem", priceRupee: "" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create");
    }
  }

  return (
    <>
      <h1>Catalog</h1>
      <p className="fp-muted">Toggle listings and set stem prices. Inactive products stay off the shop.</p>
      {error ? <p className="fp-err">{error}</p> : null}
      <div className="fp-card" style={{ marginTop: 16, overflowX: "auto" }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>₹</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{p.sku ? <code>{p.sku}</code> : "—"}</td>
                <td>
                  {p.name}
                  <div className="fp-muted">{p.slug}</div>
                </td>
                <td>{p.category}</td>
                <td>
                  <input
                    type="number"
                    defaultValue={p.priceRupee ?? ""}
                    style={{ width: 90 }}
                    onBlur={(e) => {
                      const n = e.target.value === "" ? null : Number(e.target.value);
                      if (n !== p.priceRupee) void saveProduct({ ...p, priceRupee: n });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={p.active}
                    onChange={(e) => void saveProduct({ ...p, active: e.target.checked })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fp-card" style={{ marginTop: 16, overflowX: "auto" }}>
        <h2 style={{ fontSize: 22 }}>Imported SKUs</h2>
        <p className="fp-muted" style={{ marginTop: 6 }}>{skus.length} unique SKU codes from Freshphool_SKU-V1.xlsx. Prices remain separate because the source sheet has no pricing.</p>
        <table className="fp-table" style={{ marginTop: 12 }}>
          <thead><tr><th>SKU</th><th>Category</th><th>Product</th><th>Colour</th><th>Unit</th></tr></thead>
          <tbody>{skus.map((sku) => <tr key={sku.id}><td><code>{sku.sku}</code></td><td>{sku.sourceCategory}</td><td>{sku.name}</td><td>{sku.color}</td><td>{sku.unit}</td></tr>)}</tbody>
        </table>
      </div>
      <form className="fp-card fp-form" style={{ marginTop: 16 }} onSubmit={create}>
        <h2 style={{ fontSize: 22 }}>Add product</h2>
        <label>Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <label>Slug</label>
        <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        <label>Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value as Product["category"] })}
        >
          {["STEM", "PUJA", "GARLAND", "PACK"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <label>Unit</label>
        <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} required />
        <label>Price (optional)</label>
        <input
          type="number"
          value={form.priceRupee}
          onChange={(e) => setForm({ ...form, priceRupee: e.target.value })}
        />
        <div style={{ marginTop: 14 }}>
          <button className="fp-btn fp-btn-primary" type="submit">
            Add to catalog
          </button>
        </div>
      </form>
    </>
  );
}

function ZonesPage() {
  const [rows, setRows] = useState<Zone[]>([]);
  const [error, setError] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");

  async function load() {
    setRows(await api<Zone[]>("/admin/zones"));
  }

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, []);

  return (
    <>
      <h1>Delivery zones</h1>
      {error ? <p className="fp-err">{error}</p> : null}
      <div className="fp-card" style={{ marginTop: 16, overflowX: "auto" }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Pincode</th>
              <th>Locality</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((z) => (
              <tr key={z.id}>
                <td>{z.pincode}</td>
                <td>{z.locality}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={z.active}
                    onChange={() =>
                      api(`/admin/zones/${z.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({ ...z, active: !z.active }),
                      }).then(load)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form
        className="fp-card fp-form"
        style={{ marginTop: 16 }}
        onSubmit={(e) => {
          e.preventDefault();
          api("/admin/zones", { method: "POST", body: JSON.stringify({ pincode, locality }) })
            .then(() => {
              setPincode("");
              setLocality("");
              return load();
            })
            .catch((err) => setError(err instanceof Error ? err.message : "Could not add zone"));
        }}
      >
        <h2 style={{ fontSize: 22 }}>Add zone</h2>
        <label>Pincode</label>
        <input value={pincode} onChange={(e) => setPincode(e.target.value)} required />
        <label>Locality</label>
        <input value={locality} onChange={(e) => setLocality(e.target.value)} required />
        <div style={{ marginTop: 14 }}>
          <button className="fp-btn fp-btn-primary" type="submit">
            Add zone
          </button>
        </div>
      </form>
    </>
  );
}

function ExportPage() {
  const [from, setFrom] = useState(() => new Date().toISOString().slice(0, 10));
  const [to, setTo] = useState(() => new Date().toISOString().slice(0, 10));
  const [dataset, setDataset] = useState("orders");
  const [error, setError] = useState("");

  async function download() {
    setError("");
    try {
      const data = await api<{ rows: unknown[] }>(
        `/admin/export?dataset=${dataset}&from=${from}&to=${to}`,
      );
      const blob = new Blob([JSON.stringify(data.rows, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${dataset}-${from}-to-${to}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    }
  }

  return (
    <>
      <h1>Export</h1>
      <p className="fp-muted">Download ops rows for an IST date range.</p>
      <div className="fp-card fp-form" style={{ marginTop: 16 }}>
        <label>From</label>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <label>To</label>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        <label>Dataset</label>
        <select value={dataset} onChange={(e) => setDataset(e.target.value)}>
          {["orders", "lines", "members", "payments", "recurring"].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <div style={{ marginTop: 14 }}>
          <button className="fp-btn fp-btn-primary" type="button" onClick={() => void download()}>
            Download JSON
          </button>
        </div>
        {error ? <p className="fp-err">{error}</p> : null}
      </div>
    </>
  );
}

function Inner() {
  const view = page();
  const { board, error, setError, load } = useBoard();
  const body = useMemo(() => {
    if (view === "members") return <MembersPage />;
    if (view === "catalog") return <CatalogPage />;
    if (view === "zones") return <ZonesPage />;
    if (view === "export") return <ExportPage />;
    if (!board) return <p className="fp-muted">Loading board…</p>;
    if (view === "orders") return <OrdersPage board={board} onChange={load} />;
    if (view === "payments") return <PaymentsPage board={board} onChange={load} />;
    if (view === "recurring") return <RecurringPage board={board} onChange={load} />;
    return <Overview board={board} />;
  }, [view, board, load]);

  return (
    <DashShell title="Ops" links={LINKS}>
      {error ? <p className="fp-err">{error}</p> : null}
      {body}
    </DashShell>
  );
}

export default function AdminDashboardPage() {
  return (
    <Gate allow="ADMIN">
      <Inner />
    </Gate>
  );
}
