import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarRange, Mail, Newspaper, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const quickLinks = [
  {
    href: "/eventos",
    label: "Cursos y congresos",
    description: "Agenda académica vigente con cupos y fechas confirmadas.",
    Icon: CalendarRange,
  },
  {
    href: "/noticias",
    label: "Noticias",
    description: "Comunicados oficiales y publicaciones de la sociedad.",
    Icon: Newspaper,
  },
  {
    href: "/socios",
    label: "Hazte socio",
    description: "Beneficios, formación continua y certificación SPROCh.",
    Icon: Users,
  },
];

export default function NotFound() {
  return (
    <main className="grain-overlay relative isolate flex min-h-screen flex-col overflow-hidden bg-ink-950 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_color-mix(in_oklab,_var(--color-brand-700)_50%,_transparent)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_color-mix(in_oklab,_var(--color-brand-900)_35%,_transparent)_0%,_transparent_55%)]"
      />
      <div className="brand-bars opacity-70" aria-hidden />
      <div className="hero-rays" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]"
      />

      {/* Tiny brand mark top-left */}
      <Link
        href="/"
        className="container-page relative mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-300 transition-colors hover:text-brand-200"
      >
        <span aria-hidden className="h-px w-10 bg-brand-500" />
        SPROCh · {siteConfig.legalName}
      </Link>

      <div className="container-page relative flex flex-1 flex-col justify-center py-16 md:py-24">
        <div className="grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-300">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Error 404
            </p>
            <p
              aria-hidden
              className="mt-4 font-display text-[160px] uppercase leading-[0.85] tracking-tighter text-white/10 sm:text-[220px] md:text-[280px]"
            >
              404
            </p>
            <h1 className="-mt-16 font-display text-5xl uppercase leading-[0.92] tracking-tight md:-mt-24 md:text-7xl lg:text-[96px]">
              Esta página
              <span className="block text-brand-400 drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
                se nos perdió
              </span>
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-6">
            <p className="max-w-md text-base text-ink-200 md:text-lg">
              La ruta que buscas no existe o fue movida. Aquí tienes algunos atajos para retomar
              la navegación por el sitio.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild size="lg" className="btn-glow">
                <Link href="/">
                  Volver al inicio
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
              >
                <Link href="/contacto">
                  Reportar problema
                  <Mail size={15} aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick links editorial */}
        <ul className="mt-16 grid gap-5 border-t border-white/10 pt-10 md:mt-24 md:grid-cols-3">
          {quickLinks.map(({ href, label, description, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08]"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-white/15">
                      <Icon size={20} aria-hidden />
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300"
                    />
                  </div>
                  <p className="mt-6 font-display text-xl uppercase leading-tight tracking-tight text-white md:text-2xl">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
