import Image from 'next/image';
import Link from 'next/link';
import { getFeatured, getCategories, getProductBySlug } from '@/lib/data/repository';
import { site } from '@/lib/site';
import ProductCard from '@/components/ProductCard';
import NewsletterForm from '@/components/NewsletterForm';

export default async function Home() {
  const [featured, categories, hero] = await Promise.all([getFeatured(), getCategories(), getProductBySlug('cotton-buds-hatbox')]);
  const occasions = categories.filter((c) => c.group === 'Occasion').slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="hero-img">{hero && <Image src={hero.image} alt="Luxury flowers by Go Dutch" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />}</div>
        <div className="hero-veil" />
        <div className="wrap"><div className="hero-inner">
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Award-winning master florist · Salthill, Galway</span>
          <h1>Flowers that <em>say it</em> beautifully.</h1>
          <p>Hand-tied by {site.founder} and his team from stems picked around the world. Order before 1pm for same-day delivery across Galway.</p>
          <div className="hero-cta">
            <Link className="btn btn-primary" href="/shop">Shop bouquets</Link>
            <Link className="btn btn-light" href="/category/bouquets">Explore collections</Link>
          </div>
        </div></div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">Find the perfect gift</span><h2>Shop by occasion</h2><p>Every arrangement is made fresh to order for the moment you’re marking.</p></div>
          <div className="grid-4">
            {occasions.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="tile">
                <Image src={c.image} alt={c.name} fill sizes="(max-width:560px) 50vw, 280px" />
                <div className="tile-l"><span>Shop</span><h3>{c.name.replace(' Flowers', '')}</h3></div>
              </Link>
            ))}
          </div>
          <div className="center" style={{ marginTop: 36 }}><Link className="btn btn-ghost" href="/shop">View all occasions</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">Handmade daily in Salthill</span><h2>Our signature bouquets</h2><p>A selection from our range — real products &amp; prices from the Go Dutch catalogue.</p></div>
          <div className="grid-4">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          <div className="center" style={{ marginTop: 40 }}><Link className="btn btn-primary" href="/shop">Shop the full range</Link></div>
        </div>
      </section>

      <section className="values section">
        <div className="wrap">
          <div className="grid-4">
            <div className="val"><div className="ic">✿</div><h3>Hand-crafted</h3><p>Made fresh to order by trained master florists.</p></div>
            <div className="val"><div className="ic">🌍</div><h3>Picked worldwide</h3><p>The freshest stems, hand-selected daily.</p></div>
            <div className="val"><div className="ic">🚚</div><h3>Same-day delivery</h3><p>Order before 1pm across Galway City.</p></div>
            <div className="val"><div className="ic">✓</div><h3>Guaranteed</h3><p>We stand over every arrangement we send.</p></div>
          </div>
        </div>
      </section>

      <section className="band"><div className="wrap">
        <div><div className="big">€{site.deliveryFee.toFixed(2)}</div><h3>Flat-rate delivery</h3><p>One simple charge, added at checkout.</p></div>
        <div><div className="big">Same day</div><h3>Order before 1pm</h3><p>Same-day &amp; future-day across Galway City.</p></div>
        <div><div className="big">Nationwide</div><h3>All of Ireland</h3><p>Plus in-store pickup at 196 Upper Salthill.</p></div>
      </div></section>

      <section className="section" style={{ background: 'var(--brand-900)', color: '#eef2e9' }}>
        <div className="wrap" style={{ maxWidth: 720, textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Weddings &amp; Events</span>
          <h2 style={{ color: '#fff', fontSize: 'clamp(30px,4vw,50px)', margin: '14px 0 16px' }}>Floral design for your most important days.</h2>
          <p style={{ color: '#dfe7dc', fontSize: 17, marginBottom: 26 }}>From bridal bouquets to full venue installations, our events team designs bespoke florals across Connaught and beyond.</p>
          <Link className="btn btn-light" href="/weddings-events">Discover weddings &amp; events</Link>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: 620 }}>
          <span className="eyebrow">Stay in bloom</span>
          <h2 style={{ color: 'var(--brand-900)', margin: '12px 0' }}>Fresh ideas &amp; seasonal offers</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Join our list for floral inspiration and subscriber-only offers.</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
