import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/public/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos para consultas institucionales, alianzas académicas, prensa o información sobre cursos y congresos. Respondemos en menos de 48 horas hábiles.",
};

const expectations = [
  {
    step: "01",
    title: "Acuse de recibo",
    description: "Confirmamos por correo que tu mensaje fue recibido correctamente.",
  },
  {
    step: "02",
    title: "Análisis interno",
    description: "Tu consulta se deriva al área responsable según el tema planteado.",
  },
  {
    step: "03",
    title: "Respuesta personalizada",
    description: "En 48 horas hábiles te enviamos una respuesta detallada y útil.",
  },
];

const inquiryFaqs = [
  {
    q: "¿Cuánto tarda la respuesta?",
    a: "Toda consulta institucional la respondemos en un plazo máximo de 48 horas hábiles. Las relacionadas con un evento en curso se priorizan dentro del mismo día.",
  },
  {
    q: "¿A quién dirijo consultas de membresía?",
    a: "Indícalo en el asunto y derivamos tu mensaje al área de socios. También puedes ir directo a /socios para ver beneficios y proceso de afiliación.",
  },
  {
    q: "¿Cómo postulo a una charla o presentación?",
    a: "Las postulaciones a cursos y congresos se gestionan por convocatoria oficial. Suscríbete a noticias o escríbenos por correo para conocer la próxima ventana de envío.",
  },
  {
    q: "¿Reciben visitas en la oficina?",
    a: "Recibimos visitas con cita previa. Coordina por teléfono o correo para agendar una reunión presencial en nuestra oficina de Providencia.",
  },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: siteConfig.social.instagram },
  { name: "Facebook", icon: Facebook, href: siteConfig.social.facebook },
  { name: "LinkedIn", icon: Linkedin, href: siteConfig.social.linkedin },
];

const mapsUrl =
  "https://www.google.com/maps?q=Av.+Santa+Mar%C3%ADa+1990,+Providencia,+Santiago";

