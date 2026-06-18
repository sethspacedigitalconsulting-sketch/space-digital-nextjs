'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    num: '01',
    title: 'Market Resonance',
    subtitle: 'Digital Marketing',
    watermark: 'MR',
    desc: 'Paid media, search authority, and local SEO deployed as a unified acquisition infrastructure — not isolated campaigns.',
    features: ['Meta & Google Ads', 'SEO Architecture', 'Map Pack Optimisation', 'Omnichannel Acquisition'],
  },
  {
    num: '02',
    title: 'Operational Velocity',
    subtitle: 'AI Automation',
    watermark: 'OV',
    desc: 'Custom AI workflows, voice agents, and CRM automation that eliminate bottlenecks and scale operations without scaling headcount.',
    features: ['n8n Workflows', 'AI Voice Systems', 'CRM Automation', 'Lead Gen Engines'],
  },
  {
    num: '03',
    title: 'Content Production',
    subtitle: 'Video & Creative',
    watermark: 'CP',
    desc: 'Short-form video and ad creative engineered around hook rates and platform algorithms — built for conversion, not aesthetics.',
    features: ['Video Ad Production', 'TikTok Strategy', 'Pinterest Campaigns', 'Hook Optimisation'],
  },
  {
    num: '04',
    title: 'Brand Architecture',
    subtitle: 'Identity & Web',
    watermark: 'BA',
    desc: 'Web presence and brand systems built to project authority and convert visitors — from first impression through to inquiry.',
    features: ['Web Development', 'Brand Identity', 'UX Strategy', 'Conversion Design'],
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function ServiceCard({ service, i }: { service: typeof SERVICES[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.88, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
      style={{
        display: 'flex', flexDirection: 'column',
        padding: '2.75rem 2.5rem 2.25rem',
        background: hovered ? 'rgba(20,20,22,0.82)' : 'rgba(14,14,16,0.62)',
        border: hovered ? '1px solid rgba(255,107,43,0.32)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: hovered
          ? '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 44px 90px -32px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,107,43,0.14)'
          : '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -32px rgba(0,0,0,0.8)',
        position: 'relative', overflow: 'hidden', isolation: 'isolate',
        transition: 'background 0.45s cubic-bezier(0.16,1,0.3,1), border-color 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)',
        cursor: 'none',
      }}
    >
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
          background: 'linear-gradient(90deg, rgba(255,107,43,0) 0%, rgba(255,107,43,0.9) 30%, rgba(255,107,43,0.9) 70%, rgba(255,107,43,0) 100%)',
          originX: 0,
        }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      <div style={{
        fontFamily: 'var(--sans)', fontSize: 'clamp(5rem, 9vw, 8rem)', fontWeight: 800,
        lineHeight: 0.85, letterSpacing: '-0.04em',
        color: 'transparent',
        WebkitTextStroke: hovered ? '1.5px rgba(255,107,43,0.18)' : '1.5px rgba(255,255,255,0.06)',
        position: 'absolute', top: '1.5rem', right: '1.5rem',
        pointerEvents: 'none', zIndex: 0,
        transform: hovered ? 'translate(-4px, 0)' : 'translate(0, 0)',
        transition: '-webkit-text-stroke-color 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
      }}>{service.watermark}</div>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        {service.num}
      </span>
      <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 700, lineHeight: 0.98, letterSpacing: '-0.035em', color: 'var(--text)', margin: '0 0 0.3rem', position: 'relative', zIndex: 1 }}>
        {service.title}
      </h3>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2.25rem', position: 'relative', zIndex: 1 }}>
        {service.subtitle}
      </span>
      <p style={{ color: 'var(--text-soft)', fontSize: '0.95rem', lineHeight: 1.55, maxWidth: '38ch', margin: '0 0 1.5rem', position: 'relative', zIndex: 1 }}>
        {service.desc}
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto', position: 'relative', zIndex: 1 }}>
        {service.features.map(f => (
          <li key={f} style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-faint)', flexShrink: 0, display: 'inline-block' }} />
            {f}
          </li>
        ))}
      </ul>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: '1.25rem', lineHeight: 1,
        color: hovered ? 'var(--signal)' : 'var(--text-faint)',
        position: 'absolute', bottom: '1.5rem', right: '1.75rem',
        transform: hovered ? 'translate(5px, 0)' : 'translate(0, 0)',
        transition: 'color 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: 'none',
      }}>↗</div>
    </motion.div>
  );
}

export function Expertise() {
  const isMobile = useIsMobile();
  return (
    <section className="section-border" style={{ background: 'var(--bg)', isolation: 'isolate', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(120% 80% at 50% 0%, rgba(10,10,11,0.3) 0%, rgba(10,10,11,0.6) 55%, rgba(10,10,11,0.85) 100%)',
      }} />
      <div className="inner" style={{ position: 'relative', zIndex: 2, padding: '7rem 40px 6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '4rem' }}>
          <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Four Disciplines
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: '2rem', filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.25rem, 6vw, 5rem)', fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.045em', color: 'var(--text)', maxWidth: '16ch' }}
          >
            Every angle of growth, <span style={{ color: 'var(--signal)' }}>engineered.</span>
          </motion.h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1.25rem' }}>
          {SERVICES.map((s, i) => <ServiceCard key={s.num} service={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}