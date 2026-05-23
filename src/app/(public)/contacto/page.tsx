import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Clock,
  Facebook,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/public/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos para consultas institucionales, alianzas académicas, prensa o información sobre cursos y congresos. Respondemos en menos de 48 horas hábiles.",
};

const channels = [
  {
    icon: Mail,
    label: "Correo institucional",
    value: siteConfig.email,
    detail: "Para consultas generales, alianzas y prensa",
    href: `mailto:${siteConfig.email}`,
    cta: "Escribir un correo",
  },
  {
    icon: Phone,
    label: "Teléfono directo",
    value: siteConfig.phone,
    detail: "Lunes a viernes · 09:00 a 18:00",
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    cta: "Llamar ahora",
  },
  {
    icon: MapPin,
    label: "Oficina central",
    value: "Av. Santa María 1990, Piso 3",
    detail: "Providencia, Santiago de Chile",
    href: "https://www.google.com/maps?q=Av.+Santa+Mar%C3%ADa+1990,+Providencia,+Santiago",
    cta: "Ver en el mapa",
  },
] as const;

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
    a: "Respondemos toda consulta institucional en un plazo máximo de 48 horas hábiles. Consultas urgentes asociadas a un evento en curso se priorizan dentro del mismo día.",
  },
  {
    q: "¿A quién dirijo consultas sobre membresía?",
    a: "Si estás interesado en hacerte socio o tienes dudas sobre tu cuota anual, indícalo en el asunto y derivaremos tu mensaje al área de socios. También puedes revisar la página /socios.",
  },
  {
    q: "¿Cómo postulo a una charla o presentación?",
    a: "Las postulaciones a cursos y congresos se gestionan por convocatoria oficial. Suscríbete a nuestras noticias o escríbenos al correo institucional para conocer la próxima ventana de envío.",
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
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_color-mix(in_oklab,_var(--color-brand-900)_38%,_transparent)_0%,_transparent_55%)]"
        />
        <div className="brand-bars" aria-hidden />
        <div className="hero-rays" aria-hidden />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]"
        />
        <div className="container-page relative pb-20 pt-24 md:pb-28 md:pt-36 lg:pt-40">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-300 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden />
            Contacto
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]">
            Conversemos sobre <span className="text-brand-400">rehabilitación oral</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-200 md:text-xl">
            Estamos disponibles para consultas institucionales, alianzas académicas, prensa o
            para sumarte como socio a la sociedad científica con más historia del país.
          </p>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-300">
            <li className="inline-flex items-center gap-2">
              <Clock size={16} className="text-brand-400" aria-hidden />
              Respuesta en 48 hrs hábiles
            </li>
            <li className="inline-flex items-center gap-2">
              <ShieldCheck size={16} className="text-brand-400" aria-hidden />
              Tus datos no se comparten
            </li>
            <li className="inline-flex items-center gap-2">
              <Globe2 size={16} className="text-brand-400" aria-hidden />
              Atención en español
            </li>
          </ul>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="relative bg-white">
        <div className="container-page -mt-12 pb-16 md:-mt-16 md:pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {channels.map(({ icon: Icon, label, value, detail, href, cta }) => {
              const external = href.startsWith("http");
              return (
                <Link
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-7 shadow-card transition-all hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-lift"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                      <Icon size={22} aria-hidden />
                    </span>
                    <ArrowUpRight
                      size={20}
                      aria-hidden
                      className="text-ink-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                    />
                  </div>
                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                    {label}
                  </p>
                  <p className="mt-1.5 break-words text-lg font-semibold text-ink-900">{value}</p>
                  <p className="mt-1 text-sm text-ink-600">{detail}</p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
                    {cta}
                    <ArrowRight
                      size={13}
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="relative isolate overflow-hidden bg-ink-50/70">
        <div
          aria-hidden
          className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-200)_60%,_transparent)_0%,_transparent_70%)]"
        />
        <div className="container-page relative py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-5 md:gap-16">
            <div className="md:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                Formulario de contacto
              </p>
              <h2 className="mt-2 font-display text-4xl uppercase leading-tight text-ink-900 md:text-5xl">
                Cuéntanos en qué <br className="hidden md:block" />
                te podemos apoyar
              </h2>
              <p className="mt-4 max-w-xl text-ink-600">
                Completa los datos y un miembro del equipo te contactará a la brevedad. Si tu
                consulta es urgente, llámanos directamente al teléfono institucional.
              </p>
              <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 shadow-card md:p-8">
                <ContactForm />
              </div>
            </div>

            <aside className="space-y-6 md:col-span-2">
              <div className="relative overflow-hidden rounded-2xl bg-ink-950 p-7 text-white md:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in oklab, var(--color-brand-700) 40%, transparent) 0%, transparent 60%)",
                  }}
                />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-300">
                    <Sparkles size={14} aria-hidden />
                    Qué esperar
                  </span>
                  <h3 className="mt-3 font-display text-2xl uppercase leading-tight">
                    Atención cuidada y oportuna
                  </h3>
                  <ol className="mt-7 space-y-6">
                    {expectations.map(({ step, title, description }) => (
                      <li key={step} className="flex gap-4">
                        <span className="font-display text-2xl text-brand-400">{step}</span>
                        <div>
                          <p className="font-semibold text-white">{title}</p>
                          <p className="mt-1 text-sm text-ink-300">{description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="rounded-2xl border border-ink-100 bg-white p-7 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                  Síguenos
                </p>
                <h3 className="mt-2 font-display text-xl uppercase text-ink-900">
                  Mantente al día
                </h3>
                <p className="mt-2 text-sm text-ink-600">
                  Noticias, congresos y comunicaciones oficiales en tiempo real.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {socialLinks.map(({ name, icon: Icon, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-3.5 py-1.5 text-sm text-ink-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                    >
                      <Icon size={15} aria-hidden />
                      {name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-7 md:p-8">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  <CalendarCheck size={14} aria-hidden />
                  Antes de escribir
                </span>
                <h3 className="mt-2 font-display text-xl uppercase text-ink-900">
                  ¿Buscas asociarte?
                </h3>
                <p className="mt-2 text-sm text-ink-700">
                  El proceso de membresía tiene su propio formulario rápido con los beneficios y
                  el detalle de cuotas anuales.
                </p>
                <Button asChild variant="secondary" className="mt-5">
                  <Link href="/socios">
                    Conocer membresía
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="relative bg-white">
        <div className="container-page py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5 md:py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                Visítanos
              </p>
              <h2 className="mt-2 font-display text-4xl uppercase leading-tight text-ink-900 md:text-5xl">
                Oficina central
                <br />
                en Providencia
              </h2>
              <p className="mt-4 text-ink-600">
                Estamos en Av. Santa María 1990, Piso 3, a pasos del Metro Salvador (Línea 1) y
                de la ribera del río Mapocho. Recibimos visitas con cita previa.
              </p>
              <dl className="mt-8 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                  <div>
                    <dt className="font-semibold text-ink-900">Dirección</dt>
                    <dd className="text-ink-600">Av. Santa María 1990, Piso 3, Providencia.</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                  <div>
                    <dt className="font-semibold text-ink-900">Horario</dt>
                    <dd className="text-ink-600">Lunes a viernes · 09:00 a 18:00 hrs.</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                  <div>
                    <dt className="font-semibold text-ink-900">Teléfono</dt>
                    <dd>
                      <a
                        href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                        className="text-ink-600 transition-colors hover:text-brand-700"
                      >
                        {siteConfig.phone}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
              <Button asChild className="mt-8 btn-glow">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  Cómo llegar
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              </Button>
            </div>
            <div className="md:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-ink-200 shadow-card">
                <iframe
                  title="Mapa Av. Santa María 1990, Providencia"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-70.625%2C-33.435%2C-70.605%2C-33.415&amp;layer=mapnik&amp;marker=-33.4242%2C-70.6135"
                  className="h-[420px] w-full md:h-[480px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink-900 shadow-card backdrop-blur transition-all hover:bg-white hover:shadow-lift"
                >
                  <MapPin size={15} className="text-brand-600" aria-hidden />
                  Abrir en Google Maps
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ específicas de contacto */}
      <section className="bg-ink-50/60">
        <div className="container-page py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                Preguntas frecuentes
              </p>
              <h2 className="mt-2 font-display text-4xl uppercase leading-tight text-ink-900 md:text-5xl">
                Antes de escribirnos
              </h2>
              <p className="mt-4 text-ink-600">
                Estas son las consultas que recibimos con mayor frecuencia. Si tu duda no aparece
                aquí, escríbenos sin problema.
              </p>
              <div className="mt-8 rounded-2xl border border-ink-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  ¿Prefieres una vía directa?
                </p>
                <div className="mt-3 flex flex-col gap-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-700"
                  >
                    <Mail size={16} className="text-brand-600" aria-hidden />
                    {siteConfig.email}
                  </a>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-700"
                  >
                    <Phone size={16} className="text-brand-600" aria-hidden />
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>
            <ul className="md:col-span-7">
              {inquiryFaqs.map((item, idx) => (
                <li key={item.q}>
                  <details className="group border-b border-ink-200 py-5 last:border-b-0">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                      <span className="flex gap-4 text-base font-semibold text-ink-900 md:text-lg">
                        <span className="font-display text-brand-700">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 pl-10 text-sm leading-relaxed text-ink-600 md:text-base">
                      {item.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
