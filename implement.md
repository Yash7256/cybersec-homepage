# Production-Ready Blog Module Implementation Plan

## Overall Goals

- Keep existing Hono + Supabase backend.
- Continue using React + TanStack Router on the frontend.
- Use TanStack Query for all API requests and caching.
- Store blog cover images in **Cloudinary** (not Supabase Storage).
- Blog content should be written in **Markdown**.
- Architecture is modular and future-proof.

---

## 1. Database Improvements

### Posts Table

Extend the `posts` table with:

**SEO fields**
- `meta_title`
- `meta_description`
- `canonical_url`
- `og_image`

**Blog metadata**
- `reading_time INTEGER`
- `featured BOOLEAN DEFAULT false`
- `views INTEGER DEFAULT 0`

**Indexes** on `status`, `published_at`, `slug`

**`updated_at` trigger** — auto-updates on row change.

### Author Profiles

Create a `profiles` table (extends `auth.users`):

| Column | Type |
|--------|------|
| id | UUID PK → auth.users |
| name | TEXT |
| avatar_url | TEXT |
| bio | TEXT |
| twitter | TEXT |
| linkedin | TEXT |
| github | TEXT |
| role | TEXT ('user', 'admin') |

`posts.author_id` → `profiles.id`

Frontend displays author name, avatar, bio on blog pages.

---

## 2. Markdown Support

Content stored as Markdown.

**Frontend rendering deps:**
- `react-markdown`
- `remark-gfm`
- `rehype-highlight`

Supports: headings, tables, task lists, images, code blocks with syntax highlighting, links.

---

## 3. Backend Architecture

```
backend/src/
├── controllers/
│   └── blog.controller.ts
├── services/
│   └── blog.service.ts
├── repositories/
│   └── blog.repository.ts
├── routes/
│   └── blog.ts
├── middleware/
│   └── verify-admin.ts
├── lib/
│   ├── supabase.ts       (existing)
│   └── cache.ts          (new)
└── types/
    └── blog.ts           (new)
```

Separation: Routes → Controllers → Services → Repository (DB queries).

---

## 4. API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/blog/posts` | No | List published posts (paginated, filterable) |
| GET | `/api/blog/posts/:slug` | No | Get single published post |
| GET | `/api/blog/admin/posts/:slug` | Admin | Get any post (including drafts) |
| POST | `/api/blog/admin/posts` | Admin | Create post |
| PUT | `/api/blog/admin/posts/:id` | Admin | Update post |
| DELETE | `/api/blog/admin/posts/:id` | Admin | Delete post |
| GET | `/api/blog/tags` | No | List tags |
| POST | `/api/blog/admin/tags` | Admin | Create tag |
| GET | `/api/blog/categories` | No | List categories |
| POST | `/api/blog/admin/categories` | Admin | Create category |

### Consistent Response Format

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 48,
    "pages": 5,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

Error format:
```json
{
  "success": false,
  "error": "Post not found"
}
```

---

## 5. Pagination

Query params: `?page=1&limit=10`

Response includes: `total`, `pages`, `hasNext`, `hasPrevious`.

Default limit: 10, max: 50.

---

## 6. Search

- Search by `title` and `excerpt` using PostgreSQL ILIKE.
- Query param: `?search=term`

---

## 7. Filtering

Query params:
- `?tag=<slug>` — filter by tag
- `?category=<slug>` — filter by category
- `?featured=true` — featured posts only

Filters can be combined.

---

## 8. Cloudinary Integration

- Do NOT use Supabase Storage.
- Store only the secure Cloudinary URL in `cover_url` and `og_image`.
- Future admin panel uploads to Cloudinary → receives URL → saves to DB.

---

## 9. Caching

- In-memory cache with configurable TTL.
- Cache keys: `posts:{params}`, `post:slug={slug}`, `tags:all`, `categories:all`.
- Cache invalidation on create/update/delete.
- Cache adapter interface so Redis can be swapped in later.

