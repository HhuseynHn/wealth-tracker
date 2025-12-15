import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HomeIcon,
  CreditCardIcon,
  ChartBarIcon,
  FlagIcon,
  DocumentChartBarIcon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../i18n'
import { useAppSelector } from '../../store/hooks'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { t } = useLanguage()
  const { currentPlan } = useAppSelector((state) => state.subscription)
  const { unreadCount } = useAppSelector((state) => state.notifications)

  const navigation = [
    { name: t.nav.dashboard, path: '/dashboard', icon: HomeIcon },
    { name: t.nav.transactions, path: '/transactions', icon: CreditCardIcon },
    { name: t.nav.investments, path: '/investments', icon: ChartBarIcon },
    { name: t.nav.goals, path: '/goals', icon: FlagIcon },
    { name: t.nav.reports, path: '/reports', icon: DocumentChartBarIcon },
  ]

  const secondaryNav = [
    { name: t.nav.notifications, path: '/notifications', icon: BellIcon, badge: unreadCount > 0 ? unreadCount : undefined },
    { name: t.nav.profile, path: '/profile', icon: UserCircleIcon },
  ]

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200/50 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-lg font-bold text-white">W</span>
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white">WealthTracker</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="mb-2 px-3 text-xs font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wider">
          Main Menu
        </div>
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-gray-500'}`}
                />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Secondary Navigation */}
        <div className="mt-6 mb-2 px-3 text-xs font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wider">
          Account
        </div>
        {secondaryNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-gray-500'}`}
                />
                {item.name}
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
                {isActive && !item.badge && (
                  <motion.div
                    layoutId="activeSecondary"
                    className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-200/50 dark:border-gray-700">
        {currentPlan === 'free' ? (
          <Link to="/pricing">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white hover:from-blue-600 hover:to-purple-700 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <SparklesIcon className="w-5 h-5" />
                <h4 className="font-semibold">{t.header.proPlan}</h4>
              </div>
              <p className="text-sm text-blue-100 mb-3">
                {t.header.proDesc}
              </p>
              <div className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium text-center transition-colors">
                {t.header.upgrade}
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl text-white">
            <div className="flex items-center gap-2 mb-1">
              <SparklesIcon className="w-5 h-5" />
              <h4 className="font-semibold capitalize">{currentPlan} Plan</h4>
            </div>
            <p className="text-sm text-orange-100">
              {t.subscription.allFeaturesIncluded}
            </p>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-900 border-r border-slate-200/50 dark:border-gray-700">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
