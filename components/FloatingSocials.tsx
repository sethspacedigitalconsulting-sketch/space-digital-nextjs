"use client";

import React from "react";
import Image from "next/image";
import { SocialTooltip, SocialItem } from "@/components/ui/social-media";

const sethSocialLinks: SocialItem[] = [
    {
        href: "https://api.whatsapp.com/message/RV5LUNZAXFW3M1?autoload=1&app_absent=0",
        ariaLabel: "WhatsApp",
        tooltip: "Direct Chat",
        color: "#25D366",
        svgUrl: "/workflows/WAlogo.png",
    },
    {
        href: "https://calendly.com/seth-spacedigitalconsulting/30min",
        ariaLabel: "Book a Call",
        tooltip: "Book a Call",
        color: "#FF6B2B",
        svgUrl: "/workflows/calendly.png",
    },
    {
        href: "https://linkedin.com/in/seth-odhiambo-onyango-823286215",
        ariaLabel: "LinkedIn",
        tooltip: "LinkedIn Profile",
        color: "#0A66C2",
        svgUrl: "/workflows/linkedin.png",
    },
    {
        href: "https://github.com/sethspacedigitalconsulting-sketch/space-123",
        ariaLabel: "GitHub",
        tooltip: "Source Engine",
        color: "#24292e",
        svgUrl: "/workflows/gitlogo.png",
    },
];

export function FloatingSocials() {
    return (
        <>
            {/* ── DESKTOP REEL LAYER: Kept perfectly intact ── */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:block">
                <div className="pointer-events-auto">
                    <SocialTooltip items={sethSocialLinks} />
                </div>
            </div>

            {/* ── MOBILE QUICK ACTION ACTION-BAR: Frosted Glass Bottom Deck ── */}
            <div className="fixed bottom-0 left-0 right-0 z-[999] p-3 md:hidden bg-zinc-950/70 border-t border-white/5 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)] pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                <div className="flex items-center justify-around max-w-md mx-auto">
                    {sethSocialLinks.map((item) => (
                        <a
                            key={item.ariaLabel}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-1 group relative p-2 transition-transform active:scale-95"
                            aria-label={item.ariaLabel}
                        >
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 bg-zinc-900/50 transition-colors shadow-md"
                                style={{ transform: 'translateZ(0)' }}
                            >
                                <div className="relative w-5 h-5">
                                    <Image
                                        src={item.svgUrl}
                                        alt={item.ariaLabel}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <span className="text-[9px] font-mono tracking-wider font-medium text-zinc-400 uppercase">
                                {item.ariaLabel === "Book a Call" ? "Book" : item.ariaLabel}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}