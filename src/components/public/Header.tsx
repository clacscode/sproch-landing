"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Phone, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all",
        scrolled
          ? "border-ink-100 bg-white/95 shadow-card backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "border-transparent bg-white",
      )}
    >
      {/* Top bar fina: contacto rápido */}
      <div className="hidden border-b border-ink-100 bg-ink-50/60 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs text-ink-600">
          <p className="font-medium tracking-wide text-ink-700">
            Sociedad de Prótesis y Rehabilitación Oral de Chile
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-700"
            >
              <Phone size={12} aria-hidden />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors hover:text-brand-700"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Bar principal */}
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          aria-label={siteConfig.legalName}
          className="inline-flex items-center"
        >
          <Image
            src="/brand/logo.png"
            alt={siteConfig.name}
            width={180}
            height={48}
            priority
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 md:flex"
          aria-label="Principal"
        >
          {siteConfig.navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-brand-700"
                    : "text-ink-700 hover:bg-ink-50 hover:text-ink-900",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-600 transition-all",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="group/btn ring-1 ring-ink-900/10 transition-all hover:shadow-card"
          >
            <Link href="/socios">
              <UserPlus size={15} aria-hidden />
              Hazte socio
            </Link>
          </Button>
          <Button asChild size="sm" className="btn-glow group/btn">
            <Link href="/eventos">
              Inscríbete
              <ArrowRight
                size={15}
                aria-hidden
                className="transition-transform group-hover/btn:translate-x-0.5"
              />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-900 hover:bg-ink-100 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-ink-100 bg-white md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Móvil">
          {siteConfig.navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-medium transition-colors",
                  active ? "bg-brand-50 text-brand-700" : "text-ink-800 hover:bg-ink-50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button asChild variant="secondary">
              <Link href="/socios">
                <UserPlus size={16} aria-hidden />
                Hazte socio
              </Link>
            </Button>
            <Button asChild className="btn-glow">
              <Link href="/eventos">
                Inscríbete
                <ArrowRight size={16} aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="mt-3 flex flex-col gap-1 border-t border-ink-100 pt-3 text-xs text-ink-600">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2"
            >
              <Phone size={12} aria-hidden />
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
