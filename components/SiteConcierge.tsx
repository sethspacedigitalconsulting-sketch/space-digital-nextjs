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
    const [activeSection, setActiveSection] = useState("home");

    const desktopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const mobileTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const currentTargetRef = useRef<string | null>(null);

    const getContextInfo = (tag: string): string => {
        switch (tag) {
            case 'hero-headline':
                return "Core Manifesto: We engineer high-performance web systems and digital marketing campaigns for brands that refuse to look ordinary.";
            case 'hero-location':
                return "Nairobi Operations: Space Digital proudly deploys growth-driven consulting frameworks locally engineered for the Kenyan enterprise landscape.";
            case 'hero-stats':
                return "Performance Data Signals: Our setups deliver a 3.8× average ROAS, 67% reduction in CPL, and 94% win rate inside local Map Pack Top-3 tiers.";
            case 'case-ulnar':
                return "Case Study: Ulnar Medical Clinic. Deployed frontend clinical SEO layouts integrated with automated booking hooks to destroy front-desk drop-off.";
            case 'case-wibify':
                return "Case Study: Wibify Agency. High-performance inbound web engine optimized to turn traffic streams into qualified consulting contracts.";
            case 'case-meta':
                return "Performance Reel: Meta Campaign. The video asset trailing your mouse proves a verified 3.8× Return on Ad Spend using surgical intent filtering.";
            case 'case-tiktok':
                return "Performance Reel: TikTok Velocity. Demonstrating a faceless short-form distribution campaign hitting a 214% traffic reach velocity spike.";
            case 'case-google':
                return "Performance Reel: Google Local. Dominating local regional queries to place specialized service providers directly into Top Map Pack tiers.";
            case 'vapi-demo':
                return "Live Telemetry Node: Spacey Voice Agent. Powered by custom low-latency voice engines, this agent qualifies leads and triggers CRM bookings 24/7.";

            // Viewport Fallbacks
            case 'home':
                return "Space Digital engineers high-performance digital marketing campaigns fused with intelligent AI automation, explicitly engineered for companies moving faster than their industry.";
            case 'work':
                return "You are reviewing our Proof Engine tracking verified client metrics built between 2024 and 2026. Hover over any brand asset row to stream media reels directly to your pointer.";
            case 'ecosystem':
                return "Unpacking our core operational growth tracks: Service Tier 1 focuses on traditional multi-channel digital marketing, while Tier 2 deploys automated conversational engines.";
            case 'system':
                return "Our 4-step deployment methodology engineered to protect pipeline scalability: (1) Diagnosis, (2) Architecture Blueprinting, (3) Rapid Integration, and (4) Compounded Scale.";
            case 'systems':
                return "Quantifiable ROI Terminal. Our automated setups ($1,500 One-Time Setup + $450/month Management) routinely scale profitability by eliminating missed inbound lead capture opportunities entirely.";
            case 'contact':
                return "The Space Digital Ingestion Gateway. Submit your live operational variables via our onboarding form, or test our live voice channel by initializing a real-time call window with Spacey.";
            case 'about':
                return "Space Digital was built by Lead Consultant Seth Onyango to blend traditional human growth marketing models directly with high-performance voice automation assets.";
            case 'faq':
                return "Frequently Asked Questions Node. Here we clear up onboarding timelines, technical specifications of our voice infrastructure, and management details.";
            default:
                return "";
        }
    };

    useEffect(() => {
        const checkDevice = () => setIsMobile(window.innerWidth < 768);
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // ── VIEWPORT HEIGHT TRACKER MATRIX ──
    useEffect(() => {
        const handleSpatialCheck = () => {
            const sections = ['home', 'work', 'ecosystem', 'system', 'systems', 'contact', 'about', 'faq'];
            let currentActive = 'home';
            let maxVisibleHeight = 0;

            sections.forEach((id) => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
                    if (visibleHeight > maxVisibleHeight) {
                        maxVisibleHeight = visibleHeight;
                        currentActive = id;
                    }
                }
            });
            if (currentActive !== activeSection) setActiveSection(currentActive);
        };

        window.addEventListener('scroll', handleSpatialCheck, { passive: true });
        handleSpatialCheck();
        return () => window.removeEventListener('scroll', handleSpatialCheck);
    }, [activeSection]);

    useEffect(() => {
        // ── DESKTOP POINTER VELOCITY BLOCK ──
        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth >= 768) {
                // Hide instantly while moving to maintain a clean viewport experience
                setIsVisible(false);
                if (desktopTimeoutRef.current) clearTimeout(desktopTimeoutRef.current);

                const target = e.target as HTMLElement;
                const closestTip = target.closest('[data-concierge-tip]');
                const tipType = closestTip ? closestTip.getAttribute('data-concierge-tip') : null;
                const targetContext = tipType || activeSection;

                // Fire only when the cursor stops moving completely for 250ms
                desktopTimeoutRef.current = setTimeout(() => {
                    setMousePos({ x: e.clientX + 15, y: e.clientY + 15 });
                    currentTargetRef.current = targetContext;
                    setIsHoveringElement(!!closestTip);
                    setTipText(getContextInfo(targetContext));
                    setIsVisible(true);
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 100);
                }, 250);
            }
        };

        // ── MOBILE GESTURAL TOUCH AND SCROLL ACTION ENGINE ──
        const handleMobileInteraction = (e: Event) => {
            if (window.innerWidth < 768) {
                if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);

                let targetContext = activeSection;
                if (e.type === 'touchstart') {
                    const target = e.target as HTMLElement;
                    const closestTip = target.closest('[data-concierge-tip]');
                    if (closestTip) targetContext = closestTip.getAttribute('data-concierge-tip') || activeSection;
                }

                currentTargetRef.current = targetContext;
                setTipText(getContextInfo(targetContext));
                setIsVisible(true);

                // Auto-fade exactly 1.4 seconds after scrolling or touch inputs stop entirely
                mobileTimeoutRef.current = setTimeout(() => {
                    setIsVisible(false);
                }, 1400);
            }
        };

        const handleMouseLeaveWindow = () => setIsVisible(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchstart', handleMobileInteraction, { passive: true });
        window.addEventListener('scroll', handleMobileInteraction, { passive: true });
        document.body.addEventListener('mouseleave', handleMouseLeaveWindow);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleMobileInteraction);
            window.removeEventListener('scroll', handleMobileInteraction);
            document.body.removeEventListener('mouseleave', handleMouseLeaveWindow);
            if (desktopTimeoutRef.current) clearTimeout(desktopTimeoutRef.current);
            if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);
        };
    }, [activeSection, isVisible]);

    return (
        <AnimatePresence mode="wait">
            {isVisible && tipText && (
                <motion.div
                    style={
                        isMobile
                            ? { position: 'fixed', bottom: '110px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 999999 }
                            : { position: 'fixed', left: mousePos.x, top: mousePos.y, pointerEvents: 'none', zIndex: 999999 }
                    }
                    initial={isMobile ? { opacity: 0, y: 15, x: '-50%' } : { opacity: 0, scale: 0.96, y: 3 }}
                    animate={{ opacity: isHoveringElement ? 0.95 : 0.60, y: 0, scale: 1, x: isMobile ? '-50%' : '0%' }}
                    exit={isMobile ? { opacity: 0, y: 10, x: '-50%' } : { opacity: 0, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 550, damping: 35 }}
                    className="w-[calc(100%-2rem)] max-w-[340px] md:w-[320px] rounded-lg border border-white/10 bg-zinc-950 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-2 select-none"
                >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                            <Sparkles size={11} style={{ color: '#FF6B2B' }} className="animate-pulse" />
                            <span className="text-[9px] font-mono uppercase text-zinc-400 tracking-widest font-medium">Space Core Guide</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    </div>

                    <div className="min-h-[44px] flex items-center">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 py-1 pl-1">
                                    {[0, 0.15, 0.3].map((delay, i) => (
                                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FF6B2B' }} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay }} />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.p key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} style={{ color: '#FF6B2B' }} className="text-[11px] leading-relaxed font-sans font-medium tracking-wide selection:bg-transparent">
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