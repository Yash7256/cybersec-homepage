import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { seoMeta } from "@/lib/seo";
import { getSupabaseClient } from "../lib/supabase";

interface Product {
  id: string;
  name: string;
  description: string | null;
}

const getProductsFn = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("products").select("*").limit(10);

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }
  return data ?? [];
});

export const Route = createFileRoute("/product")({
  component: ProductPage,
  loader: async () => {
    const products = await getProductsFn();
    return { products };
  },
  head: () => ({
    meta: [
      ...seoMeta({
        title: "CyberSec Toolkit — Products",
        description: "Browse and explore our cybersecurity scanning products and tools.",
        path: "/product",
        isHome: false,
      }),
    ],
  }),
});

function ProductPage() {
  const { products } = Route.useLoaderData();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {products.length === 0 ? (
        <p className="text-muted-foreground">No products found or DB not connected.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p: Product) => (
            <li key={p.id} className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{p.name || "Unnamed Product"}</h2>
              <p>{p.description || "No description."}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
