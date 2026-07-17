'use client';
import Link from 'next/link';
import { useState } from 'react';
import { findOrder } from '@/lib/data/orders';
import { euro, STATUS_LABELS } from '@/lib/format';
import { Order } from '@/lib/data/types';
export default function Track() {
  const [res, setRes] = useState<Order | null | undefined>(undefined);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setRes(findOrder(String(f.get('id')), String(f.get('email'))));
  }
  return (
    <div className="page">
      <h1>Track your order</h1>
      <p className="lead">Enter your order number and the email used to place it.</p>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12, maxWidth: 420, marginTop: 20 }}>
        <input name="id" required className="field" placeholder="Order number (e.g. GD-284517)" />
        <input name="email" type="email" required className="field" placeholder="Email used on the order" />
        <button className="btn btn-primary" type="submit">Track order</button>
      </form>
      {res === null && <div className="note" style={{ marginTop: 20 }}>No order found for those details. Demo tip: try <b>GD-284517</b> with <b>aoife@example.com</b>, or place a new order and use its number.</div>}
      {res && (
        <div className="rcard" style={{ marginTop: 24 }}>
          <div className="r"><span>Order</span><b>{res.id}</b></div>
          <div className="r"><span>Status</span><span className={'pill ' + STATUS_LABELS[res.status].cls}>{STATUS_LABELS[res.status].label}</span></div>
          <div className="r"><span>Delivery date</span><b>{res.deliveryDate || 'TBC'}</b></div>
          <div className="r"><span>Recipient</span><b>{res.recipientName || '—'}</b></div>
          <div className="r" style={{ border: 'none' }}><span>Total</span><b>{euro(res.total)}</b></div>
        </div>
      )}
    </div>
  );
}
