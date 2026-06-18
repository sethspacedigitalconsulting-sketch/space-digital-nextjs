'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const SYSTEM_SLIDES = [
    {
        id: "briefing",
        num: "01",
        phase: "PHASE 01: INTAKE",
        title: "The Strategic Briefing",
        description: "We don't do discovery chats. We execute a deep infrastructure audit of your missed inbound pipelines, identifying the exact repetitive phone calls and friction loops draining your local service business profit.",
        mediaUrl: "/workflows/DD.mp4"
    },
    {
        id: "marketing",
        num: "02",
        phase: "PHASE 02: INBOUND MOTOR",
        title: "Data Engine Deployment",
        description: "We deploy high-performance Local SEO strategies and Google Ads arrays to capture local target intent. Your visibility snaps straight to the top of the local Map Packs precisely when clients are looking to buy.",
        mediaUrl: "/workflows/SA.mp4"
    },
    {
        id: "interception",
        num: "03",
        phase: "PHASE 03: AUTOMATION TIER",
        title: "24/7 Voice Interception",
        description: "The moment a call lands, advanced Vapi and Verbeo voice agents take over. Repetitive or missed inquiries are handled instantly in real-time, qualifying leads and booking them directly into your calendar 24/7.",
        mediaUrl: "/workflows/DA.mp4"
    },
    {
        id: "crm-integration",
        num: "04",
        phase: "PHASE 04: INFRASTRUCTURE",
        title: "Immutable CRM Sync",
        description: "Qualified opportunities are pushed straight to dedicated CRM APIs and calendar hubs. No human handling errors, no staff turnover bottlenecking operations, and zero lost details. A machine, not a service.",
        mediaUrl: "/workflows/CS.mp4"
    }
];

export function SystemProcess() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="w-full bg-[#0a0a0b] py-24 border-t border-zinc-900 overflow-hidden" id="system-process">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <header className="flex flex-col gap-4 mb-16 max-w-xl">
                    <span className="font-mono tracking-widest text-[#FF6B2B] uppercase text-xs flex items-center gap-2">
                        <span className="w-8 h-px bg-[#FF6B2B]" />
                        From Briefing to Results
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        A system, <em className="text-[#FF6B2B] italic font-serif font-normal">not a service</em>.
                    </h2>
                </header>

                {/* Interaction Wrapper Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT SIDE: Navigation Columns */}
                    <div className="lg:col-span-6 flex flex-col gap-4">
                        {SYSTEM_SLIDES.map((slide, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <div
                                    key={slide.id}
                                    onClick={() => setActiveIndex(idx)}
                                    className={cn(
                                        "p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left select-none",
                                        isActive
                                            ? "bg-zinc-950 border-zinc-800 shadow-xl"
                                            : "bg-transparent border-transparent opacity-40 hover:opacity-70"
                                    )}
                                >
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="font-mono text-xs text-[#FF6B2B]">{slide.num}</span>
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{slide.phase}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{slide.title}</h3>
                                    <div className={cn(
                                        "grid transition-all duration-300 overflow-hidden",
                                        isActive ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                                    )}>
                                        <p className="overflow-hidden text-zinc-400 text-sm md:text-base leading-relaxed">
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* RIGHT SIDE: Dedicated Native Autoplay Video Viewport */}
                    <div className="lg:col-span-6 lg:sticky lg:top-32 w-full aspect-[3/2] lg:h-[420px] bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden shadow-2xl shadow-black/90 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.01 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="w-full h-full absolute inset-0 bg-zinc-950"
                            >
                                <video
                                    key={SYSTEM_SLIDES[activeIndex].mediaUrl}
                                    src={SYSTEM_SLIDES[activeIndex].mediaUrl}
                                    className="w-full h-full object-cover block"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}