import React from "react";
import { CategoryBadge } from "./category-badge";
import type { Category } from "@/lib/blog";

interface Props {
  categories: Category[];
  selectedCategory?: string;
  onSelectCategory: (slug: string | undefined) => void;
}

export const BlogFilters = React.memo(function BlogFilters({ categories, selectedCategory, onSelectCategory }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(undefined)}
        data-active={!selectedCategory}
        className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:bg-primary/10"
      >
        All
      </button>
      {categories.map((cat) => (
        <CategoryBadge
          key={cat.id}
          name={cat.name}
          slug={cat.slug}
          active={selectedCategory === cat.slug}
          onClick={(slug) => onSelectCategory(selectedCategory === slug ? undefined : slug)}
        />
      ))}
    </div>
  );
});
