import React, { useState } from 'react';
import { MessageSquare, Send, ShieldCheck, Phone, Mail, Building, ArrowRight } from 'lucide-react';

interface ConsultationSectionProps {
  initialMessage?: string;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ initialMessage }) => {
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
    const text = `Halo Orthodox Holdings,\n\nNama: ${formData.name || 'Calon Klien'}\nPerusahaan: ${formData.company || '-'}\nEmail: ${formData.email || '-'}\nNo Telp/WA: ${formData.phone || '-'}\n\nPesan Consultation:\n${formData.message || 'Saya ingin berkonsultasi mengenai solusi terintegrasi bisnis dan wealth management.'}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="consultation" className="py-24 bg-[#080808] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mt-2">
              Private Consultation
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0">
            Build a Better Business.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Text Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-3xl font-light text-white leading-tight">
              Integrated Solutions. Sustainable Growth. 
            </h3>

            <p className="text-sm text-neutral-300 font-light leading-relaxed">
            The strongest businesses are built through coordinated decisions—not isolated advice.
            </p>

            <p className="text-sm text-neutral-400 font-light leading-relaxed border-l-2 border-white pl-4">
            Whether you're improving profitability, restructuring your business, raising capital, planning succession, or preparing for long-term wealth creation, Orthodox Business Solutions provides the integrated expertise to guide every stage of your journey.
            </p>

            <p className="text-sm text-neutral-400 font-light leading-relaxed border-l-2 border-white pl-4">
              Through our ecosystem with Orthodox Wealth Management, your business strategy naturally extends into your personal financial future—ensuring both your company and your wealth are built to last.
            </p>

            <div className="pt-6 space-y-4 border-t border-neutral-800">
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                <Building className="w-4 h-4 text-neutral-500" />
                <span>Orthodox Holding HQ // Private Advisory Office</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                <Mail className="w-4 h-4 text-neutral-500" />
                <span>advisory@orthodoxwm.com</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                <Phone className="w-4 h-4 text-neutral-500" />
                <span>Direct Partner Desk (Indonesia & Australia)</span>
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
                <h4 className="text-xl font-light text-white">Consultation Request Dispatched</h4>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  An Orthodox Advisory Partner (Adriel Louis, Dominicus Richardo, or Brigitta Bunga) will review your corporate profile and contact you within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleSendWhatsApp}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Also Send via WhatsApp Instant Route</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Confidential Client Enquiry Form
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">Privileged & Confidential</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Bapak / Ibu Managing Director"
                      className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Company Name / Entity
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g., PT Enterprise Holdings"
                      className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-sans"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+62 812..."
                      className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Primary Area of Interest
                  </label>
                  <select
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-sans"
                  >
                    <option value="siloed-tax-finance">Integrated Tax & Financial Planning</option>
                    <option value="corp-structuring">Corporate Structuring & Ownership Design</option>
                    <option value="tax-dispute">Corporate Tax Dispute Resolution & Audit</option>
                    <option value="wealth-transfer">Business to Personal Wealth Transfer (Orthodox Wealth Management)</option>
                    <option value="valuation-funding">Valuation, Capital Raising & M&A</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Brief Notes / Current Challenge
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current business or wealth structure..."
                    className="w-full bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-sans resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Confidential Request</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Route</span>
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
