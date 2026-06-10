'use client';
import { motion } from 'framer-motion';
import { SplitHeading } from './animations/SplitHeading';
import { RevealBlock } from './animations/RevealBlock';

const rv = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(4px)' },
  show:   { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.16,1,0.3,1] as const, delay } },
});

const pillar1Services = ['Omnichannel Acquisition', 'Search & Authority Infrastructure', 'High-Yield Paid Media — Meta & Google Ads', 'Map Rank Optimization'];
const pillar2Services = ['Custom AI Voice & Chat Ecosystems', 'Automated CRM & Data Enrichment', 'Intelligent Multi-Agent Workflows (n8n)', '24/7 Voice AI — Lead Qualification & Calendar Sync'];

function PillarServices({ services }: { services: string[] }) {
  return (
    <ul style={{ listStyle: 'none' }}>
      {services.map((s, i) => (
        <motion.li
          key={s}
          variants={rv(0.3 + i * 0.08)}
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          style={{
            padding: '1.1rem 0', borderTop: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: '1.1rem',
            fontSize: '0.88rem', color: 'var(--text-soft)',
            transition: 'color 0.3s ease, padding-left 0.35s cubic-bezier(0.16,1,0.3,1)',
            cursor: 'default', fontFamily: 'var(--sans)',
          }}
          onHoverStart={e => { (e.target as HTMLElement).style.color = 'var(--text)'; (e.target as HTMLElement).style.paddingLeft = '0.4rem'; }}
          onHoverEnd={e => { (e.target as HTMLElement).style.color = 'var(--text-soft)'; (e.target as HTMLElement).style.paddingLeft = '0'; }}
        >
          <span className="service-dot" />
          {s}
        </motion.li>
      ))}
    </ul>
  );
}

export function Pillars() {
  return (
    <section id="ecosystem" className="section-border" style={{ padding: '9rem 0' }}>
      <div className="inner">
        <div style={{ marginBottom: '5rem' }}>
          <motion.p className="section-tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            02 — Core Ecosystem
          </motion.p>
          <SplitHeading
            text="Two pillars. One integrated system engineered to compound."
            style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 600, lineHeight: 0.96, letterSpacing: '-0.045em', color: 'var(--text)', maxWidth: '30ch' }}
            delay={0.1}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 5rem', alignItems: 'start' }}>
          {/* Pillar 1 */}
          <RevealBlock delay={0.05}>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '1.6rem', fontFamily: 'var(--mono)' }}>Pillar 01</motion.p>
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 600, lineHeight: 0.96, letterSpacing: '-0.045em', color: 'var(--text)', marginBottom: '0.6rem' }}>Market<br />Resonance</h3>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '2rem', fontFamily: 'var(--mono)' }}>Digital Marketing Services</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '3rem', paddingLeft: '1.2rem', borderLeft: '1px solid var(--signal-dim)' }}>
              "Visibility without strategy is noise. We position your brand where attention meets intent."
            </p>
            <PillarServices services={pillar1Services} />
          </RevealBlock>

          {/* Divider */}
          <div style={{ background: 'linear-gradient(to bottom, transparent, var(--signal-dim) 15%, var(--signal-dim) 85%, transparent)', alignSelf: 'stretch', minHeight: 400 }} />

          {/* Pillar 2 */}
          <RevealBlock delay={0.15}>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '1.6rem', fontFamily: 'var(--mono)' }}>Pillar 02</motion.p>
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 600, lineHeight: 0.96, letterSpacing: '-0.045em', color: 'var(--text)', marginBottom: '0.6rem' }}>Operational<br />Velocity</h3>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '2rem', fontFamily: 'var(--mono)' }}>AI Automation Services</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '3rem', paddingLeft: '1.2rem', borderLeft: '1px solid var(--signal-dim)' }}>
              "Human intellect, augmented by machine efficiency. Systems built to reclaim time and scale output."
            </p>
            <PillarServices services={pillar2Services} />
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
