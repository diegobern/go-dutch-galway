'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/data/orders';
import { euro, STATUS_LABELS } from '@/lib/format';
import { Order, OrderStatus } from '@/lib/data/types';
const FILTERS: { k: string; label: string }[] = [
  { k: 'all', label: 'All' }, { k: 'new', label: 'New' }, { k: 'prep', label: 'Preparing' },
  { k: 'ready', label: 'Ready' }, { k: 'out', label: 'Out for delivery' }, { k: 'done', label: 'Delivered' }, { k: 'cancel', label: 'Cancelled' },
];
export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [fil, setFil] = useState('all');
  const [q, setQ] = useState('');
  useEffect(() => setOrders(getOrders()), []);
  function change(id: string, st: OrderStatus) { updateOrderStatus(id, st); setOrders(getOrders()); }
  const rows = orders.filter((o) => (fil === 'all' || o.status === fil) && (!q || (o.id + o.customerName + o.recipientName).toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <div className="adm-h"><div><h1>Orders</h1><p>Manage, update status and track every order.</p></div><button className="adm-btn o" onClick={() => alert('Demo: exports all orders to CSV in production.')}>⭳ Export CSV</button></div>
      <div className="tools">
        {FILTERS.map((f) => <button key={f.k} className={'chip' + (fil === f.k ? ' on' : '')} onClick={() => setFil(f.k)}>{f.label}</button>)}
        <input className="field" style={{ maxWidth: 220, marginLeft: 'auto' }} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="tablewrap"><table className="adm">
        <thead><tr><th>Order</th><th>Customer</th><th>Recipient</th><th>Delivery</th><th>Total</th><th>Payment</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {rows.map((o) => (
            <tr key={o.id}>
              <td><div className="oid">{o.id}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>{o.createdAt}</div></td>
              <td>{o.customerName}</td>
              <td>{o.recipientName || '—'}<div style={{ fontSize: 12, color: 'var(--muted)' }}>{o.town}</div></td>
              <td>{o.deliveryDate || '—'}</td>
              <td><b>{euro(o.total)}</b></td>
              <td><span className={'pill ' + (o.paymentStatus.startsWith('Paid') ? 'st-out' : 'st-prep')}>{o.paymentStatus}</span></td>
              <td><select className="stsel" value={o.status} onChange={(e) => change(o.id, e.target.value as OrderStatus)}>{Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></td>
              <td><Link className="iconbtn2" href={`/admin/orders/${o.id}`}>Open</Link></td>
            </tr>
          ))}
          {!rows.length && <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--muted)', padding: 28 }}>No orders in this view.</td></tr>}
        </tbody>
      </table></div>
    </>
  );
}
