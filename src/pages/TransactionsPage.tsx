import { useState } from 'react'
import { iconClass } from '../constants/icons'
import type { FinanceData } from '../types/finance'
import { formatCurrency, formatShortDate, formatSignedCurrency } from '../utils/finance'
import { NotificationsPanel } from '../components/NotificationsPanel'
import { SettingsPanel } from '../components/SettingsPanel'
import { DatePickerModal } from '../components/DatePickerModal'
import { EditTransactionModal } from '../components/EditTransactionModal'
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal'

interface TransactionsPageProps {
  data: FinanceData
}

function getTransactionIcon(category: string, type: string) {
  if (type === 'income') {
    return { icon: 'payments', tone: 'bg-emerald-100 text-emerald-700' }
  }

  const normalizedCategory = category.toLowerCase()

  if (normalizedCategory.includes('food') || normalizedCategory.includes('grocery')) {
    return { icon: 'shopping_cart', tone: 'bg-slate-100 text-slate-700' }
  }

  if (normalizedCategory.includes('home') || normalizedCategory.includes('housing') || normalizedCategory.includes('rent')) {
    return { icon: 'home', tone: 'bg-slate-100 text-slate-700' }
  }

  if (normalizedCategory.includes('tech')) {
    return { icon: 'devices', tone: 'bg-slate-100 text-slate-700' }
  }

  if (normalizedCategory.includes('util')) {
    return { icon: 'bolt', tone: 'bg-slate-100 text-slate-700' }
  }

  if (normalizedCategory.includes('entertain')) {
    return { icon: 'restaurant', tone: 'bg-slate-100 text-slate-700' }
  }

  return { icon: 'receipt_long', tone: 'bg-slate-100 text-slate-700' }
}

