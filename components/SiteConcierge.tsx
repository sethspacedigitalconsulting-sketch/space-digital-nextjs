'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTEXT_MATRIX: Record<string, string> = {
  // Onboarding Greeting Node (Fires once on mount/refresh)
  "welcome": "Hey! I'm Spacey, your automated guide.",

  // 1. Hero Strategy Contexts (MAPPED TO #home Elements)
  "hero": "This is our core geographic command track and high-performance digital systems manifesto, engineered directly out of Nairobi.",
  "stats": "Look at these proof points: an average 3.8× ROAS, 67% cut in cost-per-lead, and up to 82% autonomous call resolution.",

  // 2. Production Case Studies Contexts (MAPPED TO YOUR EXACT PROOF_ITEMS IN #work)
  "case-ulnar": "Ulnar Medical Clinic Case: We deployed advanced Clinical SEO strategy and clean bespoke layouts to position them in local top search brackets.",
  "case-wibify": "Wibify Agency Case: A high-performance conversion engine designed to turn high-intent incoming traffic into active consulting pipelines.",
  "case-meta": "Conversion Campaign Study: Meta Ads optimized for automated lead loops, delivering a verified 3.8× Return on Ad Spend.",
  "case-tiktok": "Velocity Growth Matrix Case: Rapid TikTok traffic funnels expanding organic brand reach up to 214% for client acquisition.",
  "case-google": "Geo Intent Optimization Case: Strategic Google Local optimization pulling client listings into 94% of top-3 Map Pack placements.",

  // 3. System Architecture & Tech Stack (MAPPED TO #ecosystem / #system)
  "marketing": "Tier 1 Framework: Deploys high-intent SEO, optimized Google Ads, and custom social media marketing pipelines to capture lead traffic.",
  "automation": "Tier 2 Infrastructure: Advanced 24/7 autonomous voice and text agents built to instantly qualify and book traffic, eliminating bottlenecks.",
  "voice": "Our multi-lingual voice agent framework supports seamless English and Swahili customer coverage with sub-1s latency via Verbeo.ai platforms.",
  "integrations": "Deep architectural handshakes mapping directly into GoHighLevel CRMs, n8n workflow pipelines, and automated Calendly schedulers.",

  // 4. Commercial Frameworks (MAPPED TO #systems / PERKS)
  "pricing": "High-Value Retainer Structure: Flat $1,500 One-Time Setup Fee + $450/Month management, eliminating missed-call overhead and receptionist staff turnover.",

  // 5. Conversion Interface Blocks (MAPPED TO #contact / #about / #faq)
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
    // 1. Strict First-Load Launch Greeting (Runs Exactly Once per refresh)
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
      if (!element) return CONTEXT_MATRIX.hero;

      // A. Check for explicit tip tags first (captures your active case study links instantly)
      const explicitTip = element.closest('[data-concierge-tip]')?.getAttribute('data-concierge-tip');
      if (explicitTip && CONTEXT_MATRIX[explicitTip]) return CONTEXT_MATRIX[explicitTip];

      // B. Intelligent section container lookup mapped exactly to your layout ids
      const closestSection = element.closest('section, div[id], li');
      const sectionId = closestSection ? closestSection.id.toLowerCase() : '';

      // C. Scan inner text strings or parent structural markup parameters
      const fullText = (element.innerText || element.textContent || "").toLowerCase();
      const htmlId = (element.id || "").toLowerCase();
      const parentHtmlId = (element.parentElement?.id || "").toLowerCase();

      // Core Performance Metrics & Numbers
      if (fullText.includes('roas') || fullText.includes('%') || fullText.includes('reduction') || fullText.includes('resolution') || fullText.includes('stats')) return CONTEXT_MATRIX.stats;

      // Production Project Cards
      if (fullText.includes('ulnar')) return CONTEXT_MATRIX["case-ulnar"];
      if (fullText.includes('wibify')) return CONTEXT_MATRIX["case-wibify"];
      if (fullText.includes('meta')) return CONTEXT_MATRIX["case-meta"];
      if (fullText.includes('tiktok')) return CONTEXT_MATRIX["case-tiktok"];
      if (fullText.includes('map pack') || fullText.includes('google local')) return CONTEXT_MATRIX["case-google"];

      // Service Tier and Core Delivery Mechanics
      if (fullText.includes('tier 1') || fullText.includes('seo') || fullText.includes('marketing')) return CONTEXT_MATRIX.marketing;
      if (fullText.includes('tier 2') || fullText.includes('agent') || fullText.includes('automation') || fullText.includes('autonomous')) return CONTEXT_MATRIX.automation;

      // Platform Technical Infrastructure
      if (fullText.includes('voice') || fullText.includes('swahili') || fullText.includes('english') || fullText.includes('verbeo')) return CONTEXT_MATRIX.voice;
      if (fullText.includes('n8n') || fullText.includes('gohighlevel') || fullText.includes('crm') || fullText.includes('calendly') || fullText.includes('integrate')) return CONTEXT_MATRIX.integrations;

      // Commercial Retainers & Calculator Features
      if (fullText.includes('1,500') || fullText.includes('450') || fullText.includes('pricing') || fullText.includes('setup') || fullText.includes('retainer') || fullText.includes('calculator')) return CONTEXT_MATRIX.pricing;

      // Action Pipeline Blocks
      if (fullText.includes('demo') || fullText.includes('call') || fullText.includes('vapi') || fullText.includes('launch')) return CONTEXT_MATRIX.demo;
      if (fullText.includes('form') || fullText.includes('briefing') || fullText.includes('submit') || fullText.includes('input')) return CONTEXT_MATRIX.form;

      // D. Clean Section Parent ID structural fallbacks (No generic strings allowed)
      if (sectionId === 'work' || htmlId.includes('work') || parentHtmlId.includes('work')) return CONTEXT_MATRIX["case-ulnar"];
      if (sectionId === 'ecosystem' || htmlId.includes('ecosystem')) return CONTEXT_MATRIX.marketing;
      if (sectionId === 'system' || htmlId.includes('system')) return CONTEXT_MATRIX.automation;
      if (sectionId === 'systems' || htmlId.includes('systems') || sectionId.includes('perks')) return CONTEXT_MATRIX.pricing;
      if (sectionId === 'contact' || htmlId.includes('contact')) return CONTEXT_MATRIX.demo;

      return CONTEXT_MATRIX.hero;
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

    // 3. Desktop Cursor Position-Stop Scanner
    const handleDesktopMove = (e: MouseEvent) => {
      if (isFirstLoadRef.current || isMobile()) return;

      if (mouseStopTimerRef.current) clearTimeout(mouseStopTimerRef.current);

      const targetElement = e.target as HTMLElement;

      // Triggers context updating exactly 120ms after cursor motion halts over a node
      mouseStopTimerRef.current = setTimeout(() => {
        const matchedContext = parseElementContext(targetElement);
        setBubbleText(matchedContext);
        setShowBubble(true);
      }, 120);
    };

    const handleDesktopScrollHide = () => {
      if (!isMobile()) {
        setShowBubble(false); // Disappears instantly on desktop scroll wheel vectors
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

      {/* ── Completely Borderless Vector Node Avatar Asset ── */}
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