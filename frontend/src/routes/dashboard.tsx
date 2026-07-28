import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      throw redirect({ to: "/auth/login" });
    }

    return data.session;
  },
  component: DashboardPage,
  head: () => ({
    meta: [
      ...seoMeta({
        title: "Dashboard",
        description: "Your CyberSec Toolkit dashboard — scan results, reports, and monitoring.",
        path: "/dashboard",
        noindex: true,
      }),
    ],
  }),
});

function DashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <p className="text-muted-foreground">Dashboard — coming soon.</p>
    </div>
  );
}
