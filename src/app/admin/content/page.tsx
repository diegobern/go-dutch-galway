'use client';
import { useState } from 'react';
export default function AdminContent() {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <div className="adm-h"><div><h1>Content</h1><p>Edit the storefront text — no code needed.</p></div><button className="adm-btn" onClick={() => setSaved(true)}>Publish</button></div>
      <form className="adm-box" style={{ maxWidth: 680 }} onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
        <label className="lbl" style={{ marginTop: 0 }}>Announcement bar</label>
        <input className="field" defaultValue="Same-day delivery in Galway · Nationwide from €9.95" />
        <label className="lbl">Hero heading</label>
        <input className="field" defaultValue="Flowers that say it beautifully." />
        <label className="lbl">Hero subtext</label>
        <textarea className="field" defaultValue="Hand-tied by Henk Van Enk and his team from stems picked around the world." />
        <label className="lbl">Opening hours</label>
        <input className="field" placeholder="e.g. Mon–Sat 9–6, Sun 12–5" />
        <label className="lbl">Promotional message</label>
        <input className="field" placeholder="Optional banner promo" />
        <div style={{ marginTop: 14 }}><button className="adm-btn" type="submit">Publish changes</button></div>
        {saved && <div className="note" style={{ marginTop: 12 }}>Published (demo). With Firebase, this updates the live storefront instantly.</div>}
      </form>
    </>
  );
}
