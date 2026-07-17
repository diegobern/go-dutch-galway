'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { isDemoMode, demoAdmin } from '@/lib/demo';
const nav = [
  { href: '/admin', label: 'Dashboard', icon: '▤' },
  { href: '/admin/orders', label: 'Orders', icon: '🧾' },
  { href: '/admin/products', label: 'Products', icon: '🌸' },
  { href: '/admin/categories', label: 'Categories', icon: '🏷' },
  { href: '/admin/delivery', label: 'Deliveries', icon: '🚚' },
  { href: '/admin/content', label: 'Content', icon: '✎' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙' },
];
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  if (!isDemoMode()) {
    return (
      <div className="auth-required"><div className="auth-card">
        <div className="admin-logo" style={{ color: 'var(--brand-900)', padding: 0 }}>Go <span>Dutch</span> Admin</div>
        <p style={{ color: 'var(--muted)', margin: '14px 0' }}>Real authentication is enabled. Sign in with Firebase Authentication and an admin role to continue.</p>
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>To open the admin without a password for demos, set <b>NEXT_PUBLIC_DEMO_MODE=true</b> (see README). Firebase auth wiring is provided in <b>/firebase-integration</b>.</p>
        <Link className="btn btn-primary" href="/" style={{ marginTop: 12 }}>Back to store</Link>
      </div></div>
    );
  }
  return (
    <div className="admin">
      <aside className={'admin-side' + (open ? ' on' : '')}>
        <div className="admin-logo">Go <span>Dutch</span></div>
        <div className="tag">Admin · Salthill HQ</div>
        <nav className="admin-nav">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={path === n.href ? 'on' : ''}>
              <span aria-hidden>{n.icon}</span> {n.label}
            </Link>
          ))}
        </nav>
        <div className="foot">Signed in as<br /><b style={{ color: '#e6ede3' }}>{demoAdmin.name}</b><br /><Link href="/">← Back to store</Link></div>
      </aside>
      <div className="admin-main">
        <div className="admin-top">
          <button className="admin-hamb" onClick={() => setOpen((o) => !o)} aria-label="Menu">☰</button>
          <input placeholder="Search orders, products…" aria-label="Search" />
          <div className="sp" />
          <span className="chip-demo">DEMO · no password</span>
          <div className="avatar">D</div>
        </div>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
