import { store } from '../store';
import { addNotification } from '../store/notificationSlice';
// Demo notifications to show the system works
export const addDemoNotifications = () => {
    const notifications = [
        {
            type: 'success',
            category: 'system',
            title: 'Xoş gəldiniz! 👋',
            message: 'WealthTracker-ə uğurla daxil oldunuz. Bildiriş sistemini test edin!',
            icon: '👋',
        },
        {
            type: 'info',
            category: 'goal',
            title: 'Yeni məqsəd yaradın',
            message: 'Maliyyə məqsədlərinizi izləmək üçün ilk məqsədinizi yaradın.',
            icon: '🎯',
        },
        {
            type: 'warning',
            category: 'budget',
            title: 'Büdcə xəbərdarlığı',
            message: 'Bu ay xərcləriniz planlaşdırılandan 20% çoxdur.',
            icon: '⚠️',
        },
        {
            type: 'success',
            category: 'crypto',
            title: 'Bitcoin qiyməti artdı',
            message: 'BTC son 24 saatda 5.2% artıb. Portfelinizi yoxlayın.',
            icon: '₿',
        },
    ];
    // Add notifications with slight delay to make it look realistic
    notifications.forEach((notification, index) => {
        setTimeout(() => {
            store.dispatch(addNotification(notification));
        }, index * 500);
    });
};
// Add a single notification
export const triggerNotification = (type, category, title, message, icon) => {
    store.dispatch(addNotification({
        type,
        category,
        title,
        message,
        icon,
    }));
};
// Notification templates
export const notificationTemplates = {
    // Transaction notifications
    transactionAdded: (type, amount) => ({
        type: type === 'income' ? 'success' : 'info',
        category: 'transaction',
        title: type === 'income' ? 'Gəlir əlavə edildi' : 'Xərc əlavə edildi',
        message: `₼${amount.toLocaleString()} məbləğində ${type === 'income' ? 'gəlir' : 'xərc'} uğurla qeyd edildi.`,
        icon: type === 'income' ? '💰' : '💸',
    }),
    // Goal notifications
    goalProgress: (goalName, percentage) => ({
        type: percentage >= 100 ? 'success' : 'info',
        category: 'goal',
        title: percentage >= 100 ? 'Məqsəd tamamlandı! 🎉' : 'Məqsəd tərəqqisi',
        message: percentage >= 100
            ? `"${goalName}" məqsədinizə çatdınız! Təbrik edirik!`
            : `"${goalName}" məqsədiniz ${percentage}% tamamlandı.`,
        icon: percentage >= 100 ? '🎉' : '🎯',
    }),
    goalDeadline: (goalName, daysLeft) => ({
        type: daysLeft <= 7 ? 'warning' : 'info',
        category: 'goal',
        title: 'Məqsəd vaxtı yaxınlaşır',
        message: `"${goalName}" məqsədinizin vaxtı ${daysLeft} gün sonra bitir.`,
        icon: '⏰',
    }),
    // Crypto notifications
    cryptoPriceChange: (symbol, change) => ({
        type: change >= 0 ? 'success' : 'warning',
        category: 'crypto',
        title: `${symbol} qiymət dəyişikliyi`,
        message: `${symbol} son 24 saatda ${change >= 0 ? '+' : ''}${change.toFixed(2)}% dəyişdi.`,
        icon: '₿',
    }),
    // Budget notifications
    budgetAlert: (category, percentage) => ({
        type: percentage >= 90 ? 'warning' : 'info',
        category: 'budget',
        title: 'Büdcə xəbərdarlığı',
        message: `${category} kateqoriyasında büdcənizin ${percentage}%-i istifadə edilib.`,
        icon: '📊',
    }),
    // System notifications
    welcomeBack: (userName) => ({
        type: 'success',
        category: 'system',
        title: 'Xoş gəldiniz! 👋',
        message: `${userName}, WealthTracker-ə yenidən xoş gəldiniz!`,
        icon: '👋',
    }),
};
// Helper to dispatch template notifications
export const sendNotification = (template, ...args) => {
    const templateFn = notificationTemplates[template];
    const notification = templateFn(...args);
    store.dispatch(addNotification(notification));
};
