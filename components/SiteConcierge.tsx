'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTEXT_MATRIX: Record<string, string> = {
  "welcome": "Hey! I'm Spacey, your automated guide.",
  "hero": "This is our core geographic command track and high-performance digital systems manifesto, engineered directly out of Nairobi.",
  "stats": "Look at these proof points: an average 3.8× ROAS, 67% cut in cost-per-lead, and up to 82% autonomous call resolution.",
  "marketing": "Tier 1 Framework: Deploys high-intent SEO, optimized Google Ads, and custom social media marketing pipelines to capture lead traffic.",
  "automation": "Tier 2 Infrastructure: Advanced 24/7 autonomous voice and text agents built to instantly qualify and book traffic, eliminating bottlenecks.",
  "voice": "Our multi-lingual voice agent framework supports seamless English and Swahili customer coverage with sub-1s latency.",
  "integrations": "Deep architectural handshakes mapping directly into GoHighLevel CRMs, n8n workflow pipelines, and automated Calendly schedulers.",
  "pricing": "High-Value Retainer Structure: Flat $1,500 One-Time Setup Fee + $450/Month management, eliminating missed-call overhead and staff turnover.",
  "demo": "Launch Center Node: Hit the button to initiate a live browser voice call directly with me right now!",
  "form": "Strategic Intake Pipeline: Drop your operational variables here to feed our briefing dashboard instantly."
};

