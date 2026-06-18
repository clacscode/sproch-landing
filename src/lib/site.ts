export const siteConfig = {
  name: "SPROCh",
  legalName: "Sociedad de Prótesis y Rehabilitación Oral de Chile",
  tagline: "Desde 1952 promoviendo la excelencia en prótesis y rehabilitación oral.",
  description:
    "Sociedad científica chilena dedicada a la prótesis y rehabilitación oral. Cursos, congresos, noticias y comunidad profesional.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "soc.protesis@gmail.com",
  phone: "+56 2 2334 8332",
  address: "Av. Santa María 1990, Piso 3, Providencia, Santiago",
  social: {
    instagram: "https://www.instagram.com/sprochchile",
    facebook: "https://www.facebook.com/sociedadde.protesis",
    linkedin: "https://linkedin.com/company/sproch",
  },
  developedBy: {
    name: "Korr",
    url: "https://www.korr.cl/es",
  },
  features: {
    /**
     * Modo "próximamente" para Cursos y Congresos. Mientras la agenda aún no
     * tiene su catálogo completo cargado, las categorías sin eventos muestran
     * un estado "Próximamente más información" en vez del vacío genérico.
     * Cambiar a `false` cuando se carguen los cursos y congresos definitivos.
     */
    eventsComingSoon: true,
    /**
     * Módulos "extra" del panel de administración (directiva, filiales,
     * sponsors, textos institucionales). Quedan scaffoldeados pero
     * deshabilitados: el sidebar los muestra como "no habilitado" y sus
     * rutas renderizan un aviso. Cambiar a `true` para activar esa fase.
     */
    adminExtras: false,
  },
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Noticias", href: "/noticias" },
    { label: "Cursos y Congresos", href: "/eventos" },
    { label: "Pacientes", href: "/pacientes" },
    { label: "Contacto", href: "/contacto" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
