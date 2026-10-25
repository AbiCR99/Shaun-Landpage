// @ts-check
import { defineConfig } from 'astro/config';
// Vite ships with Astro; loadEnv reads .env files, which Astro doesn't expose to this config by itself.
// With an empty prefix it also includes every process.env variable (e.g. Vercel's), which take precedence.
import { loadEnv } from 'vite';

const env = loadEnv('production', new URL('.', import.meta.url).pathname, '');

// The public URL of the site, used for canonical, hreflang, Open Graph, sitemap and robots.
// 1. SITE_URL: set it when the real domain exists (in .env locally, in Vercel → Settings → Environment Variables).
// 2. VERCEL_PROJECT_PRODUCTION_URL: Vercel sets it on every build (the production domain, or *.vercel.app until there is one; no protocol).
// 3. Local fallback, so `astro dev` / `astro build` work without any setup.
const site =
  env.SITE_URL ||
  (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:4321');

if (!env.SITE_URL && !env.VERCEL_PROJECT_PRODUCTION_URL) {
  console.warn(`[site] SITE_URL is not set: absolute URLs will point to ${site}. Set SITE_URL before deploying elsewhere.`);
}

export default defineConfig({
  site,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false, // EN lives at "/", ES at "/es/"
    },
  },
});
