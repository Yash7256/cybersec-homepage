import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL ?? "";
const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

if (!url || !key) {
  console.warn("Supabase URL or ANON KEY is missing. Database queries will fail.");
}

export const supabase = createClient(url, key);
