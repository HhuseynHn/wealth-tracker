import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlusIcon, ArrowRightOnRectangleIcon, ChartBarIcon, ShieldCheckIcon, BanknotesIcon, } from '@heroicons/react/24/outline';
import { useLanguage } from '../i18n';
import { LanguageSwitcher } from '../components/common';
const Welcome = () => {
    const { t } = useLanguage();
    const features = [
        {
            icon: ChartBarIcon,
            title: t.welcome.features.finance,
            description: t.welcome.features.financeDesc,
        },
        {
            icon: BanknotesIcon,
            title: t.welcome.features.investment,
            description: t.welcome.features.investmentDesc,
        },
        {
            icon: ShieldCheckIcon,
            title: t.welcome.features.security,
            description: t.welcome.features.securityDesc,
        },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col", children: [_jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [_jsx("div", { className: "absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" }), _jsx("div", { className: "absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" }), _jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" })] }), _jsx("div", { className: "absolute top-4 right-4 z-10", children: _jsx(LanguageSwitcher, { variant: "minimal" }) }), _jsxs("div", { className: "relative flex-1 flex flex-col items-center justify-center p-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-center mb-12", children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2, type: 'spring', stiffness: 200 }, className: "inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mb-6 shadow-2xl shadow-blue-500/30", children: _jsx("span", { className: "text-4xl font-bold text-white", children: "W" }) }), _jsx("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-4", children: t.welcome.title }), _jsx("p", { className: "text-xl text-slate-400 max-w-md mx-auto", children: t.welcome.subtitle })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3, duration: 0.6 }, className: "flex flex-wrap justify-center gap-6 mb-12 max-w-2xl", children: features.map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 + index * 0.1 }, className: "flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10", children: [_jsx(feature.icon, { className: "h-6 w-6 text-blue-400" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white text-sm", children: feature.title }), _jsx("p", { className: "text-xs text-slate-400", children: feature.description })] })] }, feature.title))) }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.6, duration: 0.5 }, className: "bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 max-w-md w-full", children: [_jsx("h2", { className: "text-2xl font-bold text-white text-center mb-2", children: t.welcome.greeting }), _jsx("p", { className: "text-slate-400 text-center mb-8", children: t.welcome.hasAccount }), _jsxs("div", { className: "space-y-4", children: [_jsx(Link, { to: "/login", children: _jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-3", children: [_jsx(ArrowRightOnRectangleIcon, { className: "h-6 w-6" }), t.welcome.loginBtn] }) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex-1 h-px bg-white/10" }), _jsx("span", { className: "text-slate-500 text-sm", children: t.common.or }), _jsx("div", { className: "flex-1 h-px bg-white/10" })] }), _jsx(Link, { to: "/register", children: _jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "w-full py-4 px-6 bg-white/5 hover:bg-white/10 border-2 border-white/20 text-white font-semibold rounded-2xl transition-all flex items-center justify-center gap-3", children: [_jsx(UserPlusIcon, { className: "h-6 w-6" }), t.welcome.registerBtn] }) })] }), _jsx("div", { className: "mt-8 pt-6 border-t border-white/10 text-center", children: _jsxs("p", { className: "text-sm text-slate-500", children: [t.welcome.demoAccount, ": ", _jsx("span", { className: "text-slate-400", children: "demo@wealthtracker.com" }), " / ", _jsx("span", { className: "text-slate-400", children: "demo123" })] }) })] })] }), _jsx(motion.footer, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.8 }, className: "relative py-6 text-center", children: _jsx("p", { className: "text-slate-500 text-sm", children: t.welcome.footer }) })] }));
};
export default Welcome;
