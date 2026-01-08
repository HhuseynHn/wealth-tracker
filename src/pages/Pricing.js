import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, SparklesIcon, RocketLaunchIcon, BuildingOffice2Icon, XMarkIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../i18n';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { upgradePlan, startTrial, renewSubscription } from '../store/subscriptionSlice';
import { SUBSCRIPTION_PLANS } from '../types/subscription';
export const Pricing = () => {
    const { t, currentLanguage } = useLanguage();
    const dispatch = useAppDispatch();
    const { currentPlan, trialEndsAt, expiresAt } = useAppSelector((state) => state.subscription);
    const { user } = useAppSelector((state) => state.auth);
    const [billingPeriod, setBillingPeriod] = useState('monthly');
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    // Payment form state
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    // Check if subscription is expired
    const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;
    const daysLeft = expiresAt ? Math.ceil((new Date(expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
    const planIcons = {
        free: SparklesIcon,
        pro: RocketLaunchIcon,
        enterprise: BuildingOffice2Icon,
    };
    const handleUpgrade = (planId) => {
        if (planId === 'free')
            return;
        setSelectedPlan(planId);
        setShowUpgradeModal(true);
        setShowPaymentForm(true);
    };
    const handleConfirmUpgrade = async () => {
        if (!selectedPlan)
            return;
        // Validate payment form
        if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
            alert('Zəhmət olmasa bütün ödəniş məlumatlarını doldurun');
            return;
        }
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        dispatch(upgradePlan({ plan: selectedPlan, userId: user?.id || null }));
        setShowUpgradeModal(false);
        setShowPaymentForm(false);
        setIsProcessing(false);
        // Reset form
        setCardNumber('');
        setCardHolder('');
        setExpiryDate('');
        setCvv('');
    };
    const handleRenew = (planId) => {
        setSelectedPlan(planId);
        setShowUpgradeModal(true);
        setShowPaymentForm(true);
    };
    const handleConfirmRenew = async () => {
        if (!selectedPlan)
            return;
        // Validate payment form
        if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
            alert('Zəhmət olmasa bütün ödəniş məlumatlarını doldurun');
            return;
        }
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        dispatch(renewSubscription({ plan: selectedPlan, userId: user?.id || null }));
        setShowUpgradeModal(false);
        setShowPaymentForm(false);
        setIsProcessing(false);
        // Reset form
        setCardNumber('');
        setCardHolder('');
        setExpiryDate('');
        setCvv('');
    };
    const handleStartTrial = () => {
        dispatch(startTrial(user?.id || null));
    };
    // Format card number with spaces
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        }
        else {
            return v;
        }
    };
    // Format expiry date
    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: t.subscription.title }), _jsx("p", { className: "text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto", children: t.subscription.subtitle })] }), currentPlan !== 'free' && (_jsx(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: `rounded-2xl p-6 text-white ${isExpired
                    ? 'bg-gradient-to-r from-red-600 to-orange-600'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600'}`, children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-blue-100 dark:text-white/80", children: isExpired ? t.subscription.expired : t.subscription.currentPlan }), _jsx("h3", { className: "text-2xl font-bold capitalize", children: currentPlan }), trialEndsAt && (_jsxs("p", { className: "text-sm text-blue-100 mt-1", children: [t.subscription.trial, ": ", new Date(trialEndsAt).toLocaleDateString()] })), expiresAt && !isExpired && (_jsxs("p", { className: "text-sm text-blue-100 mt-1", children: [t.subscription.expiresAt, ": ", new Date(expiresAt).toLocaleDateString(), " (", daysLeft, " ", t.subscription.daysLeft, ")"] })), isExpired && (_jsx("p", { className: "text-sm text-white/90 mt-1", children: t.subscription.expiredMessage }))] }), _jsx("div", { className: "flex items-center gap-3", children: isExpired ? (_jsx("button", { onClick: () => handleRenew(currentPlan), className: "px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-white/90 transition-colors", children: t.subscription.renew })) : (_jsx("span", { className: "px-4 py-2 bg-white/20 rounded-lg font-medium", children: t.subscription.allFeaturesIncluded })) })] }) })), _jsx("div", { className: "flex justify-center", children: _jsxs("div", { className: "bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex", children: [_jsx("button", { onClick: () => setBillingPeriod('monthly'), className: `px-6 py-2 rounded-lg text-sm font-medium transition-all ${billingPeriod === 'monthly'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400'}`, children: t.subscription.monthly }), _jsxs("button", { onClick: () => setBillingPeriod('yearly'), className: `px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${billingPeriod === 'yearly'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400'}`, children: [t.subscription.yearly, _jsxs("span", { className: "text-xs px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 rounded-full", children: ["20% ", t.subscription.savePercent] })] })] }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: SUBSCRIPTION_PLANS.map((plan, index) => {
                    const Icon = planIcons[plan.id];
                    const price = billingPeriod === 'yearly' ? plan.price * 0.8 : plan.price;
                    const isCurrentPlan = currentPlan === plan.id;
                    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: `relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden ${plan.isPopular ? 'ring-2 ring-blue-600' : ''}`, children: [plan.isPopular && (_jsx("div", { className: "absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl", children: t.subscription.popular })), _jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: `w-12 h-12 rounded-xl flex items-center justify-center ${plan.id === 'free' ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400' :
                                                    plan.id === 'pro' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' :
                                                        'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'}`, children: _jsx(Icon, { className: "w-6 h-6" }) }), _jsx("div", { children: _jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white", children: currentLanguage === 'az' ? plan.nameAz : plan.name }) })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-baseline gap-1", children: [_jsxs("span", { className: "text-4xl font-bold text-gray-900 dark:text-white", children: ["$", price.toFixed(2)] }), _jsx("span", { className: "text-gray-500 dark:text-gray-400", children: t.subscription.perMonth })] }), billingPeriod === 'yearly' && plan.price > 0 && (_jsxs("p", { className: "text-sm text-green-600 dark:text-green-400 mt-1", children: ["$", (plan.price * 12 * 0.8).toFixed(2), " ", t.subscription.perYear] }))] }), isCurrentPlan ? (_jsx("button", { disabled: true, className: "w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-medium", children: t.subscription.currentPlan })) : plan.id === 'free' ? (_jsx("button", { disabled: true, className: "w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium", children: t.subscription.free })) : (_jsx("button", { onClick: () => handleUpgrade(plan.id), className: `w-full py-3 px-4 rounded-xl font-medium transition-colors ${plan.isPopular
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                                            : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'}`, children: t.subscription.upgrade })), plan.id === 'pro' && currentPlan === 'free' && !trialEndsAt && (_jsxs("button", { onClick: handleStartTrial, className: "w-full mt-3 py-2 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline", children: ["14 ", t.subscription.trialDays, " \u2192"] })), _jsxs("div", { className: "mt-8 space-y-4", children: [_jsx("h4", { className: "text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider", children: t.subscription.features }), _jsx("ul", { className: "space-y-3", children: (currentLanguage === 'az' ? plan.featuresAz : plan.features).map((feature, i) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx(CheckIcon, { className: `w-5 h-5 flex-shrink-0 mt-0.5 ${plan.id === 'free' ? 'text-gray-400' :
                                                                plan.id === 'pro' ? 'text-blue-500' :
                                                                    'text-purple-500'}` }), _jsx("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: feature })] }, i))) })] })] })] }, plan.id));
                }) }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-3xl mx-auto", children: [_jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-6 text-center", children: t.subscription.specialOffer }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 text-center", children: [_jsxs("div", { className: "flex items-center gap-2 text-amber-600 dark:text-amber-400", children: [_jsx(SparklesIcon, { className: "w-5 h-5" }), _jsx("span", { className: "font-medium", children: t.subscription.limitedTime })] }), _jsx("span", { className: "hidden sm:block text-gray-300 dark:text-gray-600", children: "|" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "Pro versiyaya ke\u00E7in v\u0259 20% endirim \u0259ld\u0259 edin!" })] })] }), showUpgradeModal && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white", children: isExpired ? t.subscription.renewSubscription : t.subscription.upgrade }), _jsx("button", { onClick: () => {
                                        setShowUpgradeModal(false);
                                        setShowPaymentForm(false);
                                    }, className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg", children: _jsx(XMarkIcon, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600 dark:text-gray-400", children: isExpired
                                        ? t.subscription.expiredMessage
                                        : selectedPlan === 'pro'
                                            ? 'Pro planına yüksəltmək istədiyinizdən əminsiniz?'
                                            : 'Enterprise planına yüksəltmək istədiyinizdən əminsiniz?' }), _jsx("div", { className: "bg-gray-50 dark:bg-gray-900 rounded-xl p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "font-medium text-gray-900 dark:text-white capitalize", children: [selectedPlan, " Plan"] }), _jsxs("span", { className: "text-lg font-bold text-gray-900 dark:text-white", children: ["$", selectedPlan === 'pro' ? '9.99' : '29.99', "/ay"] })] }) }), showPaymentForm && (_jsxs("div", { className: "space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center gap-2 text-gray-900 dark:text-white", children: [_jsx(CreditCardIcon, { className: "w-5 h-5" }), _jsx("h4", { className: "font-semibold", children: t.subscription.paymentInfo })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t.subscription.cardNumber }), _jsx("input", { type: "text", value: cardNumber, onChange: (e) => setCardNumber(formatCardNumber(e.target.value)), placeholder: t.subscription.cardNumberPlaceholder, maxLength: 19, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t.subscription.cardHolder }), _jsx("input", { type: "text", value: cardHolder, onChange: (e) => setCardHolder(e.target.value), placeholder: t.subscription.cardHolderPlaceholder, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t.subscription.expiryDate }), _jsx("input", { type: "text", value: expiryDate, onChange: (e) => setExpiryDate(formatExpiryDate(e.target.value)), placeholder: t.subscription.expiryPlaceholder, maxLength: 5, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: t.subscription.cvv }), _jsx("input", { type: "text", value: cvv, onChange: (e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3)), placeholder: t.subscription.cvvPlaceholder, maxLength: 3, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] })] }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Bu demo versiyas\u0131d\u0131r. Real \u00F6d\u0259m\u0259 t\u0259l\u0259b olunmur." })] }))] }), _jsxs("div", { className: "flex gap-3 mt-6", children: [_jsx("button", { onClick: () => {
                                        setShowUpgradeModal(false);
                                        setShowPaymentForm(false);
                                    }, disabled: isProcessing, className: "flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50", children: t.common.cancel }), _jsx("button", { onClick: isExpired ? handleConfirmRenew : handleConfirmUpgrade, disabled: isProcessing, className: "flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2", children: isProcessing ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "animate-spin", children: "\u23F3" }), t.subscription.processing] })) : (t.common.confirm) })] })] }) }))] }));
};
