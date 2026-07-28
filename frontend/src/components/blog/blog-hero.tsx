interface Props {
  title?: string;
  subtitle?: string;
}

import React from "react";

export const BlogHero = React.memo(function BlogHero({
  title = "Blog",
  subtitle = "Security insights, tutorials, and updates from the CyberSec team.",
}: Props) {
  return (
    <div className="border-b border-border bg-gradient-to-b from-background to-secondary/20 px-6 py-16 text-center">
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">{title}</h1>
      <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
    </div>
  );
});
