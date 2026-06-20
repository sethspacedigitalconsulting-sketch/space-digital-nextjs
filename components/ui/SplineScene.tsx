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

  // Mobile Blueprint: Fully lightened, natural, crisp original asset colors
  if (isMobile) {
    return (
      <div className="absolute inset-0 w-full h-full min-h-screen overflow-hidden">
        <Image
          src="/workflows/splinemobile.png"
          alt="Space Digital Background Matrix"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-100" /* Boosted to 100% to display its natural native color */
        />
      </div>
    );
  }

  return (
    <>
      <div ref={canvasRef} className={`${className ?? ''} relative spline-clean-container`} />
      <style jsx global>{`
        .spline-clean-container spline-viewer {
          position: relative;
        }
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