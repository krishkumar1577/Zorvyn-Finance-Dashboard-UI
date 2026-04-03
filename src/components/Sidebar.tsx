import { useState } from 'react'

import { iconClass } from '../constants/icons'
import type { FinanceData } from '../types/finance'

type SidebarView = 'dashboard' | 'transactions' | 'insights' | 'reports'

interface SidebarProps {
  data: FinanceData
  selectedView: SidebarView
  onNavigate: (view: SidebarView) => void
  onRoleChange: (role: string) => void
}

export function Sidebar({ data, selectedView, onNavigate, onRoleChange }: SidebarProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col items-center border-r border-white/40 bg-vault-background/95 py-4 shadow-[0_0_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <button
        aria-label="Go to dashboard"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-vault-slate shadow-lg shadow-vault-slate/10"
        onClick={() => onNavigate('dashboard')}
        type="button"
      >
        <span className={iconClass + ' text-white'} style={{ fontVariationSettings: "'FILL' 1" }}>
          account_balance
        </span>
      </button>

      <div className="mt-8 flex flex-col items-center gap-4">
        <SidebarIcon icon="dashboard" active={selectedView === 'dashboard'} tooltip={data.navigation.dashboard} onClick={() => onNavigate('dashboard')} />
        <SidebarIcon
          icon="receipt_long"
          active={selectedView === 'transactions'}
          tooltip={data.navigation.transactions}
          onClick={() => onNavigate('transactions')}
        />
        <SidebarIcon icon="insights" active={selectedView === 'insights'} tooltip={data.navigation.insights} onClick={() => onNavigate('insights')} />
        <SidebarIcon icon="assessment" active={selectedView === 'reports'} tooltip={data.navigation.reports} onClick={() => onNavigate('reports')} />
      </div>

      <div className="mt-auto flex flex-col items-center gap-4 pb-4">
        <SidebarIcon icon="add_circle" tooltip={data.navigation.newTransaction} accent onClick={() => onNavigate('transactions')} />
        <SidebarIcon icon="settings" tooltip={data.navigation.settings} onClick={() => onNavigate('reports')} />

        <div className="group relative">
          <button
            aria-label="Open user profile menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/70 text-vault-slate shadow-sm transition-all duration-200 hover:scale-105 hover:bg-white"
            onClick={() => setIsProfileMenuOpen((value) => !value)}
            type="button"
          >
            <span className={iconClass}>account_circle</span>
          </button>

          <div className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-white/95 px-2 py-1 text-xs font-medium text-vault-slate opacity-0 shadow-sm transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
            {data.profile.displayName}
          </div>

          {isProfileMenuOpen && (
            <>
              <button
                aria-label="Close profile menu"
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setIsProfileMenuOpen(false)}
                type="button"
              />

              <div className="absolute bottom-0 left-full z-50 ml-3 w-56 overflow-hidden rounded-2xl border border-white/40 bg-white/95 shadow-xl backdrop-blur">
                <div className="border-b border-surface-container p-3">
                  <p className="text-sm font-semibold text-vault-slate">{data.profile.fullName}</p>
                  <p className="text-xs text-on-surface-variant">{data.profile.title}</p>
                </div>

                <div className="border-b border-surface-container p-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Role</p>
                  <div className="space-y-1">
                    {data.roles.map((role) => (
                      <button
                        key={role.name}
                        className={`w-full rounded-lg px-2 py-1.5 text-left text-xs font-medium transition-colors ${role.active ? 'bg-vault-slate text-white' : 'text-vault-slate hover:bg-surface-container-low'}`}
                        onClick={() => {
                          onRoleChange(role.name)
                          setIsProfileMenuOpen(false)
                        }}
                        type="button"
                      >
                        {role.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-vault-slate transition-colors hover:bg-surface-container-low"
                  onClick={() => {
                    onNavigate('dashboard')
                    setIsProfileMenuOpen(false)
                  }}
                  type="button"
                >
                  <span className={iconClass + ' text-base'}>person</span>
                  View Profile
                </button>

                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-vault-slate transition-colors hover:bg-surface-container-low"
                  onClick={() => {
                    onNavigate('reports')
                    setIsProfileMenuOpen(false)
                  }}
                  type="button"
                >
                  <span className={iconClass + ' text-base'}>manage_accounts</span>
                  Account Settings
                </button>

                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-rose-700 transition-colors hover:bg-rose-50"
                  onClick={() => setIsProfileMenuOpen(false)}
                  type="button"
                >
                  <span className={iconClass + ' text-base'}>logout</span>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

interface SidebarIconProps {
  icon: string
  active?: boolean
  tooltip?: string
  accent?: boolean
  onClick?: () => void
}

function SidebarIcon({ icon, active = false, tooltip, accent = false, onClick }: SidebarIconProps) {
  return (
    <div className="group relative">
      <button
        aria-label={tooltip ?? icon}
        onClick={onClick}
        type="button"
        className={
          'relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ease-in-out hover:scale-105 ' +
          (active
            ? 'bg-vault-slate text-white shadow-lg shadow-vault-slate/20'
            : accent
              ? 'bg-vault-accent text-white shadow-lg shadow-vault-accent/20'
              : 'border border-white/60 bg-white/70 text-vault-slate shadow-sm hover:bg-white')
        }
      >
        <span className={iconClass}>{icon}</span>
        {active && <div className="absolute -right-2 top-0 h-2 w-2 rounded-full bg-vault-accent" />}
      </button>

      {tooltip && (
        <div className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-white/95 px-2 py-1 text-xs font-medium text-vault-slate opacity-0 shadow-sm transition-all duration-150 ease-out group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
          {tooltip}
        </div>
      )}
    </div>
  )
}
