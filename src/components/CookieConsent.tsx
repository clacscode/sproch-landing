"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CONSENT_REOPEN_EVENT,
  getStoredConsent,
  setStoredConsent,
  type ConsentValue,
} from "@/lib/consent";

/**
 * Banner de consentimiento de cookies de analítica.
 *
 * Aparece solo si hay GA configurado y el usuario aún no decidió, o cuando se
 * reabre desde el footer ("Cookies"). Bloquea GA hasta que se acepte.
 */
export function CookieConsent() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  // Sin analítica configurada no hay cookies no esenciales → no se necesita banner.
  if (!gaId || !visible) return null;

  const decide = (value: ConsentValue) => {
    setStoredConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-md rounded-xl border border-ink-200 bg-white p-5 shadow-2xl shadow-ink-900/10 ring-1 ring-black/[0.02] md:inset-x-auto md:left-5 md:bottom-5"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"
        >
          <Cookie size={18} />
        </span>
        <div className="min-w-0">
          <p
            id="cookie-consent-title"
            className="font-display text-base uppercase tracking-tight text-ink-900"
          >
            Cookies y privacidad
          </p>
          <p
            id="cookie-consent-desc"
            className="mt-1.5 text-sm leading-relaxed text-ink-600"
          >
            Usamos cookies de Google Analytics para entender cómo se usa el sitio y
            mejorarlo. No se cargan hasta que las aceptes.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => decide("denied")}
        >
          Rechazar
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => decide("granted")}
        >
          Aceptar
        </Button>
      </div>
    </div>
  );
}
