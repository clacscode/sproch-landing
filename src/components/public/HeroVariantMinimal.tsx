import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function HeroVariantMinimal() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/brand/DSC05641.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,16,0.55)_0%,rgba(12,12,16,0.85)_60%,rgba(12,12,16,0.98)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white"
      />

      <div className="container-page relative flex min-h-[78vh] flex-col items-center justify-center py-24 text-center">
        <Image
          src="/brand/logo.png"
          alt={siteConfig.name}
          width={260}
          height={84}
          priority
          className="h-16 w-auto drop-shadow-[0_8px_28px_rgba(0,0,0,0.55)] md:h-20"
        />

        <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.32em] text-ink-300">
          Desde 1952
        </p>
        <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          Excelencia en
          <span className="block text-brand-600 drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
            rehabilitación oral
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-ink-200 md:text-lg">
          La sociedad científica chilena de prótesis y rehabilitación oral. Formación continua,
          investigación clínica y comunidad iberoamericana.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="btn-glow">
            <Link href="/eventos">
              Cursos y congresos
              <ArrowRight size={18} />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
          >
            <Link href="/socios">Hazte socio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
