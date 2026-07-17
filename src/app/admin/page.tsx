'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getOrders } from '@/lib/data/orders';
import { euro, STATUS_LABELS } from '@/lib/format';
import { Order } from '@/lib/data/types';
export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => setOrders(getOrders()), []);
  const today = new Date().toISOString().slice(0, 10);
  const count = (s: string) => orders.filter((o) => o.status === s).length;
  const salesToday = orders.filter((o) => o.createdAt === today).reduce((a, b) => a + b.total, 0);
  const pending = count('new') + count('prep');
  const avg = orders.length ? orders.reduce((a, b) => a + b.total, 0) / orders.length : 0;
  const upcoming = [...orders].filter((o) => o.status !== 'done' && o.status !== 'cancel').sort((a, b) => (a.deliveryDate || '') < (b.deliveryDate || '') ? -1 : 1).slice(0, 4);
  const bars = [48, 62, 40, 74, 92, 100, 30];
  return (
    <>
      <div className="adm-h"><div><h1>Good morning, Henk 🌷</h1><p>Here’s what’s happening in the shop today.</p></div><Link className="adm-btn" href="/admin/orders">View all orders →</Link></div>
      <div className="kpis">
        <div className="kpi"><div className="l">Sales today</div><div className="v">{euro(salesToday)}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>{orders.filter((o) => o.createdAt === today).length} order(s) today</div></div>
        <div className="kpi"><div className="l">Total orders</div><div className="v">{orders.length}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>all time (demo)</div></div>
        <div className="kpi"><div className="l">Awaiting prep</div><div className="v">{pending}</div><div style={{ fontSize: 12, color: 'var(--amber, #c98a1e)' }}>needs attention</div></div>
        <div className="kpi"><div className="l">Avg. order</div><div className="v">{euro(avg)}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>per order</div></div>
      </div>
      <div className="adm-2">
        <div>
          <div className="adm-box"><h3>Sales · last 7 days</h3><div className="chart">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => <div className="col" key={d}><div className="bar" style={{ height: bars[i] + '%' }} /><div className="cap">{d}</div></div>)}</div></div>
          <div className="adm-box"><h3>Orders by status</h3><div className="stat3">
            {(['new', 'prep', 'ready', 'out', 'done', 'cancel'] as const).map((s) => <div className="s" key={s}><div className="n">{count(s)}</div><div className="t">{STATUS_LABELS[s].label}</div></div>)}
          </div></div>
        </div>
        <div>
          <div className="adm-box"><h3>⚠ Needs attention</h3>
            <div className="alert">🔴 {count('new')} new order(s) awaiting preparation</div>
            <div className="alert" style={{ background: '#e6f0f5', borderColor: '#c7dde8', color: '#2f6f8f' }}>🔵 {count('out')} order(s) out for delivery</div>
            <div className="alert" style={{ background: '#eaeef0', borderColor: '#d7dde0', color: '#54606a' }}>🟡 “Spring Planter Box” is out of stock but still listed</div>
          </div>
          <div className="adm-box"><h3>Upcoming deliveries</h3>
            {upcoming.length ? upcoming.map((o) => <div className="up" key={o.id}><div className="d"><b>{(o.deliveryDate || '—').slice(8, 10) || '—'}</b><span>{(o.deliveryDate || '').slice(5, 7)}</span></div><div className="w"><b>{o.recipientName || o.customerName}</b><div>{o.items.map((i) => i.name).join(', ')} · {o.town}</div></div></div>)
              : <p style={{ color: 'var(--muted)', margin: 0 }}>No upcoming deliveries.</p>}
          </div>
        </div>
      </div>
    </>
  );
}
