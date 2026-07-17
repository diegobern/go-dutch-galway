import { site } from '@/lib/site';
export const metadata = { title: 'Delivery' };
export default function Delivery() {
  return (
    <div className="page">
      <span className="eyebrow">Getting flowers to the door</span>
      <h1>Delivery &amp; pickup</h1>
      <p className="lead">Flat-rate delivery of €{site.deliveryFee.toFixed(2)}, added at checkout.</p>
      <h2>Same-day &amp; future-day</h2>
      <p>Order before 1pm for same-day delivery across Galway City. You can also choose a future delivery date at checkout.</p>
      <h2>Where we deliver</h2>
      <p>Galway City and County, and nationwide across Ireland. Prefer to collect? Free in-store pickup is available at {site.address}.</p>
      <h2>Special dates</h2>
      <p>For Valentine’s Day, Mother’s Day and Christmas we recommend ordering early as delivery slots fill quickly.</p>
      <h2>If the recipient isn’t home</h2>
      <p>Our driver will follow any instructions you leave, try a neighbour where appropriate, or contact you to arrange redelivery.</p>
    </div>
  );
}
