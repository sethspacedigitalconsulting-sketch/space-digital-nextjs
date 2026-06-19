'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { NavTabsAnimation, NavTabItem } from '@/components/ui/nav-tabs-animation';

const SYSTEM_NAV_ITEMS: NavTabItem[] = [
  {
    href: '#ecosystem',
    ariaLabel: 'Ecosystem',
    tooltip: 'Ecosystem',
    color: '#FF6B2B',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] svg-draw-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    href: '#work',
    ariaLabel: 'Work',
    tooltip: 'Work',
    color: '#FF6B2B',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] svg-draw-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '#systems',
    ariaLabel: 'Systems',
    tooltip: 'Systems',
    color: '#FF6B2B',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] svg-draw-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    href: '#about',
    ariaLabel: 'About',
    tooltip: 'About',
    color: '#FF6B2B',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] svg-draw-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

export function Nav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ opacity: 0, y: '-130%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="fixed top-6 left-0 right-0 z-[1000] flex justify-center pointer-events-none px-2 md:px-0"
    >
      {/* ── CORE MENU ROW CAP CONTAINER ── */}
      <div className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-2xl bg-zinc-950/70 border border-white/5 backdrop-blur-xl pointer-events-auto select-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-[calc(100%-1.5rem)] md:w-auto justify-between md:justify-start">

        {/* ── LOGO CONTAINER — Entirely static, edge-to-edge layout bounds ── */}
        <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-xl border border-[#FF6B2B]/20 bg-[#FF6B2B]/5 overflow-hidden flex items-center justify-center shrink-0">
          <a
            href="#home"
            className="relative w-full h-full block"
            aria-label="Home"
          >
            <Image
              src="/workflows/logo.png"
              alt="Space Digital logo"
              fill
              className="object-cover"
              priority
            />
          </a>
        </div>

        {/* ── NAVIGATION LINK ROW ── */}
        <div className="flex justify-center items-center flex-1 md:flex-initial">
          <NavTabsAnimation
            items={SYSTEM_NAV_ITEMS}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>

        {/* ── BRIEFING CTA BUTTON ── */}
        <a
          href="#contact"
          className="btn btn-accent tracking-wide text-[0.68rem] md:text-[0.72rem] px-3.5 md:px-5 h-9 md:h-11 inline-flex items-center rounded-xl font-semibold bg-[#FF6B2B] text-zinc-950 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,43,0.4)] shrink-0"
        >
          Get in Touch
        </a>
      </div>

      {/* ── VECTOR ANIMATION STYLES ── */}
      <style>{`
        .svg-draw-icon path, .svg-draw-icon circle, .svg-draw-icon polyline {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: drawLines 3s ease-in-out infinite alternate;
        }
        .icon-active .svg-draw-icon path, .group:hover .svg-draw-icon path {
          animation: drawLines 1.2s ease-in-out infinite alternate !important;
        }
        @keyframes drawLines {
          0% { stroke-dashoffset: 60; }
          40% { stroke-dashoffset: 15; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </motion.nav>
  );
}