import React from 'react';
import { Mail } from 'lucide-react';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useTranslation, format } from '../../i18n';
import { useNavigation } from '../../navigation';
import { wealthWhatsappUrl } from '../../lib/wealthContact';
import wealthLogo from '../../assets/images/wealth/owm-main-logo.png';

/**
 * Footer for the Wealth Management view. It carries the PT Orthodox Strategi
 * Finansial entity details and the OWM social and contact channels.
 */
export const WealthFooter: React.FC = () => {
  const t = useTranslation();
  const { navigateView } = useNavigation();
  const f = t.wealth.footer;

  const columns: { title: string; links: { anchor: string; label: string }[] }[] = [
    {
      title: f.servicesTitle,
      links: [
        { anchor: 'investment-planning', label: f.servicesLinks.investment },
        { anchor: 'insurance-planning', label: f.servicesLinks.insurance },
        { anchor: 'personal-tax-planning', label: f.servicesLinks.personalTax },
        { anchor: 'debt-management', label: f.servicesLinks.debt },
        { anchor: 'personal-loan-broking', label: f.servicesLinks.personalLoan },
        { anchor: 'retirement-planning', label: f.servicesLinks.retirement },
        { anchor: 'estate-planning', label: f.servicesLinks.estate },
        { anchor: 'asset-protection', label: f.servicesLinks.assetProtection },
      ],
    },
    {
      title: f.approachTitle,
      links: [
        { anchor: 'problem', label: f.approachLinks.problems },
        { anchor: 'financial-system', label: f.approachLinks.financialSystem },
        { anchor: 'services', label: f.approachLinks.expertise },
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
              onClick={() => navigateView('wealth')}
              className="inline-flex items-center hover:opacity-75 transition-opacity"
            >
              <img
                src={wealthLogo}
                alt={f.logoAlt}
                className="h-10 w-auto"
                width={1200}
                height={258}
                loading="lazy"
                decoding="async"
              />
            </button>
            <p className="text-sm text-white font-light">{f.tagline}</p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">{f.description}</p>
            <p className="text-[11px] text-neutral-500 font-light leading-relaxed max-w-sm">{f.legalName}</p>
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
                        navigateView('wealth', link.anchor);
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
          <p>{f.focusNotice}</p>
          <p>
            {f.crossSellPrefix}
            <button type="button" onClick={() => navigateView('business')} className="underline hover:text-white">
              {t.common.orthodoxBusinessSolutions}
            </button>
            {f.crossSellSuffix}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>{format(f.copyright, { year: new Date().getFullYear() })}</div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://www.linkedin.com/company/orthodox-wealth-management/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FaLinkedinIn className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t.common.linkedin}</span>
            </a>
            <a
              href="https://www.instagram.com/orthodoxwealthmanagement"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FaInstagram className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t.common.instagram}</span>
            </a>
            <a
              href={wealthWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={f.whatsappLabel}
              className="wa-contact"
            >
              <FaWhatsapp className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${f.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              <span>{f.email}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
