import type { MiddlewareHandler } from "hono";

/**
 * Simple API-key guard for admin routes.
 * Set ADMIN_SECRET in the backend environment.
 * Clients pass it as:  Authorization: Bearer <secret>
 */
export function requireAdmin(): MiddlewareHandler {
  return async (c, next) => {
    const secret = process.env.ADMIN_SECRET;

    if (!secret) {
      console.error("ADMIN_SECRET is not configured — admin routes are locked");
      return c.json({ success: false, error: "Service unavailable" }, 503);
    }

    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token || token !== secret) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    await next();
  };
}
