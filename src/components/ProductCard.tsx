import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data/types';
import { euro } from '@/lib/format';
import AddToCartMini from './AddToCartMini';
export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card">
      <Link href={`/product/${p.slug}`} className="media">
        <Image src={p.image} alt={p.name} fill sizes="(max-width:560px) 50vw, 300px" style={{ objectFit: 'cover' }} />
        {p.badge && <span className="badge">{p.badge}</span>}
      </Link>
      <div className="body">
        <h3><Link href={`/product/${p.slug}`}>{p.name}</Link></h3>
        <div className="price">{p.variants.length > 1 ? 'from ' : ''}<strong>{euro(p.priceFrom)}</strong></div>
        <AddToCartMini p={p} />
      </div>
    </article>
  );
}
