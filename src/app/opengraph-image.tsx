import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.legalName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        }}
      >
        {/* barra diagonal roja */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "8%",
            width: "8px",
            height: "140%",
            background: "#e30613",
            transform: "skewX(-12deg)",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "13%",
            width: "4px",
            height: "140%",
            background: "#e30613",
            transform: "skewX(-12deg)",
            opacity: 0.35,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#fa3434",
            }}
          >
            SPROCh · Desde 1952
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            Avanzando la
            <br />
            <span style={{ color: "#ff6464" }}>rehabilitación oral</span>
          </div>
          <div style={{ fontSize: 28, color: "#d8d8db", maxWidth: 880 }}>
            Sociedad de Prótesis y Rehabilitación Oral de Chile · Cursos, congresos y
            formación continua.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#b7b7bc",
          }}
        >
          <div>sproch.cl</div>
          <div>Congreso SPROCh 2026 · Santiago</div>
        </div>
      </div>
    ),
    size,
  );
}
