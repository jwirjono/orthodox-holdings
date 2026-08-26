import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { en, type Dictionary } from './locales/en';
import { id } from './locales/id';
import { DEFAULT_LANGUAGE, LANGUAGE_QUERY_PARAM } from '../seo/siteConfig';

export type Language = 'en' | 'id';

export const LANGUAGES: Language[] = ['en', 'id'];

const DICTIONARIES: Record<Language, Dictionary> = { en, id };

const STORAGE_KEY = 'orthodox-language';

/**
 * Replaces {placeholder} tokens in a translated string.
 * format('Phase {number}', { number: '01' }) -> 'Phase 01'
 */
export const format = (
  template: string,
  vars: Record<string, string | number>
): string => template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));

const isLanguage = (value: string | null): value is Language => value === 'en' || value === 'id';

/**
 * Resolution order: the `?lang` query parameter, then a stored preference, then
 * the browser's own language.
 *
 * The query parameter wins so that each language has a URL that can be linked,
 * crawled and declared via hreflang. A visitor's stored preference must never
 * override an explicit link — that is what makes the Indonesian version
 * shareable and indexable rather than a per-browser toggle.
 */
const detectInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const fromUrl = new URLSearchParams(window.location.search).get(LANGUAGE_QUERY_PARAM);
  if (isLanguage(fromUrl)) return fromUrl;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLanguage(stored)) return stored;

  const browserLang = window.navigator.language?.toLowerCase() ?? '';
  return browserLang.startsWith('id') ? 'id' : DEFAULT_LANGUAGE;
};

/**
 * Keeps the address bar in step with the active language without adding a
 * history entry — the default language drops the parameter so `/` stays the
 * canonical English URL.
 */
const syncLanguageToUrl = (language: Language): void => {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  if (language === DEFAULT_LANGUAGE) {
    url.searchParams.delete(LANGUAGE_QUERY_PARAM);
  } else {
    url.searchParams.set(LANGUAGE_QUERY_PARAM, language);
  }

  if (url.toString() !== window.location.href) {
    window.history.replaceState(window.history.state, '', url);
  }
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  /** The active dictionary — access strings as `t.hero.heading`. */
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);

  const t = DICTIONARIES[language];

  // Keep the document and the address bar in sync with the active language, for
  // a11y and so the language always has a URL. `SeoHead` handles the rest of the
  // head (canonical, hreflang, Open Graph).
  useEffect(() => {
    document.documentElement.lang = t.meta.htmlLang;
    document.title = t.meta.documentTitle;
    syncLanguageToUrl(language);
  }, [t, language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode / blocked cookies) — language still applies for this session.
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'id' : 'en');
  }, [language, setLanguage]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, setLanguage, toggleLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>');
  }
  return ctx;
};

/** Convenience hook when only the dictionary is needed. */
export const useTranslation = (): Dictionary => useLanguage().t;

export type { Dictionary };
