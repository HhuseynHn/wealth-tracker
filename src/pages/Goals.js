import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { PlusIcon, FlagIcon, CheckCircleIcon, TrashIcon, PencilIcon, XMarkIcon, BanknotesIcon, } from '@heroicons/react/24/outline';
import { useLanguage } from '../i18n';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addGoal, updateGoal, deleteGoal, addContribution, selectAllGoals, selectGoalsStats, } from '../store/goalSlice';
import { GOAL_CATEGORIES, getGoalCategoryInfo, calculateGoalProgress, } from '../types/goal';
const Goals = () => {
    const { t, currentLanguage } = useLanguage();
    const dispatch = useAppDispatch();
    const goals = useAppSelector(selectAllGoals);
    const stats = useAppSelector(selectGoalsStats);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);
    const [selectedGoalId, setSelectedGoalId] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        targetAmount: '',
        currentAmount: '0',
        deadline: '',
        category: 'other',
    });
    const [contributionAmount, setContributionAmount] = useState('');
    const [contributionNote, setContributionNote] = useState('');
    const resetForm = () => {
        setFormData({
            title: '',
            targetAmount: '',
            currentAmount: '0',
            deadline: '',
            category: 'other',
        });
        setEditingGoal(null);
    };
    const openAddModal = () => {
        resetForm();
        setIsModalOpen(true);
    };
    const openEditModal = (goal) => {
        setEditingGoal(goal);
        setFormData({
            title: goal.title,
            targetAmount: goal.targetAmount.toString(),
            currentAmount: goal.currentAmount.toString(),
            deadline: goal.deadline.split('T')[0],
            category: goal.category,
        });
        setIsModalOpen(true);
    };
    const openContributionModal = (goalId) => {
        setSelectedGoalId(goalId);
        setContributionAmount('');
        setContributionNote('');
        setIsContributionModalOpen(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.targetAmount || !formData.deadline)
            return;
        if (editingGoal) {
            dispatch(updateGoal({
                id: editingGoal.id,
                title: formData.title,
                targetAmount: parseFloat(formData.targetAmount),
                deadline: new Date(formData.deadline).toISOString(),
                category: formData.category,
            }));
        }
        else {
            dispatch(addGoal({
                title: formData.title,
                targetAmount: parseFloat(formData.targetAmount),
                currentAmount: parseFloat(formData.currentAmount) || 0,
                deadline: new Date(formData.deadline).toISOString(),
                category: formData.category,
            }));
        }
        setIsModalOpen(false);
        resetForm();
    };
    const handleAddContribution = (e) => {
        e.preventDefault();
        if (!selectedGoalId || !contributionAmount)
            return;
        dispatch(addContribution({
            goalId: selectedGoalId,
            amount: parseFloat(contributionAmount),
            note: contributionNote || undefined,
        }));
        setIsContributionModalOpen(false);
        setContributionAmount('');
        setContributionNote('');
        setSelectedGoalId(null);
    };
    const handleDelete = (id) => {
        dispatch(deleteGoal(id));
        setDeleteConfirmId(null);
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-slate-800 dark:text-white", children: t.goals.title }), _jsx("p", { className: "text-slate-500 dark:text-gray-400", children: t.goals.subtitle })] }), _jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: openAddModal, className: "flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors", children: [_jsx(PlusIcon, { className: "h-5 w-5" }), t.goals.newGoal] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400 mb-1", children: t.goals.totalSaved }), _jsxs("p", { className: "text-2xl font-bold text-slate-800 dark:text-white", children: ["\u20BC", stats.totalSaved.toLocaleString()] }), _jsxs("p", { className: "text-sm text-slate-500 dark:text-gray-400", children: ["/ \u20BC", stats.totalTarget.toLocaleString()] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400 mb-1", children: t.goals.activeGoals }), _jsx("p", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400", children: stats.activeCount })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400 mb-1", children: t.goals.completed }), _jsx("p", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: stats.completedCount })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400 mb-1", children: t.goals.percentCompleted }), _jsxs("p", { className: "text-2xl font-bold text-purple-600 dark:text-purple-400", children: [stats.overallProgress.toFixed(0), "%"] })] })] }), goals.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: goals.map((goal, index) => {
                    const progress = calculateGoalProgress(goal);
                    const categoryInfo = getGoalCategoryInfo(goal.category);
                    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: `bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border ${progress.isCompleted
                            ? 'border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-900/10'
                            : progress.isOverdue
                                ? 'border-red-200 dark:border-red-900 bg-red-50/30 dark:bg-red-900/10'
                                : 'border-slate-100 dark:border-gray-700'}`, children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center text-2xl", style: { backgroundColor: `${categoryInfo.color}20` }, children: progress.isCompleted ? (_jsx(CheckCircleIcon, { className: "h-6 w-6 text-green-600 dark:text-green-400" })) : (categoryInfo.icon) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-slate-800 dark:text-white", children: goal.title }), _jsx("span", { className: "text-sm text-slate-500 dark:text-gray-400", children: currentLanguage === 'az' ? categoryInfo.nameAz : categoryInfo.nameEn })] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [progress.isCompleted ? (_jsx("span", { className: "px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-lg", children: t.goals.completedStatus })) : progress.isOverdue ? (_jsx("span", { className: "px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-medium rounded-lg", children: t.goals.overdue })) : (_jsxs("span", { className: "text-sm text-slate-500 dark:text-gray-400", children: [progress.daysLeft, " ", t.goals.daysLeft] })), _jsx("button", { onClick: () => openEditModal(goal), className: "p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all", children: _jsx(PencilIcon, { className: "h-4 w-4" }) }), _jsx("button", { onClick: () => setDeleteConfirmId(goal.id), className: "p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all", children: _jsx(TrashIcon, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsxs("span", { className: "text-slate-600 dark:text-gray-300 font-medium", children: ["\u20BC", goal.currentAmount.toLocaleString()] }), _jsxs("span", { className: "text-slate-500 dark:text-gray-400", children: ["\u20BC", goal.targetAmount.toLocaleString()] })] }), _jsx("div", { className: "h-3 bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${progress.percentage}%` }, transition: { duration: 1, delay: index * 0.1 }, className: "h-full rounded-full", style: {
                                                backgroundColor: progress.isCompleted
                                                    ? '#10b981'
                                                    : progress.isOverdue
                                                        ? '#ef4444'
                                                        : categoryInfo.color,
                                            } }) }), _jsxs("div", { className: "flex justify-between mt-2", children: [_jsxs("p", { className: "text-sm text-slate-500 dark:text-gray-400", children: [progress.percentage.toFixed(0), "% ", t.goals.percentCompleted] }), !progress.isCompleted && progress.daysLeft > 0 && (_jsxs("p", { className: "text-sm text-slate-500 dark:text-gray-400", children: [t.goals.dailyNeeded, ": \u20BC", progress.dailySavingsNeeded.toFixed(0)] }))] })] }), !progress.isCompleted && (_jsxs("button", { onClick: () => openContributionModal(goal.id), className: "w-full py-2.5 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-200 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2", children: [_jsx(BanknotesIcon, { className: "h-4 w-4" }), t.goals.addMoney] })), progress.isCompleted && (_jsx("div", { className: "text-center py-2 text-green-600 dark:text-green-400 font-medium", children: t.goals.congratulations }))] }, goal.id));
                }) })) : (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-card border border-slate-100 dark:border-gray-700 text-center", children: [_jsx(FlagIcon, { className: "h-12 w-12 text-slate-300 dark:text-gray-600 mx-auto mb-4" }), _jsx("p", { className: "text-slate-500 dark:text-gray-400 mb-2", children: t.goals.noGoals }), _jsx("p", { className: "text-sm text-slate-400 dark:text-gray-500", children: t.goals.createFirst })] })), _jsx(AnimatePresence, { children: isModalOpen && (_jsxs(Dialog, { open: isModalOpen, onClose: () => setIsModalOpen(false), className: "relative z-50", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 backdrop-blur-sm" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(Dialog.Panel, { as: motion.div, initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx(Dialog.Title, { className: "text-xl font-bold text-slate-800 dark:text-white", children: editingGoal ? t.goals.editGoal : t.goals.newGoal }), _jsx("button", { onClick: () => setIsModalOpen(false), className: "p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700", children: _jsx(XMarkIcon, { className: "h-5 w-5" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.goals.goalName }), _jsx("input", { type: "text", value: formData.title, onChange: (e) => setFormData({ ...formData, title: e.target.value }), className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.goals.selectCategory }), _jsx("select", { value: formData.category, onChange: (e) => setFormData({ ...formData, category: e.target.value }), className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30", children: GOAL_CATEGORIES.map((cat) => (_jsxs("option", { value: cat.id, children: [cat.icon, " ", currentLanguage === 'az' ? cat.nameAz : cat.nameEn] }, cat.id))) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.goals.targetAmount }), _jsx("input", { type: "number", value: formData.targetAmount, onChange: (e) => setFormData({ ...formData, targetAmount: e.target.value }), className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30", required: true })] }), !editingGoal && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.goals.currentAmount }), _jsx("input", { type: "number", value: formData.currentAmount, onChange: (e) => setFormData({ ...formData, currentAmount: e.target.value }), className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30" })] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.goals.deadline }), _jsx("input", { type: "date", value: formData.deadline, onChange: (e) => setFormData({ ...formData, deadline: e.target.value }), className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30", required: true })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { type: "button", onClick: () => setIsModalOpen(false), className: "flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600", children: t.common.cancel }), _jsx("button", { type: "submit", className: "flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700", children: editingGoal ? t.common.save : t.common.add })] })] })] }) })] })) }), _jsx(AnimatePresence, { children: isContributionModalOpen && (_jsxs(Dialog, { open: isContributionModalOpen, onClose: () => setIsContributionModalOpen(false), className: "relative z-50", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 backdrop-blur-sm" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(Dialog.Panel, { as: motion.div, initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx(Dialog.Title, { className: "text-xl font-bold text-slate-800 dark:text-white", children: t.goals.addContribution }), _jsx("button", { onClick: () => setIsContributionModalOpen(false), className: "p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700", children: _jsx(XMarkIcon, { className: "h-5 w-5" }) })] }), _jsxs("form", { onSubmit: handleAddContribution, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.goals.contributionAmount }), _jsx("input", { type: "number", value: contributionAmount, onChange: (e) => setContributionAmount(e.target.value), placeholder: "0", className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.goals.contributionNote }), _jsx("input", { type: "text", value: contributionNote, onChange: (e) => setContributionNote(e.target.value), className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30" })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { type: "button", onClick: () => setIsContributionModalOpen(false), className: "flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600", children: t.common.cancel }), _jsx("button", { type: "submit", className: "flex-1 py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700", children: t.common.add })] })] })] }) })] })) }), _jsx(AnimatePresence, { children: deleteConfirmId && (_jsxs(Dialog, { open: !!deleteConfirmId, onClose: () => setDeleteConfirmId(null), className: "relative z-50", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 backdrop-blur-sm" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(Dialog.Panel, { as: motion.div, initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, className: "w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center", children: _jsx(TrashIcon, { className: "h-8 w-8 text-red-600 dark:text-red-400" }) }), _jsx(Dialog.Title, { className: "text-xl font-bold text-slate-800 dark:text-white mb-2", children: t.goals.deleteGoal }), _jsx("p", { className: "text-slate-500 dark:text-gray-400 mb-6", children: t.goals.deleteConfirm }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => setDeleteConfirmId(null), className: "flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600", children: t.common.cancel }), _jsx("button", { onClick: () => handleDelete(deleteConfirmId), className: "flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700", children: t.common.delete })] })] }) })] })) })] }));
};
export default Goals;
