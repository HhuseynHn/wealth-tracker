import { createSlice } from '@reduxjs/toolkit';
// Get notifications from localStorage
const loadNotifications = () => {
    try {
        const stored = localStorage.getItem('wt_notifications');
        if (stored) {
            const notifications = JSON.parse(stored);
            // Filter out notifications older than 7 days
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return notifications.filter((n) => new Date(n.createdAt) > sevenDaysAgo);
        }
    }
    catch (error) {
        console.error('Failed to load notifications:', error);
    }
    return [];
};
// Save notifications to localStorage
const saveNotifications = (notifications) => {
    try {
        localStorage.setItem('wt_notifications', JSON.stringify(notifications));
    }
    catch (error) {
        console.error('Failed to save notifications:', error);
    }
};
const initialNotifications = loadNotifications();
const initialState = {
    notifications: initialNotifications,
    unreadCount: initialNotifications.filter(n => !n.isRead).length,
};
const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            const newNotification = {
                id: Date.now().toString(),
                ...action.payload,
                isRead: false,
                createdAt: new Date().toISOString(),
            };
            state.notifications.unshift(newNotification);
            state.unreadCount += 1;
            saveNotifications(state.notifications);
        },
        removeNotification: (state, action) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification && !notification.isRead) {
                state.unreadCount -= 1;
            }
            state.notifications = state.notifications.filter(n => n.id !== action.payload);
            saveNotifications(state.notifications);
        },
        markAsRead: (state, action) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification && !notification.isRead) {
                notification.isRead = true;
                state.unreadCount -= 1;
                saveNotifications(state.notifications);
            }
        },
        markAllAsRead: (state) => {
            state.notifications.forEach(n => {
                n.isRead = true;
            });
            state.unreadCount = 0;
            saveNotifications(state.notifications);
        },
        clearAllNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
            saveNotifications(state.notifications);
        },
        clearOldNotifications: (state) => {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            state.notifications = state.notifications.filter(n => new Date(n.createdAt) > sevenDaysAgo);
            state.unreadCount = state.notifications.filter(n => !n.isRead).length;
            saveNotifications(state.notifications);
        },
    },
});
export const { addNotification, removeNotification, markAsRead, markAllAsRead, clearAllNotifications, clearOldNotifications, } = notificationSlice.actions;
export default notificationSlice.reducer;
