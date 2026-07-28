import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
  excerpt: z.string().max(500).optional(),
  content: z.string().optional(),
  cover_url: z.string().url().optional().or(z.literal("")),
  meta_title: z.string().max(200).optional(),
  meta_description: z.string().max(300).optional(),
  canonical_url: z.string().url().optional().or(z.literal("")),
  og_image: z.string().url().optional().or(z.literal("")),
  reading_time: z.number().int().positive().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
  author: z.string().max(200).optional(),
  published_at: z.string().datetime().optional(),
  tag_ids: z.array(z.string().uuid()).optional(),
  category_ids: z.array(z.string().uuid()).optional(),
});

export const updatePostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().optional(),
  cover_url: z.string().url().optional().or(z.literal("")),
  meta_title: z.string().max(200).optional(),
  meta_description: z.string().max(300).optional(),
  canonical_url: z.string().url().optional().or(z.literal("")),
  og_image: z.string().url().optional().or(z.literal("")),
  reading_time: z.number().int().positive().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
  author: z.string().max(200).optional(),
  published_at: z.string().datetime().optional(),
  tag_ids: z.array(z.string().uuid()).optional(),
  category_ids: z.array(z.string().uuid()).optional(),
});

export const createTagSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9-]+$/),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9-]+$/),
});
