import Link from 'next/link';
import { site, occasionNav, collectionNav } from '@/lib/site';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap cols">
        <div>
          <div className="brand" style={{ fontSize: 26 }}>Go <span>Dutch</span></div>
          <p>{site.tagline}. Award-winning, hand-tied flowers made fresh in Salthill, Galway by {site.founder} and his team.</p>
          <div className="social">
            <a href={site.facebook} aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" /></svg></a>
            <a href={site.instagram} aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a>
          </div>
        </div>
        <div><h4>Shop</h4><ul>{collectionNav.map((c) => <li key={c.slug}><Link href={`/category/${c.slug}`}>{c.name}</Link></li>)}<li><Link href="/shop">Complete range</Link></li></ul></div>
        <div><h4>Occasions</h4><ul>{occasionNav.slice(0, 5).map((o) => <li key={o.slug}><Link href={`/category/${o.slug}`}>{o.name}</Link></li>)}<li><Link href="/weddings-events">Weddings & Events</Link></li></ul></div>
        <div><h4>Visit &amp; Help</h4><ul>
          <li>{site.address}</li>
          <li><a href={site.phoneHref}>{site.phone}</a></li>
          <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><Link href="/delivery">Delivery</Link> · <Link href="/track-order">Track order</Link></li>
          <li><Link href="/contact">Contact</Link> · <Link href="/about">About</Link></li>
        </ul></div>
      </div>
      <div className="wrap bottom">
        <span>© {new Date().getFullYear()} {site.legalName}</span>
        <span><Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/cookies">Cookies</Link> · <Link href="/delivery">Delivery</Link></span>
      </div>
    </footer>
  );
}
