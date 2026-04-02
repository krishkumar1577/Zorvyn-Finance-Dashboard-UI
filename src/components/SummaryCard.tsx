import { iconClass } from '../constants/icons'

interface SummaryCardProps {
  icon: string
  iconBg: string
  title: string
  amount: string
  badge: string
  badgeBg: string
  description: string
  descriptionIcon?: string
}

export function SummaryCard({
  icon,
  iconBg,
  title,
  amount,
  badge,
  badgeBg,
  description,
  descriptionIcon,
}: SummaryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] bg-surface-container-lowest p-8 shadow-sm">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-all duration-700 group-hover:bg-primary/10"></div>
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-2xl ${iconBg} p-3`}>
          <span className={iconClass} style={{ fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeBg}`}>{badge}</span>
      </div>
      <p className="font-label text-sm font-medium text-on-surface-variant">{title}</p>
      <h3 className="mt-1 text-4xl font-extrabold tracking-tight text-on-surface">{amount}</h3>
      <div className="mt-6 flex items-center gap-2 text-xs text-on-surface-variant">
        {descriptionIcon && <span className={iconClass + ' text-sm'}>{descriptionIcon}</span>}
        <span>{description}</span>
      </div>
    </div>
  )
}
