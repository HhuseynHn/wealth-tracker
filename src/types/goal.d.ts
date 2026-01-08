export type GoalCategory = 'car' | 'house' | 'vacation' | 'emergency' | 'education' | 'retirement' | 'other';
export interface FinancialGoal {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    category: GoalCategory;
    color: string;
    icon: string;
    createdAt: string;
    updatedAt?: string;
    contributions: GoalContribution[];
}
export interface GoalContribution {
    id: string;
    amount: number;
    date: string;
    note?: string;
}
export interface GoalState {
    goals: FinancialGoal[];
    isLoading: boolean;
    error: string | null;
    selectedGoal: FinancialGoal | null;
}
export interface CreateGoalDTO {
    title: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    category: GoalCategory;
}
export interface UpdateGoalDTO {
    id: string;
    title?: string;
    targetAmount?: number;
    deadline?: string;
    category?: GoalCategory;
}
export interface AddContributionDTO {
    goalId: string;
    amount: number;
    note?: string;
}
export interface GoalProgress {
    percentage: number;
    remaining: number;
    daysLeft: number;
    dailySavingsNeeded: number;
    isCompleted: boolean;
    isOverdue: boolean;
}
export interface GoalCategoryInfo {
    id: GoalCategory;
    nameAz: string;
    nameEn: string;
    icon: string;
    color: string;
}
export declare const GOAL_CATEGORIES: GoalCategoryInfo[];
export declare const getGoalCategoryInfo: (categoryId: GoalCategory) => GoalCategoryInfo;
export declare const calculateGoalProgress: (goal: FinancialGoal) => GoalProgress;
//# sourceMappingURL=goal.d.ts.map