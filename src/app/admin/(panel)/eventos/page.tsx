import { EventTable, type EventRow } from "@/components/admin/EventTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { adminListEvents } from "@/server/queries/admin";

export const dynamic = "force-dynamic";

export default async function EventosListPage() {
  const [active, archived] = await Promise.all([
    adminListEvents(),
    adminListEvents({ archived: true }),
  ]);
  const toRow = (r: Awaited<ReturnType<typeof adminListEvents>>[number]): EventRow => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    category: r.category,
    status: r.status,
    startDate: r.startDate.toISOString().slice(0, 10),
    endDate: r.endDate.toISOString().slice(0, 10),
    featured: r.featured,
  });
  const rows = active.map(toRow);
  const archivedRows = archived.map(toRow);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cursos y congresos"
        description="Gestiona todo el contenido de cada evento."
        newHref="/admin/eventos/nuevo"
        newLabel="Nuevo evento"
      />
      <EventTable rows={rows} archivedRows={archivedRows} />
    </div>
  );
}
