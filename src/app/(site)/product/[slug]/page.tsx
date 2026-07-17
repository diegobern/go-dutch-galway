import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelated, getProducts } from '@/lib/data/repository';
import { euro } from '@/lib/format';
import { site } from '@/lib/site';
import ProductGallery from '@/components/ProductGallery';
import ProductPurchase from '@/components/ProductPurchase';
import ProductCard from '@/components/ProductCard';

export async function generateStaticParams() { return (await getProducts()).map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = await getProductBySlug(slug);
  return { title: p ? p.name : 'Product', description: p?.description };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();
  const related = await getRelated(slug);
  return (
    <div className="wrap">
      <div className="crumbs"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {p.name}</div>
      <div className="pdp">
        <ProductGallery images={p.images} name={p.name} />
        <div>
          <h1>{p.name}</h1>
          <div><span style={{ color: 'var(--gold)' }}>★★★★★</span> <span style={{ color: 'var(--muted)', fontSize: 13 }}>4.9 · demo rating</span></div>
          <div className="price">{p.variants.length > 1 ? 'from ' : ''}{euro(p.priceFrom)}</div>
          <p style={{ color: 'var(--muted)', margin: 0 }}>{p.description}</p>
          <ProductPurchase p={p} />
          <div className="note">For seasonal and supply reasons we may occasionally substitute some blooms shown. We always keep true to the colour, style and shape — and guarantee the full value paid.</div>
          <div className="accordion" style={{ marginTop: 22 }}>
            <details open><summary>Description <span>＋</span></summary><p>{p.description}</p></details>
            <details><summary>Delivery &amp; pickup <span>＋</span></summary><p>Flat-rate delivery €{site.deliveryFee.toFixed(2)}, additional to the price shown. Same-day &amp; future-day across Galway City; nationwide available. Free in-store pickup at {site.address}.</p></details>
            <details><summary>Flower care <span>＋</span></summary><p>Trim stems on arrival, keep in fresh water away from direct heat and sunlight, and change the water every couple of days.</p></details>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section style={{ padding: '40px 0 70px' }}>
          <h2 style={{ textAlign: 'center', color: 'var(--brand-900)', marginBottom: 28 }}>You may also like</h2>
          <div className="grid-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
    </div>
  );
}
