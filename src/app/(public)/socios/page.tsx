import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Clock,
  GraduationCap,
  Library,
  Mail,
  Medal,
  Network,
  Phone,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MembershipForm } from "@/components/public/MembershipForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hazte socio",
  description:
    "Súmate a la Sociedad de Prótesis y Rehabilitación Oral de Chile. Beneficios, formación continua, red iberoamericana y certificación.",
};

const benefits = [
  {
    icon: Ticket,
    title: "Tarifas preferentes",
    description: "Descuentos en cursos, talleres y congresos de SPROCh y sociedades asociadas.",
  },
  {
    icon: Library,
    title: "Publicaciones",
    description: "Acceso a revistas científicas y resúmenes de jornadas para socios al día.",
  },
  {
    icon: GraduationCap,
    title: "Formación continua",
    description: "Programa anual de actualización con docentes nacionales e internacionales.",
  },
  {
    icon: Network,
    title: "Red iberoamericana",
    description: "Convenios con sociedades hermanas de la región y proyección internacional.",
  },
  {
    icon: BookOpenCheck,
    title: "Trabajos libres",
    description: "Espacios para presentar investigación, casos clínicos y revisiones.",
  },
  {
    icon: Medal,
    title: "Certificación oficial",
    description: "Certificados de participación y aval institucional SPROCh.",
  },
];

