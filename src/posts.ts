export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  body: string[];
}

/**
 * Journal entries. Add a post here and it gets its own page at /blog/<slug>,
 * appears on /blog, and is added to the sitemap at the next build.
 */
export const POSTS: Post[] = [];
