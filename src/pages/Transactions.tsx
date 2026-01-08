import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  TrashIcon,
  PencilIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../i18n'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilter,
  selectFilteredTransactions,
  selectTransactionStats,
} from '../store/transactionSlice'
import { CATEGORIES, getCategoryInfo, type TransactionCategory, type TransactionType, type Transaction } from '../types/transaction'
// import { sendNotification } from '../utils/demoNotifications'

const Transactions = () => {
  const { t, currentLanguage } = useLanguage()
  const dispatch = useAppDispatch()
  const transactions = useAppSelector(selectFilteredTransactions)
  const stats = useAppSelector(selectTransactionStats)
  const filter = useAppSelector((state) => state.transactions.filter)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    type: 'expense' as TransactionType,
    category: 'food' as TransactionCategory,
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  })

  const resetForm = () => {
    setFormData({
      type: 'expense',
      category: 'food',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    })
    setEditingTransaction(null)
  }

  const openAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const openEditModal = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setFormData({
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount.toString(),
      description: transaction.description,
      date: transaction.date.split('T')[0],
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.amount || !formData.description) return

    const amount = parseFloat(formData.amount)

    if (editingTransaction) {
      dispatch(updateTransaction({
        id: editingTransaction.id,
        ...formData,
        amount,
        date: new Date(formData.date).toISOString(),
      }))
    } else {
      dispatch(addTransaction({
        ...formData,
        amount,
        date: new Date(formData.date).toISOString(),
      }))
      // Send notification
      // sendNotification('transactionAdded', formData.type, amount)
    }

    setIsModalOpen(false)
    resetForm()
  }

  const handleDelete = (id: string) => {
    dispatch(deleteTransaction(id))
    setDeleteConfirmId(null)
  }

  const incomeCategories = CATEGORIES.filter(c => ['salary', 'investment', 'other'].includes(c.id))
  const expenseCategories = CATEGORIES.filter(c => !['salary', 'investment'].includes(c.id))
  const availableCategories = formData.type === 'income' ? incomeCategories : expenseCategories

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t.transactions.title}</h1>
          <p className="text-slate-500 dark:text-gray-400">{t.transactions.subtitle}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          {t.transactions.newTransaction}
        </motion.button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-2">
            <ArrowTrendingUpIcon className="h-6 w-6" />
            <span className="font-medium">{t.transactions.totalIncome}</span>
          </div>
          <p className="text-3xl font-bold">₼{stats.totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-2">
            <ArrowTrendingDownIcon className="h-6 w-6" />
            <span className="font-medium">{t.transactions.totalExpense}</span>
          </div>
          <p className="text-3xl font-bold">₼{stats.totalExpense.toLocaleString()}</p>
        </div>
        <div className={`bg-gradient-to-br ${stats.balance >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-2xl p-5 text-white`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-medium">{t.transactions.balance}</span>
          </div>
          <p className="text-3xl font-bold">₼{stats.balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card border border-slate-100 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t.transactions.searchPlaceholder}
              value={filter.searchTerm || ''}
              onChange={(e) => dispatch(setFilter({ searchTerm: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-slate-400 dark:text-gray-500" />
            {(['all', 'income', 'expense'] as const).map((type) => (
              <button
                key={type}
                onClick={() => dispatch(setFilter({ type }))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter.type === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'
                }`}
              >
                {type === 'all' ? t.common.all : type === 'income' ? t.transactionTypes.income : t.transactionTypes.expense}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={filter.category || 'all'}
            onChange={(e) => dispatch(setFilter({ category: e.target.value as any }))}
            className="px-4 py-2.5 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          >
            <option value="all">{t.common.all} {t.common.category}</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {currentLanguage === 'az' ? cat.nameAz : cat.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-slate-100 dark:border-gray-700 overflow-hidden">
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-gray-700">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-gray-400">{t.transactions.transaction}</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-gray-400">{t.common.category}</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-gray-400">{t.common.date}</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600 dark:text-gray-400">{t.common.amount}</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600 dark:text-gray-400">{t.common.actions}</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => {
                  const categoryInfo = getCategoryInfo(transaction.category)
                  return (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-slate-50 dark:border-gray-700/50 hover:bg-slate-50/50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              transaction.type === 'income' ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'
                            }`}
                          >
                            <span className="text-lg">{categoryInfo.icon}</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-white">{transaction.description}</p>
                            <p className="text-xs text-slate-400 dark:text-gray-500">
                              {transaction.type === 'income' ? t.transactionTypes.income : t.transactionTypes.expense}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span 
                          className="px-3 py-1 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: `${categoryInfo.color}20`, color: categoryInfo.color }}
                        >
                          {currentLanguage === 'az' ? categoryInfo.nameAz : categoryInfo.nameEn}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleDateString(currentLanguage === 'az' ? 'az-AZ' : 'en-US')}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span
                          className={`font-semibold ${
                            transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}₼{transaction.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(transaction)}
                            className="p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(transaction.id)}
                            className="p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-slate-500 dark:text-gray-400 mb-2">{t.transactions.noTransactions}</p>
            <p className="text-sm text-slate-400 dark:text-gray-500">{t.transactions.addFirst}</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Dialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
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
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-xl font-bold text-slate-800 dark:text-white">
                    {editingTransaction ? t.transactions.editTransaction : t.transactions.newTransaction}
                  </Dialog.Title>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.common.type}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'income', category: 'salary' })}
                        className={`py-3 px-4 rounded-xl font-medium transition-all ${
                          formData.type === 'income'
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {t.transactionTypes.income}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'expense', category: 'food' })}
                        className={`py-3 px-4 rounded-xl font-medium transition-all ${
                          formData.type === 'expense'
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {t.transactionTypes.expense}
                      </button>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.common.category}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as TransactionCategory })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    >
                      {availableCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {currentLanguage === 'az' ? cat.nameAz : cat.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.common.amount}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder={t.transactions.form.enterAmount}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.common.description}
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder={t.transactions.form.enterDescription}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.common.date}
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {t.common.cancel}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                      {editingTransaction ? t.transactions.form.update : t.transactions.form.submit}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
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
                  {t.transactions.deleteTransaction}
                </Dialog.Title>
                <p className="text-slate-500 dark:text-gray-400 mb-6">{t.transactions.deleteConfirm}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {t.common.cancel}
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirmId)}
                    className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
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

export default Transactions
