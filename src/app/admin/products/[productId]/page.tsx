'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { products } from '@/lib/data/products';
import ImagePicker from '@/components/ImagePicker';
export default function EditProduct() {
  const id = String(useParams().productId || '');
  const p = products.find((x) => x.id === id);
  const [saved, setSaved] = useState(false);
  if (!p) return <><div className="adm-h"><h1>Product not found</h1></div><Link className="adm-btn" href="/admin/products">← Back</Link></>;
  return (
    <>
      <div className="adm-h"><div><Link href="/admin/products" style={{ fontSize: 13, color: 'var(--muted)' }}>← Products</Link><h1>Edit · {p.name}</h1></div></div>
      <form className="adm-box" style={{ maxWidth: 640 }} onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
        <div className="stack">
          <div><label className="lbl" style={{ marginTop: 0 }}>Name</label><input required className="field" defaultValue={p.name} /></div>
          <div className="row2">
            <div><label className="lbl" style={{ marginTop: 0 }}>Type</label><input className="field" defaultValue={p.type} /></div>
            <div><label className="lbl" style={{ marginTop: 0 }}>Price (from) €</label><input type="number" step="0.01" className="field" defaultValue={p.priceFrom} /></div>
          </div>
          <ImagePicker label="Product photo" initial={p.image} />
          <div><label className="lbl" style={{ marginTop: 0 }}>Description</label><textarea className="field" style={{ minHeight: 100 }} defaultValue={p.description} /></div>
          <label style={{ display: 'flex', gap: 8, color: 'var(--muted)', fontSize: 14 }}><input type="checkbox" defaultChecked={p.featured} /> Featured on homepage</label>
          <label style={{ display: 'flex', gap: 8, color: 'var(--muted)', fontSize: 14 }}><input type="checkbox" defaultChecked={p.available} /> Available (in stock)</label>
          <div style={{ display: 'flex', gap: 10 }}><button className="adm-btn" type="submit">Save changes</button><button className="adm-btn o" type="button" onClick={() => alert('Demo: archives the product (kept for order history).')}>Archive</button></div>
          {saved && <div className="note">Saved (demo). With Firebase connected, changes persist and update the storefront.</div>}
        </div>
      </form>
    </>
  );
}
