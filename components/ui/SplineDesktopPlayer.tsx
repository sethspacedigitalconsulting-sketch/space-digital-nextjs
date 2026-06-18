'use client';

import Spline from '@splinetool/react-spline';

interface SplineDesktopPlayerProps {
    scene: string;
    className?: string;
}

export default function SplineDesktopPlayer({ scene, className }: SplineDesktopPlayerProps) {
    return <Spline scene={scene} className={className} />;
}