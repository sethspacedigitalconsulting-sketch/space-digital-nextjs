'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles, TrendingUp } from 'lucide-react';

export function SiteConcierge() {
    const [isActive, setIsActive] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
    const [tipText, setTipText] = useState("Jambo! I'm Spacey, your live system guide. Move your cursor or finger over items to decode our architecture.");

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHoveringElement, setIsHoveringElement] = useState(false);

    // Global cursor takeover state engine configuration
    useEffect(() => {
        if (isActive && !isMinimized) {
            document.body.style.cursor = 'none';
            const style = document.createElement('style');
            style.id = 'concierge-cursor-override';
            style.innerHTML = 'a, button, input, [role="button"], .work-link { cursor: none !important; }';
            document.head.appendChild(style);

            return () => {
                document.body.style.cursor = 'default';
                document.getElementById('concierge-cursor-override')?.remove();
            };
        } else {
            document.body.style.cursor = 'default';
            document.getElementById('concierge-cursor-override')?.remove();
        }
    }, [isActive, isMinimized]);

    useEffect(() => {
        if (!isActive || isMinimized) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                setMousePos({ x: touch.clientX, y: touch.clientY - 65 });
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Dynamic mapping for individual case items
            const workLink = target.closest('.work-link');
            const calcSection = target.closest('#systems');
            const inputElement = target.closest('input[type="range"]');
            const ctaGate = target.closest('#contact');

            if (workLink) {
                setIsHoveringElement(true);
                const previewUrl = workLink.getAttribute('data-preview') || '';

                if (previewUrl.includes('ulnar')) {
                    setTipText("🩺 Ulnar Medical: Notice the inline media engine. We built this custom site to pipeline high-intent patients directly into an automated booking hub, destroying front-desk lag.");
                } else if (previewUrl.includes('wibify')) {
                    setTipText("🌐 Wibify Agency: High-performance inbound system architecture built for scalability and near-zero conversion friction loops.");
                } else if (previewUrl.includes('metaads')) {
                    setTipText("🎬 Meta Performance: The video trailing your mouse is a live asset proving a 3.8x ROAS capture framework. Clicking this takes you straight to our validation drive.");
                } else if (previewUrl.includes('tiktokads')) {
                    setTipText("📱 TikTok Growth: Hovering here previews a faceless campaign that hit 214% reach velocity. Click to explore the asset blueprint.");
                } else if (previewUrl.includes('googlelocalads')) {
                    setTipText("📍 Local SEO: This demonstrates how we dominate local queries, pushing regional service clients into the Top-3 Map Packs with a 94% win rate.");
                }
                return;
            }

            if (inputElement && calcSection) {
                setIsHoveringElement(true);
                setTipText("📊 Interactive Terminal: Drag these sliders to map your own operational bottlenecks. Spacey can deploy a voice engine to salvage that leaked revenue around the clock.");
                return;
            }

            if (calcSection) {
                setIsHoveringElement(true);
                setTipText("💰 ROI Infrastructure: Look at the pricing model. Our $1,500 setup and $450/mo management framework self-funds instantly by eliminating human turnover and capturing 100% of missed calls.");
                return;
            }

            if (ctaGate) {
                setIsHoveringElement(true);
                setTipText("🤖 Conversation Gate: Right here you can initialize a live system briefing. Test our platform directly by calling Spacey or launching a clean WhatsApp interface.");
                return;
            }

            // Revert to page-level structural pointers based on vertical scrolls
            setIsHoveringElement(false);
            if (window.scrollY < 400) {
                setTipText("Jambo! Move your cursor or finger over any case study or interactive section below to let me unpack the data mechanics.");
            } else {
                setTipText("Following your lead. Hover over case links, statistics, or the calculator inputs to view system metrics.");
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
            <AnimatePresence>
                {isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[99999] flex items-center gap-3"
                    >
                        <span className="font-mono text-[9px] uppercase tracking-widest bg-zinc-950/90 border border-white/5 text-[#FF6B2B] px-3 py-1.5 rounded-lg backdrop-blur-md shadow-xl">
                            Need me to show you more? Tap to restore guide
                        </span>
                        <button
                            onClick={() => setIsMinimized(false)}
                            className="w-12 h-12 rounded-full bg-zinc-950 border border-[#FF6B2B] text-[#FF6B2B] flex items-center justify-center shadow-[0_0_20px_rgba(255,107,43,0.3)] hover:scale-110 transition-transform"
                        >
                            <Bot size={18} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isActive && !isMinimized && (
                    <motion.div
                        style={{
                            position: 'fixed',
                            left: mousePos.x,
                            top: mousePos.y,
                            transform: 'translate(-12px, -12px)',
                            pointerEvents: 'auto',
                            zIndex: 999999
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: isHoveringElement ? 0.95 : 0.60,
                            scale: isHoveringElement ? 1.03 : 1
                        }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 550, damping: 34 }}
                        className="w-[260px] md:w-[310px] rounded-xl border border-[#FF6B2B]/30 bg-zinc-950/90 backdrop-blur-md p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-1.5 select-none"
                    >
                        <div className="flex items-center justify-between border-b border-white/5 pb-1">
                            <div className="flex items-center gap-1">
                                <Sparkles size={10} className="text-[#FF6B2B]" />
                                <span className="text-[9px] font-mono uppercase text-zinc-400 tracking-wider">Space Core Pointer</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setIsMinimized(true);
                                }}
                                className="w-4 h-4 rounded bg-zinc-900 text-zinc-500 hover:text-white border border-white/5 flex items-center justify-center transition-colors"
                            >
                                <X size={10} />
                            </button>
                        </div>
                        <p className="text-[10px] leading-relaxed text-zinc-200 font-sans font-light">
                            {tipText}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}