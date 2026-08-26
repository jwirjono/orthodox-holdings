import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';
import {en} from './src/i18n/locales/en';
import {LOCALES, ORGANISATION, normaliseSiteUrl, localisedUrl} from './src/seo/siteConfig';
import {buildRobotsTxt, buildSitemap, buildStructuredData} from './src/seo/structuredData';

/**
 * Writes the parts of the head that must exist in the served HTML rather than
 * being added by React, plus `robots.txt` and `sitemap.xml`.
 *
 * Everything absolute is derived from `VITE_SITE_URL`. When it is unset the
 * URL-bearing tags and the sitemap are skipped and the build warns, because a
 * canonical or hreflang pointing at the wrong origin is worse than none.
 */
const seoAssets = (): Plugin => {
  let siteUrl: string | null = null;

  return {
    name: 'orthodox-seo-assets',

    configResolved() {
      siteUrl = normaliseSiteUrl(process.env.VITE_SITE_URL);
      if (!siteUrl) {
        console.warn(
          '\n[seo] VITE_SITE_URL is not set — canonical, hreflang, Open Graph URLs, JSON-LD and\n' +
            '      sitemap.xml are omitted from this build. Set it in .env.local and in the\n' +
            '      Vercel project settings, e.g. VITE_SITE_URL="https://orthodoxholdings.com"\n'
        );
      }
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const languages = Object.keys(LOCALES) as (keyof typeof LOCALES)[];
        const tags: string[] = [
          `<meta name="description" content="${en.meta.description}">`,
          '<meta name="robots" content="index,follow,max-image-preview:large">',
          `<meta property="og:type" content="website">`,
          `<meta property="og:site_name" content="${ORGANISATION.name}">`,
          `<meta property="og:title" content="${en.meta.ogTitle}">`,
          `<meta property="og:description" content="${en.meta.description}">`,
          `<meta property="og:locale" content="${LOCALES.en.ogLocale}">`,
          `<meta property="og:locale:alternate" content="${LOCALES.id.ogLocale}">`,
          '<meta name="twitter:card" content="summary_large_image">',
          `<meta name="twitter:title" content="${en.meta.ogTitle}">`,
          `<meta name="twitter:description" content="${en.meta.description}">`,
        ];

        if (siteUrl) {
          tags.push(
            `<link rel="canonical" href="${localisedUrl(siteUrl, '/', 'en')}">`,
            `<meta property="og:url" content="${localisedUrl(siteUrl, '/', 'en')}">`,
            // Dimensions let the scraper lay out the card before the file lands.
            `<meta property="og:image" content="${siteUrl}/og-cover.jpg">`,
            '<meta property="og:image:width" content="1200">',
            '<meta property="og:image:height" content="630">',
            `<meta property="og:image:alt" content="${en.meta.ogImageAlt}">`,
            `<meta name="twitter:image" content="${siteUrl}/og-cover.jpg">`,
            `<meta name="twitter:image:alt" content="${en.meta.ogImageAlt}">`,
            ...languages.map(
              (code) =>
                `<link rel="alternate" hreflang="${LOCALES[code].hreflang}" href="${localisedUrl(siteUrl!, '/', code)}">`
            ),
            `<link rel="alternate" hreflang="x-default" href="${localisedUrl(siteUrl, '/', 'en')}">`,
            `<script type="application/ld+json">${JSON.stringify(buildStructuredData(siteUrl))}</script>`
          );
        }

        return html.replace(/[ \t]*<\/head>/, `    ${tags.join('\n    ')}\n  </head>`);
      },
    },

    /**
     * Serves the same two files during `npm run dev`. Without this the SPA
     * fallback answers /robots.txt with index.html and a 200, which looks like
     * a pass but is not one — so they would only ever be testable after a build.
     */
    configureServer(server) {
      server.middlewares.use('/robots.txt', (_req, res) => {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(buildRobotsTxt(siteUrl));
      });

      server.middlewares.use('/sitemap.xml', (_req, res) => {
        if (!siteUrl) {
          res.statusCode = 404;
          res.end('sitemap.xml is not generated because VITE_SITE_URL is unset.');
          return;
        }
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.end(buildSitemap(siteUrl, Object.keys(LOCALES) as (keyof typeof LOCALES)[]));
      });
    },

    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: buildRobotsTxt(siteUrl),
      });

      if (siteUrl) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: buildSitemap(siteUrl, Object.keys(LOCALES) as (keyof typeof LOCALES)[]),
        });
      }
    },
  };
};

/**
 * Serves POST /api/contact during `npm run dev` so the Orthodox Wealth
 * Management consultation form works locally. In production the same logic runs
 * as the serverless function in `api/contact.ts`.
 */
const contactApiDevServer = (): Plugin => ({
  name: 'orthodox-contact-api',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/contact', (req, res, next) => {
      if (req.method !== 'POST') return next();

      let raw = '';
      req.on('data', (chunk) => {
        raw += chunk;
      });
      req.on('end', async () => {
        res.setHeader('Content-Type', 'application/json');
        try {
          const {sendContactEnquiry} = await server.ssrLoadModule('/api/contact.ts');
          await sendContactEnquiry(JSON.parse(raw || '{}'));
          res.statusCode = 200;
          res.end(JSON.stringify({message: 'Inquiry sent successfully'}));
        } catch (error) {
          console.error(error);
          res.statusCode = 500;
          res.end(JSON.stringify({message: 'Failed to send inquiry'}));
        }
      });
    });
  },
});

export default defineConfig(({mode}) => {
  // Vite only exposes VITE_-prefixed variables to the client. The contact
  // middleware runs in this Node process, so read the unprefixed EMAIL_*
  // credentials from .env.local into process.env. These are never bundled.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), tailwindcss(), contactApiDevServer(), seoAssets()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
