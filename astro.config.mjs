import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = { ...loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), ''), ...process.env };
const site = env.PUBLIC_SITE_URL || 'https://new-valley-painting.vercel.app';

export default defineConfig({
  site,
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  image: { layout: 'constrained' },
  redirects: {
    '/contact': '/free-estimate/',
    '/home': '/',
    '/services/drywall': '/services/drywall-finishing/',
  },
});
