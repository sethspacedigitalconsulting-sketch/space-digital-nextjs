'use client';

import React, { useCallback, useRef } from "react";
import { useMousePositionRef } from "@/components/hooks/use-mouse-position-ref";
import { motion, useAnimationFrame } from "framer-motion";

interface FontVariationAxis {
    name: string;
    min: number;
    max: number;
}

interface FontVariationMapping {
    x: FontVariationAxis;
    y: FontVariationAxis;
}

interface TextProps {
    label: string;
    fontVariationMapping: FontVariationMapping;
    containerRef: React.RefObject<HTMLDivElement | null>;
    className?: string;
    onClick?: () => void;
}

const VariableFontAndCursor = ({
    label,
    fontVariationMapping,
    className,
    containerRef,
    onClick,
    ...props
}: TextProps) => {
    // Uses the hyper-optimized ref hook for zero-lag layout interpolation
    const mousePositionRef = useMousePositionRef(containerRef);
    const spanRef = useRef<HTMLSpanElement>(null);

    const interpolateFontVariationSettings = useCallback(
        (xPosition: number, yPosition: number) => {
            const container = containerRef.current;
            if (!container) return "'wght' 400, 'slnt' 0";

            const containerWidth = container.clientWidth || 1;
            const containerHeight = container.clientHeight || 1;

            const xProgress = Math.min(Math.max(xPosition / containerWidth, 0), 1);
            const yProgress = Math.min(Math.max(yPosition / containerHeight, 0), 1);

            const xValue =
                fontVariationMapping.x.min +
                (fontVariationMapping.x.max - fontVariationMapping.x.min) * xProgress;
            const yValue =
                fontVariationMapping.y.min +
                (fontVariationMapping.y.max - fontVariationMapping.y.min) * yProgress;

            return `'${fontVariationMapping.x.name}' ${xValue}, '${fontVariationMapping.y.name}' ${yValue}`;
        },
        [containerRef, fontVariationMapping]
    );

    useAnimationFrame(() => {
        // Reads directly from mutable current parameters without causing continuous component re-renders
        const settings = interpolateFontVariationSettings(
            mousePositionRef.current.x,
            mousePositionRef.current.y
        );
        if (spanRef.current) {
            spanRef.current.style.fontVariationSettings = settings;
        }
    });

    return (
        <motion.span
            ref={spanRef}
            className={`${className} inline-block select-none`}
            onClick={onClick}
            {...props}
        >
            {label}
        </motion.span>
    );
};

export { VariableFontAndCursor };