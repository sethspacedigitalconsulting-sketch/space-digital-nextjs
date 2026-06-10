'use client';
import { motion } from 'framer-motion';
import { VerticalImageStack, type StackItem } from './animations/VerticalImageStack';

function CaseCard({ platform, metric, metricLabel, context, color }: {
  platform: string; metric: string; metricLabel: string; context: string; color: string;
}) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(145deg, #0f0f0f 0%, #111 100%)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: '2.5rem',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: color }} />
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '60%', height: '60%',
        background: `radial-gradient(circle at bottom right, ${color}10 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color, fontFamily: 'var(--sans)' }}>{platform}</span>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(4rem, 8vw, 6rem)', fontWeight: 300, lineHeight: 0.9, color: 'var(--text)', marginTop: '1.2rem', letterSpacing: '-0.045em' }}>
          {metric}
        </p>
        <p style={{ fontSize: '0.8rem', fontWeight: 400, color, marginTop: '0.6rem', fontFamily: 'var(--sans)', letterSpacing: '0.04em' }}>
          {metricLabel}
        </p>
      </div>

      <p style={{ fontSize: '0.78rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--text-muted)', fontFamily: 'var(--sans)', maxWidth: '36ch' }}>
        {context}
      </p>
    </div>
  );
}

const CASE_ITEMS: StackItem[] = [
  {
    id: 1,
    label: 'Meta Ads Case Study',
    sublabel: 'Facebook · Instagram',
    element: (
      <CaseCard
        platform="Meta Ads — Case Study 09"
        metric="3.8×"
        metricLabel="Return on Ad Spend"
        context="Targeting architecture and creative rotation strategy built for a professional services brand. CPL reduced by 67% within the first 60 days of deployment."
        color="#FF6B2B"
      />
    ),
  },
  {
    id: 2,
    label: 'TikTok Ads Case Study',
    sublabel: 'TikTok For Business',
    element: (
      <CaseCard
        platform="TikTok Ads — Case Study 06"
        metric="214%"
        metricLabel="Organic Reach Amplification"
        context="Short-form video content strategy layered with paid amplification. Hook-rate optimisation and audience segmentation drove above-benchmark engagement across all ad sets."
        color="#EF4444"
      />
    ),
  },
  {
    id: 3,
    label: 'Google Ads Case Study',
    sublabel: 'Google Search & Display',
    element: (
      <CaseCard
        platform="Google Ads — Case Study 08"
        metric="94%"
        metricLabel="Map Pack Top-3 Placement"
        context="Local SEO and Google Ads strategy for a healthcare client in Nairobi. Combined search intent targeting with map rank optimisation to dominate local discovery."
        color="#4ADE80"
      />
    ),
  },
];

export function CaseStudies() {
  return (
    <section className="section-border" style={{ padding: 0 }}>
      <div style={{ padding: '8rem 4rem 0' }}>
        <motion.p className="section-tag"
          initial={{ opacity: 0, y: '2rem' }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}>
          05 — Proof of Performance
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: '2.5rem', filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }} transition={{ duration: 0.95, ease: [0.16,1,0.3,1], delay: 0.1 }}
          style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.12, maxWidth: '24ch' }}>
          Numbers that speak<br /><em style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>without embellishment.</em>
        </motion.h2>
      </div>
      <VerticalImageStack items={CASE_ITEMS} />
    </section>
  );
}
