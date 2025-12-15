import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import {
  Bars3Icon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/authSlice'
import { useLanguage } from '../../i18n'
// import { LanguageSwitcher, ThemeToggle } from '../common'
// import { NotificationDropdown } from '../notifications'
// import { ProBadge } from '../subscription'

interface HeaderProps {
  onMenuClick: () => void
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { currentPlan } = useAppSelector((state) => state.subscription)
  const { t } = useLanguage()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Left side - Menu button (mobile) */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Search or Title */}
          <div className="hidden sm:flex items-center gap-3">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              {t.header.welcome}, {user?.name?.split(' ')[0] || 'User'}! 👋
            </h2>
            {currentPlan !== 'free' && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full">
                PRO
              </span>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Pro Upgrade Button (if free) */}
          {currentPlan === 'free' && (
            <Link
              to="/pricing"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <SparklesIcon className="w-4 h-4" />
              <span className="hidden md:inline">{t.header.upgrade}</span>
            </Link>
          )}

          {/* Theme Toggle */}
          {/* <ThemeToggle variant="dropdown" /> */}

          {/* Language Switcher */}
          {/* <LanguageSwitcher /> */}

          {/* Notifications */}
          {/* <NotificationDropdown /> */}

          {/* User Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-800 dark:text-white">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/5 focus:outline-none p-1.5">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{user?.name}</p>
                    {/* {currentPlan !== 'free' && <ProBadge size="sm" showLock={false} />} */}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`${
                        active ? 'bg-slate-100 dark:bg-gray-700' : ''
                      } flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-gray-300 rounded-lg transition-colors`}
                    >
                      <UserCircleIcon className="h-5 w-5 text-slate-400 dark:text-gray-500" />
                      {t.nav.profile}
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/pricing"
                      className={`${
                        active ? 'bg-slate-100 dark:bg-gray-700' : ''
                      } flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-gray-300 rounded-lg transition-colors`}
                    >
                      <CreditCardIcon className="h-5 w-5 text-slate-400 dark:text-gray-500" />
                      {t.nav.pricing}
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`${
                        active ? 'bg-slate-100 dark:bg-gray-700' : ''
                      } flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-gray-300 rounded-lg transition-colors`}
                    >
                      <Cog6ToothIcon className="h-5 w-5 text-slate-400 dark:text-gray-500" />
                      {t.nav.settings}
                    </Link>
                  )}
                </Menu.Item>

                <div className="border-t border-slate-100 dark:border-gray-700 mt-1 pt-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? 'bg-red-50 dark:bg-red-900/30' : ''
                        } flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg transition-colors`}
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        {t.auth.logout}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  )
}

export default Header
