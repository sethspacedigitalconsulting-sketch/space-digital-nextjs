'use client';

import { useEffect, useState, useRef } from 'react';

interface Props {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    if (!mobile) {
      // 1. Inject the official viewer script directly into the DOM window runtime thread
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.5/build/spline-viewer.js';
      script.type = 'module';

      script.onload = () => {
        if (!canvasRef.current) return;

        // 2. Clear out any prior elements inside the canvas container parent block
        canvasRef.current.innerHTML = '';

        // 3. Dynamically instantiate the HTML custom element node context
        const viewer = document.createElement('spline-viewer');
        viewer.setAttribute('url', scene);
        viewer.style.width = '100%';
        viewer.style.height = '100%';

        canvasRef.current.appendChild(viewer);
      };

      document.head.appendChild(script);

      return () => {
        script.remove();
      };
    }
  }, [scene]);

  // Before mount: return nothing to prevent server hydration mismatches
  if (isMobile === null) return null;

  // Mobile Blueprint: Render zero WebGL nodes, use hardware-accelerated CSS rings instead
  if (isMobile) {
    return (
      <div className={`${className || ''} flex items-center justify-center`}>
        <div className="relative w-56 h-56">
          <div
            className="absolute inset-0 rounded-full border border-orange-500/20 animate-ping"
            style={{ animationDuration: '3s' }}
          />
          <div
            className="absolute inset-6 rounded-full border border-orange-500/30 animate-ping"
            style={{ animationDuration: '2.4s', animationDelay: '0.4s' }}
          />
          <div
            className="absolute inset-12 rounded-full border border-orange-500/50 animate-ping"
            style={{ animationDuration: '1.8s', animationDelay: '0.8s' }}
          />
          <div className="absolute inset-16 rounded-full bg-orange-500/10 flex items-center justify-center">
            <span className="text-[#FF6B2B] text-3xl font-bold tracking-tight">S</span>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Baseline: Render the clean target container node canvas
  return <div ref={canvasRef} className={className} />;
}