import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Salida autocontenida: el deploy sube .next/standalone (server + node_modules
  // traceados) y el server arranca con `node server.js`. Permite compilar en CI
  // y desplegar el resultado sin reconstruir en el servidor saturado.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
