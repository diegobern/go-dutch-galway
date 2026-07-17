'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getOrder } from '@/lib/data/orders';
import { euro, STATUS_LABELS } from '@/lib/format';
import { Order } from '@/lib/data/types';
export default function Confirm() {
  const params = useParams();
  const id = String(params.orderId || '');
  const [o, setO] = useState<Order | null | undefined>(undefined);
  useEffect(() => { setO(getOrder(id)); }, [id]);
  if (o === undefined) return <div className="wrap"><p className="empty">Loading…</p></div>;
  if (!o) return <div className="confirm"><h1 style={{ fontSize: 34, color: 'var(--brand-900)' }}>Order not found</h1><p style={{ color: 'var(--muted)' }}>We couldn’t find that order in this browser.</p><Link className="btn btn-primary" href="/shop">Continue shopping</Link></div>;
  const s = STATUS_LABELS[o.status];
  return (
    <div className="confirm">
      <div className="tick">✓</div>
      <span className="pill st-new">Order received</span>
      <h1 style={{ fontSize: 40, color: 'var(--brand-900)', margin: '14px 0 8px' }}>Thank you! 🌸</h1>
      <p style={{ color: 'var(--muted)' }}>We’ve received your order and emailed a confirmation. Our florists will hand-make it fresh for your delivery date.</p>
      <div className="rcard">
        <div className="r"><span>Order number</span><b>{o.id}</b></div>
        <div className="r"><span>Status</span><span className={'pill ' + s.cls}>{s.label}</span></div>
        <div className="r"><span>Delivery date</span><b>{o.deliveryDate || 'To be confirmed'}</b></div>
        <div className="r"><span>Method</span><b>{o.method === 'pickup' ? 'Store pickup' : 'Delivery'}</b></div>
        {o.items.map((it, ix) => <div className="r" key={ix}><span>{it.qty}× {it.name} ({it.variant})</span><span>{euro(it.price * it.qty)}</span></div>)}
        <div className="r" style={{ border: 'none' }}><span>Total paid</span><b>{euro(o.total)}</b></div>
      </div>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 18 }}>Track your order anytime with your order number and email.</p>
      <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link className="btn btn-ghost" href="/track-order">Track my order</Link>
        <Link className="btn btn-primary" href="/shop">Continue shopping</Link>
      </div>
    </div>
  );
}
