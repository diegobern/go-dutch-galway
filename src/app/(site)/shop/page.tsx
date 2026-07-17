import Link from 'next/link';
import { getProducts, getCategories, searchProducts } from '@/lib/data/repository';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/data/types';

export const metadata = { title: 'Shop all flowers' };
type SP = { [k: string]: string | string[] | undefined };
const val = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || '';
function qs(sp: SP, patch: Record<string, string>) {
  const p = new URLSearchParams();
  Object.entries(sp).forEach(([k, v]) => { const s = val(v); if (s) p.set(k, s); });
  Object.entries(patch).forEach(([k, v]) => { if (v) p.set(k, v); else p.delete(k); });
  const s = p.toString();
  return '/shop' + (s ? '?' + s : '');
}
const bands: Record<string, [number, number]> = { 'under-40': [0, 40], '40-70': [40, 70], '70-100': [70, 100], '100-plus': [100, 99999] };

export default async function Shop({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = val(sp.q), cat = val(sp.cat), price = val(sp.price), sort = val(sp.sort);
  const [categories] = await Promise.all([getCategories()]);
  let list: Product[] = q ? await searchProducts(q) : await getProducts();
  if (cat) list = list.filter((p) => p.categories.includes(cat));
  if (price && bands[price]) { const [lo, hi] = bands[price]; list = list.filter((p) => p.priceFrom >= lo && p.priceFrom < hi); }
  if (sort === 'price-asc') list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
  else if (sort === 'price-desc') list = [...list].sort((a, b) => b.priceFrom - a.priceFrom);
  else if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="wrap">
      <div className="crumbs"><Link href="/">Home</Link> / Shop{q ? ` / “${q}”` : ''}</div>
      <div className="shop">
        <aside className="filters">
          <h4>Occasion</h4>
          {categories.filter((c) => c.group === 'Occasion').map((c) => (
            <Link key={c.slug} href={qs(sp, { cat: cat === c.slug ? '' : c.slug })} className={cat === c.slug ? 'on' : ''}>{c.name}</Link>
          ))}
          <h4>Collection</h4>
          {categories.filter((c) => c.group === 'Collection').map((c) => (
            <Link key={c.slug} href={qs(sp, { cat: cat === c.slug ? '' : c.slug })} className={cat === c.slug ? 'on' : ''}>{c.name}</Link>
          ))}
          <h4>Price</h4>
          <Link href={qs(sp, { price: price === 'under-40' ? '' : 'under-40' })} className={price === 'under-40' ? 'on' : ''}>Under €40</Link>
          <Link href={qs(sp, { price: price === '40-70' ? '' : '40-70' })} className={price === '40-70' ? 'on' : ''}>€40 – €70</Link>
          <Link href={qs(sp, { price: price === '70-100' ? '' : '70-100' })} className={price === '70-100' ? 'on' : ''}>€70 – €100</Link>
          <Link href={qs(sp, { price: price === '100-plus' ? '' : '100-plus' })} className={price === '100-plus' ? 'on' : ''}>€100+</Link>
          <h4>Reset</h4>
          <Link href="/shop">Clear all filters</Link>
        </aside>
        <div>
          <div className="toolbar">
            <span style={{ color: 'var(--muted)' }}>{list.length} product{list.length !== 1 ? 's' : ''}</span>
            <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
              <Link href={qs(sp, { sort: '' })} className={!sort ? 'on' : ''} style={{ color: !sort ? 'var(--brand-800)' : 'var(--muted)' }}>Featured</Link>
              <Link href={qs(sp, { sort: 'price-asc' })} style={{ color: sort === 'price-asc' ? 'var(--brand-800)' : 'var(--muted)' }}>Price ↑</Link>
              <Link href={qs(sp, { sort: 'price-desc' })} style={{ color: sort === 'price-desc' ? 'var(--brand-800)' : 'var(--muted)' }}>Price ↓</Link>
              <Link href={qs(sp, { sort: 'name' })} style={{ color: sort === 'name' ? 'var(--brand-800)' : 'var(--muted)' }}>A–Z</Link>
            </div>
          </div>
          {list.length ? <div className="grid-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
            : <div className="empty">No products match your filters. <Link href="/shop" style={{ color: 'var(--gold-ink)' }}>Clear filters →</Link></div>}
        </div>
      </div>
    </div>
  );
}
