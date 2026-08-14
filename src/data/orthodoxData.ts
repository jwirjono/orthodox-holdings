import {
  ProblemItem,
  LeadershipProfile,
  ServiceItem,
  EcosystemNode,
  PortfolioAsset,
} from '../types';
import type { Dictionary } from '../i18n/locales/en';

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

/**
 * Language-independent data lives here (images, figures, category keys).
 * Every user-facing string lives in `src/i18n/locales/*` and is merged in by
 * the builders below, keyed on the shared `id` field.
 */

const PROBLEM_IMAGES: Record<string, string> = {
  'gut-feel-decisions': problemDecision,
  'money-leakage': problemFraud,
  'cashflow-crunch': problemCash,
  'tax-reduction': problemTax,
  'tax-audit-dispute': problemDispute,
  'protecting-wealth': problemWealth,
};

const LEADERSHIP_IMAGES: Record<string, string> = {
  'adriel-louis': profileAdriel,
  'dominicus-richardo': profileDominicus,
  'brigitta-bunga': profileBunga,
  'satya-wana': profileSatya,
};

const SERVICE_CATEGORIES: Record<string, ServiceItem['category']> = {
  'corp-fin-plan': 'business',
  'acct-advisory': 'business',
  'corp-tax-plan': 'tax',
  'tax-dispute': 'tax',
  'corp-structuring': 'structure',
  'payroll-mgmt': 'tax',
  'biz-advisory': 'advisory',
  'biz-valuation': 'advisory',
};

const ECOSYSTEM_NODE_CATEGORIES: Record<string, EcosystemNode['category']> = {
  bs: 'business',
  fa: 'business',
  tp: 'business',
  cs: 'business',
  fc: 'business',
  bv: 'business',
  cm: 'business',
  ip: 'wealth',
  inp: 'wealth',
  ep: 'wealth',
  ap: 'wealth',
  rp: 'wealth',
  ptp: 'wealth',
  pdr: 'wealth',
};

/** Portfolio figures are locale-independent; names and statuses come from the dictionary. */
const PORTFOLIO_FIGURES: Record<
  string,
  Pick<PortfolioAsset, 'valueIDR' | 'percentage' | 'yieldRate'>
> = {
  'operating-equity': { valueIDR: 28500000000, percentage: 58.7, yieldRate: 14.2 },
  'reserve-fund': { valueIDR: 6200000000, percentage: 12.8, yieldRate: 6.5 },
  'real-estate': { valueIDR: 7800000000, percentage: 16.1, yieldRate: 7.8 },
  'global-trust': { valueIDR: 4500000000, percentage: 9.3, yieldRate: 9.1 },
  'estate-pool': { valueIDR: 1500000000, percentage: 3.1, yieldRate: 5.4 },
};

export const getProblemItems = (t: Dictionary): ProblemItem[] =>
  t.problems.items.map((item) => ({
    ...item,
    backgroundImage: PROBLEM_IMAGES[item.id] ?? '',
  }));

export const getLeadershipProfiles = (t: Dictionary): LeadershipProfile[] =>
  t.whoWeAre.profiles.map((profile) => ({
    ...profile,
    image: LEADERSHIP_IMAGES[profile.id] ?? '',
  }));

export const getExpertiseServices = (t: Dictionary): ServiceItem[] =>
  t.expertise.services.map((service) => ({
    ...service,
    category: SERVICE_CATEGORIES[service.id] ?? 'advisory',
  }));

export const getEcosystemNodes = (t: Dictionary): EcosystemNode[] =>
  t.ecosystemNodes.map((node) => ({
    ...node,
    category: ECOSYSTEM_NODE_CATEGORIES[node.id] ?? 'business',
  }));

export const getPortfolioAssets = (t: Dictionary): PortfolioAsset[] =>
  t.dashboard.assets.map((asset) => ({
    ...asset,
    ...(PORTFOLIO_FIGURES[asset.id] ?? { valueIDR: 0, percentage: 0, yieldRate: 0 }),
  }));
