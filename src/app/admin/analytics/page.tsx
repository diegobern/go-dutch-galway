'use client';
import { useEffect, useState } from 'react';
import { getOrders } from '@/lib/data/orders';
import { euro, STATUS_LABELS } from '@/lib/format';
import { Order } from '@/lib/data/types';
export default function Analytics() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => setOrders(getOrders()), []);
  const revenue = orders.filter((o) => o.status !== 'cancel').reduce((a, b) => a + b.total, 0);
  const avg = orders.length ? revenue / orders.length : 0;
  const top: Record<string, { qty: number; rev: number }> = {};
  orders.forEach((o) => o.items.forEach((it) => { top[it.name] = top[it.name] || { qty: 0, rev: 0 }; top[it.name].qty += it.qty; top[it.name].rev += it.price * it.qty; }));
  const topList = Object.entries(top).sort((a, b) => b[1].rev - a[1].rev).slice(0, 6);
  const bars = [40, 55, 48, 70, 88, 100, 34];
  return (
    <>
      <div className="adm-h"><div><h1>Analytics</h1><p>Sales, orders and product performance.</p></div></div>
      <div className="kpis">
        <div className="kpi"><div className="l">Revenue</div><div className="v">{euro(revenue)}</div></div>
        <div className="kpi"><div className="l">Orders</div><div className="v">{orders.length}</div></div>
        <div className="kpi"><div className="l">Avg. order</div><div className="v">{euro(avg)}</div></div>
        <div className="kpi"><div className="l">Delivered</div><div className="v">{orders.filter((o) => o.status === 'done').length}</div></div>
      </div>
      <div className="adm-2">
        <div className="adm-box"><h3>Revenue · last 7 days</h3><div className="chart">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => <div className="col" key={d}><div className="bar" style={{ height: bars[i] + '%' }} /><div className="cap">{d}</div></div>)}</div></div>
        <div className="adm-box"><h3>Top products</h3>
          {topList.length ? topList.map(([name, v]) => <div key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--line)' }}><span>{name} <span style={{ color: 'var(--muted)' }}>×{v.qty}</span></span><b>{euro(v.rev)}</b></div>)
            : <p style={{ color: 'var(--muted)', margin: 0 }}>No sales yet.</p>}
        </div>
      </div>
    </>
  );
}
