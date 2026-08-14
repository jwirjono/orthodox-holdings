import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getProblemItems } from '../data/orthodoxData';
import { ProblemItem } from '../types';
import {
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  FileText,
  PieChart,
  Users,
  AlertOctagon,
} from 'lucide-react';
import { useTranslation, format } from '../i18n';

interface ProblemSectionProps {
  onOpenConsultation: (msg?: string) => void;
}

/** Icons are language-independent and keyed to the advisory card ids in the dictionary. */
const ADVISORY_ICONS: Record<string, React.ElementType> = {
  'cfo-advisory': TrendingUp,
  'corporate-structuring': ShieldCheck,
  'business-advisory': PieChart,
  'business-valuation': DollarSign,
  'payroll-management': Users,
  'corporate-tax-dispute': AlertOctagon,
};

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenConsultation }) => {
  const t = useTranslation();
  const problemItems = useMemo(() => getProblemItems(t), [t]);

  // Track the selection by id so it survives a language switch.
  const [activeProblemId, setActiveProblemId] = useState<string>(problemItems[0].id);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const activeProblem =
    problemItems.find((item) => item.id === activeProblemId) ?? problemItems[0];

  // Typing effect when the active problem (or its translation) changes
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
    setActiveProblemId(item.id);

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

  return (
    <section id="services" className="py-24 bg-[#080808] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="mb-16 pb-6 border-b border-neutral-800 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
              {t.problems.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase">
              {t.problems.title}
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0">
            {t.problems.subtitle}
          </p>
        </div>

        {/* FREQUENT PROBLEM TO SOLVE (Dropdown WhatsApp starter as it was) */}
        <div className="bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 mb-20 rounded-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-white text-black font-mono text-[10px] uppercase font-bold tracking-widest mb-2">
                {t.problems.diagnosticBadge}
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-white font-sans uppercase">
                {t.problems.diagnosticTitle}
              </h3>
              <p className="text-xs text-neutral-400 font-light mt-1">
                {t.problems.diagnosticSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-neutral-400">{t.problems.instantChannel}</span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1">
                {t.problems.whatsappDirect}
              </span>
            </div>
          </div>

          {/* Selector List / Cards divided into row 1 (1-3) and row 2 (4-6) */}
          {(() => {
            const row1 = problemItems.slice(0, 3);
            const row2 = problemItems.slice(3, 6);
            const activeIndex = problemItems.findIndex((p) => p.id === activeProblem.id);
            const isActiveInRow1 = activeIndex >= 0 && activeIndex < 3;
            const isActiveInRow2 = activeIndex >= 3 && activeIndex < 6;

            const renderDiagnosticPreview = () => (
              <div
                ref={previewRef}
                className="relative overflow-hidden bg-neutral-950 border border-neutral-700 p-6 sm:p-8 rounded-xs grid md:grid-cols-3 gap-6 scroll-mt-28 my-4 shadow-2xl"
              >
                {/* Background Image - clearly visible with subtle gradient overlay */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img
                    src={activeProblem.backgroundImage}
                    alt={t.problems.diagnosticImageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-75 filter brightness-90 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-neutral-950/60" />
                </div>

                <div className="relative z-10 md:col-span-2 space-y-5 p-4 sm:p-5 rounded-xs border border-neutral-800/80 backdrop-blur-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold block mb-1">
                      {t.problems.diagnosticOverview}
                    </span>
                    <p className="text-sm sm:text-base text-white font-normal leading-relaxed">
                      {activeProblem.siloDescription}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold block mb-1">
                      {t.problems.businessImpact}
                    </span>
                    <p className="text-sm text-neutral-200 font-light leading-relaxed border-l-2 border-emerald-500/80 pl-3">
                      {activeProblem.rippleEffect}
                    </p>
                  </div>
                </div>

                <div className="relative z-10  backdrop-blur-xs border border-neutral-800 p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">
                      {t.problems.whatsappStarter}
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
                      className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all rounded-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{t.problems.startOnWhatsapp}</span>
                    </button>

                    <button
                      onClick={() => onOpenConsultation(activeProblem.whatsappMessage)}
                      className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-neutral-700 rounded-xs"
                    >
                      <span>{t.problems.bookPrivateConsultation}</span>
                    </button>
                  </div>
                </div>
              </div>
            );

            return (
              <div className="my-6 space-y-4">
                {/* Desktop View (lg: 3-column rows) */}
                <div className="hidden lg:block space-y-4">
                  {/* Row 1: Problems 1-3 */}
                  <div className="grid grid-cols-3 gap-3">
                    {row1.map((item, idx) => {
                      const isSelected = activeProblem.id === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectProblem(item)}
                          className={`p-4 text-left border transition-all text-xs font-sans font-medium flex flex-col justify-between h-full rounded-xs ${
                            isSelected
                              ? 'bg-white text-black border-white shadow-lg'
                              : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[10px] font-mono tracking-wider ${
                                isSelected ? 'text-neutral-600' : 'text-neutral-500'
                              }`}
                            >
                              {t.problems.problemLabel} // 0{idx + 1}
                            </span>
                            {isSelected && <MessageSquare className="w-3.5 h-3.5 text-black" />}
                          </div>
                          <span className="text-sm font-semibold leading-snug">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Diagnostic Overview directly under Row 1 if active item is in Row 1 */}
                  {isActiveInRow1 && renderDiagnosticPreview()}

                  {/* Row 2: Problems 4-6 */}
                  <div className="grid grid-cols-3 gap-3">
                    {row2.map((item, idx) => {
                      const isSelected = activeProblem.id === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectProblem(item)}
                          className={`p-4 text-left border transition-all text-xs font-sans font-medium flex flex-col justify-between h-full rounded-xs ${
                            isSelected
                              ? 'bg-white text-black border-white shadow-lg'
                              : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[10px] font-mono tracking-wider ${
                                isSelected ? 'text-neutral-600' : 'text-neutral-500'
                              }`}
                            >
                              {t.problems.problemLabel} // 0{idx + 4}
                            </span>
                            {isSelected && <MessageSquare className="w-3.5 h-3.5 text-black" />}
                          </div>
                          <span className="text-sm font-semibold leading-snug">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Diagnostic Overview directly under Row 2 if active item is in Row 2 */}
                  {isActiveInRow2 && renderDiagnosticPreview()}
                </div>

                {/* Mobile & Tablet View (< lg: stacked directly under active card) */}
                <div className="block lg:hidden space-y-3">
                  {problemItems.map((item, idx) => {
                    const isSelected = activeProblem.id === item.id;
                    return (
                      <React.Fragment key={item.id}>
                        <button
                          onClick={() => handleSelectProblem(item)}
                          className={`w-full p-4 text-left border transition-all text-xs font-sans font-medium flex flex-col justify-between rounded-xs ${
                            isSelected
                              ? 'bg-white text-black border-white shadow-lg'
                              : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[10px] font-mono tracking-wider ${
                                isSelected ? 'text-neutral-600' : 'text-neutral-500'
                              }`}
                            >
                              {t.problems.problemLabel} // 0{idx + 1}
                            </span>
                            {isSelected && <MessageSquare className="w-3.5 h-3.5 text-black" />}
                          </div>
                          <span className="text-sm font-semibold leading-snug">{item.title}</span>
                        </button>

                        {/* Render overview directly under the active card on mobile/tablet */}
                        {isSelected && renderDiagnosticPreview()}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

        {/* OUR SERVICE: Side-by-Side Featured Plans */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1">
              {t.problems.plans.eyebrow}
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-white uppercase font-sans">
              {t.problems.plans.title}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Plan 1: Tax Efficiency Plan */}
            <div className="bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between rounded-xs hover:border-neutral-600 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    {t.problems.plans.flagship01}
                  </span>
                  <FileText className="w-5 h-5 text-neutral-400" />
                </div>

                <h4 className="text-2xl font-semibold text-white mb-2">
                  {t.problems.plans.tax.title}
                </h4>

                <p className="text-sm text-neutral-200 font-medium mb-4">
                  {t.problems.plans.tax.tagline}
                </p>

                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                  {t.problems.plans.tax.description}
                </p>

                <div className="pt-6 border-t border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider block mb-3">
                    {t.problems.plans.includedServices}
                  </span>
                  <div className="space-y-2">
                    {t.problems.plans.tax.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800">
                <button
                  onClick={() => onOpenConsultation(t.problems.plans.tax.enquiryMessage)}
                  className="w-full py-3 bg-white text-black hover:bg-neutral-200 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-xs"
                >
                  <span>{t.common.talkToUs}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Plan 2: Fraud Detection Plan */}
            <div className="bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between rounded-xs hover:border-neutral-600 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    {t.problems.plans.flagship02}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-neutral-400" />
                </div>

                <h4 className="text-2xl font-semibold text-white mb-2">
                  {t.problems.plans.fraud.title}
                </h4>

                <p className="text-sm text-neutral-200 font-medium mb-4">
                  {t.problems.plans.fraud.tagline}
                </p>

                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                  {t.problems.plans.fraud.description}
                </p>

                <div className="pt-6 border-t border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider block mb-3">
                    {t.problems.plans.includedServices}
                  </span>
                  <div className="space-y-2">
                    {t.problems.plans.fraud.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800">
                <button
                  onClick={() => onOpenConsultation(t.problems.plans.fraud.enquiryMessage)}
                  className="w-full py-3 bg-white text-black hover:bg-neutral-200 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-xs"
                >
                  <span>{t.common.talkToUs}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Advisory Growth Cards */}
        <div className="bg-neutral-900/60 border border-neutral-800 p-8 sm:p-10 rounded-xs mb-12">
          <h3 className="text-2xl sm:text-3xl font-light text-white leading-snug mb-4">
            {t.problems.narrative.title}
          </h3>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-3xl border-l-2 border-white pl-4">
            {t.problems.narrative.body}
          </p>
        </div>

        {/* 6 Specialized Advisory Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.problems.advisoryCards.map((card, idx) => {
            const Icon = ADVISORY_ICONS[card.id] ?? TrendingUp;
            return (
              <div
                key={card.id}
                className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-600 transition-all group rounded-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      {t.problems.advisoryLabel} 0{idx + 1}
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
                    onClick={() =>
                      onOpenConsultation(
                        format(t.problems.advisoryEnquiryTemplate, { topic: card.title })
                      )
                    }
                    className="text-[11px] font-mono text-neutral-300 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <span>{t.common.enquire}</span>
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
