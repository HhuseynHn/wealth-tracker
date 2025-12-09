// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

// Transaction Types
export interface Transaction {
  id: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string
  date: string
  createdAt: string
}

export interface TransactionState {
  transactions: Transaction[]
  isLoading: boolean
  error: string | null
}

// Investment Types
export interface Investment {
  id: string
  name: string
  type: 'stock' | 'crypto' | 'bond' | 'real-estate' | 'other'
  amount: number
  currentValue: number
  purchaseDate: string
  symbol?: string
}

export interface InvestmentState {
  investments: Investment[]
  isLoading: boolean
  error: string | null
}

// Goal Types
export interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  createdAt: string
}

export interface GoalState {
  goals: Goal[]
  isLoading: boolean
  error: string | null
}

// Dashboard Types
export interface DashboardStats {
  totalBalance: number
  totalIncome: number
  totalExpense: number
  totalInvestments: number
  monthlyChange: number
}

// Navigation Types
export interface NavItem {
  name: string
  path: string
  icon: React.ComponentType<{ className?: string }>
}

// Chart Data Types
export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

