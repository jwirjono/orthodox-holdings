import React, { useState, useEffect, useRef } from 'react';
import { PROBLEM_ITEMS } from '../data/orthodoxData';
import { ProblemItem } from '../types';
import { MessageSquare, ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, DollarSign, FileText, PieChart, Users, AlertOctagon } from 'lucide-react';

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

    setTimeout(() => {
      if (previewRef.current) {
        previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  const handleWhatsAppRedirect = (problem: ProblemItem) => {
    const encoded = encodeURIComponent(problem.whatsappMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const advisoryCards = [
    {
      title: "CFO Advisory",
      description: "Financial planning, budgeting, forecasting and management reporting.",
      icon: TrendingUp,
    },
    {
      title: "Corporate Structuring",
      description: "Build the right legal and ownership structure for growth.",
      icon: ShieldCheck,
    },
    {
      title: "Business Advisory",
      description: "Improve profitability and operational performance.",
      icon: PieChart,
    },
    {
      title: "Business Valuation",
      description: "Know what your business is worth.",
      icon: DollarSign,
    },
    {
      title: "Payroll Management",
      description: "Accurate payroll and employment tax compliance.",
      icon: Users,
    },
    {
      title: "Corporate Tax Dispute",
      description: "Support during tax audits, objections and disputes.",
      icon: AlertOctagon,
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#080808] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-16 pb-6 border-b border-neutral-800 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
              Integrated Business Solutions
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase">
              HOW CAN WE HELP YOU?
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0">
            Tailored plans designed for immediate financial stability and long-term enterprise growth.
          </p>
        </div>

        {/* FREQUENT PROBLEM TO SOLVE */}
        <div className="bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 mb-20 rounded-xs">
          <div className="pb-6 border-b border-neutral-800">
            <h3 className="text-xl sm:text-2xl font-medium text-white font-sans uppercase">
              FREQUENT PROBLEM TO SOLVE:
            </h3>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Select your current operational challenge to view the diagnostic overview and launch a direct WhatsApp consultation.
            </p>
          </div>

          {/* Selector List / Cards with Inline Diagnostic Overview */}
          <div className="space-y-3 my-6">
            {PROBLEM_ITEMS.map((item, idx) => {
              const isSelected = activeProblem.id === item.id;
              return (
                <div
                  key={item.id}
                  className={`border transition-all rounded-xs overflow-hidden ${
                    isSelected ? 'border-white bg-neutral-950 shadow-lg' : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700'
                  }`}
                >
                  {/* Card Header Button */}
                  <button
                    onClick={() => handleSelectProblem(item)}
                    className={`w-full p-4 sm:p-5 text-left transition-all text-xs font-sans font-medium flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-white text-black font-semibold'
                        : 'bg-neutral-950 text-neutral-300 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono tracking-wider shrink-0 px-2 py-0.5 border ${
                        isSelected ? 'border-black/30 text-neutral-800 font-bold' : 'border-neutral-800 text-neutral-500'
                      }`}>
                        PROBLEM // 0{idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-semibold leading-snug">{item.title}</span>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className={`text-[10px] font-mono uppercase tracking-wider hidden sm:inline-block ${
                        isSelected ? 'text-neutral-700' : 'text-neutral-500'
                      }`}>
                        {isSelected ? 'Active Overview' : 'Click to View'}
                      </span>
                      <MessageSquare className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-neutral-500'}`} />
                    </div>
                  </button>

                  {/* Diagnostic Overview Tab Below the Card */}
                  {isSelected && (
                    <div
                      ref={previewRef}
                      className="border-t border-neutral-800 p-6 grid md:grid-cols-3 gap-6 scroll-mt-28 bg-neutral-950"
                    >
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block mb-1">
                            Diagnostic Overview:
                          </span>
                          <p className="text-sm text-neutral-200 font-light leading-relaxed">
                            {item.siloDescription}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block mb-1">
                            Business Impact:
                          </span>
                          <p className="text-sm text-neutral-300 font-light leading-relaxed border-l-2 border-neutral-700 pl-3">
                            {item.rippleEffect}
                          </p>
                        </div>
                      </div>

                      <div className="bg-neutral-900 border border-neutral-800 p-4 flex flex-col justify-between rounded-xs">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">
                            WhatsApp Conversation Starter:
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
                            onClick={() => handleWhatsAppRedirect(item)}
                            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all rounded-xs"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Start on WhatsApp</span>
                          </button>

                          <button
                            onClick={() => onOpenConsultation(item.whatsappMessage)}
                            className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-neutral-700 rounded-xs"
                          >
                            <span>Book Private Consultation</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* OUR SERVICE: Side-by-Side Featured Plans */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1">
              Core Flagship Plans
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-white uppercase font-sans">
              OUR SERVICE:
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Plan 1: Tax Efficiency Plan */}
            <div className="bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between rounded-xs hover:border-neutral-600 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    Flagship Plan 01
                  </span>
                  <FileText className="w-5 h-5 text-neutral-400" />
                </div>

                <h4 className="text-2xl font-semibold text-white mb-2">
                  Tax Efficiency Plan
                </h4>

                <p className="text-sm text-neutral-200 font-medium mb-4">
                  Reduce tax risk. Improve tax efficiency. Stay compliant.
                </p>

                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                  Designed for businesses that want peace of mind while legally optimising their tax position.
                </p>

                <div className="pt-6 border-t border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider block mb-3">
                    Included Services:
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Tax Compliance</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Tax Reporting</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Tax Planning</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800">
                <button
                  onClick={() => onOpenConsultation('Halo Orthodox Holdings, saya berminat dengan Tax Efficiency Plan.')}
                  className="w-full py-3 bg-white text-black hover:bg-neutral-200 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-xs"
                >
                  <span>Talk to us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Plan 2: Fraud Detection Plan */}
            <div className="bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between rounded-xs hover:border-neutral-600 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    Flagship Plan 02
                  </span>
                  <ShieldCheck className="w-5 h-5 text-neutral-400" />
                </div>

                <h4 className="text-2xl font-semibold text-white mb-2">
                  Fraud Detection Plan
                </h4>

                <p className="text-sm text-neutral-200 font-medium mb-4">
                  Improve financial accuracy before small mistakes become expensive problems.
                </p>

                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                  Designed for businesses that need stronger financial records, internal controls, and reliable reporting.
                </p>

                <div className="pt-6 border-t border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider block mb-3">
                    Included Services:
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Bookkeeping</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Financial Reporting</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Fraud Detection</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800">
                <button
                  onClick={() => onOpenConsultation('Halo Orthodox Holdings, saya berminat dengan Fraud Detection Plan.')}
                  className="w-full py-3 bg-white text-black hover:bg-neutral-200 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-xs"
                >
                  <span>Talk to us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Advisory Growth Cards */}
        <div className="bg-neutral-900/60 border border-neutral-800 p-8 sm:p-10 rounded-xs mb-12">
          <h3 className="text-2xl sm:text-3xl font-light text-white leading-snug mb-4">
            As your business grows, your advisory should grow too.
          </h3>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-3xl border-l-2 border-white pl-4">
            Most of our clients begin with tax or bookkeeping. As we better understand their business, we help them improve profitability, cash flow, governance, financing, and long-term business value.
          </p>
        </div>

        {/* 6 Specialized Advisory Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisoryCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-600 transition-all group rounded-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      Advisory 0{idx + 1}
                    </span>
                    <Icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-2">
                    {card.title}
                  </h4>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={() => onOpenConsultation(`Halo Orthodox Holdings, saya ingin berkonsultasi mengenai ${card.title}.`)}
                    className="text-[11px] font-mono text-neutral-300 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
