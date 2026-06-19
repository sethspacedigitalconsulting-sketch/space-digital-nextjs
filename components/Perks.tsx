'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BENTO = [
  { id: 'roas', span: 2, value: '3.8×', label: 'Average ROAS', desc: 'Meta & Google campaigns engineered for conversion yield.', category: 'Paid Media' },
  { id: 'reach', span: 2, value: '214%', label: 'Organic Traffic Growth', desc: 'Search authority built through architecture, not volume.', category: 'SEO' },
  { id: 'cpl', span: 1, value: '67%', label: 'CPL Reduction', desc: 'Wasted ad spend eliminated at every funnel stage.', category: 'Optimisation' },
  { id: 'map', span: 1, value: '94%', label: 'Map Pack Top-3', desc: 'Local authority that captures intent at search.', category: 'Local SEO' },
  { id: 'calls', span: 2, value: '82%', label: 'Calls Resolved by AI', desc: 'Voice AI ecosystems that qualify, route, and book — 24/7.', category: 'AI Automation' },
  { id: 'leads', span: 2, value: '4.2×', label: 'Qualified Leads / Month', desc: 'Multi-agent workflows remove human bottlenecks from the pipeline.', category: 'Lead Gen' },
  { id: 'crm', span: 1, value: '91%', label: 'CRM Entry Automated', desc: 'Automated enrichment across every data touchpoint.', category: 'AI Ops' },
  { id: 'hours', span: 1, value: '0', label: 'Leads Lost to After-Hours', desc: '24/7 AI — every inquiry captured regardless of time zone.', category: 'AI Automation' },
];

function useBreakpoint() {
  const [bp, setBp] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop');
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return bp;
}

export function Perks() {
  const bp = useBreakpoint();

  // On mobile: all cards are 1 column, full width
  // On tablet: 2 columns, span respected up to 2
  // On desktop: 4 columns, original spans
  const cols = bp === 'mobile' ? 1 : bp === 'tablet' ? 2 : 4;

  return (
    <section className="section-border" style={{ background: 'var(--bg)', position: 'relative' }}>
      <div
        className="inner"
        style={{ padding: bp === 'mobile' ? '4rem 1.25rem 3.5rem' : '7rem 40px 6rem' }}
      >
        {/* Header row */}
        <div style={{
          display: 'flex',
          flexDirection: bp === 'mobile' ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: bp === 'mobile' ? 'flex-start' : 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <div>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '1.25rem' }}
            >
              Proof of Performance
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: '2rem', filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(2.2rem, 7.2vw, 6rem)',
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: '-0.05em',
                color: 'var(--text)',
                margin: 0,
              }}
            >
              Numbers that<br />
              <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--signal)' }}>speak.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--sans)',
              maxWidth: '28ch',
              lineHeight: 1.7,
              textAlign: bp === 'mobile' ? 'left' : 'right',
            }}
          >
            Aggregated across active engagements.<br />Results vary by industry and scope.
          </motion.p>
        </div>

        {/* Bento grid — responsive columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: bp === 'mobile' ? '0.85rem' : '1rem',
        }}>
          {BENTO.map((item, i) => {
            // On mobile every card is full width (span 1 in a 1-col grid)
            // On tablet cap span at 2 (already max 2 in data)
            // On desktop use original span
            const colSpan = bp === 'mobile' ? 1 : item.span;

            return (
              <motion.div
                key={item.id}
                style={{ gridColumn: `span ${colSpan}` }}
                initial={{ opacity: 0, scale: 0.88, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: bp === 'mobile' ? '1.5rem' : '2rem',
                    background: 'rgba(20,20,22,0.5)',
                    border: '1px solid var(--border)',
                    minHeight: bp === 'mobile' ? 160 : item.span === 2 ? 200 : 180,
                    position: 'relative',
                    overflow: 'hidden',
                    isolation: 'isolate',
                    transition: 'background 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(22,22,24,0.8)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(20,20,22,0.5)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  }}
                >
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.66rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '1rem' }}>
                    {item.category}
                  </span>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 4vw, 3.8rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.045em', color: 'var(--text)', marginBottom: '0.65rem' }}>
                    {item.value}
                  </div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: bp === 'mobile' ? '0.82rem' : '0.88rem', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text)', marginBottom: '0.4rem' }}>
                    {item.label}
                  </div>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0, maxWidth: '36ch', marginTop: 'auto', paddingTop: '0.6rem' }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}