import React from 'react';
import { ArrowRight } from 'lucide-react';
import AssetImage02 from '../assets/images/Imagery-02.png';
import { useTranslation } from '../i18n';

interface HeroSectionProps {
  onOpenConsultation: (msg?: string) => void;
  onOpenDashboard?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  const t = useTranslation();

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between pt-28 pb-12 overflow-hidden border-b border-neutral-800">
      {/* Background Architectural Backdrop with High Contrast Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity pointer-events-none">
        <img
          src={AssetImage02}
          alt={t.hero.imageAlt}
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        {/* Hero Headline & Copy */}
        <div className="max-w-5xl space-y-6">
          <h1 className="text-5xl sm:text-7xl lg:text-[80px] font-semibold tracking-[-0.03em] leading-[0.95] text-white">
            {t.hero.headlineLine1}<br />
            <span className="text-neutral-300 font-light">{t.hero.headlineLine2}</span>
          </h1>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-snug text-neutral-200">
            {t.hero.heading}
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-3xl tracking-wide">
            {t.hero.paragraph1}
          </p>

          <div className="pt-2 grid md:grid-cols-2 gap-6 text-sm text-neutral-400 leading-relaxed font-light border-t border-neutral-800/80 pt-6">
            <p className="text-neutral-300">
              {t.hero.paragraph2}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-md group rounded-xs"
            >
              <span>{t.common.requestConsultation}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Trust Indicators Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-neutral-800/80 pt-8 mt-8">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4">
          {t.hero.trustIndicatorsLabel}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {t.hero.trustIndicators.map((item, idx) => (
            <div key={idx} className="border-l border-neutral-800 pl-4 py-1">
              <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-sans">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm text-neutral-400 font-light mt-0.5">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
