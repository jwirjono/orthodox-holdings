import {
  ProblemItem,
  LeadershipProfile,
  ServiceItem,
  EcosystemNode,
  PrincipleItem,
  ProcessStep,
  PortfolioAsset,
} from '../types';

import profileAdriel from '../assets/images/profile_adriel_1784984879215.jpg';
import profileDominicus from '../assets/images/profile_dominicus_1784984892548.jpg';
import profileBrigitta from '../assets/images/profile_brigitta_1784984906723.jpg';

export const HERO_DATA = {
  tagline: "Integrated Solutions. Sustainable Growth.",
  heading: "Business success is never created by accounting, tax, or strategy alone.",
  subheading: "It is built when finance, taxation, operations, governance, funding, and ownership structures work together as one integrated business system.",
  paragraph1: "Orthodox Business Solutions partners with ambitious business owners to build profitable, scalable, and sustainable businesses—connecting every business decision into one coordinated strategy while extending beyond the business through our integrated wealth advisory ecosystem.",
  paragraph2: "As part of Orthodox Holding, we work alongside Orthodox Wealth Management to provide business owners with one integrated advisory ecosystem—connecting business success with long-term personal wealth.",
  trustIndicators: [
    { value: "100+", label: "Business Engagements" },
    { value: "Multi-Industry", label: "Advisory Experience" },
    { value: "1 Ecosystem", label: "Integrated Business & Wealth" },
    { value: "Big 4 & International", label: "Leadership Standard" }
  ]
};

export const PROBLEM_ITEMS: ProblemItem[] = [
  {
    id: "siloed-tax-finance",
    title: "Siloed Accounting & Tax Decisions",
    siloDescription: "Accounting focuses purely on backward-looking compliance, while tax advisors reactively manage tax filing without understanding broader corporate strategy.",
    rippleEffect: "A tax structure designed in isolation often chokes operational cash flow, restricts dividend distributions, and exposes the owner to unnecessary personal liability.",
    whatsappMessage: "Halo Orthodox Holdings, saya ingin berkonsultasi mengenai tantangan integrasi antara Akuntansi & Perpajakan dengan strategi keuangan bisnis saya."
  },
  {
    id: "capital-debt-structure",
    title: "Uncoordinated Financing & Bank Debt",
    siloDescription: "Bankers and brokers focus solely on securing loans, ignoring how debt service ratios strain working capital or alter shareholder equity value.",
    rippleEffect: "Suboptimal debt covenants limit expansion capacity, increase cost of capital, and negatively impact future valuation during investment rounds or M&A.",
    whatsappMessage: "Halo Orthodox Holdings, saya ingin berkonsultasi mengenai restrukturisasi pendanaan bisnis dan skema perbankan yang lebih efisien."
  },
  {
    id: "governance-ownership-silos",
    title: "Fragile Ownership & Succession Structures",
    siloDescription: "Lawyers draft legal agreements in isolation from tax rules and family wealth preservation goals.",
    rippleEffect: "Poor ownership design causes internal shareholder friction, tax drag on share transfers, and unpredictable value destruction during business succession.",
    whatsappMessage: "Halo Orthodox Holdings, saya membutuhkan arahan terkait Corporate Structuring, legalitas kepemilikan, dan perencanaaan suksesi bisnis."
  },
  {
    id: "business-to-personal-wealth",
    title: "Disconnected Business & Personal Wealth",
    siloDescription: "Most advisory firms stop at the business balance sheet, leaving the owner's personal wealth, estate, and asset protection unaligned.",
    rippleEffect: "High business profits do not automatically translate into secure family wealth if personal tax planning, estate protection, and dividend strategies are neglected.",
    whatsappMessage: "Halo Orthodox Holdings, saya ingin berkonsultasi mengenai strategi menghubungkan keuntungan bisnis ke dalam perlindungan kekayaan pribadi (Orthodox Wealth Management)."
  },
  {
    id: "tax-dispute-audit",
    title: "Corporate Tax Disputes & Audit Exposure",
    siloDescription: "Standard accounting teams lack audit litigation experience, treating tax audits as routine administrative queries rather than existential risks.",
    rippleEffect: "Unresolved tax audit findings lead to heavy penalties, cash drain, prolonged litigation, and reputational damage.",
    whatsappMessage: "Halo Orthodox Holdings, kami membutuhkan pendampingan profesional untuk Corporate Tax Dispute Resolution dan mitigasi pemeriksaan pajak."
  }
];

