import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { Post } from "@/lib/blog";
import { usePosts } from "@/lib/use-blog";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPostDialog } from "@/components/blog/blog-post-dialog";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — CyberSec Toolkit" },
      {
        name: "description",
        content: "Security insights, tutorials, and updates from the CyberSec team.",
      },
      { property: "og:title", content: "Blog — CyberSec Toolkit" },
      {
        property: "og:description",
        content: "Security insights, tutorials, and updates from the CyberSec team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog — CyberSec Toolkit" },
    ],
  }),
});

// ── Skeleton components ───────────────────────────────────────────────────────

function FeaturedHeroSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#2e1f4a]">
      <div className="aspect-[16/6] animate-pulse bg-[#1a0f2e]" />
      <div className="bg-[#0e0818]/80 px-4 py-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-[#2a1a40]" />
        <div className="mt-3 h-3 w-1/3 animate-pulse rounded bg-[#2a1a40]" />
      </div>
    </div>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="flex gap-3 rounded-xl border border-[#2e1f4a] bg-[#0e0818]/60 p-3">
      <div className="h-[72px] w-[100px] shrink-0 animate-pulse rounded-lg bg-[#1e1133]" />
      <div className="flex flex-1 flex-col justify-between">
        <div className="h-3.5 w-5/6 animate-pulse rounded bg-[#2a1a40]" />
        <div className="mt-1.5 h-3 w-full animate-pulse rounded bg-[#2a1a40]" />
        <div className="mt-1 h-2.5 w-1/3 animate-pulse rounded bg-[#2a1a40]" />
      </div>
    </div>
  );
}

// ── Featured hero ─────────────────────────────────────────────────────────────

function FeaturedHero({ post, onSelect }: { post: Post; onSelect: (post: Post) => void }) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <button
      onClick={() => onSelect(post)}
      className="group block w-full text-left overflow-hidden rounded-2xl border border-[#2e1f4a] transition-all hover:border-[#7c3aed]/60 cursor-pointer"
    >
      {post.cover_url ? (
        <div className="aspect-[16/6] overflow-hidden">
          <img
            src={post.cover_url}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="eager"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/6] items-center justify-center bg-gradient-to-br from-[#1a0f2e] to-[#0e0818]">
          <svg
            aria-hidden="true"
            className="h-10 w-10 text-[#3a2860]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3.75 3h16.5A.75.75 0 0121 3.75v13.5a.75.75 0 01-.75.75H3.75A.75.75 0 013 17.25V3.75A.75.75 0 013.75 3z"
            />
          </svg>
        </div>
      )}
      <div className="bg-[#0e0818]/80 px-4 py-4">
        <h2 className="text-base font-semibold leading-snug text-[#ede8f6] group-hover:text-[#c084fc]">
          {post.title}
        </h2>
        <div className="mt-2 flex items-center justify-between text-xs text-[#7a6895]">
          <span>
            {date}
            {post.reading_time
              ? ` — ${String(post.reading_time).padStart(2, "0")} Minute`
              : ""}
          </span>
          <span className="text-[#9d7fcb] transition group-hover:text-[#c084fc]">
            Read Article →
          </span>
        </div>
      </div>
    </button>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#2e1f4a] py-20 text-center">
      <svg
        aria-hidden="true"
        className="mb-4 h-10 w-10 text-[#3a2860]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
        />
      </svg>
      <p className="text-sm font-medium text-[#7a6895]">No posts published yet</p>
      <p className="mt-1 text-xs text-[#4a3a6a]">Check back soon.</p>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-900/30 bg-red-950/10 py-16 text-center">
      <p className="text-sm font-medium text-red-400">Failed to load posts</p>
      <p className="mt-1 text-xs text-red-500/60">Check the backend is running.</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-lg border border-red-800/40 bg-red-900/20 px-4 py-1.5 text-xs text-red-400 transition hover:bg-red-900/40"
      >
        Retry
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function BlogPage() {
  const { data, isLoading, isError, refetch } = usePosts({ limit: 7 });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const posts = data?.data ?? [];
  const featuredPost = posts[0] ?? null;
  const gridPosts = posts.slice(1, 7);

  return (
    <div className="min-h-screen bg-[#0c0716] text-foreground">
      <SiteNavbar />

      {/* spacing for fixed navbar */}
      <div className="pt-[88px]" />

      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        {/* ── Latest Blog header ── */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-[#ede8f6]">Latest Blog</span>
        </div>

        {/* Featured hero */}
        {isLoading ? (
          <FeaturedHeroSkeleton />
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : featuredPost ? (
          <FeaturedHero post={featuredPost} onSelect={setSelectedPost} />
        ) : (
          <EmptyState />
        )}

        {/* ── Read More Blogs header ── */}
        {(isLoading || gridPosts.length > 0) && (
          <div className="mb-4 mt-10 flex items-center justify-between">
            <span className="text-sm font-medium text-[#ede8f6]">Read More Blogs</span>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {gridPosts.map((post) => (
              <BlogCard key={post.id} post={post} onSelect={setSelectedPost} />
            ))}
          </div>
        ) : null}
      </main>

      <SiteFooter />

      <BlogPostDialog
        post={selectedPost}
        open={!!selectedPost}
        onOpenChange={(open) => { if (!open) setSelectedPost(null); }}
      />
    </div>
  );
}
