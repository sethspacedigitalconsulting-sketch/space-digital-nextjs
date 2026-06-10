'use client';
import { motion } from 'framer-motion';

const rv = (delay = 0) => ({
  hidden: { opacity: 0, y: '2.5rem', filter: 'blur(5px)' },
  show:   { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.95, ease: [0.16,1,0.3,1] as const, delay } },
});

const CLIENTS = [
  {
    url: 'https://www.ulnar-medical.com/',
    name: 'Ulnar Medical',
    tag: 'Healthcare · Nairobi',
    desc: 'Full-stack brand and web presence for an OB/GYN clinic in Nairobi. Designed for trust and conversion — combining clinical authority with modern aesthetic to drive patient enquiries.',
    accent: '#F4B9B9',
    index: '01',
  },
  {
    url: 'https://wibify.agency/en',
    name: 'Wibify Agency',
    tag: 'Digital Agency · Global',
    desc: 'Strategic positioning and web architecture for a global digital agency. Built to project credibility and capture inbound leads from enterprise-level clients.',
    accent: '#FF6B2B',
    index: '02',
  },
];

export function ClientWork() {
  return (
    <section className="section-border" id="work" style={{ padding: '10rem 4rem' }}>
      <div style={{ marginBottom: '6rem' }}>
        <motion.p className="section-tag" variants={rv()} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          06 — Client Work
        </motion.p>
        <motion.h2
          variants={rv(0.12)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.12, maxWidth: '24ch' }}>
          Work engineered<br /><em style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>to be remembered.</em>
        </motion.h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {CLIENTS.map((client, i) => (
          <motion.a
            key={client.url}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={rv(i * 0.14)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              alignItems: 'center',
              gap: '3rem',
              padding: '2.5rem 0',
              borderTop: '1px solid var(--border)',
              textDecoration: 'none',
              cursor: 'none',
            }}
            whileHover="hovered"
          >
            <span style={{ fontFamily: 'var(--serif)', fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>{client.index}</span>

            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem', marginBottom: '0.7rem' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1 }}>
                  {client.name}
                </h3>
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: client.accent, fontFamily: 'var(--sans)' }}>
                  {client.tag}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--text-muted)', fontFamily: 'var(--sans)', maxWidth: '52ch' }}>
                {client.desc}
              </p>
            </div>

            <motion.span
              style={{ fontSize: '1.4rem', color: client.accent, display: 'inline-block' }}
              variants={{ hovered: { x: 6, y: -6 } }}
              transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
            >
              ↗
            </motion.span>
          </motion.a>
        ))}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>
    </section>
  );
}
