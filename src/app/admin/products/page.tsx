'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { products as seed } from '@/lib/data/products';
import { euro } from '@/lib/format';
export default function AdminProducts() {
  const [list, setList] = useState(seed.map((p) => ({ ...p })));
  const toggle = (id: string, key: 'featured' | 'available') => setList((l) => l.map((p) => (p.id === id ? { ...p, [key]: !p[key] } : p)));
  return (
    <>
      <div className="adm-h"><div><h1>Products</h1><p>Your live catalogue — edit, price, feature or archive.</p></div><Link className="adm-btn" href="/admin/products/new">＋ Add product</Link></div>
      <div className="tablewrap"><table className="adm">
        <thead><tr><th>Product</th><th>Type</th><th>Price</th><th>Stock</th><th>Featured</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.id}>
              <td><div className="prodcell"><div className="im"><Image src={p.image} alt="" fill sizes="44px" style={{ objectFit: 'cover' }} /></div><b>{p.name}</b></div></td>
              <td style={{ color: 'var(--muted)' }}>{p.type}</td>
              <td>{p.variants.length > 1 ? 'from ' : ''}{euro(p.priceFrom)}</td>
              <td><button className="link" onClick={() => toggle(p.id, 'available')}>{p.available ? <span style={{ color: 'var(--muted)' }}>In stock</span> : <span className="pill st-cancel">Out of stock</span>}</button></td>
              <td><button className={'toggle' + (p.featured ? ' on' : '')} onClick={() => toggle(p.id, 'featured')} aria-label="Featured" /></td>
              <td>{p.available ? <span className="pill st-out">Active</span> : <span className="pill st-done">Archived</span>}</td>
              <td><Link className="iconbtn2" href={`/admin/products/${p.id}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table></div>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12 }}>Demo: toggles update this session. With Firebase connected, changes persist and reflect on the storefront instantly.</p>
    </>
  );
}
