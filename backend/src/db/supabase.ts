import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

function getUrl() {
  return process.env.SUPABASE_URL ?? "";
}

function getKey() {
  return process.env.SUPABASE_ANON_KEY ?? "";
}

export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    const url = getUrl();
    const key = getKey();
    if (!url || !key) {
      throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
    }
    _client = createClient(url, key);
  }
  return _client;
}

export function getServiceClient(): SupabaseClient {
  const url = getUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  }
  return createClient(url, key);
}
