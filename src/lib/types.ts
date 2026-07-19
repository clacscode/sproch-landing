export type NewsStatus = "DRAFT" | "PUBLISHED";
export type EventCategory = "CURSO" | "CONGRESO";
export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED" | "FINISHED";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** HTML serializado o markdown — en F2 será JSON de TipTap. */
  content: string;
  coverImage: string;
  status: NewsStatus;
  publishedAt: string;
  tags: string[];
  authorName?: string;
}

export interface EventSpeaker {
  name: string;
  country?: string;
  bio?: string;
  avatar?: string;
}

export interface EventSponsor {
  name: string;
  logo?: string;
  url?: string;
  tier?: "platinum" | "gold" | "silver" | "bronze";
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  startDate: string;
  endDate: string;
  location: string;
  coverImage: string;
  capacity?: number;
  priceCLP: number;
  /** Cuando es true, el precio se muestra como "Desde …" (tarifa más baja de varias). */
  priceFrom?: boolean;
  /** Cuando es true, oculta el precio destacado en tarjetas/hero/sidebar (las tarifas pueden ir en el contenido). */
  hidePrice?: boolean;
  /** URL de inscripción externa (ej. Welcu). Si está presente, el CTA la usa en vez del flujo interno. */
  registrationUrl?: string;
  /** Antetítulo de la sección de descripción (fallback: "Acerca del evento"). */
  aboutEyebrow?: string;
  /** Título de la sección de descripción (fallback: "Programa académico"). */
  aboutTitle?: string;
  category: EventCategory;
  status: EventStatus;
  featured?: boolean;
  speakers?: EventSpeaker[];
  sponsors?: EventSponsor[];
  program?: { day: string; items: { time: string; title: string }[] }[];
}

export interface BoardMember {
  name: string;
  role: string;
  email?: string;
  photo?: string;
}
