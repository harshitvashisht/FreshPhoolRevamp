
(function(){
  const box = document.getElementById('summary');
  let data = null;
  try { data = JSON.parse(sessionStorage.getItem('fp_last_order') || 'null'); } catch(_){}
  const params = new URLSearchParams(location.search);
  const orderId = params.get('order') || (data && (data.order_number || data.id)) || '';
  if(!data){
    document.getElementById('emptyNote').textContent = orderId
      ? ('Order ' + orderId + ' was recorded. Open the cart again if you need the line items.')
      : 'No recent order in this browser session.';
    return;
  }
  const orderNumber = data.order_number || data.id || orderId;
  const subs = (data.subscription_numbers || []).filter(Boolean);
  const deliveries = (data.delivery_order_numbers || []).filter(Boolean);
  const lines = (data.items || []).map(i => {
    const days = i.duration_days || 1;
    const rec = i.cadence === 'daily' || i.cadence === 'weekly' || i.cadence === 'monthly';
    let deliveries = 1;
    if(i.offering === 'puja_pack') deliveries = 1;
    else if(i.cadence === 'daily') deliveries = days;
    else if(i.cadence === 'weekly') deliveries = Math.max(1, Math.round(days / 7));
    else if(i.cadence === 'monthly') deliveries = Math.max(1, Math.round(days / 30));
    const total = (i.price || 0) * i.qty * deliveries;
    const tag = rec ? ' · ' + i.cadence + ' · ' + days + 'd' : '';
    return '<div class="row"><span>' + i.name + ' × ' + i.qty + tag + '</span><span>₹' + total + '</span></div>';
  }).join('');
  box.innerHTML = '<h2>Order summary</h2>' +
    '<p style="margin:0 0 12px;font-size:13px;color:#6B7A6E;"><strong>Order number</strong> ' + orderNumber +
    (subs.length ? '<br><strong>Subscription ID</strong> ' + subs.join(', ') : '') +
    (deliveries.length > 1 ? '<br><strong>Delivery orders</strong> ' + deliveries.join(', ') : '') +
    '<br>' + (data.name || '') + ' · ' + (data.phone || '') + '<br>' +
    (data.community || '') + ' · ' + (data.block_flat || '') + '</p>' +
    lines +
    '<div class="row"><span>Subtotal</span><span>₹' + (data.subtotal || 0) + '</span></div>';
})();

