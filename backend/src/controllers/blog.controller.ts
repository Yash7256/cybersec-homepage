import type { Context } from "hono";
import { blogService } from "../services/blog.service.js";
import type { ApiResponse } from "../types/blog.js";
import {
  createPostSchema,
  updatePostSchema,
  createTagSchema,
  createCategorySchema,
} from "../lib/validations.js";

function respond<T>(c: Context, data: T, status: number = 200, pagination?: ApiResponse<T>["pagination"]): Response {
  const body: ApiResponse<T> = { success: true, data };
  if (pagination) body.pagination = pagination;
  return c.json(body, status as any);
}

function respondError(c: Context, message: string, status: number = 400): Response {
  return c.json({ success: false, error: message }, status as any);
}

export const blogController = {
  async listPosts(c: Context): Promise<Response> {
    try {
      const page = Math.max(1, Number(c.req.query("page")) || 1);
      const limit = Math.min(50, Math.max(1, Number(c.req.query("limit")) || 10));
      const tag = c.req.query("tag") ?? undefined;
      const category = c.req.query("category") ?? undefined;
      const featured = c.req.query("featured") === "true" ? true : undefined;
      const search = c.req.query("search") ?? undefined;

      const result = await blogService.listPosts({ tag, category, featured, search }, page, limit);
      return respond(c, result.data, 200, result.pagination);
    } catch (err) {
      console.error("listPosts error:", err);
      return respondError(c, "Failed to fetch posts", 500);
    }
  },

  async getPost(c: Context): Promise<Response> {
    try {
      const slug = c.req.param("slug");
      if (!slug) return respondError(c, "Post not found", 404);

      const post = await blogService.getPostBySlug(slug);

      if (!post || post.status !== "published") {
        return respondError(c, "Post not found", 404);
      }

      blogService.incrementViews(slug);
      return respond(c, post);
    } catch (err) {
      console.error("getPost error:", err);
      return respondError(c, "Failed to fetch post", 500);
    }
  },

  async getPostAdmin(c: Context): Promise<Response> {
    try {
      const slug = c.req.param("slug");
      if (!slug) return respondError(c, "Post not found", 404);

      const post = await blogService.getPostBySlug(slug);

      if (!post) {
        return respondError(c, "Post not found", 404);
      }

      return respond(c, post);
    } catch (err) {
      console.error("getPostAdmin error:", err);
      return respondError(c, "Failed to fetch post", 500);
    }
  },

  async createPost(c: Context): Promise<Response> {
    try {
      const body = await c.req.json();
      const authorId = c.get("userId") as string;

      const parsed = createPostSchema.safeParse(body);
      if (!parsed.success) {
        return respondError(c, parsed.error.errors.map((e) => e.message).join(", "), 400);
      }

      const post = await blogService.createPost({
        ...parsed.data,
        author_id: authorId,
      });

      return respond(c, post, 201);
    } catch (err) {
      console.error("createPost error:", err);
      return respondError(c, "Failed to create post", 500);
    }
  },

  async updatePost(c: Context): Promise<Response> {
    try {
      const id = c.req.param("id");
      if (!id) return respondError(c, "Post ID is required", 400);

      const body = await c.req.json();

      const parsed = updatePostSchema.safeParse(body);
      if (!parsed.success) {
        return respondError(c, parsed.error.errors.map((e) => e.message).join(", "), 400);
      }

      const post = await blogService.updatePost(id, parsed.data);

      if (!post) {
        return respondError(c, "Post not found", 404);
      }

      return respond(c, post);
    } catch (err) {
      console.error("updatePost error:", err);
      return respondError(c, "Failed to update post", 500);
    }
  },

  async deletePost(c: Context): Promise<Response> {
    try {
      const id = c.req.param("id");
      if (!id) return respondError(c, "Post ID is required", 400);

      const result = await blogService.deletePost(id);

      if (!result) {
        return respondError(c, "Post not found", 404);
      }

      return respond(c, { id });
    } catch (err) {
      console.error("deletePost error:", err);
      return respondError(c, "Failed to delete post", 500);
    }
  },

  async listTags(c: Context): Promise<Response> {
    try {
      const tags = await blogService.listTags();
      return respond(c, tags);
    } catch (err) {
      console.error("listTags error:", err);
      return respondError(c, "Failed to fetch tags", 500);
    }
  },

  async createTag(c: Context): Promise<Response> {
    try {
      const body = await c.req.json();

      const parsed = createTagSchema.safeParse(body);
      if (!parsed.success) {
        return respondError(c, parsed.error.errors.map((e) => e.message).join(", "), 400);
      }

      const tag = await blogService.createTag(parsed.data.name, parsed.data.slug);
      return respond(c, tag, 201);
    } catch (err) {
      console.error("createTag error:", err);
      return respondError(c, "Failed to create tag", 500);
    }
  },

  async listCategories(c: Context): Promise<Response> {
    try {
      const categories = await blogService.listCategories();
      return respond(c, categories);
    } catch (err) {
      console.error("listCategories error:", err);
      return respondError(c, "Failed to fetch categories", 500);
    }
  },

  async createCategory(c: Context): Promise<Response> {
    try {
      const body = await c.req.json();

      const parsed = createCategorySchema.safeParse(body);
      if (!parsed.success) {
        return respondError(c, parsed.error.errors.map((e) => e.message).join(", "), 400);
      }

      const category = await blogService.createCategory(parsed.data.name, parsed.data.slug);
      return respond(c, category, 201);
    } catch (err) {
      console.error("createCategory error:", err);
      return respondError(c, "Failed to create category", 500);
    }
  },
};
