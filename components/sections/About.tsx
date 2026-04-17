'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSite } from '@/lib/SiteContext';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { content } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on image
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
      // Text reveal
      gsap.fromTo(textRef.current?.children ?? [], { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pad" style={{ background: 'var(--color-bg)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(var(--space-10),6vw,var(--space-20))', alignItems: 'center' }}>
          {/* Image */}
          <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
            <div ref={imageRef} style={{ position: 'absolute', inset: '-15% 0', height: '130%' }}>
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=85&auto=format&fit=crop"
                alt="Artisan coffee being prepared at W10 Coffee + Deli"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                width={900} height={1125} loading="lazy"
              />
            </div>
            {/* Accent corner element */}
            <div style={{ position: 'absolute', bottom: 'var(--space-6)', right: 'calc(-1 * var(--space-6))', background: 'var(--color-primary)', color: '#FAF7F3', padding: 'var(--space-4) var(--space-6)', zIndex: 2 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.4, maxWidth: '18ch' }}>"{content.about.highlight}"</p>
            </div>
          </div>

          {/* Text */}
          <div ref={textRef}>
            <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>Our Story</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 300, fontStyle: 'italic', marginBottom: 'var(--space-6)', lineHeight: 1.1, color: 'var(--color-text)' }}>
              {content.about.title}
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.85, marginBottom: 'var(--space-6)', maxWidth: '52ch' }}>
              {content.about.body}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-divider)' }}>
              {[['Specialty', 'Coffee'], ['Artisan', 'Deli'], ['Private', 'Events']].map(([l1, l2]) => (
                <div key={l1}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontStyle: 'italic', fontWeight: 300, color: 'var(--color-primary)', lineHeight: 1 }}>{l1}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginTop: '4px' }}>{l2}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
