import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../i18n'
import { LanguageSwitcher } from '../components/common'

const Welcome = () => {
  const { t } = useLanguage()

  const features = [
    {
      icon: ChartBarIcon,
      title: t.welcome.features.finance,
      description: t.welcome.features.financeDesc,
    },
    {
      icon: BanknotesIcon,
      title: t.welcome.features.investment,
      description: t.welcome.features.investmentDesc,
    },
    {
      icon: ShieldCheckIcon,
      title: t.welcome.features.security,
      description: t.welcome.features.securityDesc,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher variant="minimal" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-6">
        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mb-6 shadow-2xl shadow-blue-500/30"
          >
            <span className="text-4xl font-bold text-white">W</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.welcome.title}
          </h1>
          <p className="text-xl text-slate-400 max-w-md mx-auto">
            {t.welcome.subtitle}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-12 max-w-2xl"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <feature.icon className="h-6 w-6 text-blue-400" />
              <div>
                <p className="font-medium text-white text-sm">{feature.title}</p>
                <p className="text-xs text-slate-400">{feature.description}</p>
                

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {t.welcome.greeting}
          </h2>
          <p className="text-slate-400 text-center mb-8">
            {t.welcome.hasAccount}
          </p>

          <div className="space-y-4">
            {/* Login Button */}
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-3"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                {t.welcome.loginBtn}
              </motion.button>
            </Link>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-slate-500 text-sm">{t.common.or}</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Register Button */}
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 border-2 border-white/20 text-white font-semibold rounded-2xl transition-all flex items-center justify-center gap-3"
              >
                <UserPlusIcon className="h-6 w-6" />
                {t.welcome.registerBtn}
              </motion.button>
            </Link>
          </div>

          {/* Demo info */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-slate-500">
              {t.welcome.demoAccount}: <span className="text-slate-400">demo@wealthtracker.com</span> / <span className="text-slate-400">demo123</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative py-6 text-center"
      >
        <p className="text-slate-500 text-sm">
          {t.welcome.footer}
        </p>
      </motion.footer>
    </div>
  )
}

export default Welcome
