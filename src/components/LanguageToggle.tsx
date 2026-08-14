import React from 'react';
import { Globe } from 'lucide-react';
import { LANGUAGES, useLanguage, type Language } from '../i18n';

interface LanguageToggleProps {
  /** `compact` for the header bar, `full` for the mobile menu overlay. */
  variant?: 'compact' | 'full';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { language, setLanguage, t } = useLanguage();

  const shortLabel = (lang: Language) => (lang === 'en' ? t.language.enShort : t.language.idShort);
  const fullLabel = (lang: Language) => (lang === 'en' ? t.language.en : t.language.id);

  if (variant === 'full') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          {t.language.label}
        </span>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              aria-pressed={language === lang}
              className={`py-2.5 px-3 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between gap-2 ${
                language === lang
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-300 bg-neutral-900 border border-neutral-800 hover:text-white'
              }`}
            >
              <span className="truncate">{fullLabel(lang)}</span>
              {language === lang && <span className="text-[10px] shrink-0">✓</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-1 bg-neutral-900/90 border border-neutral-800 p-1 sm:p-1.5 rounded-xs ${className}`}
      role="group"
      aria-label={t.language.label}
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          title={fullLabel(lang)}
          className={`px-2 sm:px-2.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all rounded-xs ${
            language === lang
              ? 'bg-white text-black font-semibold shadow-xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          {shortLabel(lang)}
        </button>
      ))}
    </div>
  );
};
