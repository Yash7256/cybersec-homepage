import { Hono } from "hono";
import { getSupabaseClient } from "../db/supabase";

export const authRoutes = new Hono();

authRoutes.get("/session", async (c) => {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { data: sessionData } = await supabase.auth.getSession();

  return c.json({ session: sessionData.session });
});
