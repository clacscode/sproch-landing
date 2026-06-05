import type { EventItem } from "@/lib/types";

export const eventsMock: EventItem[] = [
  {
    id: "e1",
    slug: "congreso-sproch-2026",
    title: "Congreso SPROCh 2026 — ADAI: De lo analógico y digital a la AI",
    summary:
      "XIX Reunión Internacional de la SIOLA. Tres días con expositores internacionales de Brasil y España en el Hotel Marina Las Condes, Santiago — de lo analógico y digital a la inteligencia artificial.",
    content: `
<p>El congreso anual de SPROCh reúne a la comunidad iberoamericana en torno a la prótesis y rehabilitación oral. La edición 2026 —ADAI— propone un recorrido desde lo analógico y digital hacia la inteligencia artificial aplicada a la práctica clínica.</p>
<p>Esta edición se desarrolla junto a la <strong>XIX Reunión Internacional de la SIOLA</strong> (Sociedad de Implantología Oral Latinoamericana), con expositores internacionales de Brasil y España.</p>
<p>Tres días de conferencias, talleres y networking en el Hotel Marina Las Condes, Santiago.</p>
<h2>Tarifas de inscripción</h2>
<ul>
  <li><strong>Socios SPROCh:</strong> $130.000</li>
  <li><strong>Alumnos de pre y postgrado:</strong> $95.000</li>
  <li><strong>FESODECH / Colegiado:</strong> $160.000</li>
  <li><strong>No socio:</strong> $190.000</li>
</ul>
<p>Valores sujetos a cargo por servicio de la plataforma. Inscripciones a través de Welcu.</p>
    `.trim(),
    startDate: "2026-07-30",
    endDate: "2026-08-01",
    location: "Hotel Marina Las Condes, Santiago",
    coverImage: "/congreso1.jpeg",
    priceCLP: 95000,
    priceFrom: true,
    hidePrice: true,
    registrationUrl: "https://welcu.com/sproch/congreso-sproch-2026",
    category: "CONGRESO",
    status: "PUBLISHED",
    featured: true,
    speakers: [
      { name: "Dr. Alessandro Loguercio", country: "Brasil" },
      { name: "Dr. Bruno Kraft", country: "Brasil" },
      { name: "Dr. Óscar González", country: "España" },
      { name: "Dr. Antonio Aguilar-Salvatierra Raya", country: "España" },
      { name: "Dra. Isabel Domene Rodríguez", country: "España" },
      { name: "Dra. Isabel Godoy Reina", country: "España" },
      { name: "Dr. Rafael Gómez Font", country: "España" },
      { name: "Dr. Nuno Matos Garrido", country: "España" },
      { name: "Dr. Gerardo Moreu Burgos", country: "España" },
      { name: "Dr. Ignacio Osoitz Leizaola-Cardesa", country: "España" },
      { name: "Dr. Paulino Sánchez Palomino", country: "España" },
      { name: "Dr. Eugenio Velasco Ortega", country: "España" },
    ],
    // Auspiciadores del afiche oficial — específicos de este congreso.
    sponsors: [
      { name: "MIS" },
      { name: "FGM Dental Group" },
      { name: "P Dental" },
      { name: "Straumann" },
      { name: "Kerr" },
      { name: "Nobel Biocare" },
      { name: "AlphaBio Simplantology" },
      { name: "DEXIS" },
      { name: "Dentaid" },
      { name: "Corega" },
      { name: "Hiossen Implant" },
      { name: "Punto Dental Ortotek" },
      { name: "Solventum" },
      { name: "3Dental Digital" },
      { name: "Megagen Chile" },
      { name: "Solara Group" },
    ],
    // El programa día a día se publicará más adelante (la página muestra "Programa próximamente").
  },
  // Próximamente se cargarán más cursos y congresos. Por ahora solo está
  // publicado el congreso de lanzamiento (ver siteConfig.features.eventsComingSoon).
];
