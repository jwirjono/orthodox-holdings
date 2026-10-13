<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e7801218-f4b9-45b7-8a13-5c618fd9add9

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Site structure

The app is a single-page site with three top-level views, switched from the
header toggle (see `src/navigation.tsx`):

| View | Component | Notes |
| --- | --- | --- |
| `holding` | `src/components/LandingPage.tsx` | Orthodox Holdings landing page |
| `business` | sections in `src/App.tsx` | Orthodox Business Solutions |
| `wealth` | `src/components/wealth/` | Orthodox Wealth Management |

All three views live in this repo and navigate in-app — there is no separate
Wealth Management site or outbound link to one.

## Translations

All copy lives in `src/i18n/locales/en.ts` and `src/i18n/locales/id.ts`
(`id.ts` is typed against `en.ts`, so both stay in sync). Read strings with the
`useTranslation()` hook. The Wealth Management page uses the `wealth.*` keys.

## Contact form

Both consultation forms post to `POST /api/contact`, implemented in
[api/contact.ts](api/contact.ts) and served during `npm run dev` by a Vite
middleware in [vite.config.ts](vite.config.ts). One Gmail account sends every
enquiry (`SMTP_USER`, with its App Password in `SMTP_PASS`), and each form
delivers to its own inbox:

| Form | Inbox |
| --- | --- |
| Main site consultation (Orthodox Business Solutions) | `BUSINESS_SMTP_TO` |
| Orthodox Wealth Management | `WEALTH_SMTP_TO` |

`SMTP_HOST` and `SMTP_PORT` default to `smtp.gmail.com:587`; `SMTP_FROM`
defaults to `SMTP_USER`. Set them in `.env.local` (see [.env.example](.env.example))
and in Vercel; a form whose settings are missing reports a send failure.
