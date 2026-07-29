import React from 'react';
import { ArrowUpRight, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
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
                Orthodox Holdings
              </span>
            </a>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Connecting business success with long-term personal wealth through an integrated advisory ecosystem.
            </p>

            <div className="pt-2">
              <a
                href="https://orthodoxwm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-600 transition-all"
              >
                <span>For more personal assistance in business: orthodoxwm.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </a>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li><a href="#problem" className="hover:text-white">The Problem We Solve</a></li>
              <li><a href="#system" className="hover:text-white">Integrated System</a></li>
              <li><a href="#leadership" className="hover:text-white">Leadership Team</a></li>
              <li><a href="#expertise" className="hover:text-white">Our Expertise</a></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Governance
            </h4>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li><a href="#ecosystem" className="hover:text-white">Ecosystem Diagram</a></li>
              <li><a href="#process" className="hover:text-white">Strategic Process</a></li>
              <li><a href="#principles" className="hover:text-white">Orthodox Principles</a></li>
              <li><a href="#tax-calculator" className="hover:text-white">Tax Calculator</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Headquarters
            </h4>
            <p className="text-neutral-400 font-light leading-relaxed">
              Orthodox Holding Private Advisory Desk<br />
              Indonesia & Australia Cross-Border Practice
            </p>
            <p className="text-neutral-400 font-mono text-[11px]">
              advisory@orthodoxwm.com
            </p>
          </div>
        </div>

        {/* Disclosures & Fine Print */}
        <div className="space-y-4 text-[11px] text-neutral-500 font-light leading-relaxed">
          <p>
            <strong>Regulatory & Entity Notice:</strong> Orthodox Business Solutions and Orthodox Wealth Management are member entities under Orthodox Holding. All advisory services, corporate tax consultations, and financial planning engagements are executed under licensed professional standards (CFP®, BKP, S.Ak, B.Bus) in compliance with relevant Indonesian and international jurisdictions.
          </p>
          <p>
            This platform serves as an integrated preview and client advisory portal inspired by BlackRock institutional design standards and directly connected to Orthodox Wealth Management (<a href="https://orthodoxwm.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">orthodoxwm.com</a>).
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} Orthodox Holding. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="https://www.linkedin.com/company/orthodox-holding"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-neutral-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/orthodoxholding"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-neutral-400" />
              <span>Instagram</span>
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
