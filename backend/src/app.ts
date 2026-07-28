import { Hono } from "hono";
import { cors } from "hono/cors";
import { errorHandler } from "./middleware/error";
import { authRoutes } from "./routes/auth";
import { productRoutes } from "./routes/products";

const app = new Hono();

app.use("*", cors());
app.use("*", errorHandler());

app.get("/api/health", (c) => c.json({ status: "ok" }));

app.route("/api/auth", authRoutes);
app.route("/api/products", productRoutes);

export default app;
