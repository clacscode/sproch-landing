import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-950 text-ink-100">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="rounded-lg bg-white p-3 inline-block">
            <Logo />
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-300">
            {siteConfig.legalName}. {siteConfig.tagline}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-800 transition-colors hover:bg-brand-600"
            >
              <Instagram size={18} />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-800 transition-colors hover:bg-brand-600"
            >
              <Facebook size={18} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-800 transition-colors hover:bg-brand-600"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-200 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
            Contacto
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-200">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-500" />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-brand-500" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-brand-500" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-800">
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
                className="font-medium text-ink-200 transition-colors hover:text-white"
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
