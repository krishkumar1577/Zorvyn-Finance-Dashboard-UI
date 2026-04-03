import { useState } from 'react'
import { iconClass } from '../constants/icons'
import type { FinanceData } from '../types/finance'
import { NotificationsPanel } from './NotificationsPanel'
import { SettingsPanel } from './SettingsPanel'

interface HeaderProps {
  data: FinanceData
}

export function Header({ data }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const activeRole = data.roles.find((role) => role.active)?.name ?? data.meta.role
  const secondaryRole = data.roles.find((role) => !role.active)?.name ?? 'Viewer'

  return (
    <>
      <header className="fixed left-16 right-0 top-0 z-40 flex h-16 items-center justify-between bg-white/70 px-8 shadow-sm backdrop-blur-xl">
      <div className="group flex w-96 items-center rounded-full bg-surface-container-low px-4 py-2 focus-within:ring-2 focus-within:ring-primary/20">
        <span className={iconClass + ' mr-3 text-on-surface-variant'}>search</span>
        <input
          className="w-full border-none bg-transparent text-sm font-body focus:ring-0"
          placeholder={data.ui.search.global}
          type="text"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center rounded-full bg-surface-container-high p-1">
          <button className="rounded-full bg-surface-container-lowest px-4 py-1.5 text-xs font-bold text-on-surface shadow-sm">
            {activeRole}
          </button>
          <button className="rounded-full px-4 py-1.5 text-xs font-medium text-on-surface-variant transition-all hover:bg-white/50">
            {secondaryRole}
          </button>
        </div>

        <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-6">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900"
          >
            <span className={iconClass}>notifications</span>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900"
          >
            <span className={iconClass}>settings</span>
          </button>
        </div>

        <div className="flex items-center gap-3 border-l border-outline-variant/30 pl-6">
          <div className="text-right">
            <p className="text-xs font-bold text-on-surface">{data.profile.fullName}</p>
            <p className="text-[10px] text-on-surface-variant">{data.profile.title}</p>
          </div>
          <img alt="User avatar" className="h-8 w-8 rounded-full border border-outline-variant/20" src={data.profile.avatar} />
        </div>
      </div>
      </header>

      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  )
}
