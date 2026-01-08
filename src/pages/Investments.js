import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { PlusIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, TrashIcon, XMarkIcon, } from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';
import { useLanguage } from '../i18n';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useTheme } from '../hooks';
import { useGetMarketDataQuery } from '../store/cryptoApi';
import { addCryptoAsset, deleteCryptoAsset, selectCryptoAssets, } from '../store/cryptoSlice';
import { POPULAR_CRYPTOS } from '../types/crypto';
const Investments = () => {
    const { t } = useLanguage();
    const { chartColors, resolvedTheme } = useTheme();
    const dispatch = useAppDispatch();
    const cryptoAssets = useAppSelector(selectCryptoAssets);
    const { data: marketData, isLoading, refetch } = useGetMarketDataQuery({ limit: 10 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    const [formData, setFormData] = useState({
        symbol: 'BTC',
        name: 'Bitcoin',
        amount: '',
        purchasePrice: '',
        purchaseDate: new Date().toISOString().split('T')[0],
    });
    // Get current prices from market data
    const getPriceData = (symbol) => {
        if (!marketData)
            return { price: 0, change: 0 };
        const coin = marketData.find((c) => c.symbol.toUpperCase() === symbol.toUpperCase());
        return {
            price: coin?.current_price || 0,
            change: coin?.price_change_percentage_24h || 0,
        };
    };
    // Calculate portfolio stats
    const portfolioStats = cryptoAssets.reduce((acc, asset) => {
        const { price } = getPriceData(asset.symbol);
        const invested = asset.amount * asset.purchasePrice;
        const currentValue = asset.amount * price;
        const profitLoss = currentValue - invested;
        return {
            totalInvested: acc.totalInvested + invested,
            currentValue: acc.currentValue + currentValue,
            profitLoss: acc.profitLoss + profitLoss,
        };
    }, { totalInvested: 0, currentValue: 0, profitLoss: 0 });
    const profitLossPercentage = portfolioStats.totalInvested > 0
        ? (portfolioStats.profitLoss / portfolioStats.totalInvested) * 100
        : 0;
    // Pie chart data
    const pieData = cryptoAssets.map((asset) => {
        const { price } = getPriceData(asset.symbol);
        return {
            name: asset.symbol,
            value: asset.amount * price,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        };
    });
    const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4'];
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.purchasePrice)
            return;
        dispatch(addCryptoAsset({
            symbol: formData.symbol,
            name: formData.name,
            amount: parseFloat(formData.amount),
            purchasePrice: parseFloat(formData.purchasePrice),
            purchaseDate: formData.purchaseDate,
        }));
        setIsModalOpen(false);
        setFormData({
            symbol: 'BTC',
            name: 'Bitcoin',
            amount: '',
            purchasePrice: '',
            purchaseDate: new Date().toISOString().split('T')[0],
        });
    };
    const handleDelete = (id) => {
        dispatch(deleteCryptoAsset(id));
        setDeleteConfirmId(null);
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-slate-800 dark:text-white", children: t.crypto.title }), _jsx("p", { className: "text-slate-500 dark:text-gray-400", children: t.crypto.subtitle })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => refetch(), className: "px-4 py-2.5 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors", children: isLoading ? t.crypto.refreshing : '🔄' }), _jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: () => setIsModalOpen(true), className: "flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors", children: [_jsx(PlusIcon, { className: "h-5 w-5" }), t.crypto.addCrypto] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400 mb-1", children: t.crypto.totalInvested }), _jsxs("p", { className: "text-2xl font-bold text-slate-800 dark:text-white", children: ["$", portfolioStats.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 2 })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400 mb-1", children: t.crypto.currentValue }), _jsxs("p", { className: "text-2xl font-bold text-slate-800 dark:text-white", children: ["$", portfolioStats.currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-gray-400 mb-1", children: t.crypto.profitLoss }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("p", { className: `text-2xl font-bold ${portfolioStats.profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`, children: [portfolioStats.profitLoss >= 0 ? '+' : '', "$", portfolioStats.profitLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })] }), _jsxs("span", { className: `text-sm font-medium ${profitLossPercentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`, children: ["(", profitLossPercentage >= 0 ? '+' : '', profitLossPercentage.toFixed(2), "%)"] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("h3", { className: "font-semibold text-slate-800 dark:text-white mb-4", children: t.investments.portfolioDistribution }), pieData.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-48", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: pieData, cx: "50%", cy: "50%", innerRadius: 50, outerRadius: 80, paddingAngle: 3, dataKey: "value", children: pieData.map((_, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: {
                                                            backgroundColor: chartColors.tooltipBg,
                                                            border: `1px solid ${chartColors.tooltipBorder}`,
                                                            borderRadius: '12px',
                                                            color: chartColors.tooltipText,
                                                        }, itemStyle: { color: chartColors.tooltipText }, formatter: (value) => [
                                                            `$${(value ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                                                            '',
                                                        ] })] }, resolvedTheme) }) }), _jsx("div", { className: "space-y-2 mt-4", children: pieData.map((item, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: COLORS[index % COLORS.length] } }), _jsx("span", { className: "text-sm font-medium text-slate-600 dark:text-gray-400", children: item.name })] }), _jsxs("span", { className: "text-sm font-medium text-slate-800 dark:text-white", children: ["$", item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })] })] }, item.name))) })] })) : (_jsx("div", { className: "h-48 flex items-center justify-center text-slate-400 dark:text-gray-500", children: t.crypto.noHoldings }))] }), _jsxs("div", { className: "lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("h3", { className: "font-semibold text-slate-800 dark:text-white mb-4", children: t.crypto.holdings }), cryptoAssets.length > 0 ? (_jsx("div", { className: "space-y-3", children: cryptoAssets.map((asset, index) => {
                                    const { price } = getPriceData(asset.symbol);
                                    const currentValue = asset.amount * price;
                                    const invested = asset.amount * asset.purchasePrice;
                                    const profitLoss = currentValue - invested;
                                    const plPercent = invested > 0 ? (profitLoss / invested) * 100 : 0;
                                    return (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold", children: asset.symbol.slice(0, 2) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-800 dark:text-white", children: asset.name }), _jsxs("p", { className: "text-sm text-slate-500 dark:text-gray-400", children: [asset.amount, " ", asset.symbol, " @ $", asset.purchasePrice.toLocaleString()] })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-semibold text-slate-800 dark:text-white", children: ["$", currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })] }), _jsxs("div", { className: `flex items-center justify-end gap-1 text-sm ${plPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`, children: [plPercent >= 0 ? (_jsx(ArrowTrendingUpIcon, { className: "h-4 w-4" })) : (_jsx(ArrowTrendingDownIcon, { className: "h-4 w-4" })), plPercent >= 0 ? '+' : '', plPercent.toFixed(2), "%"] })] }), _jsx("button", { onClick: () => setDeleteConfirmId(asset.id), className: "p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all", children: _jsx(TrashIcon, { className: "h-5 w-5" }) })] })] }, asset.id));
                                }) })) : (_jsxs("div", { className: "py-12 text-center", children: [_jsx("p", { className: "text-slate-500 dark:text-gray-400 mb-2", children: t.crypto.noHoldings }), _jsx("p", { className: "text-sm text-slate-400 dark:text-gray-500", children: t.crypto.addFirst })] }))] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700", children: [_jsx("h3", { className: "font-semibold text-slate-800 dark:text-white mb-4", children: t.crypto.marketOverview }), isLoading ? (_jsx("div", { className: "py-12 text-center text-slate-400 dark:text-gray-500", children: t.common.loading })) : marketData && marketData.length > 0 ? (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-100 dark:border-gray-700", children: [_jsx("th", { className: "text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400", children: "#" }), _jsx("th", { className: "text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400", children: "Coin" }), _jsx("th", { className: "text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400", children: t.crypto.price }), _jsx("th", { className: "text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400", children: t.crypto.change24h }), _jsx("th", { className: "text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400", children: t.crypto.marketCap }), _jsx("th", { className: "text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400 hidden lg:table-cell", children: "7D Chart" })] }) }), _jsx("tbody", { children: marketData.map((coin) => (_jsxs("tr", { className: "border-b border-slate-50 dark:border-gray-700/50 hover:bg-slate-50/50 dark:hover:bg-gray-700/50", children: [_jsx("td", { className: "py-3 px-4 text-sm text-slate-500 dark:text-gray-400", children: coin.market_cap_rank }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: coin.image, alt: coin.name, className: "w-8 h-8 rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-800 dark:text-white", children: coin.name }), _jsx("p", { className: "text-xs text-slate-500 dark:text-gray-400 uppercase", children: coin.symbol })] })] }) }), _jsxs("td", { className: "py-3 px-4 text-right font-medium text-slate-800 dark:text-white", children: ["$", coin.current_price.toLocaleString()] }), _jsx("td", { className: "py-3 px-4 text-right", children: _jsxs("span", { className: `font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`, children: [coin.price_change_percentage_24h >= 0 ? '+' : '', coin.price_change_percentage_24h.toFixed(2), "%"] }) }), _jsxs("td", { className: "py-3 px-4 text-right text-slate-600 dark:text-gray-400", children: ["$", (coin.market_cap / 1e9).toFixed(2), "B"] }), _jsx("td", { className: "py-3 px-4 hidden lg:table-cell", children: coin.sparkline_in_7d && (_jsx("div", { className: "w-24 h-10 ml-auto", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsx(AreaChart, { data: coin.sparkline_in_7d.price.slice(-24).map((p) => ({ v: p })), children: _jsx(Area, { type: "monotone", dataKey: "v", stroke: coin.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444', fill: coin.price_change_percentage_24h >= 0 ? '#10b98120' : '#ef444420', strokeWidth: 1.5 }) }) }) })) })] }, coin.id))) })] }) })) : (_jsx("div", { className: "py-12 text-center text-slate-400 dark:text-gray-500", children: t.common.noData }))] }), _jsx(AnimatePresence, { children: isModalOpen && (_jsxs(Dialog, { open: isModalOpen, onClose: () => setIsModalOpen(false), className: "relative z-50", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 backdrop-blur-sm" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(Dialog.Panel, { as: motion.div, initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx(Dialog.Title, { className: "text-xl font-bold text-slate-800 dark:text-white", children: t.crypto.addCrypto }), _jsx("button", { onClick: () => setIsModalOpen(false), className: "p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700", children: _jsx(XMarkIcon, { className: "h-5 w-5" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.crypto.selectCrypto }), _jsx("select", { value: formData.symbol, onChange: (e) => {
                                                            const crypto = POPULAR_CRYPTOS.find((c) => c.symbol === e.target.value);
                                                            if (crypto) {
                                                                setFormData({ ...formData, symbol: crypto.symbol, name: crypto.name });
                                                            }
                                                        }, className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30", children: POPULAR_CRYPTOS.map((crypto) => (_jsxs("option", { value: crypto.symbol, children: [crypto.symbol, " - ", crypto.name] }, crypto.id))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.crypto.amount }), _jsx("input", { type: "number", step: "any", value: formData.amount, onChange: (e) => setFormData({ ...formData, amount: e.target.value }), placeholder: t.crypto.enterAmount, className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30", required: true })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: [t.crypto.purchasePrice, " (USD)"] }), _jsx("input", { type: "number", step: "any", value: formData.purchasePrice, onChange: (e) => setFormData({ ...formData, purchasePrice: e.target.value }), placeholder: t.crypto.enterPrice, className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2", children: t.crypto.purchaseDate }), _jsx("input", { type: "date", value: formData.purchaseDate, onChange: (e) => setFormData({ ...formData, purchaseDate: e.target.value }), className: "w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30", required: true })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { type: "button", onClick: () => setIsModalOpen(false), className: "flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600", children: t.common.cancel }), _jsx("button", { type: "submit", className: "flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700", children: t.common.add })] })] })] }) })] })) }), _jsx(AnimatePresence, { children: deleteConfirmId && (_jsxs(Dialog, { open: !!deleteConfirmId, onClose: () => setDeleteConfirmId(null), className: "relative z-50", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 backdrop-blur-sm" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(Dialog.Panel, { as: motion.div, initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, className: "w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center", children: _jsx(TrashIcon, { className: "h-8 w-8 text-red-600 dark:text-red-400" }) }), _jsx(Dialog.Title, { className: "text-xl font-bold text-slate-800 dark:text-white mb-2", children: t.crypto.deleteCrypto }), _jsx("p", { className: "text-slate-500 dark:text-gray-400 mb-6", children: t.crypto.deleteConfirm }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => setDeleteConfirmId(null), className: "flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600", children: t.common.cancel }), _jsx("button", { onClick: () => handleDelete(deleteConfirmId), className: "flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700", children: t.common.delete })] })] }) })] })) })] }));
};
export default Investments;
