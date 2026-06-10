'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const META = [
  { label: 'Email',    value: 'seth.spacedigitalconsulting@gmail.com', href: 'mailto:seth.spacedigitalconsulting@gmail.com' },
  { label: 'Location', value: 'Nairobi, Kenya · Remote-first', href: null },
  { label: 'Model',    value: 'Retainer · Project · Advisory', href: null },
];

export function CTA() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', consent: false });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Briefing Request — ${form.company || form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`);
    window.location.href = `mailto:seth.spacedigitalconsulting@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section className="section-border" id="contact" style={{ background: 'var(--bg)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(60% 60% at 20% 50%, rgba(255,107,43,0.06) 0%, transparent 65%)' }} />

      <div className="inner" style={{ padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', alignItems: 'start', gap: '5rem' }}>

          {/* Left — sticky */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'sticky', top: '6rem' }}>
            <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              Start a Conversation
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: '2rem', filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.1 }}
              style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.75rem, 5.5vw, 5rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.05em', color: 'var(--text)', margin: 0 }}
            >
              Let&apos;s build{' '}
              <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--signal)' }}>together.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: '1.5rem' }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1], delay: 0.2 }}
              style={{ color: 'var(--text-soft)', fontSize: '1.05rem', lineHeight: 1.55, maxWidth: '42ch', margin: 0, fontFamily: 'var(--sans)' }}
            >
              Every engagement begins with a briefing. No templates, no assumptions — just a precise diagnosis and a system built to deliver.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
              style={{ borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', margin: '1rem 0 0', padding: 0, listStyle: 'none' }}
            >
              {META.map(({ label, value, href }) => (
                <li key={label} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'baseline', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
                  {href
                    ? <a href={href} style={{ fontSize: '0.98rem', letterSpacing: '-0.005em', color: 'var(--text)', transition: 'color 0.3s ease', cursor: 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}>{value}</a>
                    : <span style={{ fontSize: '0.98rem', letterSpacing: '-0.005em', color: 'var(--text)' }}>{value}</span>
                  }
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: '2rem', scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16,1,0.3,1], delay: 0.15 }}
            style={{ background: 'rgba(20,20,22,0.55)', border: '1px solid var(--border)', padding: '2.25rem 2.25rem 2rem' }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '0.5rem' }}>Opening your email client…</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Complete the send to initiate the briefing.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {([['name','Name','text',true],['email','Email','email',true]] as [string,string,string,boolean][]).map(([id, label, type, required]) => (
                    <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label htmlFor={id} style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        {label}{required && <span style={{ color: 'var(--signal)', marginLeft: '0.15rem' }}>*</span>}
                      </label>
                      <input id={id} type={type} required={required} placeholder={label}
                        value={(form as Record<string,string>)[id]}
                        onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                        style={{ appearance: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', padding: '0.75rem 0.9rem', fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--text)', width: '100%', outline: 'none', transition: 'border-color 0.3s ease' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--signal)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="company" style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Company <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-soft)', textTransform: 'none', letterSpacing: 0 }}>— optional</em>
                  </label>
                  <input id="company" type="text" placeholder="Company name"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    style={{ appearance: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', padding: '0.75rem 0.9rem', fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--text)', width: '100%', outline: 'none', transition: 'border-color 0.3s ease' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--signal)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="message" style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Message <span style={{ color: 'var(--signal)', marginLeft: '0.15rem' }}>*</span>
                  </label>
                  <textarea id="message" required rows={5} placeholder="Tell me about your project…"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ appearance: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', padding: '0.75rem 0.9rem', fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--text)', width: '100%', outline: 'none', resize: 'vertical', minHeight: 110, lineHeight: 1.5, transition: 'border-color 0.3s ease' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--signal)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'none' }}>
                  <input type="checkbox" required checked={form.consent} onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                    style={{ appearance: 'none', width: 18, height: 18, background: form.consent ? 'var(--signal)' : 'rgba(255,255,255,0.04)', border: `1px solid ${form.consent ? 'var(--signal)' : 'var(--border)'}`, flexShrink: 0, marginTop: 2, cursor: 'none', transition: 'background 0.3s ease, border-color 0.3s ease' }}
                  />
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    I agree to be contacted about my enquiry.
                  </span>
                </label>
                <button type="submit" className="btn btn-accent" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', cursor: 'none' }}>
                  Send Briefing Request →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
