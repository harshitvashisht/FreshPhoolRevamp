import React from "react";
import { runInlineHandler } from "../../lib/inlineHandler";

export function LooksHeader1() {
  return (
    <header>
      <a href="index.html">
        <img src="images/logo-nav.svg" alt="FreshPhool" />
      </a>
      <span style={{ display: "flex", gap: "18px", alignItems: "center"}}>
        <a className="live" href="index.html">Live storefront ↗</a>
      </span>
    </header>
  );
}

export function LooksIntro2() {
  return (
    <div className="intro">
      <p>Looks archive</p>
      <h1>Look A is live, with Look C type.</h1>
    </div>
  );
}

export function LooksGrid3() {
  return (
    <div className="grid">
      <article className="a">
        <img src="images/life/hero-vase.jpg" alt="" />
        <div className="veil"></div>
        <div className="copy">
          <p className="kicker">Live · Look A layout + Look C fonts</p>
          <h2>Ritual Pulse</h2>
          <p className="blurb">This is the catalog homepage now — Cormorant Garamond headings, Inter body.</p>
          <a className="go" href="index.html">Open live site</a>
        </div>
      </article>
      <article className="b">
        <img src="images/life/delivery-door.jpg" alt="" />
        <div className="veil"></div>
        <div className="copy">
          <p className="kicker">Archive · Look B</p>
          <h2>City Stems</h2>
          <p className="blurb">Not selected. Kept as a design reference.</p>
          <a className="go" href="look-b.html">Open archive</a>
        </div>
      </article>
      <article className="c">
        <img src="images/life/kraft-box.jpg" alt="" />
        <div className="veil"></div>
        <div className="copy">
          <p className="kicker">Archive · Look C</p>
          <h2>Mono Edit</h2>
          <p className="blurb">Type source for the live site. Layout was not chosen.</p>
          <a className="go" href="look-c.html">Open archive</a>
        </div>
      </article>
    </div>
  );
}

export function LooksScript4() {
  return (
    <script src="js/vendor/capacitor.js"></script>
  );
}

export function LooksScript5() {
  return (
    <script src="js/fp-native.js"></script>
  );
}

export default function LooksPage() {
  return (
    <>
      <LooksHeader1 />
      <LooksIntro2 />
      <LooksGrid3 />
      <LooksScript4 />
      <LooksScript5 />
    </>
  );
}
