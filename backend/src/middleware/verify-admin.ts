import type { MiddlewareHandler } from "hono";
import { getSupabaseClient } from "../db/supabase.js";

export function requireAdmin(): MiddlewareHandler {
  return async (c, next) => {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    try {
      const supabase = getSupabaseClient();
      const { data: userData, error: userError } = await supabase.auth.getUser(token);

      if (userError || !userData.user) {
        return c.json({ success: false, error: "Unauthorized" }, 401);
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", userData.user.id)
        .single();

      if (!profile || profile.role !== "admin") {
        return c.json({ success: false, error: "Forbidden" }, 403);
      }

      c.set("userId", userData.user.id);
      await next();
    } catch {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
  };
}
