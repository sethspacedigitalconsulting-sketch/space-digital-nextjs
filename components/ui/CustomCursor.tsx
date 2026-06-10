'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px';
        dotRef.current.style.top  = mouseY + 'px';
      }
    };

    let rafId: number;
    const animRing = () => {
      ringX += (mouseX - ringX) * 0.10;
      ringY += (mouseY - ringY) * 0.10;
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top  = ringY + 'px';
      }
      rafId = requestAnimationFrame(animRing);
    };
    rafId = requestAnimationFrame(animRing);

    const onEnter = () => {
      dotRef.current?.classList.add('hovered');
      ringRef.current?.classList.add('hovered');
    };
    const onLeave = () => {
      dotRef.current?.classList.remove('hovered');
      ringRef.current?.classList.remove('hovered');
    };

    document.addEventListener('mousemove', onMove);

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
