'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSite } from '@/lib/SiteContext';

gsap.registerPlugin(ScrollTrigger);

export default function MenuPreview() {
  const { content } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const featured = [
    { label: 'Coffee', item: content.menu.coffee[0], img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop' },
    { label: 'Deli', item: content.menu.food[0], img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80&auto=format&fit=crop' },
    { label: 'Wine', item: content.menu.wine[1], img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80&auto=format&fit=crop' },
    { label: 'Cakes', item: content.menu.cakes[0], img: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&q=80&auto=format&fit=crop' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current?.children ?? [], { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pad" style={{ background: 'var(--color-surface-offset)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-12)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>What We Offer</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, color: 'var(--color-text)' }}>The Menu</h2>
          </div>
          <Link href="/menu" className="btn btn-outline" style={{ flexShrink: 0 }}>See Full Menu</Link>
        </div>

        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px,100%), 1fr))', gap: 'var(--space-4)' }}>
          {featured.map(({ label, item, img }) => (
            <Link key={label} href="/menu" style={{ textDecoration: 'none', display: 'block', overflow: 'hidden', background: 'var(--color-surface)', border: '1px solid oklch(from var(--color-text) l c h / 0.07)', transition: 'box-shadow var(--transition-interactive), transform var(--transition-interactive)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                <img src={img} alt={item?.name ?? label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s var(--ease-out)' }}
                  width={600} height={450} loading="lazy"
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}/>
              </div>
              <div style={{ padding: 'var(--space-5)' }}>
                <p className="overline" style={{ marginBottom: 'var(--space-2)' }}>{label}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400, marginBottom: 'var(--space-2)', color: 'var(--color-text)' }}>{item?.name}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{item?.description}</p>
                <p style={{ marginTop: 'var(--space-3)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontStyle: 'italic' }}>{item?.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
