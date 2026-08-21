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

    // Categoria fixa (silo temático). Usada pra agrupar pilar + satélites
    // e pra ordenar "conteúdos relacionados" por cluster, não só por tag solta.
    category: z.enum(['linkedin', 'curriculo', 'candidatura', 'entrevista']),

    tags: z.array(z.string()).optional(),

    image: z.string().optional(),

    audio_url: z.string().optional(),

    cta_text: z.string().optional(),
    cta_url: z.string().optional(),

    // Seção "Dúvidas frequentes dos leitores", renderizada no fim do artigo
    // com dado estruturado FAQPage (schema.org) pra elegibilidade a rich
    // snippet de pergunta/resposta no Google. Opcional pra não quebrar
    // artigos antigos que ainda não têm.
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = {
  blog,
};