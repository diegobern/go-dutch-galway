'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart, keyOf } from '@/lib/cart/cart-context';
import { euro } from '@/lib/format';
import { site } from '@/lib/site';
export default function CartPage() {
  const { items, remove, setQty, subtotal, ready } = useCart();
  if (!ready) return <div className="wrap"><p className="empty">Loading your cart…</p></div>;
  const delivery = items.length ? site.deliveryFee : 0;
  const total = subtotal + delivery;
  return (
    <div className="wrap" style={{ paddingBottom: 80 }}>
      <div className="crumbs"><Link href="/shop">← Continue shopping</Link></div>
      <h1 style={{ fontSize: 38, color: 'var(--brand-900)', marginBottom: 22 }}>Your Cart</h1>
      {items.length ? (
        <div className="split">
          <div className="panel"><h2>Items</h2>
            {items.map((it) => { const k = keyOf(it); return (
              <div className="line" key={k}>
                <div className="im" style={{ position: 'relative' }}><Image src={it.image} alt={it.name} fill sizes="84px" style={{ objectFit: 'cover' }} /></div>
                <div>
                  <h3>{it.name}</h3>
                  <div className="meta">Size: {it.variant}</div>
                  {it.cardMessage && <div className="meta">Card: “{it.cardMessage}”</div>}
                  <div className="qty" style={{ marginTop: 8 }}>
                    <button onClick={() => setQty(k, it.qty - 1)} aria-label="Less">−</button>
                    <input value={it.qty} onChange={(e) => setQty(k, parseInt(e.target.value) || 1)} inputMode="numeric" />
                    <button onClick={() => setQty(k, it.qty + 1)} aria-label="More">+</button>
                  </div>
                  <button className="link" style={{ marginTop: 8 }} onClick={() => remove(k)}>Remove</button>
                </div>
                <div style={{ fontWeight: 500, textAlign: 'right' }}>{euro(it.price * it.qty)}</div>
              </div>
            ); })}
          </div>
          <div className="panel"><h2>Summary</h2>
            <div className="sum">
              <div className="r"><span>Subtotal</span><span>{euro(subtotal)}</span></div>
              <div className="r"><span>Delivery</span><span>{euro(delivery)}</span></div>
              <div className="r total"><span>Total</span><span>{euro(total)}</span></div>
              <Link className="btn btn-primary" href="/checkout" style={{ width: '100%', marginTop: 16 }}>Checkout →</Link>
              <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 12 }}>🔒 Secure Stripe checkout in production</p>
            </div>
          </div>
        </div>
      ) : <div className="empty">Your cart is empty. <Link href="/shop" style={{ color: 'var(--gold-ink)' }}>Browse flowers →</Link></div>}
    </div>
  );
}
