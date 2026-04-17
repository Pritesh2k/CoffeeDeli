'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useSite } from '@/lib/SiteContext';

gsap.registerPlugin(SplitText);

export default function Hero() {
  const { content } = useSite();
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Overlay wipe
      tl.to(overlayRef.current, { scaleY: 0, transformOrigin: 'top', duration: 1.2, ease: 'power4.inOut' }, 0);

      // Image parallax entrance
      tl.fromTo(imageRef.current, { scale: 1.2 }, { scale: 1.08, duration: 2.2, ease: 'power2.out' }, 0.2);

      // Headline split reveal
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'lines', linesClass: 'line-wrapper' });
        const lines = split.lines;
        lines.forEach((line: HTMLElement) => {
          const inner = document.createElement('div');
          inner.style.cssText = 'overflow:hidden; display:block;';
          line.parentNode?.insertBefore(inner, line);
          inner.appendChild(line);
        });
        tl.fromTo(lines, { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, stagger: 0.12, duration: 1.1, ease: 'power4.out' }, 0.6);
      }

      // Sub + CTA
      tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 1.1);
      tl.fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 1.3);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const lines = content.hero.headline.split('\n');

  return (
    <section ref={containerRef} style={{ position: 'relative', height: '100dvh', minHeight: '600px', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--color-text)' }}>
      {/* Overlay (initial wipe) */}
      <div ref={overlayRef} style={{ position: 'absolute', inset: 0, background: 'var(--color-bg)', zIndex: 10, transformOrigin: 'top' }} />

      {/* Background image (Picsum — warm, golden light cafe/france feel) */}
      <div ref={imageRef} className="parallax-img" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img
          src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1800&q=85&auto=format&fit=crop"
          alt="W10 Coffee + Deli atmosphere — warm southern France inspired café"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          width={1800} height={1200}
          priority="true" as="image"
        />
        {/* Warm dark gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(in oklch, oklch(0.1 0.03 55 / 0.55) 0%, oklch(0.1 0.03 55 / 0.25) 60%, oklch(0.1 0.03 55 / 0.6) 100%)' }} />
      </div>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 5, paddingTop: 'var(--space-20)' }}>
        {/* Overline */}
        <p className="overline" style={{ color: 'oklch(0.9 0.04 60 / 0.8)', marginBottom: 'var(--space-4)' }}>427–429 Harrow Road, London W10</p>

        {/* Headline */}
        <h1 ref={headlineRef} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)', fontWeight: 300, fontStyle: 'italic', color: '#FAF7F3', lineHeight: 1.05, marginBottom: 'var(--space-6)', maxWidth: '14ch' }}>
          {lines.map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
        </h1>

        {/* Sub */}
        <p ref={subRef} style={{ fontSize: 'var(--text-lg)', color: 'oklch(0.92 0.02 60 / 0.85)', maxWidth: '42ch', marginBottom: 'var(--space-8)', lineHeight: 1.6, fontWeight: 300 }}>
          {content.hero.subheadline}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/menu" className="btn btn-primary">{content.hero.cta}</Link>
          <Link href="/events" className="btn" style={{ background: 'transparent', color: '#FAF7F3', border: '1px solid oklch(0.92 0.02 60 / 0.45)', padding: 'var(--space-3) var(--space-8)', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', transition: 'all var(--transition-interactive)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.92 0.02 60 / 0.12)'; e.currentTarget.style.borderColor = 'oklch(0.92 0.02 60 / 0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'oklch(0.92 0.02 60 / 0.45)'; }}>
            {content.hero.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 'var(--space-8)', left: '50%', transform: 'translateX(-50%)', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.9 0.02 60 / 0.5)' }}>Scroll</span>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(oklch(0.9 0.02 60 / 0.5), transparent)', animation: 'scroll-line 2s ease-in-out infinite' }} />
        <style>{`@keyframes scroll-line { 0%,100%{opacity:0.3;transform:scaleY(0.6) translateY(0)} 50%{opacity:1;transform:scaleY(1) translateY(4px)} }`}</style>
      </div>
    </section>
  );
}
