import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Info, Percent, Sparkles, MessageSquare, RefreshCw } from 'lucide-react';
import { TaxType } from '../types';

interface TaxCalculatorProps {
  onOpenConsultation: (msg?: string) => void;
}

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({ onOpenConsultation }) => {
  const [taxType, setTaxType] = useState<TaxType>('corporate');

  // Corporate Tax Inputs
  const [corpGrossRevenue, setCorpGrossRevenue] = useState<number>(12000000000); // 12 M
  const [corpDeductibleExpenses, setCorpDeductibleExpenses] = useState<number>(8500000000); // 8.5 M
  const [isUMKM, setIsUMKM] = useState<boolean>(false); // Revenue <= 4.8B option

  // Personal Tax Inputs
  const [personalAnnualIncome, setPersonalAnnualIncome] = useState<number>(600000000); // 600M
  const [ptkpStatus, setPtkpStatus] = useState<string>('K/1'); // K/1 = 63M

  // Dividend Tax Inputs
  const [dividendAmount, setDividendAmount] = useState<number>(2000000000); // 2B

  // PTKP Mapping (IDR per year)
  const ptkpMap: Record<string, number> = {
    'TK/0': 54000000,
    'TK/1': 58500000,
    'TK/2': 63000000,
    'TK/3': 67500000,
    'K/0': 58500000,
    'K/1': 63000000,
    'K/2': 67500000,
    'K/3': 72000000,
  };

  // Corporate Tax Calculation
  const corpCalculations = useMemo(() => {
    const gross = Math.max(0, corpGrossRevenue);
    const expenses = Math.max(0, corpDeductibleExpenses);
    const taxableProfit = Math.max(0, gross - expenses);

    let taxRate = 0.22; // 22% statutory corporate rate
    let estimatedTax = 0;

    if (gross <= 4800000000 && isUMKM) {
      // Final PPh 0.5% gross option for UMKM
      estimatedTax = gross * 0.005;
      taxRate = 0.005;
    } else {
      estimatedTax = taxableProfit * taxRate;
    }

    const netProfitAfterTax = taxableProfit - estimatedTax;
    // Orthodox Optimization Savings potential (e.g. 15-25% via proper expense & holding structuring)
    const orthodoxOptimizedTax = estimatedTax * 0.78;
    const potentialSavings = estimatedTax - orthodoxOptimizedTax;

    return {
      gross,
      expenses,
      taxableProfit,
      taxRate,
      estimatedTax,
      netProfitAfterTax,
      potentialSavings,
    };
  }, [corpGrossRevenue, corpDeductibleExpenses, isUMKM]);

  // Personal Tax (PPh 21) Progressive Brackets Calculation
  const personalCalculations = useMemo(() => {
    const gross = Math.max(0, personalAnnualIncome);
    const ptkpVal = ptkpMap[ptkpStatus] || 54000000;
    const taxableIncome = Math.max(0, gross - ptkpVal);

    let tax = 0;
    let rem = taxableIncome;

    // Bracket 1: 0 - 60M (5%)
    if (rem > 0) {
      const tier1 = Math.min(rem, 60000000);
      tax += tier1 * 0.05;
      rem -= tier1;
    }
    // Bracket 2: 60M - 250M (15%)
    if (rem > 0) {
      const tier2 = Math.min(rem, 190000000);
      tax += tier2 * 0.15;
      rem -= tier2;
    }
    // Bracket 3: 250M - 500M (25%)
    if (rem > 0) {
      const tier3 = Math.min(rem, 250000000);
      tax += tier3 * 0.25;
      rem -= tier3;
    }
    // Bracket 4: 500M - 5B (30%)
    if (rem > 0) {
      const tier4 = Math.min(rem, 4500000000);
      tax += tier4 * 0.30;
      rem -= tier4;
    }
    // Bracket 5: > 5B (35%)
    if (rem > 0) {
      tax += rem * 0.35;
    }

    const effectiveRate = gross > 0 ? (tax / gross) * 100 : 0;
    const takeHomePay = gross - tax;

    return {
      gross,
      ptkpVal,
      taxableIncome,
      tax,
      effectiveRate,
      takeHomePay,
    };
  }, [personalAnnualIncome, ptkpStatus]);

  // Dividend Tax Calculation
  const dividendCalculations = useMemo(() => {
    const amount = Math.max(0, dividendAmount);
    const standardDividendTax = amount * 0.10; // 10% Final PPh
    const holdingExemptTax = 0; // 0% if reinvested in Indonesia under PMK / Omnibus law holding rules
    const dividendSavings = standardDividendTax - holdingExemptTax;

    return {
      amount,
      standardDividendTax,
      holdingExemptTax,
      dividendSavings,
    };
  }, [dividendAmount]);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleConsultWithCalc = () => {
    let summaryMsg = '';
    if (taxType === 'corporate') {
      summaryMsg = `Halo Orthodox Holdings, saya mencoba Tax Calculator untuk PPh Badan:\n- Omzet Kotor: ${formatIDR(corpCalculations.gross)}\n- Beban Usaha: ${formatIDR(corpCalculations.expenses)}\n- Labakena Pajak: ${formatIDR(corpCalculations.taxableProfit)}\n- Est. Pajak: ${formatIDR(corpCalculations.estimatedTax)}\n\nSaya ingin berkonsultasi mengenai Tax Optimization & Corporate Structuring.`;
    } else if (taxType === 'personal') {
      summaryMsg = `Halo Orthodox Holdings, saya mencoba Tax Calculator untuk PPh 21 Pribadi:\n- Penghasilan Tahunan: ${formatIDR(personalCalculations.gross)}\n- Status PTKP: ${ptkpStatus}\n- Est. PPh 21 Terutang: ${formatIDR(personalCalculations.tax)}\n\nSaya ingin berkonsultasi mengenai Perencanaan Pajak Pribadi & Wealth Management.`;
    } else {
      summaryMsg = `Halo Orthodox Holdings, saya mencoba Tax Calculator Dividen:\n- Nilai Dividen: ${formatIDR(dividendCalculations.amount)}\n- Est. Pajak Dividen Standard (10%): ${formatIDR(dividendCalculations.standardDividendTax)}\n\nSaya ingin berkonsultasi mengenai skema Reinvestasi Holding Company untuk bebas pajak dividen.`;
    }

    onOpenConsultation(summaryMsg);
  };

  return (
    <section id="tax-calculator" className="py-24 bg-[#0A0A0A] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-neutral-900 border border-neutral-800 font-mono text-[10px] uppercase text-neutral-400 mb-2">
              <Calculator className="w-3 h-3 text-white" />
              <span>Diagnostic Sandbox Tool</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
              Tax Diagnostic Calculator
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0">
            Rapid tax obligation estimator & Orthodox optimization preview for business owners.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-xs">
          {/* Tax Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-neutral-800">
            <button
              onClick={() => setTaxType('corporate')}
              className={`px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
                taxType === 'corporate'
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
            >
              01 // Corporate Income Tax (PPh Badan)
            </button>

            <button
              onClick={() => setTaxType('personal')}
              className={`px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
                taxType === 'personal'
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
            >
              02 // Personal Income Tax (PPh 21)
            </button>

            <button
              onClick={() => setTaxType('dividend')}
              className={`px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
                taxType === 'dividend'
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
            >
              03 // Dividend & Holding Tax Shield
            </button>
          </div>

          {/* Calculator Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Inputs Column (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {taxType === 'corporate' && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase text-neutral-400 mb-2">
                    Corporate Financial Inputs (IDR)
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Annual Gross Business Revenue (Omzet Brutoo)
                    </label>
                    <input
                      type="number"
                      step={100000000}
                      value={corpGrossRevenue}
                      onChange={(e) => setCorpGrossRevenue(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white font-mono focus:outline-none focus:border-white"
                    />
                    <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                      Formatted: {formatIDR(corpGrossRevenue)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Deductible Operational Expenses & COGS (Beban Usaha)
                    </label>
                    <input
                      type="number"
                      step={50000000}
                      value={corpDeductibleExpenses}
                      onChange={(e) => setCorpDeductibleExpenses(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white font-mono focus:outline-none focus:border-white"
                    />
                    <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                      Formatted: {formatIDR(corpDeductibleExpenses)}
                    </span>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="umkm-toggle"
                      checked={isUMKM}
                      onChange={(e) => setIsUMKM(e.target.checked)}
                      className="w-4 h-4 bg-neutral-950 border-neutral-800 text-white focus:ring-0"
                    />
                    <label htmlFor="umkm-toggle" className="text-xs text-neutral-300 font-sans cursor-pointer">
                      Use UMKM Final Rate (0.5% of Gross Revenue if Omzet ≤ Rp 4,8 Miliar)
                    </label>
                  </div>
                </div>
              )}

              {taxType === 'personal' && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase text-neutral-400 mb-2">
                    Personal Income Inputs (IDR)
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Annual Gross Personal Income / Executive Salary
                    </label>
                    <input
                      type="number"
                      step={25000000}
                      value={personalAnnualIncome}
                      onChange={(e) => setPersonalAnnualIncome(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white font-mono focus:outline-none focus:border-white"
                    />
                    <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                      Formatted: {formatIDR(personalAnnualIncome)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Non-Taxable Income Status (PTKP Indonesia)
                    </label>
                    <select
                      value={ptkpStatus}
                      onChange={(e) => setPtkpStatus(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-xs text-white font-mono focus:outline-none focus:border-white"
                    >
                      <option value="TK/0">TK/0 — Tidak Kawin, 0 Tanggungan (Rp 54 jt)</option>
                      <option value="TK/1">TK/1 — Tidak Kawin, 1 Tanggungan (Rp 58,5 jt)</option>
                      <option value="TK/2">TK/2 — Tidak Kawin, 2 Tanggungan (Rp 63 jt)</option>
                      <option value="TK/3">TK/3 — Tidak Kawin, 3 Tanggungan (Rp 67,5 jt)</option>
                      <option value="K/0">K/0 — Kawin, 0 Tanggungan (Rp 58,5 jt)</option>
                      <option value="K/1">K/1 — Kawin, 1 Tanggungan (Rp 63 jt)</option>
                      <option value="K/2">K/2 — Kawin, 2 Tanggungan (Rp 67,5 jt)</option>
                      <option value="K/3">K/3 — Kawin, 3 Tanggungan (Rp 72 jt)</option>
                    </select>
                  </div>
                </div>
              )}

              {taxType === 'dividend' && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase text-neutral-400 mb-2">
                    Dividend Distribution Inputs (IDR)
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Gross Dividend Distribution Amount
                    </label>
                    <input
                      type="number"
                      step={100000000}
                      value={dividendAmount}
                      onChange={(e) => setDividendAmount(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white font-mono focus:outline-none focus:border-white"
                    />
                    <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                      Formatted: {formatIDR(dividendAmount)}
                    </span>
                  </div>

                  <div className="p-4 bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-2">
                    <span className="font-semibold text-white font-sans block">Omnibus Law Tax Exemption Note:</span>
                    <p className="font-light leading-relaxed">
                      Dividends distributed to Indonesian domestic individual shareholders are exempt from 10% Final PPh if reinvested into qualifying domestic assets within 3 years.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Results Column (6 cols) */}
            <div className="lg:col-span-6 bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Diagnostic Calculation Breakdown
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Live Formula</span>
                </div>

                {taxType === 'corporate' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">Taxable Net Profit:</span>
                      <span className="text-white font-semibold">{formatIDR(corpCalculations.taxableProfit)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">Applied Tax Rate:</span>
                      <span className="text-white font-semibold">{(corpCalculations.taxRate * 100).toFixed(1)}%</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900 text-amber-400">
                      <span>Standard Estimated Tax:</span>
                      <span className="font-semibold">{formatIDR(corpCalculations.estimatedTax)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900 text-emerald-400 bg-emerald-950/30 px-2">
                      <span>Orthodox Optimization Potential:</span>
                      <span className="font-semibold">~ {formatIDR(corpCalculations.potentialSavings)} Savings</span>
                    </div>

                    <div className="flex justify-between py-2 border-t border-neutral-800 text-sm text-white font-bold">
                      <span>Net Retained Enterprise Profit:</span>
                      <span>{formatIDR(corpCalculations.netProfitAfterTax)}</span>
                    </div>
                  </div>
                )}

                {taxType === 'personal' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">PTKP Exemption:</span>
                      <span className="text-white font-semibold">{formatIDR(personalCalculations.ptkpVal)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">Taxable Income (PKP):</span>
                      <span className="text-white font-semibold">{formatIDR(personalCalculations.taxableIncome)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900 text-amber-400">
                      <span>Est. PPh 21 Annual Tax:</span>
                      <span className="font-semibold">{formatIDR(personalCalculations.tax)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">Effective Tax Rate:</span>
                      <span className="text-white font-semibold">{personalCalculations.effectiveRate.toFixed(2)}%</span>
                    </div>

                    <div className="flex justify-between py-2 border-t border-neutral-800 text-sm text-white font-bold">
                      <span>Net Annual Take-Home Pay:</span>
                      <span>{formatIDR(personalCalculations.takeHomePay)}</span>
                    </div>
                  </div>
                )}

                {taxType === 'dividend' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">Standard Dividend Tax (10% Final):</span>
                      <span className="text-amber-400 font-semibold">{formatIDR(dividendCalculations.standardDividendTax)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900 text-emerald-400">
                      <span>Orthodox Holding Reinvestment Shield:</span>
                      <span className="font-semibold">0% (Rp 0 Tax)</span>
                    </div>

                    <div className="flex justify-between py-2 border-t border-neutral-800 text-sm text-emerald-400 font-bold bg-emerald-950/40 p-2">
                      <span>Net Tax Shield Savings:</span>
                      <span>{formatIDR(dividendCalculations.dividendSavings)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-neutral-800">
                <button
                  onClick={handleConsultWithCalc}
                  className="w-full py-3 px-4 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Tax Diagnostic to WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
