'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSite } from '@/lib/SiteContext';

export default function EventsPage() {
  const { content } = useSite();
  const headerRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', guests: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.children ?? [], { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.1 });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: 'clamp(6rem,12vw,10rem)', paddingBottom: 0, overflow: 'hidden', background: 'var(--color-text)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=85&auto=format&fit=crop" alt="Private dining event at W10 Coffee + Deli"
            style={{ width:'100%', height:'100%', objectFit:'cover', opacity: 0.25 }} width={1600} height={900} />
        </div>
        <div className="container" ref={headerRef} style={{ position:'relative', zIndex:2, paddingBottom:'clamp(var(--space-16),8vw,var(--space-24))' }}>
          <p className="overline" style={{ color:'oklch(0.9 0.04 60 / 0.6)', marginBottom:'var(--space-3)' }}>Host Your Next Event</p>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-3xl)', fontWeight:300, fontStyle:'italic', color:'#FAF7F3', lineHeight:1.05, marginBottom:'var(--space-4)', maxWidth:'18ch' }}>{content.events.title}</h1>
          <p style={{ fontSize:'var(--text-lg)', color:'oklch(0.9 0.02 60 / 0.75)', maxWidth:'50ch', lineHeight:1.7, fontWeight:300 }}>{content.events.description}</p>
        </div>
      </section>

      {/* Features + Form */}
      <section className="section-pad" style={{ background:'var(--color-bg)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'clamp(var(--space-10),6vw,var(--space-16))' }}>
            {/* Features */}
            <div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', fontStyle:'italic', fontWeight:300, marginBottom:'var(--space-6)', color:'var(--color-text)' }}>What's Included</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-4)' }}>
                {content.events.features.map((f, i) => (
                  <div key={i} style={{ display:'flex', gap:'var(--space-4)', alignItems:'flex-start', paddingBottom:'var(--space-4)', borderBottom:'1px solid var(--color-divider)' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'var(--text-xl)', color:'var(--color-primary)', lineHeight:1, flexShrink:0 }}>{String(i+1).padStart(2,'0')}</span>
                    <p style={{ fontSize:'var(--text-base)', color:'var(--color-text-muted)', lineHeight:1.6 }}>{f}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:'var(--space-8)', padding:'var(--space-6)', background:'var(--color-surface-offset)', borderLeft:'3px solid var(--color-primary)' }}>
                <p style={{ fontSize:'var(--text-sm)', color:'var(--color-text-muted)', lineHeight:1.7 }}>
                  Contact us to discuss bespoke packages. We'll arrange a tasting session and tailor the event to your vision.
                </p>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', fontStyle:'italic', fontWeight:300, marginBottom:'var(--space-6)', color:'var(--color-text)' }}>Make an Enquiry</h2>
              {submitted ? (
                <div style={{ background:'var(--color-surface)', border:'1px solid var(--color-border)', padding:'var(--space-8)', textAlign:'center' }}>
                  <p style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', fontStyle:'italic', color:'var(--color-primary)', marginBottom:'var(--space-3)' }}>Thank you!</p>
                  <p style={{ color:'var(--color-text-muted)', fontSize:'var(--text-base)' }}>We'll be in touch within 24 hours to discuss your event.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'var(--space-4)' }}>
                  {[
                    { id:'name', label:'Your Name', type:'text', required:true },
                    { id:'email', label:'Email Address', type:'email', required:true },
                    { id:'phone', label:'Phone Number', type:'tel', required:false },
                    { id:'date', label:'Preferred Date', type:'date', required:false },
                    { id:'guests', label:'Number of Guests', type:'number', required:false },
                  ].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="label">{f.label}{f.required && ' *'}</label>
                      <input id={f.id} type={f.type} required={f.required} className="input"
                        value={form[f.id as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [f.id]: e.target.value }))} />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="label">Tell Us About Your Event</label>
                    <textarea id="message" rows={4} className="input" style={{ resize:'vertical' }}
                      value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ marginTop:'var(--space-2)', alignSelf:'flex-start' }}>{content.events.cta}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section style={{ background:'var(--color-surface-offset)', paddingBlock:'var(--space-4)', overflow:'hidden' }}>
        <div style={{ display:'flex', gap:'var(--space-2)', overflowX:'auto', scrollbarWidth:'none', padding:'0 clamp(var(--space-4),4vw,var(--space-12))' }}>
          {['photo-1414235077428-338989a2e8c0','photo-1517248135467-4c7edcad34c4','photo-1550966871-3ed3cdb5ed0c'].map((id,i) => (
            <div key={i} style={{ flexShrink:0, width:'300px', height:'200px', overflow:'hidden' }}>
              <img src={`https://images.unsplash.com/${id}?w=300&h=200&q=80&auto=format&fit=crop`} alt="Private event at W10 Coffee + Deli"
                style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s var(--ease-out)' }}
                width={300} height={200} loading="lazy"
                onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.05)')}
                onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}/>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
