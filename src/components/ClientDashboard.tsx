import React, { useState } from 'react';
import { MOCK_PORTFOLIO_ASSETS } from '../data/orthodoxData';
import {
  X,
  TrendingUp,
  ShieldCheck,
  Download,
  Building,
  DollarSign,
  PieChart,
  FileText,
  UserCheck,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

interface ClientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: (msg?: string) => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'tax' | 'reports'>('overview');

  if (!isOpen) return null;

  const totalValueIDR = MOCK_PORTFOLIO_ASSETS.reduce((sum, item) => sum + item.valueIDR, 0);
  const totalValueUSD = totalValueIDR / 15500; // approximate rate

  const formatCurrency = (valIDR: number) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(valIDR / 15500);
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(valIDR);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0A0A0A] border border-neutral-800 text-white w-full max-w-6xl rounded-xs my-auto max-h-[95vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        {/* Header Bar */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-black font-bold flex items-center justify-center text-xs tracking-tighter">
              OH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white font-sans uppercase tracking-wider">
                  Orthodox Holdings // Private Client Portal
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Live Portfolio Sync
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Consolidated Business & Wealth Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency Toggle */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 p-0.5 rounded-xs">
              <button
                onClick={() => setCurrency('IDR')}
                className={`px-2.5 py-1 text-[10px] font-mono ${
                  currency === 'IDR' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                IDR (Rp)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 text-[10px] font-mono ${
                  currency === 'USD' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Sub-bar */}
        <div className="px-6 py-3 border-b border-neutral-800 bg-neutral-900/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            {[
              { id: 'overview', name: 'Overview & AUM' },
              { id: 'assets', name: 'Asset Allocation' },
              { id: 'tax', name: 'Tax Efficiency' },
              { id: 'reports', name: 'Advisory Vault' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                  activeTab === tab.id
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-neutral-400 hidden sm:block">
            Client ID: <span className="text-white font-semibold">OH-8829-PRIV</span>
          </div>
        </div>

        {/* Dashboard Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 max-h-[calc(90vh-140px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Summary Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 artistic-card artistic-card-hover">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[rgba(255,255,255,0.4)] block mb-2">
                    Consolidated Portfolio Value
                  </span>
                  <div className="text-3xl font-light text-white font-sans tracking-tight mb-1">
                    {formatCurrency(totalValueIDR)}
                  </div>
                  <span className="text-xs font-mono text-[#00FF00] mt-2 block">
                    ▲ +11.4% Annual Net Growth
                  </span>
                </div>

                <div className="p-6 artistic-card artistic-card-hover">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[rgba(255,255,255,0.4)] block mb-2">
                    Blended Yield Return
                  </span>
                  <div className="text-3xl font-light text-white font-sans tracking-tight mb-1">
                    11.85% p.a.
                  </div>
                  <span className="text-xs font-mono text-neutral-400 mt-2 block">
                    Integrated Business & Wealth
                  </span>
                </div>

                <div className="p-6 artistic-card artistic-card-hover">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[rgba(255,255,255,0.4)] block mb-2">
                    Tax Efficiency Index
                  </span>
                  <div className="text-3xl font-light text-white font-sans tracking-tight mb-1">
                    92 / 100
                  </div>
                  <span className="text-xs font-mono text-[#00FF00] mt-2 block">
                    Optimal Holding Structure
                  </span>
                </div>

                <div className="p-6 artistic-card artistic-card-hover">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[rgba(255,255,255,0.4)] block mb-2">
                    Lead Advisory Partners
                  </span>
                  <div className="text-base font-medium text-white font-sans truncate mb-1">
                    Adriel L., Richi BKP, Brigitta B.
                  </div>
                  <span className="text-xs font-mono text-neutral-400 mt-2 block">
                    Orthodox Holding Directors
                  </span>
                </div>
              </div>

              {/* Asset Allocation Table */}
              <div className="artistic-card p-6">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(255,255,255,0.08)]">
                  <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-white font-semibold">
                    Asset Allocation Breakdown
                  </h4>
                  <span className="text-xs font-mono text-neutral-400">
                    5 Asset Categories
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.4)] uppercase text-[10px] tracking-wider">
                        <th className="py-2.5 px-3">Asset Holding Name</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3 text-right">Value ({currency})</th>
                        <th className="py-2.5 px-3 text-right">Share (%)</th>
                        <th className="py-2.5 px-3 text-right">Yield p.a.</th>
                        <th className="py-2.5 px-3">Tax Structuring Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(255,255,255,0.05)] text-neutral-300">
                      {MOCK_PORTFOLIO_ASSETS.map((asset, i) => (
                        <tr key={i} className="hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                          <td className="py-3 px-3 text-white font-medium">{asset.name}</td>
                          <td className="py-3 px-3 text-neutral-400">{asset.category}</td>
                          <td className="py-3 px-3 text-right font-semibold text-white">
                            {formatCurrency(asset.valueIDR)}
                          </td>
                          <td className="py-3 px-3 text-right">{asset.percentage}%</td>
                          <td className="py-3 px-3 text-right text-[#00FF00]">{asset.yieldRate}%</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 bg-neutral-950 border border-[rgba(255,255,255,0.08)] text-[10px] text-neutral-300">
                              {asset.taxStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-4">
                  <h4 className="text-sm font-semibold uppercase text-white font-sans">
                    Business Equity vs Personal Wealth Distribution
                  </h4>
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">Operating Enterprise Equity:</span>
                        <span className="text-white">58.7%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-950 overflow-hidden">
                        <div className="h-full bg-white w-[58.7%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">Commercial Real Estate:</span>
                        <span className="text-white">16.1%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-950 overflow-hidden">
                        <div className="h-full bg-neutral-400 w-[16.1%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">Corporate Cash Reserves:</span>
                        <span className="text-white">12.8%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-950 overflow-hidden">
                        <div className="h-full bg-neutral-500 w-[12.8%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">Global Wealth Trust:</span>
                        <span className="text-white">9.3%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-950 overflow-hidden">
                        <div className="h-full bg-neutral-600 w-[9.3%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-4">
                  <h4 className="text-sm font-semibold uppercase text-white font-sans">
                    Risk & Liquidity Profile
                  </h4>
                  <div className="space-y-3 font-mono text-xs text-neutral-300">
                    <div className="p-3 bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">Liquidity Ratio:</span>
                      <span className="text-white font-semibold">18.2% Liquid Cash & Market Securities</span>
                    </div>

                    <div className="p-3 bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">Capital Protection Ring:</span>
                      <span className="text-white font-semibold">Asset Protection Holding Isolation Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tax' && (
            <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-6">
              <h4 className="text-sm font-semibold uppercase text-white font-sans">
                Tax Audit & Efficiency Audit (Orthodox Standards)
              </h4>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Status: Passed</span>
                  <h5 className="text-xs font-semibold text-white">PPh Badan Corporate Compliance</h5>
                  <p className="text-[11px] text-neutral-400 font-light mt-1">
                    Annual PPh Badan filing reconciled with Big 4 audit standards.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Status: Shielded</span>
                  <h5 className="text-xs font-semibold text-white">Dividend Tax Reinvestment Shield</h5>
                  <p className="text-[11px] text-neutral-400 font-light mt-1">
                    0% PPh Final on domestic dividend distributions via Omnibus Law reinvestment.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Status: Active</span>
                  <h5 className="text-xs font-semibold text-white">Payroll PPh 21 Withholding</h5>
                  <p className="text-[11px] text-neutral-400 font-light mt-1">
                    TER (Tarif Efektif Rata-Rata) withholding compliant across executive payroll.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-4">
              <h4 className="text-sm font-semibold uppercase text-white font-sans">
                Downloadable Advisory Vault & Governance Records
              </h4>

              <div className="space-y-3">
                {[
                  { title: "Orthodox Holding — Q2 Consolidated Portfolio Valuation.pdf", date: "July 2026", size: "4.2 MB" },
                  { title: "Corporate Tax Structuring & Audit Memorandum 2026.pdf", date: "June 2026", size: "2.8 MB" },
                  { title: "Family Wealth Succession & Estate Plan Charter.pdf", date: "May 2026", size: "3.1 MB" },
                ].map((doc, idx) => (
                  <div key={idx} className="p-4 bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-semibold text-white font-mono">{doc.title}</h5>
                      <span className="text-[10px] font-mono text-neutral-500">Updated: {doc.date} | Size: {doc.size}</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading ${doc.title}`)}
                      className="px-3 py-1.5 bg-white text-black text-[11px] font-mono uppercase font-semibold hover:bg-neutral-200"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Contact Advisor Bar */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-neutral-400">
            Need bespoke changes to your portfolio structure?
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenConsultation('Halo Orthodox Holdings, saya ingin mendiskusikan penyesuaian pada Client Portfolio Dashboard.');
            }}
            className="px-4 py-2 bg-white text-black font-semibold uppercase tracking-wider hover:bg-neutral-200"
          >
            Schedule Partner Sync
          </button>
        </div>
      </div>
    </div>
  );
};
