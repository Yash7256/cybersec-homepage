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

type SupabasePostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_image: string | null;
  reading_time: number | null;
  featured: boolean;
  views: number;
  status: "draft" | "published";
  author_id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author: {
    id: string;
    name: string | null;
    avatar_url: string | null;
    bio: string | null;
    twitter: string | null;
    linkedin: string | null;
    github: string | null;
  } | null;
  tags: { id: string; name: string; slug: string }[];
  categories: { id: string; name: string; slug: string }[];
};

function mapRow(row: SupabasePostRow): PostWithRelations {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    cover_url: row.cover_url,
    meta_title: row.meta_title,
    meta_description: row.meta_description,
    canonical_url: row.canonical_url,
    og_image: row.og_image,
    reading_time: row.reading_time,
    featured: row.featured,
    views: row.views,
    status: row.status,
    author_id: row.author_id,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
    author: row.author,
    tags: row.tags ?? [],
    categories: row.categories ?? [],
  };
}

const POST_SELECT = `
  id, title, slug, excerpt, content, cover_url,
  meta_title, meta_description, canonical_url, og_image,
  reading_time, featured, views, status,
  author_id, published_at, created_at, updated_at
`;

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
      .select("*, author:author_id(id, name, avatar_url, bio, twitter, linkedin, github), tags:post_tags(id, name, slug), categories:post_categories(id, name, slug)", { count: "exact" });

    if (params.status) {
      query = query.eq("status", params.status);
    } else {
      query = query.eq("status", "published");
    }

    if (params.featured !== undefined) {
      query = query.eq("featured", params.featured);
    }

    if (params.tag) {
      const { data: tagData } = await supabase
        .from("tags")
        .select("id")
        .eq("slug", params.tag)
        .single();
      if (tagData) {
        query = query.contains("post_tags.tag_id", [tagData.id]);
      }
    }

    if (params.category) {
      const { data: catData } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", params.category)
        .single();
      if (catData) {
        query = query.contains("post_categories.category_id", [catData.id]);
      }
    }

    if (params.search) {
      query = query.or(`title.ilike.%${params.search}%,excerpt.ilike.%${params.search}%`);
    }

    const { data, count, error } = await query
      .order("published_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    const total = count ?? 0;
    const pages = Math.ceil(total / limit);

    return {
      data: ((data as SupabasePostRow[]) ?? []).map(mapRow),
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
      .select("*, author:author_id(id, name, avatar_url, bio, twitter, linkedin, github), tags:post_tags(id, name, slug), categories:post_categories(id, name, slug)")
      .eq("slug", slug)
      .single();

    if (error) return null;
    return mapRow(data as SupabasePostRow);
  },

  async getPostById(id: string): Promise<PostWithRelations | null> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*, author:author_id(id, name, avatar_url, bio, twitter, linkedin, github), tags:post_tags(id, name, slug), categories:post_categories(id, name, slug)")
      .eq("id", id)
      .single();

    if (error) return null;
    return mapRow(data as SupabasePostRow);
  },

  async createPost(input: CreatePostInput): Promise<Post> {
    const supabase = getSupabaseClient();
    const { tag_ids, category_ids, ...postData } = input;

    const { data, error } = await supabase
      .from("posts")
      .insert({
        ...postData,
        published_at:
          postData.status === "published"
            ? (postData.published_at ?? new Date().toISOString())
            : null,
      })
      .select(POST_SELECT)
      .single();

    if (error) throw error;

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
          .insert(category_ids.map((category_id) => ({ post_id: data.id, category_id })));
        if (catError) throw catError;
      }
    } catch (err) {
      await supabase.from("post_tags").delete().eq("post_id", data.id).maybeSingle();
      await supabase.from("post_categories").delete().eq("post_id", data.id).maybeSingle();
      await supabase.from("posts").delete().eq("id", data.id).maybeSingle();
      throw err;
    }

    return data as Post;
  },

  async updatePost(id: string, input: UpdatePostInput): Promise<Post | null> {
    const supabase = getSupabaseClient();
    const { tag_ids, category_ids, ...postData } = input;

    const updateData: Record<string, unknown> = { ...postData };
    if (postData.status === "published") {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("posts")
      .update(updateData)
      .eq("id", id)
      .select(POST_SELECT)
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
          .insert(category_ids.map((category_id) => ({ post_id: id, category_id })));
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
    const { data: post } = await supabase
      .from("posts")
      .select("views")
      .eq("id", id)
      .single();

    if (post) {
      await supabase
        .from("posts")
        .update({ views: (post.views ?? 0) + 1 })
        .eq("id", id);
    }
  },

  async listTags(): Promise<Tag[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("tags").select("*").order("name");
    if (error) throw error;
    return (data as Tag[]) ?? [];
  },

  async createTag(name: string, slug: string): Promise<Tag> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("tags")
      .insert({ name, slug })
      .select("*")
      .single();
    if (error) throw error;
    return data as Tag;
  },

  async listCategories(): Promise<Category[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("categories").select("*").order("name");
    if (error) throw error;
    return (data as Category[]) ?? [];
  },

  async createCategory(name: string, slug: string): Promise<Category> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("categories")
      .insert({ name, slug })
      .select("*")
      .single();
    if (error) throw error;
    return data as Category;
  },
};