export const INTEGRATED_STEPS = [
  { step: "01", name: "Strategy", detail: "Defining long-term corporate vision, market positioning, and capital goals." },
  { step: "02", name: "Finance", detail: "Structuring cash flow engines, budgeting, KPI systems, and working capital." },
  { step: "03", name: "Tax", detail: "Designing tax-efficient corporate structures and compliant tax optimization." },
  { step: "04", name: "Operations", detail: "Streamlining processes, internal controls, payroll, and execution governance." },
  { step: "05", name: "Growth", detail: "Funding recommendations, valuation enhancement, and strategic expansion." },
  { step: "06", name: "Owner Wealth", detail: "Transitioning business value into personal wealth, estate, and asset protection via Orthodox Wealth Management." }
];

export const LEADERSHIP_PROFILES: LeadershipProfile[] = [
  {
    id: "adriel-louis",
    name: "Adriel Reynaldo Louis, B.Bus, CFP®, CTM",
    title: "Managing Partner",
    role: "Business Strategy & Financial Architecture",
    image: profileAdriel,
    credentials: [
      "B.Bus (Bachelor of Business)",
      "CFP® (Certified Financial Planner)",
      "CTM (Certified Toastmaster)",
      "Cross-border experience across Australia & Indonesia"
    ],
    philosophy: "Every financial and business decision should strengthen the next.",
    bio: "With professional experience across Australia and Indonesia, Adriel specialises in integrating business strategy with financial architecture. His philosophy remains consistent across both Orthodox Business Solutions and Orthodox Wealth Management: Rather than viewing businesses and personal wealth separately, he helps entrepreneurs build a complete financial ecosystem where business success ultimately translates into long-term family wealth.",
    highlights: [
      "Cross-border financial architecture across Australia & Indonesia",
      "Specialist in bridging corporate strategy with personal estate planning",
      "Managing Partner driving the unified Orthodox Holding ecosystem"
    ]
  },
  {
    id: "dominicus-richardo",
    name: "Dominicus Richardo, S.M., BKP",
    title: "Partner & Tax Director",
    role: "Tax Advisory, Accounting & Legal Administration",
    image: profileDominicus,
    credentials: [
      "S.M. (Bachelor of Management)",
      "BKP (Bersertifikat Konsultan Pajak - Certified Tax Consultant)",
      "Prasetiya Mulya Business School Alumnus",
      "Entrepreneur & Practitioner Background"
    ],
    philosophy: "Good advice isn't just technically correct — it's adaptive, timely, and built around where the client is and where they want to go.",
    bio: "With a foundation built through entrepreneurship and formal training at Prasetiya Mulya — one of Indonesia's premier business schools — Richi brings a practitioner's lens to tax and business advisory. Having built and run his own businesses before entering professional services, he understands firsthand the decisions entrepreneurs face at every stage of growth. Specialising in tax, accounting, finance, and legal administration, Richi helps clients navigate complexity with solutions that are grounded in integrity.",
    highlights: [
      "Licensed Tax Consultant (BKP) with practitioner entrepreneur insight",
      "Deep expertise in corporate tax disputes, tax structuring, and compliance",
      "End-to-end legal administration and financial governance"
    ]
  },
  {
    id: "brigitta-bunga",
    name: "Brigitta Bunga, S.Ak",
    title: "Accounting Advisory Director",
    role: "Financial Audit, Risk & Compliance",
    image: profileBrigitta,
    credentials: [
      "S.Ak (Bachelor of Accounting)",
      "4 Years Big 4 External Auditor Experience in Indonesia",
      "Financial Audit & Risk Assessment Specialist",
      "Regulatory Compliance Specialist"
    ],
    philosophy: "Precision in financial visibility is the bedrock of strategic enterprise value.",
    bio: "Brigitta Bunga is an External Auditor with 4 years of experience at a Big 4 accounting firm in Indonesia, bringing proven expertise in financial audits, financial analysis, risk assessment, and regulatory compliance. She combines expertise in financial audits and risk management to ensure full regulatory compliance and financial accuracy for complex corporate organizations.",
    highlights: [
      "Former Big 4 Senior External Auditor",
      "Expert in internal controls, accounting system implementation, and financial visibility",
      "Ensures audit-readiness and governance standard across client enterprises"
    ]
  }
];

