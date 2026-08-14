export interface ProblemItem {
  id: string;
  title: string;
  siloDescription: string;
  rippleEffect: string;
  whatsappMessage: string;
  backgroundImage: string;
}

export interface LeadershipProfile {
  id: string;
  name: string;
  title: string;
  role: string;
  image: string;
  credentials: string[];
  philosophy: string;
  bio: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  category: 'business' | 'tax' | 'structure' | 'advisory';
}

export interface EcosystemNode {
  id: string;
  category: 'business' | 'wealth';
  title: string;
  description: string;
  connectedTo?: string[];
}

export interface PrincipleItem {
  number: string;
  lead: string;
  sub: string;
  detail: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  actions: string[];
}

export type TaxType = 'corporate' | 'personal' | 'dividend';

export interface PortfolioAsset {
  id: string;
  name: string;
  category: string;
  valueIDR: number;
  percentage: number;
  yieldRate: number;
  taxStatus: string;
}
