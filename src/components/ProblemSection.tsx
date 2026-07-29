import React, { useState, useEffect, useRef } from 'react';
import { PROBLEM_ITEMS } from '../data/orthodoxData';
import { ProblemItem } from '../types';
import { MessageSquare, ArrowRight, Layers, AlertTriangle, RefreshCw, ExternalLink } from 'lucide-react';

interface ProblemSectionProps {
  onOpenConsultation: (msg?: string) => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenConsultation }) => {
  const [activeProblem, setActiveProblem] = useState<ProblemItem>(PROBLEM_ITEMS[0]);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Typing effect when activeProblem changes
  useEffect(() => {
    const fullText = activeProblem.whatsappMessage;
    setTypedMessage('');
    setIsTyping(true);

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedMessage(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [activeProblem]);

  const handleSelectProblem = (item: ProblemItem) => {
    setActiveProblem(item);

    // Scroll slightly down to face the conversation preview card
    setTimeout(() => {
      if (previewRef.current) {
        previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  const handleWhatsAppRedirect = (problem: ProblemItem) => {
    const encoded = encodeURIComponent(problem.whatsappMessage);
    // Standard Orthodox WhatsApp redirect link
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <section id="problem" className="py-24 bg-[#080808] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mt-2">
              The Problem We Solve
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0">
            Most business challenges aren't isolated. Neither should the solution.
          </p>
        </div>

        {/* Highlighted WhatsApp Starter Selector for Prospective Clients */}
        <div className="bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 mb-16 rounded-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-white text-black font-mono text-[10px] uppercase font-bold tracking-widest mb-2">
                WhatsApp Diagnostic Option
              </span>
              <h3 className="text-xl font-medium text-white font-sans">
                Select Your Primary Business Challenge
              </h3>
              <p className="text-xs text-neutral-400 font-light mt-1">
                Pilih tantangan utama bisnis Anda untuk memulai percakapan terstruktur via WhatsApp.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Instant Advisory Route:</span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1">
                WhatsApp Direct Starter
              </span>
            </div>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
            {PROBLEM_ITEMS.map((item) => {
              const isSelected = activeProblem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectProblem(item)}
                  className={`p-4 text-left border transition-all text-xs font-sans font-medium flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono tracking-wider ${isSelected ? 'text-neutral-600' : 'text-neutral-500'}`}>
                      {item.id}
                    </span>
                    {isSelected && <MessageSquare className="w-3.5 h-3.5 text-black" />}
                  </div>
                  <span className="text-sm font-semibold">{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Problem Card & Starter Conversation Preview */}
          <div
            ref={previewRef}
            className="bg-neutral-950 border border-neutral-800 p-6 rounded-xs grid md:grid-cols-3 gap-6 scroll-mt-28"
          >
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
                  Siloed Reality:
                </span>
                <p className="text-sm text-neutral-200 font-light mt-1 leading-relaxed">
                  {activeProblem.siloDescription}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
                  Ripple Effect Danger:
                </span>
                <p className="text-sm text-neutral-300 font-light mt-1 leading-relaxed border-l-2 border-neutral-700 pl-3">
                  {activeProblem.rippleEffect}
                </p>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">
                  Starter Conversation Preview:
                </span>
                <p className="text-xs text-neutral-300 italic font-mono bg-neutral-950 p-3 border border-neutral-800 rounded-xs min-h-[4.5rem]">
                  "{typedMessage}"
                  <span
                    className={`inline-block w-1.5 h-3.5 ml-1 bg-emerald-400 align-middle ${
                      isTyping ? 'animate-pulse' : 'opacity-0'
                    }`}
                  />
                </p>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => handleWhatsAppRedirect(activeProblem)}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start on WhatsApp</span>
                </button>

                <button
                  onClick={() => onOpenConsultation(activeProblem.whatsappMessage)}
                  className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-neutral-700"
                >
                  <span>Book Private Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Silo Principles Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Silo 1 */}
          <div className="border border-neutral-800 p-8 bg-neutral-900/40">
            <h3 className="text-xl font-medium text-white mb-4">
              Business Functions Operate in Silos
            </h3>
            <ul className="space-y-3 text-xs text-neutral-300 font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-1.5 shrink-0" />
                <span><strong className="text-white">Accounting</strong> focuses purely on historical compliance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-1.5 shrink-0" />
                <span><strong className="text-white">Tax advisors</strong> focus reactively on tax filing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-1.5 shrink-0" />
                <span><strong className="text-white">Bankers</strong> focus strictly on loan financing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-1.5 shrink-0" />
                <span><strong className="text-white">Lawyers</strong> focus isolated on legal agreements.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-1.5 shrink-0" />
                <span><strong className="text-white">Consultants</strong> focus on abstract strategy.</span>
              </li>
            </ul>
            <p className="mt-6 text-xs text-neutral-400 italic pt-4 border-t border-neutral-800">
              Very few coordinate everything together into one unified system.
            </p>
          </div>

          {/* Silo 2 */}
          <div className="border border-neutral-800 p-8 bg-neutral-900/40">
            <h3 className="text-xl font-medium text-white mb-4">
              Decisions Create Ripple Effects
            </h3>
            <div className="space-y-2 text-xs font-mono text-neutral-300">
              <div className="p-2 bg-neutral-950 border border-neutral-800">
                A financing decision <span className="text-white">➔ affects taxation</span>.
              </div>
              <div className="p-2 bg-neutral-950 border border-neutral-800">
                A tax structure <span className="text-white">➔ impacts cash flow</span>.
              </div>
              <div className="p-2 bg-neutral-950 border border-neutral-800">
                Cash flow <span className="text-white">➔ restricts expansion</span>.
              </div>
              <div className="p-2 bg-neutral-950 border border-neutral-800">
                Expansion <span className="text-white">➔ forces governance shift</span>.
              </div>
              <div className="p-2 bg-neutral-950 border border-neutral-800">
                Governance <span className="text-white">➔ dictates valuation</span>.
              </div>
            </div>
            <p className="mt-6 text-xs text-neutral-400 italic pt-4 border-t border-neutral-800">
              Every business decision is deeply interconnected.
            </p>
          </div>

          {/* Silo 3 */}
          <div className="border border-neutral-800 p-8 bg-neutral-900/80 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-medium text-white mb-4">
                More Than Specialists
              </h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-4">
                Growing businesses don't need more isolated advisors shouting competing recommendations.
              </p>
              <p className="text-sm text-white font-medium leading-relaxed bg-neutral-950 p-4 border-l-2 border-white">
                They need one strategic partner capable of coordinating the right specialists into one integrated solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
