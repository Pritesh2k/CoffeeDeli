'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/events', label: 'Events' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const stored = localStorage.getItem('w10_theme') as 'light' | 'dark' | null;
    setTheme(stored || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? 'var(--color-surface)' : 'transparent',
      boxShadow: scrolled ? '0 2px 24px oklch(0.2 0.03 55 / 0.08)' : 'none',
      duration: 0.45,
      ease: 'power2.out',
    });
  }, [scrolled]);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', display: 'flex' }
      );
    } else {
      gsap.to(mobileMenuRef.current, { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in', onComplete: () => { if (mobileMenuRef.current) mobileMenuRef.current.style.display = 'none'; } });
    }
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('w10_theme', next);
  };

  if (isAdmin) return null;

  return (
    <header ref={navRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'background 0.45s, box-shadow 0.45s' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) clamp(var(--space-4), 4vw, var(--space-12))', maxWidth: '100%' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontWeight: 400, letterSpacing: '0.04em', color: 'var(--color-text)', lineHeight: 1 }}>W10 Coffee</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 500 }}>+ Deli</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? ' active' : ''}`}>{l.label}</Link>
          ))}
          <Link href="/menu" className="btn btn-primary" style={{ padding: 'var(--space-2) var(--space-5)', fontSize: 'var(--text-xs)' }}>Reserve a Table</Link>
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
            {theme === 'dark'
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: 'var(--space-2)', color: 'var(--color-text)' }}>
          <span style={{ display: 'block', width: '24px', height: '1.5px', background: 'currentColor', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }}/>
          <span style={{ display: 'block', width: '24px', height: '1.5px', background: 'currentColor', transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }}/>
          <span style={{ display: 'block', width: '24px', height: '1.5px', background: 'currentColor', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }}/>
        </button>
      </nav>

      {/* Mobile menu */}
      <div ref={mobileMenuRef} style={{ display: 'none', flexDirection: 'column', background: 'var(--color-surface)', borderTop: '1px solid var(--color-divider)', padding: 'var(--space-6) clamp(var(--space-4),4vw,var(--space-12))', gap: 'var(--space-5)' }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? ' active' : ''}`} onClick={() => setMenuOpen(false)} style={{ fontSize: 'var(--text-base)' }}>{l.label}</Link>
        ))}
        <Link href="/menu" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 'var(--space-2)' }} onClick={() => setMenuOpen(false)}>Reserve a Table</Link>
        <button onClick={toggleTheme} style={{ alignSelf: 'flex-start', color: 'var(--color-text-muted)', display:'flex', alignItems:'center', gap:'var(--space-2)', fontSize:'var(--text-sm)' }}>
          {theme==='dark'?'Light Mode':'Dark Mode'}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
