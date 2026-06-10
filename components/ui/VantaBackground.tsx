'use client';
import { useEffect, useRef } from 'react';

interface VantaEffect {
  destroy: () => void;
}

export function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const THREE = await import('three');
      const VANTA = (await import('vanta/dist/vanta.net.min')).default;

      if (cancelled || !containerRef.current) return;

      effectRef.current = VANTA({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xFF6B2B,        // --signal orange
        backgroundColor: 0x0a0a0b, // --bg
        points: 9,
        maxDistance: 22,
        spacing: 18,
        showDots: true,
      });
    }

    init();

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  );
}
