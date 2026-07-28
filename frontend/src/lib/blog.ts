export interface AuthorProfile {
  id: string;
  name: string | null;
  avatar_url: string | null;
  bio: string | null;
  twitter: string | null;
  linkedin: string | null;
  github: string | null;
}

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
  author_id: string;
  author: AuthorProfile | null;
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

export async function fetchPosts(params: ListPostsParams = {}): Promise<PostsResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.tag) searchParams.set("tag", params.tag);
  if (params.category) searchParams.set("category", params.category);
  if (params.featured) searchParams.set("featured", "true");
  if (params.search) searchParams.set("search", params.search);

  const res = await fetch(`/api/blog/posts?${searchParams}`);
  return res.json();
}

export async function fetchPost(slug: string): Promise<Post | null> {
  const res = await fetch(`/api/blog/posts/${slug}`);
  if (!res.ok) return null;
  const json: PostResponse = await res.json();
  return json.data;
}

export async function fetchTags(): Promise<Tag[]> {
  const res = await fetch("/api/blog/tags");
  const json: TagsResponse = await res.json();
  return json.data;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("/api/blog/categories");
  const json: CategoriesResponse = await res.json();
  return json.data;
}
