import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/not-found-page";

export const Route = createFileRoute("/product")({
  component: NotFoundPage,
  head: () => ({
    meta: [
      { title: "CyberSec - Page Not Found" },
      {
        name: "description",
        content: "This CyberSec page is not available yet.",
      },
    ],
  }),
});
