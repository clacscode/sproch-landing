import type { BoardMember } from "@/lib/types";

export interface Filial {
  /** Identificador para usar en URLs y keys. */
  slug: string;
  /** Nombre de la ciudad sede. */
  city: string;
  /** Nombre formal de la filial (ej: "Filial Antofagasta"). */
  name: string;
  /** Macrozona geográfica (Norte, Centro, Sur, etc.). */
  zone: string;
  /** Ciudades y regiones que cubre la filial. */
  cities: string[];
  /** Descripción breve. */
  description: string;
  /** Comité directivo de la filial. */
  board: BoardMember[];
}

/**
 * Filiales SPROCh con directivas actualizadas (entregadas por el cliente).
 * Cualquier miembro sin correo declarado queda con email undefined.
 */
export const filiales: Filial[] = [
  {
    slug: "antofagasta",
    city: "Antofagasta",
    name: "Filial Antofagasta",
    zone: "Norte",
    cities: ["Antofagasta", "Calama", "Tocopilla"],
    description:
      "Coordina la actividad académica y reuniones científicas en la macrozona norte del país.",
    board: [
      { name: "Raúl Fuentes Hoowes", role: "Presidente", email: "dr.fuenteshowes@gmail.com" },
      { name: "Domingo Andrés Poblete Gómez", role: "Vicepresidente" },
      { name: "Dra. Lucia Flores Trigo", role: "Tesorera", email: "draflorestrigo@gmail.com" },
      { name: "Lizbeth Daniela Mamani Villa", role: "Directora", email: "dralmamani@gmail.com" },
      { name: "Oscar Ignacio Pérez Rubio", role: "Director" },
    ],
  },
  {
    slug: "valparaiso",
    city: "Valparaíso",
    name: "Filial Valparaíso",
    zone: "Centro",
    cities: ["Valparaíso", "Viña del Mar", "Quillota"],
    description:
      "Articula la actividad científica y gremial en la región de Valparaíso y su zona costera.",
    board: [
      { name: "Dr. Mauricio Vivanco Barahona", role: "Presidente", email: "mvivancb@hotmail.com" },
      { name: "Dr. Guillermo Montenegro Ávila", role: "Vicepresidente", email: "dr.gmontenegro@gmail.com" },
      { name: "Dr. Luis Jiménez Galaz", role: "Tesorero", email: "dr.jimenezgalaz@gmail.com" },
      { name: "Dr. Carlos Torres Rojas", role: "Secretario", email: "canitorres@yahoo.com" },
      { name: "Dr. Rafael Ceballos Olguín", role: "Director", email: "rceballos@sanidadnaval.cl" },
      { name: "Dr. Eduardo Orellana Toro", role: "Director", email: "dreorellana@entelchile.net" },
      { name: "Claudia Rios", role: "Secretaría", email: "claudia.rios.breems@gmail.com" },
    ],
  },
  {
    slug: "maule",
    city: "Talca",
    name: "Filial Maule",
    zone: "Centro-sur",
    cities: ["Talca", "Curicó", "Linares"],
    description:
      "Vincula a especialistas y residentes del Maule con la actividad académica y los congresos SPROCh.",
    board: [
      { name: "Luis Basualto", role: "Presidente", email: "docbasoalto@gmail.com" },
      { name: "Rodrigo Andrés Vargas Valdés", role: "Vicepresidente", email: "rodrigovargasv@gmail.com" },
      { name: "José Ignacio Moraga Gaete", role: "Tesorero", email: "jose.moragag@gmail.com" },
      { name: "Juan Pablo Ochoa Quiñones", role: "Secretario", email: "jpochoaq@gmail.com" },
      { name: "Rodolfo Andrés Calderón Rojas", role: "Director", email: "rcalderon@clinicalascruces.cl" },
      { name: "Teresa Azocar Cabello", role: "Directora", email: "tazocar@utalca.cl" },
      { name: "Daniel Patricio Sánchez Bermeo", role: "Director", email: "daniel.sanchez601@icloud.com" },
    ],
  },
  {
    slug: "concepcion",
    city: "Concepción",
    name: "Filial Concepción",
    zone: "Sur",
    cities: ["Concepción", "Talcahuano", "Los Ángeles"],
    description:
      "Sede sur de la sociedad. Articula la formación continua y la red académica del Biobío.",
    board: [
      { name: "Dr. Javier A. Figueroa Fuentes", role: "Presidente", email: "javier_figueroaf@hotmail.com" },
      { name: "Dra. Paola Muñoz", role: "Vicepresidenta", email: "lengacoy@gmail.com" },
      { name: "Dra. Yasna San Martín", role: "Tesorera", email: "yasnasanmartinh@gmail.com" },
      { name: "Dr. Oscar Parra", role: "Secretario", email: "osparrafredes@gmail.com" },
      { name: "Dra. Claudia Zenteno Hofer", role: "Directora", email: "farozen@vtr.net" },
      { name: "Dr. Fernando Grandon", role: "Director", email: "fgrandonv@gmail.com" },
      { name: "Dr. Carlos Cáceres Gutiérrez", role: "Director", email: "drcaceresg@gmail.com" },
      { name: "Dr. Cristian Lagos Fredes", role: "Director", email: "crlagos@gmail.com" },
    ],
  },
  {
    slug: "temuco",
    city: "Temuco",
    name: "Filial Temuco",
    zone: "Sur",
    cities: ["Temuco", "Villarrica", "Pucón"],
    description:
      "Acerca la formación continua y las jornadas científicas a la macrozona de La Araucanía.",
    board: [
      { name: "Dr. Yuri Adriazola", role: "Presidente", email: "yuriadriazolajorquera@gmail.com" },
      { name: "Dr. Nicolás Restovic Majluf", role: "Vicepresidente", email: "nicorestovic@hotmail.com" },
      { name: "Dr. Álvaro González", role: "Tesorero", email: "agonz010@gmail.com" },
      { name: "Dr. José Manuel Zapata", role: "Secretario", email: "drjosezapataescobar@gmail.com" },
      { name: "Dr. Ignacio Gallardo", role: "Director", email: "ijgallardos@gmail.com" },
      { name: "Dr. Gonzalo Recart Arrivé", role: "Director", email: "recart@dens.cl" },
      { name: "Dr. Benjamin Weber Rauch", role: "Director", email: "oralben@gmx.net" },
      { name: "Dr. Diego Sirandoni Rivas", role: "Director", email: "rivasirandoni@hotmail.com" },
      { name: "Dr. Andres Ponce Villarroel", role: "Director", email: "andresponce@drponce.cl" },
    ],
  },
];
