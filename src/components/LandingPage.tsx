import React from 'react';
import { ArrowRight, ArrowUpRight, HelpCircle, CheckCircle2, Building2, UserCheck, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onExploreBusiness: () => void;
  onOpenConsultation?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onExploreBusiness, onOpenConsultation }) => {
  const personalChallenges = [
    'Paying more tax than necessary?',
    'Unsure where or how to invest your money?',
    'Feeling underinsured or overpaying for insurance?',
    'Managing multiple debts without a clear strategy?',
    'Worried your wealth won\'t transfer smoothly to the next generation?',
    'Concerned your assets could be exposed to lawsuits or business risks?',
    'Unsure whether your personal finances and business finances are properly aligned?',
    'Wondering if you\'re really on track for financial independence?',
  ];

  const businessChallenges = [
    'Cash flow problems despite growing sales?',
    'High tax burden due to inefficient business structure?',
    'Financial reports that don\'t support strategic decisions?',
    'Difficulty obtaining bank financing or investor funding?',
    'Poor budgeting and inaccurate financial forecasting?',
    'Business operations that lack proper financial controls?',
    'Multiple financial, tax, and compliance issues with no integrated solution?',
    'Unsure how to scale your business sustainably?',
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans antialiased">
      {/* SECTION 1: HERO & TAGLINE */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 border-b border-neutral-800 bg-gradient-to-b from-neutral-950 via-[#0A0A0A] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Eyebrow */}

            {/* Main Tagline Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.15] mb-8 font-sans">
              Comprehensive and integrated strategies for sustainable success
            </h1>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-10 max-w-3xl">
              At Orthodox Holding, we believe that sustainable success is achieved through comprehensive and integrated strategies. We unite personal financial planning and business financial solutions into one connected ecosystem, ensuring every financial decision—from business growth and governance to investments, taxation, insurance, estate planning, and asset protection—works together toward a common objective. Built on time-tested orthodox principles, we help individuals, families, and business owners create sustainable growth, preserve lasting prosperity, and build enduring legacies across generations.
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreBusiness}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-black font-medium text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all rounded-xs shadow-md group"
              >
                <span>Orthodox Business Solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="https://orthodoxwm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-neutral-600 font-medium text-xs uppercase tracking-widest hover:text-white transition-all rounded-xs"
              >
                <span>Orthodox Wealth Management</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPARATIVE CHALLENGES (WITH VERTICAL DIVIDER) */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
              Diagnostic Assessment
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-2">
              Identify Your Primary Financial Objectives
            </h2>
          </div>

          {/* Grid with Vertical Divider */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border border-neutral-800 bg-neutral-950/50 rounded-xs divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
            
            {/* LEFT COLUMN: Personal Financial Challenges */}
            <div className="p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                      Private Advisory
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-white font-sans tracking-tight">
                      Facing These Personal Financial Challenges?
                    </h3>
                  </div>
                </div>

                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6 pb-3 border-b border-neutral-800">
                  Are you experiencing...
                </p>

                <ul className="space-y-4 mb-10">
                  {personalChallenges.map((challenge, idx) => (
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
                  Looking for a comprehensive solution?
                </p>
                <a
                  href="https://orthodoxwm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-neutral-900 hover:bg-white text-neutral-200 hover:text-black border border-neutral-700 hover:border-white font-medium text-xs uppercase tracking-widest transition-all flex items-center justify-between group rounded-xs"
                >
                  <span>Explore Orthodox Wealth Management</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Business Challenges */}
            <div className="p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                      Corporate Advisory
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-white font-sans tracking-tight">
                      Facing These Business Challenges?
                    </h3>
                  </div>
                </div>

                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6 pb-3 border-b border-neutral-800">
                  Is your business experiencing...
                </p>

                <ul className="space-y-4 mb-10">
                  {businessChallenges.map((challenge, idx) => (
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
                  Looking for a comprehensive solution?
                </p>
                <button
                  onClick={onExploreBusiness}
                  className="w-full py-3.5 px-5 bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-between group rounded-xs shadow-sm"
                >
                  <span>Explore Orthodox Business Solutions</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
