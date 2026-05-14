import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  // Next 16: Turbopack es default en build; optimizePackageImports promovido fuera de experimental
  optimizePackageImports: ["lucide-react"],
};

export default nextConfig;
