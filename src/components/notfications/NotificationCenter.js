import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, TrashIcon, CheckIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { markAsRead, removeNotification, markAllAsRead, clearAllNotifications } from '../../store/notificationSlice';
import { NotificationItem } from './NotificationItem';
import { useLanguage } from '../../i18n';
import { NotificationCategory, NotificationType } from '../../types/notification';
export const NotificationCenter = () => {
    const { t } = useLanguage();
    const dispatch = useAppDispatch();
    const { notifications, unreadCount } = useAppSelector((state) => state.notifications);
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const filteredNotifications = notifications.filter(n => {
        if (filterCategory !== 'all' && n.category !== filterCategory)
            return false;
        if (filterType !== 'all' && n.type !== filterType)
            return false;
        return true;
    });
    // Group notifications by date
    const groupedNotifications = {
        today: [],
        yesterday: [],
        older: [],
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    filteredNotifications.forEach(n => {
        const date = new Date(n.createdAt);
        date.setHours(0, 0, 0, 0);
        if (date.getTime() === today.getTime()) {
            groupedNotifications.today.push(n);
        }
        else if (date.getTime() === yesterday.getTime()) {
            groupedNotifications.yesterday.push(n);
        }
        else {
            groupedNotifications.older.push(n);
        }
    });
    const handleMarkAsRead = (id) => {
        dispatch(markAsRead(id));
    };
    const handleRemove = (id) => {
        dispatch(removeNotification(id));
    };
    const handleMarkAllAsRead = () => {
        dispatch(markAllAsRead());
    };
    const handleClearAll = () => {
        if (window.confirm(t.common.confirm + '?')) {
            dispatch(clearAllNotifications());
        }
    };
    const categories = ['all', 'transaction', 'goal', 'crypto', 'system', 'budget'];
    const types = ['all', 'success', 'warning', 'error', 'info'];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: t.notifications.title }), _jsx("p", { className: "text-gray-500 dark:text-gray-400 mt-1", children: t.notifications.subtitle })] }), _jsxs("div", { className: "flex items-center gap-3", children: [unreadCount > 0 && (_jsxs("button", { onClick: handleMarkAllAsRead, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg transition-colors", children: [_jsx(CheckIcon, { className: "w-4 h-4" }), t.notifications.markAllRead] })), notifications.length > 0 && (_jsxs("button", { onClick: handleClearAll, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors", children: [_jsx(TrashIcon, { className: "w-4 h-4" }), t.notifications.clearAll] }))] })] }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm", children: [_jsx("div", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: notifications.length }), _jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: t.common.total })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600 dark:text-blue-400", children: unreadCount }), _jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: t.notifications.new })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm", children: [_jsx("div", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: notifications.filter(n => n.type === 'success').length }), _jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: t.common.success })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm", children: [_jsx("div", { className: "text-2xl font-bold text-amber-600 dark:text-amber-400", children: notifications.filter(n => n.type === 'warning').length }), _jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: t.common.warning })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(FunnelIcon, { className: "w-5 h-5 text-gray-400" }), _jsx("span", { className: "font-medium text-gray-700 dark:text-gray-300", children: t.common.filter })] }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-500 dark:text-gray-400 block mb-2", children: t.common.category }), _jsx("div", { className: "flex flex-wrap gap-2", children: categories.map(cat => (_jsx("button", { onClick: () => setFilterCategory(cat), className: `px-3 py-1.5 text-sm rounded-lg transition-colors ${filterCategory === cat
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`, children: cat === 'all' ? t.common.all : cat }, cat))) })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-500 dark:text-gray-400 block mb-2", children: t.common.type }), _jsx("div", { className: "flex flex-wrap gap-2", children: types.map(type => (_jsx("button", { onClick: () => setFilterType(type), className: `px-3 py-1.5 text-sm rounded-lg transition-colors ${filterType === type
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`, children: type === 'all' ? t.common.all : type }, type))) })] })] })] }), _jsxs("div", { className: "space-y-6", children: [groupedNotifications.today.length > 0 && (_jsxs("div", { children: [_jsx("h2", { className: "text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider", children: t.notifications.today }), _jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden", children: _jsx(AnimatePresence, { children: groupedNotifications.today.map(notification => (_jsx(NotificationItem, { notification: notification, onMarkAsRead: handleMarkAsRead, onRemove: handleRemove }, notification.id))) }) })] })), groupedNotifications.yesterday.length > 0 && (_jsxs("div", { children: [_jsx("h2", { className: "text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider", children: t.notifications.yesterday }), _jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden", children: _jsx(AnimatePresence, { children: groupedNotifications.yesterday.map(notification => (_jsx(NotificationItem, { notification: notification, onMarkAsRead: handleMarkAsRead, onRemove: handleRemove }, notification.id))) }) })] })), groupedNotifications.older.length > 0 && (_jsxs("div", { children: [_jsx("h2", { className: "text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider", children: t.notifications.older }), _jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden", children: _jsx(AnimatePresence, { children: groupedNotifications.older.map(notification => (_jsx(NotificationItem, { notification: notification, onMarkAsRead: handleMarkAsRead, onRemove: handleRemove }, notification.id))) }) })] })), filteredNotifications.length === 0 && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center", children: [_jsx(BellIcon, { className: "w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: t.notifications.noNotifications }), _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: t.notifications.subtitle })] }))] })] }));
};
