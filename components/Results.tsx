'use client';
import { motion } from 'framer-motion';
import { SplitHeading } from './animations/SplitHeading';

const rv = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(4px)' },
  show:   { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.16,1,0.3,1] as const, delay } },
});

function Metric({ number, unit, label, desc, delay }: { number: string; unit?: string; label: string; desc: string; delay: number }) {
  return (
    <motion.div
      variants={rv(delay)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
      style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0 2rem',
        alignItems: 'start', padding: '2.2rem 0',
        borderTop: '1px solid var(--border)',
        transition: 'border-color 0.3s ease',
      }}
      onHoverStart={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,107,43,0.3)'}
      onHoverEnd={e => (e.target as HTMLElement).style.borderColor = 'var(--border)'}
    >
      <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 0.9, color: 'var(--text)', letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>
        {number}
        {unit && <sup style={{ fontSize: '0.42em', color: 'var(--signal)', letterSpacing: 0 }}>{unit}</sup>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingTop: '0.5rem' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 400, color: 'var(--text)', lineHeight: 1.3 }}>{label}</span>
        <span style={{ fontSize: '0.72rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</span>
      </div>
    </motion.div>
  );
}

export function Results() {
  return (
    <section className="section-border" style={{ padding: '10rem 0' }}>
      <div className="inner">
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '3rem', marginBottom: '6rem', flexWrap: 'wrap' }}>
        <SplitHeading
          text="Outcomes that compound. Not campaigns that expire."
          style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', fontWeight: 600, lineHeight: 0.96, letterSpacing: '-0.045em', color: 'var(--text)', maxWidth: '22ch' }}
          delay={0}
        />
        <motion.p variants={rv(0.12)} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ fontSize: '0.82rem', fontWeight: 400, lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '30ch', textAlign: 'right', fontFamily: 'var(--sans)' }}>
          Aggregated across active client engagements.<br />Results vary by industry, baseline, and scope.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 5rem' }}>
        {/* Digital Marketing */}
        <div>
          <motion.p variants={rv()} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ width: 16, height: 1, background: 'var(--signal)', display: 'inline-block' }} />
            Market Resonance â€” Digital Marketing
          </motion.p>
          <Metric number="3.8" unit="Ã—" label="Average ROAS on Paid Media" desc="Meta & Google campaigns engineered for conversion yield, not vanity impressions." delay={0.08} />
          <Metric number="214" unit="%" label="Average Organic Traffic Growth" desc="Search authority built through architecture â€” not content volume." delay={0.16} />
          <Metric number="67" unit="%" label="Reduction in Cost-Per-Lead" desc="Omnichannel acquisition calibrated to eliminate wasted ad spend at every stage." delay={0.24} />
          <Metric number="94" unit="%" label="Clients in Google Map Pack Top 3" desc="Local authority infrastructure that captures intent at the moment of search." delay={0.32} />
        </div>

        {/* Divider */}
        <div style={{ background: 'linear-gradient(to bottom, transparent, var(--signal-dim) 15%, var(--signal-dim) 85%, transparent)' }} />

        {/* AI Automation */}
        <div>
          <motion.p variants={rv()} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ width: 16, height: 1, background: 'var(--signal)', display: 'inline-block' }} />
            Operational Velocity â€” AI Automation
          </motion.p>
          <Metric number="82" unit="%" label="Inbound Calls Resolved Without Human" desc="Voice AI ecosystems that qualify, route, and book â€” around the clock." delay={0.08} />
          <Metric number="4.2" unit="Ã—" label="Increase in Qualified Leads Monthly" desc="Multi-agent workflows remove human bottlenecks from the top of the pipeline." delay={0.16} />
          <Metric number="91" unit="%" label="Reduction in Manual CRM Data Entry" desc="Automated enrichment and synchronisation across every data touchpoint." delay={0.24} />
          <Metric number="0" label="Leads Lost to After-Hours" desc="24/7 AI deployment â€” every inquiry captured and qualified regardless of time zone." delay={0.32} />
        </div>
      </div>
      </div>
    </section>
  );
}
