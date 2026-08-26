/**
 * Builds the schema.org graph describing the group, its two member entities and
 * its named advisors.
 *
 * The graph is injected into `index.html` at build time (see `vite.config.ts`)
 * rather than rendered by React, so it sits in the raw HTML where every crawler
 * can read it without executing JavaScript.
 */
import { en } from '../i18n/locales/en';
import { LOCALES, ORGANISATION, SITE_PAGES, localisedUrl } from './siteConfig';
import type { Language } from '../i18n';

/**
 * Splits a display name like `Adriel Reynaldo Louis, B.Bus, MBA, CFP®, CTM`
 * into the person's name and their post-nominal credentials, which schema.org
 * models as `honorificSuffix`.
 */
const splitCredentials = (displayName: string): { name: string; suffixes: string[] } => {
  const [name, ...suffixes] = displayName.split(',').map((part) => part.trim());
  return { name, suffixes: suffixes.filter(Boolean) };
};

export const buildStructuredData = (siteUrl: string) => {
  const home = localisedUrl(siteUrl, '/', 'en');
  const orgId = `${siteUrl}/#organisation`;

  const people = en.whoWeAre.profiles.map((profile) => {
    const { name, suffixes } = splitCredentials(profile.name);
    return {
      '@type': 'Person',
      '@id': `${siteUrl}/#${profile.id}`,
      name,
      ...(suffixes.length ? { honorificSuffix: suffixes.join(', ') } : {}),
      jobTitle: profile.title,
      description: profile.role,
      knowsAbout: profile.highlights,
      worksFor: { '@id': orgId },
    };
  });

  const divisions = ORGANISATION.divisions.map((division) => ({
    '@type': 'FinancialService',
    '@id': `${siteUrl}/#${division.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: division.name,
    description: division.description,
    url: home,
    parentOrganization: { '@id': orgId },
    areaServed: ORGANISATION.areaServed.map((code) => ({ '@type': 'Country', name: code })),
    serviceType: division.serviceType,
    sameAs: division.sameAs,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: ORGANISATION.name,
        legalName: ORGANISATION.legalName,
        description: en.landing.heroParagraph,
        url: home,
        logo: `${siteUrl}/apple-touch-icon.png`,
        email: ORGANISATION.email,
        areaServed: ORGANISATION.areaServed.map((code) => ({ '@type': 'Country', name: code })),
        sameAs: ORGANISATION.sameAs,
        knowsLanguage: Object.values(LOCALES).map((locale) => locale.htmlLang),
        subOrganization: divisions.map((division) => ({ '@id': division['@id'] })),
        employee: people.map((person) => ({ '@id': person['@id'] })),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Client advisory',
          email: ORGANISATION.email,
          areaServed: ORGANISATION.areaServed,
          availableLanguage: Object.values(LOCALES).map((locale) => locale.label),
        },
      },
      ...divisions,
      ...people,
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: home,
        name: ORGANISATION.name,
        description: en.meta.description,
        publisher: { '@id': orgId },
        inLanguage: Object.values(LOCALES).map((locale) => locale.htmlLang),
      },
    ],
  };
};

/**
 * `<urlset>` for every page in every language, with `xhtml:link` alternates —
 * the form Google recommends for declaring hreflang from a sitemap.
 */
export const buildSitemap = (siteUrl: string, languages: Language[]): string => {
  const lastmod = new Date().toISOString().slice(0, 10);

  /** Sitemap URLs are XML text: a bare `&` between query parameters is invalid. */
  const xml = (value: string): string =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const entries = SITE_PAGES.flatMap((page) =>
    languages.map((language) => {
      const alternates = languages
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${LOCALES[alt].hreflang}" href="${xml(localisedUrl(siteUrl, page.path, alt))}"/>`
        )
        .concat(
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${xml(localisedUrl(siteUrl, page.path, 'en'))}"/>`
        )
        .join('\n');

      return [
        '  <url>',
        `    <loc>${xml(localisedUrl(siteUrl, page.path, language))}</loc>`,
        alternates,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
};

/** `robots.txt` — the API routes are the only thing worth keeping out of the index. */
export const buildRobotsTxt = (siteUrl: string | null): string =>
  [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    ...(siteUrl ? [`Sitemap: ${siteUrl}/sitemap.xml`, ''] : []),
  ].join('\n');
