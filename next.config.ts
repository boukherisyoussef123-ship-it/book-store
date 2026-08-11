import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    proxyClientMaxBodySize: 50 * 1024 * 1024,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "riypxgxeuhzxvlygqacr.supabase.co",
      },
    ],
  },
} satisfies NextConfig;

export default nextConfig;