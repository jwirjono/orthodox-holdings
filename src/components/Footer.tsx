import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { useTranslation, format } from '../i18n';

export const Footer: React.FC = () => {
  const t = useTranslation();

  return (
    <footer className="bg-[#050505] text-neutral-400 text-xs font-sans border-t border-neutral-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white text-black font-bold flex items-center justify-center text-xs tracking-tighter">
                OH
              </div>
              <span className="text-sm font-semibold tracking-[0.2em] text-white uppercase font-sans">
                {t.common.brandName}
              </span>
            </a>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              {t.footer.ecosystemTitle}
            </h4>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li><a href="#problem" className="hover:text-white">{t.footer.ecosystemLinks.problem}</a></li>
              <li><a href="#system" className="hover:text-white">{t.footer.ecosystemLinks.system}</a></li>
              <li><a href="#leadership" className="hover:text-white">{t.footer.ecosystemLinks.leadership}</a></li>
              <li><a href="#expertise" className="hover:text-white">{t.footer.ecosystemLinks.expertise}</a></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              {t.footer.governanceTitle}
            </h4>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li><a href="#ecosystem" className="hover:text-white">{t.footer.governanceLinks.diagram}</a></li>
              <li><a href="#process" className="hover:text-white">{t.footer.governanceLinks.process}</a></li>
              <li><a href="#principles" className="hover:text-white">{t.footer.governanceLinks.principles}</a></li>
              <li><a href="#tax-calculator" className="hover:text-white">{t.footer.governanceLinks.taxCalculator}</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              {t.footer.hqTitle}
            </h4>
            <p className="text-neutral-400 font-light leading-relaxed">
              {t.footer.hqLine1}<br />
              {t.footer.hqLine2}
            </p>
            <p className="text-neutral-400 font-mono text-[11px]">
              {t.footer.email}
            </p>
          </div>
        </div>

        {/* Disclosures & Fine Print */}
        <div className="space-y-4 text-[11px] text-neutral-500 font-light leading-relaxed">
          <p>
            <strong>{t.footer.regulatoryLabel}</strong> {t.footer.regulatoryBody}
          </p>
          <p>
            {t.footer.platformNoticePrefix}
            <a href="https://orthodoxwm.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">orthodoxwm.com</a>
            {t.footer.platformNoticeSuffix}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            {format(t.footer.copyright, { year: new Date().getFullYear() })}
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="https://www.linkedin.com/company/orthodox-holding"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t.common.linkedin}</span>
            </a>
            <a
              href="https://www.instagram.com/orthodoxholding"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t.common.instagram}</span>
            </a>
            <span>•</span>
            <a href="https://orthodoxwm.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              orthodoxwm.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
