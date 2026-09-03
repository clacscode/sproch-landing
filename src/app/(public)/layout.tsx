import { BackToTop } from "@/components/public/BackToTop";
import { Footer } from "@/components/public/Footer";
import { Header } from "@/components/public/Header";
import { getPaymentLink } from "@/server/queries/settings";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  // Botón "Pago socios" del header: se autogestiona desde /admin/configuracion.
  const paymentLink = await getPaymentLink();

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <Header paymentLink={paymentLink} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
