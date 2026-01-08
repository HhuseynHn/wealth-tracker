import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { markAsRead, removeNotification, markAllAsRead } from '../../store/notificationSlice';
import { NotificationItem } from './NotificationItem';
import { useLanguage } from '../../i18n';
export const NotificationDropdown = () => {
    const { t } = useLanguage();
    const dispatch = useAppDispatch();
    const { notifications, unreadCount } = useAppSelector((state) => state.notifications);
    const handleMarkAsRead = (id) => {
        dispatch(markAsRead(id));
    };
    const handleRemove = (id) => {
        dispatch(removeNotification(id));
    };
    const handleMarkAllAsRead = () => {
        dispatch(markAllAsRead());
    };
    return (_jsx(Popover, { className: "relative", children: ({ open }) => (_jsxs(_Fragment, { children: [_jsxs(Popover.Button, { className: "relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full", children: [_jsx(BellIcon, { className: "w-6 h-6" }), _jsx(AnimatePresence, { children: unreadCount > 0 && (_jsx(motion.span, { initial: { scale: 0 }, animate: { scale: 1 }, exit: { scale: 0 }, className: "absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center", children: unreadCount > 9 ? '9+' : unreadCount })) })] }), _jsx(Transition, { as: Fragment, enter: "transition ease-out duration-200", enterFrom: "opacity-0 translate-y-1", enterTo: "opacity-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "opacity-100 translate-y-0", leaveTo: "opacity-0 translate-y-1", children: _jsx(Popover.Panel, { className: "absolute right-0 z-50 mt-2 w-96 origin-top-right", children: _jsxs("div", { className: "overflow-hidden rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "font-semibold text-gray-900 dark:text-white", children: t.notifications.title }), unreadCount > 0 && (_jsxs("span", { className: "px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full", children: [unreadCount, " ", t.notifications.new] }))] }), unreadCount > 0 && (_jsx("button", { onClick: handleMarkAllAsRead, className: "text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium", children: t.notifications.markAllRead }))] }), _jsx("div", { className: "max-h-96 overflow-y-auto", children: notifications.length > 0 ? (_jsx(AnimatePresence, { children: notifications.slice(0, 10).map((notification) => (_jsx(NotificationItem, { notification: notification, onMarkAsRead: handleMarkAsRead, onRemove: handleRemove }, notification.id))) })) : (_jsxs("div", { className: "p-8 text-center", children: [_jsx(BellIcon, { className: "w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" }), _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: t.notifications.noNotifications })] })) }), notifications.length > 10 && (_jsx("div", { className: "p-3 border-t border-gray-100 dark:border-gray-700", children: _jsx("a", { href: "/notifications", className: "block text-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium", children: t.dashboard.viewAll }) }))] }) }) })] })) }));
};
