'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSite } from '@/lib/SiteContext';

export default function ContactPage() {
  const { content } = useSite();
  const headerRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.children ?? [], { opacity:0, y:30 }, { opacity:1, y:0, stagger:0.1, duration:0.9, ease:'power3.out', delay:0.1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section style={{ paddingTop:'clamp(6rem,12vw,10rem)', paddingBottom:'var(--space-12)', background:'var(--color-surface-offset)', borderBottom:'1px solid var(--color-divider)' }}>
        <div className="container" ref={headerRef}>
          <p className="overline" style={{ marginBottom:'var(--space-3)' }}>Get in Touch</p>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-3xl)', fontWeight:300, fontStyle:'italic', lineHeight:1.05, color:'var(--color-text)' }}>Contact Us</h1>
        </div>
      </section>

      <section className="section-pad" style={{ background:'var(--color-bg)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'clamp(var(--space-10),6vw,var(--space-16))' }}>
            {/* Info */}
            <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-8)' }}>
              {[
                { label:'Address', value: content.contact.address, href: `https://maps.google.com/?q=${encodeURIComponent(content.contact.address)}` },
                { label:'Phone', value: content.contact.phone, href: `tel:${content.contact.phone}` },
                { label:'Email', value: content.contact.email, href: `mailto:${content.contact.email}` },
              ].map(item => (
                <div key={item.label}>
                  <p className="overline" style={{ marginBottom:'var(--space-2)' }}>{item.label}</p>
                  <a href={item.href} target={item.label==='Address'?'_blank':undefined} rel="noopener noreferrer"
                    style={{ fontSize:'var(--text-base)', color:'var(--color-text)', textDecoration:'none', lineHeight:1.6, transition:'color var(--transition-interactive)' }}
                    onMouseEnter={e=>(e.currentTarget.style.color='var(--color-primary)')}
                    onMouseLeave={e=>(e.currentTarget.style.color='var(--color-text)')}>
                    {item.value}
                  </a>
                </div>
              ))}
              <div>
                <p className="overline" style={{ marginBottom:'var(--space-2)' }}>Opening Hours</p>
                <p style={{ fontSize:'var(--text-base)', color:'var(--color-text)', lineHeight:1.8 }}>{content.contact.hoursWeekday}</p>
                <p style={{ fontSize:'var(--text-base)', color:'var(--color-text)', lineHeight:1.8 }}>{content.contact.hoursWeekend}</p>
              </div>
              <div>
                <p className="overline" style={{ marginBottom:'var(--space-3)' }}>Follow Us</p>
                <a href={content.social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ alignSelf:'flex-start', display:'inline-flex' }}>@w10coffee on Instagram ↗</a>
              </div>
            </div>

            {/* Map embed + Form */}
            <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-6)' }}>
              <div style={{ aspectRatio:'16/9', background:'var(--color-surface-offset)', overflow:'hidden', border:'1px solid var(--color-border)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.8!2d-0.21!3d51.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s427+Harrow+Road+London+W10!5e0!3m2!1sen!2suk!4v1"
                  width="100%" height="100%" style={{ border:0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="W10 Coffee + Deli on Google Maps" />
              </div>

              {submitted ? (
                <div style={{ background:'var(--color-surface)', border:'1px solid var(--color-border)', padding:'var(--space-8)', textAlign:'center' }}>
                  <p style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', fontStyle:'italic', color:'var(--color-primary)', marginBottom:'var(--space-3)' }}>Message sent!</p>
                  <p style={{ color:'var(--color-text-muted)' }}>We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display:'flex', flexDirection:'column', gap:'var(--space-4)' }}>
                  <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-lg)', fontStyle:'italic', fontWeight:300, color:'var(--color-text)' }}>Send a Message</h2>
                  {[{id:'name',label:'Name',type:'text'},{id:'email',label:'Email',type:'email'}].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="label">{f.label} *</label>
                      <input id={f.id} type={f.type} required className="input" value={form[f.id as keyof typeof form]} onChange={e => setForm(p => ({...p,[f.id]:e.target.value}))} />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="label">Message *</label>
                    <textarea id="message" rows={5} required className="input" style={{ resize:'vertical' }} value={form.message} onChange={e => setForm(p => ({...p,message:e.target.value}))} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf:'flex-start' }}>Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
