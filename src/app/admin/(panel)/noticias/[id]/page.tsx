import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { BackLink } from "@/components/admin/PageHeader";
import { articleToFormValues } from "@/lib/admin-mappers";
import { adminGetArticle } from "@/server/queries/admin";

export const dynamic = "force-dynamic";

export default async function EditarNoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await adminGetArticle(id);
  if (!row || row.type !== "NEWS") notFound();

  return (
    <div className="space-y-6">
      <BackLink href="/admin/noticias" label="Volver a noticias" />
      <h1 className="font-display text-3xl uppercase tracking-tight text-ink-900">Editar noticia</h1>
      <ArticleForm type="NEWS" mode="edit" id={row.id} initial={articleToFormValues(row)} />
    </div>
  );
}
