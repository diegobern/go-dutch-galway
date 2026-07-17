export type Money = number;
export interface ProductVariant { id: string; name: string; price: Money }
export interface Product {
  id: string; slug: string; name: string; type: string;
  image: string; images: string[]; priceFrom: Money; variants: ProductVariant[];
  categories: string[]; description: string; badge?: string;
  available: boolean; featured?: boolean;
}
export interface Category { slug: string; name: string; group: 'Occasion' | 'Collection'; image: string }
export type OrderStatus = 'new' | 'prep' | 'ready' | 'out' | 'done' | 'cancel';
export interface OrderItem { productId: string; name: string; variant: string; price: number; qty: number; image: string }
export interface Order {
  id: string; createdAt: string; deliveryDate?: string; status: OrderStatus;
  customerName: string; customerEmail: string; customerPhone: string;
  recipientName: string; address: string; town: string; postcode: string;
  cardMessage?: string; instructions?: string; method: 'delivery' | 'pickup';
  items: OrderItem[]; subtotal: number; delivery: number; total: number; paymentStatus: string;
}
