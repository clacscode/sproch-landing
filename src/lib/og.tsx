import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

interface RenderOgArgs {
  eyebrow: string;
  title: string;
  /** Segunda línea opcional en color brand (acento). */
  highlight?: string;
  subtitle?: string;
  footerLeft?: string;
  footerRight?: string;
}

/**
 * Renderiza una imagen OG con el lenguaje editorial SPROCh.
 * - Layout vertical con eyebrow rojo, título display gigante y subtítulo.
 * - Barras diagonales rojas decorativas a la izquierda.
 * - Mesh radial brand sobre ink-950.
 */
export function renderOg({
  eyebrow,
  title,
  highlight,
  subtitle,
  footerLeft = "sproch.cl",
  footerRight,
}: RenderOgArgs) {
  // Ajustamos el tamaño tipográfico según el largo del título principal.
  const titleLen = title.length + (highlight?.length ?? 0);
  const titleFontSize = titleLen > 38 ? 84 : titleLen > 22 ? 96 : 112;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(at 0% 100%, rgba(192, 4, 16, 0.45) 0%, transparent 55%), radial-gradient(at 100% 0%, rgba(250, 52, 52, 0.25) 0%, transparent 50%), linear-gradient(140deg, #0c0c10 0%, #18181d 50%, #1c1419 100%)",
          color: "white",
          position: "relative",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        {/* Barras diagonales rojas */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "6%",
            width: "10px",
            height: "140%",
            background: "#e30613",
            transform: "skewX(-12deg)",
            opacity: 0.75,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "11%",
            width: "4px",
            height: "140%",
            background: "#e30613",
            transform: "skewX(-12deg)",
            opacity: 0.35,
          }}
        />

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "60px",
              height: "2px",
              background: "#fa3434",
            }}
          />
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#fa3434",
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Bloque central */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              fontSize: titleFontSize,
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{title}</span>
            {highlight && (
              <span style={{ color: "#ff6464" }}>{highlight}</span>
            )}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 26,
                color: "#d8d8db",
                maxWidth: 900,
                lineHeight: 1.35,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#b7b7bc",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              SPROCh
            </div>
            <div style={{ color: "#71717a" }}>·</div>
            <div>{footerLeft}</div>
          </div>
          {footerRight && <div>{footerRight}</div>}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
