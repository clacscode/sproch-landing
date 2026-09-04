import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy.
 *
 * `script-src` lleva 'unsafe-inline' a propósito: Next inyecta los scripts de
 * hidratación en el HTML, y la alternativa (nonce por request) obliga a
 * renderizar todo dinámicamente, lo que anularía el ISR del que vive este
 * sitio. Aun así la política sirve: acota de qué orígenes se puede cargar
 * código y bloquea el embebido del sitio en iframes ajenos.
 *
 * En desarrollo hacen falta 'unsafe-eval' y ws: para el hot reload.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com",
  "font-src 'self' data:",
  `connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com${isDev ? " ws: wss:" : ""}`,
  // Mapa de OpenStreetMap embebido en /contacto.
  "frame-src 'self' https://www.openstreetmap.org",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Nadie puede meter el sitio dentro de un iframe (clickjacking).
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Equivalente antiguo de frame-ancestors, para navegadores que no leen CSP.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Un año de HTTPS obligatorio. Sin includeSubDomains: los subdominios de
  // servicio del hosting (webmail y compañía) quedarían inaccesibles si alguno
  // no tiene certificado propio.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
  // Ventana máxima de stale-while-revalidate en el Cache-Control de páginas
  // ISR. El default es 1 AÑO, y la CDN de Hostinger (hCDN) lo respeta: tras
  // un deploy siguió sirviendo HTML viejo que referenciaba chunks ya borrados
  // (páginas sin CSS / "Application error"). Con 10 min, cualquier copia CDN
  // caduca rápido.
  expireTime: 600,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
