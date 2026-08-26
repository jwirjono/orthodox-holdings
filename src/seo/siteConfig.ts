/**
 * Environment-free SEO facts, shared by the runtime head sync
 * (`src/seo/SeoHead.tsx`) and the build-time generator in `vite.config.ts`.
 *
 * Nothing here may import React, assets or `import.meta.env` — `vite.config.ts`
 * loads this module in plain Node.
 */
import type { Language } from '../i18n';

/** Locale metadata, keyed by the app's own language codes. */
export const LOCALES: Record<
  Language,
  { htmlLang: string; hreflang: string; ogLocale: string; label: string }
> = {
  en: { htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US', label: 'English' },
  id: { htmlLang: 'id', hreflang: 'id', ogLocale: 'id_ID', label: 'Bahasa Indonesia' },
};

/** The language served when no `?lang` is present — also the `x-default` target. */
export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_QUERY_PARAM = 'lang';

/**
 * Every indexable path on the site.
 *
 * There is one entry today because all three views share `/` — the top-level
 * view is React state, not a route. When routing lands, add the new paths here
 * and both the sitemap and the hreflang set pick them up automatically.
 */
export const SITE_PAGES: { path: string; changefreq: string; priority: string }[] = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
];

/** Facts about the group that no dictionary entry carries. */
export const ORGANISATION = {
  /** Must match `meta.documentTitle` — a mismatched entity name muddies the
   *  signal search engines use to tie the site to the organisation. */
  name: 'Orthodox Holding',
  legalName: 'PT. Orthodox Strategi Finansial',
  email: 'advisory@orthodoxwm.com',
  /** ISO 3166 codes for the cross-border practice described in the footer. */
  areaServed: ['ID', 'AU'],
  sameAs: [
    'https://www.linkedin.com/company/orthodox-holding',
    'https://www.instagram.com/orthodoxholding',
  ],
  divisions: [
    {
      name: 'Orthodox Business Solutions',
      description:
        'Corporate finance, accounting, taxation and strategic advisory for business owners.',
      serviceType: [
        'Corporate tax planning and compliance',
        'Bookkeeping and financial reporting',
        'Corporate structuring',
        'Payroll management',
        'Business valuation',
        'Tax dispute resolution',
      ],
      sameAs: ['https://www.linkedin.com/company/orthodox-holding'],
    },
    {
      name: 'Orthodox Wealth Management',
      description:
        'Private wealth advisory covering investment, insurance, retirement and estate planning.',
      serviceType: [
        'Personal financial planning',
        'Investment planning',
        'Insurance planning',
        'Retirement planning',
        'Estate and legacy planning',
        'Personal tax planning',
      ],
      sameAs: [
        'https://www.linkedin.com/company/orthodox-wealth-management/',
        'https://www.instagram.com/orthodoxwealthmanagement',
      ],
    },
  ],
};

/**
 * Normalises a configured site URL to an origin with no trailing slash, or
 * returns `null` when it is missing or unusable.
 *
 * Returning `null` matters: a canonical or hreflang pointing at the wrong
 * origin is worse than none at all, so every consumer omits the tag rather
 * than guessing a domain.
 */
export const normaliseSiteUrl = (raw: string | undefined | null): string | null => {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.startsWith('MY_')) return null;
  try {
    const url = new URL(trimmed.includes('://') ? trimmed : `https://${trimmed}`);
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') return null;
    return `${url.protocol}//${url.host}`;
  } catch {
    return null;
  }
};

/** Absolute URL for a path in a given language, e.g. `/` + `id` -> `https://host/?lang=id`. */
export const localisedUrl = (siteUrl: string, path: string, language: Language): string => {
  const url = new URL(path, siteUrl);
  if (language !== DEFAULT_LANGUAGE) {
    url.searchParams.set(LANGUAGE_QUERY_PARAM, language);
  }
  return url.toString();
};
