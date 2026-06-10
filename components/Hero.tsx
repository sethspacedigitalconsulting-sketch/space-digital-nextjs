'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SplineScene } from '@/components/ui/SplineScene';
import { Spotlight } from '@/components/ui/spotlight';

// Exact word stagger from wibify: base 0.60s + index × 80ms
const WORDS = ['Systems', 'for', 'brands', 'that', 'refuse', 'to', 'look', 'ordinary.'];
const WORD_BASE = 0.60;
const WORD_STEP = 0.08;

// Underline paths — word indices 2 ("brands") and 6 ("look")
const UNDERLINE_DELAYS = [1.94, 2.30];

const STATS = [
  { value: '3.8×', label: 'Avg ROAS' },
  { value: '67%',  label: 'CPL Reduction' },
  { value: '94%',  label: 'Map Pack Top-3' },
  { value: '82%',  label: 'AI Call Resolution' },
];

export function Hero() {
  const ul1 = useRef<SVGPathElement>(null);
  const ul2 = useRef<SVGPathElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => ul1.current?.classList.add('draw'), UNDERLINE_DELAYS[0] * 1000);
    const t2 = setTimeout(() => ul2.current?.classList.add('draw'), UNDERLINE_DELAYS[1] * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section id="home" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

      {/* ── Spotlight ── */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(255,107,43,0.4)" />

      {/* ── Spline 3D — right half ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex', pointerEvents: 'none' }}>
        <div style={{ flex: 1 }} />
        <div style={{ flex: 1, position: 'relative' }}>
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* ── heroLightIntro + heroLightBreathe ─── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        animation: 'heroLightIntro 1s 0.15s cubic-bezier(0.22,1,0.36,1) forwards, heroLightBreathe 3.6s 1.2s ease-in-out infinite',
        opacity: 0,
        background: 'radial-gradient(ellipse 70% 55% at 68% 28%, rgba(255,107,43,0.22) 0%, transparent 65%)',
        transform: 'scale(1.25) translate(-3%, -2%)',
      }} />
      {/* Slower secondary orb — always looping from 0s */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        animation: 'heroLightBreathe2 8s 0s ease-in-out infinite',
        background: 'radial-gradient(ellipse 45% 35% at 20% 75%, rgba(255,107,43,0.10) 0%, transparent 65%)',
      }} />

      {/* Hero overlay gradient — exact wibify values */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: [
          'radial-gradient(140% 90% at 30% 55%, rgba(0,0,0,0) 0%, rgba(10,10,11,0.45) 75%)',
          'linear-gradient(rgba(10,10,11,0.50) 0%, rgba(10,10,11,0.15) 25%, rgba(10,10,11,0.45) 65%, rgba(10,10,11,0.96) 100%)',
        ].join(', '),
      }} />

      {/* Vertical scan line */}
      <div style={{
        position: 'absolute', right: '4rem', top: '20%', bottom: '20%',
        width: 1, zIndex: 2,
        background: 'linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)',
        overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 60,
          background: 'linear-gradient(to bottom, transparent, var(--signal), transparent)',
          animation: 'scanV 4s ease-in-out 2s infinite',
        }} />
      </div>

      {/* ── Content ── */}
      <div className="inner" style={{ position: 'relative', zIndex: 3, paddingTop: 128, paddingBottom: 84 }}>

        {/* Eyebrow — rise at 0.70s */}
        <motion.p
          className="eyebrow"
          style={{ marginBottom: '2.5rem', color: 'var(--signal)' }}
          initial={{ opacity: 0, filter: 'blur(8px)', y: '2.5rem' }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, ease: [0.16,1,0.3,1], delay: 0.70 }}
        >
          Space Digital &amp; AI Consulting — Nairobi, Kenya
        </motion.p>

        {/* Headline — wordRise, base 0.60s + i×80ms */}
        <h1 style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(3rem, 6vw, 5.5rem)',
          fontWeight: 600,
          lineHeight: 0.96,
          letterSpacing: '-0.045em',
          color: 'var(--text)',
          maxWidth: '14ch',
          marginBottom: '2.4rem',
        }}>
          {WORDS.map((word, i) => {
            const isLast = i === WORDS.length - 1;
            // Put underline 1 under "brands" (i=2), underline 2 under "look" (i=6)
            const hasUnderline = i === 2 || i === 6;
            const ulRef = i === 2 ? ul1 : i === 6 ? ul2 : null;

            return (
              <motion.span
                key={i}
                style={{ display: 'inline-block', position: 'relative', marginRight: '0.22em' }}
                initial={{ opacity: 0, filter: 'blur(6px)', y: '0.5em' }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: WORD_BASE + i * WORD_STEP }}
              >
                {isLast
                  ? <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.025em' }}>{word}</em>
                  : word}

                {hasUnderline && (
                  <svg
                    aria-hidden="true"
                    style={{ position: 'absolute', bottom: -6, left: -2, width: 'calc(100% + 4px)', height: 10, overflow: 'visible', pointerEvents: 'none' }}
                    viewBox="0 0 220 10" preserveAspectRatio="none"
                  >
                    <path
                      ref={ulRef}
                      d="M2,7 C30,3 70,9 110,6 C150,3 190,8 218,5"
                      stroke="var(--signal)" strokeWidth="2.4" fill="none"
                      strokeLinecap="round"
                      strokeDasharray="400" strokeDashoffset="400"
                      style={{
                        transition: 'stroke-dashoffset 1.4s cubic-bezier(0.65,0,0.35,1)',
                        filter: 'drop-shadow(rgba(255,107,43,0.35) 0 1px 6px)',
                      }}
                    />
                  </svg>
                )}
              </motion.span>
            );
          })}
        </h1>

        {/* Sub — rise at 1.00s */}
        <motion.p
          style={{ fontSize: 16.8, fontWeight: 400, lineHeight: 1.5, color: 'var(--text-soft)', maxWidth: '44ch', marginBottom: '2.8rem', fontFamily: 'var(--sans)' }}
          initial={{ opacity: 0, filter: 'blur(8px)', y: '2.5rem' }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, ease: [0.16,1,0.3,1], delay: 1.00 }}
        >
          High-performance digital marketing fused with intelligent AI automation.
          Engineered for companies moving faster than their industry.
        </motion.p>

        {/* Actions — rise at 1.15s */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}
          initial={{ opacity: 0, filter: 'blur(8px)', y: '2.5rem' }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, ease: [0.16,1,0.3,1], delay: 1.15 }}
        >
          <a href="mailto:seth.spacedigitalconsulting@gmail.com" className="btn btn-accent">
            Initiate a Briefing <span className="arrow">→</span>
          </a>
          <a href="#ecosystem" className="btn">
            Explore the System <span className="arrow">→</span>
          </a>
        </motion.div>

        {/* Stats bar — rise at 1.40s */}
        <motion.div
          style={{
            display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
          }}
          initial={{ opacity: 0, filter: 'blur(8px)', y: '2.5rem' }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, ease: [0.16,1,0.3,1], delay: 1.40 }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text)' }}>
                {value}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10.56, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes heroLightIntro {
          100% { opacity: 0.51; transform: scale(1) translate(0px, 0px); }
        }
        @keyframes heroLightBreathe {
          0%, 100% { opacity: 0.51; }
          50%       { opacity: 1; }
        }
        @keyframes heroLightBreathe2 {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 0.9; }
        }
        .draw { stroke-dashoffset: 0 !important; }
      `}</style>
    </section>
  );
}
