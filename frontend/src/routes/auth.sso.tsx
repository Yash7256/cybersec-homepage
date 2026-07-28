import { createFileRoute } from "@tanstack/react-router";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/auth/sso")({
  component: SsoPage,
  head: () => ({
    meta: [
      ...seoMeta({
        title: "SSO Login",
        description: "Single sign-on for CyberSec Toolkit.",
        path: "/auth/sso",
        noindex: true,
      }),
    ],
  }),
});

function SsoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <p className="text-muted-foreground">SSO Login — coming soon.</p>
    </div>
  );
}
