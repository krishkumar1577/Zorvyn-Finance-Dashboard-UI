import { iconClass } from '../constants/icons'

export function Sidebar() {
  return (
    <nav className="fixed left-0 top-0 h-full w-64 flex flex-col space-y-8 bg-slate-50 py-8 px-6 dark:bg-slate-950">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container">
          <span className={iconClass + ' text-surface'} style={{ fontVariationSettings: "'FILL' 1" }}>
            account_balance
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Zorvyne</h1>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Dashboard</p>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="space-y-1">
        <a className="flex items-center gap-4 rounded-lg border-r-4 border-slate-900 bg-slate-200/30 px-4 py-3 font-bold text-slate-900 transition-colors hover:bg-slate-200/50 dark:border-slate-50 dark:bg-slate-800/30 dark:text-slate-50 dark:hover:bg-slate-800/50">
          <span className={iconClass}>dashboard</span>
          <span className="font-label">Dashboard</span>
        </a>
        <a className="flex items-center gap-4 rounded-lg px-4 py-3 font-medium text-slate-500 transition-colors hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50">
          <span className={iconClass}>receipt_long</span>
          <span className="font-label">Transactions</span>
        </a>
        <a className="flex items-center gap-4 rounded-lg px-4 py-3 font-medium text-slate-500 transition-colors hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50">
          <span className={iconClass}>insights</span>
          <span className="font-label">Insights</span>
        </a>
        <a className="flex items-center gap-4 rounded-lg px-4 py-3 font-medium text-slate-500 transition-colors hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50">
          <span className={iconClass}>assessment</span>
          <span className="font-label">Reports</span>
        </a>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-6 py-4 text-sm font-bold text-white transition-all hover:opacity-90">
          <span className={iconClass}>add</span>
          New Transaction
        </button>
        <div className="mt-8 flex items-center gap-3 px-2">
          <img
            alt="User profile"
            className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAcT_48uyNwO2R3yq9n-zPDZU2VpBuWieYeWAbbt0NXVRCly8KXR2wOh2TzxGv_MrIrKU2GEuJzKaldIFXoP5rfDBfingWfe-318l-C6EMgxdMMBsHJB_DS8g_BTGTON-Im0XJHaRSUM5LVs291g5A8gCQxLBFhY04r_XbMnJkZj5gVnUh1pJ9K4aEZla48MSycoGRRuoLjuEpxi24MsnsjNnkYsFx9aAUf1Nhhp6qlhQ7pGyKQgMUq1DW_yi3VLSHx8cBMIhFkDRL"
          />
          <div>
            <p className="text-sm font-bold text-slate-900">Alex Sterling</p>
            <p className="text-xs text-slate-500">Premium Account</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
