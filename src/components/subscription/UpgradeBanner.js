import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { SparklesIcon, XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useLanguage } from '../../i18n';
export const UpgradeBanner = ({ variant = 'inline' }) => {
    const { t } = useLanguage();
    const { currentPlan } = useAppSelector((state) => state.subscription);
    const [isDismissed, setIsDismissed] = useState(false);
    // Don't show if already on paid plan or dismissed
    if (currentPlan !== 'free' || isDismissed) {
        return null;
    }
    if (variant === 'floating') {
        return (_jsx(motion.div, { initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 }, className: "fixed bottom-4 right-4 z-40 max-w-sm", children: _jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 shadow-lg", children: [_jsx("button", { onClick: () => setIsDismissed(true), className: "absolute top-2 right-2 p-1 text-white/70 hover:text-white rounded-full", children: _jsx(XMarkIcon, { className: "w-4 h-4" }) }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0", children: _jsx(SparklesIcon, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-bold text-white", children: t.header.proPlan }), _jsx("p", { className: "text-sm text-white/80 mt-1", children: t.header.proDesc }), _jsxs(Link, { to: "/pricing", className: "inline-flex items-center gap-1 mt-3 text-sm font-medium text-white hover:underline", children: [t.header.upgrade, _jsx(ArrowRightIcon, { className: "w-4 h-4" })] })] })] })] }) }));
    }
    if (variant === 'card') {
        return (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-100 dark:border-blue-800", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg", children: _jsx(SparklesIcon, { className: "w-7 h-7 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-white", children: t.header.proPlan }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-0.5", children: t.header.proDesc })] }), _jsx(Link, { to: "/pricing", className: "px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-colors", children: t.header.upgrade })] }) }));
    }
    // Inline variant (default)
    return (_jsxs(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl px-4 py-3 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(SparklesIcon, { className: "w-5 h-5 text-white" }), _jsxs("div", { className: "text-white", children: [_jsx("span", { className: "font-medium", children: t.header.proPlan }), _jsx("span", { className: "mx-2 text-white/50", children: "|" }), _jsx("span", { className: "text-white/80 text-sm", children: t.header.proDesc })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Link, { to: "/pricing", className: "px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors", children: t.header.upgrade }), _jsx("button", { onClick: () => setIsDismissed(true), className: "p-1.5 text-white/70 hover:text-white rounded-lg transition-colors", children: _jsx(XMarkIcon, { className: "w-4 h-4" }) })] })] }));
};
