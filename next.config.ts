import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || "https://mrv-jerky-backend.onrender.com/api",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || 'https://mrv-jerky-backend.onrender.com/api'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
