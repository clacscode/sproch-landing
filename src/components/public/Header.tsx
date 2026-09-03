"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CreditCard, Menu, Phone, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

export interface PaymentLink {
  label: string;
  url: string;
}

/**
 * `paymentLink` llega del layout (se configura en /admin/configuracion).
 * Cuando es null el botón de pago simplemente no se renderiza.
 */
export function Header({ paymentLink = null }: { paymentLink?: PaymentLink | null }) {
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
        "fixed inset-x-0 top-0 z-40 w-full text-white transition-all duration-300",
        scrolled
          ? "bg-ink-950/80 supports-[backdrop-filter]:bg-ink-950/60 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/10 supports-[backdrop-filter]:backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      {/* Bar principal */}
      <div className="relative overflow-hidden">
        {/* Sutil gradiente rojo a la derecha para reforzar identidad sin tapar el logo */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-[-10%] w-[55%] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 70% 140% at 80% 50%, color-mix(in oklab, var(--color-brand-700) 28%, transparent) 0%, transparent 65%)",
          }}
        />
        <div
          className={cn(
            "container-page relative flex items-center justify-between gap-6 transition-[height] duration-500 ease-out",
            scrolled ? "h-16 md:h-20" : "h-20 md:h-32 lg:h-36",
          )}
        >
          <Link href="/" aria-label={siteConfig.legalName} className="inline-flex items-center">
            <Image
              src="/brand/logo-dark.png"
              alt={siteConfig.name}
              width={320}
              height={120}
              priority
              className={cn(
                "w-auto transition-[height] duration-500 ease-out",
                scrolled ? "h-10 md:h-14" : "h-14 md:h-24 lg:h-28",
              )}
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
                    "relative rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                    active ? "text-white" : "text-white/75 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "bg-brand-500 pointer-events-none absolute inset-x-3 -bottom-px h-0.5 rounded-full transition-all",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="group/btn border border-white/15 bg-white/10 text-white shadow-none ring-0 backdrop-blur transition-all hover:bg-white/15 hover:text-white"
            >
              <Link href="/socios">
                <UserPlus size={15} aria-hidden />
                Hazte socio
              </Link>
            </Button>
            {paymentLink && (
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="border-brand-500/45 bg-brand-500/10 hover:bg-brand-500/20 border text-white shadow-none ring-0 backdrop-blur transition-all hover:text-white"
              >
                <a href={paymentLink.url} target="_blank" rel="noopener noreferrer">
                  <CreditCard size={15} aria-hidden className="text-brand-400" />
                  {paymentLink.label}
                </a>
              </Button>
            )}
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn("bg-ink-950 border-t border-white/10 lg:hidden", open ? "block" : "hidden")}
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
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button
              asChild
              variant="secondary"
              className="border border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              <Link href="/socios">
                <UserPlus size={16} aria-hidden />
                Hazte socio
              </Link>
            </Button>
            {paymentLink && (
              <Button
                asChild
                variant="secondary"
                className="border-brand-500/45 bg-brand-500/10 hover:bg-brand-500/20 border text-white hover:text-white"
              >
                <a href={paymentLink.url} target="_blank" rel="noopener noreferrer">
                  <CreditCard size={16} aria-hidden className="text-brand-400" />
                  {paymentLink.label}
                </a>
              </Button>
            )}
            <Button asChild className={cn("btn-glow", paymentLink && "col-span-2")}>
              <Link href="/eventos">
                Inscríbete
                <ArrowRight size={16} aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="mt-3 flex flex-col gap-1 border-t border-white/10 pt-3 text-xs text-white/70">
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
