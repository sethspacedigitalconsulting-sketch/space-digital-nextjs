'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, ArrowRight, CornerDownLeft, Sparkles, HelpCircle } from 'lucide-react';

interface Milestone {
    text: string;
    targetId: string;
    nextLabel: string;
    skipLabel?: string;
}

const TOUR_MILESTONES: Milestone[] = [
    {
        text: "Welcome to Space Digital. I am your optimization guide. Most agency sites are passive brochures—we engineer active pipelines. Let's take a look under the hood at how we fix broken conversion models.",
        targetId: "home",
        nextLabel: "Step 1: See Validated Case Studies →",
        skipLabel: "Skip to Pricing 💰"
    },
    {
        text: "Here is our engine in the wild. Look at our work—we deploy seamless scheduling hubs and specialized client pipelines that capture high-intent traffic. We don't just optimize for vanity clicks; we route traffic directly into automated calendars.",
        targetId: "work",
        nextLabel: "Step 2: View Our Service Tiers →",
        skipLabel: "Skip to Contact 🚀"
    },
    {
        text: "This is where we eliminate overhead. We blend traditional digital marketing (SEO & Ads) with high-value AI Agent Automation ($1,500 setup + $450/month). This setup provides 24/7 coverage, stops lead drop-off completely, and slashes staff turnover bottlenecks.",
        targetId: "pricing",
        nextLabel: "Final Step: Initiate Briefing 🚀"
    },
    {
        text: "The tour is complete and the blueprint is ready. Let's lock in your growth tracking setup. Tap below to launch an instant WhatsApp briefing or secure a dedicated 30-minute consultation via Calendly.",
        targetId: "contact",
        nextLabel: "Complete Tour ✅"
    }
];

export function SiteConcierge() {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Auto-scroll trigger handler linked directly to our Next.js State engine
    const executeScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Safely clears top navigation headers
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleNext = () => {
        if (currentStep < TOUR_MILESTONES.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            executeScroll(TOUR_MILESTONES[nextStep].targetId);
        } else {
            // Tour completed safely
            setIsActive(false);
            setCurrentStep(0);
        }
    };

    const handleSkipToPricing = () => {
        setCurrentStep(2); // Jump straight to pricing tier data index array
        executeScroll('pricing');
    };

    const handleSkipToContact = () => {
        setCurrentStep(3); // Jump directly to contact frame bounds
        executeScroll('contact');
    };

    return (
        <>
            {/* ── STATE 1: THE FLOATING BEACON TRIGER ── */}
            <AnimatePresence>
                {!isActive && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[998] flex items-center gap-3 pointer-events-auto"
                    >
                        {/* Desktop Quick Indicator Flag Badge Label */}
                        <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-widest bg-zinc-950/80 border border-white/5 text-zinc-400 px-3 py-1.5 rounded-lg backdrop-blur-md">
                            Launch Space Concierge
                        </span>

                        {/* The Pulsing Core Button Trigger Ring */}
                        <button
                            onClick={() => {
                                setIsActive(true);
                                executeScroll('home');
                            }}
                            className="w-12 h-12 rounded-full bg-zinc-950 border border-[#FF6B2B] text-[#FF6B2B] flex items-center justify-center shadow-[0_0_20px_rgba(255,107,43,0.25)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,107,43,0.45)] active:scale-95 relative overflow-hidden group"
                            aria-label="Initialize interactive guide"
                        >
                            <div className="absolute inset-0 bg-[#FF6B2B]/5 animate-ping rounded-full pointer-events-none" style={{ animationDuration: '3s' }} />
                            <Bot size={20} className="transition-transform group-hover:rotate-12" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── STATE 2: THE INTERACTIVE CONCIERGE PANEL ── */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 25, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                        className="fixed bottom-24 right-4 left-4 md:left-auto md:right-8 md:bottom-8 z-[998] w-[calc(100%-2rem)] md:w-[360px] rounded-2xl border border-white/5 bg-zinc-950/90 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden pointer-events-auto"
                    >
                        {/* Header Track Panel Interface */}
                        <div className="p-4 bg-zinc-900/40 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-[#FF6B2B]/10 border border-[#FF6B2B]/30 flex items-center justify-center">
                                    <Sparkles size={14} className="text-[#FF6B2B] animate-pulse" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-white tracking-wide font-sans">Space Site Concierge</h4>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="text-[9px] font-mono uppercase text-[#FF6B2B] tracking-wider">
                                            Milestone {currentStep + 1} of {TOUR_MILESTONES.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsActive(false)}
                                className="w-7 h-7 rounded-lg bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Script Text Container Bubble Row Block */}
                        <div className="p-5 flex flex-col gap-4">
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans font-light">
                                {TOUR_MILESTONES[currentStep].text}
                            </p>

                            {/* Final Milestone Context Deep Linking Call Actions */}
                            {currentStep === 3 && (
                                <div className="flex gap-2 pt-1">
                                    <a
                                        href="https://wa.me/message/RV5LUNZAXFW3M1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 h-9 bg-zinc-900 text-white border border-white/10 text-[11px] font-mono rounded-lg flex items-center justify-center gap-1.5 hover:bg-zinc-800 transition-colors"
                                    >
                                        WhatsApp Chat
                                    </a>
                                    <a
                                        href="https://calendly.com/seth-spacedigitalconsulting/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 h-9 bg-[#FF6B2B] text-zinc-950 text-[11px] font-mono font-bold rounded-lg flex items-center justify-center gap-1 hover:opacity-90 transition-opacity"
                                    >
                                        Book Call 📅
                                    </a>
                                </div>
                            )}

                            {/* Action Button Segment Hierarchy */}
                            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                                <button
                                    onClick={handleNext}
                                    className="w-full h-10 bg-zinc-900 hover:bg-zinc-800 border border-[#FF6B2B]/40 text-white text-xs font-medium rounded-xl flex items-center justify-between px-4 transition-all group active:scale-98"
                                >
                                    <span className="font-mono text-[11px] text-zinc-200">
                                        {TOUR_MILESTONES[currentStep].nextLabel}
                                    </span>
                                    <ArrowRight size={13} className="text-[#FF6B2B] transition-transform group-hover:translate-x-1" />
                                </button>

                                {/* Conditional Skip Track Options */}
                                {TOUR_MILESTONES[currentStep].skipLabel && (
                                    <button
                                        onClick={currentStep === 0 ? handleSkipToPricing : handleSkipToContact}
                                        className="text-left font-mono text-[10px] text-zinc-500 hover:text-zinc-300 pl-2 pt-0.5 transition-colors"
                                    >
                                        ⏩ {TOUR_MILESTONES[currentStep].skipLabel}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}