import React from 'react';
import { useTranslation, format } from '../i18n';
import { useNavigation, type View } from '../navigation';
import mainLogo from '../assets/images/logo/mainOrthodox-trimmed.png';

export const Footer: React.FC = () => {
  const t = useTranslation();
  const { navigateView } = useNavigation();

  // Each column links into its own view; navigateView switches view first when needed.
  const footerColumns: { view: View; title: string; links: { anchor: string; label: string }[] }[] = [
    {
      view: 'business',
      title: t.footer.businessTitle,
      links: [
        { anchor: 'services', label: t.footer.businessLinks.help },
        { anchor: 'our-service', label: t.footer.businessLinks.services },
        { anchor: 'why-us', label: t.footer.businessLinks.expertise },
        { anchor: 'tax-calculator', label: t.footer.businessLinks.taxCalculator },
      ],
    },
    {
      view: 'wealth',
      title: t.footer.wealthTitle,
      links: [
        { anchor: 'problem', label: t.footer.wealthLinks.problem },
        { anchor: 'about', label: t.footer.wealthLinks.whoWeAre },
        { anchor: 'services', label: t.footer.wealthLinks.expertise },
        { anchor: 'why-orthodox', label: t.footer.wealthLinks.whyOrthodox },
      ],
    },
  ];

  return (
    <footer className="bg-[#050505] text-neutral-400 text-xs font-sans border-t border-neutral-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            {/* mainOrthodox.png already contains the ORTHODOX wordmark */}
            <a href="#" className="inline-flex items-center hover:opacity-75 transition-opacity">
              <img
                src={mainLogo}
                alt={t.common.brandName}
                className="h-8 w-auto"
                width={1200}
                height={209}
                loading="lazy"
                decoding="async"
              />
            </a>

            <p className="text-sm text-white font-light">{t.footer.tagline}</p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
            <p className="text-[11px] text-neutral-500 font-light leading-relaxed max-w-sm">
              {t.footer.legalName}
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.view} className="space-y-3">
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
                        navigateView(column.view, link.anchor);
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

        {/* Disclosures & Fine Print */}
        <div className="space-y-4 text-[11px] text-neutral-500 font-light leading-relaxed">
          <p>
            <strong>{t.footer.regulatoryLabel}</strong> {t.footer.regulatoryBody}
          </p>
          <p>{t.footer.platformNotice}</p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            {format(t.footer.copyright, { year: new Date().getFullYear() })}
          </div>
        </div>
      </div>
    </footer>
  );
};
