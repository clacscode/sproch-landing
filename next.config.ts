import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Salida autocontenida: el deploy sube .next/standalone (server + node_modules
  // traceados) y el server arranca con `node server.js`. Permite compilar en CI
  // y desplegar el resultado sin reconstruir en el servidor saturado.
  output: "standalone",
  // Mantener Prisma FUERA del bundle del servidor. Si Next lo empaqueta en el
  // grafo de Server Actions, sus objetos internos (Prisma.Decimal, etc.) se
  // vuelven "client references" y crear/editar revienta con
  // "Cannot access toStringTag ... temporary client reference".
  serverExternalPackages: ["@prisma/client", "prisma", ".prisma/client"],
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
