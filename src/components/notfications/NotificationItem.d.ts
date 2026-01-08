import { Notification } from '../../types/notification';
interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
    onRemove: (id: string) => void;
}
export declare const NotificationItem: ({ notification, onMarkAsRead, onRemove }: NotificationItemProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=NotificationItem.d.ts.map