'use client';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

/* ─── Workflow node cards ─── */
function WorkflowCard({ title, tag, description, nodes, color }: {
  title: string; tag: string; description: string; nodes: string[]; color: string;
}) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0d0d0d',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 16, padding: '2rem',
      display: 'flex', flexDirection: 'column', gap: '1.2rem',
      overflow: 'hidden', position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: color }} />
      <div>
        <span style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color, fontFamily: 'var(--sans)' }}>{tag}</span>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', fontWeight: 600, color: 'var(--text)', marginTop: '0.4rem', lineHeight: 1.15 }}>{title}</h3>
      </div>
      <p style={{ fontSize: '0.78rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--text-muted)', fontFamily: 'var(--sans)' }}>{description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
        {nodes.map((n, i) => (
          <span key={i} style={{
            fontSize: '0.6rem', letterSpacing: '0.08em',
            color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '0.3rem 0.65rem', borderRadius: 4,
            fontFamily: 'var(--sans)',
          }}>{n}</span>
        ))}
      </div>
    </div>
  );
}

const WORKFLOWS = [
  {
    title: 'Social Media Auto-Poster',
    tag: 'n8n Automation',
    description: 'One workflow. Three platforms. Zero stress. AI generates the image, writes the caption, and publishes to Facebook, LinkedIn, and Instagram simultaneously — all triggered on a schedule.',
    nodes: ['Schedule Trigger', 'AI Agent', 'DALL-E Image Gen', 'Post to Facebook', 'Post to LinkedIn', 'Post to Instagram', 'Gmail Notify', 'Google Sheets Log'],
    color: '#FF6B2B',
  },
  {
    title: 'Lead Gen Outreach Engine',
    tag: 'n8n Automation',
    description: "A week's worth of outreach in 20 minutes. Scrapes LinkedIn, researches each company with Perplexity AI, drafts personalised emails with DeepSeek V3.1, finds verified contacts, and sends — all automatically.",
    nodes: ['Webhook Trigger', 'LinkedIn Scraper', 'Perplexity Research', 'DeepSeek Email Draft', 'Prospeo Email Finder', 'Skrapp Email Finder', 'Send Gmail', 'Airtable Update'],
    color: '#4ADE80',
  },
  {
    title: 'Intelligent Lead Router',
    tag: 'Zapier Automation',
    description: 'From form submission to task assignment — fully automated. Routes incoming leads to the right sales team, calculates follow-up deadlines, and creates Trello cards with due dates in seconds.',
    nodes: ['Google Forms', 'Code: +3 Business Days', 'Path Split', 'Assign: Sales Team A', 'Assign: Sales Team B', 'Trello Card + Deadline'],
    color: '#818CF8',
  },
];

export function AIWorkflows() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });

  const scale0 = useTransform(scrollYProgress, [0, 1], [1, 4.5]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 8]);

  const positions = [
    { top: '50%', left: '50%', translate: '-50% -50%', width: '34vw', height: '46vh' },
    { top: '20%', left: '10%', width: '26vw', height: '36vh' },
    { top: '55%', left: '62%', width: '26vw', height: '36vh' },
  ];
  const scales = [scale0, scale1, scale2];

  return (
    <section className="section-border" id="work" style={{ padding: 0 }}>
      {/* Section header */}
      <div style={{ padding: '8rem 4rem 4rem' }}>
        <motion.p className="section-tag"
          initial={{ opacity: 0, y: '2rem' }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}>
          03 — AI Systems
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: '2.5rem', filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }} transition={{ duration: 0.95, ease: [0.16,1,0.3,1], delay: 0.1 }}
          style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.12, maxWidth: '26ch' }}>
          Intelligent systems.<br /><em style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Built to scale without you.</em>
        </motion.h2>
      </div>

      {/* ZoomParallax viewport */}
      <div ref={container} style={{ position: 'relative', height: '280vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          {WORKFLOWS.map((wf, i) => (
            <motion.div
              key={i}
              style={{ scale: scales[i], position: 'absolute', ...positions[i] as React.CSSProperties }}
            >
              <WorkflowCard {...wf} />
            </motion.div>
          ))}
          {/* Overlay label */}
          <div style={{
            position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Scroll to explore systems</p>
          </div>
        </div>
      </div>
    </section>
  );
}
