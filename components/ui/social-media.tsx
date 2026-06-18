"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SocialItem {
    href: string;
    ariaLabel: string;
    tooltip: string;
    svgUrl: string;
    color: string;
}

export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
    items: SocialItem[];
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
    ({ className, items, ...props }, ref) => {
        // Stripped borders and native white background layers for a minimal look
        const baseIconStyles =
            "relative flex items-center justify-center w-12 h-12 rounded-full bg-transparent overflow-hidden transition-all duration-300 ease-in-out group-hover:scale-110";
        const baseSvgStyles =
            "relative z-10 w-6 h-6 object-contain transition-all duration-300 ease-in-out";
        const baseTooltipStyles =
            "absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 text-xs font-mono tracking-wider uppercase text-white whitespace-nowrap rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible shadow-lg";

        return (
            <ul
                ref={ref}
                className={cn("flex flex-col items-center justify-center gap-4", className)}
                {...props}
            >
                {items.map((item, index) => (
                    <li key={index} className="relative group">
                        <a
                            href={item.href}
                            aria-label={item.ariaLabel}
                            className={cn(baseIconStyles)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={item.svgUrl}
                                alt={item.ariaLabel}
                                className={cn(baseSvgStyles)}
                            />
                        </a>
                        <div
                            className={cn(baseTooltipStyles)}
                            style={{ backgroundColor: item.color }}
                        >
                            {item.tooltip}
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
);

SocialTooltip.displayName = "SocialTooltip";

export { SocialTooltip };