import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Disable type checking during build for compatibility
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
