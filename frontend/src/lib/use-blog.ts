import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchPost, fetchTags, fetchCategories } from "./blog";
import type { ListPostsParams, Post } from "./blog";

export { fetchPost };

export function usePosts(params: ListPostsParams = {}) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
  });
}

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 60_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 60_000,
  });
}
