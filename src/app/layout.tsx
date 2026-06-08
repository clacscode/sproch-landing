import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Bebas_Neue } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { siteConfig } from "@/lib/site";
import "@/styles/globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-brand",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.legalName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "SPROCh",
    "Sproch",
    "Sproch Chile",
    "Sociedad de Prótesis Chile",
    "Prótesis dental",
    "Rehabilitación oral",
    "Prostodoncia",
    "Implantología",
    "Odontología",
    "Congreso odontológico",
    "Providencia",
    "Santiago",
    "Chile",
  ],
  authors: [{ name: siteConfig.legalName }],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteConfig.url,
    title: siteConfig.legalName,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.legalName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.legalName,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon-256.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#e30613",
  width: "device-width",
  initialScale: 1,
};

// Variantes de grafía de la sigla, para que Google asocie cualquier forma de
// "sproch" buscada con la entidad y su nombre completo.
const brandAliases = ["SPROCh", "Sproch", "Sproch Chile", "SPROCH"];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  alternateName: brandAliases,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/logo.png`,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  description: siteConfig.description,
  foundingDate: "1952",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Santa María 1990, Piso 3",
    addressLocality: "Providencia",
    addressRegion: "Región Metropolitana",
    addressCountry: "CL",
  },
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: "CL",
    availableLanguage: ["Spanish"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.legalName,
  alternateName: brandAliases,
  url: siteConfig.url,
  inLanguage: "es-CL",
  publisher: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/noticias?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className={`${jakarta.variable} ${bebas.variable}`}>
      <body className="min-h-screen bg-white text-ink-900 antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
