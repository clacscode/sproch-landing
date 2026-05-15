import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  CalendarHeart,
  GraduationCap,
  Library,
  Medal,
  Network,
  Ticket,
  Users2,
} from "lucide-react";

export interface MembershipBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const memberBenefits: MembershipBenefit[] = [
  {
    icon: Ticket,
    title: "Tarifas preferentes",
    description:
      "Descuentos en cursos, talleres y congresos organizados por la sociedad y entidades asociadas.",
  },
  {
    icon: Library,
    title: "Acceso a publicaciones",
    description:
      "Revistas científicas, guías clínicas y resúmenes de las jornadas anuales para socios al día.",
  },
  {
    icon: GraduationCap,
    title: "Formación continua",
    description:
      "Programa anual de actualización con docentes nacionales e internacionales de referencia.",
  },
  {
    icon: Network,
    title: "Red iberoamericana",
    description:
      "Vinculación con sociedades hermanas de la región a través de SIOLA y convenios académicos.",
  },
  {
    icon: BookOpenCheck,
    title: "Trabajos libres",
    description:
      "Espacios para presentar investigación, casos clínicos y revisiones en nuestras instancias científicas.",
  },
  {
    icon: Medal,
    title: "Certificación SPROCh",
    description:
      "Certificados de participación y aval institucional reconocidos por la comunidad odontológica.",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Participar de SPROCh me permitió mantenerme al día con los flujos digitales y discutir casos con colegas de toda Iberoamérica.",
    name: "Especialista en rehabilitación oral",
    role: "Socia desde 2014",
  },
  {
    quote:
      "Los cursos y la revista científica son una bajada concreta de la evidencia internacional a la práctica clínica chilena.",
    name: "Docente universitario",
    role: "Socio activo",
  },
  {
    quote:
      "Como residente encontré una comunidad que respalda la formación y abre espacios para presentar nuestros primeros trabajos.",
    name: "Residente de postgrado",
    role: "Socio joven",
  },
];

export interface StatItem {
  value: string;
  label: string;
}

export const stats: StatItem[] = [
  { value: "70+", label: "años de historia" },
  { value: "12", label: "países representados en SIOLA" },
  { value: "20+", label: "cursos y jornadas anuales" },
  { value: "100%", label: "actividades con aval científico" },
];

export interface FAQItem {
  q: string;
  a: string;
}

export const faqs: FAQItem[] = [
  {
    q: "¿Quiénes pueden hacerse socios de SPROCh?",
    a: "Odontólogos titulados, especialistas en rehabilitación oral y disciplinas afines, así como residentes y estudiantes de postgrado de programas reconocidos.",
  },
  {
    q: "¿Cómo se inscriben los socios a los cursos y congresos?",
    a: "Quienes están al día con su cuota acceden a tarifas preferentes y prioridad de cupos. La inscripción se realiza directamente desde cada evento publicado en la agenda.",
  },
  {
    q: "¿SPROCh entrega certificación?",
    a: "Sí. Todas las actividades formativas oficiales incluyen certificado de participación con el aval institucional de la sociedad.",
  },
  {
    q: "¿Tienen vinculación con sociedades internacionales?",
    a: "Sí. SPROCh integra la Sociedad Iberoamericana de Osteointegración y Latinoamericana (SIOLA) y mantiene convenios académicos con universidades y sociedades hermanas.",
  },
  {
    q: "¿Dónde puedo presentar trabajos de investigación?",
    a: "Cada año se abre convocatoria a trabajos libres en categorías de casos clínicos, investigación y revisión, con presentación en el congreso anual.",
  },
];
