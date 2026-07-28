import { createFileRoute } from "@tanstack/react-router";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      ...seoMeta({
        title: "Sign In",
        description: "Sign in to your CyberSec Toolkit account.",
        path: "/auth/login",
        noindex: true,
      }),
    ],
  }),
});

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <p className="text-muted-foreground">Sign In — coming soon.</p>
    </div>
  );
}
