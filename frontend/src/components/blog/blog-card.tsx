import React from "react";
import { Link } from "@tanstack/react-router";
import type { Post } from "@/lib/blog";
import { AuthorCard } from "./author-card";

interface Props {
  post: Post;
}

export const BlogCard = React.memo(function BlogCard({ post }: Props) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
    >
      {post.cover_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.cover_url}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
          {post.featured && (
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
              Featured
            </span>
          )}
          {date && <time dateTime={post.published_at!}>{date}</time>}
          {post.reading_time && (
            <span>{post.reading_time} min read</span>
          )}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
        )}
        {post.author && <AuthorCard author={post.author} />}
      </div>
    </Link>
  );
});
