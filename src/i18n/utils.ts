import { en, type Dictionary } from './en';
import { es } from './es';

export const languages = { en: 'EN', es: 'ES' } as const;
export type Lang = keyof typeof languages;

const dictionaries: Record<Lang, Dictionary> = { en, es };

/** Returns the copy for a language. Usage: `const t = useTranslations(lang)` → `t.hero.listen`. */
export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Home URL for each language ("/" for EN, "/es/" for ES). */
export function homePath(lang: Lang): string {
  return lang === 'en' ? '/' : `/${lang}/`;
}
