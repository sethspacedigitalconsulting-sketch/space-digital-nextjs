"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
    id: number;
    title: string;
    date: string;
    content: string;
    category: string;
    icon: React.ElementType;
    relatedIds: number[];
    status: "completed" | "in-progress" | "pending";
    energy: number;
}

interface RadialOrbitalTimelineProps {
    timelineData: TimelineItem[];
}

export function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
    const [rotationAngle, setRotationAngle] = useState<number>(0);
    const [autoRotate, setAutoRotate] = useState<boolean>(true);
    const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
    const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const toggleItem = (id: number) => {
        setExpandedItems((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) newState[parseInt(key)] = false;
            });
            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);
                const relatedItems = getRelatedItems(id);
                const newPulseEffect: Record<number, boolean> = {};
                relatedItems.forEach((relId) => { newPulseEffect[relId] = true; });
                setPulseEffect(newPulseEffect);
                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }
            return newState;
        });
    };

    useEffect(() => {
        let rotationTimer: NodeJS.Timeout;
        if (autoRotate) {
            rotationTimer = setInterval(() => {
                setRotationAngle((prev) => (prev + 0.3) % 360);
            }, 50);
        }
        return () => { if (rotationTimer) clearInterval(rotationTimer); };
    }, [autoRotate]);

    const centerViewOnNode = (nodeId: number) => {
        if (!nodeRefs.current[nodeId]) return;
        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        const targetAngle = (nodeIndex / timelineData.length) * 360;
        setRotationAngle(270 - targetAngle);
    };

    const calculateNodePosition = (index: number, total: number) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radius = 220;
        const radian = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radian) + centerOffset.x;
        const y = radius * Math.sin(radian) + centerOffset.y;
        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
        return { x, y, angle, zIndex, opacity };
    };

    const getRelatedItems = (itemId: number): number[] => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const isRelatedToActive = (itemId: number): boolean => {
        if (!activeNodeId) return false;
        return getRelatedItems(activeNodeId).includes(itemId);
    };

    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center bg-[#0a0a0b] overflow-hidden relative select-none"
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center scale-95 md:scale-100">
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    ref={orbitRef}
                    style={{
                        perspective: "1000px",
                        transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
                    }}
                >
                    {/* Centered Energy Core Matrix */}
                    <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B2B] via-orange-600 to-zinc-900 animate-pulse flex items-center justify-center z-10 shadow-[0_0_40px_rgba(255,107,43,0.3)]">
                        <div className="absolute w-20 h-20 rounded-full border border-[#FF6B2B]/20 animate-ping opacity-70"></div>
                        <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#FF6B2B] rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Outer Ring Track */}
                    <div className="absolute w-[440px] h-[440px] rounded-full border border-white/5 pointer-events-none"></div>

                    {timelineData.map((item, index) => {
                        const position = calculateNodePosition(index, timelineData.length);
                        const isExpanded = expandedItems[item.id];
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = pulseEffect[item.id];
                        const NodeIcon = item.icon;

                        return (
                            <div
                                key={item.id}
                                ref={(el) => { if (el) nodeRefs.current[item.id] = el; }}
                                className="absolute transition-all duration-700 ease-out flex flex-col items-center justify-center"
                                style={{
                                    transform: `translate(${position.x}px, ${position.y}px)`,
                                    zIndex: isExpanded ? 200 : position.zIndex,
                                    opacity: isExpanded ? 1 : position.opacity,
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(item.id);
                                }}
                            >
                                {/* Aura Layer Glow Ring */}
                                <div
                                    className={`absolute rounded-full pointer-events-none transition-all duration-500 ${isPulsing ? "animate-pulse" : ""}`}
                                    style={{
                                        background: `radial-gradient(circle, rgba(255,107,43,0.15) 0%, transparent 70%)`,
                                        width: `${item.energy * 0.6 + 60}px`,
                                        height: `${item.energy * 0.6 + 60}px`,
                                    }}
                                />

                                {/* Main Interactive Button Node */}
                                <div className={`
                  w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 border
                  ${isExpanded ? "bg-[#FF6B2B] text-zinc-950 border-white shadow-[0_0_25px_#FF6B2B]" :
                                        isRelated ? "bg-zinc-900 text-[#FF6B2B] border-[#FF6B2B] animate-pulse" : "bg-zinc-950 text-white border-white/10 hover:border-white/30"}
                  ${isExpanded ? "scale-125" : "scale-100"}
                `}>
                                    <NodeIcon size={16} className={isExpanded ? "stroke-[2.5]" : "stroke-[1.8]"} />
                                </div>

                                {/* Floating Node Label */}
                                <div className={`absolute top-14 whitespace-nowrap text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300 ${isExpanded ? "text-[#FF6B2B] scale-105" : "text-white/60"}`}>
                                    {item.title}
                                </div>

                                {/* Expandable Data Detail Window */}
                                {isExpanded && (
                                    <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-64 bg-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-2xl overflow-visible z-[300]">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#FF6B2B]/40"></div>
                                        <CardHeader className="p-4 pb-2">
                                            <div className="flex justify-between items-center gap-2">
                                                <Badge className="px-2 py-0.5 text-[9px] font-mono font-bold bg-white text-zinc-950 tracking-wider">
                                                    {item.category}
                                                </Badge>
                                                <span className="text-[10px] font-mono text-zinc-500 tracking-tight">{item.date}</span>
                                            </div>
                                            <CardTitle className="text-xs font-bold text-white mt-2 tracking-tight leading-tight">
                                                {item.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0 text-[11px] text-zinc-400 font-sans leading-relaxed flex flex-col gap-3">
                                            <p>{item.content}</p>

                                            {/* Progress Bar */}
                                            <div className="pt-2 border-t border-white/5">
                                                <div className="flex justify-between items-center text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1">
                                                    <span className="flex items-center gap-1"><Zap size={10} className="text-[#FF6B2B]" /> Efficiency Level</span>
                                                    <span>{item.energy}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-[#FF6B2B] to-orange-400" style={{ width: `${item.energy}%` }}></div>
                                                </div>
                                            </div>

                                            {/* Inter-Node Connections */}
                                            {item.relatedIds.length > 0 && (
                                                <div className="pt-2 border-t border-white/5">
                                                    <div className="flex items-center gap-1 mb-2">
                                                        <Link size={10} className="text-[#FF6B2B]" />
                                                        <h4 className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500">Connected System</h4>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        {item.relatedIds.map((relatedId) => {
                                                            const relNode = timelineData.find((n) => n.id === relatedId);
                                                            return (
                                                                <Button
                                                                    key={relatedId}
                                                                    variant="outline"
                                                                    className="justify-between text-left h-7 px-2 text-[10px] font-mono border-white/5 bg-zinc-900/40 hover:bg-zinc-900 hover:text-white text-zinc-300 transition-all rounded-md w-full"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleItem(relatedId);
                                                                    }}
                                                                >
                                                                    <span>{relNode?.title}</span>
                                                                    <ArrowRight size={10} className="text-[#FF6B2B]" />
                                                                </Button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}