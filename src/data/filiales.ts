export interface Filial {
  zone: string;
  name: string;
  cities: string[];
  description: string;
  contact?: { email?: string; phone?: string };
}

// Datos de ejemplo. Reemplazar con la información real cuando esté disponible.
export const filiales: Filial[] = [
  {
    zone: "Norte",
    name: "Filial Norte",
    cities: ["Arica", "Iquique", "Antofagasta", "La Serena"],
    description:
      "Coordina actividades académicas y reuniones científicas en las regiones del norte del país.",
  },
  {
    zone: "Centro",
    name: "Filial Centro",
    cities: ["Valparaíso", "Santiago", "Rancagua"],
    description:
      "Sede central de la sociedad. Organiza el congreso anual y los principales cursos de actualización.",
  },
  {
    zone: "Sur",
    name: "Filial Sur",
    cities: ["Concepción", "Temuco", "Valdivia", "Osorno"],
    description:
      "Articula la actividad académica y la formación continua en macro zona sur.",
  },
  {
    zone: "Austral",
    name: "Filial Austral",
    cities: ["Puerto Montt", "Coyhaique", "Punta Arenas"],
    description:
      "Acerca la formación continua a los especialistas del extremo sur del país.",
  },
];
