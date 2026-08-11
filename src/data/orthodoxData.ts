import {
  ProblemItem,
  LeadershipProfile,
  ServiceItem,
  EcosystemNode,
  PrincipleItem,
  ProcessStep,
  PortfolioAsset,
} from '../types';

import profileAdriel from '../assets/images/profile_adriel.jpg';
import profileDominicus from '../assets/images/profile_richi.jpg';
import profileBunga from '../assets/images/profile_bunga.jpg';
import profileSatya from '../assets/images/profile_satya.jpg';
import problemWealth from '../assets/images/problem/problem_wealth.jpeg';
import problemTax from '../assets/images/problem/problem_tax.jpeg';
import problemFraud from '../assets/images/problem/problem_fraud.jpeg';
import problemDecision from '../assets/images/problem/problem_decision.jpeg';
import problemDispute from '../assets/images/problem/problem_dispute.jpeg';
import problemCash from '../assets/images/problem/problem_cash.jpeg';

export const HERO_DATA = {
  tagline: "Integrated Solutions. Sustainable Growth.",
  heading: "All Solved Under One Roof.",
  paragraph1: "Orthodox Business Solutions helps business owners simplify compliance, improve financial visibility, and build stronger businesses through integrated tax, accounting, and strategic advisory.",
  paragraph2: "As part of Orthodox Holding, we work alongside Orthodox Wealth Management to help business owners build not only better businesses—but lasting personal wealth.",
  trustIndicators: [
    { value: "100+", label: "Business Engagements" },
    { value: "Multi-Industry", label: "Advisory Experience" },
    { value: "Integrated", label: "Business Ecosystem" }
  ]
};

