import React, { useState } from 'react';
import { EXPERTISE_SERVICES } from '../data/orthodoxData';

interface ExpertiseSectionProps {
  onOpenConsultation: (msg?: string) => void;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Disciplines' },
    { id: 'business', name: 'Finance & Accounting' },
    { id: 'tax', name: 'Tax & Dispute' },
    { id: 'structure', name: 'Corporate Structuring' },
    { id: 'advisory', name: 'Valuation & Strategy' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? EXPERTISE_SERVICES
      : EXPERTISE_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="expertise" className="py-24 bg-[#0A0A0A] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 pb-8 border-b border-neutral-800">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white uppercase font-sans">
            OUR EXPERTISE
          </h2>
          <div className="mt-4 text-lg sm:text-xl font-light text-neutral-300 font-serif flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <p>Every service solves one problem.</p>
            <p className="text-white font-normal">Together, they solve the business.</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-neutral-800/80">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border rounded-xs ${
                activeCategory === cat.id
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Structured Service List with Divider between each item */}
        <div className="divide-y divide-neutral-800 border-t border-b border-neutral-800">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="py-8 sm:py-10 group hover:bg-neutral-900/40 transition-colors px-2 sm:px-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-12">
                {/* Left: Number & Title */}
                <div className="lg:w-5/12 flex items-start gap-4">
                  <span className="text-sm font-mono text-neutral-500 shrink-0 mt-1">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium text-white font-sans group-hover:text-neutral-200 transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Right: Description */}
                <div className="lg:w-7/12">
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


