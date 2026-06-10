'use client';
import { motion } from 'framer-motion';

const rv = (delay = 0) => ({
  hidden: { opacity: 0, y: '2.5rem', filter: 'blur(5px)' },
  show:   { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.95, ease: [0.16,1,0.3,1] as const, delay } },
});

const PRINCIPLES = [
  {
    number: 'I',
    title: 'Architecture over activity.',
    body: 'Every campaign, workflow, and system is designed with a structural intent. We don\'t produce content â€” we build distribution engines.',
  },
  {
    number: 'II',
    title: 'Data as the feedback loop.',
    body: 'Decisions are calibrated against live performance signals. Every iteration is informed. Nothing is guesswork.',
  },
  {
    number: 'III',
    title: 'Automation as infrastructure.',
    body: 'AI is not a novelty layer here. It is woven into the operational core â€” eliminating bottlenecks before they form.',
  },
  {
    number: 'IV',
    title: 'Compounding, not campaigns.',
    body: 'Individual campaigns expire. Systems compound. The goal is always a structure that grows stronger with time.',
  },
];

export function Evolution() {
  return (
    <section className="section-border" style={{ padding: '10rem 4rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
        {/* Left */}
        <div>
          <motion.p className="section-tag" variants={rv()} initial="hidden" whileInView="show" viewport={{ once: true }}>
            08 â€” Philosophy
          </motion.p>
          <motion.h2
            variants={rv(0.12)} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.12, maxWidth: '20ch' }}>
            An architecture<br />built to<br /><em style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>evolve.</em>
          </motion.h2>

          <motion.p
            variants={rv(0.22)} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.85, color: 'var(--text-muted)', fontFamily: 'var(--sans)', maxWidth: '36ch', marginTop: '2.5rem' }}>
            The digital landscape shifts. Algorithms update. Attention patterns mutate. The only durable competitive advantage is a system flexible enough to adapt â€” and rigorous enough to maintain performance through each transition.
          </motion.p>
        </div>

        {/* Right â€” Principles */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.number}
              variants={rv(i * 0.1)}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
              style={{ padding: '2rem 0', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'baseline', marginBottom: '0.7rem' }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '0.75rem', color: 'var(--signal)', letterSpacing: '0.04em' }}>{p.number}</span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{p.title}</h3>
              </div>
              <p style={{ fontSize: '0.78rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--text-muted)', fontFamily: 'var(--sans)', paddingLeft: '2.5rem' }}>
                {p.body}
              </p>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      </div>
    </section>
  );
}
