export const runtime = 'nodejs';
// Creates a Stripe Checkout Session (card payment) using Stripe's REST API.
// No SDK dependency, so the app always builds. Activates when STRIPE_SECRET_KEY
// is set (see README "Card payments"). Money is paid out to the bank account
// configured in your Stripe dashboard.
type Item = { name: string; variant: string; price: number; qty: number };
export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json({ configured: false, message: 'Stripe not configured yet. Add STRIPE_SECRET_KEY to enable card payments.' });
  }
  let body: { items: Item[]; deliveryFee?: number; successUrl?: string; cancelUrl?: string };
  try { body = await req.json(); } catch { return Response.json({ error: 'Invalid request' }, { status: 400 }); }
  const { items = [], deliveryFee = 0, successUrl = '', cancelUrl = '' } = body;
  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('success_url', successUrl);
  params.append('cancel_url', cancelUrl);
  let i = 0;
  for (const it of items) {
    params.append(`line_items[${i}][price_data][currency]`, 'eur');
    params.append(`line_items[${i}][price_data][product_data][name]`, `${it.name} (${it.variant})`);
    params.append(`line_items[${i}][price_data][unit_amount]`, String(Math.round(it.price * 100)));
    params.append(`line_items[${i}][quantity]`, String(it.qty));
    i++;
  }
  if (deliveryFee > 0) {
    params.append(`line_items[${i}][price_data][currency]`, 'eur');
    params.append(`line_items[${i}][price_data][product_data][name]`, 'Delivery');
    params.append(`line_items[${i}][price_data][unit_amount]`, String(Math.round(deliveryFee * 100)));
    params.append(`line_items[${i}][quantity]`, '1');
  }
  const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const session = await r.json();
  if (!r.ok) return Response.json({ error: session?.error?.message || 'Stripe error' }, { status: 500 });
  return Response.json({ url: session.url });
}
