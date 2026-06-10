'use client';
import { motion } from 'framer-motion';
import { SplitHeading } from './animations/SplitHeading';
import { RevealBlock } from './animations/RevealBlock';

export function FilterSection() {
  return (
    <section className="section-border" style={{ padding: '9rem 0' }}>
      <div className="inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
        <div>
          <motion.p className="section-tag" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            01 — Positioning
          </motion.p>
          <SplitHeading
            text="Visibility without strategy is noise."
            style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 3.2vw, 3rem)', fontWeight: 600, lineHeight: 0.96, letterSpacing: '-0.045em', color: 'var(--text)', maxWidth: '18ch' }}
            delay={0.1}
          />
        </div>

        <RevealBlock delay={0.2} style={{ paddingTop: '3.5rem' }}>
          <p style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.8, color: 'var(--text-soft)', fontFamily: 'var(--sans)', marginBottom: '1.5rem' }}>
            Most agencies sell attention. We architect presence. There is a permanent and widening gap between brands that <strong style={{ color: 'var(--text)', fontWeight: 600 }}>integrate systems</strong> and those that run campaigns.
          </p>
          <p style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.8, color: 'var(--text-soft)', fontFamily: 'var(--sans)' }}>
            Space Digital operates at that gap — deploying paid media, search authority, and AI automation as a <strong style={{ color: 'var(--text)', fontWeight: 600 }}>unified growth infrastructure</strong>, not isolated services.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}
