import { notFound } from "next/navigation";
import { EventForm } from "@/components/admin/EventForm";
import { BackLink } from "@/components/admin/PageHeader";
import { eventToFormValues } from "@/lib/admin-mappers";
import { adminGetEvent } from "@/server/queries/admin";

export const dynamic = "force-dynamic";

export default async function EditarEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await adminGetEvent(id);
  if (!row) notFound();

  return (
    <div className="space-y-6">
      <BackLink href="/admin/eventos" label="Volver a eventos" />
      <h1 className="font-display text-3xl uppercase tracking-tight text-ink-900">Editar evento</h1>
      <EventForm mode="edit" id={row.id} initial={eventToFormValues(row)} />
    </div>
  );
}
