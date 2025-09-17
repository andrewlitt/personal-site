import type { MarkdownInstance } from 'astro';

export type BlogFrontmatter = {
  title: string;
  description: string;
  publishDate: string;
};

export type BlogPost = MarkdownInstance<BlogFrontmatter>;