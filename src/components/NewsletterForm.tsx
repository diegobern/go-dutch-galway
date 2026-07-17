'use client';
import { useState } from 'react';
export default function NewsletterForm() {
  const [done, setDone] = useState(false);
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); (e.target as HTMLFormElement).reset(); }} style={{ maxWidth: 460, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <input className="field" type="email" required placeholder="Your email address" aria-label="Email" style={{ flex: 1, minWidth: 220 }} />
        <button className="btn btn-primary" type="submit">Subscribe</button>
      </div>
      <label style={{ display: 'flex', gap: 8, fontSize: 12.5, color: 'var(--muted)', marginTop: 12, alignItems: 'flex-start' }}>
        <input type="checkbox" required /> I agree to receive marketing emails and accept the Privacy Policy.
      </label>
      {done && <p style={{ color: 'var(--gold-ink)', marginTop: 10 }}>Thanks — please confirm via the email we just sent. 🌸</p>}
    </form>
  );
}
