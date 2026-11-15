import type { APIRoute } from 'astro';
import { siteConfig } from '../content/site.ts';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString().split('T')[0];

  const routes = [
    { url: '', changefreq: 'weekly', priority: 1.0 },
    { url: '/speisekarte', changefreq: 'weekly', priority: 0.9 },
    { url: '/events', changefreq: 'monthly', priority: 0.7 },
    { url: '/karriere', changefreq: 'monthly', priority: 0.5 },
    { url: '/impressum', changefreq: 'yearly', priority: 0.3 },
    { url: '/datenschutz', changefreq: 'yearly', priority: 0.3 },
    { url: '/cookie-einstellungen', changefreq: 'yearly', priority: 0.3 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}${route.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${route.url}" />
    <xhtml:link rel="alternate" hreflang="it" href="${baseUrl}/it${route.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${route.url}" />
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};