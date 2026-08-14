import React from 'react';
import { ArrowRight, ArrowUpRight, HelpCircle, Building2, UserCheck } from 'lucide-react';
import heroArchitectImg from '../assets/images/hero_architect_bw_1784984866276.jpg';
import { useTranslation } from '../i18n';

interface LandingPageProps {
  onExploreBusiness: () => void;
  onOpenConsultation?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onExploreBusiness }) => {
  const t = useTranslation();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans antialiased">
      {/* SECTION 1: HERO & TAGLINE */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 border-b border-neutral-800 overflow-hidden bg-[#0A0A0A]">
        {/* Subtle Architectural Background Image */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity pointer-events-none">
          <img
            src={heroArchitectImg}
            alt={t.hero.imageAlt}
            className="w-full h-full object-cover object-center filter grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="max-w-4xl">
            {/* Main Tagline Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.12] mb-8 font-sans">
              {t.landing.heroTitle}
            </h1>

            {/* Descriptive Body */}
            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl">
              {t.landing.heroParagraph}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPARATIVE CHALLENGES (WITH VERTICAL DIVIDER) */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
              {t.landing.nextStepEyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-2">
              {t.landing.nextStepTitle}
            </h2>
          </div>

          {/* Mobile View: Compact Side-by-Side Cards (hidden on md and larger) */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {/* Business Column Card */}
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xs flex flex-col justify-between h-full">
              <div>
                <div className="w-8 h-8 bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 block">
                  {t.landing.business.eyebrowMobile}
                </span>
                <h3 className="text-xs font-medium text-white font-sans tracking-tight mt-1 mb-4 leading-snug">
                  {t.landing.business.title}
                </h3>
              </div>

              <button
                onClick={onExploreBusiness}
                className="w-full py-2.5 px-2 bg-white hover:bg-neutral-200 text-black font-semibold text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 rounded-xs shadow-xs group"
              >
                <span>{t.landing.business.ctaMobile}</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 shrink-0" />
              </button>
            </div>

            {/* Personal Column Card */}
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xs flex flex-col justify-between h-full">
              <div>
                <div className="w-8 h-8 bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                  <UserCheck className="w-4 h-4 text-white" />
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 block">
                  {t.landing.personal.eyebrowMobile}
                </span>
                <h3 className="text-xs font-medium text-white font-sans tracking-tight mt-1 mb-4 leading-snug">
                  {t.landing.personal.title}
                </h3>
              </div>

              <a
                href="https://orthodoxwm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-2 bg-neutral-900 hover:bg-white text-neutral-200 hover:text-black border border-neutral-700 hover:border-white font-medium text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 rounded-xs group"
              >
                <span>{t.landing.personal.ctaMobile}</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-black shrink-0" />
              </a>
            </div>
          </div>

          {/* Desktop/Tablet View: Detailed Comparative Grid (hidden on mobile) */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 border border-neutral-800 bg-neutral-950/50 rounded-xs divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">

            {/* LEFT COLUMN: Business Challenges */}
            <div className="p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                      {t.landing.business.eyebrowDesktop}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-white font-sans tracking-tight">
                      {t.landing.business.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6 pb-3 border-b border-neutral-800">
                  {t.landing.business.prompt}
                </p>

                <ul className="space-y-4 mb-10">
                  {t.landing.business.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <HelpCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-300 font-light leading-snug">
                        {challenge}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Navigation CTA */}
              <div className="pt-6 border-t border-neutral-800 bg-neutral-900/40 -mx-8 -mb-8 p-8 sm:-mx-12 sm:-mb-12 sm:p-12">
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  {t.landing.lookingForSolution}
                </p>
                <button
                  onClick={onExploreBusiness}
                  className="w-full py-3.5 px-5 bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-between group rounded-xs shadow-sm"
                >
                  <span>{t.landing.business.ctaDesktop}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Personal Financial Challenges */}
            <div className="p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                      {t.landing.personal.eyebrowDesktop}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-white font-sans tracking-tight">
                      {t.landing.personal.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6 pb-3 border-b border-neutral-800">
                  {t.landing.personal.prompt}
                </p>

                <ul className="space-y-4 mb-10">
                  {t.landing.personal.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <HelpCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-300 font-light leading-snug">
                        {challenge}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Navigation CTA */}
              <div className="pt-6 border-t border-neutral-800 bg-neutral-900/40 -mx-8 -mb-8 p-8 sm:-mx-12 sm:-mb-12 sm:p-12">
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  {t.landing.lookingForSolution}
                </p>
                <a
                  href="https://orthodoxwm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-neutral-900 hover:bg-white text-neutral-200 hover:text-black border border-neutral-700 hover:border-white font-medium text-xs uppercase tracking-widest transition-all flex items-center justify-between group rounded-xs"
                >
                  <span>{t.landing.personal.ctaDesktop}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
