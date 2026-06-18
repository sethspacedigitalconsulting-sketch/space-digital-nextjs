'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const META = [
  { label: 'Email', value: 'seth.spacedigitalconsulting@gmail.com', href: 'mailto:seth.spacedigitalconsulting@gmail.com' },
  { label: 'Location', value: 'Nairobi, Kenya · Remote-first', href: null },
  { label: 'Model', value: 'Retainer · Project · Advisory', href: null },
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

  // Pure type-safe lookup mapping for string fields
  const getFieldValue = (id: 'name' | 'email'): string => {
    return form[id];
  };

  return (
    <section className="section-border" id="contact" style={{ background: 'var(--bg)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(60% 60% at 20% 50%, rgba(255,107,43,0.06) 0%, transparent 65%)' }} />

      <div className="inner" style={{ padding: '0 24px' }}>
        {/* Responsive Flex / Grid Layout Wrapper */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-start gap-12 lg:gap-20">

          {/* Left — content mapping */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24">
            <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              Start a Conversation
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: '2rem', filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.05em', color: 'var(--text)', margin: 0 }}
            >
              Let&apos;s build{' '}
              <span style={{ color: 'var(--signal)' }}>together.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: '1.5rem' }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ color: 'var(--text-soft)', fontSize: '1rem', lineHeight: 1.55, maxWidth: '42ch', margin: 0, fontFamily: 'var(--sans)' }}
            >
              Every engagement begins with a briefing. No templates, no assumptions — just a precise diagnosis and a system built to deliver.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
              style={{ borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', margin: '1.5rem 0 0', padding: 0, listStyle: 'none' }}
            >
              {META.map(({ label, value, href }) => (
                <div key={label} className="grid grid-cols-1 sm:grid-cols-[100px_1fr] items-baseline gap-2 sm:gap-4 py-4 border-b border-zinc-900">
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
                  {href
                    ? <a href={href} style={{ fontSize: '0.95rem', color: 'var(--text)', transition: 'color 0.3s ease', cursor: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}>{value}</a>
                    : <span style={{ fontSize: '0.95rem', color: 'var(--text)' }}>{value}</span>
                  }
                </div>
              ))}
            </motion.ul>
          </div>

          {/* Right — form wrapper */}
          <motion.div
            initial={{ opacity: 0, y: '2rem', scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ background: 'rgba(20,20,22,0.55)', border: '1px solid var(--border)', padding: '2rem', borderRadius: '16px' }}
            className="w-full"
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem' }}>Opening your email client…</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Complete the send to initiate the briefing.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Clean, responsive inline field stacking layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {([['name', 'Name', 'text', true], ['email', 'Email', 'email', true]] as const).map(([id, label, type, required]) => (
                    <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label htmlFor={id} style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        {label}{required && <span style={{ color: 'var(--signal)', marginLeft: '0.15rem' }}>*</span>}
                      </label>
                      <input
                        id={id} type={type} required={required} placeholder={label}
                        value={getFieldValue(id)}
                        onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                        style={{ appearance: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', padding: '0.75rem 0.9rem', fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--text)', width: '100%', outline: 'none', borderRadius: '8px', transition: 'border-color 0.3s ease' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--signal)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="company" style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Company <span style={{ fontStyle: 'normal', fontSize: '0.85rem', color: 'var(--text-soft)', textTransform: 'none' }}>— optional</span>
                  </label>
                  <input id="company" type="text" placeholder="Company name"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    style={{ appearance: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', padding: '0.75rem 0.9rem', fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--text)', width: '100%', outline: 'none', borderRadius: '8px', transition: 'border-color 0.3s ease' }}
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
                    style={{ appearance: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', padding: '0.75rem 0.9rem', fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--text)', width: '100%', outline: 'none', borderRadius: '8px', resize: 'vertical', minHeight: 110, lineHeight: 1.5, transition: 'border-color 0.3s ease' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--signal)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'none' }}>
                  <input type="checkbox" required checked={form.consent} onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                    style={{ appearance: 'none', width: 18, height: 18, background: form.consent ? 'var(--signal)' : 'rgba(255,255,255,0.04)', border: `1px solid ${form.consent ? 'var(--signal)' : 'var(--border)'}`, flexShrink: 0, marginTop: 2, borderRadius: '4px', transition: 'background 0.3s ease, border-color 0.3s ease' }}
                  />
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    I agree to be contacted about my enquiry.
                  </span>
                </label>

                <button type="submit" className="btn btn-accent" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.85rem', borderRadius: '8px' }}>
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