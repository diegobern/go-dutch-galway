'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface CartItem {
  productId: string; slug: string; name: string; variant: string;
  price: number; qty: number; image: string; cardMessage?: string;
}
export const keyOf = (i: { productId: string; variant: string }) => i.productId + '::' + i.variant;

interface CartCtx {
  items: CartItem[]; add: (i: CartItem) => void; remove: (key: string) => void;
  setQty: (key: string, q: number) => void; clear: () => void;
  count: number; subtotal: number; ready: boolean;
}
const Ctx = createContext<CartCtx | null>(null);
const KEY = 'godutch_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const r = localStorage.getItem(KEY); if (r) setItems(JSON.parse(r)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} } }, [items, ready]);

  const add = useCallback((it: CartItem) => {
    setItems((prev) => {
      const k = keyOf(it);
      if (prev.some((p) => keyOf(p) === k)) return prev.map((p) => (keyOf(p) === k ? { ...p, qty: p.qty + it.qty } : p));
      return [...prev, it];
    });
  }, []);
  const remove = useCallback((k: string) => setItems((prev) => prev.filter((p) => keyOf(p) !== k)), []);
  const setQty = useCallback((k: string, q: number) => setItems((prev) => prev.map((p) => (keyOf(p) === k ? { ...p, qty: Math.max(1, q) } : p))), []);
  const clear = useCallback(() => setItems([]), []);
  const count = items.reduce((a, b) => a + b.qty, 0);
  const subtotal = items.reduce((a, b) => a + b.price * b.qty, 0);
  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, ready }}>{children}</Ctx.Provider>;
}
export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart must be used within CartProvider');
  return c;
}
