import React from "react";

interface Props {
  name: string;
  slug: string;
  active?: boolean;
  onClick?: (slug: string) => void;
}

export const CategoryBadge = React.memo(function CategoryBadge({ name, slug, active, onClick }: Props) {
  return (
    <button
      onClick={() => onClick?.(slug)}
      data-active={active}
      className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-primary hover:bg-primary/10"
    >
      {name}
    </button>
  );
});
