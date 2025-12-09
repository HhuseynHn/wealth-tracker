export type TransactionCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'health'
  | 'salary'
  | 'investment'
  | 'utilities'
  | 'rent'
  | 'other'

export type TransactionType = 'income' | 'expense'

// Transaction Interface
export interface Transaction {
  id: string
  type: TransactionType
  category: TransactionCategory
  amount: number
  description: string
  date: string
  createdAt: string
  updatedAt?: string
}

// Create Transaction DTO
export interface CreateTransactionDTO {
  type: TransactionType
  category: TransactionCategory
  amount: number
  description: string
  date: string
}

// Update Transaction DTO
export interface UpdateTransactionDTO {
  id: string
  type?: TransactionType
  category?: TransactionCategory
  amount?: number
  description?: string
  date?: string
}

// Transaction Filter
export interface TransactionFilter {
  type?: TransactionType | 'all'
  category?: TransactionCategory | 'all'
  startDate?: string
  endDate?: string
  searchTerm?: string
}

// Transaction Sort
export type TransactionSortField = 'date' | 'amount' | 'category'
export type TransactionSortOrder = 'asc' | 'desc'

export interface TransactionSort {
  field: TransactionSortField
  order: TransactionSortOrder
}

// Transaction State
export interface TransactionState {
  transactions: Transaction[]
  filter: TransactionFilter
  sort: TransactionSort
  isLoading: boolean
  error: string | null
  selectedTransaction: Transaction | null
}

// Category Info
export interface CategoryInfo {
  id: TransactionCategory
  nameAz: string
  nameEn: string
  icon: string
  color: string
}

// Category definitions
export const CATEGORIES: CategoryInfo[] = [
  { id: 'salary', nameAz: 'Maaş', nameEn: 'Salary', icon: '💰', color: '#10b981' },
  { id: 'investment', nameAz: 'İnvestisiya', nameEn: 'Investment', icon: '📈', color: '#3b82f6' },
  { id: 'food', nameAz: 'Qida', nameEn: 'Food', icon: '🍔', color: '#f59e0b' },
  { id: 'transport', nameAz: 'Nəqliyyat', nameEn: 'Transport', icon: '🚗', color: '#8b5cf6' },
  { id: 'shopping', nameAz: 'Alış-veriş', nameEn: 'Shopping', icon: '🛒', color: '#ec4899' },
  { id: 'entertainment', nameAz: 'Əyləncə', nameEn: 'Entertainment', icon: '🎬', color: '#06b6d4' },
  { id: 'health', nameAz: 'Sağlamlıq', nameEn: 'Health', icon: '🏥', color: '#ef4444' },
  { id: 'utilities', nameAz: 'Kommunal', nameEn: 'Utilities', icon: '💡', color: '#f97316' },
  { id: 'rent', nameAz: 'Kirayə', nameEn: 'Rent', icon: '🏠', color: '#6366f1' },
  { id: 'other', nameAz: 'Digər', nameEn: 'Other', icon: '📦', color: '#64748b' },
]

// Helper function to get category info
export const getCategoryInfo = (categoryId: TransactionCategory): CategoryInfo => {
  return CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[CATEGORIES.length - 1]
}

// Statistics interfaces
export interface TransactionStats {
  totalIncome: number
  totalExpense: number
  balance: number
  transactionCount: number
}

export interface CategoryStats {
  category: TransactionCategory
  total: number
  percentage: number
  count: number
}

export interface MonthlyStats {
  month: string
  income: number
  expense: number
  savings: number
}
