interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

import React from "react";

export const SearchBar = React.memo(function SearchBar({ value, onChange, placeholder = "Search posts..." }: Props) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
  );
});