export function SiteConcierge() {
  const [bubbleText, setBubbleText] = useState(CONTEXT_MATRIX.welcome);
  const [showBubble, setShowBubble] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mouseStopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstLoadRef = useRef<boolean>(true);

  useEffect(() => {
    // 1. Strict First-Load Launch Greeting (Runs Exactly Once)
    setBubbleText(CONTEXT_MATRIX.welcome);
    setShowBubble(true);

    timeoutRef.current = setTimeout(() => {
      setShowBubble(false);
      setTimeout(() => {
        isFirstLoadRef.current = false;
      }, 200);
    }, 3000);

    const isMobile = () => window.innerWidth < 768;

    // Helper to evaluate text context based on the current element or section container
    const parseElementContext = (element: HTMLElement | null): string => {
      if (!element) return CONTEXT_MATRIX.hero; // Default to main pitch context if null

      // 1. Check for explicit tip tags first
      const explicitTip = element.closest('[data-concierge-tip]')?.getAttribute('data-concierge-tip');
      if (explicitTip && CONTEXT_MATRIX[explicitTip]) return CONTEXT_MATRIX[explicitTip];

      // 2. Intelligent section-container fallback lookup to keep context 100% accurate
      const closestSection = element.closest('section, div[id]');
      const sectionId = closestSection ? closestSection.id.toLowerCase() : '';

      // 3. Scan inner content text or parent text structures
      const fullText = (element.innerText || element.textContent || "").toLowerCase();
      const htmlId = (element.id || "").toLowerCase();
      const parentHtmlId = (element.parentElement?.id || "").toLowerCase();

      // Metrics and numbers tracking vectors
      if (fullText.includes('roas') || fullText.includes('%') || fullText.includes('metrics') || fullText.includes('proof')) return CONTEXT_MATRIX.stats;

      // Tier 1 vs Tier 2 explicit boundaries
      if (fullText.includes('tier 1') || fullText.includes('seo') || fullText.includes('ads') || fullText.includes('marketing')) return CONTEXT_MATRIX.marketing;
      if (fullText.includes('tier 2') || fullText.includes('agent') || fullText.includes('automation') || fullText.includes('autonomous')) return CONTEXT_MATRIX.automation;

      // Platform integration tracks
      if (fullText.includes('voice') || fullText.includes('swahili') || fullText.includes('english') || fullText.includes('verbeo')) return CONTEXT_MATRIX.voice;
      if (fullText.includes('n8n') || fullText.includes('gohighlevel') || fullText.includes('crm') || fullText.includes('calendly') || fullText.includes('integrate')) return CONTEXT_MATRIX.integrations;

      // Commercial pricing frames
      if (fullText.includes('1,500') || fullText.includes('450') || fullText.includes('pricing') || fullText.includes('setup') || fullText.includes('retainer')) return CONTEXT_MATRIX.pricing;

      // Conversion gate structures
      if (fullText.includes('demo') || fullText.includes('call') || fullText.includes('vapi') || fullText.includes('launch')) return CONTEXT_MATRIX.demo;
      if (fullText.includes('form') || fullText.includes('briefing') || fullText.includes('submit') || fullText.includes('input')) return CONTEXT_MATRIX.form;

      // 4. Section ID fallback matching logic so it NEVER speaks generic filler
      if (sectionId.includes('services') || htmlId.includes('services') || parentHtmlId.includes('services')) return CONTEXT_MATRIX.marketing;
      if (sectionId.includes('system') || sectionId.includes('features') || htmlId.includes('system')) return CONTEXT_MATRIX.voice;
      if (sectionId.includes('pricing') || sectionId.includes('roi') || htmlId.includes('pricing')) return CONTEXT_MATRIX.pricing;
      if (sectionId.includes('contact') || sectionId.includes('gateway') || htmlId.includes('contact')) return CONTEXT_MATRIX.demo;

      return CONTEXT_MATRIX.hero; // Master section context fallback
    };

    // 2. Mobile Touch & Scroll Vector Parser
    const handleMobileInteraction = (e: TouchEvent | Event) => {
      if (isFirstLoadRef.current || !isMobile()) return;

      let targetElement: HTMLElement | null = null;
      if ('touches' in e && e.touches.length > 0) {
        targetElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) as HTMLElement;
      }

      const matchedContext = parseElementContext(targetElement);
      setBubbleText(matchedContext);
      setShowBubble(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowBubble(false);
      }, 2000);
    };

    // 3. Desktop Exact Cursor-Stop System Tracker
    const handleDesktopMove = (e: MouseEvent) => {
      if (isFirstLoadRef.current || isMobile()) return;

      if (mouseStopTimerRef.current) clearTimeout(mouseStopTimerRef.current);

      const targetElement = e.target as HTMLElement;

      // When cursor stops moving for 120ms over an item, calculate the context instantly
      mouseStopTimerRef.current = setTimeout(() => {
        const matchedContext = parseElementContext(targetElement);
        setBubbleText(matchedContext);
        setShowBubble(true);
      }, 120);
    };

    const handleDesktopScrollHide = () => {
      if (!isMobile()) {
        setShowBubble(false); // Vanishes cleanly on desktop scroll to preserve visibility
        if (mouseStopTimerRef.current) clearTimeout(mouseStopTimerRef.current);
      } else {
        handleMobileInteraction(new Event('scroll'));
      }
    };

    window.addEventListener('scroll', handleDesktopScrollHide, { passive: true });
    window.addEventListener('touchstart', handleMobileInteraction, { passive: true });
    window.addEventListener('touchmove', handleMobileInteraction, { passive: true });
    window.addEventListener('mousemove', handleDesktopMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleDesktopScrollHide);
      window.removeEventListener('touchstart', handleMobileInteraction);
      window.removeEventListener('touchmove', handleMobileInteraction);
      window.removeEventListener('mousemove', handleDesktopMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (mouseStopTimerRef.current) clearTimeout(mouseStopTimerRef.current);
    };
  }, []);

  const handleAvatarManualTrigger = () => {
    if (isFirstLoadRef.current) return;
    const currentTip = lastActiveTipRef.current;
    setBubbleText(CONTEXT_MATRIX[currentTip] || CONTEXT_MATRIX.hero);
    setShowBubble(prev => !prev);
  };

  return (
    <div className="fixed bottom-[92px] right-6 md:bottom-6 md:right-6 z-[9999] flex flex-col items-end gap-2.5 font-sans pointer-events-auto">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative mr-1 max-w-[245px] p-4 bg-zinc-950 border border-white/10 rounded-2xl text-[11px] text-zinc-300 shadow-[0_12px_45px_rgba(0,0,0,0.98)] backdrop-blur-md select-none leading-relaxed text-left"
          >
            <div className="absolute bottom-[-5px] right-4.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-zinc-950" />
            <div className="absolute bottom-[-6px] right-4.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white/10 -z-10" />

            <div className="flex justify-between items-center gap-4 mb-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#FF6B2B] font-semibold">
                System Assistant
              </span>
            </div>

            {bubbleText}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleAvatarManualTrigger}
        className="w-12 h-12 flex items-center justify-center cursor-pointer select-none p-0 bg-transparent border-0 outline-none shadow-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF6B2B"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 drop-shadow-[0_0_8px_rgba(255,107,43,0.3)]"
        >
          <circle cx="12" cy="12" r="9" className="opacity-20" stroke="currentColor" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
          <circle cx="12" cy="12" r="1.5" fill="#FF6B2B" />
          <circle cx="12" cy="5" r="1" fill="#FF6B2B" />
          <circle cx="12" cy="19" r="1" fill="#FF6B2B" />
          <circle cx="5" cy="12" r="1" fill="#FF6B2B" />
          <circle cx="19" cy="12" r="1" fill="#FF6B2B" />
        </svg>
      </motion.div>
    </div>
  );
}