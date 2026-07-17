import { site } from '@/lib/site';
export const metadata = { title: 'About Us' };
export default function About() {
  return (
    <div className="page">
      <span className="eyebrow">Our story</span>
      <h1>The florist with a difference.</h1>
      <p className="lead">Go Dutch was founded by award-winning Dutch Master Florist {site.founder}.</p>
      <p>Trained in the Netherlands and honed in Paris, {site.founder} travelled the world as a florist before settling in his favourite city — Galway. For over 40 years he has arranged flowers with a rare devotion and artistry.</p>
      <p>Every florist on the team is trained to Henk’s exacting standard, so each bouquet leaves our Salthill studio with the same care and love of flowers. Our blooms are hand-picked from around the world to make an impression that lasts.</p>
      <h2>What we do</h2>
      <p>We create wedding flowers, sympathy and funeral flowers, birthday, anniversary, new baby and thank-you flowers — plus plants, hatboxes and gifts. Drop into the shop at {site.address} any time; you’ll always find a friendly face.</p>
      <h2>Our guarantee</h2>
      <p>We guarantee both the quality and value of our products. A copy of this guarantee is sent with every arrangement.</p>
    </div>
  );
}
