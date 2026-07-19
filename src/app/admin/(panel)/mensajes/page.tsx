import Link from "next/link";
import type { MembershipApplication } from "@prisma/client";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  ContactMessagesList,
  MembershipApplicationsList,
  SubscribersTable,
  type ContactRow,
  type MembershipRow,
  type SubscriberRow,
} from "@/components/admin/MessagesTables";
import { cn } from "@/lib/cn";
import { INQUIRY_LABELS, type InquiryType } from "@/lib/validations/contact";
import {
  adminListContactMessages,
  adminListMembershipApplications,
  adminListNewsletterSubscribers,
  adminMessageCounts,
} from "@/server/queries/admin";

export const dynamic = "force-dynamic";

const dateTimeFormatter = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Santiago",
});

/** Antecedentes en el orden del documento oficial (solo se muestran los con valor). */
const MEMBERSHIP_FIELDS: { key: keyof MembershipApplication; label: string }[] = [
  { key: "birthDate", label: "Fecha de nacimiento" },
  { key: "addressPersonal", label: "Dirección particular" },
  { key: "degreeDate", label: "Fecha de título" },
  { key: "addressProfessional", label: "Dirección profesional" },
  { key: "phoneProfessional", label: "Teléfono profesional" },
  { key: "universityStudies", label: "Estudios universitarios" },
  { key: "postgrad", label: "Cursos de post-grado" },
  { key: "scholarships", label: "Becas" },
  { key: "teaching", label: "Experiencia docente" },
  { key: "societies", label: "Sociedades a las que pertenece" },
  { key: "professionalRoles", label: "Cargos profesionales" },
  { key: "guildRoles", label: "Cargos gremiales" },
  { key: "scientificWork", label: "Trabajos científicos realizados" },
  { key: "languages", label: "Idiomas" },
  { key: "sponsor", label: "Patrocinante" },
];

type Tab = "contacto" | "socios" | "newsletter";

export default async function MensajesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: rawTab } = await searchParams;
  const tab: Tab = rawTab === "socios" || rawTab === "newsletter" ? rawTab : "contacto";
  const counts = await adminMessageCounts();

  const tabs: { key: Tab; label: string; badge: number }[] = [
    { key: "contacto", label: "Contacto", badge: counts.contact.pending },
    { key: "socios", label: "Solicitudes de socio", badge: counts.membership.pending },
    { key: "newsletter", label: "Newsletter", badge: counts.subscribers },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mensajes"
        description="Lo que llega desde los formularios del sitio: contacto, solicitudes de socio y suscripciones al newsletter."
      />

      <nav className="flex flex-wrap gap-1">
        {tabs.map((t) => {
          const active = t.key === tab;
          return (
            <Link
              key={t.key}
              href={t.key === "contacto" ? "/admin/mensajes" : `/admin/mensajes?tab=${t.key}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                active ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-600 hover:bg-ink-200",
              )}
            >
              {t.label}
              {t.badge > 0 && (
                <span
                  className={cn(
                    "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                    active ? "bg-white/20 text-white" : "bg-white text-ink-600",
                  )}
                >
                  {t.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {tab === "contacto" && <ContactTab />}
      {tab === "socios" && <SociosTab />}
      {tab === "newsletter" && <NewsletterTab />}
    </div>
  );
}

async function ContactTab() {
  const rows: ContactRow[] = (await adminListContactMessages()).map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    inquiryLabel: r.inquiryType
      ? (INQUIRY_LABELS[r.inquiryType as InquiryType] ?? r.inquiryType)
      : "Consulta general",
    subject: r.subject,
    message: r.message,
    resolved: r.resolved,
    createdAt: dateTimeFormatter.format(r.createdAt),
  }));
  return <ContactMessagesList rows={rows} />;
}

async function SociosTab() {
  const rows: MembershipRow[] = (await adminListMembershipApplications()).map((r) => ({
    id: r.id,
    fullName: r.fullName,
    rut: r.rut,
    email: r.email,
    phone: r.phone,
    resolved: r.resolved,
    createdAt: dateTimeFormatter.format(r.createdAt),
    fields: MEMBERSHIP_FIELDS.flatMap(({ key, label }) => {
      const value = r[key];
      return typeof value === "string" && value.trim() ? [{ label, value }] : [];
    }),
  }));
  return <MembershipApplicationsList rows={rows} />;
}

async function NewsletterTab() {
  const rows: SubscriberRow[] = (await adminListNewsletterSubscribers()).map((r) => ({
    id: r.id,
    email: r.email,
    createdAt: dateTimeFormatter.format(r.createdAt),
  }));
  return <SubscribersTable rows={rows} />;
}
