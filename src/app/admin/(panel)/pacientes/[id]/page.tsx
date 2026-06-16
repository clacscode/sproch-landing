import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { BackLink } from "@/components/admin/PageHeader";
import { articleToFormValues } from "@/lib/admin-mappers";
import { adminGetArticle } from "@/server/queries/admin";

export const dynamic = "force-dynamic";

export default async function EditarPacientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await adminGetArticle(id);
  if (!row || row.type !== "PATIENT") notFound();

  return (
    <div className="space-y-6">
      <BackLink href="/admin/pacientes" label="Volver a pacientes" />
      <h1 className="font-display text-3xl uppercase tracking-tight text-ink-900">Editar artículo</h1>
      <ArticleForm type="PATIENT" mode="edit" id={row.id} initial={articleToFormValues(row)} />
    </div>
  );
}
