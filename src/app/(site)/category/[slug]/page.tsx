import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/data/repository';
import ProductCard from '@/components/ProductCard';

export async function generateStaticParams() { return (await getCategories()).map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const c = await getCategoryBySlug(slug);
  return { title: c ? c.name : 'Category' };
}
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();
  const list = await getProductsByCategory(slug);
  return (
    <div className="wrap">
      <div className="crumbs"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {cat.name}</div>
      <div className="sec-head" style={{ textAlign: 'left', marginBottom: 30 }}>
        <span className="eyebrow">{cat.group}</span>
        <h2 style={{ margin: '10px 0 6px' }}>{cat.name}</h2>
        <p>Hand-made fresh to order and delivered across Galway &amp; nationwide.</p>
      </div>
      {list.length ? <div className="grid-4" style={{ paddingBottom: 60 }}>{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        : <div className="empty" style={{ paddingBottom: 60 }}>No products here yet. <Link href="/shop" style={{ color: 'var(--gold-ink)' }}>Browse all →</Link></div>}
    </div>
  );
}
