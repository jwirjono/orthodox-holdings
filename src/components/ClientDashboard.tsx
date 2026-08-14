import React, { useState, useMemo } from 'react';
import { getPortfolioAssets } from '../data/orthodoxData';
import { X } from 'lucide-react';
import { useTranslation, format } from '../i18n';

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
  const t = useTranslation();
  const portfolioAssets = useMemo(() => getPortfolioAssets(t), [t]);

  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'tax' | 'reports'>('overview');

  if (!isOpen) return null;

  const totalValueIDR = portfolioAssets.reduce((sum, item) => sum + item.valueIDR, 0);

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

  const tabs = [
    { id: 'overview' as const, name: t.dashboard.tabs.overview },
    { id: 'assets' as const, name: t.dashboard.tabs.assets },
    { id: 'tax' as const, name: t.dashboard.tabs.tax },
    { id: 'reports' as const, name: t.dashboard.tabs.reports },
  ];

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
                  {t.dashboard.portalTitle}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {t.dashboard.liveSync}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                {t.dashboard.portalSubtitle}
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
              aria-label={t.dashboard.close}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Sub-bar */}
        <div className="px-6 py-3 border-b border-neutral-800 bg-neutral-900/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
            {t.dashboard.clientId} <span className="text-white font-semibold">OH-8829-PRIV</span>
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
                    {t.dashboard.metrics.portfolioValue}
                  </span>
                  <div className="text-3xl font-light text-white font-sans tracking-tight mb-1">
                    {formatCurrency(totalValueIDR)}
                  </div>
                  <span className="text-xs font-mono text-[#00FF00] mt-2 block">
                    {t.dashboard.metrics.portfolioGrowth}
                  </span>
                </div>

                <div className="p-6 artistic-card artistic-card-hover">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[rgba(255,255,255,0.4)] block mb-2">
                    {t.dashboard.metrics.blendedYield}
                  </span>
                  <div className="text-3xl font-light text-white font-sans tracking-tight mb-1">
                    11.85% p.a.
                  </div>
                  <span className="text-xs font-mono text-neutral-400 mt-2 block">
                    {t.dashboard.metrics.blendedYieldNote}
                  </span>
                </div>

                <div className="p-6 artistic-card artistic-card-hover">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[rgba(255,255,255,0.4)] block mb-2">
                    {t.dashboard.metrics.taxEfficiency}
                  </span>
                  <div className="text-3xl font-light text-white font-sans tracking-tight mb-1">
                    92 / 100
                  </div>
                  <span className="text-xs font-mono text-[#00FF00] mt-2 block">
                    {t.dashboard.metrics.taxEfficiencyNote}
                  </span>
                </div>

                <div className="p-6 artistic-card artistic-card-hover">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[rgba(255,255,255,0.4)] block mb-2">
                    {t.dashboard.metrics.leadPartners}
                  </span>
                  <div className="text-base font-medium text-white font-sans truncate mb-1">
                    Adriel L., Richi BKP, Brigitta B.
                  </div>
                  <span className="text-xs font-mono text-neutral-400 mt-2 block">
                    {t.dashboard.metrics.leadPartnersNote}
                  </span>
                </div>
              </div>

              {/* Asset Allocation Table */}
              <div className="artistic-card p-6">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(255,255,255,0.08)]">
                  <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-white font-semibold">
                    {t.dashboard.allocation.title}
                  </h4>
                  <span className="text-xs font-mono text-neutral-400">
                    {format(t.dashboard.allocation.categoriesCount, { count: portfolioAssets.length })}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.4)] uppercase text-[10px] tracking-wider">
                        <th className="py-2.5 px-3">{t.dashboard.allocation.colName}</th>
                        <th className="py-2.5 px-3">{t.dashboard.allocation.colCategory}</th>
                        <th className="py-2.5 px-3 text-right">
                          {format(t.dashboard.allocation.colValue, { currency })}
                        </th>
                        <th className="py-2.5 px-3 text-right">{t.dashboard.allocation.colShare}</th>
                        <th className="py-2.5 px-3 text-right">{t.dashboard.allocation.colYield}</th>
                        <th className="py-2.5 px-3">{t.dashboard.allocation.colTaxStatus}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(255,255,255,0.05)] text-neutral-300">
                      {portfolioAssets.map((asset) => (
                        <tr key={asset.id} className="hover:bg-[rgba(255,255,255,0.03)] transition-colors">
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
                    {t.dashboard.assetsTab.distributionTitle}
                  </h4>
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">{t.dashboard.assetsTab.operatingEquity}</span>
                        <span className="text-white">58.7%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-950 overflow-hidden">
                        <div className="h-full bg-white w-[58.7%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">{t.dashboard.assetsTab.realEstate}</span>
                        <span className="text-white">16.1%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-950 overflow-hidden">
                        <div className="h-full bg-neutral-400 w-[16.1%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">{t.dashboard.assetsTab.cashReserves}</span>
                        <span className="text-white">12.8%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-950 overflow-hidden">
                        <div className="h-full bg-neutral-500 w-[12.8%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">{t.dashboard.assetsTab.globalTrust}</span>
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
                    {t.dashboard.assetsTab.riskTitle}
                  </h4>
                  <div className="space-y-3 font-mono text-xs text-neutral-300">
                    <div className="p-3 bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">
                        {t.dashboard.assetsTab.liquidityRatio}
                      </span>
                      <span className="text-white font-semibold">
                        {t.dashboard.assetsTab.liquidityValue}
                      </span>
                    </div>

                    <div className="p-3 bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">
                        {t.dashboard.assetsTab.protectionRing}
                      </span>
                      <span className="text-white font-semibold">
                        {t.dashboard.assetsTab.protectionValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tax' && (
            <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-6">
              <h4 className="text-sm font-semibold uppercase text-white font-sans">
                {t.dashboard.taxTab.title}
              </h4>

              <div className="grid md:grid-cols-3 gap-4">
                {t.dashboard.taxTab.cards.map((card, idx) => (
                  <div key={idx} className="p-4 bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">
                      {card.status}
                    </span>
                    <h5 className="text-xs font-semibold text-white">{card.title}</h5>
                    <p className="text-[11px] text-neutral-400 font-light mt-1">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-4">
              <h4 className="text-sm font-semibold uppercase text-white font-sans">
                {t.dashboard.reportsTab.title}
              </h4>

              <div className="space-y-3">
                {t.dashboard.reportsTab.documents.map((doc, idx) => (
                  <div key={idx} className="p-4 bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-semibold text-white font-mono">{doc.title}</h5>
                      <span className="text-[10px] font-mono text-neutral-500">
                        {t.dashboard.reportsTab.updated} {doc.date} | {t.dashboard.reportsTab.size} {doc.size}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        alert(format(t.dashboard.reportsTab.downloadingAlert, { title: doc.title }))
                      }
                      className="px-3 py-1.5 bg-white text-black text-[11px] font-mono uppercase font-semibold hover:bg-neutral-200"
                    >
                      {t.dashboard.reportsTab.download}
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
            {t.dashboard.footerPrompt}
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenConsultation(t.dashboard.scheduleMessage);
            }}
            className="px-4 py-2 bg-white text-black font-semibold uppercase tracking-wider hover:bg-neutral-200"
          >
            {t.dashboard.schedulePartnerSync}
          </button>
        </div>
      </div>
    </div>
  );
};
