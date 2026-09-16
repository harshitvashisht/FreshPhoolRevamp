
const FP = {
  url: 'https://fslgbwidmkaxjcizapoc.supabase.co',
  anon: 'sb_publishable_Cqd-qBST0IajFZ6pbvDalA_nsTzlzDk'
};
const STATUSES = ['Payment Received', 'Being Prepared', 'Out for Delivery', 'Delivered'];
const TZ = 'Asia/Kolkata';

function headers(token){
  return {
    apikey: FP.anon,
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json'
  };
}

function rupee(n){
  const v = Number(n) || 0;
  return '₹' + v.toLocaleString('en-IN', {maximumFractionDigits: 0});
}

function istParts(d){
  const f = new Intl.DateTimeFormat('en-GB', {timeZone: TZ, year:'numeric', month:'2-digit', day:'2-digit', weekday:'short'});
  const parts = Object.fromEntries(f.formatToParts(d).map(p => [p.type, p.value]));
  return parts;
}

function startOfTodayIst(){
  const now = new Date();
  const p = istParts(now);
  return new Date(`${p.year}-${p.month}-${p.day}T00:00:00+05:30`);
}

function startOfWeekIst(){
  const start = startOfTodayIst();
  const p = istParts(start);
  const map = {Mon:0, Tue:1, Wed:2, Thu:3, Fri:4, Sat:5, Sun:6};
  const offset = map[p.weekday] ?? 0;
  start.setDate(start.getDate() - offset);
  return start;
}

function startOfMonthIst(){
  const p = istParts(new Date());
  return new Date(`${p.year}-${p.month}-01T00:00:00+05:30`);
}

function inRange(order, from){
  return new Date(order.created_at) >= from;
}

function isPaid(o){
  return o.status && o.status !== 'Payment Pending';
}

