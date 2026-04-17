import type { Metadata } from 'next';
import './globals.css';
import { SiteProvider } from '@/lib/SiteContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';

export const metadata: Metadata = {
  title: { template: '%s | W10 Coffee + Deli', default: 'W10 Coffee + Deli — Specialty Coffee & Deli, London' },
  description: 'W10 Coffee + Deli — specialty coffee, artisan deli food, cakes, wine and private events on the Grand Union Canal, Harrow Road, London W10.',
  keywords: ['specialty coffee London', 'coffee shop W10', 'deli London', 'private events W10', 'Harrow Road cafe', 'canal views London'],
  openGraph: {
    title: 'W10 Coffee + Deli',
    description: 'Specialty coffee, artisan deli & wine. Inspired by southern France. Grand Union Canal, London W10.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'W10 Coffee + Deli',
  },
  robots: { index: true, follow: true },
  themeColor: '#8B1A2F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('w10_theme')||( window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body>
        <SiteProvider>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScroll>
        </SiteProvider>
      </body>
    </html>
  );
}
