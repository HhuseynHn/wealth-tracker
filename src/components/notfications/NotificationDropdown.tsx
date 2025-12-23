import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { markAsRead, removeNotification, markAllAsRead } from '../../store/notificationSlice'
import { NotificationItem } from './NotificationItem'
import { useLanguage } from '../../i18n'

export const NotificationDropdown = () => {
  const { t } = useLanguage()
  const dispatch = useAppDispatch()
  const { notifications, unreadCount } = useAppSelector((state) => state.notifications)

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id))
  }

  const handleRemove = (id: string) => {
    dispatch(removeNotification(id))
  }

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead())
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
            <BellIcon className="w-6 h-6" />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-50 mt-2 w-96 origin-top-right">
              <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t.notifications.title}
                    </h3>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                        {unreadCount} {t.notifications.new}
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                    >
                      {t.notifications.markAllRead}
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <AnimatePresence>
                      {notifications.slice(0, 10).map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          onMarkAsRead={handleMarkAsRead}
                          onRemove={handleRemove}
                        />
                      ))}
                    </AnimatePresence>
                  ) : (
                    <div className="p-8 text-center">
                      <BellIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        {t.notifications.noNotifications}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 10 && (
                  <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                    <a
                      href="/notifications"
                      className="block text-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                    >
                      {t.dashboard.viewAll}
                    </a>
                  </div>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}






















