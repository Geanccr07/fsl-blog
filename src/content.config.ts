import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    seoTitle: z.string().optional(),

    date: z.coerce.date(),

    author: z.string().default('Gean Carlos'),
    authorRole: z.string(),
    authorImage: z.string(),

    tags: z.array(z.string()).optional(),

    image: z.string().optional(),

    cta_text: z.string().optional(),
    cta_url: z.string().optional(),
  }),
});

export const collections = {
  blog,
};