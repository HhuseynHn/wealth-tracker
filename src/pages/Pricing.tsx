import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckIcon, 
  SparklesIcon,
  RocketLaunchIcon,
  BuildingOffice2Icon,
  XMarkIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '../i18n'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { upgradePlan, startTrial, renewSubscription } from '../store/subscriptionSlice'
import { SUBSCRIPTION_PLANS, PlanType } from '../types/subscription'

export const Pricing = () => {
  const { t, currentLanguage } = useLanguage()
  const dispatch = useAppDispatch()
  const { currentPlan, trialEndsAt, expiresAt } = useAppSelector((state) => state.subscription)
  const { user } = useAppSelector((state) => state.auth)
  
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Payment form state
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  
  // Check if subscription is expired
  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false
  const daysLeft = expiresAt ? Math.ceil((new Date(expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0

  const planIcons = {
    free: SparklesIcon,
    pro: RocketLaunchIcon,
    enterprise: BuildingOffice2Icon,
  }

  const handleUpgrade = (planId: PlanType) => {
    if (planId === 'free') return
    setSelectedPlan(planId)
    setShowUpgradeModal(true)
    setShowPaymentForm(true)
  }

  const handleConfirmUpgrade = async () => {
    if (!selectedPlan) return
    
    // Validate payment form
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      alert('Zəhmət olmasa bütün ödəniş məlumatlarını doldurun')
      return
    }
    
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    dispatch(upgradePlan({ plan: selectedPlan, userId: user?.id || null }))
    setShowUpgradeModal(false)
    setShowPaymentForm(false)
    setIsProcessing(false)
    
    // Reset form
    setCardNumber('')
    setCardHolder('')
    setExpiryDate('')
    setCvv('')
  }

  const handleRenew = (planId: PlanType) => {
    setSelectedPlan(planId)
    setShowUpgradeModal(true)
    setShowPaymentForm(true)
  }

  const handleConfirmRenew = async () => {
    if (!selectedPlan) return
    
    // Validate payment form
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      alert('Zəhmət olmasa bütün ödəniş məlumatlarını doldurun')
      return
    }
    
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    dispatch(renewSubscription({ plan: selectedPlan, userId: user?.id || null }))
    setShowUpgradeModal(false)
    setShowPaymentForm(false)
    setIsProcessing(false)
    
    // Reset form
    setCardNumber('')
    setCardHolder('')
    setExpiryDate('')
    setCvv('')
  }

  const handleStartTrial = () => {
    dispatch(startTrial(user?.id || null))
  }
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }
  
  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t.subscription.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
          {t.subscription.subtitle}
        </p>
      </div>

      {/* Current Plan Banner */}
      {currentPlan !== 'free' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 text-white ${
            isExpired 
              ? 'bg-gradient-to-r from-red-600 to-orange-600' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-blue-100 dark:text-white/80">
                {isExpired ? t.subscription.expired : t.subscription.currentPlan}
              </p>
              <h3 className="text-2xl font-bold capitalize">{currentPlan}</h3>
              {trialEndsAt && (
                <p className="text-sm text-blue-100 mt-1">
                  {t.subscription.trial}: {new Date(trialEndsAt).toLocaleDateString()}
                </p>
              )}
              {expiresAt && !isExpired && (
                <p className="text-sm text-blue-100 mt-1">
                  {t.subscription.expiresAt}: {new Date(expiresAt).toLocaleDateString()} ({daysLeft} {t.subscription.daysLeft})
                </p>
              )}
              {isExpired && (
                <p className="text-sm text-white/90 mt-1">
                  {t.subscription.expiredMessage}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {isExpired ? (
                <button
                  onClick={() => handleRenew(currentPlan)}
                  className="px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  {t.subscription.renew}
                </button>
              ) : (
                <span className="px-4 py-2 bg-white/20 rounded-lg font-medium">
                  {t.subscription.allFeaturesIncluded}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              billingPeriod === 'monthly'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {t.subscription.monthly}
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              billingPeriod === 'yearly'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {t.subscription.yearly}
            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 rounded-full">
              20% {t.subscription.savePercent}
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {SUBSCRIPTION_PLANS.map((plan, index) => {
          const Icon = planIcons[plan.id]
          const price = billingPeriod === 'yearly' ? plan.price * 0.8 : plan.price
          const isCurrentPlan = currentPlan === plan.id
          
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden ${
                plan.isPopular ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                  {t.subscription.popular}
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    plan.id === 'free' ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400' :
                    plan.id === 'pro' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' :
                    'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {currentLanguage === 'az' ? plan.nameAz : plan.name}
                    </h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {t.subscription.perMonth}
                    </span>
                  </div>
                  {billingPeriod === 'yearly' && plan.price > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      ${(plan.price * 12 * 0.8).toFixed(2)} {t.subscription.perYear}
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-medium"
                  >
                    {t.subscription.currentPlan}
                  </button>
                ) : plan.id === 'free' ? (
                  <button
                    disabled
                    className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium"
                  >
                    {t.subscription.free}
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                    }`}
                  >
                    {t.subscription.upgrade}
                  </button>
                )}

                {/* Trial Button */}
                {plan.id === 'pro' && currentPlan === 'free' && !trialEndsAt && (
                  <button
                    onClick={handleStartTrial}
                    className="w-full mt-3 py-2 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                  >
                    14 {t.subscription.trialDays} →
                  </button>
                )}

                {/* Features */}
                <div className="mt-8 space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    {t.subscription.features}
                  </h4>
                  <ul className="space-y-3">
                    {(currentLanguage === 'az' ? plan.featuresAz : plan.features).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.id === 'free' ? 'text-gray-400' :
                          plan.id === 'pro' ? 'text-blue-500' :
                          'text-purple-500'
                        }`} />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* FAQ or Additional Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t.subscription.specialOffer}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <SparklesIcon className="w-5 h-5" />
            <span className="font-medium">{t.subscription.limitedTime}</span>
          </div>
          <span className="hidden sm:block text-gray-300 dark:text-gray-600">|</span>
          <p className="text-gray-600 dark:text-gray-400">
            Pro versiyaya keçin və 20% endirim əldə edin!
          </p>
        </div>
      </div>

      {/* Upgrade/Renew Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {isExpired ? t.subscription.renewSubscription : t.subscription.upgrade}
              </h3>
              <button
                onClick={() => {
                  setShowUpgradeModal(false)
                  setShowPaymentForm(false)
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {isExpired 
                  ? t.subscription.expiredMessage
                  : selectedPlan === 'pro' 
                    ? 'Pro planına yüksəltmək istədiyinizdən əminsiniz?'
                    : 'Enterprise planına yüksəltmək istədiyinizdən əminsiniz?'
                }
              </p>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {selectedPlan} Plan
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${selectedPlan === 'pro' ? '9.99' : '29.99'}/ay
                  </span>
                </div>
              </div>

              {/* Payment Form */}
              {showPaymentForm && (
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <CreditCardIcon className="w-5 h-5" />
                    <h4 className="font-semibold">{t.subscription.paymentInfo}</h4>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.subscription.cardNumber}
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder={t.subscription.cardNumberPlaceholder}
                      maxLength={19}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.subscription.cardHolder}
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder={t.subscription.cardHolderPlaceholder}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t.subscription.expiryDate}
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        placeholder={t.subscription.expiryPlaceholder}
                        maxLength={5}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t.subscription.cvv}
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder={t.subscription.cvvPlaceholder}
                        maxLength={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Bu demo versiyasıdır. Real ödəmə tələb olunmur.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowUpgradeModal(false)
                  setShowPaymentForm(false)
                }}
                disabled={isProcessing}
                className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={isExpired ? handleConfirmRenew : handleConfirmUpgrade}
                disabled={isProcessing}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    {t.subscription.processing}
                  </>
                ) : (
                  t.common.confirm
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}