export function TransactionsPage({ data }: TransactionsPageProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<FinanceData['transactionHistory'][0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{ start: string; end: string } | null>(null)
  const [viewMode, setViewMode] = useState<'history' | 'export'>('history')
  const [searchQuery, setSearchQuery] = useState('')
  const [transactions, setTransactions] = useState(data.transactionHistory)

  const activeRole = data.roles.find((role) => role.active)?.name ?? data.meta.role
  const isViewer = activeRole.toLowerCase().includes('viewer')
  const itemsPerPage = 10

  const filteredTransactions = transactions.filter((tx) => {
    if (selectedCategory && tx.category !== selectedCategory) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const match = [tx.description, tx.merchant, tx.category, tx.account].some((field) => field.toLowerCase().includes(query))
      if (!match) return false
    }
    if (dateRange) {
      const txDate = new Date(tx.date)
      const startDate = new Date(dateRange.start)
      const endDate = new Date(dateRange.end)
      if (txDate < startDate || txDate > endDate) return false
    }
    return true
  })

  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  return (
    <>
      <main className="ml-16 min-h-screen">
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-white/70 px-8 shadow-sm backdrop-blur-xl">
          <div className="flex flex-1 items-center">
            <div className="relative w-full max-w-md">
              <span className={iconClass + ' absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant'}>
                search
              </span>
              <input
                className="w-full rounded-full border-none bg-surface-container-low py-2 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-primary/20"
                placeholder={data.ui.search.transactions}
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value)
                  setCurrentPage(1)
                }}
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 rounded-full bg-surface-container-high px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-on-surface">{activeRole}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span className={iconClass}>notifications</span>
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span className={iconClass}>settings</span>
              </button>
            </div>

            <div className="flex items-center space-x-3 border-l border-outline-variant/20 pl-4">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-bold text-on-surface">{data.profile.fullName}</p>
                <p className="text-[10px] text-on-surface-variant">{data.profile.title}</p>
              </div>
              <img alt="User avatar" className="h-8 w-8 rounded-full bg-surface-container-highest" src={data.profile.avatar} />
            </div>
          </div>
        </header>

        <div className="space-y-10 p-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-4xl font-extrabold tracking-tight text-on-surface">{data.transactions.pageTitle}</h2>
              <p className="font-medium text-on-surface-variant">{data.transactions.subtitle}</p>
            </div>

            <div className="flex space-x-3">
              <div className="flex rounded-full bg-surface-container-low p-1">
                <button
                  onClick={() => setViewMode('history')}
                  className={`rounded-full px-6 py-2 text-xs font-bold transition-all ${viewMode === 'history' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {data.transactions.historyLabel}
                </button>
                <button
                  onClick={() => setViewMode('export')}
                  className={`rounded-full px-6 py-2 text-xs font-medium transition-all ${viewMode === 'export' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {data.transactions.exportLabel}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 space-y-6 lg:col-span-3">
              <div className="space-y-6 rounded-xl bg-surface-container-low p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface">Refine Ledger</h3>

                <div className="space-y-2">
                  <label className="ml-1 text-[11px] font-bold uppercase text-on-surface-variant">{data.transactions.categoryLabel}</label>
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value || null)
                      setCurrentPage(1)
                    }}
                    className="w-full rounded-xl border-none bg-surface-container-lowest py-3 text-sm focus:ring-1 focus:ring-primary/20"
                  >
                    <option value="">All Categories</option>
                    {data.transactions.categoryOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-[11px] font-bold uppercase text-on-surface-variant">Date Range</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowDatePicker(true)}
                      className="flex w-full items-center justify-between rounded-xl bg-surface-container-lowest px-4 py-3 text-left text-sm hover:bg-surface-container"
                    >
                      <span className="truncate">{dateRange ? `${dateRange.start} to ${dateRange.end}` : data.transactions.dateRangeLabel}</span>
                      <span className={iconClass + ' flex-shrink-0 text-sm'}>calendar_today</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setDateRange(null)
                      setSearchQuery('')
                      setCurrentPage(1)
                    }}
                    className="w-full rounded-xl border border-outline-variant/30 py-3 text-xs font-bold transition-all hover:bg-white"
                  >
                    {data.transactions.resetLabel}
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-9">
              <div className="overflow-hidden rounded-xl border border-outline-variant/5 bg-surface-container-lowest shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low/50">
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Date</th>
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Description</th>
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Category</th>
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Type</th>
                      <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Amount</th>
                      <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {paginatedTransactions.length === 0 && (
                      <tr>
                        <td className="px-6 py-10 text-center text-sm text-on-surface-variant" colSpan={6}>
                          No transactions match your current filters.
                        </td>
                      </tr>
                    )}
                    {paginatedTransactions.map((transaction, index) => {
                      const display = getTransactionIcon(transaction.category, transaction.type)

                      return (
                        <tr key={transaction.id} className={`group transition-colors hover:bg-surface-container-low ${index % 2 === 1 ? 'bg-surface-container-low/20' : ''}`}>
                          <td className="px-6 py-5 text-sm text-on-surface-variant">{formatShortDate(transaction.date)}</td>
                          <td className="px-6 py-5">
                            <div className="flex items-center space-x-3">
                              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${display.tone}`}>
                                <span className={iconClass + ' text-sm'}>{display.icon}</span>
                              </div>
                              <div>
                                <span className="text-sm font-bold text-on-surface">{transaction.description}</span>
                                <p className="text-[10px] text-on-surface-variant">{transaction.merchant}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm italic text-on-surface-variant">{transaction.category}</td>
                          <td className="px-6 py-5">
                            <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${transaction.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {transaction.type === 'income' ? 'Income' : 'Expense'}
                            </span>
                          </td>
                          <td className={`px-6 py-5 text-right font-bold ${transaction.type === 'income' ? 'text-emerald-700' : 'text-on-surface'}`}>
                            {formatSignedCurrency(transaction.amount, transaction.currency)}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex justify-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                              <button
                                onClick={() => {
                                  if (isViewer) return
                                  setSelectedTransaction(transaction)
                                  setShowEditModal(true)
                                }}
                                className={`rounded-lg p-2 text-on-surface-variant transition-all ${isViewer ? 'cursor-not-allowed opacity-40' : 'hover:bg-white hover:text-primary'}`}
                                type="button"
                              >
                                <span className={iconClass + ' text-sm'}>edit</span>
                              </button>
                              <button
                                onClick={() => {
                                  if (isViewer) return
                                  setSelectedTransaction(transaction)
                                  setShowDeleteModal(true)
                                }}
                                className={`rounded-lg p-2 text-on-surface-variant transition-all ${isViewer ? 'cursor-not-allowed opacity-40' : 'hover:bg-white hover:text-error'}`}
                                type="button"
                              >
                                <span className={iconClass + ' text-sm'}>delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                <div className="flex items-center justify-between border-t border-surface-container bg-surface-container-low/30 px-6 py-4">
                  <span className="text-xs font-medium text-on-surface-variant">
                    Showing <span className="font-bold text-on-surface">{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of {filteredTransactions.length} transactions
                  </span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant transition-all disabled:opacity-30"
                    >
                      <span className={iconClass + ' text-sm'}>chevron_left</span>
                    </button>
                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${currentPage === page ? 'bg-primary text-white' : 'border border-outline-variant/30 text-on-surface hover:bg-white'}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant transition-all disabled:opacity-30"
                    >
                      <span className={iconClass + ' text-sm'}>chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {data.transactions.summaryCards.map((card) => (
              <div key={card.title} className="flex flex-col justify-between rounded-xl bg-surface-container-low p-8">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{card.title}</p>
                <h4 className="text-3xl font-black text-on-surface">{formatCurrency(card.amount, data.meta.currency)}</h4>
                <div className="mt-4 flex items-center space-x-2">
                  <span className={`flex items-center rounded-full px-2 py-0.5 text-xs font-bold ${card.trendType === 'up' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    <span className={iconClass + ' mr-1 text-xs'}>{card.trendType === 'up' ? 'trending_up' : 'trending_down'}</span>
                    {card.trendPercent}%
                  </span>
                  <span className="text-[10px] text-on-surface-variant">{card.trendLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`fixed bottom-10 right-10 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-container to-primary text-white shadow-2xl duration-200 ${isViewer ? 'cursor-not-allowed opacity-40' : 'hover:scale-110 active:scale-95'}`}
          onClick={() => {
            if (isViewer) return

            const today = new Date().toISOString().slice(0, 10)
            const draftTransaction: FinanceData['transactionHistory'][0] = {
              id: `tx-${Date.now()}`,
              date: today,
              postedAt: new Date().toISOString(),
              description: 'New Transaction',
              merchant: 'Manual Entry',
              category: data.transactions.categoryOptions[1] ?? 'General',
              type: 'expense',
              amount: 0,
              currency: data.meta.currency,
              status: 'Draft',
              account: 'Primary Checking',
            }

            setTransactions((previous) => [draftTransaction, ...previous])
            setSelectedTransaction(draftTransaction)
            setShowEditModal(true)
          }}
          type="button"
        >
          <span className={iconClass + ' text-3xl'} style={{ fontVariationSettings: "'FILL' 1" }}>
            add
          </span>
        </button>
      </main>

      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <DatePickerModal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={(start, end) => setDateRange({ start, end })}
        currentStart={dateRange?.start}
        currentEnd={dateRange?.end}
      />
      <EditTransactionModal
        key={selectedTransaction?.id ?? 'new-transaction'}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedTransaction(null)
        }}
        transaction={selectedTransaction ?? undefined}
        onSave={(updatedTransaction) => {
          setTransactions((previous) => previous.map((transaction) => (transaction.id === updatedTransaction.id ? updatedTransaction : transaction)))
          setShowEditModal(false)
          setSelectedTransaction(null)
        }}
        categoryOptions={data.transactions.categoryOptions}
      />
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedTransaction(null)
        }}
        transaction={selectedTransaction ?? undefined}
        onConfirm={(transactionId) => {
          setTransactions((previous) => previous.filter((transaction) => transaction.id !== transactionId))
          setShowDeleteModal(false)
          setSelectedTransaction(null)
        }}
      />
    </>
  )
}
