import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import MarqueeStrip from '@/components/sections/MarqueeStrip';
import About from '@/components/sections/About';
import MenuPreview from '@/components/sections/MenuPreview';
import Reviews from '@/components/sections/Reviews';
import EventsCTA from '@/components/sections/EventsCTA';

export const metadata: Metadata = {
  title: 'W10 Coffee + Deli — Specialty Coffee & Deli, London',
  description: 'W10 Coffee + Deli — specialty coffee, artisan deli, cakes, fine wine and private events on the Grand Union Canal, Harrow Road, London W10. Inspired by southern France.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <About />
      <MenuPreview />
      <Reviews />
      <EventsCTA />
    </>
  );
}
