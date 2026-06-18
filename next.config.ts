import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* This completely tells Next.js to compile your development assets out 
     of a local folder on your storage drive, bypassing OneDrive completely */
  distDir: 'node_modules/.next-cache',
};

export default nextConfig;