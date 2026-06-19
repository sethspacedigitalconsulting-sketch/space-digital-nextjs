'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Props {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);

    // Only inject the heavy WebGL engine script if the user is on desktop
    if (window.innerWidth >= 768) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.5/build/spline-viewer.js';
      script.type = 'module';
      script.onload = () => {
        if (!canvasRef.current) return;
        canvasRef.current.innerHTML = '';
        const viewer = document.createElement('spline-viewer');
        viewer.setAttribute('url', scene);
        viewer.style.width = '100%';
        viewer.style.height = '100%';
        canvasRef.current.appendChild(viewer);
      };
      document.head.appendChild(script);
      return () => {
        script.remove();
        window.removeEventListener('resize', checkViewport);
      };
    }

    return () => window.removeEventListener('resize', checkViewport);
  }, [scene]);

  if (isMobile === null) return null;

  // Mobile Blueprint: Pinned right, completely darkened for structural contrast
  if (isMobile) {
    return (
      <div className={`${className ?? ''} flex justify-end items-center relative w-full h-full overflow-hidden pr-2`}>
        {/* Hardware-accelerated image container box wrapper */}
        <div className="relative w-[85%] h-[80%] max-w-[360px] aspect-square opacity-85">
          <Image
            src="/workflows/splinemobile.png"
            alt="Space Digital AI Workflow Node Architecture"
            fill
            priority
            sizes="(max-w: 768px) 100vw, 50vw"
            className="object-contain object-right"
          />

          {/* ── AMBIENT CONTRAST DARKENER OVERLAY ── */}
          {/* This layer tints the image asset back so your headline text pops cleanly */}
          <div className="absolute inset-0 bg-[#0a0a0b]/40 mix-blend-multiply pointer-events-none rounded-xl" />
        </div>
      </div>
    );
  }

  // Desktop Baseline: Render the clean target container node canvas with branding mask
  return (
    <>
      <div ref={canvasRef} className={`${className ?? ''} relative spline-clean-container`} />
      <style jsx global>{`
        .spline-clean-container spline-viewer {
          position: relative;
        }
        /* Expanded mask box to entirely cover and block the external logo link */
        .spline-clean-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 180px;
          height: 56px;
          background: #0a0a0b;
          z-index: 50;
          pointer-events: auto;
        }
      `}</style>
    </>
  );
}