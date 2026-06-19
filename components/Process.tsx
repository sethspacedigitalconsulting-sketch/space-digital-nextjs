'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STEPS = [
  {
    num: '01', total: '04',
    title: 'Discovery & Diagnosis',
    em: 'Diagnosis',
    desc: 'We start with a deep audit of your current digital footprint — paid media performance, organic visibility, CRM data, and conversion flow. No assumptions, no templates.',
    deliverables: ['Brand Audit', 'Competitor Mapping', 'Traffic Analysis', 'Conversion Audit'],
    color: '#FF6B2B',
    videoUrl: '/workflows/DDad.mp4',
  },
  {
    num: '02', total: '04',
    title: 'Strategy & Architecture',
    em: 'Architecture',
    desc: 'Every channel, system, and workflow is mapped against your growth target. We design the infrastructure before writing a single ad or building a single automation.',
    deliverables: ['Channel Strategy', 'System Blueprint', 'Automation Map', 'KPI Framework'],
    color: '#FF6B2B',
    videoUrl: '/workflows/SA.mp4',
  },
  {
    num: '03', total: '04',
    title: 'Deploy & Integrate',
    em: 'Integrate',
    desc: 'Campaigns launch, AI workflows go live, and systems integrate. Everything is calibrated for the first 30 days — iteration velocity is built into the deployment.',
    deliverables: ['Campaign Launch', 'Workflow Deployment', 'CRM Integration', '30-Day Calibration'],
    color: '#FF6B2B',
    videoUrl: '/workflows/DA.mp4',
  },
  {
    num: '04', total: '04',
    title: 'Compound & Scale',
    em: 'Scale',
    desc: 'Monthly performance reviews, continuous optimisation loops, and expansion into new channels or automation layers as results compound.',
    deliverables: ['Monthly Reporting', 'Ongoing Optimisation', 'Channel Expansion', 'System Evolution'],
    color: '#FF6B2B',
    videoUrl: '/workflows/CS.mp4',
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function ProcessCard({ step, i }: { step: typeof STEPS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.94, 1, 1, 0.94]);

  const title = step.title.replace(step.em, '');

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: `calc(6rem + ${i} * 1.5rem)`,
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
      }}
    >
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gridTemplateRows: isMobile ? 'auto auto' : '1fr',
          width: '100%',
          height: isMobile ? 'auto' : 480,
          background: 'rgb(20,20,22)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          overflow: 'hidden',
          transformOrigin: 'center top',
          boxShadow: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 -1px 0 0 rgba(0,0,0,0.3) inset, 0 40px 80px -24px rgba(0,0,0,0.7)',
          opacity,
          scale,
        }}
      >
        {/* VIDEO STRIP — top on mobile, right panel on desktop */}
        {isMobile ? (
          <div style={{
            position: 'relative',
            height: 180,
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            <video
              key={step.videoUrl}
              src={step.videoUrl}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              autoPlay muted loop playsInline preload="auto"
            />
            {/* Bottom fade into card body */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgb(20,20,22) 100%)', pointerEvents: 'none' }} />
          </div>
        ) : null}

        {/* TEXT CONTENT */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '2rem 1.5rem 2.5rem' : '2.75rem 3rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--signal)', display: 'inline-block', marginBottom: '1.25rem' }}>
            {step.num}
            <span style={{ color: 'var(--text-muted)', margin: '0 0.4rem' }}>/</span>
            {step.total}
          </span>

          <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.04em', color: 'var(--text)', margin: '0 0 1.25rem' }}>
            {title}
            <span style={{ color: 'var(--signal)', fontStyle: 'normal' }}>{step.em}</span>
          </h3>

          <p style={{ color: 'var(--text-soft)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '50ch', margin: '0 0 1.75rem' }}>
            {step.desc}
          </p>

          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem 1.25rem', margin: 0, padding: 0, listStyle: 'none' }}>
            {step.deliverables.map(d => (
              <li key={d} style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-faint)', flexShrink: 0, display: 'inline-block' }} />
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT VIDEO PANEL — desktop only */}
        {!isMobile && (
          <div style={{ background: 'var(--bg-elev)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video
              key={step.videoUrl}
              src={step.videoUrl}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              autoPlay muted loop playsInline preload="auto"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgb(20,20,22) 0%, transparent 25%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', width: 8, height: 8, borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 16px rgba(255,107,43,0.5)' }} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function Process() {
  const isMobile = useIsMobile();
  return (
    <section id="system" className="section-border" style={{ position: 'relative', background: 'var(--bg)' }}>
      <div className="inner" style={{ padding: isMobile ? '5rem 1.5rem 2rem' : '7rem 40px 3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
          <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            From Briefing to Results
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: '2rem', filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.045em', color: 'var(--text)', maxWidth: '22ch' }}
          >
            A system, not a{' '}
            <span style={{ color: 'var(--signal)', fontStyle: 'normal' }}>service.</span>
          </motion.h2>
        </div>
      </div>

      <div className="inner" style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '4rem' : '25vh', padding: isMobile ? '0 1.5rem 5rem' : '0 40px 5vh' }}>
        {STEPS.map((step, i) => <ProcessCard key={step.num} step={step} i={i} />)}
      </div>
    </section>
  );
}