// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: replace with the real domain once it's connected in Vercel.
  site: 'https://example.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false, // EN lives at "/", ES at "/es/"
    },
  },
});
