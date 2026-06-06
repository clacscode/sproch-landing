import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memberBenefits } from "@/data/membership";

export function MemberBenefits() {
  return (
    <div className="container-page">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Hazte socio
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-tight md:text-5xl">
            Una membresía que respalda
            <br />
            tu desarrollo clínico
          </h2>
          <p className="mt-4 max-w-2xl text-ink-200">
            Suma tu trayectoria a la red científica más antigua de prótesis y rehabilitación oral
            del país. Beneficios concretos para tu práctica y tu formación.
          </p>
        </div>
        <div className="md:col-span-5 md:justify-self-end">
          <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40">
            <Link href="/socios">
              Quiero hacerme socio
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-2 lg:grid-cols-3">
        {memberBenefits.map(({ icon: Icon, title, description }) => (
          <li key={title} className="bg-ink-950 p-6 md:p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-600/15 text-brand-600">
              <Icon size={20} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
