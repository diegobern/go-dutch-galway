'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart/cart-context';
import { Product } from '@/lib/data/types';
import { euro } from '@/lib/format';
export default function ProductPurchase({ p }: { p: Product }) {
  const { add } = useCart();
  const [vi, setVi] = useState(0);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState('');
  const [rcpt, setRcpt] = useState('');
  const [date, setDate] = useState('');
  const [added, setAdded] = useState(false);
  const v = p.variants[vi];
  if (!p.available) return <p className="note">This product is currently out of stock. Please check back soon or <Link href="/contact" style={{ textDecoration: 'underline' }}>contact us</Link>.</p>;
  return (
    <div>
      {p.variants.length > 1 && (<>
        <span className="lbl">Size</span>
        <div className="sizes">
          {p.variants.map((x, i) => (
            <button key={x.id} className={i === vi ? 'sel' : ''} onClick={() => setVi(i)}>
              <span className="s">{x.name}</span><span className="p">{euro(x.price)}</span>
            </button>
          ))}
        </div>
      </>)}
      <div className="row2" style={{ marginTop: 18 }}>
        <div><span className="lbl" style={{ marginTop: 0 }}>Recipient&apos;s name</span><input className="field" value={rcpt} onChange={(e) => setRcpt(e.target.value)} placeholder="e.g. Mary Walsh" /></div>
        <div><span className="lbl" style={{ marginTop: 0 }}>Delivery date</span><input className="field" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
      </div>
      <span className="lbl">Card message</span>
      <textarea className="field" maxLength={250} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Your message for the gift card (max 250 chars)" />
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', margin: '22px 0' }}>
        <div className="qty">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Less">−</button>
          <input value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} inputMode="numeric" />
          <button onClick={() => setQty((q) => q + 1)} aria-label="More">+</button>
        </div>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { add({ productId: p.id, slug: p.slug, name: p.name, variant: v.name, price: v.price, qty, image: p.image, cardMessage: msg || undefined }); setAdded(true); }}>
          Add to cart · {euro(v.price * qty)}
        </button>
      </div>
      {added && <div className="note">Added to your cart ✓ &nbsp; <Link href="/cart" style={{ textDecoration: 'underline' }}>View cart & checkout →</Link></div>}
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 18, color: 'var(--muted)', fontSize: 13 }}>
        <span>🚚 Same-day before 1pm</span><span>🌍 Hand-picked worldwide</span><span>✓ Satisfaction guaranteed</span>
      </div>
    </div>
  );
}
