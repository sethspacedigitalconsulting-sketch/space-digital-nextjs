'use client';
import { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const WORKS = [
  { num: '01', name: 'Ulnar Medical', tag: 'Healthcare · Web', year: '2024', url: 'https://www.ulnar-medical.com/', desc: 'OB/GYN clinic brand & web presence, Nairobi' },
  { num: '02', name: 'Wibify Agency',  tag: 'Digital Agency · Web', year: '2024', url: 'https://wibify.agency/en', desc: 'Global agency positioning & web architecture' },
  { num: '03', name: 'Meta Ads — 3.8× ROAS', tag: 'Paid Media', year: '2024', url: '#', desc: '67% CPL reduction within 60 days' },
  { num: '04', name: 'TikTok — 214% Reach', tag: 'Content · Paid', year: '2024', url: '#', desc: 'Hook-rate optimisation & audience segmentation' },
  { num: '05', name: 'Google Local — 94% Map Pack', tag: 'SEO · Google Ads', year: '2024', url: '#', desc: 'Nairobi healthcare client, top-3 placement' },
];

function TextRoll({ text, isHovered }: { text: string; isHovered: boolean }) {
  const letters = text.split('');
  return (
    <span style={{ display: 'inline-block', verticalAlign: 'bottom', lineHeight: 0.95, position: 'relative', overflow: 'hidden' }}>
      {/* Original row */}
      <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', '--i': i } as React.CSSProperties}
            animate={{ y: isHovered ? '-105%' : '0%' }}
            transition={{ duration: 0.52, ease: [0.7,0,0.3,1], delay: i * 0.014 }}
          >{ch === ' ' ? ' ' : ch}</motion.span>
        ))}
      </span>
      {/* Clone row (signal color, slides in from bottom) */}
      <span style={{ position: 'absolute', inset: 0, display: 'block', whiteSpace: 'nowrap' }}>
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', color: 'var(--signal)' }}
            animate={{ y: isHovered ? '0%' : '105%' }}
            transition={{ duration: 0.52, ease: [0.7,0,0.3,1], delay: i * 0.014 }}
          >{ch === ' ' ? ' ' : ch}</motion.span>
        ))}
      </span>
    </span>
  );
}

export function Works() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [previewActive, setPreviewActive] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 28 });

  const sectionRef = useRef<HTMLElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX + 24);
    mouseY.set(e.clientY - 60);
  }

  return (
    <section
      ref={sectionRef}
      className="section-border works"
      style={{ background: 'var(--bg)', padding: '128px 0 112px', position: 'relative' }}
      onMouseMove={handleMouseMove}
    >
      <div className="inner">
        {/* Head */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '4.5rem' }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: '2rem', filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.1 }}
            style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.25rem, 6.5vw, 5.25rem)', fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.045em', color: 'var(--text)', whiteSpace: 'nowrap' }}
          >
            Proof in the{' '}
            <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--signal)' }}>numbers.</em>
          </motion.h2>
        </div>

        {/* List */}
        <ul style={{ borderTop: '1px solid var(--border)', margin: 0, padding: 0, listStyle: 'none' }}>
          {WORKS.map((work, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <motion.li
                key={work.num}
                style={{ borderBottom: '1px solid var(--border)', position: 'relative' }}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.6, ease: [0.16,1,0.3,1], delay: i * 0.07 }}
              >
                {/* Signal top-border line on hover */}
                <motion.div
                  style={{ position: 'absolute', top: -1, left: 0, height: 1, background: 'var(--signal)', originX: 0 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
                />
                <a
                  href={work.url}
                  target={work.url !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  onMouseEnter={() => { setHoveredIndex(i); setPreviewActive(true); }}
                  onMouseLeave={() => { setHoveredIndex(null); setPreviewActive(false); }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr auto auto auto',
                    alignItems: 'baseline',
                    gap: '2.5rem',
                    padding: isHovered ? '2.25rem 0.5rem 2.25rem 2.25rem' : '2.25rem 0.5rem',
                    color: 'var(--text)',
                    cursor: 'none',
                    transition: 'padding 0.55s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>{work.num}</span>
                  <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.65rem, 4.5vw, 3.25rem)', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.04em', margin: 0 }}>
                    <TextRoll text={work.name} isHovered={isHovered} />
                  </h3>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{work.tag}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>{work.year}</span>
                  <motion.span
                    style={{ fontFamily: 'var(--mono)', fontSize: '1.05rem', color: isHovered ? 'var(--signal)' : 'var(--text-muted)' }}
                    animate={{ x: isHovered ? 4 : 0, y: isHovered ? -4 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
                  >↗</motion.span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Cursor preview card */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 420, height: 280,
          overflow: 'hidden', pointerEvents: 'none', zIndex: 90,
          x: springX, y: springY,
          opacity: previewActive ? 1 : 0,
          background: 'rgba(20,20,22,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 64px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        transition={{ opacity: { duration: 0.4, ease: [0.16,1,0.3,1] } }}
      >
        {hoveredIndex !== null && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '0.5rem' }}>
              {WORKS[hoveredIndex].name}
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              {WORKS[hoveredIndex].desc}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
