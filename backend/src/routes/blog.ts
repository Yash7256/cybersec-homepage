import { Hono } from "hono";
import { blogController } from "../controllers/blog.controller.js";
import { requireAdmin } from "../middleware/verify-admin.js";

const blogRoutes = new Hono();
const adminRoutes = new Hono();

adminRoutes.use("*", requireAdmin());

adminRoutes.get("/posts/:slug", (c) => blogController.getPostAdmin(c));
adminRoutes.post("/posts", (c) => blogController.createPost(c));
adminRoutes.put("/posts/:id", (c) => blogController.updatePost(c));
adminRoutes.delete("/posts/:id", (c) => blogController.deletePost(c));
adminRoutes.post("/tags", (c) => blogController.createTag(c));
adminRoutes.post("/categories", (c) => blogController.createCategory(c));

blogRoutes.get("/posts", (c) => blogController.listPosts(c));
blogRoutes.get("/posts/:slug", (c) => blogController.getPost(c));
blogRoutes.get("/tags", (c) => blogController.listTags(c));
blogRoutes.get("/categories", (c) => blogController.listCategories(c));

blogRoutes.route("/admin", adminRoutes);

export { blogRoutes };
