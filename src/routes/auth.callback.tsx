import { createFileRoute } from "@tanstack/react-router";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/auth/callback")({
  component: CallbackPage,
  head: () => ({
    meta: [
      ...seoMeta({
        title: "Authenticating…",
        description: "Completing authentication with CyberSec Toolkit.",
        path: "/auth/callback",
        noindex: true,
      }),
    ],
  }),
});

function CallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <p className="text-muted-foreground">Authenticating…</p>
    </div>
  );
}
