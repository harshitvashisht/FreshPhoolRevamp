import React from "react";
import { runInlineHandler } from "../../lib/inlineHandler";

export function IndexDevBanner1() {
  return (
    <div className="dev-banner" role="status">
      <span className="dev-banner-copy">Launching Website and App by End of September 2026</span>
    </div>
  );
}

export function IndexHeader2() {
  return (
    <header>
      <nav className="wrap">
        <button type="button" className="nav-burger" id="navBurger" aria-label="Open menu" aria-expanded="false" aria-controls="navDrawer" onClick={(event) => runInlineHandler(event, "fpNav.openDrawer()")}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <a href="index.html" className="logo">
          <img src="images/logo-nav.svg" alt="FreshPhool" width="210" height="48" />
        </a>
        <div className="navlinks" id="navLinks">
          <a href="daily-flowers.html">Daily flowers</a>
          <a href="puja.html">Puja</a>
          <a href="garlands.html">Garlands</a>
          <a href="delivery.html">Delivery</a>
        </div>
        <div className="nav-cta">
          <div className="nav-search" id="navSearchWrap" role="search">
            <input type="text" id="navSearch" name="fp-flower-q" placeholder="Search your Flowers" aria-label="Search your Flowers" inputMode="search" autocomplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false" data-lpignore="true" readOnly={true} onFocus={(event) => runInlineHandler(event, "this.removeAttribute('readonly')")} onInput={(event) => runInlineHandler(event, "fpNav.search(this.value)")} onKeyDown={(event) => runInlineHandler(event, "if(event.key==='Enter')fpNav.searchEnter()")} />
          </div>
          <button type="button" className="member-login-btn" id="memberLoginBtn" onClick={(event) => runInlineHandler(event, "fpMember.open()")}>Member</button>
          <a className="member-login-btn" href="/dashboard" style={{ textDecoration: "none" }}>Dashboard</a>
          <button type="button" className="member-chip" id="memberChip" onClick={(event) => runInlineHandler(event, "fpMember.logout()")} title="Log out"></button>
          <button className="nav-cart-btn" onClick={(event) => runInlineHandler(event, "fpCart.openPanel()")} aria-label="View order">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="nav-cart-badge" id="navCartBadge">0</span>
          </button>
          <a className="wa-icon" href="https://wa.me/918147613636" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"></path>
              <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.6 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3C3.7 14.7 3.2 13.4 3.2 12 3.2 7.2 7.2 3.2 12 3.2S20.8 7.2 20.8 12 16.8 20.2 12 20.2z"></path>
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}

export function IndexMarqueeMqA3() {
  return (
    <div className="marquee mq-a" data-marquee="">
      <div className="marquee-track" data-marquee-track="">
        <span className="mq-item">At your door by 9 AM</span>
        <span className="mq-item">·</span>
        <span className="mq-item">Zero cold storage · Zero staleness</span>
        <span className="mq-item">·</span>
        <span className="mq-item">No bulk. No minimum. Just stems.</span>
        <span className="mq-item">·</span>
        <span className="mq-item">Farm to flat in under 5 hours</span>
        <span className="mq-item">·</span>
        <span className="mq-item">Same-day cut. Same-day delivered.</span>
        <span className="mq-item">·</span>
        <span className="mq-item">Stems so fresh, they're still cold</span>
        <span className="mq-item">·</span>
      </div>
    </div>
  );
}

export function IndexHero4() {
  return (
    <section className="hero">
      <div className="wrap hero-a">
        <div>
          <p className="eyebrow">Bengaluru · Daily ritual</p>
          <h1>Fresh Flowers, Every Morning.</h1>
          <p>Order exact stems by 11pm. We cut overnight. Your door, before breakfast — puja packs even earlier.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="daily-flowers.html">See today’s stems</a>
            <a className="wa-icon" href="https://wa.me/918147613636" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"></path>
                <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.6 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3C3.7 14.7 3.2 13.4 3.2 12 3.2 7.2 7.2 3.2 12 3.2S20.8 7.2 20.8 12 16.8 20.2 12 20.2z"></path>
              </svg>
            </a>
          </div>
          <div className="stats">
            <div>
              <b>&lt;5 hrs</b>
              <span>Farm to flat</span>
            </div>
            <div>
              <b>11:00 PM</b>
              <span>Cut-off</span>
            </div>
            <div>
              <b>Daily</b>
              <span>Not festivals only</span>
            </div>
          </div>
        </div>
        <div className="hero-photo">
          <img src="images/life/hero-vase.jpg" alt="Fresh flowers ready for a North Bangalore morning delivery" />
        </div>
      </div>
    </section>
  );
}

export function IndexMarqueeMqB5() {
  return (
    <div className="marquee mq-b" data-marquee="">
      <div className="marquee-track" data-marquee-track="">
        <span className="mq-item">Sip the morning. Keep the flowers.</span>
        <span className="mq-item">Altar first. Vase second.</span>
        <span className="mq-item">Bengaluru ka Fresh Phool.</span>
        <span className="mq-item">No bulk. No minimum.</span>
      </div>
    </div>
  );
}

export function IndexThemes6() {
  return (
    <section className="themes" id="themes">
      <div className="wrap">
        <div className="themes-head">
          <div>
            <p className="eyebrow">Shop by moment</p>
            <h2>Pick a mood. Keep moving.</h2>
          </div>
        </div>
        <div className="theme-rail" role="list">
          <a className="theme-card tc-saffron" role="listitem" href="puja.html">
            <span className="tc-over">Every morning</span>
            <span className="tc-title">Daily puja pack</span>
            <span className="tc-cta">Shop puja ›</span>
            <img className="tc-img" src="images/moments/puja.png?v=20260912g" alt="Daily puja flower pack" loading="lazy" width="220" height="220" />
          </a>
          <a className="theme-card tc-rose" role="listitem" href="daily-flowers.html">
            <span className="tc-over">Love in bloom</span>
            <span className="tc-title">Roses &amp; romance</span>
            <span className="tc-cta">Shop stems ›</span>
            <img className="tc-img" src="images/moments/roses.png?v=20260912g" alt="Fresh red roses" loading="lazy" width="220" height="220" />
          </a>
          <a className="theme-card tc-gold" role="listitem" href="garlands.html">
            <span className="tc-over">Festive &amp; auspicious</span>
            <span className="tc-title">Marigold garlands</span>
            <span className="tc-cta">Shop garlands ›</span>
            <img className="tc-img" src="images/moments/marigold.png?v=20260912g" alt="Marigold garland" loading="lazy" width="220" height="220" />
          </a>
          <a className="theme-card tc-butter" role="listitem" href="daily-flowers.html">
            <span className="tc-over">Bright &amp; cheerful</span>
            <span className="tc-title">Sunshine stems</span>
            <span className="tc-cta">Shop stems ›</span>
            <img className="tc-img" src="images/moments/sunflower.png?v=20260912g" alt="Sunflower" loading="lazy" width="220" height="220" />
          </a>
          <a className="theme-card tc-lav" role="listitem" href="delivery.html">
            <span className="tc-over">Apartment delivery</span>
            <span className="tc-title">Delivery</span>
            <span className="tc-cta">See coverage ›</span>
            <img className="tc-img" src="images/moments/delivery.png?v=20260912g" alt="Apartment flower delivery" loading="lazy" width="220" height="220" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function IndexFlowers7() {
  return (
    <section id="flowers">
      <div className="wrap">
        <p className="eyebrow">Per-stem menu</p>
        <h2>Today’s fresh stems.</h2>
        <p>
          Hover a photo for heritage. Mix colours. One stem or fifty. Full list on 
          <a href="daily-flowers.html">Daily flowers</a>
          .
        </p>
        <div className="prod-grid">
          <div className="prod-card" data-name="Fresh Roses" data-price="15" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Roses_Red.jpg?v=20260912g" alt="Fresh Roses - Red" />
            </div>
            <div className="prod-info">
              <h4>Fresh Roses</h4>
              <div className="price">
                ₹15
                <span>PER STEM</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#C1272D"}} data-color="Red" data-img="images/Roses_Red.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
                <button type="button" className="swatch" style={{ background: "#F2A6C4"}} data-color="Pink" data-img="images/Roses_Pink.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink"></button>
                <button type="button" className="swatch" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Roses_Yellow.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
                <button type="button" className="swatch" style={{ background: "#E07A3D"}} data-color="Orange" data-img="images/Roses_Orange.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Orange"></button>
                <button type="button" className="swatch" style={{ background: "#F3C4A2"}} data-color="Peach" data-img="images/Roses_Peach.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Peach"></button>
                <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Roses_White.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
                <button type="button" className="swatch" style={{ background: "#9B7EDE"}} data-color="Lavender" data-img="images/Roses_Lavender.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Lavender"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">Red</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Gerbera" data-price="20" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Gerbera_Yellow.jpg?v=20260912g" alt="Gerbera - Yellow" />
            </div>
            <div className="prod-info">
              <h4>Gerbera</h4>
              <div className="price">
                ₹20
                <span>PER STEM</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Gerbera_Yellow.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
                <button type="button" className="swatch" style={{ background: "#F5821F"}} data-color="Orange" data-img="images/Gerbera_Orange.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Orange"></button>
                <button type="button" className="swatch" style={{ background: "#F06292"}} data-color="Pink" data-img="images/Gerbera_Pink.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink"></button>
                <button type="button" className="swatch" style={{ background: "#7E57C2"}} data-color="Purple" data-img="images/Gerbera_Purple.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Purple"></button>
                <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Gerbera_White.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
                <button type="button" className="swatch" style={{ background: "#E9967A"}} data-color="Salmon" data-img="images/Gerbera_Salmon.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Salmon"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">Yellow</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Carnations" data-price="20" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Carnations_Red.jpg?v=20260912g" alt="Carnations - Red" />
            </div>
            <div className="prod-info">
              <h4>Carnations</h4>
              <div className="price">
                ₹20
                <span>PER STEM</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#C1272D"}} data-color="Red" data-img="images/Carnations_Red.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
                <button type="button" className="swatch" style={{ background: "#F2A6C4"}} data-color="Pink" data-img="images/Carnations_Pink.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink"></button>
                <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Carnations_White.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
                <button type="button" className="swatch" style={{ background: "#E07A3D"}} data-color="Orange" data-img="images/Carnations_Orange.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Orange"></button>
                <button type="button" className="swatch" style={{ background: "#F3C4A2"}} data-color="Peach" data-img="images/Carnations_Peach.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Peach"></button>
                <button type="button" className="swatch" style={{ background: "#7E57C2"}} data-color="Purple" data-img="images/Carnations_Purple.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Purple"></button>
                <button type="button" className="swatch" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Carnations_Yellow.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">Red</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Chrysanthemums" data-price="30" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Chrysanthemum_Yellow.jpg?v=20260912g" alt="Chrysanthemums - Yellow" />
            </div>
            <div className="prod-info">
              <h4>Chrysanthemums</h4>
              <div className="price">
                ₹30
                <span>PER STEM</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Chrysanthemum_Yellow.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
                <button type="button" className="swatch" style={{ background: "#B32D3A"}} data-color="Red" data-img="images/Chrysanthemum_Red.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
                <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Chrysanthemum_White.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
                <button type="button" className="swatch" style={{ background: "#F06292"}} data-color="Pink" data-img="images/Chrysanthemum_Pink.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink"></button>
                <button type="button" className="swatch" style={{ background: "#7E57C2"}} data-color="Purple" data-img="images/Chrysanthemum_Purple.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Purple"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">Yellow</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Dahlias" data-price="30" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Dahlia_White.jpg?v=20260912g" alt="Dahlias - White" />
            </div>
            <div className="prod-info">
              <h4>Dahlias</h4>
              <div className="price">
                ₹30
                <span>PER STEM</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Dahlia_White.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
                <button type="button" className="swatch" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Dahlia_Yellow.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
                <button type="button" className="swatch" style={{ background: "#C1272D"}} data-color="Red" data-img="images/Dahlia_Red.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">White</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Gladiolus" data-price="30" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Gladiolus_Red.jpg?v=20260912g" alt="Gladiolus - Red" />
            </div>
            <div className="prod-info">
              <h4>Gladiolus</h4>
              <div className="price">
                ₹30
                <span>PER STEM</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#D32F2F"}} data-color="Red" data-img="images/Gladiolus_Red.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
                <button type="button" className="swatch" style={{ background: "#F2A6C4"}} data-color="Pink" data-img="images/Gladiolus_Pink.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink"></button>
                <button type="button" className="swatch" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Gladiolus_Yellow.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
                <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Gladiolus_White.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">Red</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Asiatic Lily" data-price="40" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Asiatic_Lily_Light_Yellow.jpg?v=20260912g" alt="Asiatic Lily - Light Yellow" />
            </div>
            <div className="prod-info">
              <h4>Asiatic Lily</h4>
              <div className="price">
                ₹40
                <span>PER STEM</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#F7E27A"}} data-color="Light Yellow" data-img="images/Asiatic_Lily_Light_Yellow.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Light Yellow"></button>
                <button type="button" className="swatch" style={{ background: "#F4C430"}} data-color="Deep Yellow" data-img="images/Asiatic_Lily_Deep_Yellow.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Deep Yellow"></button>
                <button type="button" className="swatch" style={{ background: "#E07A3D"}} data-color="Orange" data-img="images/Asiatic_Lily_Orange.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Orange"></button>
                <button type="button" className="swatch" style={{ background: "#F2A6C4"}} data-color="Pink" data-img="images/Asiatic_Lily_Pink.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink"></button>
                <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Asiatic_Lily_White.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">Light Yellow</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Orchids (set of 10)" data-price="450" data-unit="set of 10">
            <div className="prod-photo">
              <img className="var-img" src="images/Orchid_Blue.jpg?v=20260912g" alt="Orchids - Blue" />
            </div>
            <div className="prod-info">
              <h4>Orchids</h4>
              <div className="price">
                ₹450
                <span>PER 10</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#3D5AFE"}} data-color="Blue" data-img="images/Orchid_Blue.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Blue"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">Blue</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Oriental Lilies" data-price="80" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Oriental_Lily_Pink.jpg?v=20260912g" alt="Oriental Lilies - Pink" />
            </div>
            <div className="prod-info">
              <h4>Oriental Lilies</h4>
              <div className="price">
                ₹80
                <span>PER STEM</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#F2A6C4"}} data-color="Pink" data-img="images/Oriental_Lily_Pink.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink"></button>
                <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Oriental_Lily_White.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">Pink</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Sunflower" data-price="120" data-unit="stem">
            <div className="prod-photo">
              <img src="images/Sunflower.jpg?v=20260912g" alt="Sunflower" />
            </div>
            <div className="prod-info">
              <h4>Sunflower</h4>
              <div className="price">
                ₹120
                <span>PER STEM</span>
              </div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Baby's Breath" data-price="50" data-unit="bunch">
            <div className="prod-photo">
              <img className="var-img" src="images/Baby_Breath.jpg?v=20260912g" alt="Baby's Breath - White" />
            </div>
            <div className="prod-info">
              <h4>Baby's Breath</h4>
              <div className="price">
                ₹50
                <span>PER BUNCH</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Baby_Breath.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
                <button type="button" className="swatch" style={{ background: "#9B7EDE"}} data-color="Purple" data-img="images/Baby_Breath_Purple.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Purple"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">White</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Anthurium" data-price="0" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Anthurium_Red.jpg?v=20260912g" alt="Anthurium - Red" />
            </div>
            <div className="prod-info">
              <h4>Anthurium</h4>
              <div className="price">
                On request
                <span>ON REQUEST</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#C1272D"}} data-color="Red" data-img="images/Anthurium_Red.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">Red</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Tuberose" data-price="0" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Tuberose_White.jpg?v=20260912g" alt="Tuberose - White" />
            </div>
            <div className="prod-info">
              <h4>Tuberose</h4>
              <div className="price">
                On request
                <span>ON REQUEST</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Tuberose_White.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">White</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Asparagus Fern" data-price="0" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Asparagus_Fern_Green.jpg?v=20260912g" alt="Asparagus Fern - Green" />
            </div>
            <div className="prod-info">
              <h4>Asparagus Fern</h4>
              <div className="price">
                On request
                <span>ON REQUEST</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#4F7A3E"}} data-color="Green" data-img="images/Asparagus_Fern_Green.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Green"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">Green</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Eucalyptus" data-price="0" data-unit="stem">
            <div className="prod-photo">
              <img className="var-img" src="images/Eucalyptus_Green.jpg?v=20260912g" alt="Eucalyptus - Green" />
            </div>
            <div className="prod-info">
              <h4>Eucalyptus</h4>
              <div className="price">
                On request
                <span>ON REQUEST</span>
              </div>
              <div className="color-row">
                <button type="button" className="swatch active" style={{ background: "#6B8F71"}} data-color="Green" data-img="images/Eucalyptus_Green.jpg?v=20260912g" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Green"></button>
              </div>
              <div className="qty-row">
                <span className="qty-label">
                  Qty 
                  <span className="qty-color-tag">Green</span>
                </span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndexPuja8() {
  return (
    <section id="puja">
      <div className="wrap">
        <div className="puja-top">
          <div className="life-shot">
            <img src="images/life/kraft-box.jpg" alt="Overnight packing for morning delivery" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow">Daily puja</p>
            <h2>Your puja. Your flowers. Every morning.</h2>
            <div className="pack-picker">
              <label>Pack size</label>
              <div className="seg" id="packSizes">
                <button type="button" className="seg-btn active" data-size="Small">Small</button>
                <button type="button" className="seg-btn" data-size="Medium">Medium</button>
                <button type="button" className="seg-btn" data-size="Large">Large</button>
              </div>
              <label>Prepaid duration</label>
              <div className="seg" id="packDays">
                <button type="button" className="seg-btn" data-days="7">7 days</button>
                <button type="button" className="seg-btn active" data-days="30">30 days</button>
                <button type="button" className="seg-btn" data-days="90">90 days</button>
              </div>
              <label>Frequency</label>
              <div className="seg" id="packFreq">
                <button type="button" className="seg-btn active" data-freq="daily">Daily</button>
                <button type="button" className="seg-btn" data-freq="weekly">Weekly</button>
                <button type="button" className="seg-btn" data-freq="monthly">Monthly</button>
              </div>
              <div className="pack-price-row">
                <div>
                  <span id="packLabel">Medium · 30 days · Daily</span>
                  <br />
                  <small id="packNote">Predefined Daily Puja Pack · delivery included</small>
                </div>
                <b id="packPrice">₹899</b>
              </div>
              <button className="btn btn-primary" type="button" id="addPackBtn" style={{ width: "100%"}}>Add Daily Puja Pack</button>
            </div>
          </div>
        </div>
        <div className="prod-grid" data-show-all="1">
          <div className="prod-card" data-name="Daily Puja Pack" data-price="0" data-unit="pack" data-offering="puja_pack">
            <div className="prod-photo">
              <img src="images/Puja_Loose_Flowers.jpg?v=20260912g" alt="Daily puja flower pack" />
            </div>
            <div className="prod-info">
              <h4>Daily Puja Pack</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>S / M / L · Daily / Weekly / Monthly · 7 / 30 / 90 days</div>
              <p className="pack-card-note">Use the size and duration picker above to add the prepaid pack. This is a predefined offering, not a custom daily mix.</p>
            </div>
          </div>
          <div className="prod-card" data-name="Marigold" data-price="0" data-unit="pack">
            <div className="prod-photo">
              <img src="images/Puja_Loose_Marigold.jpg?v=20260912g" alt="Loose marigold flowers" />
            </div>
            <div className="prod-info">
              <h4>Marigold</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>100 g</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Lotus" data-price="0" data-unit="pc">
            <div className="prod-photo">
              <img src="images/Lotus.jpg?v=20260912g" alt="Lotus" />
            </div>
            <div className="prod-info">
              <h4>Lotus</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>1 piece</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Durva Grass" data-price="0" data-unit="bunch">
            <div className="prod-photo">
              <img src="images/Puja_Durva_Grass.jpg?v=20260912g" alt="Durva grass" />
            </div>
            <div className="prod-info">
              <h4>Durva Grass</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>Tied bunch</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Bilva Leaves" data-price="0" data-unit="pack">
            <div className="prod-photo">
              <img src="images/Puja_Loose_Bilva_Leaves.jpg?v=20260912g" alt="Loose bilva leaves" />
            </div>
            <div className="prod-info">
              <h4>Bilva Leaves</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>100 g</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Loose Tulsi Leaves" data-price="0" data-unit="pack">
            <div className="prod-photo">
              <img src="images/Puja_Loose_Tulsi.jpg?v=20260912g" alt="Loose tulsi leaves" />
            </div>
            <div className="prod-info">
              <h4>Loose Tulsi Leaves</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>100 g</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Loose Lily Flowers" data-price="0" data-unit="pack">
            <div className="prod-photo">
              <img src="images/Puja_Loose_Lily.jpg?v=20260912g" alt="Loose lily flowers" />
            </div>
            <div className="prod-info">
              <h4>Loose Lily Flowers</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>100 g</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Loose Rose Flowers" data-price="0" data-unit="pack">
            <div className="prod-photo">
              <img src="images/Puja_Loose_Rose.jpg?v=20260912g" alt="Loose rose flowers" />
            </div>
            <div className="prod-info">
              <h4>Loose Rose Flowers</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>100 g</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Jasmine Garland" data-price="0" data-unit="garland">
            <div className="prod-photo">
              <img src="images/Mogra_Garland.jpg?v=20260912g" alt="Jasmine mogra garland" />
            </div>
            <div className="prod-info">
              <h4>Jasmine Garland</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>40–45 cm</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Marigold Garland" data-price="0" data-unit="garland">
            <div className="prod-photo">
              <img src="images/Marigold_Garland.jpg?v=20260912g" alt="Marigold garland" />
            </div>
            <div className="prod-info">
              <h4>Marigold Garland</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>40–45 cm</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Tulsi Garland" data-price="0" data-unit="garland">
            <div className="prod-photo">
              <img src="images/Tulsi_Garland.jpg?v=20260912g" alt="Tulsi garland" />
            </div>
            <div className="prod-info">
              <h4>Tulsi Garland</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>40 cm</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Chrysanthemum Garland" data-price="0" data-unit="garland">
            <div className="prod-photo">
              <img src="images/Puja_Chrysanthemum_Garland.jpg?v=20260912g" alt="Chrysanthemum garland" />
            </div>
            <div className="prod-info">
              <h4>Chrysanthemum Garland</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>Garland</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
          <div className="prod-card" data-name="Betel Leaf Garland" data-price="0" data-unit="garland">
            <div className="prod-photo">
              <img src="images/Puja_Betel_Leaf_Garland.jpg?v=20260912g" alt="Betel leaf garland" />
            </div>
            <div className="prod-info">
              <h4>Betel Leaf Garland</h4>
              <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontWeight: "600"}}>21 / 51 / 108</div>
              <div className="qty-row">
                <span className="qty-label">Qty</span>
                <div className="stepper">
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                  <span className="step-val">0</span>
                  <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cadence-row">
                <label>Frequency</label>
                <div className="seg">
                  <button type="button" className="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="daily">Daily</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
                  <button type="button" className="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
                </div>
                <div className="days-row">
                  <button type="button" className="seg-btn" data-days="7">7 days</button>
                  <button type="button" className="seg-btn active" data-days="30">30 days</button>
                  <button type="button" className="seg-btn" data-days="90">90 days</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="seo-links">
          <a href="puja.html">Puja essentials</a>
          <a href="garlands.html">All garlands</a>
        </p>
      </div>
    </section>
  );
}

export function IndexHow9() {
  return (
    <section id="how">
      <div className="wrap">
        <p className="eyebrow">Farm to flat</p>
        <h2>From chat to doorstep.</h2>
        <div className="steps">
          <div className="step">
            <div className="step-photo">
              <img src="images/life/whatsapp-order.jpg" alt="Ordering flowers by chat" loading="lazy" />
            </div>
            <h4>11:00 PM · Order</h4>
            <p>Stems and puja packs for tomorrow. Member login locks payment when you are ready.</p>
          </div>
          <div className="step">
            <div className="step-photo">
              <img src="images/life/kraft-box.jpg" alt="Flowers cut at dawn with growers" loading="lazy" />
            </div>
            <h4>Overnight · Cut</h4>
            <p>Fresh from growers after cut-off — not sitting in a city warehouse all week.</p>
          </div>
          <div className="step">
            <div className="step-photo">
              <img src="images/life/farm-cut.jpg" alt="Sorted and packed at the warehouse" loading="lazy" />
            </div>
            <h4>Dawn · Packed</h4>
            <p>Sorted at the North Bangalore warehouse, routed by apartment block.</p>
          </div>
          <div className="step">
            <div className="step-photo">
              <img src="images/life/delivery-door.jpg" alt="Doorstep delivery of fresh flowers" loading="lazy" />
            </div>
            <h4>By 9:00 AM · Door</h4>
            <p>Puja packs by 7:30 AM. Decorative stems by 9 AM. Nothing crushed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndexCoverage10() {
  return (
    <section id="coverage">
      <div className="wrap pin-wrap">
        <p className="eyebrow">Delivery check</p>
        <h2>Is your pincode on today’s route?</h2>
        <p>
          Enter a 6-digit PIN. Listed North, Central and East areas are on the 
          <a href="delivery.html">Delivery</a>
           page — if yours is not there, WhatsApp us and we will confirm.
        </p>
        <form id="pinForm" className="pin-form">
          <input id="pinInput" name="pincode" inputMode="numeric" maxLength="6" autocomplete="postal-code" placeholder="560064" aria-label="Pincode" />
          <button type="submit" className="btn btn-primary" aria-label="Check delivery on WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"></path>
              <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.6 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3C3.7 14.7 3.2 13.4 3.2 12 3.2 7.2 7.2 3.2 12 3.2S20.8 7.2 20.8 12 16.8 20.2 12 20.2z"></path>
            </svg>
             Check
          </button>
        </form>
        <p className="pin-ok" id="pinHint" hidden={true}></p>
        <p className="pin-err" id="pinErr" hidden={true}></p>
        <p className="seo-links">
          <a href="delivery.html">Delivery zones and pincodes</a>
        </p>
      </div>
    </section>
  );
}

export function IndexSection11() {
  return (
    <section>
      <div className="wrap">
        <div className="cta-photo">
          <img src="images/life/delivery-door.jpg" alt="Doorstep delivery in North Bangalore" loading="lazy" />
        </div>
        <div className="cta-band">
          <h2>Morning flowers for your block.</h2>
          <a className="wa-icon" href="https://wa.me/918147613636" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"></path>
              <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.6 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3C3.7 14.7 3.2 13.4 3.2 12 3.2 7.2 7.2 3.2 12 3.2S20.8 7.2 20.8 12 16.8 20.2 12 20.2z"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export function IndexFooter12() {
  return (
    <footer>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", gap: "24px", flexWrap: "wrap"}}>
        <div>
          <a className="logo" href="index.html">
            <img src="images/logo.svg" alt="FreshPhool" />
          </a>
          <p style={{maxWidth: "320px", color: "var(--muted)", fontSize: "14px"}}>Per-stem morning flowers for North, Central and East Bangalore apartments. Complete Bengaluru coverage within the next 4 months.</p>
        </div>
        <div>
          <a href="daily-flowers.html">Daily flowers</a>
          <br />
          <a href="puja.html">Puja</a>
          <br />
          <a href="garlands.html">Garlands</a>
          <br />
          <a href="delivery.html">Delivery</a>
        </div>
        <div>
          <a href="https://wa.me/918147613636" target="_blank" rel="noopener">+91 81476 13636</a>
          <br />
          <a href="https://freshphool.com">freshphool.com</a>
          <div className="footer-social">
            <a href="#social" aria-label="Instagram (placeholder)">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8"></rect>
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8"></circle>
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"></circle>
              </svg>
            </a>
            <a href="#social" aria-label="Facebook (placeholder)">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path fill="currentColor" d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z"></path>
              </svg>
            </a>
            <a href="#social" aria-label="YouTube (placeholder)">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path fill="currentColor" d="M23 12s0-3.6-.5-5.2c-.3-.9-1-1.6-1.9-1.9C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.6.4c-.9.3-1.6 1-1.9 1.9C1 8.4 1 12 1 12s0 3.6.5 5.2c.3.9 1 1.6 1.9 1.9 1.7.4 8.6.4 8.6.4s6.9 0 8.6-.4c.9-.3 1.6-1 1.9-1.9.5-1.6.5-5.2.5-5.2z"></path>
                <path fill="var(--bg)" d="M10 15.5v-7l6 3.5-6 3.5z"></path>
              </svg>
            </a>
            <a href="#social" aria-label="LinkedIn (placeholder)">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path fill="currentColor" d="M6.5 9H4V20h2.5V9zM5.25 4C4.28 4 3.5 4.78 3.5 5.75S4.28 7.5 5.25 7.5 7 6.72 7 5.75 6.22 4 5.25 4zM20 20h-2.5v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V20H11V9h2.4v1.51h.03c.33-.63 1.15-1.3 2.37-1.3 2.54 0 3.2 1.67 3.2 3.84V20z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function IndexNavDrawerOverlay13() {
  return (
    <div className="nav-drawer-overlay" id="navDrawerOverlay" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}></div>
  );
}

export function IndexNavDrawer14() {
  return (
    <aside className="nav-drawer" id="navDrawer" aria-hidden="true">
      <div className="nav-drawer-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "20px"}}>
        <span>Menu</span>
        <button type="button" className="nav-drawer-close" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")} aria-label="Close menu" style={{ border: "0", background: "none", fontSize: "22px", cursor: "pointer"}}>×</button>
      </div>
      <div className="nav-search drawer-search" role="search">
        <input type="text" id="drawerSearch" name="fp-flower-q" placeholder="Search your Flowers" aria-label="Search your Flowers" inputMode="search" autocomplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false" data-lpignore="true" readOnly={true} onFocus={(event) => runInlineHandler(event, "this.removeAttribute('readonly')")} onInput={(event) => runInlineHandler(event, "fpNav.search(this.value)")} onKeyDown={(event) => runInlineHandler(event, "if(event.key==='Enter')fpNav.searchEnter()")} />
      </div>
      <nav className="drawer-links">
        <a href="daily-flowers.html" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}>Daily flowers</a>
        <a href="puja.html" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}>Puja essentials</a>
        <a href="garlands.html" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}>Garlands</a>
        <a href="delivery.html" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}>Delivery</a>
        <a href="index.html#how" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}>How it works</a>
        <a className="wa-icon" href="https://wa.me/918147613636" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"></path>
            <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.6 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3C3.7 14.7 3.2 13.4 3.2 12 3.2 7.2 7.2 3.2 12 3.2S20.8 7.2 20.8 12 16.8 20.2 12 20.2z"></path>
          </svg>
        </a>
      </nav>
    </aside>
  );
}

export function IndexCartBar15() {
  return (
    <div className="cart-bar" id="cartBar">
      <div className="cart-bar-info">
        <b id="cartBarCount">0 items</b>
        <span id="cartBarSubtotal">Add flowers to get started</span>
      </div>
      <button className="btn btn-primary" onClick={(event) => runInlineHandler(event, "fpCart.openPanel()")}>Review order</button>
    </div>
  );
}

export function IndexCartOverlay16() {
  return (
    <div className="cart-overlay" id="cartOverlay" onClick={(event) => runInlineHandler(event, "fpCart.closePanel()")}></div>
  );
}

export function IndexMemberModal17() {
  return (
    <div className="member-modal-backdrop" id="memberModal" aria-hidden="true">
      <div className="member-modal mode-login" role="dialog" aria-labelledby="memberModalTitle">
        <button type="button" className="close-x" onClick={(event) => runInlineHandler(event, "fpMember.close()")} aria-label="Close">×</button>
        <h3 id="memberModalTitle">Member Login</h3>
        <p className="lede-sm" id="memberModalHint">Email + phone Member account for checkout.</p>
        <div className="tabs" id="memberTabs">
          <button type="button" className="tab-btn active" data-mode="login" onClick={(event) => runInlineHandler(event, "fpMember.setMode('login')")}>Login</button>
          <button type="button" className="tab-btn" data-mode="register" onClick={(event) => runInlineHandler(event, "fpMember.setMode('register')")}>Register</button>
        </div>
        <div id="memberAuthFields">
          <label htmlFor="memberEmail">Email</label>
          <input id="memberEmail" type="email" placeholder="you@example.com" autocomplete="email" />
          <div className="reg-only">
            <label htmlFor="memberName">Name</label>
            <input id="memberName" type="text" placeholder="Your name" autocomplete="name" />
          </div>
          <label htmlFor="memberPhone">Phone (India)</label>
          <input id="memberPhone" type="tel" inputMode="numeric" placeholder="10-digit mobile" autocomplete="tel" />
          <label htmlFor="memberPass">Password</label>
          <input id="memberPass" type="password" placeholder="At least 6 characters" autocomplete="current-password" />
          <p className="err" id="memberErr"></p>
          <button type="button" className="btn btn-primary" style={{ width: "100%", marginTop: "12px"}} id="memberSubmitBtn" onClick={(event) => runInlineHandler(event, "fpMember.submit()")}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export function IndexCartPanel18() {
  return (
    <div className="cart-panel" id="cartPanel">
      <div className="cart-panel-head">
        <h3>Your order</h3>
        <button className="cart-close" onClick={(event) => runInlineHandler(event, "fpCart.closePanel()")} aria-label="Close">✕</button>
      </div>
      <div id="cartItems"></div>
      <div className="cart-total-row" id="cartTotalRow" style={{ display: "none"}}>
        <span>Prepaid total</span>
        <b id="cartTotalAmt">₹0</b>
      </div>
      <p className="cart-note" id="cartPricedNote" style={{ display: "none"}}>Some lines are priced on WhatsApp.</p>
      <div className="cart-form">
        <input type="text" id="aptInput" list="aptList" placeholder="Apartment / Community name" />
        <datalist id="aptList">
          <option value="Bhartiya City Nikoo Homes">
            <option value="Sobha City">
              <option value="Sobha Dream Gardens">
                <option value="Provident Harmony">
                  <option value="Kolte Patil Raaga">
                    <option value="Kolte Patil Lakeside 24">
                      <option value="Purva Atmosphere">
                        <option value="Mantri Lithos">
                          <option value="Brigade Laguna">
                            <option value="DS Max Skycity">
                              <option value="Orchid Woods">
                                <option value="Goyal Orchid Piccadilly">
                                  <option value="Brigade Altamont">
                                    <option value="Assetz Here & Now">
                                      <option value="Vajram Newtown">
                                        <option value="Unishire Elan">
                                          <option value="Amigo Estella">
                                            <option value="Sumadhura Epitome">
                                              <option value="Baldota Signature">
                                                <option value="Sansidh Galaxy">
                                                  <option value="The Icon">
                                                    <option value="Bhartiya City Leela Residences">
                                                      <option value="Lodha Manyata">
                                                        <option value="Godrej Woods / Godrej Thanisandra">
                                                          <option value="Prestige Camden Gardens">
                                                            <option value="TVS Emerald Auralis">
                                                              <option value="Provident Neora">
                                                                <option value="Sobha City Mykonos">
                                                                  <option value="Mantri Greens"></option>
                                                                </option>
                                                              </option>
                                                            </option>
                                                          </option>
                                                        </option>
                                                      </option>
                                                    </option>
                                                  </option>
                                                </option>
                                              </option>
                                            </option>
                                          </option>
                                        </option>
                                      </option>
                                    </option>
                                  </option>
                                </option>
                              </option>
                            </option>
                          </option>
                        </option>
                      </option>
                    </option>
                  </option>
                </option>
              </option>
            </option>
          </option>
        </datalist>
        <input type="text" id="blockInput" placeholder="Block & Flat No. (e.g. C-402)" />
      </div>
      <button className="btn btn-primary" type="button" onClick={(event) => runInlineHandler(event, "fpCart.placeOrder()")} style={{ width: "100%"}}>Proceed to payment</button>
      <p style={{textAlign: "center", marginTop: "12px"}}>
        <a className="wa-icon" href="https://wa.me/918147613636" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"></path>
            <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.6 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3C3.7 14.7 3.2 13.4 3.2 12 3.2 7.2 7.2 3.2 12 3.2S20.8 7.2 20.8 12 16.8 20.2 12 20.2z"></path>
          </svg>
        </a>
      </p>
      <p className="cart-note" style={{textAlign: "center"}}>Members must be logged in. Payment via Razorpay lands after KYC.</p>
    </div>
  );
}

export function IndexScript19() {
  return (
    <script src="js/vendor/capacitor.js"></script>
  );
}

export function IndexScript20() {
  return (
    <script src="js/fp-native.js?v=20260912g"></script>
  );
}

export function IndexScript21() {
  return (
    <script src="js/flower-lore.js?v=20260912g"></script>
  );
}

export function IndexScript22() {
  return (
    <script src="js/fp-looks.js?v=20260912g"></script>
  );
}

export default function IndexPage() {
  return (
    <>
      <IndexDevBanner1 />
      <IndexHeader2 />
      <IndexMarqueeMqA3 />
      <IndexHero4 />
      <IndexMarqueeMqB5 />
      <IndexThemes6 />
      <IndexFlowers7 />
      <IndexPuja8 />
      <IndexHow9 />
      <IndexCoverage10 />
      <IndexSection11 />
      <IndexFooter12 />
      <IndexNavDrawerOverlay13 />
      <IndexNavDrawer14 />
      <IndexCartBar15 />
      <IndexCartOverlay16 />
      <IndexMemberModal17 />
      <IndexCartPanel18 />
      <IndexScript19 />
      <IndexScript20 />
      <IndexScript21 />
      <IndexScript22 />
    </>
  );
}
