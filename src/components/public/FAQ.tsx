import { faqs } from "@/data/membership";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function FAQ() {
  return (
    <div className="container-page grid gap-12 md:grid-cols-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="md:col-span-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
          Preguntas frecuentes
        </p>
        <h2 className="mt-2 font-display text-4xl uppercase leading-tight text-ink-900 md:text-5xl">
          Lo que necesitas
          <br />
          saber antes de sumarte
        </h2>
        <p className="mt-4 text-ink-600">
          ¿Tienes una duda específica? Escríbenos y te responderemos en menos de 48 horas hábiles.
        </p>
      </div>
      <ul className="md:col-span-8">
        {faqs.map((item, idx) => (
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
  );
}
