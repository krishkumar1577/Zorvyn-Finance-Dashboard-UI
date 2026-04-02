import { iconClass } from '../constants/icons'

export function Header() {
  return (
    <header className="fixed left-64 right-0 top-0 z-40 flex h-16 items-center justify-between bg-white/70 px-8 shadow-sm backdrop-blur-xl">
      <div className="group flex w-96 items-center rounded-full bg-surface-container-low px-4 py-2 focus-within:ring-2 focus-within:ring-primary/20">
        <span className={iconClass + ' mr-3 text-on-surface-variant'}>search</span>
        <input
          className="w-full border-none bg-transparent text-sm font-body focus:ring-0"
          placeholder="Search transactions, insights..."
          type="text"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Role Switcher */}
        <div className="flex items-center rounded-full bg-surface-container-high p-1">
          <button className="rounded-full bg-surface-container-lowest px-4 py-1.5 text-xs font-bold text-on-surface shadow-sm">
            Admin
          </button>
          <button className="rounded-full px-4 py-1.5 text-xs font-medium text-on-surface-variant transition-all hover:bg-white/50">
            Viewer
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-6">
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900">
            <span className={iconClass}>notifications</span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900">
            <span className={iconClass}>settings</span>
          </button>
        </div>
      </div>
    </header>
  )
}
