"use client";

import * as React from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import {
  subscribeNewsletterAction,
  type NewsletterResult,
} from "@/server/actions/newsletter";

export function NewsletterForm() {
  const [pending, startTransition] = React.useTransition();
  const [state, setState] = React.useState<NewsletterResult | null>(null);
  const [email, setEmail] = React.useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await subscribeNewsletterAction(state, fd);
      setState(res);
      if (res.ok) setEmail("");
    });
  };

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
        <p className="inline-flex items-center gap-2 font-semibold text-emerald-100">
          <CheckCircle2 size={16} aria-hidden />
          ¡Listo!
        </p>
        <p className="mt-1 text-emerald-200/90">
          Te avisaremos cuando publiquemos nuevas convocatorias o cursos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2" noValidate>
      <label htmlFor="newsletter-email" className="text-xs font-medium text-ink-200">
        Tu correo
      </label>
      <div className="relative">
        <Mail
          size={16}
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
        />
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="nombre@correo.cl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={pending}
          className="h-11 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-12 text-sm text-white placeholder:text-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        />
        <button
          type="submit"
          disabled={pending}
          aria-label="Suscribirme"
          className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          <Send size={14} aria-hidden />
        </button>
      </div>
      {/* honeypot */}
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
        aria-hidden
      />
      {state && !state.ok && (
        <p className="text-xs text-brand-500">{state.error}</p>
      )}
      <p className="text-xs text-ink-400">
        Recibe noticias, congresos y convocatorias. Sin spam.
      </p>
    </form>
  );
}
