import React from 'react';
import {
  ArrowDown,
  Building2,
  Calculator,
  Receipt,
  TrendingUp,
  LineChart,
  ShieldCheck,
  Briefcase,
  Shield,
  Landmark,
  Lock,
} from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const flowItems = [
    { name: 'Business', isBridge: false, isWealth: false, num: '01', icon: Building2 },
    { name: 'Accounting', isBridge: false, isWealth: false, num: '02', icon: Calculator },
    { name: 'Tax', isBridge: false, isWealth: false, num: '03', icon: Receipt },
    { name: 'Finance', isBridge: false, isWealth: false, num: '04', icon: LineChart },
    { name: 'Growth', isBridge: false, isWealth: false, num: '05', icon: TrendingUp },
    { name: 'Orthodox Wealth Management', isBridge: true, isWealth: false, num: '06', icon: ShieldCheck, url: 'https://orthodoxwm.com/' },
    { name: 'Investment', isBridge: false, isWealth: true, num: '07', icon: Briefcase },
    { name: 'Insurance', isBridge: false, isWealth: true, num: '08', icon: Shield },
    { name: 'Estate Planning', isBridge: false, isWealth: true, num: '09', icon: Landmark },
    { name: 'Asset Protection', isBridge: false, isWealth: true, num: '10', icon: Lock },
  ];

  return (
    <section id="ecosystem" className="py-24 bg-[#080808] text-white border-b border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-3">
            HOW IT SHOULD WORK
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase font-sans">
            ONE BUSINESS. ONE ECOSYSTEM.
          </h2>
        </div>

        {/* Enhanced Simplified Flow Diagram */}
        <div className="max-w-lg mx-auto flex flex-col items-center mb-16 space-y-0">
          {flowItems.map((item, index) => {
            const Icon = item.icon;
            const cardContent = (
              <>
                <div className="flex items-center gap-3.5">
                  <span
                    className={`text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-xs border ${
                      item.isBridge
                        ? 'bg-black text-white border-black'
                        : item.isWealth
                        ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    {item.num}
                  </span>
                  <span
                    className={`text-sm sm:text-base font-semibold uppercase tracking-wider ${
                      item.isBridge ? 'text-black font-extrabold' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      item.isBridge
                        ? 'text-black'
                        : item.isWealth
                        ? 'text-emerald-400'
                        : 'text-neutral-400'
                    }`}
                  />
                </div>
              </>
            );

            const cardClasses = `w-full py-4 px-6 rounded-xs transition-all duration-300 flex items-center justify-between gap-4 group ${
              item.isBridge
                ? 'bg-white text-black font-bold shadow-[0_0_25px_rgba(255,255,255,0.15)] my-2 border border-white transform hover:-translate-y-0.5'
                : item.isWealth
                ? 'bg-neutral-950 text-emerald-200 border border-emerald-900/60 hover:border-emerald-500 hover:bg-neutral-900/80 shadow-sm'
                : 'bg-neutral-950 text-neutral-200 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/60 shadow-sm'
            }`;

            return (
              <React.Fragment key={index}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClasses}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className={cardClasses}>
                    {cardContent}
                  </div>
                )}

                {index < flowItems.length - 1 && (
                  <div className="py-2 flex flex-col items-center justify-center">
                    <div
                      className={`w-px h-3 ${
                        item.isBridge
                          ? 'bg-gradient-to-b from-white to-emerald-500'
                          : item.isWealth
                          ? 'bg-emerald-800/60'
                          : 'bg-neutral-700'
                      }`}
                    />
                    <ArrowDown
                      className={`w-4 h-4 my-0.5 ${
                        item.isBridge
                          ? 'text-emerald-400 animate-pulse'
                          : item.isWealth
                          ? 'text-emerald-500/80'
                          : 'text-neutral-500'
                      }`}
                    />
                    <div
                      className={`w-px h-3 ${
                        item.isBridge
                          ? 'bg-emerald-500'
                          : item.isWealth
                          ? 'bg-emerald-800/60'
                          : 'bg-neutral-700'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Ecosystem Summary */}
        <div className="max-w-2xl mx-auto pt-8 border-t border-neutral-800/80">
          <p className="text-xl sm:text-2xl font-light text-white leading-snug font-sans mb-3">
            Business owners don't need separate advisors.
          </p>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            They need one ecosystem where business growth naturally leads to long-term personal wealth.
          </p>
        </div>
      </div>
    </section>
  );
};


