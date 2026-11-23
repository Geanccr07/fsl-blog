// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import rehypeTabelaResponsiva from './src/plugins/rehype-tabela-responsiva.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.firststeplab.com.br',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeTabelaResponsiva],
  },
});
