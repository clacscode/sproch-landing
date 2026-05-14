import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";
import { Section } from "@/components/public/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos para consultas institucionales, alianzas académicas o información sobre cursos y congresos.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink-950 text-white">
        <div className="container-page py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
            Contacto
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            Conversemos
          </h1>
          <p className="mt-4 max-w-2xl text-ink-200">
            ¿Tienes una consulta, propuesta de colaboración o interés en participar en uno de
            nuestros cursos o congresos? Estamos para apoyarte.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="container-page grid gap-12 md:grid-cols-5">
          <div className="md:col-span-3">
            <ContactForm />
          </div>
          <aside className="md:col-span-2">
            <div className="rounded-xl border border-ink-100 bg-ink-50 p-6">
              <h2 className="font-display text-2xl uppercase text-ink-900">Datos institucionales</h2>
              <ul className="mt-4 space-y-4 text-sm text-ink-700">
                <li className="flex gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-brand-600" />
                  <span>{siteConfig.address}</span>
                </li>
                <li className="flex gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-brand-600" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-ink-900">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-brand-600" />
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="hover:text-ink-900"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
              </ul>
              <div className="mt-6 aspect-video overflow-hidden rounded-lg border border-ink-200 bg-ink-100">
                <iframe
                  title="Mapa Av. Santa María 1990, Providencia"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-70.625%2C-33.435%2C-70.605%2C-33.415&amp;layer=mapnik&amp;marker=-33.4242%2C-70.6135"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-3 text-xs text-ink-500">
                Av. Santa María 1990, Piso 3, Providencia, Santiago.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
