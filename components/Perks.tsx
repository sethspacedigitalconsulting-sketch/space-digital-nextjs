'use client';
import { motion } from 'framer-motion';

const BENTO = [
  // Row 1 — 2 wide cards
  { id: 'roas',    span: 2, value: '3.8×',  label: 'Average ROAS',           desc: 'Meta & Google campaigns engineered for conversion yield.', category: 'Paid Media' },
  { id: 'reach',   span: 2, value: '214%',  label: 'Organic Traffic Growth',  desc: 'Search authority built through architecture, not volume.', category: 'SEO' },
  // Row 2 — 1 + 1 + 2
  { id: 'cpl',     span: 1, value: '67%',   label: 'CPL Reduction',           desc: 'Wasted ad spend eliminated at every funnel stage.', category: 'Optimisation' },
  { id: 'map',     span: 1, value: '94%',   label: 'Map Pack Top-3',          desc: 'Local authority that captures intent at search.', category: 'Local SEO' },
  { id: 'calls',   span: 2, value: '82%',   label: 'Calls Resolved by AI',    desc: 'Voice AI ecosystems that qualify, route, and book — 24/7.', category: 'AI Automation' },
  // Row 3 — 2 + 1 + 1
  { id: 'leads',   span: 2, value: '4.2×',  label: 'Qualified Leads / Month', desc: 'Multi-agent workflows remove human bottlenecks from the pipeline.', category: 'Lead Gen' },
  { id: 'crm',     span: 1, value: '91%',   label: 'CRM Entry Automated',     desc: 'Automated enrichment across every data touchpoint.', category: 'AI Ops' },
  { id: 'hours',   span: 1, value: '0',     label: 'Leads Lost to After-Hours',desc: '24/7 AI — every inquiry captured regardless of time zone.', category: 'AI Automation' },
];

export function Perks() {
  return (
    <section className="section-border" style={{ background: 'var(--bg)', position: 'relative' }}>
      <div className="inner" style={{ padding: '7rem 40px 6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: '1.25rem' }}>
              Proof of Performance
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: '2rem', filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.1 }}
              style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.4rem, 7.2vw, 6rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.05em', color: 'var(--text)', margin: 0 }}
            >
              Numbers that<br />
              <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--signal)' }}>speak.</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--sans)', maxWidth: '28ch', lineHeight: 1.7, textAlign: 'right' }}
          >
            Aggregated across active engagements.<br />Results vary by industry and scope.
          </motion.p>
        </div>

        {/* Bento grid — 4 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {BENTO.map((item, i) => (
            <motion.div
              key={item.id}
              style={{ gridColumn: `span ${item.span}` }}
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.65, ease: [0.16,1,0.3,1], delay: i * 0.06 }}
            >
              <div style={{
                display: 'flex', flexDirection: 'column',
                padding: '2rem',
                background: 'rgba(20,20,22,0.5)',
                border: '1px solid var(--border)',
                minHeight: item.span === 2 ? 200 : 180,
                position: 'relative', overflow: 'hidden', isolation: 'isolate',
                transition: 'background 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(22,22,24,0.8)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(20,20,22,0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.66rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '1.25rem' }}>
                  {item.category}
                </span>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.045em', color: 'var(--text)', marginBottom: '0.75rem' }}>
                  {item.value}
                </div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text)', marginBottom: '0.5rem' }}>
                  {item.label}
                </div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0, maxWidth: '36ch', marginTop: 'auto', paddingTop: '0.75rem' }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
