'use client';
import Image from 'next/image';
import { useState } from 'react';
import { categories as seed } from '@/lib/data/categories';
import { products } from '@/lib/data/products';
export default function AdminCategories() {
  const [list, setList] = useState(seed.map((c) => ({ ...c })));
  const [name, setName] = useState('');
  const count = (slug: string) => products.filter((p) => p.categories.includes(slug)).length;
  function add(e: React.FormEvent) { e.preventDefault(); if (!name.trim()) return; setList((l) => [...l, { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, group: 'Occasion', image: products[0].image }]); setName(''); }
  return (
    <>
      <div className="adm-h"><div><h1>Categories</h1><p>Group products for the menus and shop filters.</p></div></div>
      <div className="adm-2">
        <div className="tablewrap"><table className="adm">
          <thead><tr><th>Category</th><th>Group</th><th>Slug</th><th>Products</th></tr></thead>
          <tbody>{list.map((c) => (
            <tr key={c.slug}><td><div className="prodcell"><div className="im"><Image src={c.image} alt="" fill sizes="44px" style={{ objectFit: 'cover' }} /></div><b>{c.name}</b></div></td>
              <td style={{ color: 'var(--muted)' }}>{c.group}</td><td style={{ color: 'var(--muted)' }}>/{c.slug}</td><td>{count(c.slug)}</td></tr>
          ))}</tbody>
        </table></div>
        <form className="adm-box" onSubmit={add}><h3>Add category</h3>
          <input className="field" placeholder="Category name" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="adm-btn" style={{ marginTop: 12 }} type="submit">Add category</button>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>Demo: added to this session. With Firebase, it persists and appears in the menus.</p>
        </form>
      </div>
    </>
  );
}
