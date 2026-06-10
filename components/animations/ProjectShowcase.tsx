'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export interface ShowcaseProject {
  title: string;
  description: string;
  year: string;
  link: string;
  imageUrl?: string;
  tag?: string;
}

interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
  heading?: string;
}

export function ProjectShowcase({ projects, heading = 'Selected Work' }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  const lerp = (s: number, e: number, f: number) => s + (e - s) * f;

  useEffect(() => {
    const animate = () => {
      setSmoothPos((prev) => ({
        x: lerp(prev.x, mousePos.x, 0.14),
        y: lerp(prev.y, mousePos.y, 0.14),
      }));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [mousePos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const containerRect = containerRef.current?.getBoundingClientRect();

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', padding: '0' }}
    >
      {/* Floating image preview */}
      <div
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          left: (containerRect?.left ?? 0),
          top: (containerRect?.top ?? 0),
          transform: `translate3d(${smoothPos.x + 24}px, ${smoothPos.y - 110}px, 0)`,
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.85,
          transition: 'opacity 0.28s ease, scale 0.28s ease',
          zIndex: 200,
          borderRadius: 12,
          overflow: 'hidden',
          width: 300, height: 190,
          border: '1px solid var(--border)',
          background: 'var(--bg-raised)',
        }}
      >
        {projects.map((p, i) => (
          <div
            key={p.title}
            style={{
              position: 'absolute', inset: 0,
              opacity: hoveredIndex === i ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            {p.imageUrl ? (
              <img
                src={p.imageUrl}
                alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover',
                  filter: hoveredIndex === i ? 'none' : 'blur(8px)',
                  transform: hoveredIndex === i ? 'scale(1)' : 'scale(1.08)',
                  transition: 'filter 0.4s ease, transform 0.4s ease' }}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
              }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--text-muted)' }}>{p.title}</span>
              </div>
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.4) 0%, transparent 60%)' }} />
          </div>
        ))}
      </div>

      {/* Heading */}
      <p style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
        {heading}
      </p>

      {/* Project list */}
      <div>
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block' }}
            onMouseEnter={() => { setHoveredIndex(index); setVisible(true); }}
            onMouseLeave={() => { setHoveredIndex(null); setVisible(false); }}
          >
            <div style={{
              padding: '1.6rem 0',
              borderTop: '1px solid var(--border)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem',
              background: hoveredIndex === index ? 'rgba(255,107,43,0.025)' : 'transparent',
              transition: 'background 0.3s ease',
              marginLeft: hoveredIndex === index ? '-1.5rem' : '0',
              paddingLeft: hoveredIndex === index ? '1.5rem' : '0',
            }}>
              <div style={{ flex: 1 }}>
                {project.tag && (
                  <span style={{
                    display: 'inline-block', fontSize: '0.58rem', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'var(--signal)',
                    border: '1px solid var(--signal-dim)', padding: '0.2rem 0.6rem',
                    marginBottom: '0.6rem', borderRadius: 2,
                  }}>{project.tag}</span>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--serif)', fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                    fontWeight: 600, color: 'var(--text)', lineHeight: 1.1,
                    position: 'relative',
                  }}>
                    {project.title}
                    <span style={{
                      position: 'absolute', left: 0, bottom: -2, height: 1,
                      background: 'var(--text)',
                      width: hoveredIndex === index ? '100%' : '0%',
                      transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1)',
                    }} />
                  </h3>
                  <span style={{
                    fontSize: '1.1rem', color: 'var(--signal)',
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index ? 'translate(0,0)' : 'translate(-8px, 8px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                  }}>â†—</span>
                </div>
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 300,
                  color: hoveredIndex === index ? 'rgba(240,237,232,0.6)' : 'var(--text-muted)',
                  marginTop: '0.4rem', lineHeight: 1.7,
                  transition: 'color 0.3s ease',
                }}>
                  {project.description}
                </p>
              </div>
              <span style={{
                fontFamily: 'var(--sans)', fontSize: '0.7rem', color: 'var(--text-dim)',
                letterSpacing: '0.06em', marginTop: '0.2rem', flexShrink: 0,
              }}>{project.year}</span>
            </div>
          </a>
        ))}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>
    </section>
  );
}
