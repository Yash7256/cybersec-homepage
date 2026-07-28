import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthorCard } from "@/components/blog/author-card";
import { TagBadge } from "@/components/blog/tag-badge";
import { CategoryBadge } from "@/components/blog/category-badge";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import type { Post } from "@/lib/blog";

interface Props {
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlogPostDialog({ post, open, onOpenChange }: Props) {
  const date = post?.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl p-0">
        <span className="sr-only">
          <DialogTitle>{post?.title ?? "Blog post"}</DialogTitle>
        </span>

        <ScrollArea className="max-h-[90vh]">
          {post && (
            <article className="px-6 py-8 sm:px-10 sm:py-10">
              {/* Categories */}
              {post.categories.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.categories.map((cat) => (
                    <CategoryBadge key={cat.id} name={cat.name} slug={cat.slug} />
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {post.title}
              </h1>

              {/* Meta row */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {date && <time dateTime={post.published_at!}>{date}</time>}
                {post.reading_time && <span>{post.reading_time} min read</span>}
                {post.featured && (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                    Featured
                  </span>
                )}
              </div>

              {/* Author */}
              <div className="mt-5">
                <AuthorCard author={post.author} />
              </div>

              {/* Cover image */}
              {post.cover_url && (
                <div className="mt-8 overflow-hidden rounded-xl border border-border">
                  <img
                    src={post.cover_url}
                    alt={post.title}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Excerpt */}
              {post.excerpt && !post.content && (
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              )}

              {/* Markdown body */}
              {post.content && (
                <div className="mt-10">
                  <MarkdownRenderer content={post.content} />
                </div>
              )}

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 border-t border-border pt-8">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <TagBadge key={tag.id} name={tag.name} slug={tag.slug} />
                    ))}
                  </div>
                </div>
              )}
            </article>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}