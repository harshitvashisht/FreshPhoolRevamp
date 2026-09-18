import React from "react";
import { runInlineHandler } from "../../lib/inlineHandler";

export function DeliveryDevBanner1() {
  return (
    <div className="dev-banner" role="status">
      <span className="dev-banner-copy">Launching Website and App by End of September 2026</span>
    </div>
  );
}

export function DeliveryHeader2() {
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
          <a href="delivery.html" aria-current="page">Delivery</a>
        </div>
        <div className="nav-cta">
          <div className="nav-search" id="navSearchWrap" role="search">
            <input type="text" id="navSearch" name="fp-flower-q" placeholder="Search your Flowers" aria-label="Search your Flowers" inputMode="search" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false" data-lpignore="true" readOnly={true} onFocus={(event) => runInlineHandler(event, "this.removeAttribute('readonly')")} onInput={(event) => runInlineHandler(event, "fpNav.search(this.value)")} onKeyDown={(event) => runInlineHandler(event, "if(event.key==='Enter')fpNav.searchEnter()")} />
          </div>
          <a className="member-login-btn" href="/login" style={{ textDecoration: "none" }}>Sign in / Sign up</a>
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

export function DeliveryWrapPageHero3() {
  return (
    <section className="wrap page-hero">
      <p className="eyebrow">FreshPhool</p>
      <h1>Delivery, every morning.</h1>
      <p>Routed block by block from our North Bangalore warehouse. These zonal pincodes can order now — if yours is not listed, check on WhatsApp.</p>
      <div className="seo-links">
        <a href="index.html">Home</a>
        <a href="daily-flowers.html">Daily flowers</a>
        <a href="puja.html">Puja</a>
        <a href="garlands.html">Garlands</a>
        <a href="delivery.html">Delivery</a>
      </div>
    </section>
  );
}

export function DeliveryCoverage4() {
  return (
    <section id="coverage">
      <div className="wrap">
        <div className="life-wide">
          <img src="images/life/delivery-door.jpg" alt="Flower delivery at a Bangalore apartment" loading="lazy" />
        </div>
        <div className="zone-grid">
          <div className="zone-block">
            <h3>North</h3>
            <div className="zone-pills">
              <span className="zone-pill">
                <b>Hebbal</b>
                 · 560024
              </span>
              <span className="zone-pill">
                <b>Yelahanka New Town</b>
                 · 560064
              </span>
              <span className="zone-pill">
                <b>Yelahanka Old Town</b>
                 · 560065
              </span>
              <span className="zone-pill">
                <b>Sahakara Nagar / Kodigehalli</b>
                 · 560092
              </span>
              <span className="zone-pill">
                <b>RT Nagar / Ganganagar</b>
                 · 560032
              </span>
              <span className="zone-pill">
                <b>Thanisandra / Nagawara</b>
                 · 560077
              </span>
              <span className="zone-pill">
                <b>Kalyan Nagar / HRBR Layout</b>
                 · 560043
              </span>
              <span className="zone-pill">
                <b>Hennur / Bagalur Road</b>
                 · 560043
              </span>
            </div>
          </div>
          <div className="zone-block">
            <h3>Central</h3>
            <div className="zone-pills">
              <span className="zone-pill">
                <b>Frazer Town / Pulakeshinagar</b>
                 · 560005
              </span>
              <span className="zone-pill">
                <b>Ulsoor / Halasuru</b>
                 · 560008
              </span>
            </div>
          </div>
          <div className="zone-block">
            <h3>East</h3>
            <div className="zone-pills">
              <span className="zone-pill">
                <b>Cox Town / Cooke Town</b>
                 · 560084
              </span>
              <span className="zone-pill">
                <b>Banaswadi / Ramamurthy Nagar</b>
                 · 560016
              </span>
              <span className="zone-pill">
                <b>Horamavu / Kalkere</b>
                 · 560043
              </span>
              <span className="zone-pill">
                <b>Kasturi Nagar / Bennigana Halli</b>
                 · 560043
              </span>
            </div>
          </div>
        </div>
        <div className="pin-wrap" style={{paddingTop: "40px"}}>
          <p className="eyebrow">Delivery check</p>
          <h2>Is your pincode on today’s route?</h2>
          <p>If your area is not named above, enter the PIN and we will open WhatsApp with a ready message.</p>
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
          <p className="pin-ok" id="pinHint" hidden={true}></p>
          <p className="pin-err" id="pinErr" hidden={true}></p>
        </div>
      </div>
    </section>
  );
}

export function DeliveryFooter5() {
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

export function DeliveryNavDrawerOverlay6() {
  return (
    <div className="nav-drawer-overlay" id="navDrawerOverlay" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")}></div>
  );
}

export function DeliveryNavDrawer7() {
  return (
    <aside className="nav-drawer" id="navDrawer" aria-hidden="true">
      <div className="nav-drawer-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "20px"}}>
        <span>Menu</span>
        <button type="button" className="nav-drawer-close" onClick={(event) => runInlineHandler(event, "fpNav.closeDrawer()")} aria-label="Close menu" style={{ border: "0", background: "none", fontSize: "22px", cursor: "pointer"}}>×</button>
      </div>
      <div className="nav-search drawer-search" role="search">
        <input type="text" id="drawerSearch" name="fp-flower-q" placeholder="Search your Flowers" aria-label="Search your Flowers" inputMode="search" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false" data-lpignore="true" readOnly={true} onFocus={(event) => runInlineHandler(event, "this.removeAttribute('readonly')")} onInput={(event) => runInlineHandler(event, "fpNav.search(this.value)")} onKeyDown={(event) => runInlineHandler(event, "if(event.key==='Enter')fpNav.searchEnter()")} />
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

export function DeliveryCartBar8() {
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

export function DeliveryCartOverlay9() {
  return (
    <div className="cart-overlay" id="cartOverlay" onClick={(event) => runInlineHandler(event, "fpCart.closePanel()")}></div>
  );
}

export function DeliveryMemberModal10() {
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

export function DeliveryCartPanel11() {
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

export function DeliveryScript12() {
  return (
    <script src="js/vendor/capacitor.js"></script>
  );
}

export function DeliveryScript13() {
  return (
    <script src="js/fp-native.js?v=20260912g"></script>
  );
}

export function DeliveryScript14() {
  return (
    <script src="js/flower-lore.js?v=20260912g"></script>
  );
}

export function DeliveryScript15() {
  return (
    <script src="js/fp-looks.js?v=20260912g"></script>
  );
}

export default function DeliveryPage() {
  return (
    <>
      <DeliveryDevBanner1 />
      <DeliveryHeader2 />
      <DeliveryWrapPageHero3 />
      <DeliveryCoverage4 />
      <DeliveryFooter5 />
      <DeliveryNavDrawerOverlay6 />
      <DeliveryNavDrawer7 />
      <DeliveryCartBar8 />
      <DeliveryCartOverlay9 />
      <DeliveryCartPanel11 />
      <DeliveryScript12 />
      <DeliveryScript13 />
      <DeliveryScript14 />
      <DeliveryScript15 />
    </>
  );
}
