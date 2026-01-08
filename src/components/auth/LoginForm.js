import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser, clearError } from '../../store/authSlice';
import { useLanguage } from '../../i18n';
import { LanguageSwitcher } from '../common';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ExclamationCircleIcon, } from '@heroicons/react/24/outline';
const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    const { t } = useLanguage();
    // Redirect to dashboard if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const validateForm = () => {
        const errors = {};
        if (!email) {
            errors.email = t.auth.errors.emailRequired;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = t.auth.errors.emailInvalid;
        }
        if (!password) {
            errors.password = t.auth.errors.passwordRequired;
        }
        else if (password.length < 6) {
            errors.password = t.auth.errors.passwordMin;
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearError());
        if (!validateForm())
            return;
        dispatch(loginUser({ email, password }));
    };
    const fillDemoCredentials = () => {
        setEmail('demo@wealthtracker.com');
        setPassword('demo123');
        setValidationErrors({});
    };
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4", children: [_jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [_jsx("div", { className: "absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" }), _jsx("div", { className: "absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" })] }), _jsx("div", { className: "absolute top-4 right-4 z-10", children: _jsx(LanguageSwitcher, { variant: "minimal" }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "relative w-full max-w-md", children: _jsxs("div", { className: "bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2, type: 'spring', stiffness: 200 }, className: "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30", children: _jsx("span", { className: "text-2xl font-bold text-white", children: "W" }) }), _jsx("h1", { className: "text-2xl font-bold text-white mb-2", children: t.auth.loginTitle }), _jsx("p", { className: "text-slate-400", children: t.auth.loginSubtitle })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: t.auth.email }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: _jsx(EnvelopeIcon, { className: "h-5 w-5 text-slate-400" }) }), _jsx("input", { type: "email", value: email, onChange: (e) => {
                                                        setEmail(e.target.value);
                                                        if (validationErrors.email) {
                                                            setValidationErrors((prev) => ({ ...prev, email: undefined }));
                                                        }
                                                    }, placeholder: "demo@wealthtracker.com", className: `w-full pl-12 pr-4 py-3 bg-white/5 border ${validationErrors.email
                                                        ? 'border-red-500'
                                                        : 'border-white/10 focus:border-blue-500'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all` })] }), validationErrors.email && (_jsxs(motion.p, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "mt-2 text-sm text-red-400 flex items-center gap-1", children: [_jsx(ExclamationCircleIcon, { className: "h-4 w-4" }), validationErrors.email] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-300 mb-2", children: t.auth.password }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: _jsx(LockClosedIcon, { className: "h-5 w-5 text-slate-400" }) }), _jsx("input", { type: showPassword ? 'text' : 'password', value: password, onChange: (e) => {
                                                        setPassword(e.target.value);
                                                        if (validationErrors.password) {
                                                            setValidationErrors((prev) => ({ ...prev, password: undefined }));
                                                        }
                                                    }, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: `w-full pl-12 pr-12 py-3 bg-white/5 border ${validationErrors.password
                                                        ? 'border-red-500'
                                                        : 'border-white/10 focus:border-blue-500'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all` }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors", children: showPassword ? (_jsx(EyeSlashIcon, { className: "h-5 w-5" })) : (_jsx(EyeIcon, { className: "h-5 w-5" })) })] }), validationErrors.password && (_jsxs(motion.p, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "mt-2 text-sm text-red-400 flex items-center gap-1", children: [_jsx(ExclamationCircleIcon, { className: "h-4 w-4" }), validationErrors.password] }))] }), error && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "p-4 bg-red-500/10 border border-red-500/30 rounded-xl", children: _jsxs("p", { className: "text-sm text-red-400 flex items-center gap-2", children: [_jsx(ExclamationCircleIcon, { className: "h-5 w-5" }), error] }) })), _jsx(motion.button, { type: "submit", disabled: isLoading, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", children: isLoading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), t.auth.loggingIn] })) : (t.auth.login) })] }), _jsxs("div", { className: "mt-6 pt-6 border-t border-white/10", children: [_jsx("p", { className: "text-center text-sm text-slate-400 mb-3", children: t.auth.demoTitle }), _jsx("button", { type: "button", onClick: fillDemoCredentials, className: "w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl transition-all text-sm", children: t.auth.demoBtn }), _jsx("p", { className: "text-center text-xs text-slate-500 mt-3", children: "Email: demo@wealthtracker.com | Password: demo123" })] }), _jsx("div", { className: "mt-4 text-center", children: _jsxs("p", { className: "text-slate-400", children: [t.auth.noAccount, ' ', _jsx(Link, { to: "/register", className: "text-blue-400 hover:text-blue-300 font-medium transition-colors", children: t.auth.registerLink })] }) })] }) })] }));
};
export default LoginForm;
