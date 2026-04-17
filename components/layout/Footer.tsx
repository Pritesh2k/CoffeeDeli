'use client';
import Link from 'next/link';
import { useSite } from '@/lib/SiteContext';

export default function Footer() {
  const { content } = useSite();
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--color-text)', color: 'var(--color-text-inverse)', paddingBlock: 'clamp(var(--space-12),6vw,var(--space-20))' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-10)', marginBottom: 'var(--space-12)' }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 300, display:'block', letterSpacing:'0.02em' }}>W10 Coffee</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 500 }}>+ Deli</span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'oklch(from var(--color-text-inverse) l c h / 0.6)', maxWidth: '28ch', lineHeight: 1.7 }}>
              Specialty coffee & artisan deli inspired by southern France. Grand Union Canal, London W10.
            </p>
          </div>
          {/* Nav */}
          <div>
            <h4 style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', letterSpacing:'0.18em', textTransform:'uppercase', color:'oklch(from var(--color-text-inverse) l c h / 0.4)', marginBottom:'var(--space-4)', fontWeight:500 }}>Explore</h4>
            {[['/', 'Home'], ['/menu', 'Menu'], ['/events', 'Events'], ['/contact', 'Contact']].map(([href, label]) => (
              <Link key={href} href={href} style={{ display:'block', fontSize:'var(--text-sm)', color:'oklch(from var(--color-text-inverse) l c h / 0.7)', textDecoration:'none', marginBottom:'var(--space-2)', transition:'color var(--transition-interactive)' }}
                onMouseEnter={e => (e.currentTarget.style.color='var(--color-text-inverse)')}
                onMouseLeave={e => (e.currentTarget.style.color='oklch(from var(--color-text-inverse) l c h / 0.7)')}>
                {label}
              </Link>
            ))}
          </div>
          {/* Hours */}
          <div>
            <h4 style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', letterSpacing:'0.18em', textTransform:'uppercase', color:'oklch(from var(--color-text-inverse) l c h / 0.4)', marginBottom:'var(--space-4)', fontWeight:500 }}>Hours</h4>
            <p style={{ fontSize:'var(--text-sm)', color:'oklch(from var(--color-text-inverse) l c h / 0.7)', marginBottom:'var(--space-2)' }}>{content.contact.hoursWeekday}</p>
            <p style={{ fontSize:'var(--text-sm)', color:'oklch(from var(--color-text-inverse) l c h / 0.7)' }}>{content.contact.hoursWeekend}</p>
          </div>
          {/* Contact */}
          <div>
            <h4 style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', letterSpacing:'0.18em', textTransform:'uppercase', color:'oklch(from var(--color-text-inverse) l c h / 0.4)', marginBottom:'var(--space-4)', fontWeight:500 }}>Find Us</h4>
            <p style={{ fontSize:'var(--text-sm)', color:'oklch(from var(--color-text-inverse) l c h / 0.7)', marginBottom:'var(--space-2)', lineHeight:1.7 }}>{content.contact.address}</p>
            <a href={`tel:${content.contact.phone}`} style={{ display:'block', fontSize:'var(--text-sm)', color:'oklch(from var(--color-text-inverse) l c h / 0.7)', textDecoration:'none', marginBottom:'var(--space-2)', transition:'color var(--transition-interactive)' }}
              onMouseEnter={e=>(e.currentTarget.style.color='var(--color-text-inverse)')}
              onMouseLeave={e=>(e.currentTarget.style.color='oklch(from var(--color-text-inverse) l c h / 0.7)')}>
              {content.contact.phone}
            </a>
            <div style={{ display:'flex', gap:'var(--space-3)', marginTop:'var(--space-4)' }}>
              <a href={content.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color:'oklch(from var(--color-text-inverse) l c h / 0.6)', transition:'color var(--transition-interactive)' }}
                onMouseEnter={e=>(e.currentTarget.style.color='var(--color-text-inverse)')}
                onMouseLeave={e=>(e.currentTarget.style.color='oklch(from var(--color-text-inverse) l c h / 0.6)')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href={content.social.tripadvisor} target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor" style={{ color:'oklch(from var(--color-text-inverse) l c h / 0.6)', transition:'color var(--transition-interactive)', fontSize:'var(--text-xs)', display:'flex', alignItems:'center', letterSpacing:'0.05em' }}
                onMouseEnter={e=>(e.currentTarget.style.color='var(--color-text-inverse)')}
                onMouseLeave={e=>(e.currentTarget.style.color='oklch(from var(--color-text-inverse) l c h / 0.6)')}>
                TripAdvisor ↗
              </a>
            </div>
          </div>
        </div>
        <div style={{ borderTop:'1px solid oklch(from var(--color-text-inverse) l c h / 0.1)', paddingTop:'var(--space-6)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'var(--space-3)' }}>
          <p style={{ fontSize:'var(--text-xs)', color:'oklch(from var(--color-text-inverse) l c h / 0.35)', letterSpacing:'0.06em' }}>© {year} W10 Coffee + Deli. All rights reserved.</p>
          <Link href="/admin" style={{ fontSize:'var(--text-xs)', color:'oklch(from var(--color-text-inverse) l c h / 0.25)', textDecoration:'none', letterSpacing:'0.1em', textTransform:'uppercase', transition:'color var(--transition-interactive)' }}
            onMouseEnter={e=>(e.currentTarget.style.color='oklch(from var(--color-text-inverse) l c h / 0.6)')}
            onMouseLeave={e=>(e.currentTarget.style.color='oklch(from var(--color-text-inverse) l c h / 0.25)')}>
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
