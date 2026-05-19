import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarRange, Mail, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-mesh px-6 py-16 text-white">
      <div className="brand-bars opacity-60" aria-hidden />
      <div className="hero-rays" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]"
      />

      <div className="relative mx-auto w-full max-w-2xl text-center">
        <div className="mx-auto inline-flex rounded-xl bg-white p-4 shadow-lift ring-1 ring-black/5">
          <Image
            src="/brand/logo.png"
            alt={siteConfig.name}
            width={200}
            height={64}
            priority
            className="h-12 w-auto"
          />
        </div>

        <p
          aria-hidden
          className="mt-10 font-display text-[110px] uppercase leading-none tracking-tight text-white/10 sm:text-[160px]"
        >
          404
        </p>
        <h1 className="-mt-12 font-display text-3xl uppercase leading-tight text-white sm:text-4xl md:text-5xl">
          Esta página
          <span className="block text-brand-400 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            se nos perdió
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-ink-200">
          La ruta que buscas no existe o fue movida. Aquí tienes algunos atajos para retomar la
          navegación.
        </p>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Button asChild size="lg" className="btn-glow">
            <Link href="/">
              Volver al inicio
              <ArrowRight size={18} />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
          >
            <Link href="/contacto">Contáctanos</Link>
          </Button>
        </div>

        <ul className="mx-auto mt-12 grid max-w-xl gap-3 sm:grid-cols-3">
          {[
            { href: "/eventos", label: "Cursos y congresos", Icon: CalendarRange },
            { href: "/noticias", label: "Noticias", Icon: Newspaper },
            { href: "/contacto", label: "Escríbenos", Icon: Mail },
          ].map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm transition-all hover:border-white/30 hover:bg-white/10"
              >
                <Icon size={16} className="text-brand-400 transition-transform group-hover:scale-110" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
