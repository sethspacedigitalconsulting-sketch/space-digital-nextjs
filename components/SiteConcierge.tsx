'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SiteConcierge() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 font-sans pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative mr-2 max-w-[250px] p-4 bg-zinc-950 border border-white/10 rounded-2xl text-[11px] text-zinc-300 shadow-[0_12px_40px_rgba(0,0,0,0.9)] backdrop-blur-md select-none leading-relaxed"
          >
            {/* ── Direct Mouth-Trail Speech Pointers ── */}
            {/* Inner background fill triangle */}
            <div className="absolute bottom-[-6px] right-4.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-zinc-950" />
            {/* Outer border depth stroke triangle */}
            <div className="absolute bottom-[-7px] right-4.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/10 -z-10" />

            <div className="flex justify-between items-center gap-4 mb-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#FF6B2B] font-semibold">
                System Assistant
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-600 hover:text-zinc-400 font-mono text-[10px] transition-colors p-0.5"
              >
                ✕
              </button>
            </div>
            
            Hi! I'm Spacey. Head down to the System Gateway section below to initiate your active live voice briefing demo instantly!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Bot Avatar Node */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-zinc-850 flex items-center justify-center text-xl shadow-[0_4px_24px_rgba(0,0,0,0.7)] cursor-pointer border border-white/10 select-none transition-colors"
      >
        🤖
      </motion.div>
    </div>
  );
}