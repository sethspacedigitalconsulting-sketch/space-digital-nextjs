'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  { q: 'Do you work with clients outside Kenya?', a: 'Yes — Space Digital operates remotely by default. Active clients are based in Kenya, the UK, and across Africa. Geography is not a constraint.' },
  { q: 'What does a typical engagement look like?', a: 'Most engagements begin with a diagnosis phase (1–2 weeks), followed by a strategy build-out, then deployment. Ongoing retainers include monthly reporting, optimisation loops, and system evolution as results compound.' },
  { q: 'Can I hire you for just one service — e.g. only Google Ads?', a: 'Yes. Project-based engagements are available for specific channels or systems. However, integrated engagements (combining paid media + automation) consistently outperform isolated channel work.' },
  { q: 'How quickly do results typically appear?', a: 'Paid media results are visible within 2–4 weeks. SEO and local authority build over 60–90 days. AI automation ROI is typically measurable within 30 days of deployment.' },
  { q: 'What makes Space Digital different from a standard agency?', a: 'Most agencies optimise for campaign metrics. Space Digital optimises for business outcomes — and builds systems that continue delivering after the engagement ends. The goal is always compounding infrastructure, not recurring dependency.' },
  { q: 'What is your minimum engagement size?', a: 'Project minimums start at USD $1,200. Retainer engagements are scoped after the initial briefing. Contact me directly to discuss your specific requirements.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-border" style={{ background: 'var(--bg)', padding: '7rem 0 6rem', position: 'relative', isolation: 'isolate' }}>
      {/* Corner glows */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none', background: 'radial-gradient(60% 60% at 85% 0%, rgba(255,107,43,0.05) 0%, transparent 60%), radial-gradient(50% 50% at 10% 100%, rgba(232,226,211,0.03) 0%, transparent 70%)' }} />

      <div className="inner" style={{ maxWidth: 1100, padding: '0 40px', display: 'grid', gap: '3.5rem' }}>
        <div>
          <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: '1.25rem' }}>
            Common Questions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: '2rem', filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.1 }}
            style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, lineHeight: 0.96, letterSpacing: '-0.045em', color: 'var(--text)', margin: 0 }}
          >
            Before you{' '}
            <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--signal)' }}>reach out.</em>
          </motion.h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: '1rem' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16,1,0.3,1], delay: i * 0.06 }}
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', padding: '1.4rem 0', cursor: 'none', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <span style={{ fontFamily: 'var(--sans)', fontSize: '1.05rem', fontWeight: 500, letterSpacing: '-0.02em', color: open === i ? 'var(--text)' : 'var(--text-soft)', lineHeight: 1.4, transition: 'color 0.3s ease' }}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                  style={{ fontFamily: 'var(--mono)', fontSize: '1.25rem', color: open === i ? 'var(--signal)' : 'var(--text-muted)', flexShrink: 0, lineHeight: 1, display: 'inline-block' }}
                >+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-muted)', paddingBottom: '1.4rem', maxWidth: '72ch' }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      </div>
    </section>
  );
}
