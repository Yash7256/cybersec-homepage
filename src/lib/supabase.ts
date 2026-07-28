import { createClient } from "@supabase/supabase-js";

// Cloudflare Workers will often pass environment variables through request contexts.
// In the browser, TanStack Start might use import.meta.env or similar for public vars.
// We provide a factory to initialize it depending on the environment.

export function getSupabaseClient(env: { VITE_SUPABASE_URL?: string; VITE_SUPABASE_ANON_KEY?: string } = {}) {
  // Use passed env (from Worker context) or fallback to global process.env if available
  const url = env.VITE_SUPABASE_URL ?? (typeof process !== "undefined" ? process.env.VITE_SUPABASE_URL : "") ?? "";
  const key = env.VITE_SUPABASE_ANON_KEY ?? (typeof process !== "undefined" ? process.env.VITE_SUPABASE_ANON_KEY : "") ?? "";

  if (!url || !key) {
    console.warn("Supabase URL or ANON KEY is missing. Database queries will fail.");
  }

  return createClient(url, key);
}
