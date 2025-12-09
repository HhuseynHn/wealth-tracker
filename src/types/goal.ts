// Goal Category
export type GoalCategory = 'car' | 'house' | 'vacation' | 'emergency' | 'education' | 'retirement' | 'other'

// Financial Goal Interface
export interface FinancialGoal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: GoalCategory
  color: string
  icon: string
  createdAt: string
  updatedAt?: string
  contributions: GoalContribution[]
}

// Goal Contribution
export interface GoalContribution {
  id: string
  amount: number
  date: string
  note?: string
}

// Goal State
export interface GoalState {
  goals: FinancialGoal[]
  isLoading: boolean
  error: string | null
  selectedGoal: FinancialGoal | null
}

// Create Goal DTO
export interface CreateGoalDTO {
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: GoalCategory
}

// Update Goal DTO
export interface UpdateGoalDTO {
  id: string
  title?: string
  targetAmount?: number
  deadline?: string
  category?: GoalCategory
}

// Add Contribution DTO
export interface AddContributionDTO {
  goalId: string
  amount: number
  note?: string
}

// Goal Progress
export interface GoalProgress {
  percentage: number
  remaining: number
  daysLeft: number
  dailySavingsNeeded: number
  isCompleted: boolean
  isOverdue: boolean
}

// Goal Category Info
export interface GoalCategoryInfo {
  id: GoalCategory
  nameAz: string
  nameEn: string
  icon: string
  color: string
}

// Category definitions
export const GOAL_CATEGORIES: GoalCategoryInfo[] = [
  { id: 'car', nameAz: 'Avtomobil', nameEn: 'Car', icon: '🚗', color: '#3b82f6' },
  { id: 'house', nameAz: 'Ev', nameEn: 'House', icon: '🏠', color: '#10b981' },
  { id: 'vacation', nameAz: 'Səyahət', nameEn: 'Vacation', icon: '✈️', color: '#f59e0b' },
  { id: 'emergency', nameAz: 'Təcili fond', nameEn: 'Emergency', icon: '🏥', color: '#ef4444' },
  { id: 'education', nameAz: 'Təhsil', nameEn: 'Education', icon: '🎓', color: '#8b5cf6' },
  { id: 'retirement', nameAz: 'Təqaüd', nameEn: 'Retirement', icon: '🏖️', color: '#06b6d4' },
  { id: 'other', nameAz: 'Digər', nameEn: 'Other', icon: '🎯', color: '#64748b' },
]

// Helper function to get category info
export const getGoalCategoryInfo = (categoryId: GoalCategory): GoalCategoryInfo => {
  return GOAL_CATEGORIES.find((c) => c.id === categoryId) || GOAL_CATEGORIES[GOAL_CATEGORIES.length - 1]
}

// Helper function to calculate goal progress
export const calculateGoalProgress = (goal: FinancialGoal): GoalProgress => {
  const percentage = (goal.currentAmount / goal.targetAmount) * 100
  const remaining = goal.targetAmount - goal.currentAmount
  const deadline = new Date(goal.deadline)
  const now = new Date()
  const daysLeft = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  const dailySavingsNeeded = daysLeft > 0 ? remaining / daysLeft : remaining
  const isCompleted = goal.currentAmount >= goal.targetAmount
  const isOverdue = !isCompleted && deadline < now

  return {
    percentage: Math.min(percentage, 100),
    remaining: Math.max(remaining, 0),
    daysLeft,
    dailySavingsNeeded,
    isCompleted,
    isOverdue,
  }
}
