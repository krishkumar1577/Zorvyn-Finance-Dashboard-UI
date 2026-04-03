import { iconClass } from '../constants/icons'

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  if (!isOpen) return null

  const notifications = [
    {
      id: '1',
      title: 'Budget Alert',
      message: 'You have exceeded your dining budget by ₹3,750',
      time: '2 hours ago',
      icon: 'warning',
      read: false,
    },
    {
      id: '2',
      title: 'Transaction Confirmed',
      message: 'Your payment to Acme Corp has been processed',
      time: '5 hours ago',
      icon: 'check_circle',
      read: true,
    },
    {
      id: '3',
      title: 'Investment Milestone',
      message: 'Your portfolio has reached ₹41,50,000',
      time: '1 day ago',
      icon: 'trending_up',
      read: true,
    },
  ]

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />

      <div className="fixed right-8 top-20 z-50 w-96 rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-6 py-4">
          <h3 className="text-lg font-bold text-on-surface">Notifications</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-low"
          >
            <span className={iconClass}>close</span>
          </button>
        </div>

        <div className="max-h-96 space-y-1 overflow-y-auto">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`border-b border-outline-variant/5 px-6 py-4 transition-colors hover:bg-surface-container-lowest ${notif.read ? '' : 'bg-primary/5'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${notif.read ? 'bg-surface-container-low' : 'bg-primary-container/20'}`}>
                  <span className={iconClass + ` text-sm ${notif.read ? 'text-on-surface-variant' : 'text-primary-container'}`}>{notif.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">{notif.title}</p>
                  <p className="text-xs text-on-surface-variant">{notif.message}</p>
                  <span className="text-xs font-medium text-on-surface-variant/70">{notif.time}</span>
                </div>
                {!notif.read && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-outline-variant/10 px-6 py-3">
          <button className="w-full text-center text-sm font-semibold text-primary hover:underline">View All Notifications</button>
        </div>
      </div>
    </>
  )
}
