import Link from "next/link";

const variants = [
  { id: "v1", href: "/", label: "v1 · Actual (carrusel con foto)" },
  { id: "v2", href: "/preview/hero-v2", label: "v2 · Minimalista oscuro" },
  { id: "v3", href: "/preview/hero-v3", label: "v3 · Editorial split" },
];

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="border-b border-ink-200 bg-ink-50">
        <div className="container-page flex flex-col gap-2 py-3 text-xs text-ink-700 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold">
            <span className="rounded bg-brand-600 px-2 py-0.5 text-white">PREVIEW</span>{" "}
            Variantes de Hero (no indexadas)
          </p>
          <nav className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <Link
                key={v.id}
                href={v.href}
                className="rounded-full border border-ink-200 bg-white px-3 py-1 transition-colors hover:border-brand-500 hover:text-brand-700"
              >
                {v.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {children}
    </>
  );
}

export const metadata = {
  robots: { index: false, follow: false },
};
