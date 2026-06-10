'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, type PanInfo } from 'framer-motion';

export interface StackItem {
  id: number;
  element: React.ReactNode;
  label: string;
  sublabel?: string;
}

interface VerticalImageStackProps {
  items: StackItem[];
}

export function VerticalImageStack({ items }: VerticalImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastNavTime = useRef(0);
  const navCooldown = 400;

  const navigate = useCallback((dir: number) => {
    const now = Date.now();
    if (now - lastNavTime.current < navCooldown) return;
    lastNavTime.current = now;
    setCurrentIndex((prev) => {
      if (dir > 0) return prev === items.length - 1 ? 0 : prev + 1;
      return prev === 0 ? items.length - 1 : prev - 1;
    });
  }, [items.length]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y < -50) navigate(1);
    else if (info.offset.y > 50) navigate(-1);
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    if (Math.abs(e.deltaY) > 30) navigate(e.deltaY > 0 ? 1 : -1);
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const getCardStyle = (index: number) => {
    const total = items.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0)  return { y: 0,    scale: 1,    opacity: 1,   zIndex: 5, rotateX: 0 };
    if (diff === -1) return { y: -170, scale: 0.82, opacity: 0.55, zIndex: 4, rotateX: 8 };
    if (diff === -2) return { y: -290, scale: 0.70, opacity: 0.28, zIndex: 3, rotateX: 14 };
    if (diff === 1)  return { y: 170,  scale: 0.82, opacity: 0.55, zIndex: 4, rotateX: -8 };
    if (diff === 2)  return { y: 290,  scale: 0.70, opacity: 0.28, zIndex: 3, rotateX: -14 };
    return { y: diff > 0 ? 420 : -420, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 };
  };

  const isVisible = (index: number) => {
    const total = items.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Counter left */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
        <span style={{ fontFamily: 'var(--serif)', fontSize: '3.5rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.03em' }}>
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <div style={{ width: 32, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 300 }}>
          {String(items.length).padStart(2, '0')}
        </span>
      </div>

      {/* Card stack */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 520, width: 360, perspective: '1200px' }}
      >
        {items.map((item, index) => {
          if (!isVisible(index)) return null;
          const style = getCardStyle(index);
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{ cursor: isCurrent ? 'grab' : 'default', zIndex: style.zIndex, transformStyle: 'preserve-3d' }}
              animate={{ y: style.y, scale: style.scale, opacity: style.opacity, rotateX: style.rotateX }}
              transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 1 }}
              drag={isCurrent ? 'y' : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.18}
              onDragEnd={handleDragEnd}
            >
              <div
                style={{
                  width: 320, height: 440,
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  boxShadow: isCurrent
                    ? '0 30px 60px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,43,0.08)'
                    : '0 10px 30px -10px rgba(0,0,0,0.4)',
                }}
              >
                {item.element}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Nav dots right */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: 6,
              height: i === currentIndex ? 28 : 6,
              borderRadius: 9999,
              background: i === currentIndex ? 'var(--signal)' : 'var(--text-dim)',
              border: 'none',
              transition: 'height 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
            }}
            aria-label={`Go to ${i + 1}`}
          />
        ))}
      </div>

      {/* Label below */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}
        >
          {items[currentIndex]?.label}
        </motion.p>
        {items[currentIndex]?.sublabel && (
          <motion.p
            key={`sub-${currentIndex}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            style={{ fontSize: '0.62rem', color: 'var(--text-dim)', letterSpacing: '0.1em', marginTop: 4 }}
          >
            {items[currentIndex].sublabel}
          </motion.p>
        )}
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 right-12 flex items-center gap-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Drag or scroll</span>
      </motion.div>
    </div>
  );
}