export const EXPERTISE_SERVICES: ServiceItem[] = [
  {
    id: "corp-fin-plan",
    title: "Corporate Financial Planning",
    description: "Financial modelling, budgeting, forecasting, KPI reporting, and management decision support.",
    deliverables: ["Dynamic Financial Models", "Rolling Cash Flow Forecasts", "Executive KPI Dashboards", "Capital Expenditure Analysis"],
    category: "business"
  },
  {
    id: "acct-advisory",
    title: "Accounting & Advisory",
    description: "Reliable financial reporting, internal controls, accounting system implementation, effective accounting tools utilisation, and financial visibility.",
    deliverables: ["IFRS / SAK Financial Statements", "Internal Control Audits", "Cloud ERP & Accounting Setup", "Management Financial Reviews"],
    category: "business"
  },
  {
    id: "corp-tax-plan",
    title: "Corporate Tax Planning",
    description: "Tax-efficient structures, compliance, and strategic tax optimisation aligned with long-term business goals.",
    deliverables: ["Corporate Tax Structuring", "Annual & Monthly Tax Returns", "Transfer Pricing Review", "Tax Efficiency Audits"],
    category: "tax"
  },
  {
    id: "tax-dispute",
    title: "Corporate Tax Dispute Resolution",
    description: "End-to-end support in resolving corporate tax disputes — from audit response and objection filing to litigation and settlement.",
    deliverables: ["Tax Audit Response Management", "Objection & Appeal Filings", "Tax Court Litigation Support", "SP2DK Negotiation Strategy"],
    category: "tax"
  },
  {
    id: "corp-structuring",
    title: "Corporate Structuring",
    description: "Ownership design, restructuring, governance, succession planning, and investment readiness.",
    deliverables: ["Holding Company Structures", "Shareholder Agreements", "Succession Planning Framework", "M&A Investment Preparation"],
    category: "structure"
  },
  {
    id: "payroll-mgmt",
    title: "Payroll Management",
    description: "Accurate payroll processing, tax withholding compliance, and workforce cost management aligned with local labour and tax regulations.",
    deliverables: ["PPh 21 Payroll Tax Computation", "BPJS Ketenagakerjaan & Kesehatan", "Executive Compensation Structuring", "Confidential Payroll Outsource"],
    category: "tax"
  },
  {
    id: "biz-advisory",
    title: "Business Advisory",
    description: "Profitability improvement, operational optimisation, growth strategy, performance management, and business transformation.",
    deliverables: ["Margin Enhancement Diagnostics", "Process Bottleneck Removal", "Growth Strategy Roadmaps", "Organizational Redesign"],
    category: "advisory"
  },
  {
    id: "biz-valuation",
    title: "Business Valuation",
    description: "Independent valuations for investment, mergers, acquisitions, restructuring, succession, and shareholder transactions.",
    deliverables: ["DCF & Market Multiple Valuations", "Shareholder Buyout Appraisals", "M&A Deal Structure Advisory", "Fairness Opinion Reports"],
    category: "advisory"
  }
];

export const WHY_ORTHODOX_POINTS = [
  {
    title: "One Strategic Partner",
    description: "Instead of managing multiple advisors independently (lawyers, tax agents, accountants, bankers), we coordinate every discipline through one integrated strategy."
  },
  {
    title: "One Stop Business Solution",
    description: "Finance, Accounting, Tax, Payroll, Business Strategy, Funding Recommendation, Corporate Structuring, and Governance — all working seamlessly together."
  },
  {
    title: "Beyond The Business",
    description: "Your business creates wealth. Our ecosystem ensures that wealth is also protected, managed, and transferred effectively through Orthodox Wealth Management."
  },
  {
    title: "Decisions Built Around Owners",
    description: "Every recommendation considers not only the business balance sheet, but also the owner's personal objectives, family security, succession, and long-term wealth."
  },
  {
    title: "Independent & Outcome-Driven Advice",
    description: "Solutions are designed strictly around tangible outcomes — never driven by financial product sales or commission biases."
  },
  {
    title: "Long-Term Partnership",
    description: "We remain involved as your business evolves, ensuring today's structural decisions continue supporting tomorrow's growth objectives."
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Business Discovery",
    description: "Understand your business, financial performance, ownership structure, operations, and long-term vision.",
    actions: ["Deep-dive financial review", "Stakeholder interview", "Ownership & tax audit"]
  },
  {
    number: "02",
    title: "Integrated Strategic Assessment",
    description: "Identify opportunities and hidden risks across finance, taxation, operations, governance, financing, and ownership.",
    actions: ["Silo elimination analysis", "Tax optimization mapping", "Capital structure diagnostic"]
  },
  {
    number: "03",
    title: "Solution Coordination",
    description: "Coordinate specialists across multiple disciplines while maintaining one integrated strategy.",
    actions: ["Unified advisory roadmap", "Restructuring execution", "Policy & system implementation"]
  },
  {
    number: "04",
    title: "Continuous Advisory",
    description: "As your business evolves, we continue refining structures, improving performance, and preparing for future opportunities.",
    actions: ["Quarterly review cycle", "Wealth transfer sync", "Audit readiness oversight"]
  }
];