function fmtWhen(iso){
  return new Date(iso).toLocaleString('en-IN', {timeZone: TZ, day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'});
}

function itemSummary(items){
  if(!Array.isArray(items) || !items.length) return '—';
  return items.map(i => (i.qty || i.quantity || 1) + '× ' + (i.name || 'item')).join(', ');
}

function publicOrderNo(o){
  return o.order_number || o.id;
}

function waLink(o){
  const text = `FreshPhool order ${publicOrderNo(o)}\n${o.community || ''} ${o.block_flat || ''}\n${itemSummary(o.items)}\nStatus: ${o.status}`;
  return 'https://wa.me/918147613636?text=' + encodeURIComponent(text);
}

function isFactPaid(o){
  return o.payment_status && o.payment_status !== 'pending';
}

function orderTime(o){
  return new Date(o.ordered_at || o.created_at);
}

function inRangeTs(dt, from){
  return dt >= from;
}

function topCommunities(rows, limit){
  const counts = {};
  rows.forEach(r => {
    const c = r.community || (r.dim_addresses && r.dim_addresses.community) || '—';
    counts[c] = (counts[c] || 0) + 1;
  });
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0, limit);
}

function statCards(ctx, from, mount, topsMount){
  mount.classList.add('kpi-grid');
  const facts = ctx.facts || [];
  const legacy = ctx.orders || [];
  const useFacts = facts.length > 0;
  const slice = useFacts
    ? facts.filter(o => inRangeTs(orderTime(o), from))
    : legacy.filter(o => inRange(o, from));
  const paid = useFacts ? slice.filter(isFactPaid) : slice.filter(isPaid);
  const pending = useFacts ? slice.filter(o => !isFactPaid(o)) : slice.filter(o => !isPaid(o));
  const gmv = paid.reduce((s,o) => s + Number(o.subtotal || 0), 0);
  const one = paid.filter(o => o.kind === 'subscription' || o.kind === 'mixed').length;
  const once = paid.filter(o => o.kind === 'one_time').length;
  const puja = paid.filter(o => o.delivery_window === 'puja').length;
  const deco = paid.filter(o => o.delivery_window !== 'puja').length;
  const members = (ctx.members || []).filter(m => inRangeTs(new Date(m.created_at), from)).length;
  const pendingPay = (ctx.payments || []).filter(p => p.status === 'pending' && inRangeTs(new Date(p.created_at), from)).length;
  const activeRec = (ctx.recurring || []).filter(r => r.status === 'active').length;
  mount.innerHTML = `
    <div class="stat"><b>Orders</b><strong>${slice.length}</strong><span>${paid.length} paid · ${pending.length} pending${useFacts?' · facts':' · legacy'}</span></div>
    <div class="stat"><b>Paid GMV</b><strong>${rupee(gmv)}</strong><span>Unpaid not counted</span></div>
    <div class="stat"><b>New members</b><strong>${members}</strong><span>dim_members in window</span></div>
    <div class="stat"><b>Pending payments</b><strong>${pendingPay}</strong><span>fact_payments · Razorpay stub</span></div>
    <div class="stat"><b>Recurring active</b><strong>${activeRec}</strong><span>snapshot (all time)</span></div>
    <div class="stat"><b>Split</b><strong>${once}/${one}</strong><span>one-time / sub · puja ${puja} · deco ${deco}</span></div>
  `;
  const tops = topCommunities(
    useFacts
      ? slice.map(o => ({ community: (ctx.addrBySk[o.address_sk] || {}).community || '—' }))
      : slice.map(o => ({ community: o.community || '—' })),
    5
  );
  if(topsMount){
    topsMount.textContent = tops.length
      ? ('Top communities: ' + tops.map(([c,n]) => c + ' (' + n + ')').join(' · '))
      : 'Top communities: —';
  }
}

function getSession(){
  try { return JSON.parse(localStorage.getItem('fp_ops') || 'null'); }
  catch { return null; }
}

function setSession(s){
  if(s) localStorage.setItem('fp_ops', JSON.stringify(s));
  else localStorage.removeItem('fp_ops');
}

async function login(){
  const err = document.getElementById('loginErr');
  err.classList.add('hidden');
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const res = await fetch(FP.url + '/auth/v1/token?grant_type=password', {
    method: 'POST',
    headers: headers(FP.anon),
    body: JSON.stringify({email, password})
  });
  const data = await res.json();
  if(!res.ok){
    err.textContent = data.error_description || data.msg || data.error || 'Login failed';
    err.classList.remove('hidden');
    return;
  }
  setSession(data);
  showBoard();
}

async function loadOrders(token){
  const res = await fetch(FP.url + '/rest/v1/orders?select=*&order=created_at.desc', {
    headers: headers(token)
  });
  if(res.status === 401){
    setSession(null);
    showLogin();
    throw new Error('Session expired');
  }
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}

async function patchOrder(id, body){
  const s = getSession();
  const res = await fetch(FP.url + '/rest/v1/orders?id=eq.' + id, {
    method: 'PATCH',
    headers: {...headers(s.access_token), Prefer: 'return=minimal'},
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(await res.text());
}

async function loadRecurring(token){
  const res = await fetch(FP.url + '/rest/v1/recurring_orders?select=*&order=created_at.desc', {
    headers: headers(token)
  });
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}

async function patchRecurring(id, body){
  const s = getSession();
  const res = await fetch(FP.url + '/rest/v1/recurring_orders?id=eq.' + id, {
    method: 'PATCH',
    headers: {...headers(s.access_token), Prefer: 'return=minimal'},
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(await res.text());
}

function recWa(r){
  const label = r.subscription_number || ('recurring ' + String(r.id).slice(0,8));
  const text = `FreshPhool ${label}\n${r.offering} · ${r.name}\nQty ${r.qty} · ${r.duration_days} days\n${r.community || ''} ${r.block_flat || ''}\nStatus: ${r.status}`;
  return 'https://wa.me/918147613636?text=' + encodeURIComponent(text);
}

function recRows(list){
  if(!list.length) return '<tr><td colspan="8" class="muted">None yet.</td></tr>';
  return list.map(r => `
    <tr>
      <td><code>${r.subscription_number || '—'}</code></td>
      <td>${r.period_start || '—'} → ${r.period_end || '—'}</td>
      <td>${r.community || '—'}<br><span class="muted">${r.block_flat || ''}</span></td>
      <td>${r.name}${r.size ? ' · ' + r.size : ''}</td>
      <td><input data-id="${r.id}" class="qtyInp" type="number" min="1" value="${r.qty}" style="width:64px;padding:6px 8px;border-radius:8px;border:1.5px solid var(--line);"></td>
      <td>${rupee(r.prepaid_amount)}</td>
      <td><span class="pill ${r.status}">${r.status.replace('_',' ')}</span></td>
      <td class="row-actions">
        ${r.status === 'pending_payment' ? `<button class="btn btn-primary recActivate" data-id="${r.id}" type="button">Mark active</button>` : ''}
        ${r.status === 'active' ? `<button class="btn btn-ghost recPause" data-id="${r.id}" type="button">Pause</button>` : ''}
        ${r.status === 'paused' ? `<button class="btn btn-primary recResume" data-id="${r.id}" type="button">Resume</button>` : ''}
        ${r.status !== 'cancelled' ? `<button class="btn btn-ghost recCancel" data-id="${r.id}" type="button">Cancel</button>` : ''}
        <button class="btn btn-ghost recQty" data-id="${r.id}" type="button">Save qty</button>
        <a class="btn btn-wa" href="${recWa(r)}" target="_blank" rel="noopener">WhatsApp</a>
      </td>
    </tr>
  `).join('');
}

function bindRecurring(){
  document.querySelectorAll('.recActivate').forEach(btn => {
    btn.onclick = async () => { await patchRecurring(btn.dataset.id, {status: 'active'}); refresh(); };
  });
  document.querySelectorAll('.recPause').forEach(btn => {
    btn.onclick = async () => { await patchRecurring(btn.dataset.id, {status: 'paused'}); refresh(); };
  });
  document.querySelectorAll('.recResume').forEach(btn => {
    btn.onclick = async () => { await patchRecurring(btn.dataset.id, {status: 'active'}); refresh(); };
  });
  document.querySelectorAll('.recCancel').forEach(btn => {
    btn.onclick = async () => { await patchRecurring(btn.dataset.id, {status: 'cancelled'}); refresh(); };
  });
  document.querySelectorAll('.recQty').forEach(btn => {
    btn.onclick = async () => {
      const inp = document.querySelector('.qtyInp[data-id="' + btn.dataset.id + '"]');
      const qty = Math.max(1, parseInt(inp.value, 10) || 1);
      await patchRecurring(btn.dataset.id, {qty});
      refresh();
    };
  });
}

function render(ctx){
  const orders = ctx.orders || [];
  const recurring = ctx.recurring || [];
  statCards(ctx, startOfTodayIst(), document.getElementById('statsToday'), document.getElementById('topsToday'));
  statCards(ctx, startOfWeekIst(), document.getElementById('statsWeek'), document.getElementById('topsWeek'));
  statCards(ctx, startOfMonthIst(), document.getElementById('statsMonth'), document.getElementById('topsMonth'));

  const paid = orders.filter(isPaid).slice().sort((a,b)=>{
    const aw = a.delivery_window === 'puja' ? 0 : 1;
    const bw = b.delivery_window === 'puja' ? 0 : 1;
    if(aw !== bw) return aw - bw;
    return (a.community||'').localeCompare(b.community||'') || (a.block_flat||'').localeCompare(b.block_flat||'');
  });
  document.getElementById('paidBody').innerHTML = paid.map(o => `
    <tr>
      <td><code>${publicOrderNo(o)}</code></td>
      <td>${fmtWhen(o.created_at)}</td>
      <td>${o.community || '—'}</td>
      <td>${o.block_flat || '—'}</td>
      <td><span class="pill ${o.delivery_window}">${o.delivery_window}</span></td>
      <td><span class="pill ${o.kind}">${o.kind === 'one_time' ? 'one-time' : o.kind}</span></td>
      <td>${rupee(o.subtotal)}</td>
      <td>
        <select data-id="${o.id}" class="statusSel">
          ${STATUSES.map(st => `<option ${st===o.status?'selected':''}>${st}</option>`).join('')}
        </select>
      </td>
      <td class="row-actions">
        <a class="btn btn-wa" href="${waLink(o)}" target="_blank" rel="noopener">WhatsApp</a>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="9" class="muted">No paid orders yet.</td></tr>';

  const pending = orders.filter(o => !isPaid(o));
  document.getElementById('pendingBody').innerHTML = pending.map(o => `
    <tr>
      <td><code>${publicOrderNo(o)}</code></td>
      <td>${fmtWhen(o.created_at)}</td>
      <td>${o.community || '—'}</td>
      <td>${o.block_flat || '—'}</td>
      <td>${itemSummary(o.items)}</td>
      <td>${rupee(o.subtotal)}</td>
      <td class="row-actions">
        <button class="btn btn-primary confirmBtn" data-id="${o.id}" type="button">Confirm payment</button>
        <a class="btn btn-wa" href="${waLink(o)}" target="_blank" rel="noopener">WhatsApp</a>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="7" class="muted">No pending rows.</td></tr>';

  document.querySelectorAll('.statusSel').forEach(sel => {
    sel.onchange = async () => {
      await patchOrder(sel.dataset.id, {status: sel.value});
    };
  });
  document.querySelectorAll('.confirmBtn').forEach(btn => {
    btn.onclick = async () => {
      btn.disabled = true;
      await patchOrder(btn.dataset.id, {status: 'Payment Received', paid_at: new Date().toISOString()});
      const recs = await fetch(FP.url + '/rest/v1/recurring_orders?source_order_id=eq.' + btn.dataset.id, {
        method: 'PATCH',
        headers: {...headers(getSession().access_token), Prefer: 'return=minimal'},
        body: JSON.stringify({status: 'active'})
      });
      if(!recs.ok) console.warn(await recs.text());
      refresh();
    };
  });

  const pack = (recurring || []).filter(r => r.offering === 'puja_pack');
  const custom = (recurring || []).filter(r => r.offering !== 'puja_pack');
  document.getElementById('packRecBody').innerHTML = recRows(pack);
  document.getElementById('customRecBody').innerHTML = recRows(custom);
  bindRecurring();
}

async function loadTable(token, path){
  const res = await fetch(FP.url + '/rest/v1/' + path, { headers: headers(token) });
  if(res.status === 401){ setSession(null); showLogin(); throw new Error('Session expired'); }
  if(!res.ok) return [];
  return res.json();
}

async function refresh(){
  const s = getSession();
  if(!s) return;
  const token = s.access_token;
  const [orders, recurring, facts, members, payments, addresses] = await Promise.all([
    loadOrders(token),
    loadRecurring(token).catch(() => []),
    loadTable(token, 'fact_orders?select=*&order=ordered_at.desc'),
    loadTable(token, 'dim_members?select=*&order=created_at.desc'),
    loadTable(token, 'fact_payments?select=*&order=created_at.desc'),
    loadTable(token, 'dim_addresses?select=*')
  ]);
  const addrBySk = {};
  (addresses || []).forEach(a => { addrBySk[a.address_sk] = a; });
  render({ orders, recurring, facts, members, payments, addrBySk });
}

function csvEscape(v){
  const s = v == null ? '' : String(v);
  if(/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function toCsv(rows, columns){
  const head = columns.map(c => csvEscape(c.label)).join(',');
  const body = rows.map(r => columns.map(c => csvEscape(typeof c.get === 'function' ? c.get(r) : r[c.key])).join(',')).join('\n');
  return head + '\n' + body + '\n';
}

function istDayBounds(fromStr, toStr){
  const from = new Date(fromStr + 'T00:00:00+05:30');
  const to = new Date(toStr + 'T23:59:59.999+05:30');
  return { from, to, fromIso: from.toISOString(), toIso: to.toISOString() };
}

async function fetchAllPages(token, path){
  const out = [];
  let offset = 0;
  const page = 1000;
  while(true){
    const res = await fetch(FP.url + '/rest/v1/' + path, {
      headers: { ...headers(token), Range: offset + '-' + (offset + page - 1), Prefer: 'count=exact' }
    });
    if(!res.ok) throw new Error(await res.text());
    const chunk = await res.json();
    out.push(...chunk);
    if(chunk.length < page) break;
    offset += page;
    if(offset > 20000) break;
  }
  return out;
}

async function downloadExport(){
  const err = document.getElementById('exportErr');
  err.classList.add('hidden');
  const s = getSession();
  if(!s) return;
  const fromStr = document.getElementById('exportFrom').value;
  const toStr = document.getElementById('exportTo').value;
  const dataset = document.getElementById('exportDataset').value;
  if(!fromStr || !toStr){ err.textContent = 'Pick From and To dates.'; err.classList.remove('hidden'); return; }
  const { fromIso, toIso } = istDayBounds(fromStr, toStr);
  try {
    let rows = [];
    let columns = [];
    const token = s.access_token;
    if(dataset === 'orders'){
      const facts = await fetchAllPages(token, 'fact_orders?select=*&ordered_at=gte.' + fromIso + '&ordered_at=lte.' + toIso + '&order=ordered_at.desc');
      const members = await loadTable(token, 'dim_members?select=*');
      const addrs = await loadTable(token, 'dim_addresses?select=*');
      const subs = await loadTable(token, 'dim_subscriptions?select=subscription_sk,subscription_number').catch(() => []);
      const mBy = Object.fromEntries((members||[]).map(m => [m.member_sk, m]));
      const aBy = Object.fromEntries((addrs||[]).map(a => [a.address_sk, a]));
      const sBy = Object.fromEntries((subs||[]).map(s => [s.subscription_sk, s]));
      if(facts.length){
        rows = facts.map(o => ({
          ...o,
          member_name: (mBy[o.member_sk]||{}).name,
          member_email: (mBy[o.member_sk]||{}).email,
          member_phone: (mBy[o.member_sk]||{}).phone_e164,
          community: (aBy[o.address_sk]||{}).community,
          block_flat: (aBy[o.address_sk]||{}).block_flat,
          subscription_number: (sBy[o.subscription_sk]||{}).subscription_number || ''
        }));
      } else {
        rows = await fetchAllPages(token, 'orders?select=*&created_at=gte.' + fromIso + '&created_at=lte.' + toIso + '&order=created_at.desc');
      }
      columns = [
        {label:'ordered_at', get:r => r.ordered_at || r.created_at},
        {label:'order_number', get:r => r.order_number || r.order_bk || r.legacy_order_id || r.id},
        {label:'subscription_number', get:r => r.subscription_number || ''},
        {label:'member_name', key:'member_name'},
        {label:'member_email', key:'member_email'},
        {label:'member_phone', key:'member_phone'},
        {label:'community', key:'community'},
        {label:'block_flat', key:'block_flat'},
        {label:'subtotal', key:'subtotal'},
        {label:'status', key:'status'},
        {label:'payment_status', get:r => r.payment_status || ''},
        {label:'kind', key:'kind'},
        {label:'delivery_window', key:'delivery_window'},
        {label:'delivery_date', get:r => r.delivery_date || ''}
      ];
    } else if(dataset === 'lines'){
      const facts = await fetchAllPages(token, 'fact_orders?select=order_sk,order_bk,order_number,ordered_at,subscription_sk&ordered_at=gte.' + fromIso + '&ordered_at=lte.' + toIso);
      const subs = await loadTable(token, 'dim_subscriptions?select=subscription_sk,subscription_number').catch(() => []);
      const sBy = Object.fromEntries((subs||[]).map(s => [s.subscription_sk, s]));
      const ids = facts.map(f => f.order_sk);
      if(!ids.length){ rows = []; }
      else {
        // filter client-side if too many — batch in chunks of 50
        rows = [];
        for(let i=0;i<ids.length;i+=50){
          const chunk = ids.slice(i,i+50).join(',');
          const part = await fetchAllPages(token, 'fact_order_lines?select=*&order_sk=in.(' + chunk + ')');
          const by = Object.fromEntries(facts.map(f => [f.order_sk, f]));
          part.forEach(l => {
            const f = by[l.order_sk] || {};
            l.order_bk = f.order_bk;
            l.order_number = f.order_number;
            l.subscription_number = (sBy[f.subscription_sk]||{}).subscription_number || '';
            l.ordered_at = f.ordered_at;
          });
          rows.push(...part);
        }
      }
      columns = [
        {label:'ordered_at', key:'ordered_at'},
        {label:'order_number', key:'order_number'},
        {label:'subscription_number', key:'subscription_number'},
        {label:'name', key:'name'},
        {label:'qty', key:'qty'},
        {label:'unit_price', key:'unit_price'},
        {label:'cadence', key:'cadence'},
        {label:'duration_days', key:'duration_days'},
        {label:'offering', key:'offering'}
      ];
    } else if(dataset === 'members'){
      rows = await fetchAllPages(token, 'dim_members?select=*&created_at=gte.' + fromIso + '&created_at=lte.' + toIso + '&order=created_at.desc');
      columns = [
        {label:'created_at', key:'created_at'},
        {label:'name', key:'name'},
        {label:'email', key:'email'},
        {label:'phone_e164', key:'phone_e164'},
        {label:'member_sk', key:'member_sk'}
      ];
    } else if(dataset === 'payments'){
      const pays = await fetchAllPages(token, 'fact_payments?select=*&created_at=gte.' + fromIso + '&created_at=lte.' + toIso + '&order=created_at.desc');
      const facts = await loadTable(token, 'fact_orders?select=order_sk,order_number,subscription_sk');
      const subs = await loadTable(token, 'dim_subscriptions?select=subscription_sk,subscription_number').catch(() => []);
      const fBy = Object.fromEntries((facts||[]).map(f => [f.order_sk, f]));
      const sBy = Object.fromEntries((subs||[]).map(s => [s.subscription_sk, s]));
      rows = pays.map(p => {
        const f = fBy[p.order_sk] || {};
        return {
          ...p,
          order_number: f.order_number || '',
          subscription_number: (sBy[f.subscription_sk]||{}).subscription_number || ''
        };
      });
      columns = [
        {label:'created_at', key:'created_at'},
        {label:'order_number', key:'order_number'},
        {label:'subscription_number', key:'subscription_number'},
        {label:'amount', key:'amount'},
        {label:'status', key:'status'},
        {label:'provider', key:'provider'},
        {label:'provider_payment_id', key:'provider_payment_id'},
        {label:'order_sk', key:'order_sk'},
        {label:'member_sk', key:'member_sk'}
      ];
    } else if(dataset === 'recurring'){
      rows = await fetchAllPages(token, 'recurring_orders?select=*&created_at=gte.' + fromIso + '&created_at=lte.' + toIso + '&order=created_at.desc');
      columns = [
        {label:'created_at', key:'created_at'},
        {label:'subscription_number', key:'subscription_number'},
        {label:'offering', key:'offering'},
        {label:'name', key:'name'},
        {label:'status', key:'status'},
        {label:'prepaid_amount', key:'prepaid_amount'},
        {label:'community', key:'community'},
        {label:'block_flat', key:'block_flat'},
        {label:'period_start', key:'period_start'},
        {label:'period_end', key:'period_end'}
      ];
    }
    const csv = toCsv(rows, columns);
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'freshphool-' + dataset + '-' + fromStr + '-' + toStr + '.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  } catch (e) {
    err.textContent = e.message || String(e);
    err.classList.remove('hidden');
  }
}

function showLogin(){
  document.getElementById('login').classList.remove('hidden');
  document.getElementById('board').classList.add('hidden');
  document.getElementById('logoutBtn').classList.add('hidden');
  document.getElementById('who').textContent = '';
}

function showBoard(){
  const s = getSession();
  document.getElementById('login').classList.add('hidden');
  document.getElementById('board').classList.remove('hidden');
  document.getElementById('logoutBtn').classList.remove('hidden');
  document.getElementById('who').textContent = (s.user && s.user.email) || '';
  refresh().catch(err => {
    document.getElementById('loginErr').textContent = String(err);
    document.getElementById('loginErr').classList.remove('hidden');
    showLogin();
    document.getElementById('login').classList.remove('hidden');
  });
}

document.getElementById('loginBtn').onclick = login;
document.getElementById('password').addEventListener('keydown', e => { if(e.key==='Enter') login(); });
document.getElementById('logoutBtn').onclick = () => { setSession(null); showLogin(); };
document.getElementById('exportBtn').onclick = downloadExport;
(function initExportDates(){
  const to = startOfTodayIst();
  const from = new Date(to); from.setDate(from.getDate() - 6);
  const fmt = d => {
    const p = istParts(d);
    return p.year + '-' + p.month + '-' + p.day;
  };
  document.getElementById('exportFrom').value = fmt(from);
  document.getElementById('exportTo').value = fmt(to);
})();

if(getSession() && getSession().access_token) showBoard();

