import { PageHeader } from "@/components/admin/PageHeader";
import { PaymentLinkForm } from "@/components/admin/PaymentLinkForm";
import { getSiteSettings } from "@/server/queries/settings";

export const dynamic = "force-dynamic";

export default async function ConfiguracionPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configuración"
        description="Ajustes del sitio que puedes cambiar sin tocar el código."
      />
      <PaymentLinkForm initial={settings} />
    </div>
  );
}
