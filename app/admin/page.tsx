'use client';
import { useState, useCallback } from 'react';
import { useSite } from '@/lib/SiteContext';
import type { MenuItem, Review } from '@/lib/siteContent';

type Section = 'seo' | 'hero' | 'about' | 'contact' | 'menu' | 'reviews' | 'events' | 'marquee';

const NAV: { key: Section; label: string; icon: string }[] = [
  { key: 'seo',     label: 'SEO',          icon: '🔍' },
  { key: 'hero',    label: 'Hero',         icon: '🎬' },
  { key: 'about',   label: 'About',        icon: '📖' },
  { key: 'contact', label: 'Contact',      icon: '📍' },
  { key: 'menu',    label: 'Menu',         icon: '🍽️' },
  { key: 'reviews', label: 'Reviews',      icon: '⭐' },
  { key: 'events',  label: 'Events',       icon: '🎉' },
  { key: 'marquee', label: 'Marquee',      icon: '📢' },
];

const MENU_CATS = ['coffee','food','wine','cakes'] as const;

function Toast({ msg, type }: { msg: string; type: 'success'|'error' }) {
  return (
    <div className={`toast ${type}`} style={{ position:'fixed', bottom:'var(--space-6)', right:'var(--space-6)', zIndex:9999, background: type==='success'?'#2D6A2D':'var(--color-primary)', color:'#FAF7F3', padding:'var(--space-3) var(--space-5)', fontSize:'var(--text-sm)', fontWeight:500, boxShadow:'var(--shadow-lg)' }}>
      {msg}
    </div>
  );
}

function Field({ label, id, value, onChange, multiline=false, type='text', hint }:
  { label:string; id:string; value:string; onChange:(v:string)=>void; multiline?:boolean; type?:string; hint?:string }) {
  return (
    <div style={{ marginBottom:'var(--space-4)' }}>
      <label htmlFor={id} className="label">{label}</label>
      {multiline
        ? <textarea id={id} rows={4} className="input" style={{ resize:'vertical' }} value={value} onChange={e=>onChange(e.target.value)} />
        : <input id={id} type={type} className="input" value={value} onChange={e=>onChange(e.target.value)} />
      }
      {hint && <p style={{ fontSize:'var(--text-xs)', color:'var(--color-text-faint)', marginTop:'var(--space-1)' }}>{hint}</p>}
    </div>
  );
}

