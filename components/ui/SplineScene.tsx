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

  // Mobile Blueprint: Renders your exact crisp Spline Robot PNG with zero framework lag
  if (isMobile) {
    return (
      <div className={`${className ?? ''} flex items-center justify-center relative w-full h-full overflow-hidden`}>
        <div className="relative w-full h-[80%] max-w-[400px] aspect-square transition-all duration-700 ease-out opacity-90 animate-pulse" style={{ animationDuration: '4s' }}>
          <Image
            src="/workflows/splinessssss.png"
            alt="Space Digital AI Workflow Node Architecture"
            fill
            priority
            sizes="(max-w: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  // Desktop Baseline: Render the container and apply a global stylesheet injection to mask the logo link node
  return (
    <>
      <div ref={canvasRef} className={`${className ?? ''} relative spline-clean-container`} />
      <style jsx global>{`
        .spline-clean-container spline-viewer {
          position: relative;
        }
        /* Cover and block pointer access to the fixed logo tag placement safely */
        .spline-clean-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 140px;
          height: 48px;
          background: #0a0a0b; /* Coordinates perfectly with your background matrix color */
          z-index: 40;
          pointer-events: auto;
        }
      `}</style>
    </>
  );
}