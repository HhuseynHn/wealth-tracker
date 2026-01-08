import type { GoalState, FinancialGoal, CreateGoalDTO, UpdateGoalDTO, AddContributionDTO } from '../types/goal';
export declare const addGoal: import("@reduxjs/toolkit").ActionCreatorWithPayload<CreateGoalDTO, "goals/addGoal">, updateGoal: import("@reduxjs/toolkit").ActionCreatorWithPayload<UpdateGoalDTO, "goals/updateGoal">, deleteGoal: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "goals/deleteGoal">, addContribution: import("@reduxjs/toolkit").ActionCreatorWithPayload<AddContributionDTO, "goals/addContribution">, selectGoal: import("@reduxjs/toolkit").ActionCreatorWithPayload<FinancialGoal | null, "goals/selectGoal">, setLoading: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "goals/setLoading">, setError: import("@reduxjs/toolkit").ActionCreatorWithPayload<string | null, "goals/setError">;
declare const _default: import("redux").Reducer<GoalState>;
export default _default;
export declare const selectAllGoals: (state: {
    goals: GoalState;
}) => FinancialGoal[];
export declare const selectActiveGoals: (state: {
    goals: GoalState;
}) => FinancialGoal[];
export declare const selectCompletedGoals: (state: {
    goals: GoalState;
}) => FinancialGoal[];
export declare const selectGoalById: (state: {
    goals: GoalState;
}, id: string) => FinancialGoal | undefined;
export declare const selectGoalsStats: (state: {
    goals: GoalState;
}) => {
    totalGoals: number;
    completedCount: number;
    activeCount: number;
    totalTarget: number;
    totalSaved: number;
    overallProgress: number;
};
//# sourceMappingURL=goalSlice.d.ts.map