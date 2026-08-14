import React, { useState } from 'react';
import { MessageSquare, Send, Phone, Mail, Building } from 'lucide-react';
import { useTranslation } from '../i18n';

interface ConsultationSectionProps {
  initialMessage?: string;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ initialMessage }) => {
  const t = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    challenge: 'siloed-tax-finance',
    message: initialMessage || '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    const wa = t.consultation.whatsapp;
    const text = `${wa.greeting}\n\n${wa.nameLabel}: ${formData.name || wa.namePlaceholder}\n${
      wa.companyLabel
    }: ${formData.company || '-'}\n${wa.emailLabel}: ${formData.email || '-'}\n${
      wa.phoneLabel
    }: ${formData.phone || '-'}\n\n${wa.messageLabel}:\n${formData.message || wa.defaultMessage}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="consultation" className="py-24 bg-[#080808] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b border-neutral-800">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
            {t.consultation.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase mb-3">
            {t.consultation.title}
          </h2>
          <p className="text-xl sm:text-2xl font-light text-white font-sans">
            {t.consultation.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Text Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block px-3 py-1 bg-white text-black font-mono text-xs uppercase font-bold tracking-widest">
              {t.consultation.badge}
            </span>

            <p className="text-base text-neutral-200 font-normal leading-relaxed">
              {t.consultation.intro}
            </p>

            <p className="text-sm text-neutral-300 font-light leading-relaxed border-l-2 border-white pl-4">
              {t.consultation.body1}
            </p>

            <p className="text-sm text-neutral-300 font-light leading-relaxed border-l-2 border-white pl-4">
              {t.consultation.body2Prefix}
              <a
                href="https://orthodoxwm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                {t.common.orthodoxWealthManagement}
              </a>
              {t.consultation.body2Suffix}
            </p>

            <div className="pt-6 space-y-4 border-t border-neutral-800">
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                <Building className="w-4 h-4 text-neutral-500" />
                <span>{t.consultation.hqLine}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                <Mail className="w-4 h-4 text-neutral-500" />
                <span>{t.consultation.email}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                <Phone className="w-4 h-4 text-neutral-500" />
                <span>{t.consultation.phoneLine}</span>
              </div>
            </div>
          </div>

          {/* Engagement Form (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 p-8 rounded-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-white text-black flex items-center justify-center mx-auto font-bold text-xl">
                  ✓
                </div>
                <h4 className="text-xl font-light text-white">{t.consultation.successTitle}</h4>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  {t.consultation.successBody}
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleSendWhatsApp}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.consultation.alsoSendWhatsapp}</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    {t.consultation.formTitle}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {t.consultation.formPrivileged}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      {t.consultation.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.consultation.fullNamePlaceholder}
                      className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      {t.consultation.companyName}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t.consultation.companyPlaceholder}
                      className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-sans"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      {t.consultation.workEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.consultation.emailPlaceholder}
                      className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      {t.consultation.phone}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.consultation.phonePlaceholder}
                      className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    {t.consultation.areaOfInterest}
                  </label>
                  <select
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-sans"
                  >
                    {t.consultation.interestOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    {t.consultation.notes}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.consultation.notesPlaceholder}
                    className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-sans resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.common.requestConsultation}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.consultation.instantWhatsapp}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
