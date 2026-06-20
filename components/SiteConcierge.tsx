'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles, ShieldCheck } from 'lucide-react';

export function SiteConcierge() {
    const [isActive, setIsActive] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    // Baseline onboarding instruction string
    const [tipText, setTipText] = useState("I'm your ambient guide. Hover your cursor over any section or button to break down our system architecture.");

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHoveringElement, setIsHoveringElement] = useState(false);

    useEffect(() => {
        if (!isActive || isMinimized) return;

        // ── DESKTOP MOUSE COURIER TRACKING ──
        const handleMouseMove = (e: MouseEvent) => {
            // Offset by 20px so it perfectly frames next to the standard arrow cursor pointer
            setMousePos({ x: e.clientX + 20, y: e.clientY + 20 });
        };

        // ── MOBILE COMPANION TOUCH TRACKING ──
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                // Offset 70px above the finger so it is never hidden by their hand while scrolling
                setMousePos({ x: touch.clientX, y: touch.clientY - 70 });
            }
        };

        // ── OMNIPRESENT SITE ARCHITECTURE DICTIONARY ──
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const closestTip = target.closest('[data-concierge-tip]');

            if (closestTip) {
                setIsHoveringElement(true);
                const tipType = closestTip.getAttribute('data-concierge-tip');

                switch (tipType) {
                    // 1. HERO & POSITIONING
                    case 'hero-headline':
                        setTipText("🎯 This is our core manifesto: engineering modern web workflows for brands that refuse to look ordinary. We eliminate traditional friction patterns.");
                        break;
                    case 'hero-location':
                        setTipText("📍 We proudly operate directly out of Nairobi, Kenya, deploying systems tailored for the local market and expanding SMB frameworks globally.");
                        break;

                    // 2. SOCIALS & QUICK ACTION TRACKS
                    case 'social-bar':
                        setTipText("⚡ Quick Contact Hub. Tap to launch an instant conversation inside WhatsApp or jump straight into our Calendly dashboard to secure a strategy briefing.");
                        break;

                    // 3. CASE STUDIES & RESULTS MATRIX (THE PROOF ENGINE)
                    case 'video-ads':
                        setTipText("🔥 High-converting ad creatives. We design, optimize, and distribute performance-driven assets that capture user intent and push them directly into booking funnels.");
                        break;
                    case 'case-ulnar':
                        setTipText("🩺 Case Validation: Ulnar Medical. We deployed a custom website architecture integrated with synchronized scheduling hooks to automate patient acquisition workflows.");
                        break;
                    case 'case-bigwash':
                        setTipText("🧼 Case Validation: Big Wash Stores. Engineered an omni-channel digital turnaround across TikTok and Facebook to generate recurring local foot traffic.");
                        break;
                    case 'case-kaekebeth':
                        setTipText("👗 Case Validation: KaekeBeth Couture. Deployed a specialized Luxury Design Concierge text automation agent to seamlessly manage premium fitting lifecycles.");
                        break;

                    // 4. METRICS & TRUST SIGNALS
                    case 'stat-roas':
                        setTipText("📈 Data Signal: 3.8× Average ROAS. Our digital marketing frameworks are built to maximize return on ad spend by surgically filtering high-intent target clients.");
                        break;
                    case 'stat-cpl':
                        setTipText("📉 Data Signal: 67% Cost-Per-Lead Reduction. We blend standard SEO with strategic automation inputs to eliminate expensive, wasted ad clicks.");
                        break;
                    case 'stat-ai-call':
                        setTipText("📞 Data Signal: 82% AI Call Resolution. Built utilizing platforms like Verbeo.ai to answer missed calls instantly, book leads, and wipe out front-desk backlogs.");
                        break;

                    // 5. SERVICE TIERS & PRICING
                    case 'tier-marketing':
                        setTipText("📢 Tier 1: Traditional Digital Marketing. Elite execution across high-performance SEO, Google Ads management, and systematic social media customer acquisition funnels.");
                        break;
                    case 'tier-automation':
                        setTipText("🤖 Tier 2: AI Agent Automation. 24/7 Voice and Text Agents built to book clients and log CRM leads instantly. Price structured at $1,500 setup + $450/month management fee.");
                        break;
                    case 'pricing-roi':
                        setTipText("💼 Cost Justification: The $1,500 setup + $450/mo management framework instantly pays for itself by capturing missed inbound calls, eliminating staff turnover, and securing 24/7 coverage.");
                        break;

                    // 6. CALL TO ACTIONS & INBOUND CHANNELS
                    case 'cta-whatsapp':
                        setTipText("💬 Direct Link: Launches an instant chat session via WhatsApp. Deep-linking logic is fully optimized for immediate smartphone redirection.");
                        break;
                    case 'cta-calendly':
                        setTipText("📅 Direct Hook: Launches our active Calendly interface to lock down a structured 30-minute operational optimization blueprint call.");
                        break;

                    default:
                        setIsHoveringElement(false);
                }
            } else {
                setIsHoveringElement(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isActive, isMinimized]);

    return (
        <>
            {/* ── STATE 1: THE FLOATING TRIGER BEACON ── */}
            <AnimatePresence>
                {(!isActive || isMinimized) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[999] flex items-center gap-3"
                    >
                        <span className="hidden md:inline-block font-mono text-[9px] uppercase tracking-widest bg-zinc-950/90 border border-white/5 text-zinc-400 px-3 py-1.5 rounded-lg backdrop-blur-md">
                            {isMinimized ? "Guide Minimized" : "Talk to Spacey Agent"}
                        </span>
                        <button
                            onClick={() => {
                                setIsActive(true);
                                setIsMinimized(false);
                                setTipText("Perfect! I'm shadowing your path. Hover your cursor over any element to see our system mechanics.");
                            }}
                            className="w-12 h-12 rounded-full bg-zinc-950 border border-[#FF6B2B] text-[#FF6B2B] flex items-center justify-center shadow-[0_0_20px_rgba(255,107,43,0.3)] transition-all hover:scale-110 relative"
                        >
                            <Bot size={18} />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse border border-zinc-950" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── STATE 2: THE AMBIENT SHADOW COMPANION (40% BASELINE) ── */}
            <AnimatePresence>
                {isActive && !isMinimized && (
                    <motion.div
                        style={{
                            position: 'fixed',
                            left: mousePos.x,
                            top: mousePos.y,
                            pointerEvents: 'auto',
                            zIndex: 9999
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: isHoveringElement ? 0.95 : 0.40, // Blends down to a soft 40% when moving over background to remain sleek
                            scale: isHoveringElement ? 1.02 : 1
                        }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="w-[280px] md:w-[320px] rounded-xl border border-[#FF6B2B]/20 bg-zinc-950/85 backdrop-blur-md p-3.5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col gap-2 transition-opacity duration-200"
                    >
                        {/* Header Track */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                            <div className="flex items-center gap-1.5">
                                <Sparkles size={11} className="text-[#FF6B2B]" />
                                <span className="text-[9px] font-mono uppercase text-zinc-400 tracking-wider">Space System Guide</span>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMinimized(true);
                                }}
                                className="w-5 h-5 rounded-md bg-zinc-900/80 text-zinc-500 hover:text-white border border-white/5 flex items-center justify-center transition-colors"
                                title="Minimize Guide"
                            >
                                <X size={11} />
                            </button>
                        </div>

                        {/* Narrative Context Bubble Stream */}
                        <p className="text-[11px] leading-relaxed text-zinc-200 font-sans font-light selection:bg-transparent">
                            {tipText}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}