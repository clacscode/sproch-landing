import { ArticleForm } from "@/components/admin/ArticleForm";
import { BackLink } from "@/components/admin/PageHeader";

export default function NuevaNoticiaPage() {
  return (
    <div className="space-y-6">
      <BackLink href="/admin/noticias" label="Volver a noticias" />
      <h1 className="font-display text-3xl uppercase tracking-tight text-ink-900">Nueva noticia</h1>
      <ArticleForm type="NEWS" mode="create" />
    </div>
  );
}
