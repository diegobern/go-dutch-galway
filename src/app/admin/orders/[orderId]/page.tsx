'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getOrder, updateOrderStatus } from '@/lib/data/orders';
import { euro, STATUS_LABELS } from '@/lib/format';
import { Order, OrderStatus } from '@/lib/data/types';
export default function OrderDetail() {
  const id = String(useParams().orderId || '');
  const [o, setO] = useState<Order | null | undefined>(undefined);
  const [notes, setNotes] = useState('');
  useEffect(() => setO(getOrder(id)), [id]);
  if (o === undefined) return <p style={{ color: 'var(--muted)' }}>Loading…</p>;
  if (!o) return <><div className="adm-h"><h1>Order not found</h1></div><Link className="adm-btn" href="/admin/orders">← Back to orders</Link></>;
  function set(st: OrderStatus) { updateOrderStatus(o!.id, st); setO(getOrder(id)); }
  return (
    <>
      <div className="adm-h"><div><Link href="/admin/orders" style={{ fontSize: 13, color: 'var(--muted)' }}>← Orders</Link><h1>{o.id}</h1><p>Placed {o.createdAt} · {o.method === 'pickup' ? 'Store pickup' : 'Delivery'}</p></div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className={'pill ' + STATUS_LABELS[o.status].cls}>{o.status === 'done' ? '✓ ' : ''}{STATUS_LABELS[o.status].label}</span>
          <select className={'stsel ' + STATUS_LABELS[o.status].cls} value={o.status} onChange={(e) => set(e.target.value as OrderStatus)}>{Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select>
        </div>
      </div>
      {o.status === 'done' && <div className="alert" style={{ background: '#e0f2ec', borderColor: '#bfe3d7', color: '#1f8a70', marginBottom: 16 }}>✓ This order has been delivered.</div>}
      <div className="adm-2">
        <div className="adm-box"><h3>Items</h3>
          {o.items.map((it, ix) => <div key={ix} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--line)' }}><span>{it.qty}× {it.name} <span style={{ color: 'var(--muted)' }}>({it.variant})</span></span><b>{euro(it.price * it.qty)}</b></div>)}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: 'var(--muted)' }}><span>Delivery</span><span>{euro(o.delivery)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--brand-900)' }}><span>Total</span><span>{euro(o.total)}</span></div>
          {o.cardMessage && <div className="note" style={{ marginTop: 14 }}>Card message: “{o.cardMessage}”</div>}
        </div>
        <div>
          <div className="adm-box"><h3>Customer &amp; delivery</h3>
            <p style={{ margin: '4px 0' }}><b>{o.customerName}</b></p>
            <p style={{ margin: '4px 0', color: 'var(--muted)' }}>{o.customerEmail} · {o.customerPhone}</p>
            <hr style={{ border: 0, borderTop: '1px solid var(--line)', margin: '12px 0' }} />
            <p style={{ margin: '4px 0' }}>To: <b>{o.recipientName || '—'}</b></p>
            <p style={{ margin: '4px 0', color: 'var(--muted)' }}>{o.address}{o.address ? ', ' : ''}{o.town} {o.postcode}</p>
            <p style={{ margin: '4px 0', color: 'var(--muted)' }}>Date: {o.deliveryDate || 'TBC'}</p>
            {o.instructions && <p style={{ margin: '4px 0', color: 'var(--muted)' }}>Instructions: {o.instructions}</p>}
          </div>
          <div className="adm-box"><h3>Actions</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="adm-btn" onClick={() => set('prep')}>Mark preparing</button>
              <button className="adm-btn" onClick={() => set('out')}>Out for delivery</button>
              <button className="adm-btn" style={{ background: '#1f8a70' }} onClick={() => set('done')}>✓ Mark delivered</button>
              <button className="adm-btn o" onClick={() => { if (confirm('Cancel this order?')) set('cancel'); }}>Cancel</button>
              <button className="adm-btn o" onClick={() => window.print()}>Print docket</button>
            </div>
            <label className="lbl">Internal notes</label>
            <textarea className="field" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add a note (demo — not persisted)" />
          </div>
        </div>
      </div>
    </>
  );
}
