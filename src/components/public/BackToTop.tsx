"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Volver arriba"
      tabIndex={visible ? 0 : -1}
      className={
        "fixed bottom-5 right-5 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/85 text-white shadow-lift ring-1 ring-white/10 backdrop-blur transition-all duration-300 hover:bg-brand-600 hover:ring-brand-500 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 " +
        (visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4")
      }
    >
      <ArrowUp size={16} aria-hidden />
    </button>
  );
}
