import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function HeroVariantEditorial() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="container-page relative grid items-stretch gap-0 md:grid-cols-12 md:gap-12">
        <div className="relative py-14 md:col-span-6 md:py-24">
          <div className="inline-flex items-center gap-3 rounded-full border border-ink-200 bg-ink-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-700">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            Sociedad científica · Desde 1952
          </div>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-ink-900 md:text-7xl">
            Avanzando la
            <span className="block text-brand-600">rehabilitación oral</span>
            <span className="block text-ink-900">en Chile</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-600 md:text-lg">
            La Sociedad de Prótesis y Rehabilitación Oral de Chile reúne a especialistas,
            académicos y residentes en torno a la formación continua, la investigación y la
            actualización clínica.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="btn-glow">
              <Link href="/eventos">
                Cursos y congresos
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/socios">Hazte socio</Link>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ink-100 pt-6">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                Fundada
              </dt>
              <dd className="mt-1 font-display text-2xl text-ink-900">1952</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                Próximo
              </dt>
              <dd className="mt-1 font-display text-2xl text-brand-600">2026</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                Sede
              </dt>
              <dd className="mt-1 font-display text-2xl text-ink-900">CL</dd>
            </div>
          </dl>
        </div>

        <div className="relative md:col-span-6">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[600px]">
            <Image
              src="/brand/DSC05641.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent"
            />

            {/* Pill flotante con el logo */}
            <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-xl bg-white/95 p-2.5 pr-4 shadow-lift ring-1 ring-black/5 backdrop-blur md:left-8 md:top-8">
              <Image
                src="/brand/logo.png"
                alt={siteConfig.name}
                width={120}
                height={36}
                className="h-8 w-auto"
              />
            </div>

            {/* Card de congreso pegada abajo derecha */}
            <div className="absolute inset-x-4 bottom-4 rounded-xl bg-ink-950/85 p-4 text-white shadow-lift backdrop-blur md:inset-x-8 md:bottom-8 md:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-400">
                Próximo Congreso
              </p>
              <p className="mt-1 font-display text-base uppercase leading-tight md:text-lg">
                SPROCh 2026 — ADA: de lo análogo y digital a la AI
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-1.5 text-xs text-ink-200 sm:grid-cols-2">
                <li className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-brand-400" aria-hidden />
                  29 jul — 1 ago 2026
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-brand-400" aria-hidden />
                  Marina Las Condes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
