export type Currency = 'USD' | 'EUR' | 'GBP' | 'AZN' | 'TRY' | 'RUB';
export type Theme = 'light' | 'dark' | 'system';
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
export type NumberFormat = 'comma' | 'dot';
export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    country?: string;
    timezone?: string;
    createdAt: string;
}
export interface AppSettings {
    language: string;
    currency: Currency;
    theme: Theme;
    dateFormat: DateFormat;
    numberFormat: NumberFormat;
    notifications: {
        email: boolean;
        push: boolean;
        transactions: boolean;
        goals: boolean;
        crypto: boolean;
        marketing: boolean;
    };
}
export interface SettingsState {
    profile: UserProfile | null;
    settings: AppSettings;
    isLoading: boolean;
}
export interface CurrencyInfo {
    code: Currency;
    symbol: string;
    name: string;
    nameAz: string;
}
export declare const CURRENCIES: CurrencyInfo[];
export declare const DEFAULT_SETTINGS: AppSettings;
//# sourceMappingURL=settings.d.ts.map