import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, CogIcon, ShieldCheckIcon, BellIcon, ArrowDownTrayIcon, TrashIcon, CheckIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../i18n';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateProfile } from '../store/settingsSlice';
export const Profile = () => {
    const { t } = useLanguage();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { settings } = useAppSelector((state) => state.settings);
    const [activeTab, setActiveTab] = useState('personal');
    const [isSaving, setIsSaving] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
    // Form state
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        country: 'Azerbaijan',
    });
    // Password form
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const tabs = [
        { id: 'personal', label: t.profile.personalInfo, icon: UserCircleIcon },
        { id: 'security', label: t.profile.security, icon: ShieldCheckIcon },
        { id: 'preferences', label: t.profile.preferences, icon: CogIcon },
        { id: 'notifications', label: t.settings.notifications, icon: BellIcon },
    ];
    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(updateProfile({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
        }));
        setIsSaving(false);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 3000);
    };
    const handleExportData = () => {
        // Create export data
        const exportData = {
            profile: { ...formData },
            settings: settings,
            exportedAt: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wealthtracker-data.json';
        a.click();
        URL.revokeObjectURL(url);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: t.profile.title }), _jsx("p", { className: "text-gray-500 dark:text-gray-400 mt-1", children: t.profile.subtitle })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden", children: [_jsx("div", { className: "h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" }), _jsx("div", { className: "relative px-6 pb-6", children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12", children: [_jsxs("div", { className: "flex items-end gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-lg", children: _jsx("div", { className: "w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold", children: user?.name?.charAt(0) || 'U' }) }), _jsx("button", { className: "absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center shadow-lg transition-colors", children: _jsx(CameraIcon, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "mb-2", children: [_jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white", children: user?.name || 'User' }), _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: user?.email })] })] }), _jsxs("div", { className: "mt-4 sm:mt-0 flex items-center gap-2", children: [showSaved && (_jsxs(motion.span, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: "flex items-center gap-1 text-green-600 dark:text-green-400 text-sm", children: [_jsx(CheckIcon, { className: "w-4 h-4" }), t.profile.saved] })), _jsx("button", { onClick: handleSave, disabled: isSaving, className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50", children: isSaving ? t.common.loading : t.common.save })] })] }) })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden", children: [_jsx("div", { className: "border-b border-gray-200 dark:border-gray-700", children: _jsx("nav", { className: "flex overflow-x-auto", children: tabs.map(tab => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`, children: [_jsx(tab.icon, { className: "w-5 h-5" }), tab.label] }, tab.id))) }) }), _jsxs("div", { className: "p-6", children: [activeTab === 'personal' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t.profile.fullName }), _jsx("input", { type: "text", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), className: "w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t.profile.email }), _jsx("input", { type: "email", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), className: "w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t.profile.phone }), _jsx("input", { type: "tel", value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }), placeholder: "+994 XX XXX XX XX", className: "w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t.profile.country }), _jsxs("select", { value: formData.country, onChange: (e) => setFormData({ ...formData, country: e.target.value }), className: "w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white", children: [_jsx("option", { value: "Azerbaijan", children: "Azerbaijan" }), _jsx("option", { value: "Turkey", children: "Turkey" }), _jsx("option", { value: "Russia", children: "Russia" }), _jsx("option", { value: "USA", children: "USA" }), _jsx("option", { value: "UK", children: "UK" }), _jsx("option", { value: "Germany", children: "Germany" })] })] })] }), _jsxs("div", { className: "pt-6 border-t border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: t.profile.exportData }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs("button", { onClick: handleExportData, className: "flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors", children: [_jsx(ArrowDownTrayIcon, { className: "w-5 h-5" }), t.profile.exportData] }), _jsxs("button", { className: "flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg font-medium transition-colors", children: [_jsx(TrashIcon, { className: "w-5 h-5" }), t.profile.deleteAccount] })] }), _jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: t.profile.deleteAccountWarning })] })] })), activeTab === 'security' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: t.profile.changePassword }), _jsxs("div", { className: "space-y-4 max-w-md", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t.profile.currentPassword }), _jsx("input", { type: "password", value: passwordForm.currentPassword, onChange: (e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value }), className: "w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t.profile.newPassword }), _jsx("input", { type: "password", value: passwordForm.newPassword, onChange: (e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value }), className: "w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t.profile.confirmNewPassword }), _jsx("input", { type: "password", value: passwordForm.confirmPassword, onChange: (e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value }), className: "w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" })] }), _jsx("button", { className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors", children: t.profile.changePassword })] })] }), _jsx("div", { className: "pt-6 border-t border-gray-200 dark:border-gray-700", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: t.profile.twoFactor }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: t.profile.twoFactorDesc })] }), _jsx("button", { className: "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700", children: _jsx("span", { className: "inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" }) })] }) })] })), activeTab === 'preferences' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: [_jsx("div", { children: _jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: t.settings.theme }) }), _jsx("div", { className: "pt-6 border-t border-gray-200 dark:border-gray-700", children: _jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: t.settings.language }) }), _jsxs("div", { className: "pt-6 border-t border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: t.settings.currency }), _jsx("div", { className: "grid grid-cols-3 sm:grid-cols-6 gap-2", children: ['AZN', 'USD', 'EUR', 'GBP', 'TRY', 'RUB'].map(currency => (_jsx("button", { className: `py-2 px-3 rounded-lg text-sm font-medium transition-all ${settings.currency === currency
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`, children: currency }, currency))) })] }), _jsxs("div", { className: "pt-6 border-t border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: t.settings.dateFormat }), _jsx("div", { className: "flex flex-wrap gap-2", children: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'].map(format => (_jsx("button", { className: `py-2 px-4 rounded-lg text-sm font-medium transition-all ${settings.dateFormat === format
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`, children: format }, format))) })] })] })), activeTab === 'notifications' && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-4", children: [
                                    { id: 'email', label: t.settings.emailNotifications, enabled: settings.notifications.email },
                                    { id: 'push', label: t.settings.pushNotifications, enabled: settings.notifications.push },
                                    { id: 'transactions', label: t.settings.transactionAlerts, enabled: settings.notifications.transactions },
                                    { id: 'goals', label: t.settings.goalAlerts, enabled: settings.notifications.goals },
                                    { id: 'crypto', label: t.settings.cryptoAlerts, enabled: settings.notifications.crypto },
                                    { id: 'marketing', label: t.settings.marketingEmails, enabled: settings.notifications.marketing },
                                ].map(item => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl", children: [_jsx("span", { className: "font-medium text-gray-700 dark:text-gray-300", children: item.label }), _jsx("button", { className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`, children: _jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition ${item.enabled ? 'translate-x-6' : 'translate-x-1'}` }) })] }, item.id))) }))] })] })] }));
};
