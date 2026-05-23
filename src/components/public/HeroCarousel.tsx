"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
        primaryCta: { label: "Quiero hacerme socio", href: "/socios" },
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

      {/* Overlay: oscurece la base para legibilidad pero deja respirar la imagen.
          Gradient vertical (más oscuro abajo) + un velo lateral suave. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,16,0.55)_0%,rgba(12,12,16,0.35)_40%,rgba(12,12,16,0.78)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(12,12,16,0.85)_0%,rgba(12,12,16,0.55)_45%,rgba(12,12,16,0.15)_75%,rgba(40,4,8,0.35)_100%)]"
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

      <div className="container-page relative pb-16 pt-28 md:pb-32 md:pt-36 lg:pb-40 lg:pt-44">
        <div className="max-w-[68rem]">
          <p className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-300 md:mb-8">
            <span aria-hidden className="h-px w-10 bg-brand-500" />
            Sociedad de Prótesis y Rehabilitación Oral · Chile
          </p>

          <div className="carousel-fade relative min-h-[24rem] sm:min-h-[26rem] md:min-h-[30rem] lg:min-h-[34rem]">
            {slides.map((slide, i) => (
              <div key={slide.key} className="slide" data-active={i === index}>
                <Badge variant="dark" className="bg-white/10 text-white">
                  {slide.eyebrow}
                </Badge>
                <h1 className="mt-5 font-display text-5xl uppercase leading-[0.92] tracking-tight text-white sm:text-6xl md:mt-6 md:text-[88px] lg:text-[112px] xl:text-[128px]">
                  {slide.title}
                </h1>
                <p className="mt-7 max-w-2xl text-base text-ink-100 md:text-lg">
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

      {/* Soft fade hacia la siguiente sección (paper warm) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--color-paper)]"
      />
    </section>
  );
}
