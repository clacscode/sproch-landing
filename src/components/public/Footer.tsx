import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: siteConfig.social.instagram },
  { name: "Facebook", icon: Facebook, href: siteConfig.social.facebook },
  { name: "LinkedIn", icon: Linkedin, href: siteConfig.social.linkedin },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain-overlay relative isolate overflow-hidden bg-ink-950 text-white">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_70%)] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]"
      />

      {/* Top eyebrow strip */}
      <div className="container-page relative pt-16 md:pt-20">
        <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-500">
          <span aria-hidden className="h-px w-10 bg-brand-500" />
          Sociedad de Prótesis · Desde 1952
        </p>
      </div>

      <div className="container-page relative grid gap-12 pb-16 pt-10 md:grid-cols-12 md:gap-10 md:pb-20 md:pt-14">
        {/* Brand block */}
        <div className="md:col-span-5">
          <Image
            src="/brand/logo-dark.png"
            alt={siteConfig.name}
            width={320}
            height={120}
            className="h-16 w-auto md:h-20"
          />
          <p className="mt-7 max-w-md font-display text-2xl uppercase leading-tight tracking-tight text-white md:text-3xl">
            {siteConfig.tagline}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            {socialLinks.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:ring-brand-500"
              >
                <Icon
                  size={18}
                  aria-hidden
                  className="text-ink-200 transition-colors group-hover:text-white"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Navegación */}
        <nav aria-label="Navegación pie de página" className="md:col-span-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-500">
            Navegación
          </p>
          <ul className="mt-5 space-y-3.5">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-1.5 font-display text-base uppercase tracking-tight text-ink-100 transition-colors hover:text-brand-500"
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
            <li>
              <Link
                href="/socios"
                className="group inline-flex items-center gap-1.5 font-display text-base uppercase tracking-tight text-ink-100 transition-colors hover:text-brand-500"
              >
                Hazte socio
                <ArrowUpRight
                  size={14}
                  aria-hidden
                  className="-mb-0.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contacto */}
        <div className="md:col-span-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-500">
            Contacto
          </p>
          <ul className="mt-5 space-y-4 text-sm text-ink-100">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
              <span className="leading-relaxed">{siteConfig.address}</span>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-start gap-3 transition-colors hover:text-brand-500"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                <span className="break-all leading-relaxed">{siteConfig.email}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="group flex items-start gap-3 transition-colors hover:text-brand-500"
              >
                <Phone size={16} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                <span className="leading-relaxed">{siteConfig.phone}</span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-ink-300">
              <Clock size={16} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
              <span className="leading-relaxed">Lunes a viernes · 09 a 18 hrs</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs uppercase tracking-[0.18em] text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Santiago, Chile</span>
            <span aria-hidden className="text-ink-700">
              ·
            </span>
            <span className="normal-case tracking-normal">
              Sitio desarrollado por{" "}
              <a
                href={siteConfig.developedBy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold uppercase tracking-[0.18em] text-ink-200 transition-colors hover:text-white"
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
