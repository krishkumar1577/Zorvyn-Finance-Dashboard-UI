import { useEffect, useState } from 'react'

import { iconClass } from '../constants/icons'
import type { FinanceData } from '../types/finance'
import { formatCurrency, formatPercent } from '../utils/finance'

interface InsightsPageProps {
  data: FinanceData
}

export function InsightsPage({ data }: InsightsPageProps) {
  const year = new Date(data.meta.date).getFullYear()
  const [isReady, setIsReady] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isCalloutModalOpen, setIsCalloutModalOpen] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsReady(true))

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <main className="ml-16 min-h-screen">
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-white/70 px-8 shadow-sm backdrop-blur-xl">
        <div className="flex w-96 items-center rounded-full bg-surface-container-low px-4 py-2">
          <span className={iconClass + ' mr-2 text-sm text-on-surface-variant'}>search</span>
          <input className="w-full border-none bg-transparent font-body text-sm focus:ring-0" placeholder={data.ui.search.insights} type="text" />
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
              <span className={iconClass}>notifications</span>
            </button>
            <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
              <span className={iconClass}>settings</span>
            </button>
          </div>
          <div className="h-8 w-px bg-outline-variant/30" />
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-slate-900">{data.meta.role}</span>
            <img alt="User avatar" className="h-8 w-8 rounded-full border border-outline-variant/20" src={data.profile.avatar} />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl space-y-12 p-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-[3.5rem] font-extrabold leading-none tracking-tight text-on-surface">{data.insights.pageTitle}</h2>
            <p className="text-lg text-on-surface-variant">{data.insights.subtitle}</p>
          </div>
          <div className="flex rounded-full bg-surface-container-high p-1">
            <button className="rounded-full bg-surface-container-lowest px-6 py-2 text-sm font-semibold text-on-surface shadow-sm">
              {data.insights.modes.personal}
            </button>
            <button className="rounded-full px-6 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface">
              {data.insights.modes.business}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="group relative col-span-12 min-h-[400px] overflow-hidden rounded-[2rem] bg-surface-container-lowest p-10 lg:col-span-8">
            <div className="relative z-10">
              <div className="mb-8 flex items-center space-x-3">
                <div className="rounded-2xl bg-primary-container/5 p-3">
                  <span className={iconClass + ' text-3xl text-primary-container'}>home_work</span>
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-on-surface-variant">Primary Outflow</span>
              </div>

              <h3 className="mb-6 text-5xl font-black text-on-surface">{data.insights.primaryOutflow.category}</h3>
              <p className="max-w-xl text-xl leading-relaxed text-on-surface-variant">
                {data.insights.primaryOutflow.notes} This accounts for <span className="font-bold text-on-surface">{data.insights.primaryOutflow.shareOfIncome}% of your total monthly income</span>.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex items-center space-x-8">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-on-surface-variant">Monthly Allocation</span>
                <span className="text-3xl font-bold text-on-surface">{formatCurrency(data.insights.primaryOutflow.monthlyAllocation, data.meta.currency)}</span>
              </div>
              <div className="h-10 w-px bg-outline-variant/30" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-on-surface-variant">Variance vs Last Month</span>
                <span className={`text-3xl font-bold ${data.insights.primaryOutflow.varianceVsLastMonth === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {formatPercent(data.insights.primaryOutflow.varianceVsLastMonth)}
                </span>
              </div>
            </div>

            <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-surface-container-low opacity-50 blur-3xl transition-opacity group-hover:opacity-80" />
          </div>

          <div className="chart-reveal col-span-12 flex flex-col rounded-[2rem] bg-surface-container-low p-8 lg:col-span-4">
            <div className="mb-10 flex items-center justify-between">
              <h4 className="text-xl font-bold">Spending Velocity</h4>
              <span className={iconClass + ' text-on-surface-variant'}>more_horiz</span>
            </div>

            <div className="flex flex-1 items-end justify-around space-x-4 pb-4">
              <div className="flex w-full flex-col items-center space-y-4">
                <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-surface-container-high">
                  <div
                    className="chart-tilt absolute bottom-0 w-full rounded-t-xl bg-on-primary-container/40 transition-all duration-700 ease-out"
                    style={{ height: isReady ? '85%' : '0%' }}
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-tighter text-on-surface-variant">Last Month</span>
              </div>

              <div className="flex w-full flex-col items-center space-y-4">
                <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-surface-container-high">
                  <div
                    className="chart-tilt absolute bottom-0 w-full rounded-t-xl bg-primary-container shadow-[0_16px_32px_rgba(11,28,48,0.18)] transition-all duration-700 ease-out delay-100"
                    style={{ height: isReady ? '70%' : '0%' }}
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-tighter text-on-surface">This Month</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-outline-variant/20 pt-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-on-surface">{formatCurrency(data.insights.velocity.thisMonth, data.meta.currency)}</span>
                <span className="text-xs text-on-surface-variant">Current period total</span>
              </div>
              <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">{formatPercent(data.insights.velocity.changePercent)}</div>
            </div>
          </div>

          <div className="col-span-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {data.insights.observations.map((observation) => (
              <div key={observation.title} className="rounded-3xl bg-surface-container-lowest p-8 transition-colors duration-300 hover:bg-surface-container-low">
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${observation.sentiment === 'watch' ? 'bg-rose-100' : observation.sentiment === 'positive' ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                  <span
                    className={iconClass + ` ${observation.sentiment === 'watch' ? 'text-rose-700' : observation.sentiment === 'positive' ? 'text-emerald-700' : 'text-blue-700'}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {observation.sentiment === 'watch' ? 'subscriptions' : observation.sentiment === 'positive' ? 'restaurant' : 'trending_down'}
                  </span>
                </div>
                <h5 className="mb-3 text-lg font-bold">{observation.title}</h5>
                <p className="text-sm leading-relaxed text-on-surface-variant">{observation.description}</p>
              </div>
            ))}
          </div>

          <div className="col-span-12 rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-8 lg:col-span-6">
            <div className="mb-8 flex items-center justify-between">
              <h4 className="text-xl font-bold">Category Distribution</h4>
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="text-sm font-semibold text-primary-container hover:underline"
                type="button"
              >
                View All
              </button>
            </div>

            <div className="space-y-6">
              {data.insights.categoryDistribution.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{item.label}</span>
                    <span>{item.percent}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                    <div className="h-full rounded-full" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 flex flex-col justify-between overflow-hidden rounded-[2rem] bg-primary-container p-8 text-white relative lg:col-span-6">
            <div className="relative z-10">
              <h4 className="mb-4 text-2xl font-bold">{data.insights.callout.title}</h4>
              <p className="max-w-sm text-sm leading-relaxed text-on-primary-container">{data.insights.callout.description}</p>
            </div>
            <div className="relative z-10 mt-8">
              <button
                onClick={() => setIsCalloutModalOpen(true)}
                className="rounded-xl bg-white px-8 py-3 font-bold text-primary-container transition-transform hover:scale-105"
                type="button"
              >
                {data.insights.callout.buttonLabel}
              </button>
            </div>
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-on-primary-container/20 blur-[100px]" />
          </div>
        </div>

        <footer className="flex items-center justify-between border-t border-outline-variant/10 pt-12 text-sm text-on-surface-variant">
          <p>{`© ${year} ${data.ui.footer.legalName}`}</p>
          <div className="flex space-x-6">
            {data.ui.footer.links.map((link) => (
              <a key={link.label} className="transition-colors hover:text-on-surface" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </section>

      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label="Close category distribution modal"
            className="absolute inset-0 bg-slate-900/35 backdrop-blur-sm"
            onClick={() => setIsCategoryModalOpen(false)}
            type="button"
          />

          <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-surface-container-lowest p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-on-surface">Full Category Distribution</h3>
                <p className="mt-1 text-sm text-on-surface-variant">Detailed view of spending share across all categories.</p>
              </div>
              <button
                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                onClick={() => setIsCategoryModalOpen(false)}
                type="button"
              >
                <span className={iconClass}>close</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.insights.categoryDistribution.map((item, index) => (
                <div key={item.label} className="rounded-2xl bg-surface-container-low p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-on-surface">{item.label}</span>
                    <span className="font-bold text-on-surface">{item.percent}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                    <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
                  </div>
                  <p className="mt-2 text-xs text-on-surface-variant">Rank #{index + 1} by share in this period.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isCalloutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label="Close financial coach modal"
            className="absolute inset-0 bg-slate-900/35 backdrop-blur-sm"
            onClick={() => setIsCalloutModalOpen(false)}
            type="button"
          />

          <div className="relative z-10 w-full max-w-xl rounded-3xl bg-surface-container-lowest p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">Action Center</p>
                <h3 className="mt-2 text-2xl font-extrabold text-on-surface">{data.insights.callout.title}</h3>
              </div>
              <button
                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                onClick={() => setIsCalloutModalOpen(false)}
                type="button"
              >
                <span className={iconClass}>close</span>
              </button>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">{data.insights.callout.description}</p>

            <div className="mb-8 space-y-3 rounded-2xl bg-surface-container-low p-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-white">1</span>
                <p className="text-sm text-on-surface">Review your largest spending category trends.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-white">2</span>
                <p className="text-sm text-on-surface">Set a monthly target and alert threshold.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-white">3</span>
                <p className="text-sm text-on-surface">Track weekly progress from the Insights panel.</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="rounded-xl border border-outline-variant/40 px-5 py-2 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container"
                onClick={() => setIsCalloutModalOpen(false)}
                type="button"
              >
                Maybe Later
              </button>
              <button
                className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                onClick={() => setIsCalloutModalOpen(false)}
                type="button"
              >
                Start Now
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}