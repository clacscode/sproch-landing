"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  CONSENT_CHANGE_EVENT,
  getStoredConsent,
  type ConsentValue,
} from "@/lib/consent";

/**
 * Google Analytics 4 con consentimiento previo.
 *
 * Solo inyecta los scripts si:
 *   1) NEXT_PUBLIC_GA_ID está configurado, y
 *   2) el usuario aceptó las cookies de analítica (ver CookieConsent).
 *
 * Mientras no haya consentimiento no se carga gtag ni se setea ninguna cookie.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentValue>).detail;
      setConsent(detail ?? getStoredConsent());
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (!gaId || consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
