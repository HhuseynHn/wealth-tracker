import { motion } from 'framer-motion'
import { SparklesIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { useAppSelector } from '../../store/hooks'
import { useLanguage } from '../../i18n'
import { ProFeatures } from '../../types/subscription'

interface ProBadgeProps {
  feature?: keyof ProFeatures
  showLock?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const ProBadge = ({ feature, showLock = true, size = 'md' }: ProBadgeProps) => {
  const { t } = useLanguage()
  const { features, currentPlan } = useAppSelector((state) => state.subscription)

  // If feature is specified, check if user has access
  if (feature && features[feature]) {
    return null // User has access, don't show badge
  }

  // If user is on Pro or Enterprise, don't show badge
  if (currentPlan !== 'free') {
    return null
  }

  const sizes = {
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-sm px-2 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center ${sizes[size]} bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-full shadow-sm`}
    >
      {showLock ? (
        <LockClosedIcon className={iconSizes[size]} />
      ) : (
        <SparklesIcon className={iconSizes[size]} />
      )}
      <span>PRO</span>
    </motion.span>
  )
}

// Feature gate component
interface FeatureGateProps {
  feature: keyof ProFeatures
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const FeatureGate = ({ feature, children, fallback }: FeatureGateProps) => {
  const { features, currentPlan } = useAppSelector((state) => state.subscription)

  if (features[feature] || currentPlan !== 'free') {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none filter blur-sm">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg">
        <ProBadge size="lg" />
      </div>
    </div>
  )
}






