export default function ContactPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────  HERO  ───────────────────────────────────────────── */}
      <section className="grain-overlay relative isolate overflow-hidden bg-ink-950 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_color-mix(in_oklab,_var(--color-brand-900)_30%,_transparent)_0%,_transparent_55%)]"
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
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-500">
                <span aria-hidden className="h-px w-10 bg-brand-500" />
                Contacto · Sociedad de Prótesis · Chile
              </p>
              <h1 className="mt-7 font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-[112px] lg:text-[148px]">
                Conversemos
                <span className="text-brand-600 drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
                  .
                </span>
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <p className="max-w-md text-base text-ink-200 md:text-lg">
                Atendemos consultas institucionales, alianzas académicas, prensa y postulaciones.
                Te respondemos en menos de{" "}
                <strong className="font-semibold text-white">48 horas hábiles</strong>.
              </p>
            </div>
          </div>

          {/* Editorial strip — facts in print-like format */}
          <div className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.22em] text-ink-300 md:mt-20 md:gap-x-6 md:text-sm">
            <span className="inline-flex items-center gap-2">
              <Clock size={14} className="text-brand-600" aria-hidden />
              48 hrs hábiles
            </span>
            <span aria-hidden className="text-ink-600">
              ·
            </span>
            <span>Lunes a viernes · 09–18 hrs</span>
            <span aria-hidden className="text-ink-600">
              ·
            </span>
            <span>Atención en español</span>
            <span aria-hidden className="text-ink-600">
              ·
            </span>
            <span>Datos confidenciales</span>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────  CANALES (BENTO) ──────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="container-page py-20 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Cómo contactarnos
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Tres vías directas
                <br />
                <span className="text-ink-500">para llegar al equipo</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                A cada tipo de consulta le corresponde una vía recomendada. El correo, para
                temas detallados; el teléfono, para urgencias; la oficina, para reuniones
                presenciales coordinadas.
              </p>
            </div>
          </div>

          {/* Bento grid: 1 big email card + 2 stacked (phone & office) */}
          <div className="mt-14 grid gap-5 md:grid-cols-12 md:auto-rows-fr">
            {/* EMAIL — large editorial card */}
            <Link
              href={`mailto:${siteConfig.email}`}
              className="card-lift group relative col-span-12 row-span-2 flex flex-col justify-between overflow-hidden rounded-3xl border border-ink-200 bg-white p-8 md:col-span-7 md:p-12"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-200)_55%,_transparent)_0%,_transparent_70%)] opacity-70"
              />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <Mail size={26} aria-hidden />
                  </span>
                  <ArrowUpRight
                    size={26}
                    aria-hidden
                    className="text-ink-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-700"
                  />
                </div>
                <p className="mt-12 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                  Correo institucional
                </p>
                <p className="mt-3 break-words font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900 md:text-[44px]">
                  {siteConfig.email}
                </p>
                <p className="mt-5 max-w-md text-ink-600">
                  Para consultas detalladas, alianzas académicas, postulaciones de prensa o
                  ponencias. Llega directamente al equipo de comunicaciones.
                </p>
              </div>
              <p className="relative mt-12 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-700">
                Escribir un correo
                <ArrowRight
                  size={14}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                />
              </p>
            </Link>

            {/* PHONE */}
            <Link
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="card-lift group relative col-span-12 flex flex-col justify-between overflow-hidden rounded-3xl border border-ink-200 bg-white p-7 sm:col-span-6 md:col-span-5 md:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <Phone size={22} aria-hidden />
                </span>
                <ArrowUpRight
                  size={20}
                  aria-hidden
                  className="text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                />
              </div>
              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                  Teléfono directo
                </p>
                <p className="mt-2 font-display text-2xl uppercase tracking-tight text-ink-900 md:text-[28px]">
                  {siteConfig.phone}
                </p>
                <p className="mt-2 text-sm text-ink-600">Lunes a viernes · 09:00 a 18:00</p>
              </div>
            </Link>

            {/* OFFICE — dark card for contrast */}
            <Link
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-lift grain-overlay group relative col-span-12 flex flex-col justify-between overflow-hidden rounded-3xl border border-ink-900 bg-ink-950 p-7 text-white sm:col-span-6 md:col-span-5 md:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_70%)]"
              />
              <div className="relative flex items-start justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-brand-500 ring-1 ring-white/15">
                  <MapPin size={22} aria-hidden />
                </span>
                <ArrowUpRight
                  size={20}
                  aria-hidden
                  className="text-ink-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500"
                />
              </div>
              <div className="relative mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-500">
                  Oficina en Providencia
                </p>
                <p className="mt-2 font-display text-2xl uppercase leading-tight tracking-tight md:text-[28px]">
                  Av. Santa María 1990
                </p>
                <p className="mt-2 text-sm text-ink-300">Piso 3 · Visitas con cita previa</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────  FORMULARIO + ASIDE  ────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-ink-50">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-200)_55%,_transparent)_0%,_transparent_70%)]"
        />
        <div className="container-page relative py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            {/* Sticky title + steps */}
            <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Formulario
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Cuéntanos
                <br />
                <span className="text-brand-700">de qué se trata</span>
              </h2>
              <p className="mt-6 max-w-md text-ink-600">
                Completa el formulario y un miembro del equipo te contactará a la brevedad. Si
                es urgente, llámanos al teléfono institucional.
              </p>

              <ol className="mt-12 space-y-7">
                {expectations.map(({ step, title, description }) => (
                  <li key={step} className="grid grid-cols-[auto_1fr] gap-5">
                    <span className="font-display text-3xl text-brand-700 tabular-nums">
                      {step}
                    </span>
                    <div>
                      <p className="font-semibold text-ink-900">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Form + small sidebar */}
            <div className="md:col-span-7">
              <div className="card-lift rounded-3xl border border-ink-200 bg-paper p-6 md:p-10">
                <ContactForm />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-ink-200 bg-white p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                    Mantente al día
                  </p>
                  <p className="mt-3 text-sm text-ink-600">
                    Síguenos para noticias, congresos y comunicaciones oficiales.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {socialLinks.map(({ name, icon: Icon, href }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-3.5 py-1.5 text-sm text-ink-700 transition-colors hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700"
                      >
                        <Icon size={15} aria-hidden />
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                    Antes de escribir
                  </p>
                  <p className="mt-3 font-display text-xl uppercase tracking-tight text-ink-900">
                    ¿Buscas asociarte?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    El proceso de membresía tiene su flujo dedicado, con cuotas y beneficios
                    detallados.
                  </p>
                  <Button asChild variant="secondary" size="sm" className="mt-4">
                    <Link href="/socios">
                      Conocer membresía
                      <ArrowRight size={14} aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────  MAPA (full-bleed feel)  ────────────────────────────────── */}
      <section className="bg-paper">
        <div className="container-page py-20 md:py-28">
          <div className="mb-12 grid items-end gap-8 md:mb-14 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Visítanos
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Av. Santa María 1990,
                <br />
                <span className="text-ink-500">Providencia, Santiago</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                A pasos del Metro Salvador (Línea 1), a orillas del río Mapocho. Atendemos con
                cita previa de lunes a viernes.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-ink-200 shadow-lift">
            <iframe
              title="Mapa Av. Santa María 1990, Providencia"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-70.625%2C-33.435%2C-70.605%2C-33.415&amp;layer=mapnik&amp;marker=-33.4242%2C-70.6135"
              className="h-[520px] w-full md:h-[640px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating info card — overlay top-left */}
            <div className="absolute left-4 top-4 right-4 max-w-md rounded-2xl border border-white/10 bg-ink-950/95 p-6 text-white shadow-lift backdrop-blur md:left-8 md:top-8 md:right-auto md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-500">
                Dónde encontrarnos
              </p>
              <p className="mt-3 font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl">
                Av. Santa María 1990
              </p>
              <p className="mt-1 text-sm text-ink-300">Piso 3 · Providencia, Santiago</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5">
                  <Clock size={15} className="text-brand-500" aria-hidden />
                  Lunes a viernes · 09 a 18 hrs
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={15} className="text-brand-500" aria-hidden />
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-brand-500"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
              </ul>
              <Button asChild size="sm" className="btn-glow mt-6">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  Cómo llegar
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              </Button>
            </div>

            {/* Bottom-right floating chip */}
            <div className="absolute bottom-4 right-4 hidden items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-ink-700 shadow-card backdrop-blur md:inline-flex">
              <MapPin size={13} className="text-brand-600" aria-hidden />5 min · Metro Salvador
              (L1)
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────  FAQ EDITORIAL  ────────────────────────────────── */}
      <section className="border-t border-ink-100 bg-paper">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Preguntas frecuentes
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-6xl">
                Lo que más
                <br />
                <span className="text-ink-500">nos preguntan</span>
              </h2>
              <p className="mt-5 max-w-sm text-ink-600">
                Si tu duda no aparece aquí, escríbenos por el formulario o llámanos. Estas son
                las consultas más habituales.
              </p>
              <div className="mt-8 rounded-2xl border border-ink-200 bg-white p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                  Vías directas
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-700"
                >
                  <Mail size={15} className="text-brand-600" aria-hidden />
                  {siteConfig.email}
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-700"
                >
                  <Phone size={15} className="text-brand-600" aria-hidden />
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            {/* Editorial Q&A — answers always visible, big numbered display */}
            <ol className="md:col-span-8">
              {inquiryFaqs.map((item, idx) => (
                <li
                  key={item.q}
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-ink-200 py-8 last:border-b-0 md:gap-10 md:py-10"
                >
                  <span className="font-display text-3xl text-brand-700 tabular-nums md:text-5xl">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-xl uppercase leading-tight tracking-tight text-ink-900 md:text-2xl">
                      {item.q}
                    </p>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600 md:text-lg">
                      {item.a}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
