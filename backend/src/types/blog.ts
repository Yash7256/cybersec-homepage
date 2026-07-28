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
  author: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostWithRelations extends Post {
  tags: Tag[];
  categories: Category[];
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

export interface CreatePostInput {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover_url?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_image?: string;
  reading_time?: number;
  featured?: boolean;
  status?: "draft" | "published";
  author?: string;
  published_at?: string;
  tag_ids?: string[];
  category_ids?: string[];
}

export interface UpdatePostInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  cover_url?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_image?: string;
  reading_time?: number;
  featured?: boolean;
  status?: "draft" | "published";
  author?: string;
  published_at?: string;
  tag_ids?: string[];
  category_ids?: string[];
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PostFilterParams {
  tag?: string;
  category?: string;
  featured?: boolean;
  search?: string;
  status?: "draft" | "published";
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: PaginatedResult<T>["pagination"];
  error?: string;
}
