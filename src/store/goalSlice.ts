import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type {
  GoalState,
  FinancialGoal,
  CreateGoalDTO,
  UpdateGoalDTO,
  AddContributionDTO,
  GoalContribution,
} from '../types/goal'
import { getGoalCategoryInfo } from '../types/goal'

// Storage key
const GOALS_STORAGE_KEY = 'wealthtracker_goals'

// Load from localStorage
const loadGoals = (): FinancialGoal[] => {
  try {
    const data = localStorage.getItem(GOALS_STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

// Save to localStorage
const saveGoals = (goals: FinancialGoal[]) => {
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals))
}

// Sample goals
const getSampleGoals = (): FinancialGoal[] => {
  const now = new Date()
  return [
    {
      id: '1',
      title: 'Yeni Avtomobil',
      targetAmount: 30000,
      currentAmount: 18500,
      deadline: new Date(now.getFullYear() + 1, 6, 1).toISOString(),
      category: 'car',
      color: '#3b82f6',
      icon: '🚗',
      createdAt: new Date().toISOString(),
      contributions: [],
    },
    {
      id: '2',
      title: 'Avropa Səyahəti',
      targetAmount: 5000,
      currentAmount: 3200,
      deadline: new Date(now.getFullYear(), 11, 31).toISOString(),
      category: 'vacation',
      color: '#f59e0b',
      icon: '✈️',
      createdAt: new Date().toISOString(),
      contributions: [],
    },
    {
      id: '3',
      title: 'Təcili Fond',
      targetAmount: 10000,
      currentAmount: 10000,
      deadline: new Date(now.getFullYear(), 5, 30).toISOString(),
      category: 'emergency',
      color: '#10b981',
      icon: '🏥',
      createdAt: new Date().toISOString(),
      contributions: [],
    },
    {
      id: '4',
      title: 'Ev Təmiri',
      targetAmount: 8000,
      currentAmount: 2400,
      deadline: new Date(now.getFullYear() + 1, 2, 1).toISOString(),
      category: 'house',
      color: '#8b5cf6',
      icon: '🏠',
      createdAt: new Date().toISOString(),
      contributions: [],
    },
  ]
}

// Initialize
const initializeGoals = (): FinancialGoal[] => {
  const stored = loadGoals()
  if (stored.length === 0) {
    const samples = getSampleGoals()
    saveGoals(samples)
    return samples
  }
  return stored
}

// Initial state
const initialState: GoalState = {
  goals: initializeGoals(),
  isLoading: false,
  error: null,
  selectedGoal: null,
}

// Goal slice
const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<CreateGoalDTO>) => {
      const categoryInfo = getGoalCategoryInfo(action.payload.category)
      const newGoal: FinancialGoal = {
        id: Date.now().toString(),
        ...action.payload,
        color: categoryInfo.color,
        icon: categoryInfo.icon,
        createdAt: new Date().toISOString(),
        contributions: [],
      }
      state.goals.unshift(newGoal)
      saveGoals(state.goals)
    },

    updateGoal: (state, action: PayloadAction<UpdateGoalDTO>) => {
      const index = state.goals.findIndex((g) => g.id === action.payload.id)
      if (index !== -1) {
        const categoryInfo = action.payload.category
          ? getGoalCategoryInfo(action.payload.category)
          : null
        state.goals[index] = {
          ...state.goals[index],
          ...action.payload,
          ...(categoryInfo && { color: categoryInfo.color, icon: categoryInfo.icon }),
          updatedAt: new Date().toISOString(),
        }
        saveGoals(state.goals)
      }
    },

    deleteGoal: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter((g) => g.id !== action.payload)
      saveGoals(state.goals)
    },

    addContribution: (state, action: PayloadAction<AddContributionDTO>) => {
      const goal = state.goals.find((g) => g.id === action.payload.goalId)
      if (goal) {
        const contribution: GoalContribution = {
          id: Date.now().toString(),
          amount: action.payload.amount,
          date: new Date().toISOString(),
          note: action.payload.note,
        }
        goal.contributions.push(contribution)
        goal.currentAmount += action.payload.amount
        goal.updatedAt = new Date().toISOString()
        saveGoals(state.goals)
      }
    },

    selectGoal: (state, action: PayloadAction<FinancialGoal | null>) => {
      state.selectedGoal = action.payload
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  addGoal,
  updateGoal,
  deleteGoal,
  addContribution,
  selectGoal,
  setLoading,
  setError,
} = goalSlice.actions

export default goalSlice.reducer

// Selectors
export const selectAllGoals = (state: { goals: GoalState }) => state.goals.goals
export const selectActiveGoals = (state: { goals: GoalState }) =>
  state.goals.goals.filter((g) => g.currentAmount < g.targetAmount)
export const selectCompletedGoals = (state: { goals: GoalState }) =>
  state.goals.goals.filter((g) => g.currentAmount >= g.targetAmount)
export const selectGoalById = (state: { goals: GoalState }, id: string) =>
  state.goals.goals.find((g) => g.id === id)
export const selectGoalsStats = (state: { goals: GoalState }) => {
  const goals = state.goals.goals
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0)
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0)
  const completedCount = goals.filter((g) => g.currentAmount >= g.targetAmount).length
  
  return {
    totalGoals: goals.length,
    completedCount,
    activeCount: goals.length - completedCount,
    totalTarget,
    totalSaved,
    overallProgress: totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0,
  }
}





