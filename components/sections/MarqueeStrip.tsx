'use client';
import { useSite } from '@/lib/SiteContext';

export default function MarqueeStrip() {
  const { content } = useSite();
  const items = [...content.marqueeText, ...content.marqueeText];
  return (
    <div style={{ background: 'var(--color-primary)', overflow: 'hidden', paddingBlock: 'var(--space-4)', borderTop: '1px solid oklch(from var(--color-primary-hover) l c h / 0.5)', borderBottom: '1px solid oklch(from var(--color-primary-hover) l c h / 0.5)' }}>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-6)', paddingRight: 'var(--space-6)', whiteSpace: 'nowrap', fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontStyle: 'italic', color: '#FAF7F3', fontWeight: 300, letterSpacing: '0.04em' }}>
            {item}
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'oklch(0.9 0.04 60 / 0.4)', display: 'inline-block' }} />
          </span>
        ))}
      </div>
    </div>
  );
}
