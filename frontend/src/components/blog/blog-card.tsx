import React from "react";
import { Link } from "@tanstack/react-router";
import type { Post } from "@/lib/blog";

interface Props {
  post: Post;
  onSelect?: (post: Post) => void;
}

/** Small card used in the "Read More Blogs" grid */
export const BlogCard = React.memo(function BlogCard({ post, onSelect }: Props) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  if (onSelect) {
    return (
      <button
        onClick={() => onSelect(post)}
        className="group flex w-full cursor-pointer gap-3 rounded-xl border border-[#2e1f4a] bg-[#0e0818]/60 p-3 text-left transition-all hover:border-[#7c3aed]/60 hover:bg-[#130a20]"
      >
        {post.cover_url ? (
          <div className="h-[72px] w-[100px] shrink-0 overflow-hidden rounded-lg">
            <img
              src={post.cover_url}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="h-[72px] w-[100px] shrink-0 rounded-lg bg-[#1e1133]" />
        )}
        <div className="flex min-w-0 flex-col justify-between">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-[#ede8f6] group-hover:text-[#c084fc]">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#8f7aaa]">
              {post.excerpt}
            </p>
          )}
          <div className="mt-1.5 flex items-center gap-2 text-[10px] text-[#6b5a85]">
            {date && <time dateTime={post.published_at!}>{date}</time>}
            {post.reading_time && <span>{post.reading_time} min read</span>}
          </div>
        </div>
      </button>
    );
  }

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex gap-3 rounded-xl border border-[#2e1f4a] bg-[#0e0818]/60 p-3 transition-all hover:border-[#7c3aed]/60 hover:bg-[#130a20]"
    >
      {post.cover_url ? (
        <div className="h-[72px] w-[100px] shrink-0 overflow-hidden rounded-lg">
          <img
            src={post.cover_url}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-[72px] w-[100px] shrink-0 rounded-lg bg-[#1e1133]" />
      )}
      <div className="flex min-w-0 flex-col justify-between">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-[#ede8f6] group-hover:text-[#c084fc]">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#8f7aaa]">
            {post.excerpt}
          </p>
        )}
        <div className="mt-1.5 flex items-center gap-2 text-[10px] text-[#6b5a85]">
          {date && <time dateTime={post.published_at!}>{date}</time>}
          {post.reading_time && <span>{post.reading_time} min read</span>}
        </div>
      </div>
    </Link>
  );
});
