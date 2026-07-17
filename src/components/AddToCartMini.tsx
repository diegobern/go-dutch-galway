'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart/cart-context';
import { Product } from '@/lib/data/types';
export default function AddToCartMini({ p }: { p: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  if (!p.available) return <span className="pill st-cancel" style={{ alignSelf: 'center' }}>Out of stock</span>;
  const v = p.variants[0];
  return (
    <button className="btn btn-ghost" onClick={() => { add({ productId: p.id, slug: p.slug, name: p.name, variant: v.name, price: v.price, qty: 1, image: p.image }); setAdded(true); setTimeout(() => setAdded(false), 1600); }}>
      {added ? 'Added ✓' : 'Add to cart'}
    </button>
  );
}
