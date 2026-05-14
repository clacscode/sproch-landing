import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateRange } from "@/lib/format";
import type { EventItem } from "@/lib/types";

interface HeroProps {
  featured: EventItem | null;
}

export function Hero({ featured }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-2/5 bg-[linear-gradient(135deg,_var(--color-brand-600)_0%,_transparent_70%)] opacity-90"
      />
      <div
        aria-hidden
        className="absolute -right-32 top-1/3 h-[480px] w-[480px] rounded-full bg-brand-600/20 blur-3xl"
      />
      <div className="brand-bars" aria-hidden />
      <div className="container-page relative grid gap-12 py-20 md:grid-cols-12 md:py-28 lg:py-32">
        <div className="md:col-span-7">
          {featured && (
            <Badge variant="dark" className="bg-white/10 text-white">
              Próximo congreso · {featured.category}
            </Badge>
          )}
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[88px]">
            Desde 1952
            <br />
            avanzando la
            <span className="block text-brand-500">rehabilitación oral</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-200 md:text-lg">
            La Sociedad de Prótesis y Rehabilitación Oral de Chile reúne a especialistas,
            académicos y residentes en torno a la formación continua, la investigación y
            la actualización clínica.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/eventos">
                Cursos y congresos
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40">
              <Link href="/nosotros">Conoce SPROCh</Link>
            </Button>
          </div>
        </div>

        {featured && (
          <aside className="md:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-6 shadow-lift backdrop-blur md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
                Congreso destacado
              </p>
              <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-sm text-ink-200">{featured.summary}</p>
              <ul className="mt-6 space-y-2 text-sm text-ink-100">
                <li className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-brand-500" />
                  {formatDateRange(featured.startDate, featured.endDate)}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-500" />
                  {featured.location}
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                <Button asChild>
                  <Link href={`/eventos/${featured.slug}`}>Más información</Link>
                </Button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
