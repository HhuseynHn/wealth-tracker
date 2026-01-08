import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, TrashIcon, PencilIcon, XMarkIcon, } from '@heroicons/react/24/outline';
import { useLanguage } from '../i18n';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTransaction, updateTransaction, deleteTransaction, setFilter, selectFilteredTransactions, selectTransactionStats, } from '../store/transactionSlice';
import { CATEGORIES, getCategoryInfo } from '../types/transaction';
// import { sendNotification } from '../utils/demoNotifications'
const Transactions = () => {
    const { t, currentLanguage } = useLanguage();
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectFilteredTransactions);
    const stats = useAppSelector(selectTransactionStats);
    const filter = useAppSelector((state) => state.transactions.filter);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    // Form state
    const [formData, setFormData] = useState({
        type: 'expense',
        category: 'food',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
    });
    const resetForm = () => {
        setFormData({
            type: 'expense',
            category: 'food',
            amount: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
        });
        setEditingTransaction(null);
    };
    const openAddModal = () => {
        resetForm();
        setIsModalOpen(true);
    };
    const openEditModal = (transaction) => {
        setEditingTransaction(transaction);
        setFormData({
            type: transaction.type,
            category: transaction.category,
            amount: transaction.amount.toString(),
            description: transaction.description,
            date: transaction.date.split('T')[0],
        });
        setIsModalOpen(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.description)
            return;
        const amount = parseFloat(formData.amount);
        if (editingTransaction) {
            dispatch(updateTransaction({
                id: editingTransaction.id,
                ...formData,
                amount,
                date: new Date(formData.date).toISOString(),
            }));
        }
        else {
            dispatch(addTransaction({
                ...formData,
                amount,
                date: new Date(formData.date).toISOString(),
            }));
            // Send notification
            // sendNotification('transactionAdded', formData.type, amount)
        }
        setIsModalOpen(false);
        resetForm();
    };
    const handleDelete = (id) => {
        dispatch(deleteTransaction(id));
        setDeleteConfirmId(null);
    };
    const incomeCategories = CATEGORIES.filter(c => ['salary', 'investment', 'other'].includes(c.id));
    const expenseCategories = CATEGORIES.filter(c => !['salary', 'investment'].includes(c.id));
    const availableCategories = formData.type === 'income' ? incomeCategories : expenseCategories;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-slate-800 dark:text-white", children: t.transactions.title }), _jsx("p", { className: "text-slate-500 dark:text-gray-400", children: t.transactions.subtitle })] }), _jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: openAddModal, className: "flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors", children: [_jsx(PlusIcon, { className: "h-5 w-5" }), t.transactions.newTransaction] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(ArrowTrendingUpIcon, { className: "h-6 w-6" }), _jsx("span", { className: "font-medium", children: t.transactions.totalIncome })] }), _jsxs("p", { className: "text-3xl font-bold", children: ["\u20BC", stats.totalIncome.toLocaleString()] })] }), _jsxs("div", { className: "bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(ArrowTrendingDownIcon, { className: "h-6 w-6" }), _jsx("span", { className: "font-medium", children: t.transactions.totalExpense })] }), _jsxs("p", { className: "text-3xl font-bold", children: ["\u20BC", stats.totalExpense.toLocaleString()] })] }), _jsxs("div", { className: `bg-gradient-to-br ${stats.balance >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-2xl p-5 text-white`, children: [_jsx("div", { className: "flex items-center gap-3 mb-2", children: _jsx("span", { className: "font-medium", children: t.transactions.balance }) }), _jsxs("p", { className: "text-3xl font-bold", children: ["\u20BC", stats.balance.toLocaleString()] })] })] }), _jsx("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card border border-slate-100 dark:border-gray-700", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(MagnifyingGlassIcon, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-gray-500" }), _jsx("input", { type: "text", placeholder: t.transactions.searchPlaceholder, value: filter.searchTerm || '', onChange: (e) => dispatch(setFilter({ searchTerm: e.target.value })), className: "w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FunnelIcon, { className: "h-5 w-5 text-slate-400 dark:text-gray-500" }), ['all', 'income', 'expense'].map((type) => (_jsx("button", { onClick: () => dispatch(setFilter({ type })), className: `px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter.type === type
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'}`, children: type === 'all' ? t.common.all : type === 'income' ? t.transactionTypes.income : t.transactionTypes.expense }, type)))] }), _jsxs("select", { value: filter.category || 'all', onChange: (e) => dispatch(setFilter({ category: e.target.value })), className: "px-4 py-2.5 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500", children: [_jsxs("option", { value: "all", children: [t.common.all, " ", t.common.category] }), CATEGORIES.map((cat) => (_jsxs("option", { value: cat.id, children: [cat.icon, " ", currentLanguage === 'az' ? cat.nameAz : cat.nameEn] }, cat.id)))] })] }) }), _jsx("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-slate-100 dark:border-gray-700 overflow-hidden", children: transactions.length > 0 ? (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-100 dark:border-gray-700", children: [_jsx("th", { className: "text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-gray-400", children: t.transactions.transaction }), _jsx("th", { className: "text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-gray-400", children: t.common.category }), _jsx("th", { className: "text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-gray-400", children: t.common.date }), _jsx("th", { className: "text-right py-4 px-6 text-sm font-semibold text-slate-600 dark:text-gray-400", children: t.common.amount }), _jsx("th", { className: "text-right py-4 px-6 text-sm font-semibold text-slate-600 dark:text-gray-400", children: t.common.actions })] }) }), _jsx("tbody", { children: transactions.map((transaction, index) => {
                                    const categoryInfo = getCategoryInfo(transaction.category);
                                    return (_jsxs(motion.tr, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.03 }, className: "border-b border-slate-50 dark:border-gray-700/50 hover:bg-slate-50/50 dark:hover:bg-gray-700/50 transition-colors", children: [_jsx("td", { className: "py-4 px-6", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`, children: _jsx("span", { className: "text-lg", children: categoryInfo.icon }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-800 dark:text-white", children: transaction.description }), _jsx("p", { className: "text-xs text-slate-400 dark:text-gray-500", children: transaction.type === 'income' ? t.transactionTypes.income : t.transactionTypes.expense })] })] }) }), _jsx("td", { className: "py-4 px-6", children: _jsx("span", { className: "px-3 py-1 rounded-lg text-sm font-medium", style: { backgroundColor: `${categoryInfo.color}20`, color: categoryInfo.color }, children: currentLanguage === 'az' ? categoryInfo.nameAz : categoryInfo.nameEn }) }), _jsx("td", { className: "py-4 px-6 text-slate-600 dark:text-gray-400", children: new Date(transaction.date).toLocaleDateString(currentLanguage === 'az' ? 'az-AZ' : 'en-US') }), _jsx("td", { className: "py-4 px-6 text-right", children: _jsxs("span", { className: `font-semibold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`, children: [transaction.type === 'income' ? '+' : '-', "\u20BC", transaction.amount.toLocaleString()] }) }), _jsx("td", { className: "py-4 px-6", children: _jsxs("div", { className: "flex items-center justify-end gap-2", children: [_jsx("button", { onClick: () => openEditModal(transaction), className: "p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all", children: _jsx(PencilIcon, { className: "h-4 w-4" }) }), _jsx("button", { onClick: () => setDeleteConfirmId(transaction.id), className: "p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all", children: _jsx(TrashIcon, { className: "h-4 w-4" }) })] }) })] }, transaction.id));
                                }) })] }) })) : (_jsxs("div", { className: "py-16 text-center", children: [_jsx("p", { className: "text-slate-500 dark:text-gray-400 mb-2", children: t.transactions.noTransactions }), _jsx("p", { className: "text-sm text-slate-400 dark:text-gray-500", children: t.transactions.addFirst })] })) }), _jsx(AnimatePresence, { children: isModalOpen && (_jsxs(Dialog, { open: isModalOpen, onClose: () => setIsModalOpen(false), className: "relative z-50", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 backdrop-blur-sm" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(Dialog.Panel, { as: motion.div, initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx(Dialog.Title, { className: "text-xl font-bold text-slate-800 dark:text-white", children: editingTransaction ? t.transactions.editTransaction : t.transactions.newTransaction }), _jsx("button", { onClick: () => setIsModalOpen(false), className: "p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors", children: _jsx(XMarkIcon, { className: "h-5 w-5" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.common.type }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx("button", { type: "button", onClick: () => setFormData({ ...formData, type: 'income', category: 'salary' }), className: `py-3 px-4 rounded-xl font-medium transition-all ${formData.type === 'income'
                                                                    ? 'bg-green-600 text-white'
                                                                    : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'}`, children: t.transactionTypes.income }), _jsx("button", { type: "button", onClick: () => setFormData({ ...formData, type: 'expense', category: 'food' }), className: `py-3 px-4 rounded-xl font-medium transition-all ${formData.type === 'expense'
                                                                    ? 'bg-red-600 text-white'
                                                                    : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'}`, children: t.transactionTypes.expense })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.common.category }), _jsx("select", { value: formData.category, onChange: (e) => setFormData({ ...formData, category: e.target.value }), className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500", children: availableCategories.map((cat) => (_jsxs("option", { value: cat.id, children: [cat.icon, " ", currentLanguage === 'az' ? cat.nameAz : cat.nameEn] }, cat.id))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.common.amount }), _jsx("input", { type: "number", step: "0.01", value: formData.amount, onChange: (e) => setFormData({ ...formData, amount: e.target.value }), placeholder: t.transactions.form.enterAmount, className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.common.description }), _jsx("input", { type: "text", value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }), placeholder: t.transactions.form.enterDescription, className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.common.date }), _jsx("input", { type: "date", value: formData.date, onChange: (e) => setFormData({ ...formData, date: e.target.value }), className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500", required: true })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { type: "button", onClick: () => setIsModalOpen(false), className: "flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors", children: t.common.cancel }), _jsx("button", { type: "submit", className: "flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors", children: editingTransaction ? t.transactions.form.update : t.transactions.form.submit })] })] })] }) })] })) }), _jsx(AnimatePresence, { children: deleteConfirmId && (_jsxs(Dialog, { open: !!deleteConfirmId, onClose: () => setDeleteConfirmId(null), className: "relative z-50", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 backdrop-blur-sm" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(Dialog.Panel, { as: motion.div, initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, className: "w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center", children: _jsx(TrashIcon, { className: "h-8 w-8 text-red-600 dark:text-red-400" }) }), _jsx(Dialog.Title, { className: "text-xl font-bold text-slate-800 dark:text-white mb-2", children: t.transactions.deleteTransaction }), _jsx("p", { className: "text-slate-500 dark:text-gray-400 mb-6", children: t.transactions.deleteConfirm }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => setDeleteConfirmId(null), className: "flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors", children: t.common.cancel }), _jsx("button", { onClick: () => handleDelete(deleteConfirmId), className: "flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors", children: t.common.delete })] })] }) })] })) })] }));
};
export default Transactions;
