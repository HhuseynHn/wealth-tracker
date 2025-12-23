import { motion } from 'framer-motion'
import { SparklesIcon, XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { useLanguage } from '../../i18n'

interface UpgradeBannerProps {
  variant?: 'inline' | 'floating' | 'card'
}

export const UpgradeBanner = ({ variant = 'inline' }: UpgradeBannerProps) => {
  const { t } = useLanguage()
  const { currentPlan } = useAppSelector((state) => state.subscription)
  const [isDismissed, setIsDismissed] = useState(false)

  // Don't show if already on paid plan or dismissed
  if (currentPlan !== 'free' || isDismissed) {
    return null
  }

  if (variant === 'floating') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-40 max-w-sm"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 shadow-lg">
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-2 right-2 p-1 text-white/70 hover:text-white rounded-full"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white">{t.header.proPlan}</h4>
              <p className="text-sm text-white/80 mt-1">{t.header.proDesc}</p>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-white hover:underline"
              >
                {t.header.upgrade}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-100 dark:border-blue-800"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <SparklesIcon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {t.header.proPlan}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              {t.header.proDesc}
            </p>
          </div>
          <Link
            to="/pricing"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-colors"
          >
            {t.header.upgrade}
          </Link>
        </div>
      </motion.div>
    )
  }

  // Inline variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl px-4 py-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <SparklesIcon className="w-5 h-5 text-white" />
        <div className="text-white">
          <span className="font-medium">{t.header.proPlan}</span>
          <span className="mx-2 text-white/50">|</span>
          <span className="text-white/80 text-sm">{t.header.proDesc}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/pricing"
          className="px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {t.header.upgrade}
        </Link>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}






















