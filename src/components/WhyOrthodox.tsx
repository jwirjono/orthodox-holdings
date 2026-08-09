import React from 'react';
import { WHY_ORTHODOX_POINTS } from '../data/orthodoxData';
import { CheckCircle2, ShieldCheck, Link2, Sparkles } from 'lucide-react';

export const WhyOrthodox: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-[#080808] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-neutral-800">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
            The Orthodox Distinction
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase mb-4">
            WHY ORTHODOX?
          </h2>
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl font-light text-white font-sans">
              More Than Tax. More Than Accounting.
            </p>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-2xl">
              We connect every business decision into one integrated strategy.
            </p>
          </div>
        </div>

        {/* 4 Core Differentiation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WHY_ORTHODOX_POINTS.map((point, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between rounded-xs hover:border-neutral-600 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    VALUE PROPOSITION // 0{idx + 1}
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
                Orthodox Standard Architecture
              </div>
            </div>
          ))}
        </div>

        {/* Ecosystem Synergy Banner */}
        <div className="mt-12 bg-neutral-950 border border-neutral-800 p-8 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 border border-neutral-800 shrink-0">
              <Link2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">
                Unified Business & Personal Wealth Ecosystem
              </h4>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                Connecting Orthodox Business Solutions with Orthodox Wealth Management for seamless enterprise transition.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 shrink-0 uppercase tracking-wider">
            Orthodox Holding Ecosystem
          </span>
        </div>

      </div>
    </section>
  );
};

