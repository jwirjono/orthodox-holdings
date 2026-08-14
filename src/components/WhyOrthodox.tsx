import React from 'react';
import { CheckCircle2, Link2, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../i18n';

export const WhyOrthodox: React.FC = () => {
  const t = useTranslation();

  return (
    <section id="why-us" className="py-24 bg-[#080808] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-neutral-800">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
            {t.whyOrthodox.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase mb-4">
            {t.whyOrthodox.title}
          </h2>
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-light text-white font-sans">
              {t.whyOrthodox.lead}
            </p>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-2xl">
              {t.whyOrthodox.sub}
            </p>
          </div>
        </div>

        {/* 4 Core Differentiation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.whyOrthodox.points.map((point, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between rounded-xs hover:border-neutral-600 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    {t.whyOrthodox.valuePropositionLabel} // 0{idx + 1}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                  {point.title}
                </h3>

                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {point.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                {t.whyOrthodox.cardFooter}
              </div>
            </div>
          ))}
        </div>

        {/* Ecosystem Synergy Banner */}
        <a
          href="https://orthodoxwm.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 bg-neutral-950 border border-neutral-800 p-8 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6 hover:border-neutral-600 transition-all group block"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 border border-neutral-800 shrink-0 group-hover:border-neutral-500 transition-colors">
              <Link2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                <span>{t.whyOrthodox.banner.title}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-300" />
              </h4>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                {t.whyOrthodox.banner.description}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 shrink-0 uppercase tracking-wider group-hover:bg-emerald-900/80 transition-colors flex items-center gap-1.5">
            <span>orthodoxwm.com</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>

      </div>
    </section>
  );
};
