import type { Transaction, TransactionState, TransactionFilter, TransactionSort, CreateTransactionDTO, UpdateTransactionDTO } from '../types/transaction';
export declare const addTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<CreateTransactionDTO, "transactions/addTransaction">, updateTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<UpdateTransactionDTO, "transactions/updateTransaction">, deleteTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "transactions/deleteTransaction">, setFilter: import("@reduxjs/toolkit").ActionCreatorWithPayload<Partial<TransactionFilter>, "transactions/setFilter">, resetFilter: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"transactions/resetFilter">, setSort: import("@reduxjs/toolkit").ActionCreatorWithPayload<TransactionSort, "transactions/setSort">, selectTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<Transaction | null, "transactions/selectTransaction">, setLoading: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "transactions/setLoading">, setError: import("@reduxjs/toolkit").ActionCreatorWithPayload<string | null, "transactions/setError">;
declare const _default: import("redux").Reducer<TransactionState>;
export default _default;
export declare const selectAllTransactions: (state: {
    transactions: TransactionState;
}) => Transaction[];
export declare const selectFilteredTransactions: (state: {
    transactions: TransactionState;
}) => Transaction[];
export declare const selectTransactionStats: (state: {
    transactions: TransactionState;
}) => {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    transactionCount: number;
};
export declare const selectMonthlyStats: (state: {
    transactions: TransactionState;
}) => {
    income: number;
    expense: number;
    savings: number;
};
export declare const selectCategoryStats: (state: {
    transactions: TransactionState;
}) => {
    category: string;
    total: number;
    count: number;
    percentage: number;
}[];
export declare const selectRecentTransactions: (state: {
    transactions: TransactionState;
}, limit?: number) => Transaction[];
//# sourceMappingURL=transactionSlice.d.ts.map