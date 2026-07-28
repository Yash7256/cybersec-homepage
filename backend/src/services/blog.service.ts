import { blogRepository } from "../repositories/blog.repository.js";
import { cache, buildCacheKey } from "../lib/cache.js";
import type {
  PostWithRelations,
  CreatePostInput,
  UpdatePostInput,
  PostFilterParams,
  PaginatedResult,
  Tag,
  Category,
} from "../types/blog.js";

const CACHE_TTL = 60_000;

export const blogService = {
  async listPosts(
    params: PostFilterParams = {},
    page = 1,
    limit = 10,
  ): Promise<PaginatedResult<PostWithRelations>> {
    const cacheKey = buildCacheKey("posts", { ...params, page, limit });
    const cached = cache.get<PaginatedResult<PostWithRelations>>(cacheKey);
    if (cached) return cached;

    const result = await blogRepository.listPosts(params, { page, limit });
    cache.set(cacheKey, result, CACHE_TTL);
    return result;
  },

  async getPostBySlug(slug: string): Promise<PostWithRelations | null> {
    const cacheKey = `post:slug=${slug}`;
    const cached = cache.get<PostWithRelations>(cacheKey);
    if (cached) return cached;

    const post = await blogRepository.getPostBySlug(slug);
    if (post) {
      cache.set(cacheKey, post, CACHE_TTL);
    }
    return post;
  },

  async createPost(input: CreatePostInput): Promise<PostWithRelations | null> {
    const post = await blogRepository.createPost(input);
    this.invalidatePostCache();
    return blogRepository.getPostById(post.id);
  },

  async updatePost(id: string, input: UpdatePostInput): Promise<PostWithRelations | null> {
    const post = await blogRepository.updatePost(id, input);
    if (!post) return null;
    this.invalidatePostCache(post.slug);
    return blogRepository.getPostById(id);
  },

  async deletePost(id: string): Promise<boolean> {
    const post = await blogRepository.getPostById(id);
    const result = await blogRepository.deletePost(id);
    if (post) {
      cache.del(`post:slug=${post.slug}`);
    }
    this.invalidatePostCache();
    return result;
  },

  async incrementViews(slug: string): Promise<void> {
    const post = await blogRepository.getPostBySlug(slug);
    if (post) {
      await blogRepository.incrementViews(post.id);
    }
  },

  async listTags(): Promise<Tag[]> {
    const cacheKey = "tags:all";
    const cached = cache.get<Tag[]>(cacheKey);
    if (cached) return cached;

    const tags = await blogRepository.listTags();
    cache.set(cacheKey, tags, CACHE_TTL);
    return tags;
  },

  async createTag(name: string, slug: string): Promise<Tag> {
    const tag = await blogRepository.createTag(name, slug);
    cache.del("tags:all");
    return tag;
  },

  async listCategories(): Promise<Category[]> {
    const cacheKey = "categories:all";
    const cached = cache.get<Category[]>(cacheKey);
    if (cached) return cached;

    const categories = await blogRepository.listCategories();
    cache.set(cacheKey, categories, CACHE_TTL);
    return categories;
  },

  async createCategory(name: string, slug: string): Promise<Category> {
    const category = await blogRepository.createCategory(name, slug);
    cache.del("categories:all");
    return category;
  },

  invalidatePostCache(slug?: string) {
    if (slug) {
      cache.del(`post:slug=${slug}`);
    }
  },
};
