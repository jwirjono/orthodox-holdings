import React from 'react';
import { PROCESS_STEPS } from '../data/orthodoxData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProcessSectionProps {
  onOpenConsultation: (msg?: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="process" className="py-24 bg-[#0A0A0A] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mt-2">
              Our Strategic Process
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0">
            How We Build Better Businesses.
          </p>
        </div>

        {/* 4 Steps Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-neutral-900/60 border border-neutral-800 p-8 flex flex-col justify-between hover:border-neutral-600 transition-all group"
            >
              <div>
                <span className="text-4xl font-light font-mono text-neutral-600 group-hover:text-white transition-colors block mb-6">
                  {step.number}
                </span>

                <h3 className="text-lg font-semibold text-white font-sans mb-3">
                  {step.title}
                </h3>

                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                  {step.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-neutral-800">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    Process Focus:
                  </div>
                  {step.actions.map((act, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300 font-light">
                      <span className="w-1 h-1 bg-white rounded-full" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                Phase {step.number} Protocol
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-neutral-900 border border-neutral-800 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-light text-white">
              Ready to execute the 4-phase strategic process for your enterprise?
            </h3>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Start Phase 01 Business Discovery with an Orthodox advisory lead.
            </p>
          </div>

          <button
            onClick={() => onOpenConsultation('Halo Orthodox Holdings, saya ingin memulai Phase 01 Business Discovery.')}
            className="px-6 py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Initiate Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
