import { useState } from 'react'

import { iconClass } from '../constants/icons'
import type { FinanceData } from '../types/finance'

interface EditTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  transaction?: FinanceData['transactionHistory'][0]
  onSave: (transaction: FinanceData['transactionHistory'][0]) => void
  categoryOptions: string[]
}

export function EditTransactionModal({ isOpen, onClose, transaction, onSave, categoryOptions }: EditTransactionModalProps) {
  const [selectedType, setSelectedType] = useState<'expense' | 'income'>(transaction?.type ?? 'expense')

  if (!isOpen || !transaction) return null

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-6 py-4">
          <h3 className="text-lg font-bold text-on-surface">Edit Transaction</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-low"
          >
            <span className={iconClass}>close</span>
          </button>
        </div>

        <div className="space-y-4 px-6 py-6">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase text-on-surface-variant">Description</label>
            <input
              type="text"
              defaultValue={transaction.description}
              className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20"
              id="edit-description"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase text-on-surface-variant">Merchant</label>
            <input
              type="text"
              defaultValue={transaction.merchant}
              className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20"
              id="edit-merchant"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase text-on-surface-variant">Category</label>
            <select
              defaultValue={transaction.category}
              className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20"
              id="edit-category"
            >
              {categoryOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase text-on-surface-variant">Amount</label>
            <input
              type="number"
              defaultValue={Math.abs(transaction.amount)}
              className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20"
              id="edit-amount"
              step="0.01"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase text-on-surface-variant">Type</label>
            <div className="flex gap-2">
              <button
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${selectedType === 'income' ? 'bg-emerald-100 text-emerald-700' : 'border border-outline-variant/30 text-on-surface hover:bg-surface-container-low'}`}
                id="edit-income"
                onClick={() => setSelectedType('income')}
                type="button"
              >
                Income
              </button>
              <button
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${selectedType === 'expense' ? 'bg-red-100 text-red-700' : 'border border-outline-variant/30 text-on-surface hover:bg-surface-container-low'}`}
                id="edit-expense"
                onClick={() => setSelectedType('expense')}
                type="button"
              >
                Expense
              </button>
            </div>
          </div>

          <div className="flex gap-3 border-t border-outline-variant/10 pt-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-outline-variant/30 px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const description = (document.getElementById('edit-description') as HTMLInputElement)?.value || transaction.description
                const merchant = (document.getElementById('edit-merchant') as HTMLInputElement)?.value || transaction.merchant
                const category = (document.getElementById('edit-category') as HTMLSelectElement)?.value || transaction.category
                const amount = parseFloat((document.getElementById('edit-amount') as HTMLInputElement)?.value || '0')

                onSave({
                  ...transaction,
                  description,
                  merchant,
                  category,
                  type: selectedType,
                  amount: selectedType === 'income' ? Math.abs(amount) : -Math.abs(amount),
                })
                onClose()
              }}
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
