import { Category } from './types';
import { products } from './products';
const img = (slug: string) => products.find((p) => p.slug === slug)?.image ?? '';
export const categories: Category[] = [
  { slug: 'birthday', name: 'Birthday Flowers', group: 'Occasion', image: img('eco-friendly-surprise') },
  { slug: 'anniversary', name: 'Anniversary Flowers', group: 'Occasion', image: img('custom-florist-choice') },
  { slug: 'new-baby', name: 'New Baby Flowers & Gifts', group: 'Occasion', image: img('pink-marguerite') },
  { slug: 'get-well', name: 'Get Well Flowers', group: 'Occasion', image: img('elegant-beauty') },
  { slug: 'sympathy', name: 'Sympathy Flowers', group: 'Occasion', image: img('cotton-buds-hatbox') },
  { slug: 'romance', name: 'Romance Flowers', group: 'Occasion', image: img('cotton-buds-hatbox') },
  { slug: 'summer', name: 'Summer Flowers', group: 'Occasion', image: img('ray-of-sunshine-hatbox') },
  { slug: 'bouquets', name: 'Bouquets', group: 'Collection', image: img('eco-friendly-surprise') },
  { slug: 'hatboxes', name: 'Hatboxes', group: 'Collection', image: img('ray-of-sunshine-hatbox') },
  { slug: 'plants', name: 'Plants & Planters', group: 'Collection', image: img('aloe-with-flower') },
];
