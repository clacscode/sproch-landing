"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronDown, MapPin, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateRange } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import type { EventItem } from "@/lib/types";

interface HeroCarouselProps {
  featured: EventItem | null;
}

interface Slide {
  key: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: { src: string; alt: string };
  side?: React.ReactNode;
}

const ROTATION_MS = 7000;

export function HeroCarousel({ featured }: HeroCarouselProps) {
  const slides: Slide[] = React.useMemo(() => {
    const base: Slide[] = [
      {
        key: "main",
        eyebrow: "Desde 1952",
        title: (
          <>
            Avanzando la
            <span className="block text-brand-400 drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">rehabilitación oral</span>
          </>
        ),
        description:
          "La Sociedad de Prótesis y Rehabilitación Oral de Chile reúne a especialistas, académicos y residentes en torno a la formación continua, la investigación y la actualización clínica.",
        primaryCta: { label: "Cursos y congresos", href: "/eventos" },
        secondaryCta: { label: "Conoce SPROCh", href: "/nosotros" },
        image: {
          src: "/brand/sproch1.jpg",
          alt: "Instrumental clínico de odontología y modelo dental sobre superficie de trabajo",
        },
      },
      {
        key: "congress",
        eyebrow: featured ? `Próximo · ${featured.category.toLowerCase()}` : "Congreso 2026",
        title: featured ? (
          <>
            Congreso
            <span className="block text-brand-400 drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">SPROCh 2026</span>
          </>
        ) : (
          <>
            Congreso
            <span className="block text-brand-400 drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">SPROCh 2026</span>
          </>
        ),
        description:
          featured?.summary ??
          "Tres días con expositores internacionales en Santiago. De lo análogo y digital a la inteligencia artificial.",
        primaryCta: featured
          ? { label: "Ver programa", href: `/eventos/${featured.slug}` }
          : { label: "Ver agenda", href: "/eventos" },
        secondaryCta: { label: "Quiero inscribirme", href: "/contacto" },
        side: featured ? <CongressCard event={featured} /> : null,
        image: {
          src: "/brand/sproch-3.jpeg",
          alt: "Docente explicando un modelo dental como parte de la formación continua",
        },
      },
      {
        key: "member",
        eyebrow: "Hazte socio",
        title: (
          <>
            Una comunidad
            <span className="block text-brand-400 drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">que respalda tu carrera</span>
          </>
        ),
        description:
          "Acceso a cursos con tarifa preferente, publicaciones, certificaciones y la red iberoamericana de sociedades hermanas.",
        primaryCta: { label: "Quiero hacerme socio", href: "/contacto" },
        secondaryCta: { label: "Ver beneficios", href: "/nosotros" },
        image: {
          src: "/brand/sproch-2.jpeg",
          alt: "Paciente recibiendo atención odontológica especializada",
        },
      },
    ];
    return base;
  }, [featured]);

  const [index, setIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [playing, slides.length]);

  const go = (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length);

  return (
    <section
      className="relative isolate overflow-hidden bg-ink-950 text-white"
      aria-roledescription="carousel"
      aria-label="Mensajes destacados"
    >
      {/* Background images por slide */}
      <div aria-hidden className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.key}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <Image
              src={slide.image.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center scale-105"
            />
          </div>
        ))}
      </div>

      {/* Overlay degradado: oscuro a la izquierda para legibilidad, transparente a la derecha */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(12,12,16,0.97)_0%,rgba(12,12,16,0.9)_35%,rgba(12,12,16,0.55)_70%,rgba(40,4,8,0.7)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/3 bg-[radial-gradient(ellipse_at_left,_var(--color-brand-700)_0%,_transparent_70%)] opacity-25 mix-blend-screen"
      />

      <div className="brand-bars" aria-hidden />
      <div className="hero-rays" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]"
      />

      <div className="container-page relative grid gap-10 py-14 md:grid-cols-12 md:py-28 lg:py-32">
        <div className="md:col-span-7 lg:col-span-7">
          {/* Sello compacto del logo solo en mobile */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-xl bg-white/95 p-2.5 pr-4 shadow-lift ring-1 ring-black/5 md:hidden">
            <Image
              src="/brand/logo.png"
              alt={siteConfig.name}
              width={140}
              height={42}
              priority
              className="h-9 w-auto"
            />
          </div>

          <p className="mb-6 hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-300 md:inline-flex md:mb-8">
            <span aria-hidden className="h-px w-10 bg-brand-500" />
            Sociedad de Prótesis y Rehabilitación Oral · Chile
          </p>

          <div className="carousel-fade relative min-h-[22rem] sm:min-h-[24rem] md:min-h-[28rem]">
            {slides.map((slide, i) => (
              <div key={slide.key} className="slide" data-active={i === index}>
                <Badge variant="dark" className="bg-white/10 text-white">
                  {slide.eyebrow}
                </Badge>
                <h1 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:mt-6 md:text-7xl lg:text-[88px]">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-xl text-base text-ink-100 md:text-lg">
                  {slide.description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="btn-glow transition-shadow">
                    <Link href={slide.primaryCta.href}>
                      {slide.primaryCta.label}
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                  {slide.secondaryCta && (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
                    >
                      <Link href={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
              {slides.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Ir al slide ${i + 1}`}
                  onClick={() => go(i)}
                  className="group h-2 w-8 overflow-hidden rounded-full bg-white/15"
                >
                  <span
                    className={
                      "block h-full bg-brand-500 transition-all " +
                      (i === index ? "w-full" : "w-0 group-hover:w-1/3")
                    }
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pausar carrusel" : "Reanudar carrusel"}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>
        </div>

        <aside className="hidden md:col-span-5 md:block lg:col-span-5">
          <div className="relative aspect-[5/6] w-full overflow-hidden rounded-2xl bg-[#f7f3ee] shadow-lift ring-1 ring-black/5">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700"
            />
            <div className="relative flex h-full flex-col items-center justify-center gap-7 p-10 text-center">
              <Image
                src="/brand/logo.png"
                alt={siteConfig.name}
                width={420}
                height={150}
                priority
                className="h-auto w-full max-w-[300px] drop-shadow-[0_10px_28px_rgba(227,6,19,0.18)]"
              />
              <div>
                <p className="font-display text-5xl uppercase leading-none tracking-tight text-ink-900">
                  SPROCh
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.32em] text-brand-700">
                  Desde 1952
                </p>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-ink-600">
                Más de siete décadas formando a la comunidad odontológica chilena en prótesis y
                rehabilitación oral.
              </p>
              <div aria-hidden className="h-px w-16 bg-ink-200" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-500">
                Sociedad científica · Chile
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#main-stats"
        aria-label="Bajar a las cifras de la sociedad"
        className="absolute inset-x-0 bottom-3 z-10 mx-auto flex w-fit flex-col items-center gap-1 text-white/60 transition-colors hover:text-white"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">Descubre</span>
        <ChevronDown size={18} className="scroll-pulse" aria-hidden />
      </a>

      {/* Soft fade hacia la siguiente sección */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white"
      />
    </section>
  );
}

function CongressCard({ event }: { event: EventItem }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-6 shadow-lift backdrop-blur md:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
        Congreso destacado
      </p>
      <h3 className="mt-3 font-display text-2xl uppercase leading-tight md:text-3xl">
        {event.title}
      </h3>
      <ul className="mt-5 space-y-2 text-sm text-ink-100">
        <li className="flex items-center gap-2">
          <CalendarDays size={16} className="text-brand-500" />
          {formatDateRange(event.startDate, event.endDate)}
        </li>
        <li className="flex items-center gap-2">
          <MapPin size={16} className="text-brand-500" />
          {event.location}
        </li>
      </ul>
    </div>
  );
}
