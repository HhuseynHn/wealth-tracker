// Subscription Plan Types
export type PlanType = 'free' | 'pro' | 'enterprise'

// Subscription Plan Interface
export interface SubscriptionPlan {
  id: PlanType
  name: string
  nameAz: string
  price: number
  currency: string
  period: 'month' | 'year'
  features: string[]
  featuresAz: string[]
  isPopular?: boolean
}

// Pro Features Interface
export interface ProFeatures {
  // Advanced Analytics
  advancedCharts: boolean
  customReports: boolean
  dataExport: boolean
  
  // Investment Tools
  multiplePortfolios: boolean
  stockIntegration: boolean
  advancedCrypto: boolean
  
  // Productivity
  automaticCategorization: boolean
  receiptScanning: boolean
  budgetForecasting: boolean
  
  // Collaboration
  sharedBudgets: boolean
  financialAdvisor: boolean
  prioritySupport: boolean
}

// Subscription State
export interface SubscriptionState {
  currentPlan: PlanType
  features: ProFeatures
  trialEndsAt: string | null
  subscribedAt: string | null
  expiresAt: string | null
}

// Feature config by plan
export const FREE_FEATURES: ProFeatures = {
  advancedCharts: false,
  customReports: false,
  dataExport: false,
  multiplePortfolios: false,
  stockIntegration: false,
  advancedCrypto: false,
  automaticCategorization: false,
  receiptScanning: false,
  budgetForecasting: false,
  sharedBudgets: false,
  financialAdvisor: false,
  prioritySupport: false,
}

export const PRO_FEATURES: ProFeatures = {
  advancedCharts: true,
  customReports: true,
  dataExport: true,
  multiplePortfolios: true,
  stockIntegration: true,
  advancedCrypto: true,
  automaticCategorization: true,
  receiptScanning: true,
  budgetForecasting: true,
  sharedBudgets: false,
  financialAdvisor: false,
  prioritySupport: false,
}

export const ENTERPRISE_FEATURES: ProFeatures = {
  advancedCharts: true,
  customReports: true,
  dataExport: true,
  multiplePortfolios: true,
  stockIntegration: true,
  advancedCrypto: true,
  automaticCategorization: true,
  receiptScanning: true,
  budgetForecasting: true,
  sharedBudgets: true,
  financialAdvisor: true,
  prioritySupport: true,
}

// Subscription Plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    nameAz: 'Pulsuz',
    price: 0,
    currency: 'USD',
    period: 'month',
    features: [
      'Basic transaction tracking',
      'Up to 100 transactions/month',
      'Single crypto portfolio',
      'Basic charts',
      '3 financial goals',
    ],
    featuresAz: [
      'Əsas əməliyyat izləmə',
      'Ayda 100-ə qədər əməliyyat',
      'Tək kripto portfolio',
      'Əsas qrafiklər',
      '3 maliyyə məqsədi',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    nameAz: 'Pro',
    price: 9.99,
    currency: 'USD',
    period: 'month',
    isPopular: true,
    features: [
      'Unlimited transactions',
      'Advanced analytics',
      'Multiple portfolios',
      'Stock integration',
      'Auto-categorization',
      'Budget forecasting',
      'PDF/CSV export',
      'Receipt scanning',
      'Unlimited goals',
    ],
    featuresAz: [
      'Limitsiz əməliyyat',
      'Təkmil analitika',
      'Çoxlu portfolio',
      'Səhm inteqrasiyası',
      'Avtomatik kateqorizasiya',
      'Büdcə proqnozu',
      'PDF/CSV ixrac',
      'Qəbz skan etmə',
      'Limitsiz məqsəd',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    nameAz: 'Müəssisə',
    price: 29.99,
    currency: 'USD',
    period: 'month',
    features: [
      'All Pro features',
      'Shared budgets',
      'Financial advisor access',
      'Priority support',
      'API access',
      'Team collaboration',
      'Custom integrations',
      'White-label options',
    ],
    featuresAz: [
      'Bütün Pro xüsusiyyətlər',
      'Paylaşılan büdcələr',
      'Maliyyə məsləhətçisi',
      'Prioritet dəstək',
      'API girişi',
      'Komanda əməkdaşlığı',
      'Xüsusi inteqrasiyalar',
      'White-label seçimləri',
    ],
  },
]











