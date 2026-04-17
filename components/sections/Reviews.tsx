'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSite } from '@/lib/SiteContext';

gsap.registerPlugin(ScrollTrigger);

export default function Reviews() {
  const { content } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0 }, {
        opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const goTo = (i: number) => {
    const next = (i + content.reviews.length) % content.reviews.length;
    if (!trackRef.current) return;
    gsap.to(trackRef.current, { opacity: 0, x: i > active ? -20 : 20, duration: 0.25, ease: 'power2.in', onComplete: () => {
      setActive(next);
      gsap.fromTo(trackRef.current, { opacity: 0, x: i > active ? 20 : -20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' });
    }});
  };

  const review = content.reviews[active];

  return (
    <section ref={sectionRef} className="section-pad" style={{ background: 'var(--color-text)', color: 'var(--color-text-inverse)', position: 'relative', overflow: 'hidden' }}>
      {/* Large decorative quote */}
      <div style={{ position: 'absolute', top: 'var(--space-8)', left: 'clamp(var(--space-4),4vw,var(--space-12))', fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem,15vw,20rem)', fontWeight: 300, lineHeight: 1, color: 'oklch(from var(--color-text-inverse) l c h / 0.04)', userSelect: 'none', pointerEvents: 'none' }}>
        "
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-12)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <p className="overline" style={{ color: 'oklch(from var(--color-text-inverse) l c h / 0.5)', marginBottom: 'var(--space-3)' }}>What People Say</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text-inverse)', lineHeight: 1.1 }}>Honest Reviews</h2>
          </div>
          {/* Navigation dots */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
            {content.reviews.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Review ${i + 1}`}
                style={{ width: i === active ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === active ? 'var(--color-primary)' : 'oklch(from var(--color-text-inverse) l c h / 0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.35s var(--ease-out)' }} />
            ))}
          </div>
        </div>

        <div ref={trackRef}>
          <div style={{ maxWidth: '780px' }}>
            <div className="stars" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-5)', letterSpacing: '4px' }}>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 2.2rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text-inverse)', lineHeight: 1.45, marginBottom: 'var(--space-8)', maxWidth: '70ch' }}>
              "{review.text}"
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#FAF7F3', flexShrink: 0 }}>
                {review.author[0]}
              </div>
              <div>
                <p style={{ fontWeight: 500, fontSize: 'var(--text-base)', color: 'var(--color-text-inverse)' }}>{review.author}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'oklch(from var(--color-text-inverse) l c h / 0.5)', letterSpacing: '0.08em' }}>{review.source} · {review.date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prev/Next */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-10)' }}>
          {[{ dir: -1, label: '←' }, { dir: 1, label: '→' }].map(({ dir, label }) => (
            <button key={dir} onClick={() => goTo(active + dir)} aria-label={dir < 0 ? 'Previous review' : 'Next review'}
              style={{ width: '48px', height: '48px', border: '1px solid oklch(from var(--color-text-inverse) l c h / 0.2)', background: 'transparent', color: 'var(--color-text-inverse)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-base)', cursor: 'pointer', transition: 'all var(--transition-interactive)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'oklch(from var(--color-text-inverse) l c h / 0.2)'; }}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
