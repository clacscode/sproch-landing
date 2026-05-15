import { Quote } from "lucide-react";
import { testimonials } from "@/data/membership";

export function Testimonials() {
  return (
    <ul className="container-page mt-12 grid gap-6 md:grid-cols-3">
      {testimonials.map((t) => (
        <li
          key={t.quote}
          className="relative flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-7 shadow-card"
        >
          <Quote size={28} className="text-brand-600" aria-hidden />
          <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink-800">
            “{t.quote}”
          </blockquote>
          <footer className="mt-6 border-t border-ink-100 pt-4">
            <p className="text-sm font-semibold text-ink-900">{t.name}</p>
            <p className="text-xs uppercase tracking-[0.14em] text-ink-500">{t.role}</p>
          </footer>
        </li>
      ))}
    </ul>
  );
}
