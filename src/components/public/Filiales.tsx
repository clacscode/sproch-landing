import { MapPin } from "lucide-react";
import { filiales } from "@/data/filiales";

export function Filiales() {
  return (
    <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {filiales.map((f) => (
        <li
          key={f.zone}
          className="group relative isolate overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600 to-brand-700 opacity-80"
          />
          <div className="flex items-center justify-between">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <MapPin size={20} />
            </span>
            <span className="font-display text-xs uppercase tracking-[0.18em] text-ink-400">
              Zona {f.zone}
            </span>
          </div>
          <h3 className="mt-5 font-display text-2xl uppercase text-ink-900">{f.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">{f.description}</p>
          <div className="mt-5 border-t border-ink-100 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
              Ciudades
            </p>
            <p className="mt-2 text-sm text-ink-800">{f.cities.join(" · ")}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
