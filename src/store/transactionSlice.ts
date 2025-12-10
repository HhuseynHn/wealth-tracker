import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {
  Transaction,
  TransactionState,
  TransactionFilter,
  TransactionSort,
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from '../types/transaction'

// Storage key
const TRANSACTIONS_STORAGE_KEY = 'wealthtracker_transactions'

// Load transactions from localStorage
const loadTransactions = (): Transaction[] => {
  try {
    const data = localStorage.getItem(TRANSACTIONS_STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

// Save transactions to localStorage
const saveTransactions = (transactions: Transaction[]) => {
  localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions))
}

// Initial sample transactions
const getSampleTransactions = (): Transaction[] => {
  const now = new Date()
  const samples: Transaction[] = [
    {
      id: '1',
      type: 'income',
      category: 'salary',
      amount: 5000,
      description: 'Aylıq maaş',
      date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'expense',
      category: 'rent',
      amount: 800,
      description: 'Mənzil kirayəsi',
      date: new Date(now.getFullYear(), now.getMonth(), 2).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      type: 'expense',
      category: 'food',
      amount: 150,
      description: 'Supermarket alış-verişi',
      date: new Date(now.getFullYear(), now.getMonth(), 5).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      type: 'expense',
      category: 'transport',
      amount: 100,
      description: 'Benzin',
      date: new Date(now.getFullYear(), now.getMonth(), 7).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      type: 'income',
      category: 'investment',
      amount: 500,
      description: 'Dividend gəliri',
      date: new Date(now.getFullYear(), now.getMonth(), 10).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '6',
      type: 'expense',
      category: 'entertainment',
      amount: 80,
      description: 'Kino və restoran',
      date: new Date(now.getFullYear(), now.getMonth(), 12).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '7',
      type: 'expense',
      category: 'utilities',
      amount: 120,
      description: 'Elektrik və su',
      date: new Date(now.getFullYear(), now.getMonth(), 15).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '8',
      type: 'expense',
      category: 'health',
      amount: 200,
      description: 'Həkim və dərman',
      date: new Date(now.getFullYear(), now.getMonth(), 18).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '9',
      type: 'expense',
      category: 'shopping',
      amount: 300,
      description: 'Geyim alışı',
      date: new Date(now.getFullYear(), now.getMonth(), 20).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '10',
      type: 'income',
      category: 'other',
      amount: 200,
      description: 'Freelance iş',
      date: new Date(now.getFullYear(), now.getMonth(), 22).toISOString(),
      createdAt: new Date().toISOString(),
    },
  ]
  return samples
}

// Initialize transactions
const initializeTransactions = (): Transaction[] => {
  const stored = loadTransactions()
  if (stored.length === 0) {
    const samples = getSampleTransactions()
    saveTransactions(samples)
    return samples
  }
  return stored
}

// Initial state
const initialState: TransactionState = {
  transactions: initializeTransactions(),
  filter: {
    type: 'all',
    category: 'all',
    startDate: undefined,
    endDate: undefined,
    searchTerm: '',
  },
  sort: {
    field: 'date',
    order: 'desc',
  },
  isLoading: false,
  error: null,
  selectedTransaction: null,
}

// Transaction slice
const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // Add transaction
    addTransaction: (state, action: PayloadAction<CreateTransactionDTO>) => {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      }
      state.transactions.unshift(newTransaction)
      saveTransactions(state.transactions)
    },

    // Update transaction
    updateTransaction: (state, action: PayloadAction<UpdateTransactionDTO>) => {
      const index = state.transactions.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.transactions[index] = {
          ...state.transactions[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        }
        saveTransactions(state.transactions)
      }
    },

    // Delete transaction
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter((t) => t.id !== action.payload)
      saveTransactions(state.transactions)
    },

    // Set filter
    setFilter: (state, action: PayloadAction<Partial<TransactionFilter>>) => {
      state.filter = { ...state.filter, ...action.payload }
    },

    // Reset filter
    resetFilter: (state) => {
      state.filter = {
        type: 'all',
        category: 'all',
        startDate: undefined,
        endDate: undefined,
        searchTerm: '',
      }
    },

    // Set sort
    setSort: (state, action: PayloadAction<TransactionSort>) => {
      state.sort = action.payload
    },

    // Select transaction
    selectTransaction: (state, action: PayloadAction<Transaction | null>) => {
      state.selectedTransaction = action.payload
    },

    // Set loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilter,
  resetFilter,
  setSort,
  selectTransaction,
  setLoading,
  setError,
} = transactionSlice.actions

export default transactionSlice.reducer

// Selectors
export const selectAllTransactions = (state: { transactions: TransactionState }) =>
  state.transactions.transactions

export const selectFilteredTransactions = (state: { transactions: TransactionState }) => {
  const { transactions, filter, sort } = state.transactions

  let filtered = [...transactions]

  // Filter by type
  if (filter.type && filter.type !== 'all') {
    filtered = filtered.filter((t) => t.type === filter.type)
  }

  // Filter by category
  if (filter.category && filter.category !== 'all') {
    filtered = filtered.filter((t) => t.category === filter.category)
  }

  // Filter by date range
  if (filter.startDate) {
    filtered = filtered.filter((t) => new Date(t.date) >= new Date(filter.startDate!))
  }
  if (filter.endDate) {
    filtered = filtered.filter((t) => new Date(t.date) <= new Date(filter.endDate!))
  }

  // Filter by search term
  if (filter.searchTerm) {
    const term = filter.searchTerm.toLowerCase()
    filtered = filtered.filter(
      (t) =>
        t.description.toLowerCase().includes(term) ||
        t.category.toLowerCase().includes(term)
    )
  }

  // Sort
  filtered.sort((a, b) => {
    let comparison = 0
    switch (sort.field) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
        break
      case 'amount':
        comparison = a.amount - b.amount
        break
      case 'category':
        comparison = a.category.localeCompare(b.category)
        break
    }
    return sort.order === 'asc' ? comparison : -comparison
  })

  return filtered
}

export const selectTransactionStats = (state: { transactions: TransactionState }) => {
  const transactions = state.transactions.transactions
  
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    transactionCount: transactions.length,
  }
}

export const selectMonthlyStats = (state: { transactions: TransactionState }) => {
  const transactions = state.transactions.transactions
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const monthlyTransactions = transactions.filter((t) => {
    const date = new Date(t.date)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  })

  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const monthlyExpense = monthlyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    income: monthlyIncome,
    expense: monthlyExpense,
    savings: monthlyIncome - monthlyExpense,
  }
}

export const selectCategoryStats = (state: { transactions: TransactionState }) => {
  const transactions = state.transactions.transactions
  const expenses = transactions.filter((t) => t.type === 'expense')
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0)

  const categoryMap = new Map<string, { total: number; count: number }>()

  expenses.forEach((t) => {
    const current = categoryMap.get(t.category) || { total: 0, count: 0 }
    categoryMap.set(t.category, {
      total: current.total + t.amount,
      count: current.count + 1,
    })
  })

  return Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    total: data.total,
    count: data.count,
    percentage: totalExpense > 0 ? (data.total / totalExpense) * 100 : 0,
  })).sort((a, b) => b.total - a.total)
}

export const selectRecentTransactions = (state: { transactions: TransactionState }, limit = 5) => {
  return [...state.transactions.transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}












