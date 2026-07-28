import React from "react";

interface Props {
  author: string;
}

export const AuthorCard = React.memo(function AuthorCard({ author }: Props) {
  const initial = author.trim()[0]?.toUpperCase() ?? "A";

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-900/40 text-sm font-semibold text-purple-300 ring-1 ring-purple-500/30">
        {initial}
      </div>
      <span className="text-sm font-medium text-foreground">{author}</span>
    </div>
  );
});
