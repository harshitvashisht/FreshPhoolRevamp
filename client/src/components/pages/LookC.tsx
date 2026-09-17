import React from "react";
import { runInlineHandler } from "../../lib/inlineHandler";

export function LookCPreviewBanner1() {
  return (
    <div className="preview-banner">
      Design preview — pick a direction · 
      <a href="looks.html">All three looks</a>
       · 
      <a href="index.html">Current live site</a>
    </div>
  );
}

export function LookCHeader2() {
  return (
    <header>
      <nav className="wrap">
        <button type="button" className="nav-burger" id="navBurger" aria-label="Open menu" aria-expanded="false" aria-controls="navDrawer" onClick={(event) => runInlineHandler(event, "fpNav.openDrawer()")}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <a href="looks.html" className="logo">
          <img src="images/logo-nav.svg" alt="FreshPhool" width="210" height="48" />
        </a>
        <div className="navlinks" id="navLinks">
          <a href="#flowers">Flowers</a>
          <a href="#puja">Puja</a>
          <a href="#how">How it works</a>
          <a href="#coverage">Check pincode</a>
        </div>
        <div className="nav-cta">
          <div className="nav-search" id="navSearchWrap" role="search">
            <input type="search" id="navSearch" placeholder="Search\u2026" aria-label="Search flowers" autoComplete="off" onInput={(event) => runInlineHandler(event, "fpNav.search(this.value)")} onKeyDown={(event) => runInlineHandler(event, "if(event.key==='Enter')fpNav.searchEnter()")} />
          </div>

          <a className="member-login-btn" href="/dashboard" style={{ textDecoration: "none" }}>Dashboard</a>
          <a className="member-login-btn" href="/login" style={{ textDecoration: "none" }}>Sign in</a>
          <a className="member-login-btn" href="/dashboard" style={{ textDecoration: "none" }}>Dashboard</a>
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

export function LookCMarqueeTicker3() {
  return (
    <div className="marquee ticker" data-marquee="">
      <div className="marquee-track" data-marquee-track="">
        <span className="mq-item">Rosa</span>
        <span className="mq-item">Gerbera</span>
        <span className="mq-item">Dianthus</span>
        <span className="mq-item">Chrysanthemum</span>
        <span className="mq-item">Dahlia</span>
        <span className="mq-item">Gladiolus</span>
        <span className="mq-item">Lilium</span>
        <span className="mq-item">Dendrobium</span>
        <span className="mq-item">Helianthus</span>
        <span className="mq-item">Gypsophila</span>
        <span className="mq-item">Nelumbo</span>
        <span className="mq-item">Jasminum</span>
      </div>
    </div>
  );
}

export function LookCHeroCWrap4() {
  return (
    <section className="hero-c wrap">
      <div>
        <p className="eyebrow">Mono stems · Bengaluru</p>
        <h1>Fresh Flowers, Every Morning.</h1>
        <p>The quiet luxury of a single variety, cut overnight, at your door before nine. Hover any stem for its name, origin, and the science that keeps it alive in the vase.</p>
        <div style={{ display: "flex", gap: "14px", alignItems: "center", marginTop: "28px"}}>
          <a className="btn btn-ghost" href="#flowers">The cut</a>
          <a className="wa-icon" href="https://wa.me/918147613636" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"></path>
              <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.6 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3C3.7 14.7 3.2 13.4 3.2 12 3.2 7.2 7.2 3.2 12 3.2S20.8 7.2 20.8 12 16.8 20.2 12 20.2z"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="hero-photo">
        <img src="images/life/hero-vase.jpg" alt="Single-variety arrangement" />
      </div>
    </section>
  );
}

export function LookCFlowers5() {
  return (
    <section id="flowers" className="wrap" style={{padding: "48px 0"}}>
      <p className="eyebrow">The cut</p>
      <h2>Eleven stems. Five across.</h2>
      <div className="prod-grid" style={{marginTop: "28px"}}>
        <div className="prod-card" data-name="Fresh Roses" data-price="15" data-unit="stem">
          <div className="prod-photo">
            <img className="var-img" src="images/Roses_Red.jpg" alt="Fresh Roses - Red" />
          </div>
          <div className="prod-info">
            <h4>Fresh Roses</h4>
            <div className="price">
              ₹15
              <span>PER STEM</span>
            </div>
            <div className="color-row">
              <button type="button" className="swatch active" style={{ background: "#C1272D"}} data-color="Red" data-img="images/Roses_Red.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
              <button type="button" className="swatch" style={{ background: "#F2A6C4"}} data-color="Pink" data-img="images/Roses-Pink.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink"></button>
              <button type="button" className="swatch" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Roses_Yellow.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
              <button type="button" className="swatch" style={{ background: "#E07A3D"}} data-color="Orange" data-img="images/Roses_Orange.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Orange"></button>
              <button type="button" className="swatch" style={{ background: "#F3C4A2"}} data-color="Peach" data-img="images/Roses_Peach.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Peach"></button>
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
          </div>
        </div>
        <div className="prod-card" data-name="Gerbera" data-price="20" data-unit="stem">
          <div className="prod-photo">
            <img className="var-img" src="images/Gerbera_Red.jpg" alt="Gerbera - Red" />
          </div>
          <div className="prod-info">
            <h4>Gerbera</h4>
            <div className="price">
              ₹20
              <span>PER STEM</span>
            </div>
            <div className="color-row">
              <button type="button" className="swatch active" style={{ background: "#D32F2F"}} data-color="Red" data-img="images/Gerbera_Red.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
              <button type="button" className="swatch" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Gerbera_Yellow.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
              <button type="button" className="swatch" style={{ background: "#F5821F"}} data-color="Orange" data-img="images/Gerbera-Orange.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Orange"></button>
              <button type="button" className="swatch" style={{ background: "#F06292"}} data-color="Pink" data-img="images/Gerbera-Pink.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink"></button>
              <button type="button" className="swatch" style={{ background: "#7E57C2"}} data-color="Purple" data-img="images/Gerbera_Purple.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Purple"></button>
              <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Gerbera_White.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
              <button type="button" className="swatch" style={{ background: "#E9967A"}} data-color="Salmon" data-img="images/Gerbera_Salmon.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Salmon"></button>
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
          </div>
        </div>
        <div className="prod-card" data-name="Carnations" data-price="20" data-unit="stem">
          <div className="prod-photo">
            <img className="var-img" src="images/Carnations_Red.jpg" alt="Carnations - Red" />
          </div>
          <div className="prod-info">
            <h4>Carnations</h4>
            <div className="price">
              ₹20
              <span>PER STEM</span>
            </div>
            <div className="color-row">
              <button type="button" className="swatch active" style={{ background: "#C1272D"}} data-color="Red" data-img="images/Carnations_Red.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
              <button type="button" className="swatch" style={{ background: "#F2A6C4"}} data-color="Pink" data-img="images/Carnations_Pink.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink"></button>
              <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Carnations_white.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
              <button type="button" className="swatch" style={{ background: "#E07A3D"}} data-color="Orange" data-img="images/Carnations_Orange.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Orange"></button>
              <button type="button" className="swatch" style={{ background: "#7E57C2"}} data-color="Purple" data-img="images/Carnations_Purple.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Purple"></button>
              <button type="button" className="swatch" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Carnations_Yellow.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
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
          </div>
        </div>
        <div className="prod-card" data-name="Chrysanthemums" data-price="30" data-unit="stem">
          <div className="prod-photo">
            <img className="var-img" src="images/Chrysanthemum_Yellow.jpg" alt="Chrysanthemums - Yellow" />
          </div>
          <div className="prod-info">
            <h4>Chrysanthemums</h4>
            <div className="price">
              ₹30
              <span>PER STEM</span>
            </div>
            <div className="color-row">
              <button type="button" className="swatch active" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Chrysanthemum_Yellow.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
              <button type="button" className="swatch" style={{ background: "#B32D3A"}} data-color="Red" data-img="images/Chrysanthemum-red.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
              <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Chrysanthemum_White.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
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
          </div>
        </div>
        <div className="prod-card" data-name="Dahlias" data-price="30" data-unit="stem">
          <div className="prod-photo">
            <img className="var-img" src="images/Dahlia_white.jpg" alt="Dahlias - White" />
          </div>
          <div className="prod-info">
            <h4>Dahlias</h4>
            <div className="price">
              ₹30
              <span>PER STEM</span>
            </div>
            <div className="color-row">
              <button type="button" className="swatch active" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Dahlia_white.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
              <button type="button" className="swatch" style={{ background: "#E07A3D"}} data-color="Orange" data-img="images/Dahlia_Orange.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Orange"></button>
              <button type="button" className="swatch" style={{ background: "#C1272D"}} data-color="Red" data-img="images/Dahlia_Red.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
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
          </div>
        </div>
        <div className="prod-card" data-name="Gladiolus" data-price="30" data-unit="stem">
          <div className="prod-photo">
            <img className="var-img" src="images/Gladiolus_red.jpg" alt="Gladiolus - Red" />
          </div>
          <div className="prod-info">
            <h4>Gladiolus</h4>
            <div className="price">
              ₹30
              <span>PER STEM</span>
            </div>
            <div className="color-row">
              <button type="button" className="swatch active" style={{ background: "#D32F2F"}} data-color="Red" data-img="images/Gladiolus_red.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
              <button type="button" className="swatch" style={{ background: "#F2A6C4"}} data-color="Pink" data-img="images/Gladiolus_Pink.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink"></button>
              <button type="button" className="swatch" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Gladiolus_Yellow.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
              <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Gladiolus_White.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
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
          </div>
        </div>
        <div className="prod-card" data-name="Asiatic Lily" data-price="40" data-unit="stem">
          <div className="prod-photo">
            <img className="var-img" src="images/Asiatic_Lily_Yellow.jpg" alt="Asiatic Lily - Yellow" />
          </div>
          <div className="prod-info">
            <h4>Asiatic Lily</h4>
            <div className="price">
              ₹40
              <span>PER STEM</span>
            </div>
            <div className="color-row">
              <button type="button" className="swatch active" style={{ background: "#F4C430"}} data-color="Yellow" data-img="images/Asiatic_Lily_Yellow.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Yellow"></button>
              <button type="button" className="swatch" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Asiatic_Lily_White.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
              <button type="button" className="swatch" style={{ background: "#C1272D"}} data-color="Red" data-img="images/Asiatic_Lily_Red.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
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
          </div>
        </div>
        <div className="prod-card" data-name="Orchids (set of 10)" data-price="450" data-unit="set of 10">
          <div className="prod-photo">
            <img src="images/Orchids.jpg" alt="Orchids" />
          </div>
          <div className="prod-info">
            <h4>Orchids</h4>
            <div className="price">
              ₹450
              <span>PER 10</span>
            </div>
            <div className="qty-row">
              <span className="qty-label">Qty</span>
              <div className="stepper">
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                <span className="step-val">0</span>
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="prod-card" data-name="Oriental Lilies" data-price="80" data-unit="stem">
          <div className="prod-photo">
            <img className="var-img" src="images/Oriental_Lily_Pink-Rose.jpg" alt="Oriental Lilies - Pink & Rose" />
          </div>
          <div className="prod-info">
            <h4>Oriental Lilies</h4>
            <div className="price">
              ₹80
              <span>PER STEM</span>
            </div>
            <div className="color-row">
              <button type="button" className="swatch active" style={{ background: "linear-gradient(135deg,#F2A6C4 50%,#C2185B 50%)"}} data-color="Pink-Rose" data-img="images/Oriental_Lily_Pink-Rose.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Pink & Rose"></button>
              <button type="button" className="swatch" style={{ background: "linear-gradient(135deg,#FFFFFF 50%,#F3E6C8 50%)", border: "1.5px solid var(--line)"}} data-color="White-Cream" data-img="images/Oriental_Lily_White-Cream.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White & Cream"></button>
              <button type="button" className="swatch" style={{ background: "#B32D3A"}} data-color="Red" data-img="images/Oriental_Lily_Red.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Red"></button>
            </div>
            <div className="qty-row">
              <span className="qty-label">
                Qty 
                <span className="qty-color-tag">Pink-Rose</span>
              </span>
              <div className="stepper">
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                <span className="step-val">0</span>
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="prod-card" data-name="Sunflower" data-price="120" data-unit="stem">
          <div className="prod-photo">
            <img src="images/Sunflower.jpg" alt="Sunflower" />
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
          </div>
        </div>
        <div className="prod-card" data-name="Baby's Breath" data-price="50" data-unit="bunch">
          <div className="prod-photo">
            <img className="var-img" src="images/Baby_Breath.jpg" alt="Baby's Breath - White" />
          </div>
          <div className="prod-info">
            <h4>Baby's Breath</h4>
            <div className="price">
              ₹50
              <span>PER BUNCH</span>
            </div>
            <div className="color-row">
              <button type="button" className="swatch active" style={{ background: "#FFFFFF", border: "1.5px solid var(--line)"}} data-color="White" data-img="images/Baby_Breath.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="White"></button>
              <button type="button" className="swatch" style={{ background: "#9B7EDE"}} data-color="Purple" data-img="images/Baby_Breath_Purple.jpg" onClick={(event) => runInlineHandler(event, "fpCart.selectColor(this)")} aria-label="Purple"></button>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export function LookCPuja6() {
  return (
    <section id="puja" className="wrap">
      <div className="puja-top">
        <div>
          <p className="eyebrow">Altar</p>
          <h2>Morning, prescribed.</h2>
          <p>Jasmine, marigold, lotus — packed while the city is still dark.</p>
        </div>
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
          <div className="pack-price-row">
            <div>
              <span id="packLabel">Medium · 30 days</span>
              <br />
              <small>Predefined Daily Puja Pack · delivery included</small>
            </div>
            <b id="packPrice">₹899</b>
          </div>
          <button className="btn btn-primary" type="button" id="addPackBtn" style={{ width: "100%"}}>Add Daily Puja Pack</button>
        </div>
      </div>
      <div className="prod-grid" data-show-all="1" style={{marginTop: "36px"}}>
        <div className="prod-card" data-name="Daily Puja Pack" data-price="0" data-unit="pack" data-offering="puja_pack">
          <div className="prod-photo">
            <img src="images/Puja_Flower_Pack.jpg" alt="Daily puja flower pack" />
          </div>
          <div className="prod-info">
            <h4>Daily Puja Pack</h4>
            <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontFamily: "'Inter',sans-serif", fontWeight: "600"}}>S / M / L · 7 / 30 / 90 days</div>
            <p className="pack-card-note">Use the size and duration picker above to add the prepaid pack. This is a predefined offering, not a custom daily mix.</p>
          </div>
        </div>
        <div className="prod-card" data-name="Marigold Pack" data-price="0" data-unit="pack">
          <div className="prod-photo">
            <img src="images/Marigold_Yellow.jpg" alt="Marigold flowers" />
          </div>
          <div className="prod-info">
            <h4>Marigold Pack</h4>
            <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontFamily: "'Inter',sans-serif", fontWeight: "600"}}>250g / 500g</div>
            <div className="qty-row">
              <span className="qty-label">Qty</span>
              <div className="stepper">
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                <span className="step-val">0</span>
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="prod-card" data-name="Lotus" data-price="0" data-unit="pair">
          <div className="prod-photo">
            <img src="images/Lotus.jpg" alt="Lotus" />
          </div>
          <div className="prod-info">
            <h4>Lotus</h4>
            <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontFamily: "'Inter',sans-serif", fontWeight: "600"}}>2 pieces</div>
            <div className="qty-row">
              <span className="qty-label">Qty</span>
              <div className="stepper">
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                <span className="step-val">0</span>
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="prod-card" data-name="Jasmine Garland" data-price="0" data-unit="garland">
          <div className="prod-photo">
            <img src="images/Mogra_Garland.jpg" alt="Jasmine mogra garland" />
          </div>
          <div className="prod-info">
            <h4>Jasmine Garland</h4>
            <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontFamily: "'Inter',sans-serif", fontWeight: "600"}}>40–45 cm</div>
            <div className="qty-row">
              <span className="qty-label">Qty</span>
              <div className="stepper">
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                <span className="step-val">0</span>
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="prod-card" data-name="Marigold Garland" data-price="0" data-unit="garland">
          <div className="prod-photo">
            <img src="images/Marigold_Garland.jpg" alt="Marigold garland" />
          </div>
          <div className="prod-info">
            <h4>Marigold Garland</h4>
            <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontFamily: "'Inter',sans-serif", fontWeight: "600"}}>40–45 cm</div>
            <div className="qty-row">
              <span className="qty-label">Qty</span>
              <div className="stepper">
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                <span className="step-val">0</span>
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="prod-card" data-name="Tulsi Garland" data-price="0" data-unit="garland">
          <div className="prod-photo">
            <img src="images/Tulsi_Garland.jpg" alt="Tulsi garland" />
          </div>
          <div className="prod-info">
            <h4>Tulsi Garland</h4>
            <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontFamily: "'Inter',sans-serif", fontWeight: "600"}}>40 cm</div>
            <div className="qty-row">
              <span className="qty-label">Qty</span>
              <div className="stepper">
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                <span className="step-val">0</span>
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="prod-card" data-name="Bilva Leaves" data-price="0" data-unit="pack">
          <div className="prod-photo">
            <img src="images/Bilva_Leaves.jpg" alt="Bilva leaves" />
          </div>
          <div className="prod-info">
            <h4>Bilva Leaves</h4>
            <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontFamily: "'Inter',sans-serif", fontWeight: "600"}}>For Shiva puja</div>
            <div className="qty-row">
              <span className="qty-label">Qty</span>
              <div className="stepper">
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                <span className="step-val">0</span>
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="prod-card" data-name="Betel Leaf + Supari" data-price="0" data-unit="set">
          <div className="prod-photo">
            <img src="images/Betel_Leaves_and_Supari.jpg" alt="Betel leaf and supari" />
          </div>
          <div className="prod-info">
            <h4>Betel Leaf + Supari</h4>
            <div className="price" style={{fontSize: "13px", color: "var(--sage)", fontFamily: "'Inter',sans-serif", fontWeight: "600"}}>5 leaves + 5 supari</div>
            <div className="qty-row">
              <span className="qty-label">Qty</span>
              <div className="stepper">
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.dec(this)")} aria-label="Decrease quantity">−</button>
                <span className="step-val">0</span>
                <button type="button" className="step-btn" onClick={(event) => runInlineHandler(event, "fpCart.inc(this)")} aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LookCHow7() {
  return (
    <section id="how">
      <div className="wrap">
        <p className="eyebrow">Farm to flat</p>
        <h2>From chat to doorstep.</h2>
        <div className="steps">
          <div className="step">
            <div className="step-photo">
              <img src="images/life/whatsapp-order.jpg" alt="Ordering by chat" loading="lazy" />
            </div>
            <h4>9:00 PM · Order</h4>
            <p>Stems and puja packs for tomorrow. Member login locks payment when you are ready.</p>
          </div>
          <div className="step">
            <div className="step-photo">
              <img src="images/life/farm-cut.jpg" alt="Farm sourcing" loading="lazy" />
            </div>
            <h4>Overnight · Cut</h4>
            <p>Fresh from growers after cut-off — not sitting in a city warehouse all week.</p>
          </div>
          <div className="step">
            <div className="step-photo">
              <img src="images/life/kraft-box.jpg" alt="Packed overnight" loading="lazy" />
            </div>
            <h4>Dawn · Packed</h4>
            <p>Sorted at the North Bangalore warehouse, routed by apartment block.</p>
          </div>
          <div className="step">
            <div className="step-photo">
              <img src="images/life/delivery-door.jpg" alt="Doorstep delivery" loading="lazy" />
            </div>
            <h4>By 9:00 AM · Door</h4>
            <p>Puja packs by 7:30. Decorative stems by 9. Nothing crushed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LookCCoverage8() {
  return (
    <section id="coverage">
      <div className="wrap pin-wrap">
        <p className="eyebrow">Delivery check</p>
        <h2>Is your pincode on today’s route?</h2>
        <p>Enter a 6-digit PIN. We open WhatsApp with a ready message — North Bangalore is live; the rest of the city is switching on.</p>
        <form id="pinForm" className="pin-form">
          <input id="pinInput" name="pincode" inputMode="numeric" maxLength={6} autocomplete="postal-code" placeholder="560064" aria-label="Pincode" />
          <button type="submit" className="btn btn-primary" aria-label="Check delivery on WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"></path>
              <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.6 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3C3.7 14.7 3.2 13.4 3.2 12 3.2 7.2 7.2 3.2 12 3.2S20.8 7.2 20.8 12 16.8 20.2 12 20.2z"></path>
            </svg>
             Check
          </button>
        </form>
        <p className="pin-err" id="pinErr" hidden={true}></p>
      </div>
    </section>
  );
}

export function LookCSection9() {
  return (
    <section>
      <div className="wrap">
        <div className="cta-photo">
          <img src="images/life/delivery-door.jpg" alt="Doorstep delivery" loading="lazy" />
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

export function LookCFooter10() {
  return (
    <footer>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", gap: "24px", flexWrap: "wrap"}}>
        <div>
          <a className="logo" href="looks.html">
            <img src="images/logo.svg" alt="FreshPhool" />
          </a>
          <p style={{maxWidth: "280px", color: "var(--muted)", fontSize: "14px"}}>Per-stem morning flowers for North Bangalore apartments.</p>
        </div>
        <div>
          <a href="#flowers">Today’s flowers</a>
          <br />
          <a href="#puja">Puja</a>
          <br />
          <a href="#coverage">Check pincode</a>
          <br />
          <a href="index.html">Current live site</a>
        </div>
        <div>
          <a href="https://wa.me/918147613636" target="_blank" rel="noopener">+91 81476 13636</a>
          <br />
          <a href="https://freshphool.com">freshphool.com</a>
        </div>
      </div>
    </footer>
  );
}

export function LookCNavDrawerOverlay11() {
  return (
    <div className="nav-drawer-overlay" id="navDrawerOverlay" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}></div>
  );
}

export function LookCNavDrawer12() {
  return (
    <aside className="nav-drawer" id="navDrawer" aria-hidden="true">
      <div className="nav-drawer-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "20px"}}>
        <span>Menu</span>
        <button type="button" className="nav-drawer-close" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")} aria-label="Close menu" style={{ border: "0", background: "none", fontSize: "22px", cursor: "pointer"}}>×</button>
      </div>
      <div className="nav-search drawer-search" role="search">
        <input type="search" id="drawerSearch" placeholder="Search flowers\u2026" aria-label="Search flowers" autoComplete="off" onInput={(event) => runInlineHandler(event, "fpNav.search(this.value)")} onKeyDown={(event) => runInlineHandler(event, "if(event.key==='Enter')fpNav.searchEnter()")} />
      </div>
      <nav className="drawer-links">
        <a href="#flowers" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}>Flowers</a>
        <a href="#puja" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}>Puja Essentials</a>
        <a href="#how" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}>How it works</a>
        <a href="#coverage" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}>Check pincode</a>
        <a className="wa-icon drawer-wa" href="https://wa.me/918147613636" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" style={{marginTop: "12px"}}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"></path>
            <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.6 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3C3.7 14.7 3.2 13.4 3.2 12 3.2 7.2 7.2 3.2 12 3.2S20.8 7.2 20.8 12 16.8 20.2 12 20.2z"></path>
          </svg>
        </a>
      </nav>
    </aside>
  );
}

