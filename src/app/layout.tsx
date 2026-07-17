import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import DemoBadge from '@/components/DemoBadge';

export const metadata: Metadata = {
  title: { default: 'Go Dutch — Galway’s Master Florist | Flower Delivery Galway', template: '%s · Go Dutch' },
  description: 'Go Dutch — award-winning master florist in Salthill, Galway. Hand-tied bouquets and same-day flower delivery across Galway and nationwide from €9.95.',
};
const DEFAULT_THEME = process.env.NEXT_PUBLIC_THEME === 'atelier' ? 'atelier' : 'botanical';
const themeInit = `(function(){try{var t=localStorage.getItem('godutch_theme')||'${DEFAULT_THEME}';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <Providers>{children}</Providers>
        <DemoBadge />
      </body>
    </html>
  );
}
