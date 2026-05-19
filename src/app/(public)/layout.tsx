import { BackToTop } from "@/components/public/BackToTop";
import { Footer } from "@/components/public/Footer";
import { Header } from "@/components/public/Header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
