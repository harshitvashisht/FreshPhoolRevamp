import React from "react";
import { runInlineHandler } from "../../lib/inlineHandler";

export function JourneyDevBanner1() {
  return (
    <div className="dev-banner" role="status">
      <span className="dev-banner-copy">Launching Website and App by End of September 2026</span>
    </div>
  );
}

export function JourneyJourneyTop2() {
  return (
    <header className="journey-top">
      <div className="wrap journey-top-inner">
        <a href="index.html" className="logo">
          <img src="images/logo-nav.svg" alt="FreshPhool" width="210" height="48" />
        </a>
        <p className="journey-kicker">Investor briefing · not a shop page</p>
        <div className="journey-top-actions">
          <a className="btn btn-ghost" href="index.html">Open storefront</a>
          <button type="button" className="btn btn-primary" onClick={(event) => runInlineHandler(event, "window.print()")}>Print / PDF</button>
        </div>
      </div>
    </header>
  );
}

export function JourneyMain3() {
  return (
    <main>
      <section className="journey-hero">
        <div className="wrap">
          <p className="eyebrow">Customer journey</p>
          <h1>From browse to breakfast.</h1>
          <p className="journey-lede">FreshPhool is an apartment-first morning flower route for North, Central and East Bangalore. Customers order by 11:00 PM. Growers cut overnight. Puja packs reach the door by 7:30 AM; decorative stems by 9:00 AM. Website and app launch by the end of September 2026.</p>
          <p className="journey-share">
            Share this briefing: 
            <a href="https://saddlebrown-wildcat-196700.hostingersite.com/journey.html">https://saddlebrown-wildcat-196700.hostingersite.com/journey.html</a>
          </p>
        </div>
      </section>
      <section className="journey-strip" aria-label="End-to-end flow">
        <div className="wrap">
          <ol className="journey-pills">
            <li>
              <span>1</span>
              Discover
            </li>
            <li>
              <span>2</span>
              Choose
            </li>
            <li>
              <span>3</span>
              Coverage
            </li>
            <li>
              <span>4</span>
              Cart
            </li>
            <li>
              <span>5</span>
              Checkout
            </li>
            <li>
              <span>6</span>
              Overnight
            </li>
            <li>
              <span>7</span>
              Doorstep
            </li>
            <li>
              <span>8</span>
              Recurring
            </li>
          </ol>
        </div>
      </section>
      <section>
        <div className="wrap journey-grid2">
          <article className="journey-card">
            <p className="eyebrow">01 · Discover</p>
            <h2>Shop by moment, then the catalog.</h2>
            <p>The storefront (Look A layout, Cormorant + Inter) opens on a hero still, then three moment cards: daily stems, puja, and coverage. The catalog lists twelve per-stem looks with colour swatches (roses, gerbera, carnations, chrysanthemums, dahlias, gladiolus, lilies, orchids, tuberose, and more), plus client morning photos. Search is “Search your Flowers.” This page is deliberately off the shop nav so investors can present it without mixing it into checkout.</p>
          </article>
          <figure className="journey-shot">
            <img src="images/life/hero-vase.jpg" alt="Morning vase of farm-fresh stems" width="720" height="480" />
          </figure>
        </div>
      </section>
      <section>
        <div className="wrap">
          <p className="eyebrow">02 · Choose</p>
          <h2>Three ways in. One morning route.</h2>
          <div className="journey-grid3">
            <article className="journey-card">
              <h3>Daily stems</h3>
              <p>
                Priced per stem (₹15–₹450). Mix colours, set quantity, then pick 
                <b>One-time</b>
                , 
                <b>Daily</b>
                , 
                <b>Weekly</b>
                , or 
                <b>Monthly</b>
                 for 7 / 30 / 90 days.
              </p>
            </article>
            <article className="journey-card">
              <h3>Puja packs</h3>
              <p>Prepaid Small / Medium / Large. Example: Medium · 30 days · Daily is ₹899, delivery included. Loose altar flowers and leaves sit beside the pack picker.</p>
              <table className="journey-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>7 days</th>
                    <th>30 days</th>
                    <th>90 days</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Small</th>
                    <td>₹149</td>
                    <td>₹699</td>
                    <td>₹1,899</td>
                  </tr>
                  <tr>
                    <th>Medium</th>
                    <td>₹199</td>
                    <td>₹899</td>
                    <td>₹2,499</td>
                  </tr>
                  <tr>
                    <th>Large</th>
                    <td>₹249</td>
                    <td>₹1,099</td>
                    <td>₹2,999</td>
                  </tr>
                </tbody>
              </table>
            </article>
            <article className="journey-card">
              <h3>Garlands &amp; occasions</h3>
              <p>Jasmine, marigold, tulsi, chrysanthemum, betel-leaf garlands. Wedding, housewarming, and corporate lines are quoted on WhatsApp — rupees confirmed in chat, not guessed on the card.</p>
            </article>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap journey-grid2 journey-flip">
          <figure className="journey-shot">
            <img src="images/life/delivery-door.jpg" alt="Apartment doorstep flower delivery" width="720" height="480" />
          </figure>
          <article className="journey-card">
            <p className="eyebrow">03 · Coverage</p>
            <h2>PIN check before the cart.</h2>
            <p>North, Central and East Bangalore apartments are on the live route. Customers enter a 6-digit PIN; listed zones (Hebbal, Yelahanka, Thanisandra, Frazer Town, Ulsoor, Cox Town, Horamavu, and the rest on Delivery) confirm on-site. Unlisted PINs go to WhatsApp. Complete Bengaluru coverage is planned within the next four months. Address capture is apartment-first: community name + block &amp; flat (example C-402), not a street geocode.</p>
          </article>
        </div>
      </section>
      <section>
        <div className="wrap">
          <p className="eyebrow">04 · Cart</p>
          <h2>One drawer. Two ways to finish.</h2>
          <p className="journey-lede">The cart holds mixed stems, puja packs, and cadence lines. Community and block-flat are required for web payment. WhatsApp can still send the same basket as a chat order.</p>
          <div className="journey-fork" role="group" aria-label="Checkout paths">
            <article className="journey-card path-a">
              <p className="path-label">Path A · primary</p>
              <h3>WhatsApp-first</h3>
              <ol>
                <li>Tap the green WhatsApp control in nav, hero, cart, or coverage.</li>
                <li>A pre-filled message lists items, cadence, and apartment.</li>
                <li>Ops confirms rupees for unpriced garland / custom lines.</li>
                <li>Number: +91 81476 13636 · wa.me/918147613636</li>
              </ol>
              <p>This is the live commercial path today. Chat is not the ledger — fulfilment still lands on the morning board.</p>
            </article>
            <div className="journey-or" aria-hidden="true">or</div>
            <article className="journey-card path-b">
              <p className="path-label">Path B · web</p>
              <h3>Member + Razorpay</h3>
              <ol>
                <li>Proceed to payment requires a Member session (email, name, India mobile, password).</li>
                <li>
                  Order row is written as 
                  <b>Payment Pending</b>
                  .
                </li>
                <li>
                  Browser opens 
                  <code>pay/?order=</code>
                   — Razorpay placeholder until merchant KYC.
                </li>
                <li>
                  Ops marks money received with Confirm payment in 
                  <code>/admin</code>
                   until webhooks are live.
                </li>
              </ol>
              <p>Prepaid only. No cash on delivery. Recurring Autopay is not in launch.</p>
            </article>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <p className="eyebrow">05–07 · Clock</p>
          <h2>One cut-off. Two morning windows.</h2>
          <ol className="journey-clock">
            <li>
              <b>11:00 PM</b>
              <span>Cut-off</span>
              <p>Order stems and puja packs for tomorrow. After 11:00 PM IST the book freezes.</p>
            </li>
            <li>
              <b>Overnight</b>
              <span>Cut &amp; pack</span>
              <p>Fresh from growers — not sitting in a city warehouse all week. Sorted at the North Bangalore warehouse, routed Community → Block → Flat.</p>
            </li>
            <li>
              <b>7:30 AM</b>
              <span>Puja window</span>
              <p>Puja packs, jasmine, marigold, lotus, tulsi, and altar leaves. Earlier stop so the ritual starts on time.</p>
            </li>
            <li>
              <b>9:00 AM</b>
              <span>Stem window</span>
              <p>Decorative stems at the door. Nothing crushed. Same rider loop, later drop.</p>
            </li>
          </ol>
          <div className="journey-photos">
            <figure>
              <img src="images/life/whatsapp-order.jpg" alt="Ordering flowers by chat" width="480" height="320" />
              <figcaption>11:00 PM · Order</figcaption>
            </figure>
            <figure>
              <img src="images/life/kraft-box.jpg" alt="Overnight packing" width="480" height="320" />
              <figcaption>Overnight · Cut</figcaption>
            </figure>
            <figure>
              <img src="images/life/farm-cut.jpg" alt="Dawn packing at the warehouse" width="480" height="320" />
              <figcaption>Dawn · Packed</figcaption>
            </figure>
            <figure>
              <img src="images/life/delivery-door.jpg" alt="Doorstep delivery" width="480" height="320" />
              <figcaption>By 9:00 AM · Door</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap journey-grid2">
          <article className="journey-card">
            <p className="eyebrow">08 · Recurring</p>
            <h2>Pay the period once. Flowers keep arriving.</h2>
            <p>A Daily / Weekly / Monthly pack is prepaid for 7, 30, or 90 days. The customer does not place a new evening order for each morning. Pause, skip, pack change, and cancel are staff-assisted on WhatsApp until self-serve lands. Renewal is a new payment before the end date — not auto-debit at launch.</p>
          </article>
          <article className="journey-card">
            <p className="eyebrow">Ops</p>
            <h2>What investors do not see, but the route depends on.</h2>
            <ol>
              <li>Paid orders only on the morning sheet.</li>
              <li>Puja route first, decorative second.</li>
              <li>One building is one stop.</li>
              <li>Status: Payment Pending → Received → Confirmed → Being Prepared → Out for Delivery → Delivered.</li>
            </ol>
          </article>
        </div>
      </section>
      <section className="journey-close">
        <div className="wrap">
          <p className="eyebrow">Launch</p>
          <h2>Website and app, end of September 2026.</h2>
          <p>
            The public storefront and the Capacitor iOS / Android wrap ship together. Preview is the Hostinger temp URL. Production is freshphool.com (manual FTP). This journey page stays 
            <b>noindex</b>
             and off the sitemap so it can be shared in a room without becoming a shop SEO URL.
          </p>
          <div className="journey-top-actions">
            <a className="btn btn-primary" href="index.html">Walk the storefront</a>
            <a className="btn btn-ghost" href="delivery.html">See coverage</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export function JourneyJourneyFoot4() {
  return (
    <footer className="journey-foot">
      <div className="wrap">
        <p>FreshPhool · Thanisandra, North Bangalore · +91 81476 13636</p>
      </div>
    </footer>
  );
}

export default function JourneyPage() {
  return (
    <>
      <JourneyDevBanner1 />
      <JourneyJourneyTop2 />
      <JourneyMain3 />
      <JourneyJourneyFoot4 />
    </>
  );
}
