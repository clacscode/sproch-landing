import { ArticleTable, type ArticleRow } from "@/components/admin/ArticleTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { adminListArticles } from "@/server/queries/admin";

export const dynamic = "force-dynamic";

export default async function PacientesListPage() {
  const [active, archived] = await Promise.all([
    adminListArticles("PATIENT"),
    adminListArticles("PATIENT", { archived: true }),
  ]);
  const toRow = (r: Awaited<ReturnType<typeof adminListArticles>>[number]): ArticleRow => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    status: r.status,
    publishedAt: r.publishedAt ? r.publishedAt.toISOString().slice(0, 10) : "",
  });
  const rows = active.map(toRow);
  const archivedRows = archived.map(toRow);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pacientes"
        description="Artículos de orientación para pacientes."
        newHref="/admin/pacientes/nueva"
        newLabel="Nuevo artículo"
      />
      <ArticleTable basePath="/admin/pacientes" rows={rows} archivedRows={archivedRows} />
    </div>
  );
}
