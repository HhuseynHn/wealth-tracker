import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownTrayIcon, DocumentChartBarIcon, } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, } from 'recharts';
import { useLanguage } from '../i18n';
import { useAppSelector } from '../store/hooks';
import { useTheme } from '../hooks';
import { selectTransactionStats, selectCategoryStats } from '../store/transactionSlice';
import { getCategoryInfo } from '../types/transaction';
const Reports = () => {
    const { t, currentLanguage } = useLanguage();
    const { chartColors, resolvedTheme } = useTheme();
    // const stats = useAppSelector(selectTransactionStats)
    const categoryStats = useAppSelector(selectCategoryStats);
    const [dateRange, setDateRange] = useState('thisYear');
    const months = currentLanguage === 'az'
        ? ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun', 'İyul', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Generate monthly data - cached with useMemo
    const monthlyData = useMemo(() => {
        // Use fixed seed for consistent data (based on current year)
        const seed = new Date().getFullYear();
        let seedValue = seed;
        // Simple seeded random function
        const seededRandom = () => {
            seedValue = (seedValue * 9301 + 49297) % 233280;
            return seedValue / 233280;
        };
        return months.slice(0, 11).map((month) => ({
            name: month,
            [currentLanguage === 'az' ? 'gəlir' : 'income']: Math.floor(seededRandom() * 3000) + 5000,
            [currentLanguage === 'az' ? 'xərc' : 'expense']: Math.floor(seededRandom() * 2000) + 3000,
        }));
    }, [currentLanguage, months]);
    const savingsData = useMemo(() => {
        // Use fixed seed for consistent data (based on current year + 1000)
        const seed = new Date().getFullYear() + 1000;
        let seedValue = seed;
        // Simple seeded random function
        const seededRandom = () => {
            seedValue = (seedValue * 9301 + 49297) % 233280;
            return seedValue / 233280;
        };
        return months.slice(0, 11).map((month) => ({
            name: month,
            [currentLanguage === 'az' ? 'qənaət' : 'savings']: Math.floor(seededRandom() * 2000) + 1500,
        }));
    }, [currentLanguage, months]);
    const incomeKey = currentLanguage === 'az' ? 'gəlir' : 'income';
    const expenseKey = currentLanguage === 'az' ? 'xərc' : 'expense';
    const savingsKey = currentLanguage === 'az' ? 'qənaət' : 'savings';
    const totalIncome = monthlyData.reduce((sum, m) => sum + m[incomeKey], 0);
    const totalExpense = monthlyData.reduce((sum, m) => sum + m[expenseKey], 0);
    const totalSavings = savingsData.reduce((sum, s) => sum + s[savingsKey], 0);
    const avgMonthlySavings = Math.round(totalSavings / savingsData.length);
    // Category pie data
    const pieData = categoryStats.slice(0, 5).map((cat) => {
        const info = getCategoryInfo(cat.category);
        return {
            name: currentLanguage === 'az' ? info.nameAz : info.nameEn,
            value: cat.total,
            color: info.color,
        };
    });
    const dateRangeOptions = [
        { value: 'thisMonth', label: t.reports.thisMonth },
        { value: 'lastMonth', label: t.reports.lastMonth },
        { value: 'last3Months', label: t.reports.last3Months },
        { value: 'last6Months', label: t.reports.last6Months },
        { value: 'thisYear', label: t.reports.thisYear },
    ];
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-slate-800 dark:text-white", children: t.reports.title }), _jsx("p", { className: "text-slate-500 dark:text-gray-400", children: t.reports.subtitle })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("select", { value: dateRange, onChange: (e) => setDateRange(e.target.value), className: "px-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-700 dark:text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30", children: dateRangeOptions.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) }), _jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors", children: [_jsx(ArrowDownTrayIcon, { className: "h-5 w-5" }), t.reports.downloadPdf] })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400 mb-1", children: t.reports.yearlyIncome }), _jsxs("p", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: ["\u20BC", totalIncome.toLocaleString()] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400 mb-1", children: t.reports.yearlyExpense }), _jsxs("p", { className: "text-2xl font-bold text-red-600 dark:text-red-400", children: ["\u20BC", totalExpense.toLocaleString()] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400 mb-1", children: t.reports.yearlySavings }), _jsxs("p", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400", children: ["\u20BC", totalSavings.toLocaleString()] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400 mb-1", children: t.reports.avgMonthlySavings }), _jsxs("p", { className: "text-2xl font-bold text-purple-600 dark:text-purple-400", children: ["\u20BC", avgMonthlySavings.toLocaleString()] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-slate-800 dark:text-white", children: t.reports.incomeVsExpense }), _jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400", children: t.reports.monthlyComparison })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-blue-500" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-gray-400", children: t.dashboard.income })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-red-400" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-gray-400", children: t.dashboard.expense })] })] })] }), _jsx("div", { className: "h-72", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: monthlyData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: chartColors.grid }), _jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fill: chartColors.text, fontSize: 12 } }), _jsx(YAxis, { axisLine: false, tickLine: false, tick: { fill: chartColors.text, fontSize: 12 } }), _jsx(Tooltip, { contentStyle: {
                                                    backgroundColor: chartColors.tooltipBg,
                                                    border: `1px solid ${chartColors.tooltipBorder}`,
                                                    borderRadius: '12px',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                    color: chartColors.tooltipText,
                                                }, labelStyle: { color: chartColors.tooltipText }, itemStyle: { color: chartColors.tooltipText }, formatter: (value) => [`₼${(value ?? 0).toLocaleString()}`, ''] }), _jsx(Bar, { dataKey: incomeKey, fill: "#3b82f6", radius: [4, 4, 0, 0] }), _jsx(Bar, { dataKey: expenseKey, fill: "#f87171", radius: [4, 4, 0, 0] })] }, resolvedTheme) }) })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-slate-800 dark:text-white", children: t.reports.savingsTrend }), _jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400", children: t.reports.monthlySavings })] }), _jsx(DocumentChartBarIcon, { className: "h-6 w-6 text-slate-400 dark:text-gray-500" })] }), _jsx("div", { className: "h-72", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: savingsData, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "colorSavings", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#10b981", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "#10b981", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: chartColors.grid }), _jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fill: chartColors.text, fontSize: 12 } }), _jsx(YAxis, { axisLine: false, tickLine: false, tick: { fill: chartColors.text, fontSize: 12 } }), _jsx(Tooltip, { contentStyle: {
                                                    backgroundColor: chartColors.tooltipBg,
                                                    border: `1px solid ${chartColors.tooltipBorder}`,
                                                    borderRadius: '12px',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                    color: chartColors.tooltipText,
                                                }, labelStyle: { color: chartColors.tooltipText }, itemStyle: { color: chartColors.tooltipText }, formatter: (value) => [`₼${(value ?? 0).toLocaleString()}`, t.reports.savings] }), _jsx(Line, { type: "monotone", dataKey: savingsKey, stroke: "#10b981", strokeWidth: 3, dot: { fill: '#10b981', strokeWidth: 2 }, activeDot: { r: 6 } })] }, resolvedTheme) }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("h3", { className: "font-semibold text-slate-800 dark:text-white mb-4", children: t.reports.categoryBreakdown }), pieData.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-48", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: pieData, cx: "50%", cy: "50%", innerRadius: 50, outerRadius: 80, paddingAngle: 3, dataKey: "value", children: pieData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: {
                                                            backgroundColor: chartColors.tooltipBg,
                                                            border: `1px solid ${chartColors.tooltipBorder}`,
                                                            borderRadius: '12px',
                                                            color: chartColors.tooltipText,
                                                        }, itemStyle: { color: chartColors.tooltipText }, formatter: (value) => [`₼${(value ?? 0).toLocaleString()}`, ''] })] }, resolvedTheme) }) }), _jsx("div", { className: "space-y-2 mt-4", children: pieData.map((item) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: item.color } }), _jsx("span", { className: "text-sm text-slate-600 dark:text-gray-400", children: item.name })] }), _jsxs("span", { className: "text-sm font-medium text-slate-800 dark:text-gray-200", children: ["\u20BC", item.value.toLocaleString()] })] }, item.name))) })] })) : (_jsx("div", { className: "h-48 flex items-center justify-center text-slate-400 dark:text-gray-500", children: t.common.noData }))] }), _jsxs("div", { className: "lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("h3", { className: "font-semibold text-slate-800 dark:text-white mb-4", children: t.reports.topCategories }), categoryStats.length > 0 ? (_jsx("div", { className: "space-y-4", children: categoryStats.slice(0, 5).map((cat, index) => {
                                    const info = getCategoryInfo(cat.category);
                                    return (_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center", style: { backgroundColor: `${info.color}20` }, children: _jsx("span", { className: "text-lg", children: info.icon }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex justify-between mb-1", children: [_jsx("span", { className: "font-medium text-slate-700 dark:text-gray-200", children: currentLanguage === 'az' ? info.nameAz : info.nameEn }), _jsxs("span", { className: "font-semibold text-slate-800 dark:text-white", children: ["\u20BC", cat.total.toLocaleString()] })] }), _jsx("div", { className: "h-2 bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${cat.percentage}%` }, transition: { duration: 0.8, delay: index * 0.1 }, className: "h-full rounded-full", style: { backgroundColor: info.color } }) })] }), _jsxs("span", { className: "text-sm text-slate-500 dark:text-gray-400 w-12 text-right", children: [cat.percentage.toFixed(0), "%"] })] }, cat.category));
                                }) })) : (_jsx("div", { className: "py-12 text-center text-slate-400 dark:text-gray-500", children: t.common.noData }))] })] })] }));
};
export default Reports;
