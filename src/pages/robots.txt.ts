import type { APIRoute } from 'astro';
import { SITE, abs } from '../lib/site';

export const GET: APIRoute = () => {
  const body = SITE.noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap-index.xml')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
