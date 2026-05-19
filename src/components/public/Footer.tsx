import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { NewsletterForm } from "@/components/public/NewsletterForm";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-white">
      {/* Acento superior con degradado rojo (separa visualmente del CTA) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-600 to-transparent"
      />
      <div
        aria-hidden
        className="absolute -right-40 -top-32 h-[420px] w-[420px] rounded-full bg-brand-700/10 blur-3xl"
      />

      <div className="container-page relative grid gap-12 py-16 md:grid-cols-12 md:gap-10 md:py-20">
        {/* Brand block */}
        <div className="md:col-span-5">
          <div className="inline-flex rounded-xl bg-white p-5 shadow-lift ring-1 ring-black/5">
            <Image
              src="/brand/logo.png"
              alt={siteConfig.name}
              width={280}
              height={88}
              className="h-14 w-auto"
            />
          </div>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-100">
            {siteConfig.legalName}.
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-400">
            {siteConfig.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 transition-all hover:bg-brand-600 hover:ring-brand-500"
            >
              <Instagram size={18} className="text-ink-200 transition-colors group-hover:text-white" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 transition-all hover:bg-brand-600 hover:ring-brand-500"
            >
              <Facebook size={18} className="text-ink-200 transition-colors group-hover:text-white" />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 transition-all hover:bg-brand-600 hover:ring-brand-500"
            >
              <Linkedin size={18} className="text-ink-200 transition-colors group-hover:text-white" />
            </a>
          </div>

          {/* Newsletter dentro del bloque de marca */}
          <div className="mt-8 max-w-md">
            <h3 className="font-display text-sm uppercase tracking-[0.22em] text-brand-400">
              Mantente al día
            </h3>
            <p className="mt-2 text-sm text-ink-300">
              Suscríbete y entérate primero de cursos, congresos y convocatorias.
            </p>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav aria-label="Navegación pie de página" className="md:col-span-3">
          <h3 className="font-display text-sm uppercase tracking-[0.22em] text-brand-400">
            Navegación
          </h3>
          <ul className="mt-5 space-y-3">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-1 text-base text-ink-100 transition-colors hover:text-brand-400"
                >
                  {item.label}
                  <ArrowUpRight
                    size={14}
                    aria-hidden
                    className="-mb-0.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto */}
        <div className="md:col-span-4">
          <h3 className="font-display text-sm uppercase tracking-[0.22em] text-brand-400">
            Contacto
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-ink-100">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-400" aria-hidden />
              <span className="leading-relaxed">{siteConfig.address}</span>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-start gap-3 transition-colors hover:text-brand-400"
              >
                <Mail size={18} className="mt-0.5 shrink-0 text-brand-400" aria-hidden />
                <span className="break-all leading-relaxed">{siteConfig.email}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="group flex items-start gap-3 transition-colors hover:text-brand-400"
              >
                <Phone size={18} className="mt-0.5 shrink-0 text-brand-400" aria-hidden />
                <span className="leading-relaxed">{siteConfig.phone}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Desde 1952 · Santiago, Chile</span>
            <span className="hidden md:inline" aria-hidden>
              ·
            </span>
            <span>
              Sitio desarrollado por{" "}
              <a
                href={siteConfig.developedBy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink-100 underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                {siteConfig.developedBy.name}
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
