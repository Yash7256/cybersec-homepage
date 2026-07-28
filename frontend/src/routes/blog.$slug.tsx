import { createFileRoute, Link } from "@tanstack/react-router";
import { queryClient } from "@/lib/query-client";
import { usePost, fetchPost } from "@/lib/use-blog";
import type { Post } from "@/lib/blog";
import { AuthorCard } from "@/components/blog/author-card";
import { TagBadge } from "@/components/blog/tag-badge";
import { CategoryBadge } from "@/components/blog/category-badge";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { seoMeta } from "@/lib/seo";

const SITE_URL = "https://home.cybersec1.tech";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await queryClient.ensureQueryData({
      queryKey: ["post", params.slug],
      queryFn: () => fetchPost(params.slug),
    });
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [
          { title: "Post Not Found — CyberSec Toolkit" },
          { name: "description", content: "The requested blog post was not found." },
        ],
      };
    }
    const metaTitle = post.meta_title || post.title;
    const metaDesc = post.meta_description || post.excerpt || "";
    return {
      meta: [
        { title: `${metaTitle} — CyberSec Toolkit` },
        { name: "description", content: metaDesc },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: metaDesc },
        ...(post.og_image || post.cover_url
          ? [{ property: "og:image", content: post.og_image || post.cover_url! }]
          : []),
        { property: "og:url", content: `${SITE_URL}/blog/${post.slug}` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: metaTitle },
        { name: "twitter:description", content: metaDesc },
        ...(post.og_image || post.cover_url
          ? [{ name: "twitter:image", content: post.og_image || post.cover_url! }]
          : []),
      ],
      links: [{ rel: "canonical", href: post.canonical_url || `${SITE_URL}/blog/${post.slug}` }],
    };
  },
  component: BlogPostPage,
  notFoundComponent: BlogPostNotFound,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const { data: post, isLoading } = usePost(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteNavbar />
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="h-8 w-3/4 animate-pulse rounded bg-secondary/50" />
          <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-secondary/50" />
          <div className="mt-8 aspect-video animate-pulse rounded-xl bg-secondary/50" />
          <div className="mt-8 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-secondary/50" style={{ width: `${70 + Math.random() * 30}%` }} />
            ))}
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!post) {
    return <BlogPostNotFound />;
  }

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_url,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    publisher: { "@type": "Organization", name: "CyberSec Toolkit" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <SiteNavbar />
      <article className="mx-auto max-w-3xl px-6 py-16">
        {post.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <CategoryBadge key={cat.id} name={cat.name} slug={cat.slug} />
            ))}
          </div>
        )}

        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          {date && <time dateTime={post.published_at!}>{date}</time>}
          {post.reading_time && <span>{post.reading_time} min read</span>}
          {post.featured && (
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
              Featured
            </span>
          )}
        </div>

        {post.author && (
          <div className="mt-6">
            <AuthorCard author={post.author} />
          </div>
        )}

        {post.cover_url && (
          <div className="mt-8 overflow-hidden rounded-xl">
            <img src={post.cover_url} alt={post.title} className="w-full object-cover" loading="lazy" />
          </div>
        )}

        {post.content && (
          <div className="prose prose-invert mt-10 max-w-none">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {post.content}
            </Markdown>
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagBadge key={tag.id} name={tag.name} slug={tag.slug} />
              ))}
            </div>
          </div>
        )}
      </article>
      <SiteFooter />
    </div>
  );
}

function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNavbar />
      <div className="flex flex-col items-center justify-center px-6 py-32">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-2 text-muted-foreground">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to blog
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}
