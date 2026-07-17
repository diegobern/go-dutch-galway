'use client';
import { useState } from 'react';
import { site } from '@/lib/site';
export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="wrap" style={{ padding: '40px 24px 80px' }}>
      <div className="sec-head" style={{ textAlign: 'left', margin: '0 0 30px' }}>
        <span className="eyebrow">We’re here to help</span>
        <h2 style={{ margin: '10px 0' }}>Contact Go Dutch</h2>
      </div>
      <div className="split">
        <form className="panel" style={{ padding: 22 }} onSubmit={(e) => { e.preventDefault(); setSent(true); (e.target as HTMLFormElement).reset(); }}>
          <div className="stack">
            <div className="row2"><input required className="field" placeholder="Your name" /><input required type="email" className="field" placeholder="Email" /></div>
            <input className="field" placeholder="Subject" />
            <textarea required className="field" style={{ minHeight: 130 }} placeholder="How can we help?" />
            <label style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)' }}><input type="checkbox" required /> I accept the Privacy Policy.</label>
            <button className="btn btn-primary" type="submit">Send message</button>
            {sent && <div className="note">Thanks — we’ll be in touch shortly. 🌸</div>}
          </div>
        </form>
        <div className="panel" style={{ padding: 22 }}>
          <h2 style={{ padding: 0, border: 'none', marginBottom: 10 }}>Visit &amp; call</h2>
          <p style={{ color: 'var(--muted)' }}>📍 {site.address}</p>
          <p style={{ color: 'var(--muted)' }}>📞 <a href={site.phoneHref} style={{ color: 'var(--gold-ink)' }}>{site.phone}</a></p>
          <p style={{ color: 'var(--muted)' }}>💬 <a href={site.whatsappHref} style={{ color: 'var(--gold-ink)' }}>WhatsApp {site.whatsapp}</a></p>
          <p style={{ color: 'var(--muted)' }}>✉️ <a href={`mailto:${site.email}`} style={{ color: 'var(--gold-ink)' }}>{site.email}</a></p>
          <p style={{ color: 'var(--muted)' }}>🕒 Opening hours — <em>[add real hours]</em></p>
          <h2 style={{ padding: 0, border: 'none', margin: '18px 0 8px' }}>FAQs</h2>
          <div className="accordion">
            <details><summary>Do you deliver same day? <span>＋</span></summary><p>Yes — order before 1pm for same-day delivery across Galway City.</p></details>
            <details><summary>Can I add a card message? <span>＋</span></summary><p>Absolutely, add it on the product page or at checkout.</p></details>
            <details><summary>Can I collect in store? <span>＋</span></summary><p>Yes, choose “Pick up in store” at checkout — it’s free.</p></details>
          </div>
        </div>
      </div>
    </div>
  );
}
