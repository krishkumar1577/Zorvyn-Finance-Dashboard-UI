import { iconClass } from '../constants/icons'
import type { FinanceData } from '../types/finance'
import { formatSignedCurrency } from '../utils/finance'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  transaction?: FinanceData['transactionHistory'][0]
  onConfirm: (transactionId: string) => void
}

export function DeleteConfirmationModal({ isOpen, onClose, transaction, onConfirm }: DeleteConfirmationModalProps) {
  if (!isOpen || !transaction) return null

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl">
        <div className="flex flex-col items-center px-6 py-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <span className={iconClass + ' text-3xl text-red-700'}>warning</span>
          </div>

          <h3 className="mb-2 text-lg font-bold text-on-surface">Delete Transaction?</h3>

          <p className="mb-6 text-sm text-on-surface-variant">
            You're about to delete this transaction. This action cannot be undone.
          </p>

          <div className="mb-6 w-full rounded-lg bg-surface-container-lowest p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface-variant">{transaction.description}</span>
              <span className={`text-sm font-bold ${transaction.type === 'income' ? 'text-emerald-700' : 'text-red-700'}`}>
                {formatSignedCurrency(transaction.amount, transaction.currency)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span>{transaction.merchant}</span>
              <span>{transaction.category}</span>
            </div>
          </div>

          <div className="flex w-full gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-outline-variant/30 px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(transaction.id)
                onClose()
              }}
              className="flex-1 rounded-lg bg-error px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
