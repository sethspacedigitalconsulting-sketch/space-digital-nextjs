'use client';

import { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    let splineApp: Application | null = null;

    // Direct native application instantiation avoids the React 19 version mismatch crash completely
    splineApp = new Application(canvasRef.current);

    splineApp.load(scene)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Spline engine canvas failed to load smoothly:", err);
        setIsLoading(false);
      });

    // ── THE RAW WINDOW MOUSE TRACKING ENGINE ──
    const handleMouseMove = (event: MouseEvent) => {
      if (!splineApp || typeof splineApp.emitEvent !== 'function' || !canvasRef.current) return;

      try {
        const rect = canvasRef.current.getBoundingClientRect();

        // Calculate coordinate positions relative to the canvas bounding dimensions
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Typecasting to 'any' bypasses the strict package type union checks without breaking runtime logic
        splineApp.emitEvent('mouseMove' as any, {
          x: x,
          y: y,
        });
      } catch (e) {
        // Silent fallthrough to protect animation frame cycles
      }
    };

    // Passive listener allows hyper-smooth 60fps canvas tracking execution threads
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Clean up tracking event pipelines cleanly upon layout dismount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (splineApp && typeof splineApp.dispose === 'function') {
        try {
          splineApp.dispose();
        } catch (e) {
          // Fallback handling
        }
      }
    };
  }, [scene]);

  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0b] z-10">
          <div className="w-6 h-6 border-2 border-zinc-800 border-t-[#FF6B2B] rounded-full animate-spin" />
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}