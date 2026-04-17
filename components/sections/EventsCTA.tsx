'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSite } from '@/lib/SiteContext';

gsap.registerPlugin(ScrollTrigger);

export default function EventsCTA() {
  const { content } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      gsap.fromTo(contentRef.current?.children ?? [], { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-bg)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(var(--space-10),6vw,var(--space-20))', alignItems: 'center' }}>
          <div ref={contentRef}>
            <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>Hire the Space</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, marginBottom: 'var(--space-5)', color: 'var(--color-text)' }}>{content.events.title}</h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.85, marginBottom: 'var(--space-6)', maxWidth: '50ch' }}>{content.events.description}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)', listStyle: 'none', padding: 0 }}>
              {content.events.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/events" className="btn btn-primary">{content.events.cta}</Link>
          </div>

          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            <div ref={imgRef} style={{ position: 'absolute', inset: '-12% 0', height: '124%' }}>
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop" alt="Private events and intimate dining at W10 Coffee + Deli"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} width={900} height={1200} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
