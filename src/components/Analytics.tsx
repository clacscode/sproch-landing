import Script from "next/script";

/**
 * Google Analytics 4. Solo se renderiza si NEXT_PUBLIC_GA_ID está configurado,
 * así el sitio funciona idéntico en local/preview sin medir tráfico.
 * El ID se setea como variable de entorno en el hosting (formato G-XXXXXXXXXX).
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

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
