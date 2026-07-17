'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart/cart-context';
import { createOrder } from '@/lib/data/orders';
import { euro } from '@/lib/format';
import { site } from '@/lib/site';
export default function Checkout() {
  const { items, subtotal, clear, ready } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [busy, setBusy] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const delivery = method === 'delivery' && items.length ? site.deliveryFee : 0;
  const total = subtotal + delivery;
  if (ready && !items.length) return <div className="wrap"><div className="empty">Your cart is empty. <Link href="/shop" style={{ color: 'var(--gold-ink)' }}>Browse flowers →</Link></div></div>;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || !items.length) return;
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) || '');
    // Card payment via Stripe — active when NEXT_PUBLIC_STRIPE_ENABLED=true and keys are set.
    if (process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true') {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((i) => ({ name: i.name, variant: i.variant, price: i.price, qty: i.qty })),
            deliveryFee: delivery, successUrl: window.location.origin + '/track-order', cancelUrl: window.location.origin + '/checkout',
          }),
        });
        const data = await res.json();
        if (data.url) { window.location.href = data.url; return; }
      } catch { /* fall through to demo order */ }
    }
    const order = createOrder({
      customerName: `${g('fn')} ${g('ln')}`.trim(), customerEmail: g('email'), customerPhone: g('phone'),
      recipientName: method === 'pickup' ? `${g('fn')} ${g('ln')}`.trim() : g('rcpt'),
      address: g('addr'), town: g('town'), postcode: g('pc'),
      cardMessage: g('msg') || undefined, instructions: g('instr') || undefined,
      method, deliveryDate: g('date') || undefined,
      items: items.map((i) => ({ productId: i.productId, name: i.name, variant: i.variant, price: i.price, qty: i.qty, image: i.image })),
      subtotal, delivery, total, paymentStatus: 'Paid (demo)',
    });
    clear();
    router.push('/order-confirmation/' + order.id);
  }
  return (
    <div className="wrap" style={{ paddingBottom: 80 }}>
      <div className="crumbs"><Link href="/cart">← Back to cart</Link></div>
      <h1 style={{ fontSize: 38, color: 'var(--brand-900)', marginBottom: 22 }}>Checkout</h1>
      <div className="split">
        <form onSubmit={submit}>
          <fieldset><legend>Delivery method</legend>
            <div style={{ display: 'flex', border: '1px solid var(--line)', borderRadius: 3, overflow: 'hidden' }}>
              <button type="button" onClick={() => setMethod('delivery')} style={{ flex: 1, padding: 12, border: 'none', background: method === 'delivery' ? 'var(--brand-800)' : '#fff', color: method === 'delivery' ? '#fff' : 'inherit' }}>Deliver</button>
              <button type="button" onClick={() => setMethod('pickup')} style={{ flex: 1, padding: 12, border: 'none', background: method === 'pickup' ? 'var(--brand-800)' : '#fff', color: method === 'pickup' ? '#fff' : 'inherit' }}>Pick up in store</button>
            </div>
          </fieldset>
          <fieldset><legend>Your details</legend><div className="stack">
            <div className="row2"><input name="fn" required className="field" placeholder="First name" /><input name="ln" required className="field" placeholder="Last name" /></div>
            <div className="row2"><input name="email" type="email" required className="field" placeholder="Email" /><input name="phone" type="tel" required className="field" placeholder="Phone" /></div>
          </div></fieldset>
          {method === 'delivery' ? (
            <fieldset><legend>Recipient &amp; address</legend><div className="stack">
              <input name="rcpt" className="field" placeholder="Recipient name" />
              <input name="addr" required className="field" placeholder="Address" />
              <div className="row2"><input name="town" required className="field" placeholder="Town / City" /><input name="pc" className="field" placeholder="Eircode / Postcode" /></div>
              <div className="row2"><input name="date" type="date" min={today} className="field" aria-label="Delivery date" /><input name="instr" className="field" placeholder="Delivery instructions (optional)" /></div>
            </div></fieldset>
          ) : (
            <fieldset><legend>Pickup</legend><p style={{ color: 'var(--muted)', margin: '0 0 10px' }}>Free pickup at {site.address}.</p><input name="date" type="date" min={today} className="field" aria-label="Pickup date" /></fieldset>
          )}
          <fieldset><legend>Gift card message</legend><textarea name="msg" className="field" placeholder="Your message (leave blank for no card)" /></fieldset>
          <label style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted)', alignItems: 'flex-start' }}><input type="checkbox" required /> I accept the <Link href="/terms" style={{ color: 'var(--gold-ink)' }}>Terms</Link> &amp; <Link href="/privacy" style={{ color: 'var(--gold-ink)' }}>Privacy Policy</Link>.</label>
          <button className="btn btn-primary" type="submit" disabled={busy} style={{ width: '100%', marginTop: 12 }}>{busy ? 'Placing order…' : `Place order · ${euro(total)}`}</button>
        </form>
        <div className="panel"><h2>Order summary</h2><div className="sum">
          {items.map((it, ix) => <div className="r" key={ix}><span>{it.qty}× {it.name} ({it.variant})</span><span>{euro(it.price * it.qty)}</span></div>)}
          <div className="r"><span>Delivery</span><span>{euro(delivery)}</span></div>
          <div className="r total"><span>Total</span><span>{euro(total)}</span></div>
          <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 12 }}>🔒 Secure card payment with Stripe when enabled — otherwise this demo places the order directly.</p>
        </div></div>
      </div>
    </div>
  );
}
