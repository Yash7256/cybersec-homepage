import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client.
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY when available so the backend can bypass RLS
 * for write operations. Falls back to SUPABASE_ANON_KEY for read-only
 * deployments where only public blog data is served.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.SUPABASE_URL ?? "";
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

    if (!url || !key) {
      throw new Error(
        "SUPABASE_URL and either SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY must be set",
      );
    }

    _client = createClient(url, key, {
      auth: { persistSession: false },
    });
  }

  return _client;
}
