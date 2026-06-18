'use client';

import React from 'react';
import { cn } from "@/lib/utils";

export interface NavTabItem {
    href: string;
    ariaLabel: string;
    tooltip: string;
    icon: React.ReactNode;
    color: string; // The solid color that fills the capsule upwards on hover
}

export interface NavTabsAnimationProps extends React.HTMLAttributes<HTMLUListElement> {
    items: NavTabItem[];
    activeMenu: string | null;
    setActiveMenu: (name: string | null) => void;
}

const NavTabsAnimation = React.forwardRef<HTMLUListElement, NavTabsAnimationProps>(
    ({ className, items, activeMenu, setActiveMenu, ...props }, ref) => {

        // Core structural layout style hooks from your component blueprint
        const baseIconStyles =
            "relative flex items-center justify-center w-11 h-11 rounded-xl border border-[#FF6B2B]/20 bg-[#FF6B2B]/5 overflow-hidden transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(255,107,43,0.3)]";

        const baseSvgStyles =
            "relative z-10 text-white transition-all duration-300 ease-in-out group-hover:text-zinc-950 group-hover:scale-105";

        const baseFilledStyles =
            "absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full";

        const baseTooltipStyles =
            "absolute bottom-[-32px] left-1/2 -translate-x-1/2 px-2.5 py-1 text-[10px] font-bold font-mono text-white whitespace-nowrap rounded-lg border border-white/10 opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:bottom-[-42px] shadow-[0_10px_25px_rgba(0,0,0,0.6)] uppercase tracking-wider";

        return (
            <ul
                ref={ref}
                className={cn("flex items-center justify-center gap-2", className)}
                {...props}
            >
                {items.map((item, index) => {
                    const isCurrentActive = activeMenu === item.ariaLabel;

                    return (
                        <li
                            key={index}
                            className="relative group"
                            onMouseEnter={() => setActiveMenu(item.ariaLabel)}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <a
                                href={item.href}
                                aria-label={item.ariaLabel}
                                className={cn(baseIconStyles, isCurrentActive && "border-transparent shadow-[0_0_20px_rgba(255,107,43,0.3)]")}
                            >
                                {/* Upward Sliding Liquid Fill Layer */}
                                <div
                                    className={cn(baseFilledStyles, isCurrentActive && "h-full")}
                                    style={{ backgroundColor: item.color }}
                                />

                                {/* Original Custom Vector Icon Vector Wrapper */}
                                <div className={cn(baseSvgStyles, isCurrentActive && "text-zinc-950 scale-105 icon-active")}>
                                    {item.icon}
                                </div>
                            </a>

                            {/* Downward Sweeping Tooltip Element */}
                            <div
                                className={cn(baseTooltipStyles, isCurrentActive && "opacity-100 visible bottom-[-42px]")}
                                style={{ backgroundColor: '#18181b' }} // Solid crisp container fill background
                            >
                                {item.tooltip}
                                {/* Small Top Pointer Arrow Indicator */}
                                <span
                                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 border-l border-t border-white/10"
                                    style={{ backgroundColor: '#18181b' }}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
);

NavTabsAnimation.displayName = "NavTabsAnimation";

export { NavTabsAnimation };