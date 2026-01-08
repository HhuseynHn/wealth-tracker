import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import {
  PlusIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts'
import { useLanguage } from '../i18n'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useTheme } from '../hooks'
import { useGetMarketDataQuery } from '../store/cryptoApi'
import {
  addCryptoAsset,
  deleteCryptoAsset,
  selectCryptoAssets,
} from '../store/cryptoSlice'
import { POPULAR_CRYPTOS } from '../types/crypto'

const Investments = () => {
  const { t } = useLanguage()
  const { chartColors, resolvedTheme } = useTheme()
  const dispatch = useAppDispatch()
  const cryptoAssets = useAppSelector(selectCryptoAssets)
  const { data: marketData, isLoading, refetch } = useGetMarketDataQuery({ limit: 10 })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: '',
    purchasePrice: '',
    purchaseDate: new Date().toISOString().split('T')[0],
  })

  // Get current prices from market data
  const getPriceData = (symbol: string) => {
    if (!marketData) return { price: 0, change: 0 }
    const coin = marketData.find((c) => c.symbol.toUpperCase() === symbol.toUpperCase())
    return {
      price: coin?.current_price || 0,
      change: coin?.price_change_percentage_24h || 0,
    }
  }

  // Calculate portfolio stats
  const portfolioStats = cryptoAssets.reduce(
    (acc, asset) => {
      const { price } = getPriceData(asset.symbol)
      const invested = asset.amount * asset.purchasePrice
      const currentValue = asset.amount * price
      const profitLoss = currentValue - invested

      return {
        totalInvested: acc.totalInvested + invested,
        currentValue: acc.currentValue + currentValue,
        profitLoss: acc.profitLoss + profitLoss,
      }
    },
    { totalInvested: 0, currentValue: 0, profitLoss: 0 }
  )

  const profitLossPercentage =
    portfolioStats.totalInvested > 0
      ? (portfolioStats.profitLoss / portfolioStats.totalInvested) * 100
      : 0

  // Pie chart data
  const pieData = cryptoAssets.map((asset) => {
    const { price } = getPriceData(asset.symbol)
    return {
      name: asset.symbol,
      value: asset.amount * price,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }
  })

  const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.amount || !formData.purchasePrice) return

    dispatch(
      addCryptoAsset({
        symbol: formData.symbol,
        name: formData.name,
        amount: parseFloat(formData.amount),
        purchasePrice: parseFloat(formData.purchasePrice),
        purchaseDate: formData.purchaseDate,
      })
    )

    setIsModalOpen(false)
    setFormData({
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: '',
      purchasePrice: '',
      purchaseDate: new Date().toISOString().split('T')[0],
    })
  }

  const handleDelete = (id: string) => {
    dispatch(deleteCryptoAsset(id))
    setDeleteConfirmId(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t.crypto.title}</h1>
          <p className="text-slate-500 dark:text-gray-400">{t.crypto.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            className="px-4 py-2.5 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors"
          >
            {isLoading ? t.crypto.refreshing : '🔄'}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            {t.crypto.addCrypto}
          </motion.button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{t.crypto.totalInvested}</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            ${portfolioStats.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{t.crypto.currentValue}</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            ${portfolioStats.currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{t.crypto.profitLoss}</p>
          <div className="flex items-center gap-2">
            <p
              className={`text-2xl font-bold ${
                portfolioStats.profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {portfolioStats.profitLoss >= 0 ? '+' : ''}$
              {portfolioStats.profitLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            <span
              className={`text-sm font-medium ${
                profitLossPercentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              ({profitLossPercentage >= 0 ? '+' : ''}
              {profitLossPercentage.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700">
          <h3 className="font-semibold text-slate-800 dark:text-white mb-4">{t.investments.portfolioDistribution}</h3>
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
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                      formatter={(value: number | undefined) => [
                        `$${(value ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                        '',
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {pieData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm font-medium text-slate-600 dark:text-gray-400">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-800 dark:text-white">
                      ${item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center text-slate-400 dark:text-gray-500">
              {t.crypto.noHoldings}
            </div>
          )}
        </div>

        {/* Holdings */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700">
          <h3 className="font-semibold text-slate-800 dark:text-white mb-4">{t.crypto.holdings}</h3>
          {cryptoAssets.length > 0 ? (
            <div className="space-y-3">
              {cryptoAssets.map((asset, index) => {
                const { price } = getPriceData(asset.symbol)
                const currentValue = asset.amount * price
                const invested = asset.amount * asset.purchasePrice
                const profitLoss = currentValue - invested
                const plPercent = invested > 0 ? (profitLoss / invested) * 100 : 0

                return (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">{asset.name}</p>
                        <p className="text-sm text-slate-500 dark:text-gray-400">
                          {asset.amount} {asset.symbol} @ ${asset.purchasePrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-slate-800 dark:text-white">
                          ${currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </p>
                        <div
                          className={`flex items-center justify-end gap-1 text-sm ${
                            plPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {plPercent >= 0 ? (
                            <ArrowTrendingUpIcon className="h-4 w-4" />
                          ) : (
                            <ArrowTrendingDownIcon className="h-4 w-4" />
                          )}
                          {plPercent >= 0 ? '+' : ''}
                          {plPercent.toFixed(2)}%
                        </div>
                      </div>
                      <button
                        onClick={() => setDeleteConfirmId(asset.id)}
                        className="p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-500 dark:text-gray-400 mb-2">{t.crypto.noHoldings}</p>
              <p className="text-sm text-slate-400 dark:text-gray-500">{t.crypto.addFirst}</p>
            </div>
          )}
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-gray-700">
        <h3 className="font-semibold text-slate-800 dark:text-white mb-4">{t.crypto.marketOverview}</h3>
        {isLoading ? (
          <div className="py-12 text-center text-slate-400 dark:text-gray-500">{t.common.loading}</div>
        ) : marketData && marketData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400">#</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400">Coin</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400">
                    {t.crypto.price}
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400">
                    {t.crypto.change24h}
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400">
                    {t.crypto.marketCap}
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-gray-400 hidden lg:table-cell">
                    7D Chart
                  </th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((coin) => (
                  <tr key={coin.id} className="border-b border-slate-50 dark:border-gray-700/50 hover:bg-slate-50/50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4 text-sm text-slate-500 dark:text-gray-400">{coin.market_cap_rank}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">{coin.name}</p>
                          <p className="text-xs text-slate-500 dark:text-gray-400 uppercase">{coin.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-slate-800 dark:text-white">
                      ${coin.current_price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-medium ${
                          coin.price_change_percentage_24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600 dark:text-gray-400">
                      ${(coin.market_cap / 1e9).toFixed(2)}B
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      {coin.sparkline_in_7d && (
                        <div className="w-24 h-10 ml-auto">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={coin.sparkline_in_7d.price.slice(-24).map((p) => ({ v: p }))}>
                              <Area
                                type="monotone"
                                dataKey="v"
                                stroke={coin.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444'}
                                fill={coin.price_change_percentage_24h >= 0 ? '#10b98120' : '#ef444420'}
                                strokeWidth={1.5}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 dark:text-gray-500">{t.common.noData}</div>
        )}
      </div>

      {/* Add Crypto Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-xl font-bold text-slate-800 dark:text-white">
                    {t.crypto.addCrypto}
                  </Dialog.Title>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.crypto.selectCrypto}
                    </label>
                    <select
                      value={formData.symbol}
                      onChange={(e) => {
                        const crypto = POPULAR_CRYPTOS.find((c) => c.symbol === e.target.value)
                        if (crypto) {
                          setFormData({ ...formData, symbol: crypto.symbol, name: crypto.name })
                        }
                      }}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    >
                      {POPULAR_CRYPTOS.map((crypto) => (
                        <option key={crypto.id} value={crypto.symbol}>
                          {crypto.symbol} - {crypto.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.crypto.amount}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder={t.crypto.enterAmount}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.crypto.purchasePrice} (USD)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.purchasePrice}
                      onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                      placeholder={t.crypto.enterPrice}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.crypto.purchaseDate}
                    </label>
                    <input
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600"
                    >
                      {t.common.cancel}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
                    >
                      {t.common.add}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirmId && (
          <Dialog
            open={!!deleteConfirmId}
            onClose={() => setDeleteConfirmId(null)}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <TrashIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <Dialog.Title className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {t.crypto.deleteCrypto}
                </Dialog.Title>
                <p className="text-slate-500 dark:text-gray-400 mb-6">{t.crypto.deleteConfirm}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600"
                  >
                    {t.common.cancel}
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirmId)}
                    className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700"
                  >
                    {t.common.delete}
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Investments
