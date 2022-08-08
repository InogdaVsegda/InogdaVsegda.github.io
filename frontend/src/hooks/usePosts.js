import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if(sort) {
          return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;
      }, [sort, posts])

    return sortedPosts;
}

export const usePaginatedPosts = (posts, page, limit) => {
  return useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return posts.slice(start, end);
  })
}

export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);

  const sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter(post => {
        return post.title?.toLowerCase().includes(query.toLowerCase())
      })
    }, [query, sortedPosts])

  return sortedAndSearchedPosts;
}