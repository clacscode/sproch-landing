import { ArticleTable, type ArticleRow } from "@/components/admin/ArticleTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { adminListArticles } from "@/server/queries/admin";

export const dynamic = "force-dynamic";

export default async function PacientesListPage() {
  const rows: ArticleRow[] = (await adminListArticles("PATIENT")).map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    status: r.status,
    publishedAt: r.publishedAt ? r.publishedAt.toISOString().slice(0, 10) : "",
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pacientes"
        description="Artículos de orientación para pacientes."
        newHref="/admin/pacientes/nueva"
        newLabel="Nuevo artículo"
      />
      <ArticleTable basePath="/admin/pacientes" rows={rows} />
    </div>
  );
}
