'use client';
import { Order, OrderStatus, OrderItem } from './types';
const KEY = 'godutch_orders_v1';
const seed: Order[] = [
  { id: 'GD-284517', createdAt: '2026-07-17', deliveryDate: '2026-07-17', status: 'new', customerName: 'Aoife Byrne', customerEmail: 'aoife@example.com', customerPhone: '087 000 0000', recipientName: 'Mary Walsh', address: '4 Seapoint', town: 'Salthill, Galway', postcode: 'H91 XX00', method: 'delivery', cardMessage: 'Happy birthday! xx', items: [{ productId: 'p-eco', name: 'Eco-Friendly Surprise', variant: 'Medium', price: 54.95, qty: 1, image: '' }], subtotal: 54.95, delivery: 9.95, total: 64.9, paymentStatus: 'Paid' },
  { id: 'GD-284516', createdAt: '2026-07-17', deliveryDate: '2026-07-17', status: 'prep', customerName: "John O'Brien", customerEmail: 'john@example.com', customerPhone: '086 111 1111', recipientName: 'Self', address: '12 Ocean Wave', town: 'Knocknacarra, Galway', postcode: 'H91 YY11', method: 'delivery', items: [{ productId: 'p-elegant', name: 'Elegant Beauty', variant: 'Large', price: 119.95, qty: 1, image: '' }], subtotal: 119.95, delivery: 9.95, total: 129.9, paymentStatus: 'Paid' },
  { id: 'GD-284511', createdAt: '2026-07-16', deliveryDate: '2026-07-18', status: 'ready', customerName: 'Sinead Kelly', customerEmail: 'sinead@example.com', customerPhone: '085 222 2222', recipientName: 'Emma Kelly', address: '7 Maree Rd', town: 'Oranmore', postcode: 'H91 ZZ22', method: 'delivery', items: [{ productId: 'p-ray', name: 'Ray of Sunshine Hatbox', variant: 'As shown', price: 59.95, qty: 1, image: '' }], subtotal: 59.95, delivery: 9.95, total: 69.9, paymentStatus: 'Paid' },
  { id: 'GD-284490', createdAt: '2026-07-15', deliveryDate: '2026-07-15', status: 'done', customerName: 'Maire Fahy', customerEmail: 'maire@example.com', customerPhone: '083 333 3333', recipientName: 'Self', address: '2 Grattan Rd', town: 'Salthill, Galway', postcode: 'H91 AA33', method: 'pickup', items: [{ productId: 'p-peony', name: 'Peony Plant', variant: 'As shown', price: 34.95, qty: 2, image: '' }], subtotal: 69.9, delivery: 0, total: 69.9, paymentStatus: 'Paid' },
];
function read(): Order[] {
  if (typeof window === 'undefined') return seed;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) { window.localStorage.setItem(KEY, JSON.stringify(seed)); return seed; }
    return JSON.parse(raw) as Order[];
  } catch { return seed; }
}
function write(list: Order[]) { if (typeof window !== 'undefined') window.localStorage.setItem(KEY, JSON.stringify(list)); }
export function getOrders(): Order[] { return read().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); }
export function getOrder(id: string): Order | null { return read().find((o) => o.id.toLowerCase() === id.toLowerCase()) ?? null; }
export function findOrder(id: string, email: string): Order | null {
  const o = getOrder(id);
  if (!o) return null;
  return o.customerEmail.toLowerCase() === email.trim().toLowerCase() ? o : null;
}
export function updateOrderStatus(id: string, status: OrderStatus) {
  const list = read().map((o) => (o.id === id ? { ...o, status } : o));
  write(list);
}
export function createOrder(data: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
  const id = 'GD-' + Math.floor(100000 + Math.random() * 899999);
  const order: Order = { ...data, id, createdAt: new Date().toISOString().slice(0, 10), status: 'new' };
  write([order, ...read()]);
  return order;
}
