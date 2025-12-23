import { store } from '../store'
import { addNotification } from '../store/notificationSlice'

// Demo notifications to show the system works
export const addDemoNotifications = () => {
  const notifications = [
    {
      type: 'success' as const,
      category: 'system' as const,
      title: 'Xoş gəldiniz! 👋',
      message: 'WealthTracker-ə uğurla daxil oldunuz. Bildiriş sistemini test edin!',
      icon: '👋',
    },
    {
      type: 'info' as const,
      category: 'goal' as const,
      title: 'Yeni məqsəd yaradın',
      message: 'Maliyyə məqsədlərinizi izləmək üçün ilk məqsədinizi yaradın.',
      icon: '🎯',
    },
    {
      type: 'warning' as const,
      category: 'budget' as const,
      title: 'Büdcə xəbərdarlığı',
      message: 'Bu ay xərcləriniz planlaşdırılandan 20% çoxdur.',
      icon: '⚠️',
    },
    {
      type: 'success' as const,
      category: 'crypto' as const,
      title: 'Bitcoin qiyməti artdı',
      message: 'BTC son 24 saatda 5.2% artıb. Portfelinizi yoxlayın.',
      icon: '₿',
    },
  ]

  // Add notifications with slight delay to make it look realistic
  notifications.forEach((notification, index) => {
    setTimeout(() => {
      store.dispatch(addNotification(notification))
    }, index * 500)
  })
}

// Add a single notification
export const triggerNotification = (
  type: 'success' | 'warning' | 'error' | 'info',
  category: 'transaction' | 'goal' | 'crypto' | 'system' | 'budget',
  title: string,
  message: string,
  icon?: string
) => {
  store.dispatch(addNotification({
    type,
    category,
    title,
    message,
    icon,
  }))
}

// Notification templates
export const notificationTemplates = {
  // Transaction notifications
  transactionAdded: (type: 'income' | 'expense', amount: number) => ({
    type: type === 'income' ? 'success' as const : 'info' as const,
    category: 'transaction' as const,
    title: type === 'income' ? 'Gəlir əlavə edildi' : 'Xərc əlavə edildi',
    message: `₼${amount.toLocaleString()} məbləğində ${type === 'income' ? 'gəlir' : 'xərc'} uğurla qeyd edildi.`,
    icon: type === 'income' ? '💰' : '💸',
  }),

  // Goal notifications
  goalProgress: (goalName: string, percentage: number) => ({
    type: percentage >= 100 ? 'success' as const : 'info' as const,
    category: 'goal' as const,
    title: percentage >= 100 ? 'Məqsəd tamamlandı! 🎉' : 'Məqsəd tərəqqisi',
    message: percentage >= 100 
      ? `"${goalName}" məqsədinizə çatdınız! Təbrik edirik!`
      : `"${goalName}" məqsədiniz ${percentage}% tamamlandı.`,
    icon: percentage >= 100 ? '🎉' : '🎯',
  }),

  goalDeadline: (goalName: string, daysLeft: number) => ({
    type: daysLeft <= 7 ? 'warning' as const : 'info' as const,
    category: 'goal' as const,
    title: 'Məqsəd vaxtı yaxınlaşır',
    message: `"${goalName}" məqsədinizin vaxtı ${daysLeft} gün sonra bitir.`,
    icon: '⏰',
  }),

  // Crypto notifications
  cryptoPriceChange: (symbol: string, change: number) => ({
    type: change >= 0 ? 'success' as const : 'warning' as const,
    category: 'crypto' as const,
    title: `${symbol} qiymət dəyişikliyi`,
    message: `${symbol} son 24 saatda ${change >= 0 ? '+' : ''}${change.toFixed(2)}% dəyişdi.`,
    icon: '₿',
  }),

  // Budget notifications
  budgetAlert: (category: string, percentage: number) => ({
    type: percentage >= 90 ? 'warning' as const : 'info' as const,
    category: 'budget' as const,
    title: 'Büdcə xəbərdarlığı',
    message: `${category} kateqoriyasında büdcənizin ${percentage}%-i istifadə edilib.`,
    icon: '📊',
  }),

  // System notifications
  welcomeBack: (userName: string) => ({
    type: 'success' as const,
    category: 'system' as const,
    title: 'Xoş gəldiniz! 👋',
    message: `${userName}, WealthTracker-ə yenidən xoş gəldiniz!`,
    icon: '👋',
  }),
}

// Helper to dispatch template notifications
export const sendNotification = (
  template: keyof typeof notificationTemplates,
  ...args: any[]
) => {
  const templateFn = notificationTemplates[template] as (...args: any[]) => any
  const notification = templateFn(...args)
  store.dispatch(addNotification(notification))
}























