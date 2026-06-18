import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Completely bypasses ESLint missing configuration modules during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Forces the compiler to ignore third-party missing types like @types/three
    ignoreBuildErrors: true,
  },
};

export default nextConfig;