
export enum SubscriptionType {
  FREE = "free",
  TRIAL = "trial",
  BASIC = "basic",
  PREMIUM = "premium",
  PRO = "pro",
  PRO_MONTHLY = "pro_monthly",
  PRO_ANNUAL = "pro_annual",
  GROUP_SMALL = "group_small",
  GROUP_MEDIUM = "group_medium",
  GROUP_LARGE = "group_large",
  GROUP_ANNUAL = "group_annual",
  ENTERPRISE = "enterprise"
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  type: string;
  maxMembers?: number;
}

export interface SubscriptionInfo {
  planType: string | SubscriptionType;
  expiryDate?: string;
  startDate?: string;
  isActive?: boolean;
  features?: string[];
}

export interface PricingTier {
  name: string;
  description: string;
  price: {
    monthly?: number;
    annual?: number;
  };
  features: Array<{
    name: string;
    included: boolean;
    tooltip?: string;
  }>;
  highlights?: string[];
  recommended?: boolean;
  trial?: boolean;
  maxUsers?: number;
}

// Credit system types
export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  isExamCredits?: boolean;
  bestValue?: boolean;
}

export interface UserCredits {
  standard: number;
  exam: number;
}

export const creditPacks: CreditPack[] = [
  {
    id: 'credits_50',
    name: '50 Credits',
    credits: 50,
    price: 99,
    isExamCredits: false
  },
  {
    id: 'credits_100',
    name: '100 Credits',
    credits: 100,
    price: 179,
    isExamCredits: false,
    bestValue: true
  },
  {
    id: 'credits_250',
    name: '250 Credits',
    credits: 250,
    price: 399,
    isExamCredits: false
  },
  {
    id: 'exam_credits_100',
    name: '100 Exam Credits',
    credits: 100,
    price: 499,
    isExamCredits: true
  }
];
