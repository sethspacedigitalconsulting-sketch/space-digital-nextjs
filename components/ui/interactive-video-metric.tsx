'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { cn } from "@/lib/utils";

interface InteractiveVideoMetricProps {
    value: string;
    label: string;
    sublabel: string;
    videoUrl: string;
    destinationUrl: string;
    accentColor?: string;
}

export function InteractiveVideoMetric({
    value,
    label,
    sublabel,
    videoUrl,
    destinationUrl,
    accentColor = "#FF6B2B"
}: InteractiveVideoMetricProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Track dynamic aspect ratio based on the raw file metadata dimensions
    const [aspectRatio, setAspectRatio] = useState<number>(16 / 9); // Fallback base ratio

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;
            if (videoWidth && videoHeight) {
                setAspectRatio(videoWidth / videoHeight);
            }
        }
    };

    const handleMouseEnter = async () => {
        setIsPlaying(true);
        if (videoRef.current) {
            try {
                await videoRef.current.play();
            } catch (err) {
                console.warn("Video playback interrupted:", err);
            }
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const handleCardClick = () => {
        if (destinationUrl && destinationUrl !== "#") {
            window.open(destinationUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
            className="group relative w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 overflow-hidden transition-all duration-300 hover:border-zinc-800/80 hover:bg-zinc-900/20 flex flex-col gap-4 select-none cursor-pointer"
        >
            {/* Upper Data Deck */}
            <div className="flex justify-between items-start z-10 relative">
                <div className="flex flex-col">
                    <span className="text-3xl font-black tracking-tighter text-white tabular-nums leading-none mb-1.5">
                        {value}
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                        {label}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-sans mt-0.5">
                        {sublabel}
                    </span>
                </div>

                <div className="w-7 h-7 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight size={12} className="text-zinc-400 transition-colors group-hover:text-white" />
                </div>
            </div>

            {/* ── DYNAMIC DIMENSION CONTAINER ── */}
            {/* Aspect ratio style property dynamically scales the layout block matching the raw file metadata */}
            <div
                className="relative w-full overflow-hidden rounded-xl border border-white/5 bg-zinc-950 transition-all duration-300"
                style={{ aspectRatio: aspectRatio }}
            >
                <video
                    ref={videoRef}
                    src={videoUrl}
                    loop
                    muted
                    playsInline
                    onLoadedMetadata={handleLoadedMetadata}
                    className="w-full h-full object-cover opacity-25 group-hover:opacity-100 transition-all duration-500 ease-out scale-100 group-hover:scale-[1.01]"
                />

                {/* Shadow Overlay Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Icon State Overlays */}
                <div className={cn(
                    "absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300",
                    isPlaying ? "opacity-0 scale-90" : "opacity-100 scale-100"
                )}>
                    <div className="w-10 h-10 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                        <Play size={14} className="text-white fill-white ml-0.5 opacity-80" />
                    </div>
                </div>
            </div>

            <div
                className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full filter blur-[40px] opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-15"
                style={{ backgroundColor: accentColor }}
            />
        </div>
    );
}