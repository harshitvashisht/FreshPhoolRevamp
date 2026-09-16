import React from "react";
import { runInlineHandler } from "../../lib/inlineHandler";

export function AdminIndexSection1() {
  return (
    <header>
      <nav className="wrap">
        <a className="logo" href="../">
          <img src="../images/logo.svg" alt="FreshPhool" />
           Ops
        </a>
        <div>
          <span id="who" className="muted"></span>
          <button className="btn btn-ghost hidden" id="logoutBtn" type="button">Sign out</button>
        </div>
      </nav>
    </header>
  );
}

export function AdminIndexSection2() {
  return (
    <main className="wrap" style={{padding: "28px 22px 56px"}}>
      <section id="login" className="card" style={{maxWidth: "420px", margin: "40px auto"}}>
        <p className="muted" style={{letterSpacing: ".16em", textTransform: "uppercase", fontWeight: "700", fontSize: "12px"}}>North Bangalore ops</p>
        <h1 style={{marginTop: "8px"}}>Sign in</h1>
        <p className="muted">Customers never log in. Use the generated admin mailbox.</p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="username" value="admin@freshphool.com" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="current-password" />
        <div style={{marginTop: "16px"}}>
          <button className="btn btn-primary" id="loginBtn" type="button">Open the board</button>
        </div>
        <p className="err hidden" id="loginErr"></p>
      </section>
      <section id="board" className="hidden">
        <h1>Morning board</h1>
        <p className="muted" style={{margin: "8px 0 20px"}}>
          KPIs use dimensional 
          <code>fact_*</code>
           / 
          <code>dim_members</code>
           when present, with legacy 
          <code>orders</code>
           fallback. Asia/Kolkata windows. Razorpay is still a placeholder — Confirm payment when money landed.
        </p>
        <h2 style={{fontSize: "20px", marginBottom: "10px"}}>Today</h2>
        <div className="grid3" id="statsToday"></div>
        <div id="topsToday" className="muted" style={{marginTop: "8px", fontSize: "13px"}}></div>
        <h2 style={{fontSize: "20px", margin: "22px 0 10px"}}>This week</h2>
        <div className="grid3" id="statsWeek"></div>
        <div id="topsWeek" className="muted" style={{marginTop: "8px", fontSize: "13px"}}></div>
        <h2 style={{fontSize: "20px", margin: "22px 0 10px"}}>This month</h2>
        <div className="grid3" id="statsMonth"></div>
        <div id="topsMonth" className="muted" style={{marginTop: "8px", fontSize: "13px"}}></div>
        <div className="card" style={{marginTop: "28px"}}>
          <h2 style={{fontSize: "22px"}}>Export CSV</h2>
          <p className="muted">Download Supabase rows for a date range (IST day bounds). Uses your ops session only.</p>
          <div style={{display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "end", marginTop: "12px"}}>
            <div>
              <label htmlFor="exportFrom">From</label>
              <input id="exportFrom" type="date" />
            </div>
            <div>
              <label htmlFor="exportTo">To</label>
              <input id="exportTo" type="date" />
            </div>
            <div>
              <label htmlFor="exportDataset">Dataset</label>
              <select id="exportDataset">
                <option value="orders">Orders</option>
                <option value="lines">Order lines</option>
                <option value="members">Members</option>
                <option value="payments">Payments</option>
                <option value="recurring">Recurring</option>
              </select>
            </div>
            <button className="btn btn-primary" type="button" id="exportBtn">Download CSV</button>
          </div>
          <p className="err hidden" id="exportErr" style={{marginTop: "10px"}}></p>
        </div>
        <div className="card" style={{marginTop: "28px"}}>
          <h2 style={{fontSize: "22px"}}>Paid orders</h2>
          <p className="muted">Community → block → flat. Puja window first. Pending (unpaid) rows stay off this list.</p>
          <div style={{overflowX: "auto", marginTop: "12px"}}>
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>When</th>
                  <th>Community</th>
                  <th>Block / flat</th>
                  <th>Delivery</th>
                  <th>Kind</th>
                  <th>₹</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="paidBody"></tbody>
            </table>
          </div>
        </div>
        <div className="card" style={{marginTop: "16px"}}>
          <h2 style={{fontSize: "22px"}}>Pending payment</h2>
          <p className="muted">Missed Razorpay webhook or WhatsApp-only checkout. Confirm only after money is in.</p>
          <div style={{overflowX: "auto", marginTop: "12px"}}>
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>When</th>
                  <th>Community</th>
                  <th>Block / flat</th>
                  <th>Items</th>
                  <th>₹</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="pendingBody"></tbody>
            </table>
          </div>
        </div>
        <div className="card" style={{marginTop: "16px"}}>
          <h2 style={{fontSize: "22px"}}>Recurring — Daily Puja Pack</h2>
          <p className="muted">Predefined pack offering. Pause / resume / cancel / qty here or on WhatsApp. Not the same as custom Repeat Daily.</p>
          <div style={{overflowX: "auto", marginTop: "12px"}}>
            <table>
              <thead>
                <tr>
                  <th>Subscription</th>
                  <th>Window</th>
                  <th>Community</th>
                  <th>Pack</th>
                  <th>Qty</th>
                  <th>Prepaid</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="packRecBody"></tbody>
            </table>
          </div>
        </div>
        <div className="card" style={{marginTop: "16px"}}>
          <h2 style={{fontSize: "22px"}}>Recurring — Custom daily</h2>
          <p className="muted">Customer-built Repeat Daily (stems, garlands, extras). Distinct from the Daily Puja Pack.</p>
          <div style={{overflowX: "auto", marginTop: "12px"}}>
            <table>
              <thead>
                <tr>
                  <th>Subscription</th>
                  <th>Window</th>
                  <th>Community</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Prepaid</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="customRecBody"></tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function AdminIndexPage() {
  return (
    <>
      <AdminIndexSection1 />
      <AdminIndexSection2 />
    </>
  );
}
