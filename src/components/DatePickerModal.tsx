import { iconClass } from '../constants/icons'

interface DatePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (startDate: string, endDate: string) => void
  currentStart?: string
  currentEnd?: string
}

export function DatePickerModal({ isOpen, onClose, onSelect, currentStart = '', currentEnd = '' }: DatePickerModalProps) {
  if (!isOpen) return null

  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
  const lastQuarter = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())

  const getDateString = (date: Date) => date.toISOString().split('T')[0]

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />

      <div className="fixed left-1/2 top-1/2 z-50 w-96 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-6 py-4">
          <h3 className="text-lg font-bold text-on-surface">Select Date Range</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-low"
          >
            <span className={iconClass}>close</span>
          </button>
        </div>

        <div className="space-y-4 px-6 py-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Quick Presets</p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  onSelect(getDateString(lastMonth), getDateString(today))
                  onClose()
                }}
                className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm transition-colors hover:bg-surface-container-low"
              >
                <span>Last 30 Days</span>
                <span className="text-xs text-on-surface-variant">1 month</span>
              </button>
              <button
                onClick={() => {
                  onSelect(getDateString(lastQuarter), getDateString(today))
                  onClose()
                }}
                className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm transition-colors hover:bg-surface-container-low"
              >
                <span>Last 90 Days</span>
                <span className="text-xs text-on-surface-variant">3 months</span>
              </button>
              <button
                onClick={() => {
                  const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
                  onSelect(getDateString(yearAgo), getDateString(today))
                  onClose()
                }}
                className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm transition-colors hover:bg-surface-container-low"
              >
                <span>Last Year</span>
                <span className="text-xs text-on-surface-variant">12 months</span>
              </button>
            </div>
          </div>

          <div className="border-t border-outline-variant/10 pt-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Custom Range</p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-on-surface-variant">Start Date</label>
                <input
                  type="date"
                  defaultValue={currentStart}
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20"
                  id="start-date"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-on-surface-variant">End Date</label>
                <input
                  type="date"
                  defaultValue={currentEnd}
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20"
                  id="end-date"
                />
              </div>
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
                const start = (document.getElementById('start-date') as HTMLInputElement)?.value
                const end = (document.getElementById('end-date') as HTMLInputElement)?.value
                if (start && end) {
                  onSelect(start, end)
                  onClose()
                }
              }}
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
