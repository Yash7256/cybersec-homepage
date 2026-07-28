import { getSupabaseClient } from "../db/supabase.js";
import type {
  Post,
  PostWithRelations,
  Tag,
  Category,
  CreatePostInput,
  UpdatePostInput,
  PaginationParams,
  PostFilterParams,
  PaginatedResult,
} from "../types/blog.js";

// Columns to select on posts (no author_id / profiles join)
const POST_SELECT = `
  id, title, slug, excerpt, content, cover_url,
  meta_title, meta_description, canonical_url, og_image,
  reading_time, featured, views, status, author,
  published_at, created_at, updated_at,
  post_tags(tags(id, name, slug)),
  post_categories(categories(id, name, slug))
`;

function shapePost(row: any): PostWithRelations {
  return {
    ...row,
    tags: (row.post_tags ?? []).map((pt: any) => pt.tags).filter(Boolean),
    categories: (row.post_categories ?? []).map((pc: any) => pc.categories).filter(Boolean),
    // remove join columns from the top-level object
    post_tags: undefined,
    post_categories: undefined,
  };
}

export const blogRepository = {
  async listPosts(
    params: PostFilterParams,
    pagination: PaginationParams,
  ): Promise<PaginatedResult<PostWithRelations>> {
    const supabase = getSupabaseClient();
    const { page, limit } = pagination;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("posts")
      .select(POST_SELECT, { count: "exact" });

    // Status filter (defaults to published for public reads)
    if (params.status) {
      query = query.eq("status", params.status);
    } else {
      query = query.eq("status", "published");
    }

    if (params.featured !== undefined) {
      query = query.eq("featured", params.featured);
    }

    if (params.search) {
      query = query.or(
        `title.ilike.%${params.search}%,excerpt.ilike.%${params.search}%`,
      );
    }

    const { data, count, error } = await query
      .order("published_at", { ascending: false, nullsFirst: false })
      .range(from, to);

    if (error) throw error;

    // Tag / category slug filtering: done in-memory after fetch because
    // Supabase JS doesn't expose a clean way to filter through a junction
    // table by slug without a raw SQL filter. For small result sets this is
    // fine; for large datasets consider a Postgres view or RPC.
    let rows: PostWithRelations[] = ((data as any[]) ?? []).map(shapePost);

    if (params.tag) {
      const tagSlug = params.tag.toLowerCase();
      rows = rows.filter((p) => p.tags.some((t) => t.slug === tagSlug));
    }

    if (params.category) {
      const catSlug = params.category.toLowerCase();
      rows = rows.filter((p) => p.categories.some((c) => c.slug === catSlug));
    }

    const total = count ?? 0;
    const pages = Math.ceil(total / limit);

    return {
      data: rows,
      pagination: {
        page,
        limit,
        total,
        pages,
        hasNext: page < pages,
        hasPrevious: page > 1,
      },
    };
  },

  async getPostBySlug(slug: string): Promise<PostWithRelations | null> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("posts")
      .select(POST_SELECT)
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    return shapePost(data);
  },

  async getPostById(id: string): Promise<PostWithRelations | null> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("posts")
      .select(POST_SELECT)
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return shapePost(data);
  },

  async createPost(input: CreatePostInput): Promise<Post> {
    const supabase = getSupabaseClient();
    const { tag_ids, category_ids, ...postData } = input;

    const { data, error } = await supabase
      .from("posts")
      .insert({
        ...postData,
        author: postData.author ?? "Admin",
        published_at:
          postData.status === "published"
            ? (postData.published_at ?? new Date().toISOString())
            : null,
      })
      .select(
        "id, title, slug, excerpt, content, cover_url, meta_title, meta_description, canonical_url, og_image, reading_time, featured, views, status, author, published_at, created_at, updated_at",
      )
      .single();

    if (error) throw error;

    // Attach tags and categories; roll back post on failure
    try {
      if (tag_ids?.length) {
        const { error: tagError } = await supabase
          .from("post_tags")
          .insert(tag_ids.map((tag_id) => ({ post_id: data.id, tag_id })));
        if (tagError) throw tagError;
      }

      if (category_ids?.length) {
        const { error: catError } = await supabase
          .from("post_categories")
          .insert(
            category_ids.map((category_id) => ({ post_id: data.id, category_id })),
          );
        if (catError) throw catError;
      }
    } catch (err) {
      // Best-effort rollback
      await supabase.from("post_tags").delete().eq("post_id", data.id);
      await supabase.from("post_categories").delete().eq("post_id", data.id);
      await supabase.from("posts").delete().eq("id", data.id);
      throw err;
    }

    return data as Post;
  },

  async updatePost(id: string, input: UpdatePostInput): Promise<Post | null> {
    const supabase = getSupabaseClient();
    const { tag_ids, category_ids, ...postData } = input;

    const updateData: Record<string, unknown> = { ...postData };
    if (postData.status === "published" && !postData.published_at) {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("posts")
      .update(updateData)
      .eq("id", id)
      .select(
        "id, title, slug, excerpt, content, cover_url, meta_title, meta_description, canonical_url, og_image, reading_time, featured, views, status, author, published_at, created_at, updated_at",
      )
      .single();

    if (error) throw error;
    if (!data) return null;

    if (tag_ids !== undefined) {
      await supabase.from("post_tags").delete().eq("post_id", id);
      if (tag_ids.length) {
        const { error: tagError } = await supabase
          .from("post_tags")
          .insert(tag_ids.map((tag_id) => ({ post_id: id, tag_id })));
        if (tagError) throw tagError;
      }
    }

    if (category_ids !== undefined) {
      await supabase.from("post_categories").delete().eq("post_id", id);
      if (category_ids.length) {
        const { error: catError } = await supabase
          .from("post_categories")
          .insert(
            category_ids.map((category_id) => ({ post_id: id, category_id })),
          );
        if (catError) throw catError;
      }
    }

    return data as Post;
  },

  async deletePost(id: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) throw error;
    return true;
  },

  async incrementViews(id: string): Promise<void> {
    const supabase = getSupabaseClient();
    // Use the increment() RPC defined in the migration to avoid a read-then-write race
    await supabase.rpc("increment_post_views", { post_id: id });
  },

  async listTags(): Promise<Tag[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("tags")
      .select("id, name, slug")
      .order("name");
    if (error) throw error;
    return (data as Tag[]) ?? [];
  },

  async createTag(name: string, slug: string): Promise<Tag> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("tags")
      .insert({ name, slug })
      .select("id, name, slug")
      .single();
    if (error) throw error;
    return data as Tag;
  },

  async listCategories(): Promise<Category[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug")
      .order("name");
    if (error) throw error;
    return (data as Category[]) ?? [];
  },

  async createCategory(name: string, slug: string): Promise<Category> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("categories")
      .insert({ name, slug })
      .select("id, name, slug")
      .single();
    if (error) throw error;
    return data as Category;
  },
};
