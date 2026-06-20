'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function SiteConcierge() {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tipText, setTipText] = useState("");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHoveringElement, setIsHoveringElement] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const desktopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const mobileTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const currentTargetRef = useRef<string | null>(null);

    // The Master Website Context Dictionary - Built directly from your component files
    const getContextInfo = (tag: string): string => {
        switch (tag) {
            // ── 1. HERO SECTION SPECIFIC BLOCKS ──
            case 'section-hero':
                return "You are looking at our command headline. We build high-performance digital marketing systems fused with intelligent AI automation, explicitly engineered for companies moving faster than their industry legacy models.";
            case 'hero-stats':
                return "Our core baseline validation data parameters. We consistently deliver a 3.8× average Return on Ad Spend, achieve an immediate 67% reduction in client Cost-Per-Lead metrics, and maintain a 94% win rate inside local Google Map Pack Top-3 placements.";

            // ── 2. WORKS / PROOF SECTION SPECIFIC BLOCKS ──
            case 'section-work':
                return "Welcome to our Proof Engine. This list showcases production systems engineered between 2024 and 2026. Hover over any client name to instantly stream live ad video previews directly adjacent to your cursor frame.";
            case 'case-ulnar':
                return "Case File: Ulnar Medical Clinic. We deployed full frontend clinical SEO architecture and synchronized active calendar hooks to bridge patient acquisition traffic directly into automated booking panels.";
            case 'case-wibify':
                return "Case File: Wibify Agency. An elite inbound web engine optimized to turn cold traffic streams into qualified, recurring consulting contract pipeline volume with near-zero friction.";
            case 'case-meta':
                return "Case File: Meta Ads Framework. The active media reel demonstrating a verified 3.8× Return on Ad Spend. We surgically isolate high-intent target clients across hyper-targeted regional ad sets.";
            case 'case-tiktok':
                return "Case File: TikTok Velocity Matrix. A specialized short-form campaign strategy that reached 214% reach expansion. Engineered around algorithmic hook saturation mechanics for rapid audience scaling.";
            case 'case-google':
                return "Case File: Google Local pack optimization. Geo-intent infrastructure designed to position specialized service providers at the structural pinnacle of localized regional queries.";

            // ── 3. EXPERTISE / FOUR DISCIPLINES SECTIONS ──
            case 'section-ecosystem':
                return "Our Four Disciplines Matrix. Discipline 1 is Market Resonance (SEO & Paid Ads). Discipline 2 is Operational Velocity, where we integrate n8n workflows, CRM automation pipelines, and advanced 24/7 AI Voice systems.";
            case 'discipline-creative':
                return "Discipline 3: Content Production. Short-form video assets engineered strictly around algorithmic hook rates and user retention metrics to drive monetization conversions rather than mere aesthetics.";
            case 'discipline-web':
                return "Discipline 4: Brand Architecture. Web experiences built from the ground up to establish premium authority, optimize UX design paths, and securely capture incoming prospect metrics.";

            // ── 4. PROCESS / CARDS SECTION ──
            case 'section-process':
                return "Our 4-Step Operational System. Step 1 is Discovery & Diagnosis (Deep Audit). Step 2 is Strategy & Architecture (Mapping blueprints before code). Step 3 is Deploy & Integrate, and Step 4 is Compound & Scale.";

            // ── 5. CALCULATOR SECTIONS ──
            case 'section-systems':
                return "The Financial ROI Calculator. The traditional marketing tier scales visibility, but our high-value AI Automation setup ($1,500 setup + $450/month) completely self-funds by capturing leaked leads and eliminating missed calls.";

            // ── 6. CONTACT GATEWAY BLOCKS ──
            case 'section-contact':
                return "The Space Digital Ingestion Gateway. Submit your business variables via our Intake form, or test our live voice channel by initializing a real-time call frame with our agent Spacey.";
            case 'vapi-demo':
                return "Live Telemetry Node: Spacey Voice Agent. Powered by custom low-latency frameworks, this agent answers instantly (~1s), qualifies enterprise leads, and connects into active database schedulers around the clock.";

            default:
                return "Navigating Space Digital infrastructure. Hover your pointer or scroll across sections to unpack our automated pipelines.";
        }
    };

    useEffect(() => {
        const checkDevice = () => setIsMobile(window.innerWidth < 768);
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    useEffect(() => {
        // ── DESKTOP IDLE DETECTION SCANNER ──
        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth >= 768) {
                setMousePos({ x: e.clientX + 15, y: e.clientY + 15 });
                setIsVisible(false);
                if (desktopTimeoutRef.current) clearTimeout(desktopTimeoutRef.current);

                const target = e.target as HTMLElement;
                const closestTip = target.closest('[data-concierge-tip]');
                const tipType = closestTip ? closestTip.getAttribute('data-concierge-tip') : null;

                desktopTimeoutRef.current = setTimeout(() => {
                    let resolvedTip = tipType;

                    // Ultra-accurate scroll tracking map based directly on your page.tsx ids
                    if (!resolvedTip) {
                        const scrollY = window.scrollY;
                        if (scrollY < 650) resolvedTip = 'section-hero';
                        else if (scrollY >= 650 && scrollY < 1700) resolvedTip = 'section-work';
                        else if (scrollY >= 1700 && scrollY < 2600) resolvedTip = 'section-ecosystem';
                        else if (scrollY >= 2600 && scrollY < 3400) resolvedTip = 'section-process';
                        else if (scrollY >= 3400 && scrollY < 4200) resolvedTip = 'section-systems';
                        else resolvedTip = 'section-contact';
                    }

                    currentTargetRef.current = resolvedTip;
                    setIsHoveringElement(!!closestTip);
                    setTipText(getContextInfo(resolvedTip));
                    setIsVisible(true);
                    setIsLoading(true);

                    setTimeout(() => setIsLoading(false), 220);
                }, 80); // Quick 80ms stop-check window
            }
        };

        // ── MOBILE GESTURAL SCREEN CONTACT TIMING ──
        const handleTouchStart = (e: TouchEvent) => {
            if (window.innerWidth < 768) {
                if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);

                const target = e.target as HTMLElement;
                const closestTip = target.closest('[data-concierge-tip]');
                const tipType = closestTip ? closestTip.getAttribute('data-concierge-tip') : null;

                let resolvedTip = tipType;
                if (!resolvedTip) {
                    const scrollY = window.scrollY;
                    if (scrollY < 550) resolvedTip = 'section-hero';
                    else if (scrollY >= 550 && scrollY < 1450) resolvedTip = 'section-work';
                    else if (scrollY >= 1450 && scrollY < 2300) resolvedTip = 'section-ecosystem';
                    else if (scrollY >= 2300 && scrollY < 3200) resolvedTip = 'section-process';
                    else if (scrollY >= 3200 && scrollY < 3900) resolvedTip = 'section-systems';
                    else resolvedTip = 'section-contact';
                }

                currentTargetRef.current = resolvedTip;
                setIsHoveringElement(!!closestTip);
                setTipText(getContextInfo(resolvedTip));
                setIsVisible(true);
                setIsLoading(true);

                setTimeout(() => setIsLoading(false), 180);
            }
        };

        const handleTouchEnd = () => {
            if (window.innerWidth < 768) {
                mobileTimeoutRef.current = setTimeout(() => {
                    setIsVisible(false);
                }, 1200); // Disappears shortly after scroll/touch breaks
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            if (desktopTimeoutRef.current) clearTimeout(desktopTimeoutRef.current);
            if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    style={
                        isMobile
                            ? {
                                position: 'fixed',
                                bottom: '110px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                pointerEvents: 'none',
                                zIndex: 999999,
                            }
                            : {
                                position: 'fixed',
                                left: mousePos.x,
                                top: mousePos.y,
                                pointerEvents: 'none',
                                zIndex: 999999,
                            }
                    }
                    initial={
                        isMobile
                            ? { opacity: 0, y: 15, x: '-50%' }
                            : { opacity: 0, scale: 0.96, y: 3 }
                    }
                    animate={{
                        opacity: isHoveringElement ? 0.95 : 0.60, // 60% visibility baseline
                        y: 0,
                        scale: 1,
                        x: isMobile ? '-50%' : '0%'
                    }}
                    exit={
                        isMobile
                            ? { opacity: 0, y: 10, x: '-50%' }
                            : { opacity: 0, scale: 0.96 }
                    }
                    transition={{ type: 'spring', stiffness: 550, damping: 35 }}
                    className="w-[calc(100%-2rem)] max-w-[340px] md:w-[320px] rounded-lg border border-white/10 bg-zinc-950 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-2 select-none"
                >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                            <Sparkles size={11} className="text-[#FF6B2B] animate-pulse" />
                            <span className="text-[9px] font-mono uppercase text-zinc-400 tracking-widest font-medium">Space Core Guide</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    </div>

                    <div className="min-h-[44px] flex items-center">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-1.5 py-1 pl-1"
                                >
                                    {[0, 0.15, 0.3].map((delay, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B]"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay }}
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.p
                                    key="text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.15 }}
                                    className="text-[11px] leading-relaxed text-zinc-300 font-sans font-light tracking-wide selection:bg-transparent"
                                >
                                    {tipText}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}