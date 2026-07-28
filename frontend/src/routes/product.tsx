import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { seoMeta } from "@/lib/seo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

interface Product {
  id: string;
  name: string;
  description: string | null;
}

export const Route = createFileRoute("/product")({
  component: ProductPage,
  loader: async () => {
    const { data, error } = await supabase.from("products").select("*").limit(10);

    if (error) {
      console.error("Supabase error:", error);
      return { products: [] as Product[] };
    }
    return { products: data ?? [] };
  },
  head: () => ({
    meta: [
      ...seoMeta({
        title: "CyberSec Toolkit — Products",
        description: "Browse and explore our cybersecurity scanning products and tools.",
        path: "/product",
        noindex: true,
      }),
    ],
  }),
});

function ProductPage() {
  const { products } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-6 pt-[120px] pb-20">
        <h1 className="mb-8 text-3xl font-bold">Products</h1>
        {products.length === 0 ? (
          <p className="text-muted-foreground">
            Products are coming soon. Check back later.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p: Product) => (
              <div
                key={p.id}
                className="rounded-xl border border-[#5f4a82] bg-[#25193E] p-6 shadow-md"
              >
                <h2 className="text-xl font-semibold text-[#f8f5ff]">
                  {p.name || "Unnamed Product"}
                </h2>
                <p className="mt-2 text-sm text-[#d4cde3]">
                  {p.description || "No description."}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
