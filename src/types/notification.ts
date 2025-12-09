// Notification Type
export type NotificationType = 'success' | 'warning' | 'error' | 'info'

// Notification Category
export type NotificationCategory = 'transaction' | 'goal' | 'crypto' | 'system' | 'budget'

// Notification Interface
export interface Notification {
  id: string
  type: NotificationType
  category: NotificationCategory
  title: string
  message: string
  isRead: boolean
  createdAt: string
  link?: string
  icon?: string
}

// Notification State
export interface NotificationState {
  notifications: Notification[]
  unreadCount: number
}

// Create Notification DTO
export interface CreateNotificationDTO {
  type: NotificationType
  category: NotificationCategory
  title: string
  message: string
  link?: string
  icon?: string
}

// Notification type config
export const NOTIFICATION_CONFIG: Record<NotificationType, { color: string; bgColor: string; icon: string }> = {
  success: { color: 'text-green-600', bgColor: 'bg-green-100', icon: '✅' },
  warning: { color: 'text-amber-600', bgColor: 'bg-amber-100', icon: '⚠️' },
  error: { color: 'text-red-600', bgColor: 'bg-red-100', icon: '❌' },
  info: { color: 'text-blue-600', bgColor: 'bg-blue-100', icon: 'ℹ️' },
}

// Category icons
export const CATEGORY_ICONS: Record<NotificationCategory, string> = {
  transaction: '💳',
  goal: '🎯',
  crypto: '₿',
  system: '⚙️',
  budget: '📊',
}









