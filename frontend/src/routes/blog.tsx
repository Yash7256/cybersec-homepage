import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { usePosts, useCategories, useTags } from "@/lib/use-blog";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogFilters } from "@/components/blog/blog-filters";
import { SearchBar } from "@/components/blog/search-bar";
import { Pagination } from "@/components/blog/pagination";
import { TagBadge } from "@/components/blog/tag-badge";
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

function BlogPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>();
  const [tag, setTag] = useState<string | undefined>();

  const { data: categoriesData } = useCategories();
  const { data: tagsData } = useTags();
  const { data: postsData, isLoading } = usePosts({
    page,
    limit: 9,
    category,
    tag,
    search: search || undefined,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (slug: string | undefined) => {
    setCategory(slug);
    setTag(undefined);
    setPage(1);
  };

  const handleTagChange = (slug: string | undefined) => {
    setTag(slug);
    setCategory(undefined);
    setPage(1);
  };

  const categories = categoriesData ?? [];
  const tags = tagsData ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNavbar />
      <BlogHero />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 space-y-4">
          <SearchBar value={search} onChange={handleSearchChange} />
          <BlogFilters
            categories={categories}
            selectedCategory={category}
            onSelectCategory={handleCategoryChange}
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Tags:</span>
              <button
                onClick={() => handleTagChange(undefined)}
                data-active={!tag}
                className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:bg-primary/10"
              >
                All
              </button>
              {tags.map((t) => (
                <TagBadge
                  key={t.id}
                  name={t.name}
                  slug={t.slug}
                  onClick={(s) => handleTagChange(tag === s ? undefined : s)}
                />
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-xl bg-secondary/50"
              />
            ))}
          </div>
        ) : postsData?.data.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No posts found.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {postsData?.data.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            {postsData?.pagination && (
              <div className="mt-12">
                <Pagination
                  page={postsData.pagination.page}
                  pages={postsData.pagination.pages}
                  hasNext={postsData.pagination.hasNext}
                  hasPrevious={postsData.pagination.hasPrevious}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
