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

    // Tracks the true active viewport section name dynamically
    const [activeSection, setActiveSection] = useState("section-hero");

    const desktopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const mobileTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const currentTargetRef = useRef<string | null>(null);

    // Mapped Dictionary representing the exact strings for your layout
    const getContextInfo = (tag: string): string => {
        switch (tag) {
            // SECTION FALLBACKS (Driven explicitly by Viewport Intersection, NOT guesswork numbers)
            case 'section-hero':
                return "Space Digital engineers high-performance web systems and digital marketing campaigns for brands that refuse to look ordinary. We focus on eliminating structural friction.";
            case 'section-work':
                return "You are looking at our Proof Engine. We build tailored customer acquisition systems and clear frontend paths that guide high-intent prospects straight into synchronized calendars.";
            case 'section-ecosystem':
                return "Our technical automation matrix. We wire advanced platforms like Verbeo for zero-latency voice agents and n8n for background workflows to handle repetitive inbound scale.";
            case 'section-process':
                return "Our 4-Step Operational System. Step 1 is Discovery & Diagnosis (Deep Audit). Step 2 is Strategy & Architecture (Mapping blueprints before code). Step 3 is Deploy & Integrate, and Step 4 is Compound & Scale.";
            case 'section-systems':
                return "The Operational ROI Calculator terminal. Adjust the leakage sliders to calculate missed inbound calls and visualize how a 24/7 AI setup self-funds its implementation costs.";
            case 'section-contact':
                return "The Space Digital Ingestion Gateway. Submit your business variables via our Intake form, or test our live voice channel by initializing a real-time call frame with our agent Spacey.";

            // HOVER INTERACTION OVERRIDES
            case 'hero-headline':
                return "🎯 Core Manifesto: We engineer high-performance systems for brands that refuse to look ordinary.";
            case 'hero-location':
                return "📍 Nairobi Operations: We deploy growth-driven marketing layouts locally tailored for the Kenyan SMB landscape alongside distributed automated systems globally.";
            case 'hero-stats':
                return "📊 Performance Data Signals: Average 3.8x Return on Ad Spend and systematic 67% Cost-Per-Lead reduction pipelines captured via expert asset deployment.";
            case 'case-ulnar':
                return "🩺 Patient Acquisition: For Ulnar Medical, we integrated a clean frontend with automated scheduling maps to eliminate front-desk drag.";
            case 'case-wibify':
                return "🌐 Inbound Web Engine: Built for maximum data capture velocity and absolute conversion optimization framework metrics.";
            case 'case-meta':
                return "🎬 Meta Performance: The video trailing your mouse is a live asset proving a 3.8x ROAS capture framework. Clicking this takes you straight to our validation drive.";
            case 'case-tiktok':
                return "📱 TikTok Growth: Previews a faceless asset deployment campaign hitting 214% traffic reach velocity utilizing programmatic hooks.";
            case 'case-google':
                return "📍 Local SEO: This demonstrates how we dominate local queries, pushing regional service clients into the Top-3 Map Packs with a 94% win rate.";
            case 'vapi-demo':
                return "🤖 Live Voice Telemetry Node: Interact with Spacey to test our low-latency (~1s response time) qualification agent system live.";
            default:
                return "Navigating Space Digital infrastructure. Pause your movement on any element to analyze system performance vectors.";
        }
    };

    useEffect(() => {
        const checkDevice = () => setIsMobile(window.innerWidth < 768);
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // ── THE ABSOLUTE INTERSECTION OBSERVER MATRIX ──
    useEffect(() => {
        const sectionIds = ['home', 'work', 'ecosystem', 'system', 'systems', 'contact'];

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -40% 0px',
            threshold: 0.15
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id === 'home') setActiveSection('section-hero');
                    else if (id === 'work') setActiveSection('section-work');
                    else if (id === 'ecosystem') setActiveSection('section-ecosystem');
                    else if (id === 'system') setActiveSection('section-process');
                    else if (id === 'systems') setActiveSection('section-systems');
                    else if (id === 'contact') setActiveSection('section-contact');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth >= 768) {
                setMousePos({ x: e.clientX + 15, y: e.clientY + 15 });
                setIsVisible(false);
                if (desktopTimeoutRef.current) clearTimeout(desktopTimeoutRef.current);

                const target = e.target as HTMLElement;
                const closestTip = target.closest('[data-concierge-tip]');
                const tipType = closestTip ? closestTip.getAttribute('data-concierge-tip') : null;

                desktopTimeoutRef.current = setTimeout(() => {
                    const targetContext = tipType || activeSection;

                    if (currentTargetRef.current === targetContext && isVisible) return;

                    currentTargetRef.current = targetContext;
                    setIsHoveringElement(!!closestTip);
                    setTipText(getContextInfo(targetContext));
                    setIsVisible(true);
                    setIsLoading(true);

                    setTimeout(() => setIsLoading(false), 200);
                }, 80);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (window.innerWidth < 768) {
                if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);

                const target = e.target as HTMLElement;
                const closestTip = target.closest('[data-concierge-tip]');
                const tipType = closestTip ? closestTip.getAttribute('data-concierge-tip') : null;

                const targetContext = tipType || activeSection;

                currentTargetRef.current = targetContext;
                setIsHoveringElement(!!closestTip);
                setTipText(getContextInfo(targetContext));
                setIsVisible(true);
                setIsLoading(true);

                setTimeout(() => setIsLoading(false), 180);
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
    }, [activeSection, isVisible]);

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
                                    /* ── Overhauled text coloring utility directly here ── */
                                    className="text-[11px] leading-relaxed text-[#FF6B2B] font-sans font-light tracking-wide selection:bg-transparent"
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