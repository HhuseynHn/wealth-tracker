// Currency Types
export type Currency = 'USD' | 'EUR' | 'GBP' | 'AZN' | 'TRY' | 'RUB'

// Theme Types
export type Theme = 'light' | 'dark' | 'system'

// Date Format Types
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD'

// Number Format Types
export type NumberFormat = 'comma' | 'dot'

// User Profile Interface
export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  country?: string
  timezone?: string
  createdAt: string
}

// App Settings Interface
export interface AppSettings {
  language: string
  currency: Currency
  theme: Theme
  dateFormat: DateFormat
  numberFormat: NumberFormat
  notifications: {
    email: boolean
    push: boolean
    transactions: boolean
    goals: boolean
    crypto: boolean
    marketing: boolean
  }
}

// Settings State
export interface SettingsState {
  profile: UserProfile | null
  settings: AppSettings
  isLoading: boolean
}

// Currency Info
export interface CurrencyInfo {
  code: Currency
  symbol: string
  name: string
  nameAz: string
}

// Currency definitions
export const CURRENCIES: CurrencyInfo[] = [
  { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat', nameAz: 'Azərbaycan Manatı' },
  { code: 'USD', symbol: '$', name: 'US Dollar', nameAz: 'ABŞ Dolları' },
  { code: 'EUR', symbol: '€', name: 'Euro', nameAz: 'Avro' },
  { code: 'GBP', symbol: '£', name: 'British Pound', nameAz: 'Britaniya Funtu' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', nameAz: 'Türk Lirəsi' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', nameAz: 'Rus Rublu' },
]

// Default settings
export const DEFAULT_SETTINGS: AppSettings = {
  language: 'az',
  currency: 'AZN',
  theme: 'light',
  dateFormat: 'DD/MM/YYYY',
  numberFormat: 'comma',
  notifications: {
    email: true,
    push: true,
    transactions: true,
    goals: true,
    crypto: true,
    marketing: false,
  },
}











