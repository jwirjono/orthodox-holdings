import React from 'react';
import { WHY_ORTHODOX_POINTS } from '../data/orthodoxData';
import { Shield, Layers, CheckCircle2, TrendingUp, Users, Compass, ArrowUpRight } from 'lucide-react';

export const WhyOrthodox: React.FC = () => {
  return (
    <section className="py-24 bg-[#080808] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mt-2">
              Why Orthodox
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0">
            More Than Professional Services. An Integrated Business Ecosystem.
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 sm:p-10 mb-12 rounded-xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              The Orthodox Advantage
            </span>
            <h3 className="text-2xl font-light text-white">
              One Stop Business & Wealth Solution
            </h3>
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              Finance. Accounting. Tax. Payroll. Business Strategy. Funding Recommendation. Corporate Structuring. Governance. <strong className="text-white font-semibold">All working together.</strong>
            </p>
          </div>

          <div className="shrink-0 bg-neutral-950 p-6 border border-neutral-800 text-center">
            <span className="text-3xl font-semibold text-white font-sans block">100%</span>
            <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider block mt-1">
              Coordinated Strategy
            </span>
          </div>
        </div>

        {/* 6 Core Differentiation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_ORTHODOX_POINTS.map((point, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/40 border border-neutral-800 p-8 flex flex-col justify-between hover:bg-neutral-900/80 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-neutral-500">0{idx + 1}</span>
                  <CheckCircle2 className="w-4 h-4 text-neutral-400" />
                </div>

                <h4 className="text-xl font-medium text-white font-sans mb-3">
                  {point.title}
                </h4>

                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {point.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800/80 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                Orthodox Standard
              </div>
            </div>
          ))}
        </div>

        {/* Sustainable Growth Banner */}
        <div className="mt-12 text-center p-8 bg-neutral-950 border border-neutral-800">
          <p className="text-lg font-light text-neutral-200">
            "Businesses should become more valuable, more resilient, and easier to manage—not more complicated."
          </p>
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest mt-2 block">
            — Orthodox Holdings Advisory Manifesto
          </span>
        </div>
      </div>
    </section>
  );
};