---

## 10. Authentication & Authorization

- Admin check via `profiles.role = 'admin'`.
- `requireAdmin()` middleware verifies JWT + checks role.
- Only admins can create/edit/delete posts, tags, categories.

---

## 11. Transactions

Create/update post is a multi-step operation:
1. Insert/update post row
2. Attach tags (replace all)
3. Attach categories (replace all)

Rollback on failure (handled by Supabase transaction or application-level rollback).

---

## 12. Frontend Components

```
frontend/src/components/
├── BlogCard.tsx          — cover, title, excerpt, date, author, reading time, featured badge
├── BlogHero.tsx          — hero section for listing page
├── BlogFilters.tsx       — tag/category filter chips
├── Pagination.tsx        — page navigation
├── SearchBar.tsx         — search input
├── TagBadge.tsx          — clickable tag badge
├── CategoryBadge.tsx     — category badge
└── AuthorCard.tsx        — author avatar, name, bio
```

Pages remain lightweight, components handle rendering.

---

## 13. TanStack Query

Query keys:
- `["posts", { page, filters }]`
- `["post", slug]`
- `["tags"]`
- `["categories"]`

Mutation invalidation after admin operations.

---

## 14. Blog Listing Page (`/blog`)

Displays:
- Cover image
- Title
- Excerpt
- Reading time
- Published date
- Author (avatar + name)
- Featured badge (if applicable)

Includes:
- Search bar
- Category filter
- Tag filter
- Pagination

---

## 15. Blog Detail Page (`/blog/:slug`)

Displays:
- Cover image
- Title
- Author (avatar, name, bio)
- Published date
- Reading time
- Markdown content (rendered)
- Tags
- Categories
- SEO meta tags

404 page when slug is invalid.

---

## 16. SEO

Dynamic meta tags per post:
- `title` → `meta_title` or `title`
- `description` → `meta_description` or `excerpt`
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter cards
- Canonical URL
- JSON-LD `BlogPosting` schema

Prepare for: `sitemap.xml`, RSS feed, `robots.txt`.

---

## 17. Performance

- Lazy loading images
- Responsive image sizes
- Memoized components
- TanStack Query caching/stale-while-revalidate

---

## 18. Future Features (Architecture Ready)

Design so these can be added without major refactoring:
- Admin dashboard UI
- Draft preview with secret link
- Scheduled publishing
- Related posts (by shared tags)
- Reading progress bar
- Newsletter subscription
- Comments
- Author pages (`/blog/author/:slug`)
- RSS feed
- View counter
- Table of contents
- Full-text search (Postgres `tsvector`)
- Multi-author support

---

## 19. Code Quality

- Strong TypeScript typing throughout
- Reusable utility functions
- Proper error handling at every layer
- Input validation with Zod
- Clean separation of concerns (controller → service → repository)
- Consistent naming conventions
- Minimal duplication
- Well-documented APIs

---

## Implementation Order

1. Database migration (`supabase/migrations/002_create_blog.sql`)
2. Backend types (`backend/src/types/blog.ts`)
3. Cache layer (`backend/src/lib/cache.ts`)
4. Blog repository (`backend/src/repositories/blog.repository.ts`)
5. Blog service (`backend/src/services/blog.service.ts`)
6. Blog controller (`backend/src/controllers/blog.controller.ts`)
7. Admin middleware (`backend/src/middleware/verify-admin.ts`)
8. Blog routes (`backend/src/routes/blog.ts`)
9. Wire into `app.ts`
10. Frontend deps: `react-markdown`, `remark-gfm`, `rehype-highlight`
11. Frontend API client + hooks (`frontend/src/lib/blog.ts`)
12. Frontend components
13. Blog listing page (`/blog`)
14. Blog detail page (`/blog/:slug`)
15. SEO meta tags
16. Regenerate route tree
