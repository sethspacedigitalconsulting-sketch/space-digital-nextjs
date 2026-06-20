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

    const getContextInfo = (tag: string): string => {
        switch (tag) {
            case 'hero-headline':
                return "Space Digital operates as a non-traditional systems architecture collective. We engineer high-performance visual interfaces and asynchronous operational loops for brands seeking extreme market scalability.";
            case 'hero-location':
                return "Based directly out of Nairobi, Kenya. We build localized high-throughput conversion machines tailored for the regional economic sector while scaling distributed infrastructure for global SMBs.";
            case 'social-bar':
                return "Direct access conduits. These links bypass standard form-fill friction by routing user sessions straight into active WhatsApp chat lines or our persistent 30-minute Calendly scheduler.";
            case 'video-ads':
                return "Performance distribution metrics. These assets represent high-velocity, short-form creative ad models engineered to isolate target intent and pipeline regional clients at minimal acquisition cost.";
            case 'case-ulnar':
                return "Case Study Node: Ulnar Medical Clinic. Deployed full frontend architecture optimized for localized search patterns and integrated multi-channel scheduling hooks to completely wipe out back-office drop-off loops.";
            case 'case-wibify':
                return "Case Study Node: Wibify Agency. Developed a modern Webflow-to-NextJS landing layout optimized to transform organic inbound traffic streams into qualified consulting contracts.";
            case 'case-bigwash':
                return "Case Study Node: Big Wash Stores. Constructed a multi-platform distribution engine across TikTok and Facebook, utilizing targeted geo-fencing to systematically scale local foot-traffic.";
            case 'case-kaekebeth':
                return "Case Study Node: KaekeBeth Couture. Engineered a specialized Luxury Design Concierge text agent built to navigate high-value client fitting lifecycles automatically.";
            case 'tier-marketing':
                return "Service Tier 1: Traditional Digital Marketing. Systematic operational deployment covering high-intent Search Engine Optimization, hyper-targeted Google Ads positioning, and direct-response customer acquisition paths.";
            case 'tier-automation':
                return "Service Tier 2: AI Agent Automation. Full deployment of automated 24/7 Voice and Text engines to triage missed inbound communication. Positioned at a baseline flat fee of $1,500 setup plus $450 per month management.";
            case 'pricing-roi':
                return "Monetization Analysis: The $1,500 installation and $450 monthly management infrastructure self-funds by capturing missed lead streams, ensuring permanent coverage, and cutting staff churn completely.";
            case 'cta-whatsapp':
                return "WhatsApp Deep Link. This action vector initiates an instant communication thread directly with our strategic consulting lead for rapid campaign initialization.";
            case 'cta-calendly':
                return "Calendly Access Bridge. Tap to secure an open operations evaluation call on the master calendar to unpack pipeline leakages inside your current enterprise structure.";
            default:
                return "Currently scanning site nodes. Space Digital builds traditional high-velocity marketing pipelines alongside automated voice networks using frameworks like Verbeo.";
        }
    };

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);

        if (isVisible && !isMobile) {
            document.body.style.cursor = 'none';
            const style = document.createElement('style');
            style.id = 'concierge-cursor-override';
            style.innerHTML = 'a, button, input, [role="button"], .work-link { cursor: none !important; }';
            document.head.appendChild(style);
        }

        return () => {
            window.removeEventListener('resize', checkDevice);
            document.body.style.cursor = 'default';
            document.getElementById('concierge-cursor-override')?.remove();
        };
    }, [isVisible, isMobile]);

    useEffect(() => {
        // HIGH-VELOCITY MOUSE TRACKING ENGINE
        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth >= 768) {
                setMousePos({ x: e.clientX, y: e.clientY });

                // Keeps it visible instead of flickering it off completely on minor adjustments
                if (desktopTimeoutRef.current) clearTimeout(desktopTimeoutRef.current);

                const target = e.target as HTMLElement;
                const closestTip = target.closest('[data-concierge-tip]');
                const tipType = closestTip ? closestTip.getAttribute('data-concierge-tip') : null;

                // CRITICAL FIX: Slashes response wait down from 650ms to a rapid 80ms stop window
                desktopTimeoutRef.current = setTimeout(() => {
                    if (currentTargetRef.current === tipType && isVisible) return; // Prevent layout resetting if hovering same block

                    currentTargetRef.current = tipType;
                    setIsHoveringElement(!!closestTip);
                    setTipText(getContextInfo(tipType || "default"));
                    setIsVisible(true);
                    setIsLoading(true);

                    // CRITICAL FIX: Speeds up the typing simulation wait from 900ms to 250ms
                    setTimeout(() => setIsLoading(false), 250);
                }, 80);
            }
        };

        // INSTANT TOUCH RESPONSE ENGINE
        const handleTouchStart = (e: TouchEvent) => {
            if (window.innerWidth < 768) {
                if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);

                const target = e.target as HTMLElement;
                const closestTip = target.closest('[data-concierge-tip]');
                const tipType = closestTip ? closestTip.getAttribute('data-concierge-tip') : null;

                currentTargetRef.current = tipType;
                setIsHoveringElement(!!closestTip);
                setTipText(getContextInfo(tipType || "default"));
                setIsVisible(true);
                setIsLoading(true);

                setTimeout(() => setIsLoading(false), 200);
            }
        };

        const handleTouchEnd = () => {
            if (window.innerWidth < 768) {
                mobileTimeoutRef.current = setTimeout(() => {
                    setIsVisible(false);
                }, 1200);
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
    }, [isVisible]);

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
                                transform: 'translate(-12px, -12px)',
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
                        opacity: isHoveringElement ? 0.95 : 0.60,
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