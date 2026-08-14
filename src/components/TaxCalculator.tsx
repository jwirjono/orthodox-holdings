import React, { useState, useMemo } from 'react';
import { Calculator, MessageSquare } from 'lucide-react';
import { TaxType } from '../types';
import { useTranslation, format } from '../i18n';

interface TaxCalculatorProps {
  onOpenConsultation: (msg?: string) => void;
}

// PPh Pasal 21 Tarif Efektif Rata-rata (TER) Bulanan — PP 58/2023 & PMK 168/2023 (berlaku 1 Jan 2024)
// Each tuple is [upper bound of monthly gross bracket in IDR, rate in %]. Final bracket is unbounded.
type TERBracket = [number, number];

const TER_CATEGORY_MAP: Record<string, 'A' | 'B' | 'C'> = {
  'TK/0': 'A', 'TK/1': 'A', 'K/0': 'A',
  'TK/2': 'B', 'TK/3': 'B', 'K/1': 'B', 'K/2': 'B',
  'K/3': 'C',
};

const TER_TABLE_A: TERBracket[] = [
  [5400000, 0], [5650000, 0.25], [5950000, 0.5], [6300000, 0.75], [6750000, 1],
  [7500000, 1.25], [8550000, 1.5], [9650000, 1.75], [10050000, 2], [10350000, 2.25],
  [10700000, 2.5], [11050000, 3], [11600000, 3.5], [12500000, 4], [13750000, 5],
  [15100000, 6], [16950000, 7], [19750000, 8], [24150000, 9], [26450000, 10],
  [28000000, 11], [30050000, 12], [32400000, 13], [35400000, 14], [39100000, 15],
  [43850000, 16], [47800000, 17], [51400000, 18], [56300000, 19], [62200000, 20],
  [68600000, 21], [77500000, 22], [89000000, 23], [103000000, 24], [125000000, 25],
  [157000000, 26], [206000000, 27], [337000000, 28], [454000000, 29], [550000000, 30],
  [695000000, 31], [910000000, 32], [1400000000, 33], [Infinity, 34],
];

const TER_TABLE_B: TERBracket[] = [
  [6200000, 0], [6500000, 0.25], [6850000, 0.5], [7300000, 0.75], [9200000, 1],
  [10750000, 1.5], [11250000, 2], [11600000, 2.5], [12600000, 3], [13600000, 4],
  [14950000, 5], [16400000, 6], [18450000, 7], [21850000, 8], [26000000, 9],
  [27700000, 10], [29350000, 11], [31450000, 12], [33950000, 13], [37100000, 14],
  [41100000, 15], [45800000, 16], [49500000, 17], [53800000, 18], [58500000, 19],
  [64000000, 20], [71000000, 21], [80000000, 22], [93000000, 23], [109000000, 24],
  [129000000, 25], [163000000, 26], [211000000, 27], [374000000, 28], [459000000, 29],
  [555000000, 30], [704000000, 31], [957000000, 32], [1405000000, 33], [Infinity, 34],
];

const TER_TABLE_C: TERBracket[] = [
  [6600000, 0], [6950000, 0.25], [7350000, 0.5], [7800000, 0.75], [8850000, 1],
  [9800000, 1.25], [10950000, 1.5], [11200000, 1.75], [12050000, 2], [12950000, 3],
  [14150000, 4], [15550000, 5], [17050000, 6], [19500000, 7], [22700000, 8],
  [26600000, 9], [28100000, 10], [30100000, 11], [32600000, 12], [35400000, 13],
  [38900000, 14], [43000000, 15], [47400000, 16], [51200000, 17], [55800000, 18],
  [60400000, 19], [66700000, 20], [74500000, 21], [83200000, 22], [95600000, 23],
  [110000000, 24], [134000000, 25], [169000000, 26], [221000000, 27], [390000000, 28],
  [463000000, 29], [561000000, 30], [709000000, 31], [965000000, 32], [1419000000, 33],
  [Infinity, 34],
];

