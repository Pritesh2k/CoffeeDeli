'use client';
import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: { destroy: () => void } | null = null;
    const init = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        lenis = new Lenis({ duration: 1.35, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
        const raf = (time: number) => { (lenis as { raf: (t: number) => void }).raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      } catch {}
    };
    init();
    return () => { if (lenis) lenis.destroy(); };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
