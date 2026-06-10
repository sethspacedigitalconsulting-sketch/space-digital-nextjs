'use client';
import { motion } from 'framer-motion';

const rv = (delay = 0) => ({
  hidden: { opacity: 0, y: '2.5rem', filter: 'blur(5px)' },
  show:   { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.95, ease: [0.16,1,0.3,1] as const, delay } },
});

const TOOLS = ['n8n', 'Zapier', 'Make.com', 'Meta Ads', 'Google Ads', 'TikTok Ads', 'SEO Architecture', 'AI Voice Systems', 'CRM Automation', 'DeepSeek', 'Perplexity AI', 'DALL-E'];

export function Founder() {
  return (
    <section className="section-border" id="about" style={{ padding: '10rem 4rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 5rem', alignItems: 'start' }}>
        {/* Left â€” Identity */}
        <div>
          <motion.p className="section-tag" variants={rv()} initial="hidden" whileInView="show" viewport={{ once: true }}>
            07 â€” The Architect
          </motion.p>

          <motion.h2
            variants={rv(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.05, marginBottom: '0.4rem' }}>
            Seth Odhiambo
          </motion.h2>
          <motion.p
            variants={rv(0.17)} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '3rem', fontFamily: 'var(--sans)' }}>
            Founder â€” Space Digital &amp; AI Consulting Â· Nairobi, Kenya
          </motion.p>

          <motion.p
            variants={rv(0.24)} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.9, color: 'var(--text-muted)', paddingLeft: '1.2rem', borderLeft: '1px solid var(--signal-dim)', marginBottom: '2.5rem' }}>
            "I don&apos;t run campaigns. I architect systems â€” and I don&apos;t stop until the numbers prove it."
          </motion.p>

          <motion.p
            variants={rv(0.3)} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.85, color: 'var(--text-muted)', fontFamily: 'var(--sans)', marginBottom: '1.6rem' }}>
            Space Digital was founded in 2023 with a singular conviction: that most businesses fail online not from lack of effort, but from lack of architecture. Paid media without strategy burns budgets. Content without distribution disappears. Automation without intelligence creates noise.
          </motion.p>

          <motion.p
            variants={rv(0.36)} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.85, color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>
            Every engagement is approached as an infrastructure problem â€” calibrated, deployed, and refined until the system produces results that compound. Clients include healthcare providers, professional services firms, and digital agencies across Nairobi and beyond.
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          variants={rv(0.15)} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ background: 'linear-gradient(to bottom, transparent, var(--signal-dim) 15%, var(--signal-dim) 85%, transparent)', alignSelf: 'stretch', minHeight: 400 }}
        />

        {/* Right â€” Capabilities */}
        <div>
          <motion.p
            variants={rv(0.05)} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '2rem', fontFamily: 'var(--sans)' }}>
            Stack &amp; Capabilities
          </motion.p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '4rem' }}>
            {TOOLS.map((tool, i) => (
              <motion.span
                key={tool}
                variants={rv(0.1 + i * 0.05)}
                initial="hidden" whileInView="show" viewport={{ once: true }}
                style={{
                  fontSize: '0.65rem', letterSpacing: '0.08em',
                  color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '0.45rem 0.9rem', borderRadius: 4,
                  fontFamily: 'var(--sans)',
                }}>
                {tool}
              </motion.span>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { label: 'Engagement Model', value: 'Retainer Â· Project Â· Advisory' },
              { label: 'Location', value: 'Nairobi, Kenya Â· Remote-first' },
              { label: 'Focus', value: 'SMEs Â· Healthcare Â· Professional Services' },
              { label: 'Founded', value: '2023' },
            ].map(({ label, value }, i) => (
              <motion.div
                key={label}
                variants={rv(0.3 + i * 0.08)}
                initial="hidden" whileInView="show" viewport={{ once: true }}
                style={{ display: 'flex', justifyContent: 'space-between', padding: '1.1rem 0', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--sans)', letterSpacing: '0.04em' }}>{label}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>{value}</span>
              </motion.div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