export const PROBLEM_ITEMS: ProblemItem[] = [
  {
    id: "gut-feel-decisions",
    title: "I make major business decisions based on gut feeling because I do not have reliable financial data",
    siloDescription: "Delayed or unverified financial reports force leadership to navigate growth without clear unit economics or margin visibility.",
    rippleEffect: "Relying on gut feeling increases strategic operational risk and complicates debt or equity financing efforts.",
    whatsappMessage: "Halo Orthodox Holdings, saya membutuhkan bantuan penyusunan laporan keuangan dan dashboard KPI manajemen yang akurat.",
    backgroundImage: problemDecision
  },
  {
    id: "money-leakage",
    title: "I suspect money is leaking inside my business, but I cannot find where or prove it",
    siloDescription: "Inadequate internal controls and unverified bookkeeping create dangerous blind spots for financial leakage and internal fraud.",
    rippleEffect: "Undetected leakages continuously erode profit margins and compromise overall enterprise financial integrity.",
    whatsappMessage: "Halo Orthodox Holdings, saya ingin melakukan kaji ulang pengendalian internal dan penelusuran kebocoran keuangan/fraud pada bisnis saya.",
    backgroundImage: problemFraud
  },
  {
    id: "cashflow-crunch",
    title: "My revenue keeps going up, but my bank account never seems to have enough in it",
    siloDescription: "Growing top-line revenue without working capital controls and cash conversion forecasting causes severe liquidity bottlenecks.",
    rippleEffect: "Rapidly scaling businesses frequently face insolvency traps if cash flow cycles and debt terms are left unmonitored.",
    whatsappMessage: "Halo Orthodox Holdings, saya ingin berkonsultasi mengenai manajemen arus kas (cash flow) dan modal kerja bisnis saya.",
    backgroundImage: problemCash
  },

    {
    id: "tax-reduction",
    title: "My tax bills keep growing and I have no idea how to reduce them legally",
    siloDescription: "Tax compliance without proactive tax strategy leads to overpayment, missed deductions, and unexpected tax liabilities.",
    rippleEffect: "Unnecessary tax drag deprives your business of essential working capital needed for reinvestment and growth.",
    whatsappMessage: "Halo Orthodox Holdings, saya ingin berkonsultasi mengenai cara mengoptimalkan beban pajak bisnis saya secara legal dan efisien.",
    backgroundImage: problemTax
  },
  {
    id: "tax-audit-dispute",
    title: "My business is facing a tax audit or dispute and I do not know where to begin",
    siloDescription: "Navigating a corporate tax audit without technical defense and dispute representation leaves companies vulnerable to arbitrary findings.",
    rippleEffect: "Unresolved tax disputes result in heavy penalties, frozen liquidity, and prolonged operational uncertainty.",
    whatsappMessage: "Halo Orthodox Holdings, kami membutuhkan pendampingan profesional untuk penanganan pemeriksaan dan sengketa pajak (Tax Audit & Dispute).",
    backgroundImage: problemDispute
  },
  {
    id: "protecting-wealth",
    title: "My business is doing well, but I have not figured out how to protect the wealth I have built",
    siloDescription: "Failing to ring-fence personal assets from operating enterprise liabilities puts accumulated family wealth at risk.",
    rippleEffect: "Without integrated estate planning and asset protection, business volatility can destabilize personal family prosperity.",
    whatsappMessage: "Halo Orthodox Holdings, saya ingin berkonsultasi mengenai perlindungan aset dan suksesi kekayaan pribadi melalui Orthodox Wealth Management.",
    backgroundImage: problemWealth
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
    bio: "With professional experience across Australia and Indonesia, Adriel specialises in integrating business strategy with financial architecture. His philosophy remains consistent across both Orthodox Business Solutions and Orthodox Wealth Management: Every financial and business decision should strengthen the next. Rather than viewing businesses and personal wealth separately, he helps entrepreneurs build a complete financial ecosystem where business success ultimately translates into long-term family wealth.",
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
    bio: "With a foundation built through entrepreneurship and formal training at Prasetiya Mulya — one of Indonesia's premier business schools — Richardo brings a practitioner's lens to tax and business advisory. Having built and run his own businesses before entering professional services, he understands firsthand the decisions entrepreneurs face at every stage of growth — not just in theory, but in practice. His philosophy is simple: Good advice isn't just technically correct — it's adaptive, timely, and built around where the client is and where they want to go. Specialising in tax, accounting, finance, and legal administration, Richardo helps clients navigate complexity with solutions that are grounded in integrity and oriented toward real, strategic outcomes.",
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
    image: profileBunga,
    credentials: [
      "S.Ak (Bachelor of Accounting)",
      "4 Years Big 4 External Auditor Experience in Indonesia",
      "Financial Audit & Risk Assessment Specialist",
      "Regulatory Compliance Specialist"
    ],
    philosophy: "Accuracy is not just a standard — it is a process built on clarity, adaptability, and disciplined inquiry at every step.",
    bio: "With 4 years of experience as an External Auditor at a Big 4 accounting firm in Indonesia, Brigitta brings deep expertise in financial audits, risk assessment, financial analysis, and regulatory compliance — equipping her to deliver precise, high-standard advisory for complex organisations. Her approach is defined by professional scepticism and structured methodology, ensuring every engagement is grounded in rigorous analysis and clear, transparent communication.",
    highlights: [
      "Former Big 4 Senior External Auditor",
      "Expert in internal controls, accounting system implementation, and financial visibility",
      "Ensures audit-readiness and governance standard across client enterprises"
    ]
  },
  {
    id: "satya-wana",
    name: "Satya Wana Putera Utama, S.T, MBA",
    title: "Commissioner",
    role: "Strategic Governance & Enterprise Advisory",
    image: profileSatya, // fallback portrait or icon styling
    credentials: [
      "S.T (Bachelor of Engineering)",
      "MBA (Master of Business Administration)",
      "Executive Enterprise Governance Specialist",
      "Strategic Business Advisory"
    ],
    philosophy: "Strategic governance and structural clarity drive enterprise durability.",
    bio: "Satya Wana Putera Utama serves as Commissioner at Orthodox Holding, bringing an interdisciplinary background in engineering and advanced business management (MBA). Satya provides strategic oversight and executive governance across Orthodox Business Solutions and Orthodox Wealth Management, ensuring enterprise strategy remains resilient and aligned with long-term owner value.",
    highlights: [
      "Commissioner providing executive oversight for Orthodox Holding",
      "Engineering & MBA dual perspective on enterprise efficiency and governance",
      "Strategic advisor on structural expansion and corporate resilience"
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
    description: "No more managing multiple accountants, tax consultants, and business advisors independently."
  },
  {
    title: "Built Around Business Owners",
    description: "Every recommendation considers profitability, cash flow, tax efficiency, and long-term business value."
  },
  {
    title: "One Advisory Ecosystem",
    description: "As part of Orthodox Holding, your business strategy naturally connects with Orthodox Wealth Management—allowing you to coordinate both business and personal financial planning under one ecosystem."
  },
  {
    title: "Long-Term Partnership",
    description: "Today's bookkeeping becomes tomorrow's business strategy. Today's business success becomes tomorrow's personal wealth."
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description: "We learn about your business, financials and objectives.",
    actions: ["Deep-dive business review", "Financial performance analysis", "Owner objective discovery"]
  },
  {
    number: "02",
    title: "Identify",
    description: "We identify financial, tax and operational opportunities.",
    actions: ["Tax efficiency diagnostic", "Internal control risk audit", "Operational margin mapping"]
  },
  {
    number: "03",
    title: "Improve",
    description: "We implement practical solutions.",
    actions: ["Execution roadmap", "Tax & corporate restructuring", "Reporting & governance setup"]
  },
  {
    number: "04",
    title: "Grow",
    description: "We continue supporting your business as it evolves.",
    actions: ["Continuous advisory", "Wealth transfer sync", "Expansion support"]
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
