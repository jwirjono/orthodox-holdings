import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Menu, X, MessageSquare, Linkedin, Instagram } from 'lucide-react';

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

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const businessNavLinks = [
    { name: 'About', href: '#whoweare' },
    { name: 'Services', href: '#expertise' },
    { name: 'Contact', href: '#consultation' },
  ];

  const mobileMenuOverlay = mobileMenuOpen
    ? createPortal(
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A] text-white flex flex-col justify-between p-6 overflow-y-auto font-sans">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateView('holding');
              }}
              className="flex items-center gap-3 text-left"
            >
              <div className="w-9 h-9 bg-white text-black flex items-center justify-center font-bold tracking-tighter rounded-xs">
                <span className="text-sm font-semibold">OH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-[0.2em] text-white uppercase font-sans">
                  Orthodox Holdings
                </span>
                <span className="text-[10px] text-neutral-400 tracking-wider uppercase font-mono">
                  {currentView === 'holding' ? 'Integrated Ecosystem' : 'Business Solutions'}
                </span>
              </div>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-white focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Navigation Links inside Mobile Overlay */}
          <nav className="flex flex-col my-auto py-6 space-y-4 font-sans">
            {/* View Switching Section */}
            <div className="flex flex-col gap-2 pb-5 border-b border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Select View
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateView('holding');
                  }}
                  className={`py-2.5 px-3 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between ${
                    currentView === 'holding'
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-300 bg-neutral-900 border border-neutral-800 hover:text-white'
                  }`}
                >
                  <span>Holdings</span>
                  {currentView === 'holding' && <span className="text-[10px]">✓</span>}
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateView('business');
                  }}
                  className={`py-2.5 px-3 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between ${
                    currentView === 'business'
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-300 bg-neutral-900 border border-neutral-800 hover:text-white'
                  }`}
                >
                  <span>Business</span>
                  {currentView === 'business' && <span className="text-[10px]">✓</span>}
                </button>
              </div>
            </div>

            {/* Navigation links based on current view */}
            <div className="flex flex-col space-y-3 pt-2">
              {currentView === 'business' && (
                <>
                  {businessNavLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 border-b border-neutral-900 text-sm uppercase tracking-widest text-neutral-200 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (currentView !== 'business') onNavigateView('business');
                      setTimeout(() => onOpenTaxCalculator(), 100);
                    }}
                    className="text-left py-2.5 border-b border-neutral-900 text-sm uppercase tracking-widest text-neutral-200 hover:text-white transition-colors"
                  >
                    Tax Calculator
                  </button>
                </>
              )}

              {/* Consultation CTA inside Burger Menu */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full py-3 px-4 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 rounded-xs shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Consultation</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Bottom Social Links & Wealth Management Link */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col gap-4">
            <a
              href="https://orthodoxwm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 text-xs font-mono border border-neutral-800 text-neutral-300 hover:text-white bg-neutral-900/80 rounded-xs"
            >
              <span>Orthodox Wealth Management</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400" />
            </a>

            {/* Social Links at Bottom */}
            <div className="flex items-center justify-between pt-2 text-xs text-neutral-400 font-mono">
              <span className="text-neutral-500 text-[11px]">Follow Us</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/company/orthodox-holding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-neutral-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/orthodoxholding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-neutral-400" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-neutral-800/80 py-3'
          : 'bg-[#0A0A0A]/90 backdrop-blur-xs py-3.5 border-b border-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand Monogram & Name */}
          <button
            onClick={() => onNavigateView('holding')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white text-black flex items-center justify-center font-bold tracking-tighter transition-transform duration-300 group-hover:bg-neutral-200 rounded-xs shrink-0">
              <span className="text-xs sm:text-sm font-semibold">OH</span>
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="text-sm sm:text-md font-semibold tracking-[0.2em] text-white uppercase font-sans">
                Orthodox Holdings
              </span>
              <span className="text-[10px] text-neutral-400 tracking-wider font-mono uppercase">
                {currentView === 'holding' ? 'Integrated Ecosystem' : 'Business Solutions'}
              </span>
            </div>
          </button>

          {/* Holdings / Business Solutions Toggle Buttons - Visible on Mobile & Desktop */}
          <div className="flex items-center gap-2 sm:gap-4">
            <nav className="flex items-center gap-1 bg-neutral-900/90 border border-neutral-800 p-1 rounded-xs text-[11px] sm:text-xs font-mono uppercase tracking-wider">
              <button
                onClick={() => onNavigateView('holding')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 transition-all rounded-xs ${
                  currentView === 'holding'
                    ? 'bg-white text-black font-semibold shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Holdings
              </button>
              <button
                onClick={() => onNavigateView('business')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 transition-all rounded-xs ${
                  currentView === 'business'
                    ? 'bg-white text-black font-semibold shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Business Solutions</span>
                <span className="sm:hidden">Business</span>
              </button>
            </nav>

            {/* Desktop Nav Links + Consultation CTA */}
            <div className="hidden lg:flex items-center space-x-6">
              <nav className="flex items-center space-x-6 text-xs font-medium uppercase tracking-wider text-neutral-400">
                {currentView === 'business' &&
                  businessNavLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="hover:text-white transition-colors py-1 hover:border-b hover:border-white"
                    >
                      {link.name}
                    </a>
                  ))}
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

            {/* Mobile Burger Menu Button (Visible on < lg screens) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white lg:hidden focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu is rendered via portal directly into document.body */}
      {mobileMenuOverlay}
    </header>
  );
};
