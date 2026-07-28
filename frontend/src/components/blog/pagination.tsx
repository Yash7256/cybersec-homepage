interface Props {
  page: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
}

import React from "react";

export const Pagination = React.memo(function Pagination({ page, pages, hasNext, hasPrevious, onPageChange }: Props) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevious}
        className="inline-flex items-center justify-center rounded-lg border border-input px-3 py-2 text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <div className="flex items-center gap-1">
        {Array.from({ length: pages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 2)
          .map((p, idx, arr) => (
            <span key={p} className="flex items-center">
              {idx > 0 && arr[idx - 1] !== p - 1 && (
                <span className="px-1 text-muted-foreground">...</span>
              )}
              <button
                onClick={() => onPageChange(p)}
                data-active={p === page}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:bg-accent"
              >
                {p}
              </button>
            </span>
          ))}
      </div>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        className="inline-flex items-center justify-center rounded-lg border border-input px-3 py-2 text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
});
