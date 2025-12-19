import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownTrayIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { useLanguage } from '../i18n'
import { useAppSelector } from '../store/hooks'
import { useTheme } from '../hooks'
import { selectTransactionStats, selectCategoryStats } from '../store/transactionSlice'
import { getCategoryInfo } from '../types/transaction'

const Reports = () => {
  const { t, currentLanguage } = useLanguage()
  const { chartColors, resolvedTheme } = useTheme()
  const stats = useAppSelector(selectTransactionStats)
  const categoryStats = useAppSelector(selectCategoryStats)
  const [dateRange, setDateRange] = useState('thisYear')

  const months = currentLanguage === 'az'
    ? ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun', 'İyul', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Generate monthly data - cached with useMemo
  const monthlyData = useMemo(() => {
    // Use fixed seed for consistent data (based on current year)
    const seed = new Date().getFullYear()
    let seedValue = seed
    
    // Simple seeded random function
    const seededRandom = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280
      return seedValue / 233280
    }
    
    return months.slice(0, 11).map((month, i) => ({
      name: month,
      [currentLanguage === 'az' ? 'gəlir' : 'income']: Math.floor(seededRandom() * 3000) + 5000,
      [currentLanguage === 'az' ? 'xərc' : 'expense']: Math.floor(seededRandom() * 2000) + 3000,
    }))
  }, [currentLanguage, months])

  const savingsData = useMemo(() => {
    // Use fixed seed for consistent data (based on current year + 1000)
    const seed = new Date().getFullYear() + 1000
    let seedValue = seed
    
    // Simple seeded random function
    const seededRandom = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280
      return seedValue / 233280
    }
    
    return months.slice(0, 11).map((month) => ({
      name: month,
      [currentLanguage === 'az' ? 'qənaət' : 'savings']: Math.floor(seededRandom() * 2000) + 1500,
    }))
  }, [currentLanguage, months])

  const incomeKey = currentLanguage === 'az' ? 'gəlir' : 'income'
  const expenseKey = currentLanguage === 'az' ? 'xərc' : 'expense'
  const savingsKey = currentLanguage === 'az' ? 'qənaət' : 'savings'

  const totalIncome = monthlyData.reduce((sum, m) => sum + (m[incomeKey] as number), 0)
  const totalExpense = monthlyData.reduce((sum, m) => sum + (m[expenseKey] as number), 0)
  const totalSavings = savingsData.reduce((sum, s) => sum + (s[savingsKey] as number), 0)
  const avgMonthlySavings = Math.round(totalSavings / savingsData.length)

  // Category pie data
  const pieData = categoryStats.slice(0, 5).map((cat) => {
    const info = getCategoryInfo(cat.category as any)
    return {
      name: currentLanguage === 'az' ? info.nameAz : info.nameEn,
      value: cat.total,
      color: info.color,
    }
  })

  const dateRangeOptions = [
    { value: 'thisMonth', label: t.reports.thisMonth },
    { value: 'lastMonth', label: t.reports.lastMonth },
    { value: 'last3Months', label: t.reports.last3Months },
    { value: 'last6Months', label: t.reports.last6Months },
    { value: 'thisYear', label: t.reports.thisYear },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t.reports.title}</h1>
          <p className="text-slate-500 dark:text-gray-400">{t.reports.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-700 dark:text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            {dateRangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            {t.reports.downloadPdf}
          </motion.button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{t.reports.yearlyIncome}</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">₼{totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{t.reports.yearlyExpense}</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">₼{totalExpense.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{t.reports.yearlySavings}</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₼{totalSavings.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{t.reports.avgMonthlySavings}</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">₼{avgMonthlySavings.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expense Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">{t.reports.incomeVsExpense}</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">{t.reports.monthlyComparison}</p>
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
              <BarChart key={resolvedTheme} data={monthlyData}>
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
                  formatter={(value: number) => [`₼${value.toLocaleString()}`, '']}
                />
                <Bar dataKey={incomeKey} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey={expenseKey} fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">{t.reports.savingsTrend}</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">{t.reports.monthlySavings}</p>
            </div>
            <DocumentChartBarIcon className="h-6 w-6 text-slate-400 dark:text-gray-500" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart key={resolvedTheme} data={savingsData}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                  formatter={(value: number) => [`₼${value.toLocaleString()}`, t.reports.savings]}
                />
                <Line
                  type="monotone"
                  dataKey={savingsKey}
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700">
          <h3 className="font-semibold text-slate-800 dark:text-white mb-4">{t.reports.categoryBreakdown}</h3>
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
                      formatter={(value: number) => [`₼${value.toLocaleString()}`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-slate-600 dark:text-gray-400">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-800 dark:text-gray-200">
                      ₼{item.value.toLocaleString()}
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
        </div>

        {/* Top Expenses */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700">
          <h3 className="font-semibold text-slate-800 dark:text-white mb-4">{t.reports.topCategories}</h3>
          {categoryStats.length > 0 ? (
            <div className="space-y-4">
              {categoryStats.slice(0, 5).map((cat, index) => {
                const info = getCategoryInfo(cat.category as any)
                return (
                  <div key={cat.category} className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${info.color}20` }}
                    >
                      <span className="text-lg">{info.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-slate-700 dark:text-gray-200">
                          {currentLanguage === 'az' ? info.nameAz : info.nameEn}
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-white">
                          ₼{cat.total.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: info.color }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-gray-400 w-12 text-right">
                      {cat.percentage.toFixed(0)}%
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 dark:text-gray-500">
              {t.common.noData}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Reports
