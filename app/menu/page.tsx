'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSite } from '@/lib/SiteContext';
import type { MenuItem } from '@/lib/siteContent';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { key: 'coffee', label: 'Coffee' },
  { key: 'food', label: 'Deli Food' },
  { key: 'wine', label: 'Wine' },
  { key: 'cakes', label: 'Cakes & Pastries' },
] as const;

type Cat = typeof CATEGORIES[number]['key'];

export default function MenuPage() {
  const { content } = useSite();
  const [activeTab, setActiveTab] = useState<Cat>('coffee');
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.children ?? [], { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.1 });
    });
    return () => ctx.revert();
  }, []);

  const switchTab = (cat: Cat) => {
    if (!gridRef.current) return;
    gsap.to(gridRef.current, { opacity: 0, y: 12, duration: 0.2, ease: 'power2.in', onComplete: () => {
      setActiveTab(cat);
      gsap.fromTo(gridRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
    }});
  };

  const items: MenuItem[] = content.menu[activeTab];

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 'clamp(6rem, 12vw, 10rem)', paddingBottom: 'var(--space-12)', background: 'var(--color-surface-offset)', borderBottom: '1px solid var(--color-divider)' }}>
        <div className="container" ref={headerRef}>
          <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>What We Serve</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.05, color: 'var(--color-text)', marginBottom: 'var(--space-4)' }}>The Menu</h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', maxWidth: '55ch', lineHeight: 1.7, fontWeight: 300 }}>
            Specialty coffee, seasonal deli plates, fine wines from southern France, and freshly baked cakes — crafted daily with care.
          </p>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div style={{ position: 'sticky', top: '64px', zIndex: 50, background: 'var(--color-surface)', borderBottom: '1px solid var(--color-divider)', backdropFilter: 'blur(12px)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {CATEGORIES.map(c => (
              <button key={c.key} onClick={() => switchTab(c.key)}
                style={{ padding: 'var(--space-4) var(--space-6)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: activeTab === c.key ? 'var(--color-primary)' : 'var(--color-text-muted)', background: 'none', border: 'none', borderBottom: activeTab === c.key ? '2px solid var(--color-primary)' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all var(--transition-interactive)' }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <section className="section-pad" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px,100%), 1fr))', gap: 'var(--space-4)' }}>
            {items.map(item => (
              <div key={item.id} style={{ background: 'var(--color-surface)', border: '1px solid oklch(from var(--color-text) l c h / 0.07)', padding: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)', transition: 'box-shadow var(--transition-interactive)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.2 }}>{item.name}</h3>
                    {item.badge && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FAF7F3', background: 'var(--color-primary)', padding: '2px 8px', fontWeight: 500 }}>{item.badge}</span>}
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{item.description}</p>
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontStyle: 'italic', color: 'var(--color-primary)', flexShrink: 0, fontWeight: 400 }}>{item.price}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 'var(--space-8)', fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', letterSpacing: '0.08em', textAlign: 'center' }}>Seasonal items may vary. Please inform us of any dietary requirements.</p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-pad-sm" style={{ background: 'var(--color-surface-offset)', borderTop: '1px solid var(--color-divider)', textAlign: 'center' }}>
        <div className="container-narrow">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontStyle: 'italic', fontWeight: 300, marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>Planning something special?</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-base)' }}>Our private events menu can be fully tailored to your occasion.</p>
          <a href="/events" className="btn btn-primary">Enquire About Events</a>
        </div>
      </section>
    </>
  );
}
