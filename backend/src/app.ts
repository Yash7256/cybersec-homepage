import { Hono } from "hono";
import { cors } from "hono/cors";
import { errorHandler } from "./middleware/error.js";
import { productRoutes } from "./routes/products.js";
import { blogRoutes } from "./routes/blog.js";

const app = new Hono();

app.use("*", cors());
app.use("*", errorHandler());

app.get("/api/health", (c) => c.json({ status: "ok" }));

app.route("/api/products", productRoutes);
app.route("/api/blog", blogRoutes);

export default app;
