'use client';

import { useEffect, useState, useRef } from 'react';

interface Props {
  scene: string;
  className?: string;
}

// ── Mobile Gyroscope Orb ─────────────────────────────────────────────────────
function GyroOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let touchX = 0;
    let touchY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    // Smooth lerp loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentX = lerp(currentX, touchX, 0.06);
      currentY = lerp(currentY, touchY, 0.06);

      if (orbRef.current) {
        orbRef.current.style.transform = `rotateY(${currentX * 25}deg) rotateX(${-currentY * 20}deg)`;
      }
      if (layer1.current) {
        layer1.current.style.transform = `translate(${currentX * 8}px, ${currentY * 6}px)`;
      }
      if (layer2.current) {
        layer2.current.style.transform = `translate(${currentX * 16}px, ${currentY * 12}px)`;
      }
      if (layer3.current) {
        layer3.current.style.transform = `translate(${currentX * 24}px, ${currentY * 18}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX * 30}px, ${currentY * 22}px)`;
        glowRef.current.style.opacity = `${0.4 + Math.abs(currentX) * 0.3 + Math.abs(currentY) * 0.3}`;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // Gyroscope handler
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // gamma = left/right tilt (-90 to 90), beta = front/back tilt (-180 to 180)
      const gamma = e.gamma ?? 0; // left/right
      const beta = (e.beta ?? 0) - 45; // subtract 45 so neutral hold maps to center

      touchX = Math.max(-1, Math.min(1, gamma / 30));
      touchY = Math.max(-1, Math.min(1, beta / 30));
    };

    // Touch drag fallback
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = (orbRef.current?.parentElement)?.getBoundingClientRect();
      if (!rect) return;
      touchX = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
      touchY = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const handleTouchEnd = () => {
      touchX = 0;
      touchY = 0;
    };

    // Request gyroscope permission (iOS 13+ requires it)
    if (typeof DeviceOrientationEvent !== 'undefined') {
      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      if (typeof DOE.requestPermission === 'function') {
        // iOS: request on first touch
        const requestOnTouch = () => {
          DOE.requestPermission!().then((state) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          });
          window.removeEventListener('touchstart', requestOnTouch);
        };
        window.addEventListener('touchstart', requestOnTouch, { once: true });
      } else {
        // Android / non-permission browsers: just listen
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{ perspective: '600px' }}
    >
      {/* Outer glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,43,0.25) 0%, transparent 70%)',
          filter: 'blur(30px)',
          transition: 'opacity 0.1s ease',
          opacity: 0.4,
        }}
      />

      {/* 3D orb container */}
      <div
        ref={orbRef}
        style={{
          position: 'relative',
          width: 220,
          height: 220,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.05s linear',
        }}
      >
        {/* Ring layer 1 — outer */}
        <div
          ref={layer1}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,107,43,0.15)',
            boxShadow: '0 0 40px rgba(255,107,43,0.08)',
          }}
        />

        {/* Ring layer 2 — mid */}
        <div
          ref={layer2}
          style={{
            position: 'absolute',
            inset: 20,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,107,43,0.25)',
            boxShadow: '0 0 24px rgba(255,107,43,0.12)',
          }}
        />

        {/* Ring layer 3 — inner */}
        <div
          ref={layer3}
          style={{
            position: 'absolute',
            inset: 44,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,107,43,0.4)',
            boxShadow: '0 0 16px rgba(255,107,43,0.2)',
          }}
        />

        {/* Core sphere */}
        <div
          style={{
            position: 'absolute',
            inset: 70,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 36%, rgba(255,107,43,0.35) 0%, rgba(255,107,43,0.08) 50%, transparent 75%)',
            border: '1px solid rgba(255,107,43,0.5)',
            boxShadow: '0 0 32px rgba(255,107,43,0.3), inset 0 0 20px rgba(255,107,43,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{
            fontFamily: 'var(--sans)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#FF6B2B',
            letterSpacing: '-0.04em',
            textShadow: '0 0 20px rgba(255,107,43,0.8)',
          }}>
            S
          </span>
        </div>

        {/* Orbiting dot */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          animation: 'orbitDot 4s linear infinite',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '100%',
            width: 6,
            height: 6,
            marginTop: -3,
            marginLeft: -3,
            borderRadius: '50%',
            background: '#FF6B2B',
            boxShadow: '0 0 12px #FF6B2B, 0 0 24px rgba(255,107,43,0.5)',
          }} />
        </div>

        {/* Scan line */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,107,43,0.6), transparent)',
            animation: 'scanLine 2.5s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* Hint text */}
      <div style={{
        position: 'absolute',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.55rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(255,107,43,0.4)',
        fontFamily: 'var(--mono)',
        whiteSpace: 'nowrap',
        animation: 'fadeHint 1s 2s ease forwards',
        opacity: 0,
      }}>
        Tilt to interact
      </div>

      <style>{`
        @keyframes orbitDot {
          from { transform: rotate(0deg) translateX(110px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
        }
        @keyframes scanLine {
          0%   { top: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fadeHint {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── Main SplineScene Export ───────────────────────────────────────────────────
export function SplineScene({ scene, className }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    if (!mobile) {
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
      return () => { script.remove(); };
    }
  }, [scene]);

  if (isMobile === null) return null;

  // Mobile: gyroscope + touch-drag reactive orb
  if (isMobile) {
    return (
      <div className={`${className ?? ''}`} style={{ position: 'relative' }}>
        <GyroOrb />
      </div>
    );
  }

  // Desktop: Spline web component
  return <div ref={canvasRef} className={className} />;
}