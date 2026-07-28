# Blog Implementation

## Schema (`supabase/migrations/002_create_blog.sql`)

```sql
create table public.posts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  excerpt     text,
  content     text,
  cover_url   text,
  author_id   uuid references auth.users(id) not null,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.tags (
  id   uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table public.categories (
  id   uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table public.post_tags (
  post_id uuid references public.posts(id) on delete cascade,
  tag_id  uuid references public.tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table public.post_categories (
  post_id     uuid references public.posts(id) on delete cascade,
  category_id uuid references public.categories(id) on delete cascade,
  primary key (post_id, category_id)
);

alter table public.posts enable row level security;
alter table public.tags enable row level security;
alter table public.categories enable row level security;
alter table public.post_tags enable row level security;
alter table public.post_categories enable row level security;

-- RLS: public read for published posts, admin write
create policy "Anyone can read published posts"
  on public.posts for select
  using (status = 'published');

create policy "Admins can manage all posts"
  on public.posts for all
  using (auth.role() = 'authenticated'); -- refine with admin check

-- similar policies for tags, categories, etc.
```

## Backend

### Files

| File | Purpose |
|------|---------|
| `backend/src/routes/blog.ts` | Blog CRUD routes |
| `backend/src/lib/verify-admin.ts` | Auth middleware for admin routes |

### API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/blog/posts` | No | List published posts (query: `?page=&limit=&tag=&category=&search=`) |
| GET | `/api/blog/posts/:slug` | No | Get single published post by slug |
| POST | `/api/blog/posts` | Admin | Create post |
| PUT | `/api/blog/posts/:id` | Admin | Update post |
| DELETE | `/api/blog/posts/:id` | Admin | Delete post |
| GET | `/api/blog/tags` | No | List all tags |
| GET | `/api/blog/categories` | No | List all categories |
| POST | `/api/blog/tags` | Admin | Create tag |
| POST | `/api/blog/categories` | Admin | Create category |

### Example route structure (`backend/src/routes/blog.ts`)

```
/BlogRoutes
  GET    /posts          → list published, paginated
  GET    /posts/:slug    → single post with tags + categories
  POST   /posts          → create (admin)
  PUT    /posts/:id      → update (admin)
  DELETE /posts/:id      → delete (admin)
  GET    /tags            → list all
  POST   /tags            → create (admin)
  GET    /categories      → list all
  POST   /categories      → create (admin)
```

### Supabase queries

- **List posts**: `supabase.from("posts").select("id, title, slug, excerpt, cover_url, published_at, author_id").eq("status", "published").order("published_at", { ascending: false }).range(from, to)`
- **Single post**: `supabase.from("posts").select("*, tags(*), categories(*)").eq("slug", slug).eq("status", "published").single()`
- **Admin list**: same but without `status` filter

## Frontend

### Files

| File | Purpose |
|------|---------|
| `frontend/src/routes/blog.tsx` | Blog listing page `/blog` |
| `frontend/src/routes/blog.$slug.tsx` | Single post page `/blog/:slug` |
| `frontend/src/components/blog-card.tsx` | Reusable card component |
| `frontend/src/lib/blog.ts` | API client functions |

### Pages

#### `/blog` — Blog listing

- Fetch posts from `GET /api/blog/posts`
- Display grid of blog cards (title, excerpt, date, cover image)
- Pagination (load more or page numbers)
- Sidebar with tag/category filters

#### `/blog/:slug` — Single post

- Fetch post from `GET /api/blog/posts/:slug`
- Render markdown content (need `react-markdown` + `remark-gfm`)
- Display cover image, title, author, date, tags, categories
- 404 state if slug not found

### API client (`frontend/src/lib/blog.ts`)

```ts
export async function getPosts(params?: { page?: number; tag?: string; category?: string; search?: string }) {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set("page", String(params.page))
  if (params?.tag) searchParams.set("tag", params.tag)
  if (params?.category) searchParams.set("category", params.category)
  if (params?.search) searchParams.set("search", params.search)
  const res = await fetch(`/api/blog/posts?${searchParams}`)
  return res.json()
}

export async function getPost(slug: string) {
  const res = await fetch(`/api/blog/posts/${slug}`)
  if (!res.ok) return null
  return res.json()
}
```

## Implementation Order

1. Database migration (create tables, RLS policies)
2. Backend routes (`blog.ts`)
3. Wire routes into `backend/src/app.ts`
4. Frontend API client (`frontend/src/lib/blog.ts`)
5. Blog listing page (`/blog`)
6. Single post page (`/blog/:slug`)
7. Add `react-markdown` and `remark-gfm` to frontend deps
8. Regenerate route tree (`bun run dev` to trigger auto-gen)

## Future Enhancements

- Admin UI for creating/editing posts
- Image upload to Supabase Storage
- RSS feed
- Related posts by tags
- Reading time estimate
- SEO meta tags per post