export default function SociosPage() {
  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="grain-overlay relative isolate overflow-hidden bg-ink-950 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_color-mix(in_oklab,_var(--color-brand-900)_28%,_transparent)_0%,_transparent_55%)]"
        />
        <div className="brand-bars" aria-hidden />
        <div className="hero-rays" aria-hidden />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]"
        />

        <div className="container-page relative pb-20 pt-28 md:pb-28 md:pt-36 lg:pb-32 lg:pt-44">
          <div className="grid items-end gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-300">
                <span aria-hidden className="h-px w-10 bg-brand-500" />
                Hazte socio · Desde 1952
              </p>
              <h1 className="mt-7 font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-[104px] lg:text-[136px]">
                Suma tu
                <span className="block text-brand-400 drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
                  trayectoria
                </span>
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <p className="max-w-md text-base text-ink-200 md:text-lg">
                Únete a la red científica más antigua de Chile en prótesis y rehabilitación oral.
                Beneficios concretos para tu práctica clínica y formación continua de alto nivel.
              </p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur md:mt-20 md:grid-cols-4">
            {[
              { k: "+70", v: "Años de tradición" },
              { k: "06", v: "Beneficios incluidos" },
              { k: "05", v: "Categorías de socio" },
              { k: "48h", v: "Respuesta al registro" },
            ].map((s) => (
              <div key={s.v} className="bg-ink-950 p-6 md:p-7">
                <p className="font-display text-4xl text-white tabular-nums md:text-5xl">{s.k}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-ink-400 md:text-xs">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── BENEFICIOS BENTO ─────────── */}
      <section className="bg-paper">
        <div className="container-page py-20 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Lo que recibes
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Seis beneficios
                <br />
                <span className="text-ink-500">concretos para tu carrera</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                La cuota anual te abre la puerta a un programa estructurado de formación,
                publicaciones y conexión con la disciplina a nivel iberoamericano.
              </p>
            </div>
          </div>

          <ul className="mt-14 grid gap-5 md:grid-cols-12 md:auto-rows-fr">
            {benefits.map(({ icon: Icon, title, description }, idx) => {
              const layouts = [
                "md:col-span-6 lg:col-span-4",
                "md:col-span-6 lg:col-span-4",
                "md:col-span-12 lg:col-span-4",
                "md:col-span-6 lg:col-span-4",
                "md:col-span-6 lg:col-span-4",
                "md:col-span-12 lg:col-span-4",
              ];
              const dark = idx === 2;
              return (
                <li
                  key={title}
                  className={`card-lift ${dark ? "grain-overlay" : ""} group relative col-span-12 flex flex-col justify-between overflow-hidden rounded-3xl border p-7 md:p-8 ${
                    dark
                      ? "border-ink-900 bg-ink-950 text-white"
                      : "border-ink-200 bg-white text-ink-900"
                  } ${layouts[idx]}`}
                >
                  {dark && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_70%)]"
                    />
                  )}
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${
                          dark
                            ? "bg-white/10 text-brand-300 ring-white/15"
                            : "bg-brand-50 text-brand-700 ring-brand-100"
                        }`}
                      >
                        <Icon size={22} aria-hidden />
                      </span>
                      <span
                        aria-hidden
                        className={`font-display text-xl tabular-nums ${
                          dark ? "text-ink-500" : "text-ink-300"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className={`mt-8 font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl ${
                        dark ? "text-white" : "text-ink-900"
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`mt-3 max-w-md text-sm leading-relaxed md:text-base ${
                        dark ? "text-ink-200" : "text-ink-600"
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ─────────── FORMULARIO ─────────── */}
      <section className="relative isolate overflow-hidden bg-ink-50">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-200)_55%,_transparent)_0%,_transparent_70%)]"
        />
        <div className="container-page relative py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            {/* Sticky title */}
            <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Solicitud de membresía
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Únete
                <br />
                <span className="text-brand-700">a SPROCh</span>
              </h2>
              <p className="mt-6 max-w-md text-ink-600">
                Completa la solicitud y te contactaremos en menos de 48 horas hábiles con los
                próximos pasos: cuota anual, formulario formal y acceso a beneficios.
              </p>

              <ol className="mt-12 space-y-7">
                {[
                  {
                    step: "01",
                    title: "Recibes confirmación",
                    desc: "Te llega un correo confirmando que recibimos tu solicitud.",
                  },
                  {
                    step: "02",
                    title: "Validamos antecedentes",
                    desc: "Verificamos tu categoría profesional y tus datos.",
                  },
                  {
                    step: "03",
                    title: "Activamos tu cuenta",
                    desc: "Recibes tus credenciales y acceso al programa de beneficios.",
                  },
                ].map(({ step, title, desc }) => (
                  <li key={step} className="grid grid-cols-[auto_1fr] gap-5">
                    <span className="font-display text-3xl text-brand-700 tabular-nums">{step}</span>
                    <div>
                      <p className="font-semibold text-ink-900">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Form + aside */}
            <div className="md:col-span-7">
              <div className="card-lift rounded-3xl border border-ink-200 bg-paper p-6 shadow-card md:p-10">
                <MembershipForm />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-ink-200 bg-white p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                    ¿Dudas previas?
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">
                    Antes de enviar la solicitud puedes consultar dudas específicas por correo o
                    teléfono.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="inline-flex items-center gap-2 font-semibold text-ink-900 transition-colors hover:text-brand-700"
                      >
                        <Mail size={14} className="text-brand-600" aria-hidden />
                        {siteConfig.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-2 font-semibold text-ink-900 transition-colors hover:text-brand-700"
                      >
                        <Phone size={14} className="text-brand-600" aria-hidden />
                        {siteConfig.phone}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="grain-overlay overflow-hidden rounded-2xl border border-ink-900 bg-ink-950 p-6 text-white">
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-300">
                    <Clock size={13} aria-hidden />
                    Respuesta en 48 hrs
                  </p>
                  <p className="mt-3 font-display text-xl uppercase tracking-tight">
                    Sin compromiso de pago
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    El envío del formulario no implica cobro automático. La cuota se gestiona
                    en una segunda etapa con tu confirmación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── CTA CONTACTO ─────────── */}
      <section className="bg-paper">
        <div className="container-page pb-20 md:pb-28">
          <div className="relative overflow-hidden rounded-3xl border border-ink-200 bg-white p-10 md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-200)_55%,_transparent)_0%,_transparent_70%)]"
            />
            <div className="relative grid items-center gap-8 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                  Para instituciones
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-tight text-ink-900 md:text-5xl">
                  ¿Convenios institucionales
                  <br />
                  <span className="text-ink-500">o membresías corporativas?</span>
                </h2>
                <p className="mt-5 max-w-xl text-ink-600">
                  Atendemos convenios con universidades, sociedades hermanas y clínicas. Escríbenos
                  y armamos una propuesta a medida.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
                <Button asChild size="lg" className="btn-glow">
                  <Link href="/contacto">
                    Hablar con el equipo
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/nosotros">
                    Conoce SPROCh
                    <ArrowUpRight size={15} aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
