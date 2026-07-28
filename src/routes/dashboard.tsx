import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { seoMeta } from "@/lib/seo";
import { getSupabaseClient } from "@/lib/supabase";

const requireAuth = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    throw redirect({ to: "/auth/login" });
  }

  return data.session;
});

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    await requireAuth();
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
