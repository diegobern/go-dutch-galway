'use client';
import Image from 'next/image';
import { useState } from 'react';
import { products } from '@/lib/data/products';
export default function Weddings() {
  const [sent, setSent] = useState(false);
  const gallery = products.slice(0, 3);
  return (
    <div className="wrap" style={{ padding: '40px 24px 80px' }}>
      <div className="sec-head" style={{ textAlign: 'left', margin: '0 0 24px' }}>
        <span className="eyebrow">Weddings &amp; Events</span>
        <h2 style={{ margin: '10px 0' }}>Bespoke floral design for your most important days.</h2>
        <p>From bridal bouquets to full venue installations, our dedicated team designs across Connaught and beyond.</p>
      </div>
      <div className="grid-3" style={{ marginBottom: 40 }}>
        {gallery.map((p) => (
          <div key={p.id} style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 4, overflow: 'hidden', background: '#eadfce' }}>
            <Image src={p.image} alt="Wedding &amp; event flowers" fill sizes="(max-width:960px) 100vw, 380px" style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <div className="split">
        <div className="panel" style={{ padding: 22 }}>
          <h2 style={{ padding: 0, border: 'none', marginBottom: 10 }}>How it works</h2>
          <div className="accordion">
            <details open><summary>1 · Consultation <span>＋</span></summary><p>Tell us your date, venue and vision. We’ll talk palette, style and budget.</p></details>
            <details><summary>2 · Proposal <span>＋</span></summary><p>We design a bespoke floral plan with mood, flowers and costings.</p></details>
            <details><summary>3 · Your day <span>＋</span></summary><p>Our team installs and styles everything, so you can simply enjoy it.</p></details>
          </div>
        </div>
        <form className="panel" style={{ padding: 22 }} onSubmit={(e) => { e.preventDefault(); setSent(true); (e.target as HTMLFormElement).reset(); }}>
          <h2 style={{ padding: 0, border: 'none', marginBottom: 10 }}>Request a consultation</h2>
          <div className="stack">
            <div className="row2"><input required className="field" placeholder="Your name" /><input required type="email" className="field" placeholder="Email" /></div>
            <div className="row2"><input type="date" className="field" aria-label="Event date" /><input className="field" placeholder="Event type (wedding, corporate…)" /></div>
            <input className="field" placeholder="Venue / location" />
            <input className="field" placeholder="Approx. budget (optional)" />
            <textarea required className="field" placeholder="Tell us about your day and your ideas" />
            <label style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)' }}><input type="checkbox" required /> I accept the Privacy Policy.</label>
            <button className="btn btn-primary" type="submit">Send request</button>
            {sent && <div className="note">Thank you — our events team will be in touch soon. 🌸</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
