export const runtime = 'nodejs';
import crypto from 'crypto';
// Stripe webhook: confirms payment and (once Firebase is wired) records the paid
// order. Verifies the signature so only Stripe can call it.
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await req.text();
  if (!secret) return Response.json({ configured: false });
  const sig = req.headers.get('stripe-signature') || '';
  try {
    const parts: Record<string, string> = {};
    sig.split(',').forEach((p) => { const [k, v] = p.split('='); if (k && v) parts[k] = v; });
    const signed = `${parts.t}.${body}`;
    const expected = crypto.createHmac('sha256', secret).update(signed).digest('hex');
    if (!parts.v1 || expected !== parts.v1) return new Response('Invalid signature', { status: 400 });
  } catch { return new Response('Invalid signature', { status: 400 }); }
  const event = JSON.parse(body);
  if (event.type === 'checkout.session.completed') {
    // TODO: mark the order paid / create it in Firestore (see /firebase-integration).
  }
  return Response.json({ received: true });
}
