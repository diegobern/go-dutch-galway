'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart/cart-context';
import { site, occasionNav, collectionNav } from '@/lib/site';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { count, ready } = useCart();
  const [drawer, setDrawer] = useState(false);
  const [acc, setAcc] = useState<string | null>('shop');
  const [q, setQ] = useState('');
  const router = useRouter();
  const go = (e: React.FormEvent) => { e.preventDefault(); setDrawer(false); router.push('/shop' + (q ? '?q=' + encodeURIComponent(q) : '')); };

  return (
    <>
      <div className="announce">
        🌷 Same-day delivery in Galway &nbsp;·&nbsp; Nationwide from <b>€{site.deliveryFee.toFixed(2)}</b> &nbsp;·&nbsp; <a href={site.phoneHref}><b>{site.phone}</b></a>
      </div>
      <header className="header">
        <div className="wrap header-bar">
          <button className="iconbtn hamburger" aria-label="Open menu" onClick={() => setDrawer(true)}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
          <Link href="/" className="brand">Go <span>Dutch</span><small>{site.tagline} · Galway</small></Link>
          <nav className="nav" aria-label="Primary">
            <Link href="/">Home</Link>
            <div className="navitem">
              <Link href="/shop" data-mega>Shop ▾</Link>
              <div className="mega"><div className="wrap mega-grid">
                <div><h4>By Occasion</h4>{occasionNav.map((o) => <Link key={o.slug} href={`/category/${o.slug}`}>{o.name}</Link>)}</div>
                <div><h4>By Collection</h4>{collectionNav.map((c) => <Link key={c.slug} href={`/category/${c.slug}`}>{c.name}</Link>)}</div>
                <div><h4>Occasions</h4><Link href="/category/sympathy">Sympathy</Link><Link href="/category/romance">Romance</Link><Link href="/category/get-well">Get Well</Link></div>
                <div><h4>Services</h4><Link href="/weddings-events">Weddings & Events</Link><Link href="/delivery">Delivery</Link><Link href="/track-order">Track order</Link></div>
                <div><h4>Shop all</h4><Link href="/shop">Complete range</Link><Link href="/about">About us</Link><Link href="/contact">Contact</Link></div>
              </div></div>
            </div>
            <Link href="/weddings-events">Weddings</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="icons">
            <ThemeToggle />
            <Link className="iconbtn" href="/shop" aria-label="Search">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="9" r="7" /><path d="m20 20-5-5" /></svg>
            </Link>
            <Link className="iconbtn" href="/cart" aria-label="Cart">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6h15l-2 10H8L6 6zM6 6 5 3H2" /><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /></svg>
              {ready && count > 0 && <span className="cart-count">{count}</span>}
            </Link>
          </div>
        </div>
      </header>

      <div className={'overlay' + (drawer ? ' on' : '')} onClick={() => setDrawer(false)} />
      <nav className={'drawer' + (drawer ? ' on' : '')} aria-label="Mobile">
        <div className="d-top">
          <span className="brand" style={{ fontSize: 22 }}>Go <span>Dutch</span></span>
          <button className="iconbtn" aria-label="Close" onClick={() => setDrawer(false)}>✕</button>
        </div>
        <form onSubmit={go} style={{ padding: '14px 20px', borderBottom: '1px solid var(--line)' }}>
          <input className="field" placeholder="Search flowers…" value={q} onChange={(e) => setQ(e.target.value)} />
        </form>
        <Link href="/" onClick={() => setDrawer(false)}>Home</Link>
        <button className="acc-btn" onClick={() => setAcc(acc === 'shop' ? null : 'shop')}>Shop <span>{acc === 'shop' ? '–' : '+'}</span></button>
        <div className={'acc-panel' + (acc === 'shop' ? ' on' : '')}>
          <Link href="/shop" onClick={() => setDrawer(false)}>Complete range</Link>
          {occasionNav.map((o) => <Link key={o.slug} href={`/category/${o.slug}`} onClick={() => setDrawer(false)}>{o.name}</Link>)}
          {collectionNav.map((c) => <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setDrawer(false)}>{c.name}</Link>)}
        </div>
        <Link href="/weddings-events" onClick={() => setDrawer(false)}>Weddings & Events</Link>
        <Link href="/about" onClick={() => setDrawer(false)}>About Us</Link>
        <Link href="/delivery" onClick={() => setDrawer(false)}>Delivery</Link>
        <Link href="/track-order" onClick={() => setDrawer(false)}>Track Order</Link>
        <Link href="/contact" onClick={() => setDrawer(false)}>Contact</Link>
        <a href={site.phoneHref}>📞 {site.phone}</a>
      </nav>
    </>
  );
}
