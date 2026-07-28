import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? "",
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
);

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
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
  /** Plain text author name — no auth profile */
  author: string;
  tags: Tag[];
  categories: Category[];
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PostsResponse {
  success: boolean;
  data: Post[];
  pagination: PaginationInfo;
}

export interface PostResponse {
  success: boolean;
  data: Post;
}

export interface TagsResponse {
  success: boolean;
  data: Tag[];
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export interface ListPostsParams {
  page?: number;
  limit?: number;
  tag?: string;
  category?: string;
  featured?: boolean;
  search?: string;
}

const POST_SELECT = `
  id, title, slug, excerpt, content, cover_url,
  meta_title, meta_description, canonical_url, og_image,
  reading_time, featured, views, status, author,
  published_at, created_at, updated_at,
  post_tags(tags(id, name, slug)),
  post_categories(categories(id, name, slug))
`;

function shapePost(row: any): Post {
  return {
    ...row,
    tags: (row.post_tags ?? []).map((pt: any) => pt.tags).filter(Boolean),
    categories: (row.post_categories ?? []).map((pc: any) => pc.categories).filter(Boolean),
    post_tags: undefined,
    post_categories: undefined,
  };
}

export async function fetchPosts(params: ListPostsParams = {}): Promise<PostsResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("posts")
    .select(POST_SELECT, { count: "exact" })
    .eq("status", "published");

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

  let rows: Post[] = ((data as any[]) ?? []).map(shapePost);

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
    success: true,
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
}

export async function fetchPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return shapePost(data);
}

export async function fetchTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from("tags")
    .select("id, name, slug")
    .order("name");

  if (error) throw error;
  return (data as Tag[]) ?? [];
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  if (error) throw error;
  return (data as Category[]) ?? [];
}
