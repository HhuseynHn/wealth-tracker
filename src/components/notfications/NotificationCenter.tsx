import { motion, AnimatePresence } from 'framer-motion'
import { BellIcon, TrashIcon, CheckIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { 
  markAsRead, 
  removeNotification, 
  markAllAsRead, 
  clearAllNotifications 
} from '../../store/notificationSlice'
import { NotificationItem } from './NotificationItem'
import { useLanguage } from '../../i18n'
import { NotificationCategory, NotificationType } from '../../types/notification'

export const NotificationCenter = () => {
  const { t } = useLanguage()
  const dispatch = useAppDispatch()
  const { notifications, unreadCount } = useAppSelector((state) => state.notifications)
  
  const [filterCategory, setFilterCategory] = useState<NotificationCategory | 'all'>('all')
  const [filterType, setFilterType] = useState<NotificationType | 'all'>('all')

  const filteredNotifications = notifications.filter(n => {
    if (filterCategory !== 'all' && n.category !== filterCategory) return false
    if (filterType !== 'all' && n.type !== filterType) return false
    return true
  })

  // Group notifications by date
  const groupedNotifications = {
    today: [] as typeof notifications,
    yesterday: [] as typeof notifications,
    older: [] as typeof notifications,
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  filteredNotifications.forEach(n => {
    const date = new Date(n.createdAt)
    date.setHours(0, 0, 0, 0)
    
    if (date.getTime() === today.getTime()) {
      groupedNotifications.today.push(n)
    } else if (date.getTime() === yesterday.getTime()) {
      groupedNotifications.yesterday.push(n)
    } else {
      groupedNotifications.older.push(n)
    }
  })

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id))
  }

  const handleRemove = (id: string) => {
    dispatch(removeNotification(id))
  }

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead())
  }

  const handleClearAll = () => {
    if (window.confirm(t.common.confirm + '?')) {
      dispatch(clearAllNotifications())
    }
  }

  const categories: (NotificationCategory | 'all')[] = ['all', 'transaction', 'goal', 'crypto', 'system', 'budget']
  const types: (NotificationType | 'all')[] = ['all', 'success', 'warning', 'error', 'info']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t.notifications.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {t.notifications.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
            >
              <CheckIcon className="w-4 h-4" />
              {t.notifications.markAllRead}
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
              {t.notifications.clearAll}
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {notifications.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{t.common.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {unreadCount}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{t.notifications.new}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {notifications.filter(n => n.type === 'success').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{t.common.success}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {notifications.filter(n => n.type === 'warning').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{t.common.warning}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300">{t.common.filter}</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">
              {t.common.category}
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    filterCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat === 'all' ? t.common.all : cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">
              {t.common.type}
            </label>
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    filterType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {type === 'all' ? t.common.all : type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Groups */}
      <div className="space-y-6">
        {/* Today */}
        {groupedNotifications.today.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              {t.notifications.today}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <AnimatePresence>
                {groupedNotifications.today.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onRemove={handleRemove}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Yesterday */}
        {groupedNotifications.yesterday.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              {t.notifications.yesterday}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <AnimatePresence>
                {groupedNotifications.yesterday.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onRemove={handleRemove}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Older */}
        {groupedNotifications.older.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              {t.notifications.older}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <AnimatePresence>
                {groupedNotifications.older.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onRemove={handleRemove}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center"
          >
            <BellIcon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t.notifications.noNotifications}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t.notifications.subtitle}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}






















