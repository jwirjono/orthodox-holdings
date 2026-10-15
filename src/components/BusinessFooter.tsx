import React from 'react';
import { Mail } from 'lucide-react';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useTranslation, format } from '../i18n';
import { useNavigation } from '../navigation';
import {
  BUSINESS_EMAIL,
  BUSINESS_INSTAGRAM_URL,
  BUSINESS_LINKEDIN_URL,
  businessWhatsappUrl,
} from '../lib/businessContact';
import businessLogo from '../assets/images/logo/businessOrthodox-trimmed.png';

/**
 * Footer for the Business Solutions view. It carries the PT Orthodox Solusi
 * Bisnis entity details and the business's own social and contact channels.
 */
export const BusinessFooter: React.FC = () => {
  const t = useTranslation();
  const { navigateView } = useNavigation();
  const f = t.businessFooter;

  const columns: { title: string; links: { anchor: string; label: string }[] }[] = [
    {
      title: f.solutionsTitle,
      links: [
        { anchor: 'tax-efficiency-plan', label: f.solutionsLinks.taxEfficiency },
        { anchor: 'fraud-detection-plan', label: f.solutionsLinks.fraudDetection },
        { anchor: 'cfo-advisory', label: f.solutionsLinks.cfoAdvisory },
        { anchor: 'corporate-structuring', label: f.solutionsLinks.corporateStructuring },
      ],
    },
    {
      title: f.approachTitle,
      links: [
        { anchor: 'services', label: f.approachLinks.problems },
        { anchor: 'ecosystem', label: f.approachLinks.integratedSystem },
        { anchor: 'why-us', label: f.approachLinks.expertise },
        { anchor: 'process', label: f.approachLinks.strategicProcess },
      ],
    },
  ];

  return (
    <footer className="bg-[#050505] text-neutral-400 text-xs font-sans border-t border-neutral-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <button
              type="button"
              onClick={() => navigateView('business')}
              className="inline-flex items-center hover:opacity-75 transition-opacity"
            >
              <img
                src={businessLogo}
                alt={f.logoAlt}
                className="h-10 w-auto"
                width={1200}
                height={252}
                loading="lazy"
                decoding="async"
              />
            </button>
            <p className="text-sm text-white font-light">{f.tagline}</p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">{f.description}</p>
            <p className="text-[11px] text-neutral-500 font-light leading-relaxed max-w-sm">
              {f.legalName}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title} className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
                {column.title}
              </h4>
              <ul className="space-y-2 text-neutral-400 font-light">
                {column.links.map((link) => (
                  <li key={link.anchor}>
                    <a
                      href={`#${link.anchor}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateView('business', link.anchor);
                      }}
                      className="hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Regulatory & Entity Notice */}
        <div className="space-y-4 text-[11px] text-neutral-500 font-light leading-relaxed">
          <p>
            <strong>{f.regulatoryLabel}</strong> {f.regulatoryBody}
          </p>
          <p>
            {f.scopeNoticePrefix}
            <button type="button" onClick={() => navigateView('wealth')} className="underline hover:text-white">
              {t.common.orthodoxWealthManagement}
            </button>
            {f.scopeNoticeSuffix}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>{format(f.copyright, { year: new Date().getFullYear() })}</div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href={BUSINESS_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FaLinkedinIn className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t.common.linkedin}</span>
            </a>
            <a
              href={BUSINESS_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FaInstagram className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t.common.instagram}</span>
            </a>
            <a
              href={businessWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={f.whatsappLabel}
              className="wa-contact"
            >
              <FaWhatsapp className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              <span>{BUSINESS_EMAIL}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
