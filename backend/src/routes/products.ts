import { Hono } from "hono";
import { getSupabaseClient } from "../db/supabase";

export const productRoutes = new Hono();

productRoutes.get("/", async (c) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("products").select("*").limit(10);

  if (error) {
    console.error("Supabase error:", error);
    return c.json([]);
  }

  return c.json(data ?? []);
});
