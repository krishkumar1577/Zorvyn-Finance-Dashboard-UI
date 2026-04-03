import { useEffect, useMemo, useState } from 'react'
import { iconClass } from '../constants/icons'
import type { FinanceData } from '../types/finance'
import { formatCurrency, formatPercent } from '../utils/finance'
import { SummaryCard } from '../components/SummaryCard'

interface DashboardPageProps {
  data: FinanceData
}

interface PositionedPoint {
  index: number
  label: string
  date: string
  value: number
  x: number
  y: number
}

function buildLinePath(points: PositionedPoint[]) {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

function buildAreaPath(points: PositionedPoint[], baselineY: number) {
  if (points.length === 0) {
    return ''
  }

  const linePath = buildLinePath(points)
  const lastPoint = points[points.length - 1]
  const firstPoint = points[0]

  return `${linePath} L ${lastPoint.x} ${baselineY} L ${firstPoint.x} ${baselineY} Z`
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

function buildDonutSlicePath(startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) {
  const centerX = 50
  const centerY = 50
  const outerStart = polarToCartesian(centerX, centerY, outerRadius, endAngle)
  const outerEnd = polarToCartesian(centerX, centerY, outerRadius, startAngle)
  const innerStart = polarToCartesian(centerX, centerY, innerRadius, startAngle)
  const innerEnd = polarToCartesian(centerX, centerY, innerRadius, endAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    'M',
    outerStart.x,
    outerStart.y,
    'A',
    outerRadius,
    outerRadius,
    0,
    largeArcFlag,
    0,
    outerEnd.x,
    outerEnd.y,
    'L',
    innerStart.x,
    innerStart.y,
    'A',
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    1,
    innerEnd.x,
    innerEnd.y,
    'Z',
  ].join(' ')
}

function buildPositionedPoints(points: FinanceData['dashboard']['balanceTrend']['points']) {
  const width = 1000
  const height = 300
  const paddingX = 60
  const paddingY = 28
  const usableWidth = width - paddingX * 2
  const usableHeight = height - paddingY * 2
  const values = points.map((point) => point.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const range = maxValue - minValue || 1

  return points.map((point, index) => {
    const x = paddingX + (usableWidth * index) / Math.max(points.length - 1, 1)
    const normalizedValue = (point.value - minValue) / range
    const y = height - paddingY - normalizedValue * usableHeight

    return {
      ...point,
      index,
      x,
      y,
    }
  })
}

function buildPositionedSlices(slices: FinanceData['dashboard']['spendingBreakdown']['slices']) {
  let currentAngle = 0

  return slices.map((slice, index) => {
    const startAngle = currentAngle
    const endAngle = currentAngle + (slice.percent / 100) * 360
    currentAngle = endAngle

    return {
      ...slice,
      index,
      path: buildDonutSlicePath(startAngle, endAngle, 40, 25),
    }
  })
}

export function DashboardPage({ data }: DashboardPageProps) {
  const [hoveredPointIndex, setHoveredPointIndex] = useState(data.dashboard.balanceTrend.points.length - 1)
  const [hoveredSliceIndex, setHoveredSliceIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsReady(true))

    return () => cancelAnimationFrame(frame)
  }, [])

  const linePoints = useMemo(() => buildPositionedPoints(data.dashboard.balanceTrend.points), [data.dashboard.balanceTrend.points])
  const linePath = useMemo(() => buildLinePath(linePoints), [linePoints])
  const areaPath = useMemo(() => buildAreaPath(linePoints, 250), [linePoints])
  const activePoint = linePoints[hoveredPointIndex] ?? linePoints[linePoints.length - 1]
  const slices = useMemo(() => buildPositionedSlices(data.dashboard.spendingBreakdown.slices), [data.dashboard.spendingBreakdown.slices])
  const activeSlice = slices[hoveredSliceIndex] ?? slices[0]
  const previousPoint = hoveredPointIndex > 0 ? linePoints[hoveredPointIndex - 1] : undefined
  const changeSincePrevious = previousPoint ? ((activePoint.value - previousPoint.value) / previousPoint.value) * 100 : 0

  return (
    <main className="ml-16 max-w-[1600px] p-10 pt-24">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="font-label mb-1 text-sm font-medium tracking-wide text-on-surface-variant">
            {data.dashboard.welcomeLabel}, {data.profile.displayName.toUpperCase()}
          </p>
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">{data.dashboard.title}</h2>
        </div>
        <div className="flex items-center rounded-xl bg-surface-container-lowest p-2 shadow-sm">
          <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-on-surface transition-all hover:bg-surface-container-low">
            <span className={iconClass + ' text-lg'}>calendar_today</span>
            {data.dashboard.periodLabel}
            <span className={iconClass + ' text-lg'}>expand_more</span>
          </button>
        </div>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {data.cards.map((card, index) => (
          <SummaryCard
            key={card.title}
            icon={card.icon}
            iconBg={index === 0 ? 'bg-primary-container' : index === 1 ? 'bg-emerald-500/10' : 'bg-rose-500/10'}
            title={card.title}
            amount={formatCurrency(card.amount, data.meta.currency)}
            badge={card.badge}
            badgeBg={index === 0 ? 'bg-primary/10 text-primary' : index === 1 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}
            description={card.description}
            descriptionIcon={index === 1 ? 'north_east' : index === 2 ? 'warning' : undefined}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="chart-reveal relative overflow-hidden rounded-[2.5rem] bg-surface-container-lowest p-10 shadow-sm lg:col-span-3">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h4 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">{data.dashboard.balanceTrend.title}</h4>
              <p className="mt-1 text-sm text-on-surface-variant">{data.dashboard.balanceTrend.subtitle}</p>
            </div>
            <div className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-semibold text-on-surface-variant">Hover the points</div>
          </div>

          <div className="relative h-64 w-full">
            <svg className={`chart-reveal chart-pulse h-full w-full ${isReady ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 1000 300" role="img" aria-label="Balance trend line chart">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0b1c30" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#0b1c30" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line stroke="#eff4ff" strokeWidth="2" x1="0" x2="1000" y1="250" y2="250" />
              <line stroke="#eff4ff" strokeWidth="1" x1="0" x2="1000" y1="180" y2="180" />
              <line stroke="#eff4ff" strokeWidth="1" x1="0" x2="1000" y1="110" y2="110" />
              <line stroke="#eff4ff" strokeWidth="1" x1="0" x2="1000" y1="40" y2="40" />
              <path className="transition-opacity duration-500 ease-out" d={areaPath} fill="url(#chartGradient)" opacity={isReady ? 1 : 0} />
              <path
                className="transition-[stroke-dashoffset,opacity] duration-700 ease-out"
                d={linePath}
                fill="none"
                stroke="#0b1c30"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                strokeDasharray="1000"
                strokeDashoffset={isReady ? '0' : '1000'}
                opacity={isReady ? 1 : 0}
              />

              {linePoints.map((point) => (
                <g key={point.label}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    className="chart-tilt cursor-pointer transition-all duration-300 ease-out"
                    fill={point.index === hoveredPointIndex ? '#f25221' : '#0b1c30'}
                    r={point.index === hoveredPointIndex ? 8 : 6}
                    stroke="white"
                    strokeWidth="2"
                    onPointerEnter={() => setHoveredPointIndex(point.index)}
                    onFocus={() => setHoveredPointIndex(point.index)}
                    tabIndex={0}
                  />
                  <circle cx={point.x} cy={point.y} fill="transparent" r="28" onPointerEnter={() => setHoveredPointIndex(point.index)} />
                </g>
              ))}
            </svg>

            {activePoint && (
              <div
                className="pointer-events-none absolute rounded-xl bg-primary/95 p-3 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out"
                style={{ left: `${(activePoint.x / 1000) * 100}%`, top: `${(activePoint.y / 300) * 100}%`, transform: 'translate(-50%, -120%)' }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                  {activePoint.label} · {new Date(activePoint.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <p className="text-sm font-bold">{formatCurrency(activePoint.value, data.meta.currency)}</p>
                <p className="text-[10px] opacity-80">
                  {hoveredPointIndex === 0 ? 'Starting point' : `${formatPercent(changeSincePrevious)} vs previous month`}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between px-2">
            {data.dashboard.balanceTrend.months.map((month) => (
              <button
                key={month}
                className={`text-xs font-bold transition-colors ${activePoint?.label === month ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
                onPointerEnter={() => {
                  const nextIndex = linePoints.findIndex((point) => point.label === month)
                  if (nextIndex >= 0) {
                    setHoveredPointIndex(nextIndex)
                  }
                }}
                onFocus={() => {
                  const nextIndex = linePoints.findIndex((point) => point.label === month)
                  if (nextIndex >= 0) {
                    setHoveredPointIndex(nextIndex)
                  }
                }}
                type="button"
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        <div className="chart-reveal flex flex-col rounded-[2.5rem] bg-surface-container-lowest p-10 shadow-sm lg:col-span-2">
          <h4 className="font-headline mb-8 text-2xl font-extrabold tracking-tight text-on-surface">{data.dashboard.spendingBreakdown.title}</h4>
          <div className="relative mb-8 flex flex-grow items-center justify-center">
            <svg className={`chart-reveal h-52 w-52 -rotate-90 transform ${isReady ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 100 100" role="img" aria-label="Spending breakdown donut chart">
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#eff4ff" strokeWidth="12" />
              {slices.map((slice) => (
                <path
                  key={slice.label}
                  d={slice.path}
                  className="chart-tilt cursor-pointer origin-center transition-all duration-300 ease-out"
                  fill={slice.color}
                  opacity={slice.index === hoveredSliceIndex ? 1 : 0.72}
                  onPointerEnter={() => setHoveredSliceIndex(slice.index)}
                  onFocus={() => setHoveredSliceIndex(slice.index)}
                  tabIndex={0}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">{activeSlice?.label ?? data.dashboard.spendingBreakdown.totalLabel}</span>
              <span className="text-3xl font-black text-on-surface">
                {formatCurrency(activeSlice?.amount ?? data.dashboard.spendingBreakdown.totalSpent, data.meta.currency)}
              </span>
              <span className="text-xs font-semibold text-on-surface-variant">
                {activeSlice ? `${activeSlice.percent}% of total` : data.dashboard.spendingBreakdown.totalLabel}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {data.dashboard.spendingBreakdown.categories.map((item, index) => (
              <button
                key={item.label}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left transition-all duration-300 ease-out ${index === hoveredSliceIndex ? 'bg-surface-container-low shadow-sm' : 'hover:bg-surface-container-low/60'}`}
                onPointerEnter={() => setHoveredSliceIndex(index)}
                onFocus={() => setHoveredSliceIndex(index)}
                type="button"
              >
                <span className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-on-surface">{item.label}</span>
                </span>
                <span className="text-sm font-bold text-on-surface-variant">{item.percent}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-[2.5rem] bg-surface-container-low p-10">
        <div className="mb-8 flex items-center justify-between">
          <h4 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">Recent Transactions</h4>
          <a className="text-sm font-bold text-on-tertiary-container hover:underline">View All History</a>
        </div>
        <div className="space-y-4">
          {data.dashboard.recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex cursor-pointer items-center justify-between rounded-2xl bg-surface-container-lowest p-5 transition-all hover:scale-[1.01] hover:shadow-md">
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-surface">
                  {transaction.displayType === 'image' && transaction.image ? (
                    <img alt={transaction.name} className="h-8 w-8 object-contain" src={transaction.image} />
                  ) : (
                    <span className={iconClass + ' text-primary'} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {transaction.icon}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-base font-bold text-on-surface">{transaction.name}</p>
                  <p className="text-xs text-on-surface-variant">{transaction.categoryLabel}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-base font-bold ${transaction.amountLabel.startsWith('-') ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {transaction.amountLabel}
                </p>
                <p className={`text-xs font-medium ${transaction.status === 'Verified' ? 'font-bold uppercase tracking-tighter text-emerald-600' : 'text-on-surface-variant'}`}>
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