export function LookCCartBar13() {
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

export function LookCCartOverlay14() {
  return (
    <div className="cart-overlay" id="cartOverlay" onClick={(event) => runInlineHandler(event, "fpCart.closePanel()")}></div>
  );
}

export function LookCMemberModal15() {
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
          <input id="memberEmail" type="email" placeholder="you@example.com" autoComplete="email" />
          <div className="reg-only">
            <label htmlFor="memberName">Name</label>
            <input id="memberName" type="text" placeholder="Your name" autoComplete="name" />
          </div>
          <label htmlFor="memberPhone">Phone (India)</label>
          <input id="memberPhone" type="tel" inputMode="numeric" placeholder="10-digit mobile" autoComplete="tel" />
          <label htmlFor="memberPass">Password</label>
          <input id="memberPass" type="password" placeholder="At least 6 characters" autoComplete="current-password" />
          <p className="err" id="memberErr"></p>
          <button type="button" className="btn btn-primary" style={{ width: "100%", marginTop: "12px"}} id="memberSubmitBtn" onClick={(event) => runInlineHandler(event, "fpMember.submit()")}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export function LookCCartPanel16() {
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

export function LookCScript17() {
  return (
    <script src="js/vendor/capacitor.js"></script>
  );
}

export function LookCScript18() {
  return (
    <script src="js/fp-native.js"></script>
  );
}

export function LookCScript19() {
  return (
    <script src="js/flower-lore.js"></script>
  );
}

export function LookCScript20() {
  return (
    <script src="js/fp-looks.js?v=20260908b"></script>
  );
}

export default function LookCPage() {
  return (
    <>
      <LookCPreviewBanner1 />
      <LookCHeader2 />
      <LookCMarqueeTicker3 />
      <LookCHeroCWrap4 />
      <LookCFlowers5 />
      <LookCPuja6 />
      <LookCHow7 />
      <LookCCoverage8 />
      <LookCSection9 />
      <LookCFooter10 />
      <LookCNavDrawerOverlay11 />
      <LookCNavDrawer12 />
      <LookCCartBar13 />
      <LookCCartOverlay14 />
      <LookCCartPanel16 />
      <LookCScript17 />
      <LookCScript18 />
      <LookCScript19 />
      <LookCScript20 />
    </>
  );
}
