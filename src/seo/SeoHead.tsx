import { useEffect } from 'react';
import { useLanguage } from '../i18n';
import { DEFAULT_LANGUAGE, LOCALES, localisedUrl, normaliseSiteUrl } from './siteConfig';

/**
 * The deployed origin, e.g. `https://orthodoxholdings.com`.
 *
 * Set `VITE_SITE_URL` in `.env.local` and in the Vercel project settings. When
 * it is missing every URL-bearing tag is skipped rather than pointed at a guess
 * — a canonical aimed at the wrong origin can deindex the real one.
 */
const SITE_URL = normaliseSiteUrl(import.meta.env.VITE_SITE_URL);

/** Creates or updates a single head tag, matched on `selector`. */
const upsert = (selector: string, tag: string, attrs: Record<string, string>): void => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
};

/** Removes every tag matching `selector`, used to rebuild the hreflang set. */
const removeAll = (selector: string): void => {
  document.head.querySelectorAll(selector).forEach((el) => el.remove());
};

/**
 * Keeps the description, canonical, hreflang set and Open Graph tags in step
 * with the active language.
 *
 * `index.html` already carries the English versions of these tags so that a
 * crawler which never runs JavaScript still gets a complete head; this hook
 * rewrites them in place when the visitor switches language, which is why it
 * updates existing tags rather than appending new ones.
 */
export const useSeoHead = (): void => {
  const { language, t } = useLanguage();

  useEffect(() => {
    const locale = LOCALES[language];

    upsert('meta[name="description"]', 'meta', {
      name: 'description',
      content: t.meta.description,
    });

    upsert('meta[property="og:title"]', 'meta', {
      property: 'og:title',
      content: t.meta.ogTitle,
    });
    upsert('meta[property="og:description"]', 'meta', {
      property: 'og:description',
      content: t.meta.description,
    });
    upsert('meta[property="og:locale"]', 'meta', {
      property: 'og:locale',
      content: locale.ogLocale,
    });
    upsert('meta[name="twitter:title"]', 'meta', {
      name: 'twitter:title',
      content: t.meta.ogTitle,
    });
    upsert('meta[name="twitter:description"]', 'meta', {
      name: 'twitter:description',
      content: t.meta.description,
    });
    upsert('meta[property="og:image:alt"]', 'meta', {
      property: 'og:image:alt',
      content: t.meta.ogImageAlt,
    });
    upsert('meta[name="twitter:image:alt"]', 'meta', {
      name: 'twitter:image:alt',
      content: t.meta.ogImageAlt,
    });

    if (!SITE_URL) return;

    const path = window.location.pathname;

    upsert('link[rel="canonical"]', 'link', {
      rel: 'canonical',
      href: localisedUrl(SITE_URL, path, language),
    });
    upsert('meta[property="og:url"]', 'meta', {
      property: 'og:url',
      content: localisedUrl(SITE_URL, path, language),
    });

    // Rebuild the alternate set so a language switch cannot leave a stale entry.
    removeAll('link[rel="alternate"][hreflang]');
    removeAll('meta[property="og:locale:alternate"]');

    for (const code of Object.keys(LOCALES) as (keyof typeof LOCALES)[]) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', LOCALES[code].hreflang);
      link.setAttribute('href', localisedUrl(SITE_URL, path, code));
      document.head.appendChild(link);

      if (code !== language) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:locale:alternate');
        meta.setAttribute('content', LOCALES[code].ogLocale);
        document.head.appendChild(meta);
      }
    }

    // x-default sends unmatched locales to the English page.
    const fallback = document.createElement('link');
    fallback.setAttribute('rel', 'alternate');
    fallback.setAttribute('hreflang', 'x-default');
    fallback.setAttribute('href', localisedUrl(SITE_URL, path, DEFAULT_LANGUAGE));
    document.head.appendChild(fallback);
  }, [language, t]);
};

/** Renders nothing; mounted once near the root so the head tracks the language. */
export const SeoHead: React.FC = () => {
  useSeoHead();
  return null;
};
