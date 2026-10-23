// Static sitemap (no dependency): built into dist/sitemap.xml from `site` in astro.config.mjs,
// so it follows the domain automatically. Each page lists its language alternates.
import type { APIRoute } from 'astro';
import { getAbsoluteLocaleUrl } from 'astro:i18n';
import { languages, type Lang } from '../i18n/utils';

export const GET: APIRoute = () => {
  const langs = Object.keys(languages) as Lang[];
  const alternates = [
    ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${getAbsoluteLocaleUrl(l, '')}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteLocaleUrl('en', '')}"/>`,
  ].join('\n');

  const urls = langs
    .map((l) => `  <url>\n    <loc>${getAbsoluteLocaleUrl(l, '')}</loc>\n${alternates}\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
