'use client';

import { InteractiveVideoMetric } from "@/components/ui/interactive-video-metric";

const METRIC_CASE_FILES = [
    {
        value: "3.8× ROAS",
        label: "Meta Conversion Ads",
        sublabel: "Scalable customer acquisition pipelines",
        videoUrl: "/videos/meta-campaign-case.mp4", // Swap to your target video paths
        destinationUrl: "https://your-meta-ads-proof-dashboard-link.com",
        accentColor: "#FF6B2B"
    },
    {
        value: "214% Reach",
        label: "TikTok Growth Matrix",
        sublabel: "High-velocity consumer engagement",
        videoUrl: "/videos/tiktok-reach-case.mp4",
        destinationUrl: "https://your-tiktok-proof-dashboard-link.com",
        accentColor: "#00f2fe"
    },
    {
        value: "94% Top-3",
        label: "Google Local Map Pack",
        sublabel: "Dominating local geo-search keywords",
        videoUrl: "/videos/google-maps-case.mp4",
        destinationUrl: "https://your-google-business-proof-link.com",
        accentColor: "#4285F4"
    }
];

export function ProofInNumbers() {
    return (
        <section id="proof" className="w-full py-24 bg-[#0a0a0b] border-t border-zinc-900 px-6">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Section Heading */}
                <div className="flex flex-col gap-2 max-w-xl">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#FF6B2B] uppercase">
                        Validated Metrics
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                        Proof in Numbers
                    </h2>
                </div>

                {/* Responsive Flex Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {METRIC_CASE_FILES.map((metric) => (
                        <InteractiveVideoMetric
                            key={metric.label}
                            value={metric.value}
                            label={metric.label}
                            sublabel={metric.sublabel}
                            videoUrl={metric.videoUrl}
                            destinationUrl={metric.destinationUrl}
                            accentColor={metric.accentColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}