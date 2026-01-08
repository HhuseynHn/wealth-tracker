export type PlanType = 'free' | 'pro' | 'enterprise';
export interface SubscriptionPlan {
    id: PlanType;
    name: string;
    nameAz: string;
    price: number;
    currency: string;
    period: 'month' | 'year';
    features: string[];
    featuresAz: string[];
    isPopular?: boolean;
}
export interface ProFeatures {
    advancedCharts: boolean;
    customReports: boolean;
    dataExport: boolean;
    multiplePortfolios: boolean;
    stockIntegration: boolean;
    advancedCrypto: boolean;
    automaticCategorization: boolean;
    receiptScanning: boolean;
    budgetForecasting: boolean;
    sharedBudgets: boolean;
    financialAdvisor: boolean;
    prioritySupport: boolean;
}
export interface SubscriptionState {
    currentPlan: PlanType;
    features: ProFeatures;
    trialEndsAt: string | null;
    subscribedAt: string | null;
    expiresAt: string | null;
}
export declare const FREE_FEATURES: ProFeatures;
export declare const PRO_FEATURES: ProFeatures;
export declare const ENTERPRISE_FEATURES: ProFeatures;
export declare const SUBSCRIPTION_PLANS: SubscriptionPlan[];
//# sourceMappingURL=subscription.d.ts.map