export const PRINCIPLES: PrincipleItem[] = [
  {
    number: "01",
    lead: "Integration",
    sub: "before specialization",
    detail: "A specialist solves a isolated symptom; an integrated partner preserves and strengthens the entire enterprise."
  },
  {
    number: "02",
    lead: "Strategy",
    sub: "before execution",
    detail: "Tactical execution without strategic architecture merely accelerates costly structural errors."
  },
  {
    number: "03",
    lead: "Systems",
    sub: "before growth",
    detail: "Scaling an unorganized business amplifies chaos; scaling a robust system creates exponential value."
  },
  {
    number: "04",
    lead: "Governance",
    sub: "before complexity",
    detail: "Clear ownership rules and internal controls prevent friction before business expansion introduces stress."
  },
  {
    number: "05",
    lead: "Partnership",
    sub: "before transactions",
    detail: "We measure success in decade-long client relationships, not single transactional engagements."
  },
  {
    number: "06",
    lead: "Long-term value",
    sub: "before short-term results",
    detail: "Sustained family wealth and business longevity always triumph over temporary short-term tax tricks or quick fixes."
  }
];

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  { id: "bs", category: "business", title: "Business Strategy", description: "Corporate direction, market positioning & expansion roadmaps" },
  { id: "fa", category: "business", title: "Finance & Accounting", description: "Financial visibility, audit-ready reporting & cash management" },
  { id: "tp", category: "business", title: "Tax Planning", description: "Tax-efficient corporate structuring & regulatory compliance" },
  { id: "cs", category: "business", title: "Corporate Structuring", description: "Shareholding governance, holding companies & holding protection" },
  { id: "fc", category: "business", title: "Funding & Capital", description: "Optimized debt/equity capital raising and bank negotiations" },
  { id: "bv", category: "business", title: "Business Value", description: "Valuation enhancement, M&A readiness & exit planning" },
  { id: "cm", category: "business", title: "Continuous Monitoring", description: "Quarterly performance reviews & ongoing risk management" },
  
  // Wealth Management Nodes
  { id: "ip", category: "wealth", title: "Investment Planning", description: "Capital allocation & risk-adjusted global wealth portfolios" },
  { id: "inp", category: "wealth", title: "Insurance Planning", description: "Keyman protection, liability hedging & family risk coverage" },
  { id: "ep", category: "wealth", title: "Estate Planning", description: "Multi-generational wealth transfer, trusts & wills" },
  { id: "ap", category: "wealth", title: "Asset Protection", description: "Shielding personal assets from corporate liabilities" },
  { id: "rp", category: "wealth", title: "Retirement Planning", description: "Passive income structuring & liquidity management" },
  { id: "ptp", category: "wealth", title: "Personal Tax Planning", description: "Dividend tax optimization, offshore income & personal returns" },
  { id: "pdr", category: "wealth", title: "Personal Debt Strategy", description: "Refinancing, mortgage optimization & personal leverage controls" }
];

export const MOCK_PORTFOLIO_ASSETS: PortfolioAsset[] = [
  { name: "Operating Enterprise Equity (PT Orthodox Core)", category: "Private Business", valueIDR: 28500000000, percentage: 58.7, yieldRate: 14.2, taxStatus: "Optimized Corporate Structure" },
  { name: "Corporate Reserve Liquid Fund", category: "Cash & Yield", valueIDR: 6200000000, percentage: 12.8, yieldRate: 6.5, taxStatus: "Final Tax Exempt" },
  { name: "Commercial Real Estate (Jakarta CBD)", category: "Real Estate", valueIDR: 7800000000, percentage: 16.1, yieldRate: 7.8, taxStatus: "Final PPh Rental Rate" },
  { name: "Global Wealth Balanced Trust", category: "Capital Markets", valueIDR: 4500000000, percentage: 9.3, yieldRate: 9.1, taxStatus: "Dividend Shielded" },
  { name: "Family Estate Succession Pool", category: "Estate Trust", valueIDR: 1500000000, percentage: 3.1, yieldRate: 5.4, taxStatus: "Tax-Free Transfer Ring" }
];
