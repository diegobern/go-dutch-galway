import { products } from './products';
import { categories } from './categories';
import { Product, Category } from './types';
// Demo repository. To move to Firebase, swap these implementations for the
// ones in /firebase-integration (same async signatures) — no page changes.
export async function getProducts(): Promise<Product[]> { return products.filter((p) => p.available); }
export async function getAllProducts(): Promise<Product[]> { return products; }
export async function getFeatured(): Promise<Product[]> { return products.filter((p) => p.featured && p.available); }
export async function getProductBySlug(slug: string): Promise<Product | null> { return products.find((p) => p.slug === slug) ?? null; }
export async function getRelated(slug: string): Promise<Product[]> {
  const p = products.find((x) => x.slug === slug);
  if (!p) return products.filter((x) => x.available).slice(0, 4);
  return products.filter((x) => x.available && x.slug !== slug && x.categories.some((c) => p.categories.includes(c))).slice(0, 4);
}
export async function getCategories(): Promise<Category[]> { return categories; }
export async function getCategoryBySlug(slug: string): Promise<Category | null> { return categories.find((c) => c.slug === slug) ?? null; }
export async function getProductsByCategory(slug: string): Promise<Product[]> { return products.filter((p) => p.available && p.categories.includes(slug)); }
export async function searchProducts(q: string): Promise<Product[]> {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return products.filter((p) => p.available && (p.name.toLowerCase().includes(s) || p.type.toLowerCase().includes(s)));
}
