import { ArticleForm } from "@/components/admin/ArticleForm";
import { BackLink } from "@/components/admin/PageHeader";

export default function NuevoPacientePage() {
  return (
    <div className="space-y-6">
      <BackLink href="/admin/pacientes" label="Volver a pacientes" />
      <h1 className="font-display text-3xl uppercase tracking-tight text-ink-900">Nuevo artículo</h1>
      <ArticleForm type="PATIENT" mode="create" />
    </div>
  );
}
