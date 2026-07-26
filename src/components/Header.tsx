import React, { useState, useEffect } from 'react';
import { Shield, ArrowUpRight, Menu, X, LayoutDashboard, Calculator, MessageSquare } from 'lucide-react';

interface HeaderProps {
  currentView: 'holding' | 'business';
  onNavigateView: (view: 'holding' | 'business') => void;
  onOpenDashboard: () => void;
  onOpenTaxCalculator: () => void;
  onOpenConsultation: (problemMessage?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateView,
  onOpenDashboard,
  onOpenTaxCalculator,
  onOpenConsultation,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const businessNavLinks = [
    { name: 'About', href: '#whoweare' },
    { name: 'Services', href: '#expertise' },
    { name: 'Contact', href: '#consultation' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-neutral-800/80 py-3'
          : 'bg-[#0A0A0A]/80 backdrop-blur-xs py-4 border-b border-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Monogram & Name */}
          <button
            onClick={() => onNavigateView('holding')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-9 h-9 bg-white text-black flex items-center justify-center font-bold tracking-tighter transition-transform duration-300 group-hover:bg-neutral-200 rounded-xs">
              <span className="text-sm font-semibold">OH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-md font-semibold tracking-[0.2em] text-white uppercase font-sans">
                Orthodox Holdings
              </span>
              <span className="text-[10px] text-neutral-400 tracking-wider font-mono uppercase">
                {currentView === 'holding' ? 'Integrated Ecosystem' : 'Business Solutions'}
              </span>
            </div>
          </button>

          {/* Right Group: Navigation Items */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <nav className="flex items-center space-x-6 lg:space-x-8 text-xs font-medium uppercase tracking-wider text-neutral-400">
              {currentView === 'business' && (
                <>
                  <button
                    onClick={() => onNavigateView('holding')}
                    className="hover:text-white transition-colors py-1 hover:border-b hover:border-white"
                  >
                    HOLDING
                  </button>
                  {businessNavLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="hover:text-white transition-colors py-1 hover:border-b hover:border-white"
                    >
                      {link.name}
                    </a>
                  ))}
                </>
              )}
            </nav>

            {/* Consultation CTA */}
            <button
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black bg-white border border-white hover:bg-neutral-200 transition-all rounded-xs shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Consultation</span>
            </button>
          </div>

          {/* Mobile Burger Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenConsultation()}
              className="px-2.5 py-1 text-[11px] font-semibold text-black bg-white rounded-xs uppercase tracking-wider"
            >
              Consult
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between p-6 overflow-y-auto font-sans">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateView('holding');
              }}
              className="flex items-center gap-3 text-left"
            >
              <div className="w-9 h-9 bg-white text-black flex items-center justify-center font-bold tracking-tighter">
                <span className="text-sm font-semibold">OH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-[0.2em] text-white uppercase font-sans">
                  Orthodox Holdings
                </span>
                <span className="text-[10px] text-neutral-400 tracking-wider uppercase font-mono">
                  Integrated Ecosystem
                </span>
              </div>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col my-auto py-8 space-y-5 text-base uppercase tracking-widest text-neutral-200 font-medium">
            {currentView === 'business' && (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateView('holding');
                  }}
                  className="text-left py-2 border-b border-neutral-900 transition-colors text-neutral-400 hover:text-white"
                >
                  Holdings
                </button>

                {businessNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 border-b border-neutral-900 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'business') onNavigateView('business');
                setTimeout(() => onOpenTaxCalculator(), 100);
              }}
              className="text-left py-2 border-b border-neutral-900 hover:text-white uppercase tracking-widest text-base transition-colors text-neutral-300"
            >
              Tax Calculator
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="text-left py-2 border-b border-neutral-900 hover:text-white uppercase tracking-widest text-base transition-colors text-white font-semibold"
            >
              Consultation
            </button>
          </nav>

          {/* Bottom Links */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col gap-3">
            <a
              href="https://orthodoxwm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 text-xs font-mono border border-neutral-800 text-neutral-300 hover:text-white bg-neutral-900/80 rounded-xs"
            >
              <span>Orthodox Wealth Management</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
