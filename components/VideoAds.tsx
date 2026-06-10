'use client';
import { motion } from 'framer-motion';
import { VerticalImageStack, type StackItem } from './animations/VerticalImageStack';

function VideoCard({ title, platform, description, pinUrl }: {
  title: string; platform: string; description: string; pinUrl: string;
}) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(145deg, #111 0%, #0d0d0d 100%)',
    }}>
      {/* Dark overlay pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,107,43,0.02) 0px, rgba(255,107,43,0.02) 1px, transparent 1px, transparent 10px)',
      }} />
      {/* Top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--signal)' }} />

      {/* Play button */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -60%)',
        width: 64, height: 64, borderRadius: '50%',
        border: '1px solid var(--signal-dim)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,107,43,0.08)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--signal)">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 100%)' }}>
        <span style={{ fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--signal)', fontFamily: 'var(--sans)' }}>{platform}</span>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)', marginTop: '0.3rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: '0.72rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.6, fontFamily: 'var(--sans)' }}>{description}</p>
        <a href={pinUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--signal)', marginTop: '0.8rem', border: '1px solid var(--signal-dim)', padding: '0.35rem 0.75rem' }}>
          Watch â†—
        </a>
      </div>
    </div>
  );
}

const VIDEO_ITEMS: StackItem[] = [
  {
    id: 1,
    label: 'Video Ad 01 â€” AI & Automation',
    sublabel: 'Content Production',
    element: (
      <VideoCard
        title="AI Automation Showcase"
        platform="Video Ad Â· Pinterest"
        description="Demonstrating how n8n workflows eliminate repetitive tasks and scale operations instantly."
        pinUrl="https://pin.it/4b6eaI9Uy"
      />
    ),
  },
  {
    id: 2,
    label: 'Video Ad 02 â€” Digital Strategy',
    sublabel: 'Content Production',
    element: (
      <VideoCard
        title="Digital Marketing in Action"
        platform="Video Ad Â· Pinterest"
        description="High-performance paid media campaigns engineered for conversion yield, not vanity metrics."
        pinUrl="https://pin.it/1crAZHIdB"
      />
    ),
  },
  {
    id: 3,
    label: 'Video Ad 03 â€” Brand Systems',
    sublabel: 'Content Production',
    element: (
      <VideoCard
        title="Brand System Architecture"
        platform="Video Ad Â· Pinterest"
        description="From content strategy to distribution â€” a full-stack creative pipeline built for modern brands."
        pinUrl="https://pin.it/21UDsWBGK"
      />
    ),
  },
];

export function VideoAds() {
  return (
    <section className="section-border" style={{ padding: 0 }}>
      {/* Header */}
      <div style={{ padding: '8rem 4rem 0' }}>
        <motion.p className="section-tag"
          initial={{ opacity: 0, y: '2rem' }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}>
          04 â€” Content Production
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: '2.5rem', filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }} transition={{ duration: 0.95, ease: [0.16,1,0.3,1], delay: 0.1 }}
          style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.12, maxWidth: '24ch' }}>
          Content engineered<br /><em style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>for attention.</em>
        </motion.h2>
      </div>

      {/* Stack */}
      <VerticalImageStack items={VIDEO_ITEMS} />
    </section>
  );
}
