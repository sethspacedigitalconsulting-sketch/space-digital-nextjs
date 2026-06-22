'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';
import { useMousePosition } from '@/components/hooks/use-mouse-position';
import { MagneticText } from '@/components/ui/morphing-cursor';
import { SplineScene } from '@/components/ui/SplineScene';

const WORDS = ['Systems', 'for', 'brands', 'that', 'refuse', 'to', 'look', 'ordinary.'];
const HOVER_WORDS = ['INTELLIGENT', 'ENGINEERED', 'FOR SMBs', 'SCALING', '24/7 LEAD', 'GENERATION', 'ROAS DRIVEN', 'AUTOMATION.'];

const WORD_BASE = 0.60;
const WORD_STEP = 0.08;
const UNDERLINE_DELAYS = [1.94, 2.30];

const STATS = [
  { value: '3.8×', label: 'Avg ROAS' },
  { value: '67%', label: 'CPL Reduction' },
  { value: '94%', label: 'Map Pack Top-3' },
  { value: '82%', label: 'AI Call Resolution' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ul1 = useRef<SVGPathElement>(null);
  const ul2 = useRef<SVGPathElement>(null);
  const { x, y } = useMousePosition(containerRef);

  useEffect(() => {
    const t1 = setTimeout(() => ul1.current?.classList.add('draw'), UNDERLINE_DELAYS[0] * 1000);
    const t2 = setTimeout(() => ul2.current?.classList.add('draw'), UNDERLINE_DELAYS[1] * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full overflow-hidden flex flex-col justify-center select-none font-sans"
      style={{ minHeight: '100vh', backgroundColor: '#0a0a0b' }}
    >
      <style>{`
        .draw { stroke-dashoffset: 0 !important; }
      `}</style>

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(255,107,43,0.4)" />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        animation: 'heroLightIntro 1s 0.15s cubic-bezier(0.22,1,0.36,1) forwards, heroLightBreathe 3.6s 1.2s ease-in-out infinite',
        opacity: 0,
        background: 'radial-gradient(ellipse 70% 55% at 68% 28%, rgba(255,107,43,0.22) 0%, transparent 65%)',
        transform: 'scale(1.25) translate(-3%, -2%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        animation: 'heroLightBreathe2 8s 0s ease-in-out infinite',
        background: 'radial-gradient(ellipse 45% 35% at 20% 75%, rgba(255,107,43,0.10) 0%, transparent 65%)',
      }} />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: [
          'radial-gradient(140% 90% at 30% 55%, rgba(0,0,0,0) 0%, rgba(10,10,11,0.45) 75%)',
          'linear-gradient(rgba(10,10,11,0.50) 0%, rgba(10,10,11,0.15) 25%, rgba(10,10,11,0.45) 65%, rgba(10,10,11,0.96) 100%)',
        ].join(', '),
      }} />

      {/* ── FULL SCREEN BACKDROP CONTAINER OVERHAUL ── */}
      <div className="absolute inset-0 z-0 md:z-2 md:flex pointer-events-none md:pointer-events-auto">
        <div className="hidden md:flex md:flex-1 pointer-events-none" />
        <div className="absolute inset-0 md:relative md:flex-1 w-full h-full hue-rotate-180 saturate-200">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="hidden md:block" style={{
        position: 'absolute', right: '4rem', top: '15%', bottom: '15%',
        width: 1, zIndex: 3,
        background: 'linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)',
        overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 60,
          background: 'linear-gradient(to bottom, transparent, var(--signal), transparent)',
          animation: 'scanV 4s ease-in-out 2s infinite',
        }} />
      </div>

      <div className="hidden md:block absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div
          className="absolute h-px bg-orange-500/15 left-0 right-0 -translate-y-1/2 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(255,107,43,0.2)]"
          style={{ top: `${y}px` }}
        />
        <div
          className="absolute w-px bg-orange-500/15 top-0 bottom-0 -translate-x-1/2 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(255,107,43,0.2)]"
          style={{ left: `${x}px` }}
        />
        <div
          className="absolute w-1.5 h-1.5 bg-[#FF6B2B] rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-out shadow-[0_0_12px_#FF6B2B]"
          style={{ top: `${y}px`, left: `${x}px` }}
        />
      </div>

      <div className="inner relative z-20 pt-36 pb-12 w-full max-w-7xl mx-auto px-6 pointer-events-none">
        <motion.p
          className="text-xs uppercase tracking-widest font-mono mb-8 pointer-events-auto"
          style={{ color: 'var(--signal)' }}
          initial={{ opacity: 0, filter: 'blur(8px)', y: '2.5rem' }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.70 }}
          data-concierge-tip="hero-location"
        >
          Space Digital &amp; AI Consulting — Nairobi, Kenya
        </motion.p>

        <h1
          className="select-none mb-12 text-left text-white pointer-events-auto max-w-xl lg:max-w-2xl"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            lineHeight: '1.12',
            letterSpacing: '-0.02em'
          }}
          data-concierge-tip="hero-headline"
        >
          {WORDS.map((word, i) => {
            const hasUnderline = i === 2 || i === 6;
            const ulRef = i === 2 ? ul1 : i === 6 ? ul2 : null;

            return (
              <motion.span
                key={i}
                className="inline-block relative mr-[0.28em] mb-[0.08em]"
                initial={{ opacity: 0, filter: 'blur(6px)', y: '0.5em' }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: WORD_BASE + i * WORD_STEP }}
              >
                <MakeMagneticText text={word} hoverText={HOVER_WORDS[i]} />

                {hasUnderline && (
                  <svg
                    aria-hidden="true"
                    className="absolute overflow-visible pointer-events-none left-0"
                    style={{ bottom: -2, width: 'calc(100% + 4px)', height: 10 }}
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

        <motion.div
          className="mb-10 max-w-xl pointer-events-auto"
          initial={{ opacity: 0, filter: 'blur(8px)', y: '2.5rem' }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.00 }}
          data-concierge-tip="hero-headline"
        >
          <div className="text-base md:text-lg font-light leading-relaxed text-zinc-400">
            <MagneticText text="High-performance digital marketing" hoverText="DATA-DRIVEN SYSTEMS" className="text-base md:text-lg text-zinc-400 inline-block font-normal" /> fused with intelligent AI automation. Engineered for companies moving faster than their industry.
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-4 flex-wrap mb-14 pointer-events-auto"
          initial={{ opacity: 0, filter: 'blur(8px)', y: '2.5rem' }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}
        >
          <a href="#contact" className="btn btn-accent px-6 py-3 rounded-xl font-medium bg-[#FF6B2B] text-zinc-950 transition-transform duration-200 hover:scale-[1.03]">
            Initiate a Briefing →
          </a>
          <a href="#system" className="btn px-6 py-3 rounded-xl font-medium border border-zinc-800 text-white transition-colors duration-200 hover:bg-zinc-900">
            Explore the System →
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-10 pt-8 border-t border-zinc-900 pointer-events-auto"
          initial={{ opacity: 0, filter: 'blur(8px)', y: '2.5rem' }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.30 }}
          data-concierge-tip="hero-stats"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-white tabular-nums">
                {value}
              </span>
              <span className="text-[10px] tracking-wider uppercase font-mono text-zinc-500">
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
      `}</style>
    </section>
  );
}

function MakeMagneticText({ text, hoverText }: { text: string; hoverText: string }) {
  return <MagneticText text={text} hoverText={hoverText} />;
}