// Firebase implementation of the same repository signatures used by the app
// (src/lib/data/repository.ts). Swap the imports in the pages/data layer to
// point here once Firestore is populated. No UI changes are required.
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { Product, Category } from '../src/lib/data/types';

export async function getProducts(): Promise<Product[]> {
  const snap = await getDocs(query(collection(db, 'products'), where('available', '==', true)));
  return snap.docs.map((d) => d.data() as Product);
}
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const snap = await getDocs(query(collection(db, 'products'), where('slug', '==', slug)));
  return snap.empty ? null : (snap.docs[0].data() as Product);
}
export async function getCategories(): Promise<Category[]> {
  const snap = await getDocs(collection(db, 'categories'));
  return snap.docs.map((d) => d.data() as Category);
}
// getOrders / createOrder / updateOrderStatus follow the same pattern against
// the "orders" collection. Order writes and price validation should run through
// a Cloud Function so totals cannot be tampered with from the browser.
