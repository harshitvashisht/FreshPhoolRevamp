/* Shared cart, member, nav, pincode, marquees for look-a/b/c. */
const PUJA_PACK = {
    Small:  {7: 149, 30: 699, 90: 1899},
    Medium: {7: 199, 30: 899, 90: 2499},
    Large:  {7: 249, 30: 1099, 90: 2999}
  };

  function getAccessToken(){
    return localStorage.getItem('fp.accessToken');
  }

  async function syncAuthNavigation(){
    const authLinks = Array.from(document.querySelectorAll('.member-login-btn'));
    if(!authLinks.length) return;
    const token = getAccessToken();
    if(!token) return;
    try {
      const response = await fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token } });
      if(!response.ok) throw new Error('Session expired');
      const profile = await response.json();
      authLinks.forEach(link => link.remove());
      document.querySelectorAll('.nav-cta').forEach(cta => {
        const profileLink = document.createElement('a');
        profileLink.className = 'member-profile-btn';
        profileLink.href = profile.role === 'ADMIN' ? '/admin' : '/dashboard';
        profileLink.setAttribute('aria-label', 'Open your profile');
        profileLink.title = profile.name || 'My profile';
        profileLink.textContent = (profile.name || 'U').trim().charAt(0).toUpperCase();
        const cart = cta.querySelector('.nav-cart-btn');
        cta.insertBefore(profileLink, cart || null);
      });
    } catch (_) {
      localStorage.removeItem('fp.accessToken');
    }
  }

  const fpCart = {
    items: {},
    addresses: [],

    STORAGE_KEY: 'fp_cart_v1',

    init(){
      try {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if(saved){
          this.items = JSON.parse(saved);
        }
      } catch(_) {}
      this.syncCardQuantities();
      this.render();
    },

    save(){
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
      } catch(_) {}
    },

    isRecurring(cadence){
      return cadence === 'daily' || cadence === 'weekly' || cadence === 'monthly';
    },

    deliveries(i){
      const days = i.duration_days || 1;
      if(i.cadence === 'daily') return days;
      if(i.cadence === 'weekly') return Math.max(1, Math.round(days / 7));
      if(i.cadence === 'monthly') return Math.max(1, Math.round(days / 30));
      return 1;
    },

    cardCadence(card){
      const active = card.querySelector('.cadence-btn.active');
      const cadence = (active && active.dataset.cadence) || 'one_time';
      const daysBtn = card.querySelector('.days-row .seg-btn.active');
      return {
        cadence,
        duration_days: this.isRecurring(cadence) ? parseInt((daysBtn && daysBtn.dataset.days) || '30', 10) : 1
      };
    },

    lineTotal(i){
      if(!i.price) return 0;
      if(i.offering === 'puja_pack') return i.price * i.qty;
      return i.price * i.qty * this.deliveries(i);
    },

    selectColor(swatchBtn){
      const card = swatchBtn.closest('.prod-card');
      const previous = card.querySelector('.swatch.active');
      card.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
      swatchBtn.classList.add('active');
      const img = card.querySelector('.var-img');
      if(img) img.src = swatchBtn.dataset.img;
      const tag = card.querySelector('.qty-color-tag');
      if(tag) tag.textContent = swatchBtn.dataset.color;
      const valEl = card.querySelector('.step-val');
      const qty = Math.max(0, parseInt(swatchBtn.dataset.qty || '0', 10) || 0);
      valEl.textContent = qty;
      if(qty > 0) this.set(`${card.dataset.name} (${swatchBtn.dataset.color})`, card, qty);
      else this.render();
    },

    inc(btn){
      const card = btn.closest('.prod-card');
      const activeSwatch = card.querySelector('.swatch.active');
      const valEl = card.querySelector('.step-val');
      const qty = parseInt(valEl.textContent, 10) + 1;
      valEl.textContent = qty;
      if(activeSwatch){
        activeSwatch.dataset.qty = qty;
        this.set(`${card.dataset.name} (${activeSwatch.dataset.color})`, card, qty);
      } else {
        this.set(card.dataset.name, card, qty);
      }
    },

    dec(btn){
      const card = btn.closest('.prod-card');
      const activeSwatch = card.querySelector('.swatch.active');
      const valEl = card.querySelector('.step-val');
      const qty = Math.max(0, parseInt(valEl.textContent, 10) - 1);
      valEl.textContent = qty;
      if(activeSwatch){
        activeSwatch.dataset.qty = qty;
        this.set(`${card.dataset.name} (${activeSwatch.dataset.color})`, card, qty);
      } else {
        this.set(card.dataset.name, card, qty);
      }
    },

    set(name, card, qty){
      const price = parseFloat(card.dataset.price) || 0;
      const unit = card.dataset.unit || '';
      const {cadence, duration_days} = this.cardCadence(card);
      if(qty > 0){
        this.items[name] = {
          name, price, unit, qty, cadence, duration_days,
          offering: 'custom'
        };
      } else {
        delete this.items[name];
      }
      this.save();
      this.render();
      if(qty > 0) this.triggerCartAnimation();
    },

    changeQty(name, amount){
      const item = this.items[name];
      if(!item) return;
      item.qty = Math.max(0, item.qty + amount);
      if(!item.qty) delete this.items[name];
      this.syncCardQuantities();
      this.save();
      this.render();
      if(amount > 0) this.triggerCartAnimation();
    },

    remove(name){
      if(!this.items[name]) return;
      delete this.items[name];
      this.syncCardQuantities();
      this.save();
      this.render();
    },

    syncCardQuantities(){
      document.querySelectorAll('.prod-card').forEach(card => {
        card.querySelectorAll('.swatch').forEach(swatch => {
          const itemName = `${card.dataset.name} (${swatch.dataset.color})`;
          const quantity = this.items[itemName]?.qty || 0;
          swatch.dataset.qty = quantity;
        });
        const activeSwatch = card.querySelector('.swatch.active');
        const itemName = activeSwatch
          ? `${card.dataset.name} (${activeSwatch.dataset.color})`
          : card.dataset.name;
        const quantity = this.items[itemName]?.qty || 0;
        const value = card.querySelector('.step-val');
        if(value) value.textContent = quantity;
      });
    },

    applyCadence(card){
      const prefix = card.dataset.name;
      Object.keys(this.items).forEach(key => {
        const item = this.items[key];
        if(item.offering === 'puja_pack') return;
        if(item.name === prefix || item.name.startsWith(prefix + ' (')){
          const {cadence, duration_days} = this.cardCadence(card);
          item.cadence = cadence;
          item.duration_days = duration_days;
        }
      });
      this.save();
      this.render();
    },

    addPujaPack(size, days, frequency){
      const cadence = frequency || 'daily';
      const price = PUJA_PACK[size][days];
      const freqLabel = cadence === 'weekly' ? 'Weekly' : cadence === 'monthly' ? 'Monthly' : 'Daily';
      const name = `Puja Pack · ${size} · ${days} days · ${freqLabel}`;
      this.items[name] = {
        name, price, unit: 'pack', qty: 1, cadence,
        duration_days: days, offering: 'puja_pack', size
      };
      this.save();
      this.render();
      this.openPanel();
    },

    async requestItem(card){
      const accessToken = getAccessToken();
      if(!accessToken){
        const next = window.location.pathname + window.location.search;
        window.location.href = '/login?next=' + encodeURIComponent(next);
        return;
      }
      const qty = parseInt(card.querySelector('.step-val')?.textContent || '0', 10) || 0;
      if(qty < 1){ alert('Choose the quantity you would like to request first.'); return; }
      const activeSwatch = card.querySelector('.swatch.active');
      const productName = card.dataset.name || '';
      try {
        const response = await fetch('/api/requests', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productName, qty, variant: activeSwatch?.dataset.color })
        });
        const data = await response.json().catch(() => ({}));
        if(!response.ok) throw new Error(data.error || 'Could not send your request');
        alert('Your request has been sent. FreshPhool will contact you with the price and availability.');
      } catch(error) {
        alert(error.message || 'Could not send your request');
      }
    },

    count(){
      return Object.values(this.items).reduce((sum, i) => sum + i.qty, 0);
    },

    subtotal(){
      return Object.values(this.items).reduce((sum, i) => sum + this.lineTotal(i), 0);
    },

    hasUnpriced(){
      return Object.values(this.items).some(i => !i.price);
    },

    kind(){
      const items = Object.values(this.items);
      const rec = items.some(i => this.isRecurring(i.cadence));
      const once = items.some(i => !this.isRecurring(i.cadence));
      if(rec && once) return 'mixed';
      if(rec) return 'subscription';
      return 'one_time';
    },

    fmt(n){
      return '₹' + n.toLocaleString('en-IN');
    },

    cadenceLabel(i){
      if(i.cadence === 'daily') return `Daily × ${i.duration_days} days`;
      if(i.cadence === 'weekly') return `Weekly × ${i.duration_days} days`;
      if(i.cadence === 'monthly') return `Monthly × ${i.duration_days} days`;
      return 'One-time';
    },

    render(){
      const items = Object.values(this.items);
      const n = this.count();
      const sub = this.subtotal();
      const badge = document.getElementById('navCartBadge');
      if(badge){
        badge.textContent = n;
        badge.classList.toggle('show', n > 0);
        badge.setAttribute('aria-label', `${n} item${n === 1 ? '' : 's'} in cart`);
      }
      const bar = document.getElementById('cartBar');
      if(bar) bar.classList.toggle('show', n > 0);
      const barCount = document.getElementById('cartBarCount');
      if(barCount) barCount.textContent = n + (n === 1 ? ' item' : ' items');
      const barSubtotal = document.getElementById('cartBarSubtotal');
      if(barSubtotal) barSubtotal.textContent = sub > 0
        ? 'Prepaid ' + this.fmt(sub) + (this.hasUnpriced() ? ' +' : '')
        : (n ? 'Priced on WhatsApp' : 'Add flowers to get started');

      const list = document.getElementById('cartItems');
      if(items.length === 0){
        list.innerHTML = '<p style="color:var(--sage);font-size:14px;padding:8px 0;">No items yet — pick a quantity, or add a Daily Puja Pack.</p>';
      } else {
        list.innerHTML = items.map(i => {
          const unitLabel = i.unit ? ` ${i.unit}${i.qty > 1 ? 's' : ''}` : '';
          const amount = i.price > 0 ? this.fmt(this.lineTotal(i)) : 'On request';
          const itemKey = encodeURIComponent(i.name);
          return `<div class="cart-line"><span>${i.name}<br><small style="color:var(--sage);font-weight:600;">${this.cadenceLabel(i)}${i.offering === 'puja_pack' ? ' · pack' : ''}</small></span><div class="cart-line-right"><b>${amount}</b><div class="cart-line-controls"><button type="button" class="cart-qty-btn" data-cart-item="${itemKey}" data-cart-change="-1" aria-label="Decrease ${i.name}">−</button><span>${i.qty}${unitLabel}</span><button type="button" class="cart-qty-btn" data-cart-item="${itemKey}" data-cart-change="1" aria-label="Increase ${i.name}">+</button><button type="button" class="cart-remove-btn" data-cart-item="${itemKey}" aria-label="Remove ${i.name}">Remove</button></div></div></div>`;
        }).join('');
        list.querySelectorAll('.cart-qty-btn').forEach(button => {
          button.addEventListener('click', () => this.changeQty(decodeURIComponent(button.dataset.cartItem), Number(button.dataset.cartChange)));
        });
        list.querySelectorAll('.cart-remove-btn').forEach(button => {
          button.addEventListener('click', () => this.remove(decodeURIComponent(button.dataset.cartItem)));
        });
      }
      const totalRow = document.getElementById('cartTotalRow');
      if(totalRow) totalRow.style.display = sub > 0 ? 'flex' : 'none';
      const totalAmount = document.getElementById('cartTotalAmt');
      if(totalAmount) totalAmount.textContent = this.fmt(sub);
      const pricedNote = document.getElementById('cartPricedNote');
      if(pricedNote) pricedNote.style.display = this.hasUnpriced() ? 'block' : 'none';
    },

    async loadAddresses(){
      const accessToken = getAccessToken();
      if (!accessToken) return;
      try {
        const response = await fetch('/api/me/addresses', { headers: { Authorization: 'Bearer ' + accessToken } });
        if (!response.ok) return;
        this.addresses = await response.json();
        this.renderAddressSelector();
      } catch (_) {
        // Checkout remains available with a new address if address history cannot load.
      }
    },

    renderAddressSelector(){
      const form = document.querySelector('#cartPanel .cart-form');
      if (!form) return;
      let group = document.getElementById('savedAddressGroup');
      if (!this.addresses.length) {
        if (group) group.remove();
        return;
      }
      if (!group) {
        group = document.createElement('div');
        group.id = 'savedAddressGroup';
        group.className = 'saved-address-group';
        form.prepend(group);
      }
      group.innerHTML = `<label for="savedAddressSelect">Deliver to</label><select id="savedAddressSelect"><option value="">Use a new address</option>${this.addresses.map((address) => `<option value="${address.id}">${address.community} · ${address.blockFlat}${address.pincode ? ' · ' + address.pincode : ''}${address.isDefault ? ' (Default)' : ''}</option>`).join('')}</select>`;
      const select = document.getElementById('savedAddressSelect');
      const selected = this.addresses.find((address) => address.isDefault) || this.addresses[0];
      if (selected) {
        select.value = selected.id;
        this.applyAddress(selected);
      }
      select.addEventListener('change', () => {
        const address = this.addresses.find((row) => row.id === select.value);
        if (address) this.applyAddress(address);
      });
    },

    applyAddress(address){
      const apt = document.getElementById('aptInput');
      const block = document.getElementById('blockInput');
      if (apt) apt.value = address.community;
      if (block) block.value = address.blockFlat;
    },

    openPanel(){
      document.getElementById('cartPanel').classList.add('open');
      document.getElementById('cartOverlay').classList.add('show');
      this.loadAddresses();
    },

    closePanel(){
      document.getElementById('cartPanel').classList.remove('open');
      document.getElementById('cartOverlay').classList.remove('show');
    },

    sendToWhatsApp(){
      const items = Object.values(this.items);
      if(items.length === 0){ return; }
      const apt = document.getElementById('aptInput').value.trim();
      const block = document.getElementById('blockInput').value.trim();
      const sub = this.subtotal();
      let msg = "Hi FreshPhool! I'd like to order:\n\n";
      items.forEach(i => {
        const unitLabel = i.unit ? ` ${i.unit}${i.qty > 1 ? 's' : ''}` : '';
        msg += `• ${i.name} × ${i.qty}${unitLabel} — ${this.cadenceLabel(i)}`;
        if(i.price > 0) msg += ` — ${this.fmt(this.lineTotal(i))}`;
        else msg += ` — price on request`;
        msg += "\n";
      });
      if(sub > 0) msg += `\nPrepaid total (priced lines): ${this.fmt(sub)}`;
      if(this.hasUnpriced()) msg += `\n(Some custom daily / garland lines need a rupee confirm)`;
      if(apt) msg += `\n\nApartment/Community: ${apt}`;
      if(block) msg += `\nBlock & Flat No.: ${block}`;
      window.open('https://wa.me/918147613636?text=' + encodeURIComponent(msg), '_blank');
    },

    tomorrowIst(){
      const now = new Date();
      const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Kolkata', year:'numeric', month:'2-digit', day:'2-digit'}).format(now);
      const start = new Date(parts + 'T00:00:00+05:30');
      start.setDate(start.getDate() + 1);
      return start;
    },

    async placeOrder(){
      const items = Object.values(this.items);
      if(items.length === 0){ alert('Add flowers first.'); return; }
      const accessToken = getAccessToken();
      if(!accessToken){
        const next = window.location.pathname + window.location.search;
        window.location.href = '/login?next=' + encodeURIComponent(next);
        return;
      }
      const apt = document.getElementById('aptInput').value.trim();
      const block = document.getElementById('blockInput').value.trim();
      if(!apt || !block){ alert('Please enter your apartment and block / flat.'); return; }
      // The API deliberately receives no prices or units: PostgreSQL resolves
      // the active catalog product/variant and is the only price authority.
      const checkoutItems = items.map(({name, qty, cadence, duration_days, offering, size}) => ({
        name, qty, cadence, duration_days, offering, size
      }));
      const payload = {
        community: apt,
        block_flat: block,
        addressId: document.getElementById('savedAddressSelect')?.value || undefined,
        items: checkoutItems,
        kind: this.kind(),
        delivery_window: items.some(i => /puja|jasmine|marigold|lotus|tulsi|bilva|betel|mango/i.test(i.name)) ? 'puja' : 'decorative',
        notes: null
      };
      let checkout = null;
      try {
        const res = await fetch('/api/orders/checkout', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const text = await res.text();
        if(!res.ok) {
          let message = text;
          try { message = JSON.parse(text).error || text; } catch (_) {}
          throw new Error(message || 'Checkout failed');
        }
        checkout = JSON.parse(text);
      } catch (err) {
        alert('Could not save the order. ' + (err.message || err));
        return;
      }
      const orderNumber = checkout && (checkout.orderNumber || checkout.order_number);
      if(!orderNumber){
        alert('Checkout did not return an order number.');
        return;
      }
      try {
        sessionStorage.setItem('fp_last_order', JSON.stringify({
          id: orderNumber,
          order_number: orderNumber,
          subscription_numbers: (checkout && (checkout.subscriptionNumbers || checkout.subscription_numbers)) || [],
          delivery_order_numbers: (checkout && (checkout.deliveryOrderNumbers || checkout.delivery_order_numbers)) || [],
          items, subtotal: checkout.subtotalRupee,
          community: apt, block_flat: block
        }));
      } catch (e) {}
      this.closePanel();
      window.location.href = '/pay?order=' + encodeURIComponent(orderNumber);
    },
    triggerCartAnimation(){
      const btn = document.querySelector('.nav-cart-btn');
      const badge = document.getElementById('navCartBadge');
      if(btn){
        btn.classList.add('fp-adding');
        setTimeout(() => btn.classList.remove('fp-adding'), 400);
      }
      if(badge){
        badge.classList.add('fp-pulse');
        setTimeout(() => badge.classList.remove('fp-pulse'), 300);
      }
    }
  };

  syncAuthNavigation();

  (function addRequestButtons(){
    document.querySelectorAll('.prod-card[data-price="0"]').forEach(card => {
      if(card.querySelector('.request-price-btn')) return;
      const priceLabel = card.querySelector('.price')?.textContent || '';
      if(!/on request/i.test(priceLabel)) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'request-price-btn';
      button.textContent = 'Request price';
      button.addEventListener('click', () => fpCart.requestItem(card));
      card.querySelector('.prod-info')?.appendChild(button);
    });
  })();

  (function packPicker(){
    if(!document.getElementById('packSizes') || !document.getElementById('addPackBtn')) return;
    let size = 'Medium';
    let days = 30;
    let frequency = 'daily';
    function freqLabel(){
      return frequency === 'weekly' ? 'Weekly' : frequency === 'monthly' ? 'Monthly' : 'Daily';
    }
    function paint(){
      document.querySelectorAll('#packSizes .seg-btn').forEach(b => b.classList.toggle('active', b.dataset.size === size));
      document.querySelectorAll('#packDays .seg-btn').forEach(b => b.classList.toggle('active', Number(b.dataset.days) === days));
      document.querySelectorAll('#packFreq .seg-btn').forEach(b => b.classList.toggle('active', b.dataset.freq === frequency));
      const freq = freqLabel();
      document.getElementById('packLabel').textContent = size + ' · ' + days + ' days · ' + freq;
      const note = document.getElementById('packNote');
      if(note) note.textContent = 'Predefined ' + freq + ' Puja Pack · delivery included';
      document.getElementById('addPackBtn').textContent = 'Add ' + freq + ' Puja Pack';
      document.getElementById('packPrice').textContent = fpCart.fmt(PUJA_PACK[size][days]);
    }
    document.getElementById('packSizes').addEventListener('click', e => {
      const b = e.target.closest('[data-size]');
      if(!b) return;
      size = b.dataset.size;
      paint();
    });
    document.getElementById('packDays').addEventListener('click', e => {
      const b = e.target.closest('[data-days]');
      if(!b) return;
      days = parseInt(b.dataset.days, 10);
      paint();
    });
    const freqEl = document.getElementById('packFreq');
    if(freqEl){
      freqEl.addEventListener('click', e => {
        const b = e.target.closest('[data-freq]');
        if(!b) return;
        frequency = b.dataset.freq;
        paint();
      });
    }
    document.getElementById('addPackBtn').addEventListener('click', () => fpCart.addPujaPack(size, days, frequency));
    paint();
  })();

  (function mountCadence(){
    document.querySelectorAll('.prod-card').forEach(card => {
      if(card.dataset.offering === 'puja_pack') return;
      const info = card.querySelector('.prod-info');
      if(!info) return;
      if(!card.querySelector('.cadence-row')){
        info.insertAdjacentHTML('beforeend', `
        <div class="cadence-row">
          <label>Frequency</label>
          <div class="seg">
            <button type="button" class="seg-btn cadence-btn active" data-cadence="one_time">One-time</button>
            <button type="button" class="seg-btn cadence-btn" data-cadence="daily">Daily</button>
            <button type="button" class="seg-btn cadence-btn" data-cadence="weekly">Weekly</button>
            <button type="button" class="seg-btn cadence-btn" data-cadence="monthly">Monthly</button>
          </div>
          <div class="days-row">
            <button type="button" class="seg-btn" data-days="7">7 days</button>
            <button type="button" class="seg-btn active" data-days="30">30 days</button>
            <button type="button" class="seg-btn" data-days="90">90 days</button>
          </div>
        </div>`);
      }
      card.querySelectorAll('.cadence-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          card.querySelectorAll('.cadence-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          card.querySelector('.days-row').classList.toggle('show', fpCart.isRecurring(btn.dataset.cadence));
          fpCart.applyCadence(card);
        });
      });
      card.querySelectorAll('.days-row .seg-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          card.querySelectorAll('.days-row .seg-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          fpCart.applyCadence(card);
        });
      });
    });
  })();

  
  (function viewAllCatalogs(){
    function colsFor(grid){
      const g = getComputedStyle(grid).gridTemplateColumns;
      if(!g || g === 'none') return 1;
      return g.split(' ').filter(Boolean).length;
    }
    function apply(grid){
      if(grid.dataset.viewAllExpanded === '1' || grid.dataset.showAll === '1') return;
      const cards = Array.from(grid.querySelectorAll('.prod-card'));
      const cols = colsFor(grid);
      const keep = Math.floor(cards.length / cols) * cols;
      let hidden = 0;
      cards.forEach((c, i) => {
        const hide = i >= keep && keep < cards.length;
        c.classList.toggle('view-all-hidden', hide);
        if(hide) hidden++;
      });
      let wrap = grid.nextElementSibling;
      if(!(wrap && wrap.classList && wrap.classList.contains('view-all-wrap'))) wrap = null;
      if(hidden > 0){
        if(!wrap){
          wrap = document.createElement('div');
          wrap.className = 'view-all-wrap';
          wrap.innerHTML = '<button type="button" class="view-all-btn">View all</button>';
          wrap.querySelector('button').addEventListener('click', () => {
            grid.dataset.viewAllExpanded = '1';
            grid.querySelectorAll('.prod-card').forEach(c => c.classList.remove('view-all-hidden'));
            wrap.remove();
          });
          grid.insertAdjacentElement('afterend', wrap);
        }
      } else if(wrap){ wrap.remove(); }
    }
    function run(){ document.querySelectorAll('#flowers .prod-grid, #puja .prod-grid').forEach(apply); }
    run();
    let timer = null;
    window.addEventListener('resize', () => { clearTimeout(timer); timer = setTimeout(run, 150); });
  })();

  (function motion(){
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('section, .prod-card, .why-grid > *, .city-card, .life-wide, .life-shot, .cta-photo, .step-photo').forEach((el,i)=>{
      el.classList.add('reveal');
      if(!reduce) el.style.transitionDelay = Math.min(i%6,5)*40 + 'ms';
    });
    if(reduce){
      document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((ents)=>{
      ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    const heroImg = document.querySelector('.hero-photo img');
    const narrow = window.matchMedia('(max-width:800px)').matches;
    if(heroImg && !narrow){
      window.addEventListener('scroll', ()=>{
        const y = Math.min(window.scrollY, 420);
        heroImg.style.transform = 'translateY(' + (y*0.12) + 'px) scale(1.04)';
      }, {passive:true});
    }
  })();

  var fpNav = (function(){
    function catalogs(){
      return ['flowers','puja']
        .map(function(id){ return {sec:document.getElementById(id), grid:document.querySelector('#'+id+' .prod-grid')}; })
        .filter(function(o){ return o.grid; });
    }
    function noResultsEl(){
      var el = document.getElementById('searchNoResults');
      if(!el){
        el = document.createElement('div');
        el.id = 'searchNoResults';
        el.className = 'search-noresults';
        el.innerHTML = 'No flowers match your search. <a href="#" style="color:var(--ember);font-weight:700;">Clear search</a>';
        el.querySelector('a').addEventListener('click', function(e){ e.preventDefault(); clear(); });
        var flowers = document.getElementById('flowers');
        if(flowers && flowers.parentNode) flowers.parentNode.insertBefore(el, flowers);
      }
      return el;
    }
    function search(value){
      var q = (value || '').trim().toLowerCase();
      var a = document.getElementById('navSearch'), b = document.getElementById('drawerSearch');
      if(a && a.value !== value) a.value = value;
      if(b && b.value !== value) b.value = value;
      document.body.classList.toggle('fp-searching', q.length > 0);
      var total = 0;
      catalogs().forEach(function(o){
        var secMatches = 0;
        o.grid.querySelectorAll('.prod-card').forEach(function(card){
          var h4 = card.querySelector('h4');
          var name = (card.dataset.name || (h4 ? h4.textContent : '') || '').toLowerCase();
          var match = q === '' || name.indexOf(q) !== -1;
          card.classList.toggle('search-hidden', q !== '' && !match);
          if(q !== '' && match){ secMatches++; total++; }
        });
        if(o.sec) o.sec.classList.toggle('search-empty', q !== '' && secMatches === 0);
      });
      noResultsEl().classList.toggle('show', q !== '' && total === 0);
      return total;
    }
    function firstResultSection(){
      var card = document.querySelector('.prod-card:not(.search-hidden)');
      return (card && card.closest('section')) || document.getElementById('flowers');
    }
    function searchEnter(){
      var sec = firstResultSection();
      if(sec) sec.scrollIntoView({behavior:'smooth', block:'start'});
    }
    function jump(token){
      closeMega(); closeDrawer();
      search(token);
      var sec = firstResultSection();
      if(sec) sec.scrollIntoView({behavior:'smooth', block:'start'});
    }
    function clear(){ search(''); closeMega(); }
    function openSearch(){
      var wrap = document.getElementById('navSearchWrap');
      var input = document.getElementById('navSearch');
      if(wrap) wrap.classList.add('expanded');
      if(input) input.focus();
    }
    function toggleMega(btn){
      var item = btn.closest('.nav-item');
      var isOpen = item.classList.contains('open');
      closeMega();
      if(!isOpen){ item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    }
    function closeMega(){
      document.querySelectorAll('.nav-item.open').forEach(function(i){
        i.classList.remove('open');
        var t = i.querySelector('.nav-trigger');
        if(t) t.setAttribute('aria-expanded','false');
      });
    }
    function openDrawer(){
      document.getElementById('navDrawer').classList.add('open');
      document.getElementById('navDrawerOverlay').classList.add('open');
      document.getElementById('navDrawer').setAttribute('aria-hidden','false');
      var b = document.getElementById('navBurger'); if(b) b.setAttribute('aria-expanded','true');
    }
    function closeDrawer(){
      var d = document.getElementById('navDrawer'); if(!d) return;
      d.classList.remove('open');
      document.getElementById('navDrawerOverlay').classList.remove('open');
      d.setAttribute('aria-hidden','true');
      var b = document.getElementById('navBurger'); if(b) b.setAttribute('aria-expanded','false');
    }
    document.addEventListener('click', function(e){
      if(!e.target.closest('.nav-item')) closeMega();
      var wrap = document.getElementById('navSearchWrap');
      var input = document.getElementById('navSearch');
      if(wrap && !wrap.contains(e.target) && !(input && input.value)) wrap.classList.remove('expanded');
    });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ closeMega(); closeDrawer(); } });
    function bootClear(){ search(''); }
    window.addEventListener('pageshow', bootClear);
    setTimeout(bootClear, 80);
    return {search:search, searchEnter:searchEnter, jump:jump, clear:clear, openSearch:openSearch,
            toggleMega:toggleMega, openDrawer:openDrawer, closeDrawer:closeDrawer};
  })();

  /* ---- Pincode → WhatsApp ---- */
  var PIN_HINTS = {
    "560024": "Hebbal · North",
    "560064": "Yelahanka New Town · North",
    "560065": "Yelahanka Old Town · North",
    "560092": "Sahakara Nagar / Kodigehalli · North",
    "560032": "RT Nagar / Ganganagar · North",
    "560077": "Thanisandra / Nagawara · North",
    "560043": "Kalyan Nagar / HRBR Layout, Hennur / Bagalur Road · North · Horamavu / Kalkere, Kasturi Nagar / Bennigana Halli · East",
    "560005": "Frazer Town / Pulakeshinagar · Central",
    "560008": "Ulsoor / Halasuru · Central",
    "560084": "Cox Town / Cooke Town · East",
    "560016": "Banaswadi / Ramamurthy Nagar · East"
  };
  window.fpPincode = {
    hint: function(pin){
      return PIN_HINTS[pin] || "";
    },
    open: function(pin){
      var area = PIN_HINTS[pin];
      var msg = area
        ? "Hi FreshPhool! I would like to order to " + area + " [" + pin + "]. Please confirm delivery."
        : "Hi I would like to order to this pincode [" + pin + "]. Is delivery available?";
      window.open("https://wa.me/918147613636?text=" + encodeURIComponent(msg), "_blank");
    },
    bind: function(){
      var form = document.getElementById("pinForm");
      if(!form) return;
      var input = document.getElementById("pinInput");
      var err = document.getElementById("pinErr");
      var hint = document.getElementById("pinHint");
      function validate(){
        var pin = String((input && input.value) || "").replace(/\D/g, "");
        if(input) input.value = pin;
        if(!/^[1-9][0-9]{5}$/.test(pin)){
          if(err){ err.hidden = false; err.textContent = "Enter a 6-digit Indian pincode."; }
          if(hint){ hint.hidden = true; hint.textContent = ""; }
          return null;
        }
        if(err){ err.hidden = true; err.textContent = ""; }
        if(hint){
          hint.hidden = false;
          hint.textContent = PIN_HINTS[pin]
            ? "We deliver to " + PIN_HINTS[pin] + ". Opening WhatsApp…"
            : "This PIN is not on the listed zones — we will confirm on WhatsApp.";
        }
        return pin;
      }
      form.addEventListener("submit", function(e){
        e.preventDefault();
        var pin = validate();
        if(pin) window.fpPincode.open(pin);
      });
      if(input) input.addEventListener("input", function(){ if((err && err.textContent) || (hint && hint.textContent)) validate(); });
    }
  };

  window.fpMarquee = {
    fill: function(el){
      var track = el.querySelector("[data-marquee-track]");
      if(!track) return;
      if(!el._fpMqOriginals){
        el._fpMqOriginals = Array.from(track.children).map(function(n){ return n.cloneNode(true); });
      }
      var originals = el._fpMqOriginals;
      if(!originals.length) return;
      track.replaceChildren();
      originals.forEach(function(n){ track.appendChild(n.cloneNode(true)); });
      var cap = 24;
      var n = 0;
      while(el.clientWidth && track.scrollWidth < el.clientWidth && n < cap){
        originals.forEach(function(node){ track.appendChild(node.cloneNode(true)); });
        n++;
      }
      Array.from(track.children).forEach(function(node){
        var c = node.cloneNode(true);
        c.setAttribute("aria-hidden", "true");
        track.appendChild(c);
      });
    },
    init: function(){
      var self = this;
      document.querySelectorAll("[data-marquee]").forEach(function(el){ self.fill(el); });
      if(self._bound) return;
      self._bound = true;
      var t;
      window.addEventListener("resize", function(){
        clearTimeout(t);
        t = setTimeout(function(){
          document.querySelectorAll("[data-marquee]").forEach(function(el){ self.fill(el); });
        }, 150);
      });
      window.addEventListener("load", function(){
        document.querySelectorAll("[data-marquee]").forEach(function(el){ self.fill(el); });
      });
    }
  };

  (function clickMotion(){
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.addEventListener("click", function(e){
      var btn = e.target.closest(".btn, .seg-btn, .nav-cart-btn, .theme-nav-btn");
      if(!btn) return;
      if(!reduce){
        var ripple = document.createElement("span");
        ripple.className = "fp-ripple";
        var rect = btn.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";
        btn.appendChild(ripple);
        setTimeout(function(){ ripple.remove(); }, 520);
      }
    }, false);
  })();

  if(typeof applyFlowerLore === "function") applyFlowerLore();
  fpPincode.bind();
  fpMarquee.init();
  fpCart.init();
