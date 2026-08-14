import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { en, type Dictionary } from './locales/en';
import { id } from './locales/id';

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

const detectInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'id') return stored;

  const browserLang = window.navigator.language?.toLowerCase() ?? '';
  return browserLang.startsWith('id') ? 'id' : 'en';
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

  // Keep the document in sync with the active language for a11y and SEO.
  useEffect(() => {
    document.documentElement.lang = t.meta.htmlLang;
    document.title = t.meta.documentTitle;
  }, [t]);

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
