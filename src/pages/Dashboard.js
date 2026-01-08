import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, BanknotesIcon, ChartPieIcon, ArrowUpIcon, ArrowDownIcon, PlusIcon, } from '@heroicons/react/24/outline';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, } from 'recharts';
import { useLanguage } from '../i18n';
import { useAppSelector } from '../store/hooks';
import { useTheme } from '../hooks';
import { selectTransactionStats, selectMonthlyStats, selectCategoryStats, selectRecentTransactions, } from '../store/transactionSlice';
import { getCategoryInfo } from '../types/transaction';
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
const Dashboard = () => {
    const { t, currentLanguage } = useLanguage();
    const { isDark, chartColors, resolvedTheme } = useTheme();
    const stats = useAppSelector(selectTransactionStats);
    const monthlyStats = useAppSelector(selectMonthlyStats);
    const categoryStats = useAppSelector(selectCategoryStats);
    const recentTransactions = useAppSelector((state) => selectRecentTransactions(state, 5));
    const statCards = [
        {
            name: t.dashboard.totalBalance,
            value: `₼${stats.balance.toLocaleString()}`,
            change: stats.balance >= 0 ? '+' : '',
            trend: stats.balance >= 0 ? 'up' : 'down',
            icon: BanknotesIcon,
            color: 'blue',
        },
        {
            name: t.dashboard.monthlyIncome,
            value: `₼${monthlyStats.income.toLocaleString()}`,
            change: '+100%',
            trend: 'up',
            icon: ArrowTrendingUpIcon,
            color: 'green',
        },
        {
            name: t.dashboard.monthlyExpense,
            value: `₼${monthlyStats.expense.toLocaleString()}`,
            change: '-',
            trend: 'down',
            icon: ArrowTrendingDownIcon,
            color: 'red',
        },
        {
            name: t.dashboard.monthlySavings,
            value: `₼${monthlyStats.savings.toLocaleString()}`,
            change: monthlyStats.savings >= 0 ? '+' : '',
            trend: monthlyStats.savings >= 0 ? 'up' : 'down',
            icon: ChartPieIcon,
            color: 'purple',
        },
    ];
    // Generate chart data for last 6 months - cached with useMemo
    const chartData = useMemo(() => {
        const months = currentLanguage === 'az'
            ? ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun', 'İyul', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const now = new Date();
        const data = [];
        // Use fixed seed for consistent data (based on month/year)
        const seed = now.getFullYear() * 12 + now.getMonth();
        // Simple seeded random function
        let seedValue = seed;
        const seededRandom = () => {
            seedValue = (seedValue * 9301 + 49297) % 233280;
            return seedValue / 233280;
        };
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            data.push({
                name: months[date.getMonth()],
                [currentLanguage === 'az' ? 'gəlir' : 'income']: Math.floor(seededRandom() * 3000) + 4000,
                [currentLanguage === 'az' ? 'xərc' : 'expense']: Math.floor(seededRandom() * 2000) + 2000,
            });
        }
        return data;
    }, [currentLanguage]); // Only regenerate when language changes
    const incomeKey = currentLanguage === 'az' ? 'gəlir' : 'income';
    const expenseKey = currentLanguage === 'az' ? 'xərc' : 'expense';
    // Pie chart data
    const pieData = categoryStats.slice(0, 5).map((cat) => {
        const info = getCategoryInfo(cat.category);
        return {
            name: currentLanguage === 'az' ? info.nameAz : info.nameEn,
            value: Math.round(cat.percentage),
            color: info.color,
        };
    });
    return (_jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-slate-800 dark:text-white", children: t.dashboard.title }), _jsx("p", { className: "text-slate-500 dark:text-gray-400", children: t.dashboard.subtitle })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Link, { to: "/transactions", children: _jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl font-medium shadow-lg shadow-green-500/30 hover:bg-green-700 transition-colors", children: [_jsx(PlusIcon, { className: "h-5 w-5" }), t.dashboard.addIncome] }) }), _jsx(Link, { to: "/transactions", children: _jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium shadow-lg shadow-red-500/30 hover:bg-red-700 transition-colors", children: [_jsx(PlusIcon, { className: "h-5 w-5" }), t.dashboard.addExpense] }) })] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6", children: statCards.map((stat) => (_jsxs(motion.div, { variants: itemVariants, className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx("div", { className: `p-2.5 rounded-xl ${stat.color === 'blue'
                                        ? 'bg-blue-50 dark:bg-blue-900/30'
                                        : stat.color === 'green'
                                            ? 'bg-green-50 dark:bg-green-900/30'
                                            : stat.color === 'red'
                                                ? 'bg-red-50 dark:bg-red-900/30'
                                                : 'bg-purple-50 dark:bg-purple-900/30'}`, children: _jsx(stat.icon, { className: `h-5 w-5 ${stat.color === 'blue'
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : stat.color === 'green'
                                                ? 'text-green-600 dark:text-green-400'
                                                : stat.color === 'red'
                                                    ? 'text-red-600 dark:text-red-400'
                                                    : 'text-purple-600 dark:text-purple-400'}` }) }), _jsx("span", { className: `flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`, children: stat.trend === 'up' ? (_jsx(ArrowUpIcon, { className: "h-3.5 w-3.5" })) : (_jsx(ArrowDownIcon, { className: "h-3.5 w-3.5" })) })] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-2xl font-bold text-slate-800 dark:text-white", children: stat.value }), _jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400", children: stat.name })] })] }, stat.name))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(motion.div, { variants: itemVariants, className: "lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-slate-800 dark:text-white", children: t.dashboard.incomeVsExpense }), _jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400", children: t.dashboard.last6Months })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-blue-500" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-gray-400", children: t.dashboard.income })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-red-400" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-gray-400", children: t.dashboard.expense })] })] })] }), _jsx("div", { className: "h-72", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: chartData, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "colorIncome", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#3b82f6", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "#3b82f6", stopOpacity: 0 })] }), _jsxs("linearGradient", { id: "colorExpense", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#f87171", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "#f87171", stopOpacity: 0 })] })] }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: chartColors.grid }), _jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fill: chartColors.text, fontSize: 12 } }), _jsx(YAxis, { axisLine: false, tickLine: false, tick: { fill: chartColors.text, fontSize: 12 } }), _jsx(Tooltip, { contentStyle: {
                                                    backgroundColor: chartColors.tooltipBg,
                                                    border: `1px solid ${chartColors.tooltipBorder}`,
                                                    borderRadius: '12px',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                    color: chartColors.tooltipText,
                                                }, labelStyle: { color: chartColors.tooltipText }, itemStyle: { color: chartColors.tooltipText } }), _jsx(Area, { type: "monotone", dataKey: incomeKey, stroke: "#3b82f6", strokeWidth: 2, fillOpacity: 1, fill: "url(#colorIncome)" }), _jsx(Area, { type: "monotone", dataKey: expenseKey, stroke: "#f87171", strokeWidth: 2, fillOpacity: 1, fill: "url(#colorExpense)" })] }, resolvedTheme) }) })] }), _jsxs(motion.div, { variants: itemVariants, className: "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "font-semibold text-slate-800 dark:text-white", children: t.dashboard.expenseCategories }), _jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400", children: t.dashboard.thisMonth })] }), pieData.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-48", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: pieData, cx: "50%", cy: "50%", innerRadius: 50, outerRadius: 80, paddingAngle: 3, dataKey: "value", children: pieData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: {
                                                            backgroundColor: chartColors.tooltipBg,
                                                            border: `1px solid ${chartColors.tooltipBorder}`,
                                                            borderRadius: '12px',
                                                            color: chartColors.tooltipText,
                                                        }, itemStyle: { color: chartColors.tooltipText }, formatter: (value) => [`${value}%`, ''] })] }, resolvedTheme) }) }), _jsx("div", { className: "grid grid-cols-2 gap-2 mt-4", children: pieData.map((item) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2.5 h-2.5 rounded-full", style: { backgroundColor: item.color } }), _jsx("span", { className: "text-xs text-slate-600 dark:text-gray-400", children: item.name }), _jsxs("span", { className: "text-xs font-medium text-slate-800 dark:text-gray-200 ml-auto", children: [item.value, "%"] })] }, item.name))) })] })) : (_jsx("div", { className: "h-48 flex items-center justify-center text-slate-400 dark:text-gray-500", children: t.common.noData }))] })] }), _jsxs(motion.div, { variants: itemVariants, className: "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-slate-800 dark:text-white", children: t.dashboard.recentTransactions }), _jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400", children: t.dashboard.last5Transactions })] }), _jsxs(Link, { to: "/transactions", className: "text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors", children: [t.dashboard.viewAll, " \u2192"] })] }), recentTransactions.length > 0 ? (_jsx("div", { className: "space-y-3", children: recentTransactions.map((transaction) => {
                            const categoryInfo = getCategoryInfo(transaction.category);
                            return (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`, children: _jsx("span", { className: "text-lg", children: categoryInfo.icon }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-800 dark:text-white", children: transaction.description }), _jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400", children: currentLanguage === 'az' ? categoryInfo.nameAz : categoryInfo.nameEn })] })] }), _jsxs("span", { className: `font-semibold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`, children: [transaction.type === 'income' ? '+' : '-', "\u20BC", transaction.amount.toLocaleString()] })] }, transaction.id));
                        }) })) : (_jsx("div", { className: "py-12 text-center text-slate-400 dark:text-gray-500", children: t.dashboard.noTransactions }))] })] }));
};
export default Dashboard;
