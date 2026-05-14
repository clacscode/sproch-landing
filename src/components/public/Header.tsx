"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
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
        "sticky top-0 z-40 w-full transition-all",
        scrolled
          ? "bg-white/90 shadow-card backdrop-blur supports-[backdrop-filter]:bg-white/75"
          : "bg-white",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {siteConfig.navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  active ? "text-brand-700" : "text-ink-700 hover:text-ink-900",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-[2px] bg-brand-600 transition-all",
                    active ? "w-full" : "w-0",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/eventos">Inscríbete al congreso</Link>
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
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-medium",
                  active ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Button asChild className="mt-2">
            <Link href="/eventos">Inscríbete al congreso</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
