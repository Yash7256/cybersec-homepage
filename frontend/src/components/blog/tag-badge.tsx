import React from "react";

interface Props {
  name: string;
  slug: string;
  onClick?: (slug: string) => void;
}

export const TagBadge = React.memo(function TagBadge({ name, slug, onClick }: Props) {
  return (
    <button
      onClick={() => onClick?.(slug)}
      className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary/20"
    >
      {name}
    </button>
  );
});
