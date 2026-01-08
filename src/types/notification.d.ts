export type NotificationType = 'success' | 'warning' | 'error' | 'info';
export type NotificationCategory = 'transaction' | 'goal' | 'crypto' | 'system' | 'budget';
export interface Notification {
    id: string;
    type: NotificationType;
    category: NotificationCategory;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    link?: string;
    icon?: string;
}
export interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
}
export interface CreateNotificationDTO {
    type: NotificationType;
    category: NotificationCategory;
    title: string;
    message: string;
    link?: string;
    icon?: string;
}
export declare const NOTIFICATION_CONFIG: Record<NotificationType, {
    color: string;
    bgColor: string;
    icon: string;
}>;
export declare const CATEGORY_ICONS: Record<NotificationCategory, string>;
//# sourceMappingURL=notification.d.ts.map