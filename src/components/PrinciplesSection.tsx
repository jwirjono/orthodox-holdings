import React from 'react';
import { PRINCIPLES } from '../data/orthodoxData';

export const PrinciplesSection: React.FC = () => {
  return (
    <section id="principles" className="py-24 bg-[#0A0A0A] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mt-2">
              Our Principles
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0">
            The Orthodox Principles guiding every advisory mandate.
          </p>
        </div>

        {/* 6 Principles Grid - BlackRock Minimalist Aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRINCIPLES.map((item) => (
            <div
              key={item.number}
              className="bg-neutral-900/40 border border-neutral-800 p-8 flex flex-col justify-between hover:border-neutral-600 transition-all group"
            >
              <div>
                <span className="text-3xl font-light font-mono text-neutral-600 group-hover:text-white transition-colors block mb-4">
                  {item.number}
                </span>

                <h3 className="text-2xl font-light text-white font-sans leading-tight mb-4">
                  <strong className="font-semibold">{item.lead}</strong>{' '}
                  <span className="italic font-normal text-neutral-400">{item.sub}.</span>
                </h3>

                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Orthodox Immutable Principle
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
