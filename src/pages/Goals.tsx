import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import {
  PlusIcon,
  FlagIcon,
  CheckCircleIcon,
  TrashIcon,
  PencilIcon,
  XMarkIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../i18n'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addGoal,
  updateGoal,
  deleteGoal,
  addContribution,
  selectAllGoals,
  selectGoalsStats,
} from '../store/goalSlice'
import {
  GOAL_CATEGORIES,
  getGoalCategoryInfo,
  calculateGoalProgress,
  GoalCategory,
  FinancialGoal,
} from '../types/goal'

const Goals = () => {
  const { t, currentLanguage } = useLanguage()
  const dispatch = useAppDispatch()
  const goals = useAppSelector(selectAllGoals)
  const stats = useAppSelector(selectGoalsStats)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<FinancialGoal | null>(null)
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: '',
    category: 'other' as GoalCategory,
  })

  const [contributionAmount, setContributionAmount] = useState('')
  const [contributionNote, setContributionNote] = useState('')

  const resetForm = () => {
    setFormData({
      title: '',
      targetAmount: '',
      currentAmount: '0',
      deadline: '',
      category: 'other',
    })
    setEditingGoal(null)
  }

  const openAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const openEditModal = (goal: FinancialGoal) => {
    setEditingGoal(goal)
    setFormData({
      title: goal.title,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      deadline: goal.deadline.split('T')[0],
      category: goal.category,
    })
    setIsModalOpen(true)
  }

  const openContributionModal = (goalId: string) => {
    setSelectedGoalId(goalId)
    setContributionAmount('')
    setContributionNote('')
    setIsContributionModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.targetAmount || !formData.deadline) return

    if (editingGoal) {
      dispatch(
        updateGoal({
          id: editingGoal.id,
          title: formData.title,
          targetAmount: parseFloat(formData.targetAmount),
          deadline: new Date(formData.deadline).toISOString(),
          category: formData.category,
        })
      )
    } else {
      dispatch(
        addGoal({
          title: formData.title,
          targetAmount: parseFloat(formData.targetAmount),
          currentAmount: parseFloat(formData.currentAmount) || 0,
          deadline: new Date(formData.deadline).toISOString(),
          category: formData.category,
        })
      )
    }

    setIsModalOpen(false)
    resetForm()
  }

  const handleAddContribution = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGoalId || !contributionAmount) return

    dispatch(
      addContribution({
        goalId: selectedGoalId,
        amount: parseFloat(contributionAmount),
        note: contributionNote || undefined,
      })
    )

    setIsContributionModalOpen(false)
    setContributionAmount('')
    setContributionNote('')
    setSelectedGoalId(null)
  }

  const handleDelete = (id: string) => {
    dispatch(deleteGoal(id))
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
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t.goals.title}</h1>
          <p className="text-slate-500 dark:text-gray-400">{t.goals.subtitle}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          {t.goals.newGoal}
        </motion.button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{t.goals.totalSaved}</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">₼{stats.totalSaved.toLocaleString()}</p>
          <p className="text-sm text-slate-500 dark:text-gray-400">/ ₼{stats.totalTarget.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{t.goals.activeGoals}</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.activeCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{t.goals.completed}</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completedCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-slate-100 dark:border-gray-700">
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{t.goals.percentCompleted}</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.overallProgress.toFixed(0)}%</p>
        </div>
      </div>

      {/* Goals Grid */}
      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => {
            const progress = calculateGoalProgress(goal)
            const categoryInfo = getGoalCategoryInfo(goal.category)

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border ${
                  progress.isCompleted
                    ? 'border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-900/10'
                    : progress.isOverdue
                    ? 'border-red-200 dark:border-red-900 bg-red-50/30 dark:bg-red-900/10'
                    : 'border-slate-100 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${categoryInfo.color}20` }}
                    >
                      {progress.isCompleted ? (
                        <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                      ) : (
                        categoryInfo.icon
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">{goal.title}</h3>
                      <span className="text-sm text-slate-500 dark:text-gray-400">
                        {currentLanguage === 'az' ? categoryInfo.nameAz : categoryInfo.nameEn}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {progress.isCompleted ? (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-lg">
                        {t.goals.completedStatus}
                      </span>
                    ) : progress.isOverdue ? (
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-medium rounded-lg">
                        {t.goals.overdue}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-500 dark:text-gray-400">
                        {progress.daysLeft} {t.goals.daysLeft}
                      </span>
                    )}
                    <button
                      onClick={() => openEditModal(goal)}
                      className="p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(goal.id)}
                      className="p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-gray-300 font-medium">
                      ₼{goal.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-slate-500 dark:text-gray-400">₼{goal.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: progress.isCompleted
                          ? '#10b981'
                          : progress.isOverdue
                          ? '#ef4444'
                          : categoryInfo.color,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                      {progress.percentage.toFixed(0)}% {t.goals.percentCompleted}
                    </p>
                    {!progress.isCompleted && progress.daysLeft > 0 && (
                      <p className="text-sm text-slate-500 dark:text-gray-400">
                        {t.goals.dailyNeeded}: ₼{progress.dailySavingsNeeded.toFixed(0)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {!progress.isCompleted && (
                  <button
                    onClick={() => openContributionModal(goal.id)}
                    className="w-full py-2.5 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-200 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <BanknotesIcon className="h-4 w-4" />
                    {t.goals.addMoney}
                  </button>
                )}

                {progress.isCompleted && (
                  <div className="text-center py-2 text-green-600 dark:text-green-400 font-medium">
                    {t.goals.congratulations}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-card border border-slate-100 dark:border-gray-700 text-center">
          <FlagIcon className="h-12 w-12 text-slate-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-gray-400 mb-2">{t.goals.noGoals}</p>
          <p className="text-sm text-slate-400 dark:text-gray-500">{t.goals.createFirst}</p>
        </div>
      )}

      {/* Add/Edit Goal Modal */}
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
                    {editingGoal ? t.goals.editGoal : t.goals.newGoal}
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
                      {t.goals.goalName}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.goals.selectCategory}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as GoalCategory })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    >
                      {GOAL_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {currentLanguage === 'az' ? cat.nameAz : cat.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                        {t.goals.targetAmount}
                      </label>
                      <input
                        type="number"
                        value={formData.targetAmount}
                        onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        required
                      />
                    </div>
                    {!editingGoal && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                          {t.goals.currentAmount}
                        </label>
                        <input
                          type="number"
                          value={formData.currentAmount}
                          onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.goals.deadline}
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
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
                      {editingGoal ? t.common.save : t.common.add}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Add Contribution Modal */}
      <AnimatePresence>
        {isContributionModalOpen && (
          <Dialog
            open={isContributionModalOpen}
            onClose={() => setIsContributionModalOpen(false)}
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
                className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-xl font-bold text-slate-800 dark:text-white">
                    {t.goals.addContribution}
                  </Dialog.Title>
                  <button
                    onClick={() => setIsContributionModalOpen(false)}
                    className="p-2 rounded-lg text-slate-400 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleAddContribution} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.goals.contributionAmount}
                    </label>
                    <input
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      {t.goals.contributionNote}
                    </label>
                    <input
                      type="text"
                      value={contributionNote}
                      onChange={(e) => setContributionNote(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsContributionModalOpen(false)}
                      className="flex-1 py-3 px-4 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-gray-600"
                    >
                      {t.common.cancel}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700"
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
                  {t.goals.deleteGoal}
                </Dialog.Title>
                <p className="text-slate-500 dark:text-gray-400 mb-6">{t.goals.deleteConfirm}</p>
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

export default Goals
