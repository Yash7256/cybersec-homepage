import React from "react";
import type { AuthorProfile } from "@/lib/blog";

interface Props {
  author: AuthorProfile;
}

export const AuthorCard = React.memo(function AuthorCard({ author }: Props) {
  return (
    <div className="flex items-center gap-3">
      {author.avatar_url ? (
        <img
          src={author.avatar_url}
          alt={author.name ?? "Author"}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
          {(author.name ?? "A")[0]}
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-foreground">{author.name ?? "Anonymous"}</p>
        {author.bio && (
          <p className="text-xs text-muted-foreground">{author.bio}</p>
        )}
      </div>
    </div>
  );
});
