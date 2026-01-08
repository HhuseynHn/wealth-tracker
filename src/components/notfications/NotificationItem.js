import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Notification, NOTIFICATION_CONFIG, CATEGORY_ICONS } from '../../types/notification';
import { useLanguage } from '../../i18n';
export const NotificationItem = ({ notification, onMarkAsRead, onRemove }) => {
    const { t } = useLanguage();
    const config = NOTIFICATION_CONFIG[notification.type];
    const categoryIcon = CATEGORY_ICONS[notification.category];
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        if (diffMins < 1)
            return t.notifications.new;
        if (diffMins < 60)
            return `${diffMins}m`;
        if (diffHours < 24)
            return `${diffHours}h`;
        if (diffDays === 1)
            return t.notifications.yesterday;
        return `${diffDays}d`;
    };
    return (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, x: 100 }, className: `p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${!notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: `flex-shrink-0 w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`, children: _jsx("span", { className: "text-lg", children: notification.icon || categoryIcon }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("h4", { className: `font-medium text-sm ${notification.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`, children: notification.title }), !notification.isRead && (_jsx("span", { className: "w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" }))] }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2", children: notification.message }), _jsxs("div", { className: "flex items-center gap-3 mt-2", children: [_jsx("span", { className: "text-xs text-gray-400 dark:text-gray-500", children: formatTime(notification.createdAt) }), _jsx("span", { className: `text-xs px-2 py-0.5 rounded-full ${config.bgColor} ${config.color}`, children: notification.category })] })] }), _jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [!notification.isRead && (_jsx("button", { onClick: () => onMarkAsRead(notification.id), className: "p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors", title: t.notifications.markAllRead, children: _jsx(CheckIcon, { className: "w-4 h-4" }) })), _jsx("button", { onClick: () => onRemove(notification.id), className: "p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors", title: t.common.delete, children: _jsx(XMarkIcon, { className: "w-4 h-4" }) })] })] }) }));
};
