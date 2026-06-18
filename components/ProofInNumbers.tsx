'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Play } from 'lucide-react';

// Exact 5-item structural data stream
const PROOF_ITEMS = [
    {
        type: 'static',
        id: 'ulnar',
        title: 'Ulnar Medical Clinic',
        category: 'CLINICAL SEO & SITES',
        description: 'Custom Next.js infrastructure optimization driving a continuous patient acquisition pipeline and eliminating lead drop-off.',
        imageSrc: '/workflows/ulnar-medical-case.png', // Placed in public/workflows/
    },
    {
        type: 'static',
        id: 'wibify',
        title: 'Wibify Agency',
        category: 'INBOUND WEB ENGINE',
        description: 'High-performance operational scale blending clean digital presence with automated lead triage filters.',
        imageSrc: '/workflows/wibify-agency-case.png', // Placed in public/workflows/
    },
    {
        type: 'video',
        id: 'meta',
        value: '3.8× ROAS',
        label: 'Meta Conversion Ads',
        sublabel: 'Scalable client acquisition pipelines.',
        videoUrl: '/workflows/metaads.mp4', // Your exact relative web path asset
        destinationUrl: 'https://your-meta-ads-proof-dashboard.com',
        accentColor: '#FF6B2B'
    },
    {
        type: 'video',
        id: 'tiktok',
        value: '214% Reach',
        label: 'TikTok Growth Matrix',
        sublabel: 'High-velocity target audience engagement.',
        videoUrl: '/workflows/tiktokads.mp4',
        destinationUrl: 'https://your-tiktok-proof-dashboard.com',
        accentColor: '#00F2FE'
    },
    {
        type: 'video',
        id: 'google',
        value: '94% Map Pack',
        label: 'Google Local Optimization',
        sublabel: 'Dominating local geo-intent search visibility.',
        videoUrl: '/workflows/googlelocalads.mp4',
        destinationUrl: 'https://your-google-maps-proof-dashboard.com',
        accentColor: '#4285F4'
    }
];

export default function ProofInNumbers() {
    return (
        <section id="proof" className="w-full py-28 bg-[#0a0a0b] border-t border-zinc-900 px-6 select-none">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Section Header */}
                <div className="flex flex-col gap-2 max-w-xl">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#FF6B2B] uppercase">
                        Data Validation Hub
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white font-sans">
                        Proof in Numbers
                    </h2>
                </div>

                {/* 5-Column Clean Grid Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    {PROOF_ITEMS.map((item) => {
                        if (item.type === 'static') {
                            return (
                                <div
                                    key={item.id}
                                    className="group relative w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 overflow-hidden transition-all duration-300 hover:border-zinc-800/80 hover:bg-zinc-900/20 flex flex-col gap-4"
                                >
                                    <div className="flex flex-col z-10 relative">
                                        <span className="text-[10px] font-mono tracking-wider text-[#FF6B2B] font-bold mb-1">
                                            {item.category}
                                        </span>
                                        <h3 className="text-base font-bold text-white tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-zinc-400 font-sans mt-1.5 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-zinc-950">
                                        <Image
                                            src={item.imageSrc!}
                                            alt={item.title!}
                                            fill
                                            className="object-cover opacity-25 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 pointer-events-none" />
                                    </div>
                                </div>
                            );
                        }

                        // Render Dynamic Hover Video Card for items 3, 4, and 5
                        return (
                            <VideoMetricCard
                                key={item.id}
                                value={item.value!}
                                label={item.label!}
                                sublabel={item.sublabel!}
                                videoUrl={item.videoUrl!}
                                destinationUrl={item.destinationUrl!}
                                accentColor={item.accentColor!}
                            />
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

/* ── HIGH PERFORMANCE ASPECT-RATIO VIDEO ATOM ── */
function VideoMetricCard({ value, label, sublabel, videoUrl, destinationUrl, accentColor }: {
    value: string; label: string; sublabel: string; videoUrl: string; destinationUrl: string; accentColor: string;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [aspectRatio, setAspectRatio] = useState<number>(16 / 9); // Base default ratio fallback

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            const w = videoRef.current.videoWidth;
            const h = videoRef.current.videoHeight;
            if (w && h) setAspectRatio(w / h); // Dynamically scale box matching native file dimensions
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.muted = true;
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isPlaying]);

    return (
        <div
            onMouseEnter={() => setIsPlaying(true)}
            onMouseLeave={() => setIsPlaying(false)}
            onClick={() => window.open(destinationUrl, '_blank', 'noopener,noreferrer')}
            className="group relative w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 overflow-hidden transition-all duration-300 hover:border-zinc-800/80 hover:bg-zinc-900/20 flex flex-col gap-4 cursor-pointer"
        >
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
                    <ArrowUpRight size={12} className="text-zinc-400 group-hover:text-white" />
                </div>
            </div>

            {/* Dynamic Video Frame Box container */}
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
                    className="w-full h-full object-cover opacity-25 group-hover:opacity-100 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Play Overlay Indicator Icon */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${isPlaying ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                    <div className="w-10 h-10 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                        <Play size={14} className="text-white fill-white ml-0.5 opacity-80" />
                    </div>
                </div>
            </div>

            {/* Under-layer Glow Accent Pod */}
            <div
                className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full filter blur-[40px] opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-15"
                style={{ backgroundColor: accentColor }}
            />
        </div>
    );
}