export type TransactionCategory = 'food' | 'transport' | 'shopping' | 'entertainment' | 'health' | 'salary' | 'investment' | 'utilities' | 'rent' | 'other';
export type TransactionType = 'income' | 'expense';
export interface Transaction {
    id: string;
    type: TransactionType;
    category: TransactionCategory;
    amount: number;
    description: string;
    date: string;
    createdAt: string;
    updatedAt?: string;
}
export interface CreateTransactionDTO {
    type: TransactionType;
    category: TransactionCategory;
    amount: number;
    description: string;
    date: string;
}
export interface UpdateTransactionDTO {
    id: string;
    type?: TransactionType;
    category?: TransactionCategory;
    amount?: number;
    description?: string;
    date?: string;
}
export interface TransactionFilter {
    type?: TransactionType | 'all';
    category?: TransactionCategory | 'all';
    startDate?: string;
    endDate?: string;
    searchTerm?: string;
}
export type TransactionSortField = 'date' | 'amount' | 'category';
export type TransactionSortOrder = 'asc' | 'desc';
export interface TransactionSort {
    field: TransactionSortField;
    order: TransactionSortOrder;
}
export interface TransactionState {
    transactions: Transaction[];
    filter: TransactionFilter;
    sort: TransactionSort;
    isLoading: boolean;
    error: string | null;
    selectedTransaction: Transaction | null;
}
export interface CategoryInfo {
    id: TransactionCategory;
    nameAz: string;
    nameEn: string;
    icon: string;
    color: string;
}
export declare const CATEGORIES: CategoryInfo[];
export declare const getCategoryInfo: (categoryId: TransactionCategory) => CategoryInfo;
export interface TransactionStats {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    transactionCount: number;
}
export interface CategoryStats {
    category: TransactionCategory;
    total: number;
    percentage: number;
    count: number;
}
export interface MonthlyStats {
    month: string;
    income: number;
    expense: number;
    savings: number;
}
//# sourceMappingURL=transaction.d.ts.map