const getTERRate = (monthlyGross: number, table: TERBracket[]): number => {
  const bracket = table.find(([upperBound]) => monthlyGross <= upperBound);
  return (bracket ? bracket[1] : table[table.length - 1][1]) / 100;
};

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({ onOpenConsultation }) => {
  const t = useTranslation();
  const [taxType, setTaxType] = useState<TaxType>('corporate');

  // Corporate Tax Inputs
  const [corpGrossRevenue, setCorpGrossRevenue] = useState<number>(12000000000); // 12 M
  const [corpDeductibleExpenses, setCorpDeductibleExpenses] = useState<number>(8500000000); // 8.5 M
  const [isUMKM, setIsUMKM] = useState<boolean>(false); // Revenue <= 4.8B option

  // Personal Tax Inputs
  const [personalAnnualIncome, setPersonalAnnualIncome] = useState<number>(600000000); // 600M
  const [ptkpStatus, setPtkpStatus] = useState<string>('K/1'); // K/1 = 63M
  const [monthlyPensionContribution, setMonthlyPensionContribution] = useState<number>(0); // Iuran pensiun/JHT dibayar sendiri

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

  // Personal Tax (PPh 21) — TER Bulanan (PP 58/2023 & PMK 168/2023) with Masa Pajak Terakhir (December) reconciliation
  const personalCalculations = useMemo(() => {
    const gross = Math.max(0, personalAnnualIncome);
    const monthlyGross = gross / 12;

    // Step 1: Monthly withholding (Jan-Nov) uses the TER Bulanan rate for the PTKP category
    const terCategory = TER_CATEGORY_MAP[ptkpStatus] || 'A';
    const terTable = terCategory === 'A' ? TER_TABLE_A : terCategory === 'B' ? TER_TABLE_B : TER_TABLE_C;
    const terRate = getTERRate(monthlyGross, terTable);
    const monthlyWithholding = monthlyGross * terRate;
    const withheldJanNov = monthlyWithholding * 11;

    // Step 2: Masa Pajak Terakhir (December) reconciliation using Tarif Pasal 17
    const biayaJabatan = Math.min(gross * 0.05, 6000000); // 5%, max Rp6.000.000/tahun
    const iuranPensiunAnnual = Math.max(0, monthlyPensionContribution) * 12;
    const netAnnualIncome = Math.max(0, gross - biayaJabatan - iuranPensiunAnnual);

    const ptkpVal = ptkpMap[ptkpStatus] || 54000000;
    const taxableIncome = Math.max(0, netAnnualIncome - ptkpVal);

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

    const annualTax = tax; // PPh Pasal 21 terutang setahun
    const decemberWithholding = annualTax - withheldJanNov; // PPh 21 masa pajak terakhir (bisa lebih bayar/negatif)
    const effectiveRate = gross > 0 ? (annualTax / gross) * 100 : 0;
    const takeHomePay = gross - annualTax;

    return {
      gross,
      monthlyGross,
      terCategory,
      terRate,
      monthlyWithholding,
      withheldJanNov,
      biayaJabatan,
      iuranPensiunAnnual,
      netAnnualIncome,
      ptkpVal,
      taxableIncome,
      annualTax,
      decemberWithholding,
      effectiveRate,
      takeHomePay,
    };
  }, [personalAnnualIncome, ptkpStatus, monthlyPensionContribution]);

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

  // IDR is always formatted with Indonesian conventions regardless of interface language.
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
      summaryMsg = format(t.taxCalculator.whatsapp.corporate, {
        gross: formatIDR(corpCalculations.gross),
        expenses: formatIDR(corpCalculations.expenses),
        taxableProfit: formatIDR(corpCalculations.taxableProfit),
        estimatedTax: formatIDR(corpCalculations.estimatedTax),
      });
    } else if (taxType === 'personal') {
      summaryMsg = format(t.taxCalculator.whatsapp.personal, {
        gross: formatIDR(personalCalculations.gross),
        ptkp: ptkpStatus,
        category: personalCalculations.terCategory,
        annualTax: formatIDR(personalCalculations.annualTax),
      });
    } else {
      summaryMsg = format(t.taxCalculator.whatsapp.dividend, {
        amount: formatIDR(dividendCalculations.amount),
        standardTax: formatIDR(dividendCalculations.standardDividendTax),
      });
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
              <span>{t.taxCalculator.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
              {t.taxCalculator.title}
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0">
            {t.taxCalculator.subtitle}
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
              {t.taxCalculator.tabCorporate}
            </button>

            <button
              onClick={() => setTaxType('personal')}
              className={`px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
                taxType === 'personal'
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {t.taxCalculator.tabPersonal}
            </button>

            <button
              onClick={() => setTaxType('dividend')}
              className={`px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
                taxType === 'dividend'
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {t.taxCalculator.tabDividend}
            </button>
          </div>

          {/* Calculator Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Inputs Column (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {taxType === 'corporate' && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase text-neutral-400 mb-2">
                    {t.taxCalculator.corporate.inputsTitle}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      {t.taxCalculator.corporate.grossRevenue}
                    </label>
                    <input
                      type="number"
                      step={100000000}
                      value={corpGrossRevenue}
                      onChange={(e) => setCorpGrossRevenue(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white font-mono focus:outline-none focus:border-white"
                    />
                    <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                      {t.taxCalculator.formatted} {formatIDR(corpGrossRevenue)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      {t.taxCalculator.corporate.expenses}
                    </label>
                    <input
                      type="number"
                      step={50000000}
                      value={corpDeductibleExpenses}
                      onChange={(e) => setCorpDeductibleExpenses(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white font-mono focus:outline-none focus:border-white"
                    />
                    <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                      {t.taxCalculator.formatted} {formatIDR(corpDeductibleExpenses)}
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
                      {t.taxCalculator.corporate.umkmToggle}
                    </label>
                  </div>
                </div>
              )}

              {taxType === 'personal' && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase text-neutral-400 mb-2">
                    {t.taxCalculator.personal.inputsTitle}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      {t.taxCalculator.personal.annualIncome}
                    </label>
                    <input
                      type="number"
                      step={25000000}
                      value={personalAnnualIncome}
                      onChange={(e) => setPersonalAnnualIncome(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white font-mono focus:outline-none focus:border-white"
                    />
                    <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                      {t.taxCalculator.formatted} {formatIDR(personalAnnualIncome)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      {t.taxCalculator.personal.ptkpStatus}
                    </label>
                    <select
                      value={ptkpStatus}
                      onChange={(e) => setPtkpStatus(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-xs text-white font-mono focus:outline-none focus:border-white"
                    >
                      {t.taxCalculator.personal.ptkpOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      {t.taxCalculator.personal.pensionContribution}
                    </label>
                    <input
                      type="number"
                      step={50000}
                      value={monthlyPensionContribution}
                      onChange={(e) => setMonthlyPensionContribution(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white font-mono focus:outline-none focus:border-white"
                    />
                    <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                      {t.taxCalculator.formatted} {formatIDR(monthlyPensionContribution)}{' '}
                      {t.taxCalculator.personal.pensionHint}
                    </span>
                  </div>

                  <div className="p-4 bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-2">
                    <span className="font-semibold text-white font-sans block">
                      {t.taxCalculator.personal.terNoteTitle}
                    </span>
                    <p className="font-light leading-relaxed">
                      {t.taxCalculator.personal.terNoteBody}
                    </p>
                  </div>
                </div>
              )}

              {taxType === 'dividend' && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase text-neutral-400 mb-2">
                    {t.taxCalculator.dividend.inputsTitle}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      {t.taxCalculator.dividend.grossDividend}
                    </label>
                    <input
                      type="number"
                      step={100000000}
                      value={dividendAmount}
                      onChange={(e) => setDividendAmount(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-white font-mono focus:outline-none focus:border-white"
                    />
                    <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                      {t.taxCalculator.formatted} {formatIDR(dividendAmount)}
                    </span>
                  </div>

                  <div className="p-4 bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-2">
                    <span className="font-semibold text-white font-sans block">
                      {t.taxCalculator.dividend.omnibusNoteTitle}
                    </span>
                    <p className="font-light leading-relaxed">
                      {t.taxCalculator.dividend.omnibusNoteBody}
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
                    {t.taxCalculator.breakdownTitle}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {t.taxCalculator.liveFormula}
                  </span>
                </div>

                {taxType === 'corporate' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">{t.taxCalculator.corporate.taxableProfit}</span>
                      <span className="text-white font-semibold">{formatIDR(corpCalculations.taxableProfit)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">{t.taxCalculator.corporate.appliedRate}</span>
                      <span className="text-white font-semibold">{(corpCalculations.taxRate * 100).toFixed(1)}%</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900 text-amber-400">
                      <span>{t.taxCalculator.corporate.standardTax}</span>
                      <span className="font-semibold">{formatIDR(corpCalculations.estimatedTax)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900 text-emerald-400 bg-emerald-950/30 px-2">
                      <span>{t.taxCalculator.corporate.optimizationPotential}</span>
                      <span className="font-semibold">
                        ~ {formatIDR(corpCalculations.potentialSavings)}{' '}
                        {t.taxCalculator.corporate.savingsSuffix}
                      </span>
                    </div>

                    <div className="flex justify-between py-2 border-t border-neutral-800 text-sm text-white font-bold">
                      <span>{t.taxCalculator.corporate.netProfit}</span>
                      <span>{formatIDR(corpCalculations.netProfitAfterTax)}</span>
                    </div>
                  </div>
                )}

                {taxType === 'personal' && (
                  <div className="space-y-3 font-mono text-xs">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block pt-1">
                      {t.taxCalculator.personal.step1}
                    </span>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">{t.taxCalculator.personal.monthlyGross}</span>
                      <span className="text-white font-semibold">{formatIDR(personalCalculations.monthlyGross)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">{t.taxCalculator.personal.terCategory}</span>
                      <span className="text-white font-semibold">
                        {t.taxCalculator.personal.categoryPrefix} {personalCalculations.terCategory}
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">{t.taxCalculator.personal.terRate}</span>
                      <span className="text-white font-semibold">{(personalCalculations.terRate * 100).toFixed(2)}%</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900 text-amber-400">
                      <span>{t.taxCalculator.personal.monthlyWithholding}</span>
                      <span className="font-semibold">{formatIDR(personalCalculations.monthlyWithholding)}</span>
                    </div>

                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block pt-3">
                      {t.taxCalculator.personal.step2}
                    </span>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">{t.taxCalculator.personal.biayaJabatan}</span>
                      <span className="text-white font-semibold">{formatIDR(personalCalculations.biayaJabatan)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">{t.taxCalculator.personal.netAnnualIncome}</span>
                      <span className="text-white font-semibold">{formatIDR(personalCalculations.netAnnualIncome)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">{t.taxCalculator.personal.ptkpExemption}</span>
                      <span className="text-white font-semibold">{formatIDR(personalCalculations.ptkpVal)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">{t.taxCalculator.personal.taxableIncome}</span>
                      <span className="text-white font-semibold">{formatIDR(personalCalculations.taxableIncome)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900 text-amber-400">
                      <span>{t.taxCalculator.personal.annualTax}</span>
                      <span className="font-semibold">{formatIDR(personalCalculations.annualTax)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">
                        {personalCalculations.decemberWithholding >= 0
                          ? t.taxCalculator.personal.decemberWithholding
                          : t.taxCalculator.personal.refund}
                      </span>
                      <span className="text-white font-semibold">{formatIDR(Math.abs(personalCalculations.decemberWithholding))}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">{t.taxCalculator.personal.effectiveRate}</span>
                      <span className="text-white font-semibold">{personalCalculations.effectiveRate.toFixed(2)}%</span>
                    </div>

                    <div className="flex justify-between py-2 border-t border-neutral-800 text-sm text-white font-bold">
                      <span>{t.taxCalculator.personal.takeHome}</span>
                      <span>{formatIDR(personalCalculations.takeHomePay)}</span>
                    </div>
                  </div>
                )}

                {taxType === 'dividend' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-400">{t.taxCalculator.dividend.standardTax}</span>
                      <span className="text-amber-400 font-semibold">{formatIDR(dividendCalculations.standardDividendTax)}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-neutral-900 text-emerald-400">
                      <span>{t.taxCalculator.dividend.shield}</span>
                      <span className="font-semibold">{t.taxCalculator.dividend.shieldValue}</span>
                    </div>

                    <div className="flex justify-between py-2 border-t border-neutral-800 text-sm text-emerald-400 font-bold bg-emerald-950/40 p-2">
                      <span>{t.taxCalculator.dividend.netSavings}</span>
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
                  <span>{t.taxCalculator.sendToWhatsapp}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
