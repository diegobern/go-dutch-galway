'use client';
import Link from 'next/link';
import { useState } from 'react';
import { categories } from '@/lib/data/categories';
export default function NewProduct() {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <div className="adm-h"><div><Link href="/admin/products" style={{ fontSize: 13, color: 'var(--muted)' }}>← Products</Link><h1>New product</h1></div></div>
      <form className="adm-box" style={{ maxWidth: 640 }} onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
        <div className="stack">
          <div><label className="lbl" style={{ marginTop: 0 }}>Name</label><input required className="field" placeholder="e.g. Summer Sunshine Bouquet" /></div>
          <div className="row2">
            <div><label className="lbl" style={{ marginTop: 0 }}>Type</label><input className="field" placeholder="Bouquet / Hatbox / Plant" /></div>
            <div><label className="lbl" style={{ marginTop: 0 }}>Price (from) €</label><input type="number" step="0.01" min="0" required className="field" placeholder="39.95" /></div>
          </div>
          <div><label className="lbl" style={{ marginTop: 0 }}>Image URL</label><input className="field" placeholder="https://…" /></div>
          <div><label className="lbl" style={{ marginTop: 0 }}>Category</label><select className="field">{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
          <div><label className="lbl" style={{ marginTop: 0 }}>Description</label><textarea className="field" style={{ minHeight: 100 }} /></div>
          <label style={{ display: 'flex', gap: 8, color: 'var(--muted)', fontSize: 14 }}><input type="checkbox" /> Featured on homepage</label>
          <div style={{ display: 'flex', gap: 10 }}><button className="adm-btn" type="submit">Save product</button><Link className="adm-btn o" href="/admin/products">Cancel</Link></div>
          {saved && <div className="note">Saved (demo). With Firebase connected this creates the product and uploads the image to Storage.</div>}
        </div>
      </form>
    </>
  );
}
