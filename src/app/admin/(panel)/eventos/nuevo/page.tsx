import { EventForm } from "@/components/admin/EventForm";
import { BackLink } from "@/components/admin/PageHeader";

export default function NuevoEventoPage() {
  return (
    <div className="space-y-6">
      <BackLink href="/admin/eventos" label="Volver a eventos" />
      <h1 className="font-display text-3xl uppercase tracking-tight text-ink-900">Nuevo evento</h1>
      <EventForm mode="create" />
    </div>
  );
}
