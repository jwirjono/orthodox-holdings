import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../i18n';

export const IntegratedSystem: React.FC = () => {
  const t = useTranslation();

  return (
    <section id="system" className="py-24 bg-[#0A0A0A] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mt-2">
              {t.integratedSystem.title}
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0">
            {t.integratedSystem.subtitle}
          </p>
        </div>

        {/* Stepped Vertical Process Flow (01 -> 06 pointing down) */}
        <div className="max-w-3xl mx-auto flex flex-col items-center mb-16">
          {t.integratedSystem.steps.map((stepItem, idx) => (
            <React.Fragment key={stepItem.step}>
              {/* Step Card */}
              <div className="w-full p-6 border bg-neutral-900/50 border-neutral-800 text-white hover:border-neutral-600 transition-all duration-300 rounded-xs">
                <div className="flex items-start gap-5">
                  <span className="text-2xl font-light font-mono text-neutral-500 shrink-0 mt-0.5">
                    {stepItem.step}
                  </span>

                  <div className="space-y-1">
                    <h3 className="text-lg font-medium font-sans text-white">
                      {stepItem.name}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed font-light text-neutral-400">
                      {stepItem.detail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vertical Connector Arrow pointing down to the next point */}
              {idx < t.integratedSystem.steps.length - 1 && (
                <div className="flex flex-col items-center my-3 text-neutral-500">
                  <div className="w-px h-4 bg-neutral-800" />
                  <ArrowDown className="w-5 h-5 text-neutral-400 my-1 animate-bounce" />
                  <div className="w-px h-4 bg-neutral-800" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Summary Narrative Banner */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 lg:p-10 rounded-xs grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-light text-white leading-snug">
              {t.integratedSystem.bannerTitle}
            </h3>
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              {t.integratedSystem.bannerBody}
            </p>
          </div>

          <div className="border-l border-neutral-800 pl-6 md:pl-8 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              {t.integratedSystem.continuityLabel}
            </div>
            <p className="text-sm text-neutral-200 font-light leading-relaxed italic font-serif">
              {t.integratedSystem.continuityQuote}
            </p>
            <a
              href="https://orthodoxwm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:underline pt-2"
            >
              <span>{t.integratedSystem.exploreLink}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
