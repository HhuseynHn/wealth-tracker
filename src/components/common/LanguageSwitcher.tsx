import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { GlobeAltIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../i18n'
import { Language } from '../../i18n/translations'

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'buttons' | 'minimal'
}

export const LanguageSwitcher = ({ variant = 'dropdown' }: LanguageSwitcherProps) => {
  const { currentLanguage, changeLanguage, t } = useLanguage()

  const currentLang = languages.find(l => l.code === currentLanguage)

  // Minimal variant for dark pages (Welcome, Login, Register)
  if (variant === 'minimal') {
    return (
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
          <span className="text-lg">{currentLang?.flag}</span>
          <span className="text-sm font-medium">{currentLanguage.toUpperCase()}</span>
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
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white/10 backdrop-blur-xl rounded-xl shadow-lg ring-1 ring-white/10 focus:outline-none z-50">
            <div className="p-2">
              {languages.map(lang => (
                <Menu.Item key={lang.code}>
                  {({ active }) => (
                    <button
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-lg ${
                        active ? 'bg-white/10' : ''
                      } ${
                        currentLanguage === lang.code
                          ? 'text-blue-400'
                          : 'text-white/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </div>
                      {currentLanguage === lang.code && (
                        <CheckIcon className="w-4 h-4 text-blue-400" />
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

  if (variant === 'buttons') {
    return (
      <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              currentLanguage === lang.code
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <span>{lang.flag}</span>
            <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <GlobeAltIcon className="w-5 h-5" />
        <span className="text-sm font-medium">
          {currentLang?.flag} {currentLanguage.toUpperCase()}
        </span>
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
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t.language.title}
            </div>
            {languages.map(lang => (
              <Menu.Item key={lang.code}>
                {({ active }) => (
                  <button
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-lg ${
                      active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } ${
                      currentLanguage === lang.code
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </div>
                    {currentLanguage === lang.code && (
                      <CheckIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
