'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function SiteConcierge() {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tipText, setTipText] = useState("");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    const desktopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const mobileTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Absolute Context Dictionary mapped strictly to your page.tsx positions
    const getScrollSectionContext = (scrollY: number): string => {
        // 1. HERO SECTION BOUNDS (Top of page)
        if (scrollY < 700) {
            return "Space Digital engineers high-performance web systems and digital marketing campaigns for brands that refuse to look ordinary. We focus on eliminating structural friction.";
        }
        // 2. SELECTED WORKS / CASE STUDIES SECTION (#work)
        if (scrollY >= 700 && scrollY < 1800) {
            return "You are exploring our Selected Work engine. Here, we track performance data like Ulnar Medical's patient acquisition hub, Meta campaign ROAS metrics, and local reach funnels.";
        }
        // 3. EXPERTISE / TECH ECOSYSTEM SECTION (#ecosystem)
        if (scrollY >= 1800 && scrollY < 2600) {
            return "This is our technical architecture ecosystem layer. We integrate customized background automations using n8n and implement low-latency voice agent networks like Verbeo.";
        }
        // 4. FINANCIAL ROI TERMINAL (#systems)
        if (scrollY >= 2600 && scrollY < 3500) {
            return "The Operational ROI Calculator terminal. Adjust the leakage sliders to calculate missed inbound calls and visualize how a 24/7 AI setup self-funds its implementation costs.";
        }
        // 5. CONVERSION GATEWAY (#contact)
        if (scrollY >= 3500 && scrollY < 4300) {
            return "The Space Digital Conversion Gateway. Initiate a live voice triage test with our agent framework or select the optimized WhatsApp link to secure an operational blueprint briefing.";
        }
        // 6. ABOUT THE FOUNDER / CLOSING (#about)
        return "Space Digital was built by Lead Consultant Seth Onyango to blend traditional human growth marketing models directly with high-performance voice automation assets.";
    };

    useEffect(() => {
        const checkDevice = () => setIsMobile(window.innerWidth < 768);
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    useEffect(() => {
        // ── DESKTOP: DETECT ON-STOP POSITION ──
        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth >= 768) {
                // Offset slightly down and right from standard cursor tip
                setMousePos({ x: e.clientX + 15, y: e.clientY + 15 });

                // Hide immediately whenever the cursor is actively in flight
                setIsVisible(false);
                if (desktopTimeoutRef.current) clearTimeout(desktopTimeoutRef.current);

                // Capture current viewport metrics at this exact spatial coordinate step
                const currentScroll = window.scrollY;

                // Trigger presentation ONLY when the cursor stops completely for 500ms
                desktopTimeoutRef.current = setTimeout(() => {
                    setTipText(getScrollSectionContext(currentScroll));
                    setIsVisible(true);
                    setIsLoading(true);

                    // Render micro 3-dot typing delay sequence
                    setTimeout(() => setIsLoading(false), 250);
                }, 500);
            }
        };

        // ── MOBILE: GESTURAL SCREEN CONTACT TIMING ──
        const handleTouchStart = () => {
            if (window.innerWidth < 768) {
                if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);

                const currentScroll = window.scrollY;
                setTipText(getScrollSectionContext(currentScroll));
                setIsVisible(true);
                setIsLoading(true);

                setTimeout(() => setIsLoading(false), 200);
            }
        };

        const handleTouchEnd = () => {
            if (window.innerWidth < 768) {
                // Disappears cleanly 1.2 seconds after screen pressure breaks
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
                                pointerEvents: 'none', // Strict guard: click events pass completely straight through to buttons behind it
                                zIndex: 999999,
                            }
                            : {
                                position: 'fixed',
                                left: mousePos.x,
                                top: mousePos.y,
                                pointerEvents: 'none', // Strict guard: cursor never clashes with text container box layouts
                                zIndex: 999999,
                            }
                    }
                    initial={
                        isMobile
                            ? { opacity: 0, y: 15, x: '-50%' }
                            : { opacity: 0, scale: 0.96, y: 4 }
                    }
                    animate={{
                        opacity: 0.95,
                        y: 0,
                        scale: 1,
                        x: isMobile ? '-50%' : '0%'
                    }}
                    exit={
                        isMobile
                            ? { opacity: 0, y: 10, x: '-50%' }
                            : { opacity: 0, scale: 0.96 }
                    }
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="w-[calc(100%-2rem)] max-w-[340px] md:w-[320px] rounded-lg border border-white/10 bg-zinc-950 p-4 shadow-[0_25px_50px_rgba(0,0,0,0.95)] flex flex-col gap-2 select-none"
                >
                    {/* Header Bar Area */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                            <Sparkles size={11} className="text-[#FF6B2B] animate-pulse" />
                            <span className="text-[9px] font-mono uppercase text-zinc-400 tracking-widest font-medium">Space Core Guide</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    </div>

                    {/* Typing Animation Loader Container Layout */}
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