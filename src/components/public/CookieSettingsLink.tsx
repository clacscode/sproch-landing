"use client";

import { openConsentSettings } from "@/lib/consent";

/**
 * Link discreto para reabrir el banner de cookies y cambiar/retirar el
 * consentimiento. Se oculta si no hay analítica configurada (no hay nada que
 * gestionar). Pensado para el pie de página.
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return null;
  return (
    <>
      <span aria-hidden className="text-ink-700">
        ·
      </span>
      <button type="button" onClick={openConsentSettings} className={className}>
        Cookies
      </button>
    </>
  );
}
