'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTEXT_MATRIX: Record<string, string> = {
  "welcome": "Hey! I'm Spacey, your automated guide.",
  "fallback": "Hi! I am Spacey. Drop down to the System Gateway section below to launch your live dynamic voice demo instantly!",
  "hero-location": "You are looking at our core geographic command track. We handle digital growth campaigns and rapid automated voice deployments directly out of Nairobi, Kenya for the local East African market.",
  "hero-headline": "This is the Space Digital core manifesto. We build bespoke digital growth mechanics paired with intelligent automation loops for companies that move faster than their industry.",
  "hero-stats": "Look at these operational proof points: our systems hit an average 3.8× ROAS, cut client cost-per-lead by 67%, and process automated voice call resolution up to 82%.",
  "tier-marketing": "Our Tier 1 system handles top-of-funnel capture: advanced local SEO mapping, hyper-targeted Google Ads, and custom social media marketing pipelines designed to flood your business with high-intent incoming leads.",
  "tier-automation": "Our high-value Tier 2 infrastructure: 24/7 autonomous voice and text agents built to instantly qualify, track, and book incoming traffic. This completely eliminates missed-call bottlenecks and staff turnover.",
  "platform-voice": "Our voice deployment framework is powered by advanced, low-latency multilingual voice platforms, giving your company seamless English and Swahili customer coverage.",
  "platform-integrations": "We map our automated systems directly into your existing stack—connecting seamlessly with GoHighLevel CRMs, n8n workflow pipelines, custom internal databases, and automated Calendly schedulers.",
  "pricing-setup": "Our high-value onboarding model runs a flat $1,500 One-Time Setup Fee. This covers building your bespoke database matrix, scripting voice conversational tracks, and managing platform handshakes.",
  "pricing-management": "Ongoing operations run a flat $450/month management retainer. This covers continuous prompt engineering optimization, database maintenance, tracking analytical logs, and updating flow parameters.",
  "vapi-demo": "You've reached our active real-time call center demonstration node. Hit the action button below to launch an immediate browser-based live call directly with me with under ~1s latency!",
  "briefing-form": "This is our strategic data intake channel. Drop your company variables and call bottlenecks directly into this form layout to feed our team's operational briefing dashboard instantly."
};

export function SiteConcierge() {
  const [bubbleText, setBubbleText] = useState(CONTEXT_MATRIX.welcome);
  const [showBubble, setShowBubble] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActiveTipRef = useRef<string>("welcome");
  const isFirstLoadRef = useRef<boolean>(true);

  useEffect(() => {
    // 1. Initial Welcome Trigger Phase
    setShowBubble(true);
    timeoutRef.current = setTimeout(() => {
      setShowBubble(false);
      isFirstLoadRef.current = false;
    }, 3000);

    const isMobile = () => window.innerWidth < 768;

    const resetMobileTimeout = () => {
      if (!isMobile()) return;
      setShowBubble(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowBubble(false);
      }, 2000);
    };

    // 2. Intersection Observer tracking loop for Mobile Viewports
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tip = entry.target.getAttribute('data-concierge-tip');
            if (tip && CONTEXT_MATRIX[tip]) {
              lastActiveTipRef.current = tip;
              if (isMobile() && !isFirstLoadRef.current) {
                setBubbleText(CONTEXT_MATRIX[tip]);
              }
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '-20% 0px -30% 0px' }
    );

    const scanAndObserveElements = () => {
      document.querySelectorAll('[data-concierge-tip]').forEach((el) => {
        observer.observe(el);
      });
    };

    const scanTimeout = setTimeout(scanAndObserveElements, 800);

    // 3. Global Interaction Management Trackers
    const handleGlobalScroll = () => {
      if (isMobile()) {
        const currentTip = lastActiveTipRef.current;
        if (CONTEXT_MATRIX[currentTip] && !isFirstLoadRef.current) {
          setBubbleText(CONTEXT_MATRIX[currentTip]);
        }
        resetMobileTimeout();
      } else {
        // Desktop behavior: vanishes instantly when scrolling occurs
        setShowBubble(false);
      }
    };

    const handleGlobalTouch = () => {
      if (isMobile()) {
        const currentTip = lastActiveTipRef.current;
        if (CONTEXT_MATRIX[currentTip] && !isFirstLoadRef.current) {
          setBubbleText(CONTEXT_MATRIX[currentTip]);
        }
        resetMobileTimeout();
      }
    };

    // 4. Premium Desktop Move/Hover Scanner targeting every detailed asset element
    const handleDesktopHoverScan = (e: MouseEvent) => {
      if (isMobile()) return;
      const target = e.target as HTMLElement;
      const closestElement = target.closest('[data-concierge-tip]');

      if (closestElement) {
        const tip = closestElement.getAttribute('data-concierge-tip');
        if (tip && CONTEXT_MATRIX[tip]) {
          isFirstLoadRef.current = false;
          lastActiveTipRef.current = tip;
          setBubbleText(CONTEXT_MATRIX[tip]);
          setShowBubble(true);
        }
      }
    };

    window.addEventListener('scroll', handleGlobalScroll, { passive: true });
    window.addEventListener('touchstart', handleGlobalTouch, { passive: true });
    window.addEventListener('mouseover', handleDesktopHoverScan, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleGlobalScroll);
      window.removeEventListener('touchstart', handleGlobalTouch);
      window.removeEventListener('mouseover', handleDesktopHoverScan);
      observer.disconnect();
      clearTimeout(scanTimeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAvatarManualTrigger = () => {
    isFirstLoadRef.current = false;
    const currentTip = lastActiveTipRef.current;
    setBubbleText(CONTEXT_MATRIX[currentTip] || CONTEXT_MATRIX.fallback);
    setShowBubble(prev => !prev);
  };

  return (
    <div
      className="fixed bottom-[92px] right-6 md:bottom-6 md:right-6 z-[9999] flex flex-col items-end gap-2.5 font-sans pointer-events-auto"
      onMouseEnter={() => {
        if (window.innerWidth >= 768) {
          isFirstLoadRef.current = false;
          const currentTip = lastActiveTipRef.current;
          setBubbleText(CONTEXT_MATRIX[currentTip] || CONTEXT_MATRIX.fallback);
          setShowBubble(true);
        }
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 768) setShowBubble(false);
      }}
    >
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative mr-1 max-w-[245px] p-4 bg-zinc-950 border border-white/10 rounded-2xl text-[11px] text-zinc-300 shadow-[0_12px_45px_rgba(0,0,0,0.98)] backdrop-blur-md select-none leading-relaxed text-left"
          >
            {/* Direct Mouth-Trail Speech Pointers pointing flawlessly right onto the borderless logo face */}
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

      {/* ── Completely Borderless, Raw Transparent Image Node Component ── */}
      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleAvatarManualTrigger}
        className="w-12 h-12 flex items-center justify-center cursor-pointer select-none p-0 bg-transparent border-0 outline-none shadow-none"
      >
        <img
          src="/workflows/botemoji.png"
          alt="Space Digital Concierge"
          className="w-full h-full object-contain pointer-events-none"
        />
      </motion.div>
    </div>
  );
}