"use client";

import React from "react";
import { SocialTooltip, SocialItem } from "@/components/ui/social-media";

const sethSocialLinks: SocialItem[] = [
    {
        href: "https://api.whatsapp.com/message/RV5LUNZAXFW3M1?autoload=1&app_absent=0",
        ariaLabel: "WhatsApp",
        tooltip: "Direct Chat",
        color: "#25D366",
        svgUrl: "/workflows/WAlogo.png", // Mapped directly to your public folder icon
    },
    {
        href: "https://calendly.com/seth-spacedigitalconsulting/30min",
        ariaLabel: "Book a Call",
        tooltip: "Book a Call",
        color: "#FF6B2B", // Space Digital Brand Orange
        svgUrl: "/workflows/calendly.png", // Pulls your custom PNG asset flawlessly
    },
    {
        href: "https://linkedin.com/in/seth-odhiambo-onyango-823286215",
        ariaLabel: "LinkedIn",
        tooltip: "LinkedIn Profile",
        color: "#0A66C2",
        svgUrl: "/workflows/linkedin.png", // Mapped directly to your public folder icon
    },
    {
        href: "https://github.com/sethspacedigitalconsulting-sketch/space-123",
        ariaLabel: "GitHub",
        tooltip: "Source Engine",
        color: "#24292e",
        svgUrl: "/workflows/gitlogo.png", // Mapped directly to your public folder icon
    },
];

export function FloatingSocials() {
    return (
        <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden sm:block">
            <div className="pointer-events-auto">
                <SocialTooltip items={sethSocialLinks} />
            </div>
        </div>
    );
}