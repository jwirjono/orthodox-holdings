import React from 'react';
import { Mail } from 'lucide-react';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useTranslation, format } from '../../i18n';
import footerLogo from '../../assets/images/wealth/owm-footer-logo.png';

/**
 * Footer for the Wealth Management view. It carries the OWM entity details and
 * social profiles, which differ from the Orthodox Holdings footer.
 */
export const WealthFooter: React.FC = () => {
  const t = useTranslation();

  return (
    <footer className="py-12 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <img
            src={footerLogo}
            alt={t.wealth.footer.logoAlt}
            className="h-8 w-auto object-contain"
            width={1200}
            height={209}
            loading="lazy"
            decoding="async"
          />
          <span className="text-[10px] tracking-[0.2em] text-white/40">
            {t.wealth.footer.legalName}
          </span>
        </div>

        <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>{format(t.wealth.footer.copyright, { year: new Date().getFullYear() })}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center text-[10px] tracking-[0.2em] text-white/40 mr-2">
            <Mail className="w-4 h-4 text-white/40" />
            <span className="ml-2">{t.wealth.footer.email}</span>
          </div>

          <a
            href="https://www.linkedin.com/company/orthodox-wealth-management/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.common.linkedin}
            className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-gold transition-colors"
          >
            <FaLinkedinIn className="w-4 h-4 text-white/40" />
          </a>

          <a
            href="https://www.instagram.com/orthodoxwealthmanagement"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.common.instagram}
            className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-gold transition-colors"
          >
            <FaInstagram className="w-4 h-4 text-white/40" />
          </a>

          <a
            href="https://wa.me/6285111218413"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.wealth.footer.whatsappLabel}
            className="wa-contact"
          >
            <FaWhatsapp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
