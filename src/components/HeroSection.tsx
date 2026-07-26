import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, Layers, ChevronDown } from 'lucide-react';
import { HERO_DATA } from '../data/orthodoxData';
import heroArchitectImg from '../assets/images/hero_architect_bw_1784984866276.jpg';

interface HeroSectionProps {
  onOpenConsultation: (msg?: string) => void;
  onOpenDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onOpenDashboard,
}) => {
  return (
    <section className="relative min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between pt-28 pb-12 overflow-hidden border-b border-neutral-800">
      {/* Background Architectural Backdrop with High Contrast Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity pointer-events-none">
        <img
          src={heroArchitectImg}
          alt="Orthodox Holdings Architecture"
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        {/* Hero Headline & Copy */}
        <div className="max-w-5xl space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-semibold tracking-[-0.03em] leading-[0.95] text-white">
            Integrated Solutions. Sustainable Growth.
          </h1>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-snug text-neutral-200">
            Business success is <span className="font-semibold underline decoration-neutral-600 decoration-1 underline-offset-8">never</span> created by accounting, tax, or strategy alone.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-3xl tracking-wide">
            It is built when <strong className="text-white font-semibold">finance, taxation, operations, governance, funding,</strong> and <strong className="text-white font-semibold">ownership structures</strong> work together as one integrated business system.
          </p>

          <div className="pt-2 grid md:grid-cols-2 gap-6 text-sm text-neutral-400 leading-relaxed font-light border-t border-neutral-800/80 pt-6">
            <p>
              {HERO_DATA.paragraph1}
            </p>
            <p className="border-l border-neutral-800 pl-4 md:pl-6">
              {HERO_DATA.paragraph2}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-md group"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenDashboard}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-neutral-900 border border-neutral-700 text-white font-medium text-xs uppercase tracking-widest hover:bg-neutral-800 hover:border-neutral-500 transition-all"
            >
              <span>Client Portfolio Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust Indicators Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-neutral-800/80 pt-8 mt-8">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4">
          Trust Indicators & Track Record
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {HERO_DATA.trustIndicators.map((item, idx) => (
            <div key={idx} className="border-l border-neutral-800 pl-4 py-1">
              <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-sans">
                {item.value}
              </div>
              <div className="text-xs text-neutral-400 font-light mt-0.5">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
