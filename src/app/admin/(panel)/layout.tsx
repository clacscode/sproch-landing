import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { MobileNav, MobileTopbar, Sidebar } from "@/components/admin/Sidebar";
import { AdminFeedbackProvider } from "@/components/admin/feedback";
import { adminMessageCounts } from "@/server/queries/admin";

export const metadata: Metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
};

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const messages = await adminMessageCounts();
  const pendingMessages = messages.contact.pending + messages.membership.pending;

  return (
    <AdminFeedbackProvider>
      <div className="min-h-screen bg-ink-50">
        <Sidebar
          user={{ name: session.user.name, email: session.user.email }}
          pendingMessages={pendingMessages}
        />
        <MobileTopbar />
        <MobileNav pendingMessages={pendingMessages} />
        <main className="lg:pl-64">
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">{children}</div>
        </main>
      </div>
    </AdminFeedbackProvider>
  );
}
