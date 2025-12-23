import { motion } from 'framer-motion'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setTheme, toggleTheme } from '../../store/themeSlice'
import { Theme } from '../../types/settings'
import { useLanguage } from '../../i18n'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface ThemeToggleProps {
  variant?: 'icon' | 'dropdown' | 'switch'
}

export const ThemeToggle = ({ variant = 'icon' }: ThemeToggleProps) => {
  const { t } = useLanguage()
  const dispatch = useAppDispatch()
  const { theme, resolvedTheme } = useAppSelector((state) => state.theme)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  const handleSetTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme))
  }

  const themes: { value: Theme; label: string; icon: typeof SunIcon }[] = [
    { value: 'light', label: t.theme.light, icon: SunIcon },
    { value: 'dark', label: t.theme.dark, icon: MoonIcon },
    { value: 'system', label: t.theme.system, icon: ComputerDesktopIcon },
  ]

  if (variant === 'icon') {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={t.theme.title}
      >
        <motion.div
          initial={false}
          animate={{ rotate: resolvedTheme === 'dark' ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {resolvedTheme === 'dark' ? (
            <MoonIcon className="w-5 h-5" />
          ) : (
            <SunIcon className="w-5 h-5" />
          )}
        </motion.div>
      </motion.button>
    )
  }

  if (variant === 'dropdown') {
    return (
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          {resolvedTheme === 'dark' ? (
            <MoonIcon className="w-5 h-5" />
          ) : (
            <SunIcon className="w-5 h-5" />
          )}
          <span className="text-sm hidden sm:block">{t.theme.title}</span>
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
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              {themes.map(({ value, label, icon: Icon }) => (
                <Menu.Item key={value}>
                  {({ active }) => (
                    <button
                      onClick={() => handleSetTheme(value)}
                      className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm ${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } ${
                        theme === value
                          ? 'text-blue-600 dark:text-blue-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                      {theme === value && (
                        <motion.span
                          layoutId="theme-indicator"
                          className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                        />
                      )}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }

  // Switch variant
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => handleSetTheme(value)}
          className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            theme === value
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}






















