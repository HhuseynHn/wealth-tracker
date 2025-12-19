import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ChartPieIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { useLanguage } from '../i18n'
import { useAppSelector } from '../store/hooks'
import { useTheme } from '../hooks'
import {
  selectTransactionStats,
  selectMonthlyStats,
  selectCategoryStats,
  selectRecentTransactions,
} from '../store/transactionSlice'
import { getCategoryInfo } from '../types/transaction'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const Dashboard = () => {
  const { t, currentLanguage } = useLanguage()
  const { isDark, chartColors, resolvedTheme } = useTheme()
  const stats = useAppSelector(selectTransactionStats)
  const monthlyStats = useAppSelector(selectMonthlyStats)
  const categoryStats = useAppSelector(selectCategoryStats)
  const recentTransactions = useAppSelector((state) => selectRecentTransactions(state, 5))

  const statCards = [
    {
      name: t.dashboard.totalBalance,
      value: `₼${stats.balance.toLocaleString()}`,
      change: stats.balance >= 0 ? '+' : '',
      trend: stats.balance >= 0 ? 'up' : 'down',
      icon: BanknotesIcon,
      color: 'blue',
    },
    {
      name: t.dashboard.monthlyIncome,
      value: `₼${monthlyStats.income.toLocaleString()}`,
      change: '+100%',
      trend: 'up',
      icon: ArrowTrendingUpIcon,
      color: 'green',
    },
    {
      name: t.dashboard.monthlyExpense,
      value: `₼${monthlyStats.expense.toLocaleString()}`,
      change: '-',
      trend: 'down',
      icon: ArrowTrendingDownIcon,
      color: 'red',
    },
    {
      name: t.dashboard.monthlySavings,
      value: `₼${monthlyStats.savings.toLocaleString()}`,
      change: monthlyStats.savings >= 0 ? '+' : '',
      trend: monthlyStats.savings >= 0 ? 'up' : 'down',
      icon: ChartPieIcon,
      color: 'purple',
    },
  ]

  // Generate chart data for last 6 months - cached with useMemo
  const chartData = useMemo(() => {
    const months = currentLanguage === 'az' 
      ? ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun', 'İyul', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    const now = new Date()
    const data = []
    
    // Use fixed seed for consistent data (based on month/year)
    const seed = now.getFullYear() * 12 + now.getMonth()
    
    // Simple seeded random function
    let seedValue = seed
    const seededRandom = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280
      return seedValue / 233280
    }
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      data.push({
        name: months[date.getMonth()],
        [currentLanguage === 'az' ? 'gəlir' : 'income']: Math.floor(seededRandom() * 3000) + 4000,
        [currentLanguage === 'az' ? 'xərc' : 'expense']: Math.floor(seededRandom() * 2000) + 2000,
      })
    }
    return data
  }, [currentLanguage]) // Only regenerate when language changes

  const incomeKey = currentLanguage === 'az' ? 'gəlir' : 'income'
  const expenseKey = currentLanguage === 'az' ? 'xərc' : 'expense'

  // Pie chart data
  const pieData = categoryStats.slice(0, 5).map((cat) => {
    const info = getCategoryInfo(cat.category as any)
    return {
      name: currentLanguage === 'az' ? info.nameAz : info.nameEn,
      value: Math.round(cat.percentage),
      color: info.color,
    }
  })

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t.dashboard.title}</h1>
          <p className="text-slate-500 dark:text-gray-400">{t.dashboard.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/transactions">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl font-medium shadow-lg shadow-green-500/30 hover:bg-green-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              {t.dashboard.addIncome}
            </motion.button>
          </Link>
          <Link to="/transactions">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium shadow-lg shadow-red-500/30 hover:bg-red-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              {t.dashboard.addExpense}
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statCards.map((stat) => (
          <motion.div
            key={stat.name}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div
                className={`p-2.5 rounded-xl ${
                  stat.color === 'blue'
                    ? 'bg-blue-50 dark:bg-blue-900/30'
                    : stat.color === 'green'
                    ? 'bg-green-50 dark:bg-green-900/30'
                    : stat.color === 'red'
                    ? 'bg-red-50 dark:bg-red-900/30'
                    : 'bg-purple-50 dark:bg-purple-900/30'
                }`}
              >
                <stat.icon
                  className={`h-5 w-5 ${
                    stat.color === 'blue'
                      ? 'text-blue-600 dark:text-blue-400'
                      : stat.color === 'green'
                      ? 'text-green-600 dark:text-green-400'
                      : stat.color === 'red'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-purple-600 dark:text-purple-400'
                  }`}
                />
              </div>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownIcon className="h-3.5 w-3.5" />
                )}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 dark:text-gray-400">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">{t.dashboard.incomeVsExpense}</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">{t.dashboard.last6Months}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-slate-600 dark:text-gray-400">{t.dashboard.income}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-sm text-slate-600 dark:text-gray-400">{t.dashboard.expense}</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart key={resolvedTheme} data={chartData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: chartColors.text, fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: chartColors.text, fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartColors.tooltipBg,
                    border: `1px solid ${chartColors.tooltipBorder}`,
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    color: chartColors.tooltipText,
                  }}
                  labelStyle={{ color: chartColors.tooltipText }}
                  itemStyle={{ color: chartColors.tooltipText }}
                />
                <Area
                  type="monotone"
                  dataKey={incomeKey}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                />
                <Area
                  type="monotone"
                  dataKey={expenseKey}
                  stroke="#f87171"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorExpense)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700"
        >
          <div className="mb-4">
            <h3 className="font-semibold text-slate-800 dark:text-white">{t.dashboard.expenseCategories}</h3>
            <p className="text-sm text-slate-500 dark:text-gray-400">{t.dashboard.thisMonth}</p>
          </div>
          {pieData.length > 0 ? (
            <>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart key={resolvedTheme}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: chartColors.tooltipBg,
                        border: `1px solid ${chartColors.tooltipBorder}`,
                        borderRadius: '12px',
                        color: chartColors.tooltipText,
                      }}
                      itemStyle={{ color: chartColors.tooltipText }}
                      formatter={(value: number) => [`${value}%`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-slate-600 dark:text-gray-400">{item.name}</span>
                    <span className="text-xs font-medium text-slate-800 dark:text-gray-200 ml-auto">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center text-slate-400 dark:text-gray-500">
              {t.common.noData}
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white">{t.dashboard.recentTransactions}</h3>
            <p className="text-sm text-slate-500 dark:text-gray-400">{t.dashboard.last5Transactions}</p>
          </div>
          <Link
            to="/transactions"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {t.dashboard.viewAll} →
          </Link>
        </div>
        {recentTransactions.length > 0 ? (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => {
              const categoryInfo = getCategoryInfo(transaction.category)
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'
                      }`}
                    >
                      <span className="text-lg">{categoryInfo.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{transaction.description}</p>
                      <p className="text-sm text-slate-500 dark:text-gray-400">
                        {currentLanguage === 'az' ? categoryInfo.nameAz : categoryInfo.nameEn}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}₼{transaction.amount.toLocaleString()}
                  </span>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 dark:text-gray-500">
            {t.dashboard.noTransactions}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