export default function AdminPage() {
  const { content, canUndo, canRedo, isDirty, updateSection, undo, redo, save, reset } = useSite();
  const [active, setActive] = useState<Section>('seo');
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [toast, setToast] = useState<{msg:string;type:'success'|'error'}|null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem> & { category: typeof MENU_CATS[number] }>({ category:'coffee', name:'', description:'', price:'', badge:'' });
  const [editMenuId, setEditMenuId] = useState<string|null>(null);
  const [newReview, setNewReview] = useState<Partial<Review>>({ author:'', rating:5, text:'', date:'', source:'Google' });

  const showToast = useCallback((msg:string, type:'success'|'error'='success') => {
    setToast({msg,type});
    setTimeout(()=>setToast(null), 3000);
  }, []);

  const handleSave = () => { save(); showToast('Changes saved successfully!'); };
  const handleReset = () => { if (confirm('Reset ALL content to defaults? This cannot be undone.')) { reset(); showToast('Content reset to defaults.'); } };

  // Keyboard shortcuts
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__adminShortcuts = (e: KeyboardEvent) => {
      if ((e.metaKey||e.ctrlKey) && e.key==='z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.metaKey||e.ctrlKey) && e.key==='z' && e.shiftKey) { e.preventDefault(); redo(); }
      if ((e.metaKey||e.ctrlKey) && e.key==='s') { e.preventDefault(); handleSave(); }
    };
  }

  // Auth gate
  if (!auth) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--color-bg)' }}>
        <div style={{ width:'100%', maxWidth:'360px', padding:'var(--space-8)', background:'var(--color-surface)', border:'1px solid var(--color-border)', boxShadow:'var(--shadow-lg)' }}>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', fontStyle:'italic', fontWeight:300, marginBottom:'var(--space-6)', textAlign:'center', color:'var(--color-text)' }}>Admin Access</h1>
          <form onSubmit={e=>{e.preventDefault(); if(pw==='w10admin'||pw==='admin'){setAuth(true);}else{showToast('Incorrect password','error');}}}>
            <div style={{ marginBottom:'var(--space-4)' }}>
              <label htmlFor="pw" className="label">Password</label>
              <input id="pw" type="password" className="input" value={pw} onChange={e=>setPw(e.target.value)} autoFocus />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}>Enter Admin</button>
          </form>
          <p style={{ textAlign:'center', marginTop:'var(--space-4)', fontSize:'var(--text-xs)', color:'var(--color-text-faint)' }}>Default password: <code>w10admin</code></p>
        </div>
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </div>
    );
  }

  const sectionStyle = { padding:'var(--space-2)' };

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--color-bg)', fontFamily:'var(--font-body)' }}
      onKeyDown={e=>{ if((e.metaKey||e.ctrlKey)&&e.key==='z'&&!e.shiftKey){e.preventDefault();undo();} if((e.metaKey||e.ctrlKey)&&e.key==='z'&&e.shiftKey){e.preventDefault();redo();} if((e.metaKey||e.ctrlKey)&&e.key==='s'){e.preventDefault();handleSave();} }}>

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen?' open':''}`}>
        <div style={{ marginBottom:'var(--space-6)' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-base)', fontStyle:'italic', fontWeight:300, color:'var(--color-text)' }}>W10 Coffee + Deli</div>
          <div style={{ fontSize:'var(--text-xs)', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--color-text-faint)', marginTop:'2px' }}>Admin Panel</div>
        </div>

        {/* Undo/Redo + Save */}
        <div style={{ display:'flex', gap:'var(--space-2)', marginBottom:'var(--space-4)' }}>
          <button onClick={undo} disabled={!canUndo} title="Undo (⌘Z)"
            style={{ flex:1, padding:'var(--space-2)', border:'1px solid var(--color-border)', background:'none', fontSize:'var(--text-xs)', letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:500, color:canUndo?'var(--color-text)':'var(--color-text-faint)', cursor:canUndo?'pointer':'default', transition:'all var(--transition-interactive)' }}>↩ Undo</button>
          <button onClick={redo} disabled={!canRedo} title="Redo (⌘⇧Z)"
            style={{ flex:1, padding:'var(--space-2)', border:'1px solid var(--color-border)', background:'none', fontSize:'var(--text-xs)', letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:500, color:canRedo?'var(--color-text)':'var(--color-text-faint)', cursor:canRedo?'pointer':'default', transition:'all var(--transition-interactive)' }}>Redo ↪</button>
        </div>

        <button onClick={handleSave}
          style={{ width:'100%', padding:'var(--space-3)', background:isDirty?'var(--color-primary)':'var(--color-surface-offset)', color:isDirty?'#FAF7F3':'var(--color-text-muted)', border:'none', fontSize:'var(--text-xs)', letterSpacing:'0.12em', textTransform:'uppercase', fontWeight:600, cursor:'pointer', marginBottom:'var(--space-5)', transition:'all var(--transition-interactive)' }}>
          {isDirty ? '💾 Save Changes' : '✓ Saved'}
        </button>

        <nav style={{ display:'flex', flexDirection:'column', gap:'var(--space-1)' }}>
          {NAV.map(n => (
            <button key={n.key} onClick={()=>{setActive(n.key);setSidebarOpen(false);}}
              style={{ width:'100%', padding:'var(--space-3) var(--space-4)', textAlign:'left', border:'none', background:active===n.key?'var(--color-primary-highlight)':'none', color:active===n.key?'var(--color-primary)':'var(--color-text-muted)', fontSize:'var(--text-sm)', fontWeight:500, cursor:'pointer', borderRadius:'var(--radius-sm)', display:'flex', alignItems:'center', gap:'var(--space-3)', transition:'all var(--transition-interactive)' }}
              onMouseEnter={e=>{if(active!==n.key)e.currentTarget.style.background='var(--color-surface-offset)';}}
              onMouseLeave={e=>{if(active!==n.key)e.currentTarget.style.background='none';}}>
              <span>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop:'auto', paddingTop:'var(--space-6)', borderTop:'1px solid var(--color-divider)', display:'flex', flexDirection:'column', gap:'var(--space-2)' }}>
          <a href="/" target="_blank" rel="noopener noreferrer"
            style={{ fontSize:'var(--text-xs)', color:'var(--color-text-muted)', textDecoration:'none', letterSpacing:'0.08em', display:'flex', alignItems:'center', gap:'var(--space-2)' }}>↗ View Public Site</a>
          <button onClick={handleReset} style={{ fontSize:'var(--text-xs)', color:'var(--color-text-faint)', background:'none', border:'none', cursor:'pointer', textAlign:'left', letterSpacing:'0.08em' }}>Reset to Defaults</button>
          <button onClick={()=>setAuth(false)} style={{ fontSize:'var(--text-xs)', color:'var(--color-text-faint)', background:'none', border:'none', cursor:'pointer', textAlign:'left', letterSpacing:'0.08em' }}>Sign Out</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-content">
        {/* Mobile header */}
        <div style={{ display:'none', alignItems:'center', justifyContent:'space-between', marginBottom:'var(--space-6)', paddingBottom:'var(--space-4)', borderBottom:'1px solid var(--color-divider)' }} className="mobile-admin-header">
          <span style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'var(--text-lg)' }}>Admin</span>
          <button onClick={()=>setSidebarOpen(o=>!o)} style={{ padding:'var(--space-2)', border:'1px solid var(--color-border)', background:'none', cursor:'pointer', fontSize:'var(--text-sm)' }}>☰ Menu</button>
        </div>

        <div style={{ maxWidth:'800px' }}>
          {/* Section header */}
          <div style={{ marginBottom:'var(--space-8)' }}>
            <p style={{ fontSize:'var(--text-xs)', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--color-text-faint)', marginBottom:'var(--space-2)' }}>Editing</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', fontStyle:'italic', fontWeight:300, color:'var(--color-text)' }}>{NAV.find(n=>n.key===active)?.label}</h1>
            <p style={{ fontSize:'var(--text-xs)', color:'var(--color-text-faint)', marginTop:'var(--space-1)' }}>⌘Z undo · ⌘⇧Z redo · ⌘S save</p>
          </div>

          {/* ── SEO ── */}
          {active==='seo' && (
            <div style={sectionStyle}>
              <div className="admin-field-group"><h3>Search Engine Optimisation</h3>
                <Field label="Site Title" id="seo-title" value={content.seo.siteTitle} onChange={v=>updateSection('seo',{siteTitle:v})} hint="Appears in browser tab and Google results (50–60 chars ideal)" />
                <Field label="Meta Tagline" id="seo-tagline" value={content.seo.tagline} onChange={v=>updateSection('seo',{tagline:v})} />
                <Field label="Meta Description" id="seo-desc" value={content.seo.description} onChange={v=>updateSection('seo',{description:v})} multiline hint="Appears in Google snippets (150–160 chars ideal)" />
                <Field label="Keywords (comma separated)" id="seo-kw" value={content.seo.keywords} onChange={v=>updateSection('seo',{keywords:v})} multiline />
              </div>
              <div style={{ padding:'var(--space-4)', background:'var(--color-surface-offset)', border:'1px solid var(--color-border)' }}>
                <p style={{ fontSize:'var(--text-xs)', color:'var(--color-text-muted)', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'var(--space-3)' }}>Google Preview</p>
                <p style={{ color:'#1a0dab', fontSize:'var(--text-base)', fontWeight:500, marginBottom:'2px' }}>{content.seo.siteTitle}</p>
                <p style={{ color:'#006621', fontSize:'var(--text-xs)', marginBottom:'2px' }}>w10coffee.co.uk</p>
                <p style={{ color:'#545454', fontSize:'var(--text-sm)', lineHeight:1.5 }}>{content.seo.description.slice(0,160)}{content.seo.description.length>160?'…':''}</p>
              </div>
            </div>
          )}

          {/* ── HERO ── */}
          {active==='hero' && (
            <div style={sectionStyle}>
              <div className="admin-field-group"><h3>Hero Section</h3>
                <Field label="Headline (use \\n for line break)" id="hero-h" value={content.hero.headline} onChange={v=>updateSection('hero',{headline:v})} multiline />
                <Field label="Subheadline" id="hero-sub" value={content.hero.subheadline} onChange={v=>updateSection('hero',{subheadline:v})} />
                <Field label="Primary CTA Button" id="hero-cta" value={content.hero.cta} onChange={v=>updateSection('hero',{cta:v})} />
                <Field label="Secondary CTA Button" id="hero-cta2" value={content.hero.ctaSecondary} onChange={v=>updateSection('hero',{ctaSecondary:v})} />
              </div>
            </div>
          )}

          {/* ── ABOUT ── */}
          {active==='about' && (
            <div style={sectionStyle}>
              <div className="admin-field-group"><h3>About Section</h3>
                <Field label="Section Title" id="ab-title" value={content.about.title} onChange={v=>updateSection('about',{title:v})} />
                <Field label="Body Copy" id="ab-body" value={content.about.body} onChange={v=>updateSection('about',{body:v})} multiline />
                <Field label="Pull Quote (shown on image)" id="ab-hl" value={content.about.highlight} onChange={v=>updateSection('about',{highlight:v})} hint="Short, punchy review quote. Shown overlaid on the photo." />
              </div>
            </div>
          )}

          {/* ── CONTACT ── */}
          {active==='contact' && (
            <div style={sectionStyle}>
              <div className="admin-field-group"><h3>Contact & Hours</h3>
                <Field label="Street Address" id="ct-addr" value={content.contact.address} onChange={v=>updateSection('contact',{address:v})} />
                <Field label="Phone Number" id="ct-ph" value={content.contact.phone} onChange={v=>updateSection('contact',{phone:v})} type="tel" />
                <Field label="Email Address" id="ct-em" value={content.contact.email} onChange={v=>updateSection('contact',{email:v})} type="email" />
                <Field label="Weekday Hours" id="ct-hw" value={content.contact.hoursWeekday} onChange={v=>updateSection('contact',{hoursWeekday:v})} hint='e.g. "Mon – Fri: 8am – 5pm"' />
                <Field label="Weekend Hours" id="ct-hwe" value={content.contact.hoursWeekend} onChange={v=>updateSection('contact',{hoursWeekend:v})} />
              </div>
              <div className="admin-field-group"><h3>Social Links</h3>
                <Field label="Instagram URL" id="ct-ig" value={content.social.instagram} onChange={v=>updateSection('social',{instagram:v})} />
                <Field label="TripAdvisor URL" id="ct-ta" value={content.social.tripadvisor} onChange={v=>updateSection('social',{tripadvisor:v})} />
              </div>
            </div>
          )}

          {/* ── MENU ── */}
          {active==='menu' && (
            <div style={sectionStyle}>
              {MENU_CATS.map(cat => (
                <div key={cat} className="admin-field-group">
                  <h3>{cat.charAt(0).toUpperCase()+cat.slice(1)}</h3>
                  {(content.menu[cat] as MenuItem[]).map((item, idx) => (
                    <div key={item.id} style={{ padding:'var(--space-4)', background:'var(--color-bg)', border:'1px solid var(--color-divider)', marginBottom:'var(--space-3)' }}>
                      {editMenuId===item.id ? (
                        <div>
                          {(['name','description','price','badge'] as const).map(f => (
                            <div key={f} style={{ marginBottom:'var(--space-2)' }}>
                              <label className="label" style={{ textTransform:'capitalize' }}>{f}</label>
                              <input className="input" style={{ padding:'var(--space-2) var(--space-3)' }} value={item[f]??''} onChange={e=>{
                                const updated = [...content.menu[cat] as MenuItem[]];
                                updated[idx] = { ...item, [f]: e.target.value };
                                updateSection('menu',{ ...content.menu, [cat]: updated });
                              }} />
                            </div>
                          ))}
                          <button onClick={()=>setEditMenuId(null)} className="btn btn-primary" style={{ padding:'var(--space-2) var(--space-4)', fontSize:'var(--text-xs)', marginTop:'var(--space-2)' }}>Done</button>
                        </div>
                      ) : (
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <div>
                            <span style={{ fontWeight:600, fontSize:'var(--text-sm)', color:'var(--color-text)' }}>{item.name}</span>
                            <span style={{ fontSize:'var(--text-xs)', color:'var(--color-text-faint)', marginLeft:'var(--space-2)' }}>{item.price}</span>
                            {item.badge && <span style={{ marginLeft:'var(--space-2)', fontSize:'var(--text-xs)', background:'var(--color-primary)', color:'#FAF7F3', padding:'1px 6px', fontWeight:500 }}>{item.badge}</span>}
                          </div>
                          <div style={{ display:'flex', gap:'var(--space-2)' }}>
                            <button onClick={()=>setEditMenuId(item.id)} style={{ fontSize:'var(--text-xs)', color:'var(--color-text-muted)', background:'none', border:'1px solid var(--color-border)', padding:'var(--space-1) var(--space-3)', cursor:'pointer' }}>Edit</button>
                            <button onClick={()=>{ const updated=(content.menu[cat] as MenuItem[]).filter((_,i)=>i!==idx); updateSection('menu',{...content.menu,[cat]:updated}); }} style={{ fontSize:'var(--text-xs)', color:'var(--color-primary)', background:'none', border:'1px solid var(--color-primary-highlight)', padding:'var(--space-1) var(--space-3)', cursor:'pointer' }}>Remove</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Add new item */}
                  {newMenuItem.category===cat && (
                    <div style={{ padding:'var(--space-4)', background:'var(--color-primary-highlight)', border:'1px dashed var(--color-primary)', marginTop:'var(--space-3)' }}>
                      <p style={{ fontSize:'var(--text-xs)', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--color-primary)', marginBottom:'var(--space-3)' }}>New {cat} item</p>
                      {(['name','description','price','badge'] as const).map(f => (
                        <div key={f} style={{ marginBottom:'var(--space-2)' }}>
                          <label className="label" style={{ textTransform:'capitalize' }}>{f}{f==='badge'?' (optional)':''}</label>
                          <input className="input" style={{ padding:'var(--space-2) var(--space-3)' }} value={newMenuItem[f]??''} onChange={e=>setNewMenuItem(p=>({...p,[f]:e.target.value}))} />
                        </div>
                      ))}
                      <div style={{ display:'flex', gap:'var(--space-2)', marginTop:'var(--space-3)' }}>
                        <button className="btn btn-primary" style={{ padding:'var(--space-2) var(--space-4)', fontSize:'var(--text-xs)' }} onClick={()=>{
                          if(!newMenuItem.name||!newMenuItem.price) return;
                          const newItem: MenuItem = { id: Date.now().toString(), name:newMenuItem.name!, description:newMenuItem.description??'', price:newMenuItem.price!, category:cat, badge:newMenuItem.badge||undefined };
                          updateSection('menu',{...content.menu,[cat]:[...(content.menu[cat] as MenuItem[]),newItem]});
                          setNewMenuItem({category:cat,name:'',description:'',price:'',badge:''});
                        }}>Add Item</button>
                        <button onClick={()=>setNewMenuItem(p=>({...p,name:'',description:'',price:'',badge:''}))} style={{ fontSize:'var(--text-xs)', color:'var(--color-text-muted)', background:'none', border:'none', cursor:'pointer' }}>Cancel</button>
                      </div>
                    </div>
                  )}
                  <button onClick={()=>setNewMenuItem({category:cat,name:'',description:'',price:'',badge:''})} style={{ marginTop:'var(--space-3)', fontSize:'var(--text-xs)', color:'var(--color-primary)', background:'none', border:'1px dashed var(--color-primary-highlight)', padding:'var(--space-2) var(--space-4)', cursor:'pointer', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:500 }}>+ Add {cat} item</button>
                </div>
              ))}
            </div>
          )}

          {/* ── REVIEWS ── */}
          {active==='reviews' && (
            <div style={sectionStyle}>
              <div className="admin-field-group"><h3>Customer Reviews</h3>
                {content.reviews.map((r, idx) => (
                  <div key={r.id} style={{ padding:'var(--space-4)', background:'var(--color-bg)', border:'1px solid var(--color-divider)', marginBottom:'var(--space-3)' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'var(--space-2)' }}>
                      <div>
                        <span style={{ fontWeight:600, fontSize:'var(--text-sm)', color:'var(--color-text)' }}>{r.author}</span>
                        <span style={{ fontSize:'var(--text-xs)', color:'var(--color-gold)', marginLeft:'var(--space-2)' }}>{'★'.repeat(r.rating)}</span>
                        <span style={{ fontSize:'var(--text-xs)', color:'var(--color-text-faint)', marginLeft:'var(--space-2)' }}>{r.source} · {r.date}</span>
                      </div>
                      <button onClick={()=>{ const updated=content.reviews.filter((_,i)=>i!==idx); updateSection('reviews',updated as unknown as Record<string,unknown>); }} style={{ fontSize:'var(--text-xs)', color:'var(--color-primary)', background:'none', border:'1px solid var(--color-primary-highlight)', padding:'var(--space-1) var(--space-3)', cursor:'pointer' }}>Remove</button>
                    </div>
                    <p style={{ fontSize:'var(--text-sm)', color:'var(--color-text-muted)', lineHeight:1.6, fontStyle:'italic' }}>"{r.text}"</p>
                  </div>
                ))}
                {/* Add review */}
                <div style={{ padding:'var(--space-4)', background:'var(--color-primary-highlight)', border:'1px dashed var(--color-primary)', marginTop:'var(--space-4)' }}>
                  <p style={{ fontSize:'var(--text-xs)', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--color-primary)', marginBottom:'var(--space-3)' }}>Add New Review</p>
                  {[{f:'author',l:'Author Name'},{f:'text',l:'Review Text'},{f:'date',l:'Date (e.g. March 2025)'}].map(({f,l})=>(
                    <div key={f} style={{ marginBottom:'var(--space-2)' }}>
                      <label className="label">{l}</label>
                      {f==='text'
                        ? <textarea rows={3} className="input" style={{resize:'vertical'}} value={(newReview[f as keyof typeof newReview] as string)??''} onChange={e=>setNewReview(p=>({...p,[f]:e.target.value}))} />
                        : <input className="input" style={{padding:'var(--space-2) var(--space-3)'}} value={(newReview[f as keyof typeof newReview] as string)??''} onChange={e=>setNewReview(p=>({...p,[f]:e.target.value}))} />
                      }
                    </div>
                  ))}
                  <div style={{ display:'flex', gap:'var(--space-4)', marginBottom:'var(--space-3)' }}>
                    <div style={{ flex:1 }}>
                      <label className="label">Rating</label>
                      <select className="input" style={{ padding:'var(--space-2) var(--space-3)' }} value={newReview.rating} onChange={e=>setNewReview(p=>({...p,rating:Number(e.target.value)}))}>
                        {[5,4,3,2,1].map(n=><option key={n} value={n}>{n} stars</option>)}
                      </select>
                    </div>
                    <div style={{ flex:1 }}>
                      <label className="label">Source</label>
                      <select className="input" style={{ padding:'var(--space-2) var(--space-3)' }} value={newReview.source} onChange={e=>setNewReview(p=>({...p,source:e.target.value as Review['source']}))}>
                        {['Google','TripAdvisor','Instagram'].map(s=><option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ padding:'var(--space-2) var(--space-4)', fontSize:'var(--text-xs)' }} onClick={()=>{
                    if(!newReview.author||!newReview.text) return;
                    const r: Review = { id:Date.now().toString(), author:newReview.author!, rating:newReview.rating??5, text:newReview.text!, date:newReview.date??'', source:newReview.source??'Google' };
                    updateSection('reviews',[...content.reviews, r] as unknown as Record<string,unknown>);
                    setNewReview({author:'',rating:5,text:'',date:'',source:'Google'});
                  }}>Add Review</button>
                </div>
              </div>
            </div>
          )}

          {/* ── EVENTS ── */}
          {active==='events' && (
            <div style={sectionStyle}>
              <div className="admin-field-group"><h3>Events Section</h3>
                <Field label="Section Title" id="ev-title" value={content.events.title} onChange={v=>updateSection('events',{title:v})} />
                <Field label="Description" id="ev-desc" value={content.events.description} onChange={v=>updateSection('events',{description:v})} multiline />
                <Field label="CTA Button Text" id="ev-cta" value={content.events.cta} onChange={v=>updateSection('events',{cta:v})} />
                <div>
                  <label className="label">Features List</label>
                  {content.events.features.map((f,i)=>(
                    <div key={i} style={{ display:'flex', gap:'var(--space-2)', marginBottom:'var(--space-2)' }}>
                      <input className="input" style={{ padding:'var(--space-2) var(--space-3)' }} value={f} onChange={e=>{
                        const updated=[...content.events.features]; updated[i]=e.target.value;
                        updateSection('events',{features:updated});
                      }} />
                      <button onClick={()=>{ const updated=content.events.features.filter((_,j)=>j!==i); updateSection('events',{features:updated}); }} style={{ padding:'var(--space-2) var(--space-3)', border:'1px solid var(--color-primary-highlight)', background:'none', color:'var(--color-primary)', cursor:'pointer', flexShrink:0 }}>✕</button>
                    </div>
                  ))}
                  <button onClick={()=>updateSection('events',{features:[...content.events.features,'']})} style={{ fontSize:'var(--text-xs)', color:'var(--color-primary)', background:'none', border:'1px dashed var(--color-primary-highlight)', padding:'var(--space-2) var(--space-4)', cursor:'pointer', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:500, marginTop:'var(--space-2)' }}>+ Add Feature</button>
                </div>
              </div>
            </div>
          )}

          {/* ── MARQUEE ── */}
          {active==='marquee' && (
            <div style={sectionStyle}>
              <div className="admin-field-group"><h3>Marquee Strip Text</h3>
                <p style={{ fontSize:'var(--text-sm)', color:'var(--color-text-muted)', marginBottom:'var(--space-4)', lineHeight:1.6 }}>These words scroll across the red Bordeaux strip below the hero. Keep them short and impactful.</p>
                {content.marqueeText.map((t,i)=>(
                  <div key={i} style={{ display:'flex', gap:'var(--space-2)', marginBottom:'var(--space-2)' }}>
                    <input className="input" style={{ padding:'var(--space-2) var(--space-3)' }} value={t} onChange={e=>{ const updated=[...content.marqueeText]; updated[i]=e.target.value; updateSection('marqueeText',updated as unknown as Record<string,unknown>); }} />
                    <button onClick={()=>{ const updated=content.marqueeText.filter((_,j)=>j!==i); updateSection('marqueeText',updated as unknown as Record<string,unknown>); }} style={{ padding:'var(--space-2) var(--space-3)', border:'1px solid var(--color-primary-highlight)', background:'none', color:'var(--color-primary)', cursor:'pointer', flexShrink:0 }}>✕</button>
                  </div>
                ))}
                <button onClick={()=>updateSection('marqueeText',[...content.marqueeText,''] as unknown as Record<string,unknown>)} style={{ fontSize:'var(--text-xs)', color:'var(--color-primary)', background:'none', border:'1px dashed var(--color-primary-highlight)', padding:'var(--space-2) var(--space-4)', cursor:'pointer', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:500, marginTop:'var(--space-2)' }}>+ Add Item</button>
              </div>
            </div>
          )}

          {/* Bottom save bar */}
          <div style={{ marginTop:'var(--space-10)', paddingTop:'var(--space-6)', borderTop:'1px solid var(--color-divider)', display:'flex', gap:'var(--space-3)', alignItems:'center', flexWrap:'wrap' }}>
            <button onClick={handleSave} className="btn btn-primary">{isDirty?'💾 Save Changes':'✓ All Saved'}</button>
            <button onClick={undo} disabled={!canUndo} className="btn btn-outline" style={{ opacity:canUndo?1:0.4 }}>↩ Undo</button>
            <button onClick={redo} disabled={!canRedo} className="btn btn-outline" style={{ opacity:canRedo?1:0.4 }}>Redo ↪</button>
            {isDirty && <span style={{ fontSize:'var(--text-xs)', color:'var(--color-primary)', fontWeight:500 }}>● Unsaved changes</span>}
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .mobile-admin-header { display: flex !important; }
        }
      `}</style>

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}
