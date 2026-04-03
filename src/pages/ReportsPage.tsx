import { useState } from 'react'
import { iconClass } from '../constants/icons'
import type { FinanceData } from '../types/finance'
import { formatCurrency, formatPercent } from '../utils/finance'

interface ReportsPageProps {
  data: FinanceData
}

export function ReportsPage({ data }: ReportsPageProps) {
  const [openMenuPeriod, setOpenMenuPeriod] = useState<string | null>(null)
  const [isManageAccessOpen, setIsManageAccessOpen] = useState(false)
  const [selectedArchive, setSelectedArchive] = useState<FinanceData['reports']['monthlyArchives'][0] | null>(null)
  const [isTimelineOpen, setIsTimelineOpen] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [memberRoles, setMemberRoles] = useState<Record<string, string>>({
    'Member 1': 'Editor',
    'Member 2': 'Viewer',
    'Member 3': 'Analyst',
  })
  const activeRole = data.roles.find((role) => role.active)?.name ?? data.meta.role
  const secondaryRole = data.roles.find((role) => !role.active)?.name ?? 'Viewer'

  const downloadFile = (fileName: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = fileName
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const handleExportJson = () => {
    const payload = JSON.stringify(data.reports, null, 2)
    downloadFile('zorvyne-ui-report.json', payload, 'application/json')
    setFeedbackMessage('JSON report downloaded.')
  }

  const handleExportCsv = () => {
    const rows = [
      ['Period', 'Status', 'Net Cashflow', 'Compliance'],
      ...data.reports.monthlyArchives.map((archive) => [archive.period, archive.status, String(archive.netCashflow), archive.compliance]),
    ]
    const payload = rows.map((row) => row.join(',')).join('\n')
    downloadFile('zorvyne-ui-report.csv', payload, 'text/csv;charset=utf-8;')
    setFeedbackMessage('CSV report exported.')
  }

  return (
    <main className="ml-16 min-h-screen">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-white/70 px-8 shadow-sm backdrop-blur-xl">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <span className={iconClass + ' absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant'}>search</span>
            <input
              className="w-64 rounded-full border-none bg-surface-container-low py-1.5 pl-10 pr-4 text-sm font-body focus:ring-2 focus:ring-primary-container"
              placeholder={data.ui.search.reports}
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center rounded-full bg-surface-container-high p-1">
            <button className="rounded-full bg-surface-container-lowest px-4 py-1 text-xs font-bold text-on-surface shadow-sm">
              {activeRole}
            </button>
            <button className="px-4 py-1 text-xs font-medium text-on-surface-variant transition-colors hover:text-on-surface">
              {secondaryRole}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
              <span className={iconClass + ' text-on-surface-variant'}>notifications</span>
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
              <span className={iconClass + ' text-on-surface-variant'}>settings</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 border-l border-outline-variant/20 pl-4">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-bold text-on-surface">{data.profile.fullName}</p>
              <p className="text-[10px] text-on-surface-variant">{data.profile.title}</p>
            </div>
            <img alt="User profile" className="h-8 w-8 rounded-full border border-outline-variant/20" src={data.profile.avatar} />
          </div>
        </div>
      </header>

      <main className="min-h-screen px-12 py-12">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-widest text-on-tertiary-container">{data.reports.subtitle}</p>
              <h2 className="text-6xl font-extrabold tracking-tighter text-on-surface">{data.reports.pageTitle}</h2>
            </div>
            <div className="flex space-x-3">
              <button
                className="flex items-center space-x-2 rounded-xl bg-surface-container-lowest px-6 py-3 font-semibold text-on-surface ring-1 ring-outline-variant/10 transition-colors hover:bg-surface-container"
                onClick={handleExportJson}
                type="button"
              >
                <span className={iconClass}>download</span>
                <span>{data.reports.actions.downloadJson}</span>
              </button>
              <button
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-br from-primary-container to-primary px-6 py-3 font-semibold text-on-primary shadow-lg transition-opacity hover:opacity-90"
                onClick={handleExportCsv}
                type="button"
              >
                <span className={iconClass}>file_download</span>
                <span>{data.reports.actions.exportCsv}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="relative col-span-12 min-h-[400px] overflow-hidden rounded-[2rem] bg-surface-container-lowest p-10 shadow-[8px_24px_24px_rgba(11,28,48,0.04)] ring-1 ring-outline-variant/10 lg:col-span-8">
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-on-surface-variant">Financial Health Score</h3>
                    <p className="text-body-md text-on-surface-variant/60">Based on fiscal performance metrics</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-bold text-emerald-700">
                    {formatPercent(data.reports.quarterChange)} vs Last Quarter
                  </span>
                </div>

                <div className="mt-8 flex items-baseline space-x-4">
                  <span className="text-8xl font-black tracking-tighter text-on-surface">{data.reports.financialHealthScore}</span>
                  <span className="text-2xl font-bold text-on-surface-variant/40">/100</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-surface-container-low to-transparent opacity-50">
                <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                  <path d="M0 150 Q 100 130, 200 160 T 400 120 T 600 140 T 800 80 L 800 200 L 0 200 Z" fill="rgba(57, 128, 244, 0.08)" />
                  <path d="M0 150 Q 100 130, 200 160 T 400 120 T 600 140 T 800 80" fill="none" stroke="#3980f4" strokeLinecap="round" strokeWidth="3" />
                </svg>
              </div>

              <div className="relative z-10 mt-12 flex space-x-12">
                <div>
                  <p className="text-label-md text-on-surface-variant">Total Assets</p>
                  <p className="text-2xl font-bold text-on-surface">{formatCurrency(data.reports.assets, data.meta.currency)}</p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant">Net Savings</p>
                  <p className="text-2xl font-bold text-on-surface">{formatCurrency(data.reports.netSavings, data.meta.currency)}</p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant">Risk Index</p>
                  <p className="text-2xl font-bold text-on-surface">{data.reports.riskIndex}</p>
                </div>
              </div>
            </div>

            <div className="col-span-12 flex flex-col space-y-6 lg:col-span-4">
              <div className="flex flex-1 flex-col justify-center rounded-[2rem] border border-transparent bg-surface-container-low p-8">
                <span className={iconClass + ' mb-4 text-4xl text-emerald-600'}>trending_up</span>
                <h4 className="font-medium text-on-surface-variant">Projected Yearly ROI</h4>
                <p className="mt-1 text-4xl font-extrabold text-on-surface">{formatPercent(data.reports.projectedYearlyROI)}</p>
              </div>

              <div className="flex flex-1 flex-col justify-center rounded-[2rem] bg-primary-container p-8 text-on-primary-container">
                <span className={iconClass + ' mb-4 text-4xl text-on-primary'}>account_balance_wallet</span>
                <h4 className="font-medium opacity-80">Liquid Capital</h4>
                <p className="mt-1 text-4xl font-extrabold text-on-primary">{formatCurrency(data.summary.safeToSpend, data.meta.currency)}</p>
              </div>
            </div>

            <div className="col-span-12 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-bold text-on-surface">Monthly Archival Logs</h3>
                <div className="flex items-center space-x-2 text-on-surface-variant">
                  <span className={iconClass + ' text-sm'}>filter_list</span>
                  <span className="text-sm font-medium">Filter by Year</span>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] bg-surface-container-low/50">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">
                      <th className="px-10 py-6">Period</th>
                      <th className="px-10 py-6">Status</th>
                      <th className="px-10 py-6">Net Cashflow</th>
                      <th className="px-10 py-6">Compliance</th>
                      <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium text-on-surface">
                    {data.reports.monthlyArchives.map((archive, index) => (
                      <tr key={archive.period} className={`${index % 2 === 1 ? 'bg-surface-container-low' : ''} transition-colors hover:bg-surface-container-highest/30`}>
                        <td className="px-10 py-7">{archive.period}</td>
                        <td className="px-10 py-7">
                          <span className="flex items-center space-x-2">
                            <span className={`h-2 w-2 rounded-full ${archive.status === 'Archived' ? 'bg-slate-300' : 'bg-emerald-500'}`} />
                            <span>{archive.status}</span>
                          </span>
                        </td>
                        <td className={`px-10 py-7 font-bold ${archive.netCashflow >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {formatCurrency(archive.netCashflow, data.meta.currency)}
                        </td>
                        <td className="px-10 py-7">{archive.compliance}</td>
                        <td className="relative px-10 py-7 text-right">
                          <button
                            className="rounded-full p-2 hover:bg-surface-container"
                            onClick={() => setSelectedArchive(archive)}
                            type="button"
                          >
                            <span className={iconClass + ' text-on-surface-variant'}>visibility</span>
                          </button>
                          <button
                            className="ml-2 rounded-full p-2 hover:bg-surface-container"
                            onClick={() => setOpenMenuPeriod(openMenuPeriod === archive.period ? null : archive.period)}
                            type="button"
                          >
                            <span className={iconClass + ' text-on-surface-variant'}>more_vert</span>
                          </button>

                          {openMenuPeriod === archive.period && (
                            <div className="absolute right-14 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-lg">
                              <button
                                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-on-surface hover:bg-surface-container-low"
                                onClick={() => {
                                  downloadFile(`archive-${archive.period.replace(/\s+/g, '-').toLowerCase()}.json`, JSON.stringify(archive, null, 2), 'application/json')
                                  setOpenMenuPeriod(null)
                                }}
                                type="button"
                              >
                                <span className={iconClass + ' text-base'}>download</span>
                                Download Snapshot
                              </button>
                              <button
                                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-on-surface hover:bg-surface-container-low"
                                onClick={() => {
                                  navigator.clipboard.writeText(`Report snapshot: ${archive.period} (${archive.compliance})`).catch(() => undefined)
                                  setFeedbackMessage(`Share link copied for ${archive.period}.`)
                                  setOpenMenuPeriod(null)
                                }}
                                type="button"
                              >
                                <span className={iconClass + ' text-base'}>share</span>
                                Share Report
                              </button>
                              <button
                                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-on-surface hover:bg-surface-container-low"
                                onClick={() => {
                                  setSelectedArchive(archive)
                                  setIsTimelineOpen(true)
                                  setOpenMenuPeriod(null)
                                }}
                                type="button"
                              >
                                <span className={iconClass + ' text-base'}>history</span>
                                View Timeline
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-span-12 w-full rounded-[2rem] border border-outline-variant/10 bg-surface-container-highest/50 p-6 lg:p-8">
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[4rem_minmax(24rem,1fr)_auto] lg:items-center lg:gap-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm lg:h-16 lg:w-16">
                  <span className={iconClass + ' text-2xl text-on-primary-fixed-variant lg:text-3xl'}>group</span>
                </div>

                <div className="min-w-0 pt-1 lg:pt-0">
                  <h4 className="text-lg font-bold text-on-surface lg:text-xl">{data.reports.sharedAccess.title}</h4>
                  <p className="mt-1 max-w-none text-xs leading-relaxed text-on-surface-variant/70 lg:text-sm">{data.reports.sharedAccess.description}</p>
                </div>

                <div className="flex shrink-0 items-center space-x-3 whitespace-nowrap lg:justify-end lg:space-x-4">
                  <div className="flex -space-x-2">
                    {data.reports.sharedAccess.avatars.map((avatar, index) => (
                      <img key={avatar} alt={`User ${index + 1}`} className="h-9 w-9 rounded-full border-2 border-surface lg:h-10 lg:w-10" src={avatar} />
                    ))}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface bg-white text-xs font-bold text-on-surface-variant lg:h-10 lg:w-10">
                      +{data.reports.sharedAccess.extraCount}
                    </div>
                  </div>
                  <button
                    className="text-sm font-bold text-on-tertiary-container hover:underline"
                    onClick={() => setIsManageAccessOpen(true)}
                    type="button"
                  >
                    {data.reports.sharedAccess.actionLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isManageAccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label="Close manage access dialog"
            className="absolute inset-0 bg-slate-900/35 backdrop-blur-sm"
            onClick={() => setIsManageAccessOpen(false)}
            type="button"
          />

          <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-surface-container-lowest p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-on-surface">Manage Shared Access</h3>
                <p className="mt-1 text-sm text-on-surface-variant">Control roles and permissions for report collaborators.</p>
              </div>
              <button
                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                onClick={() => setIsManageAccessOpen(false)}
                type="button"
              >
                <span className={iconClass}>close</span>
              </button>
            </div>

            <div className="space-y-3">
              {Object.entries(memberRoles).map(([member, role], index) => (
                <div key={member} className="flex items-center justify-between rounded-2xl bg-surface-container-low p-4">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-on-surface-variant">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{member}</p>
                      <p className="text-xs text-on-surface-variant">Active collaborator</p>
                    </div>
                  </div>

                  <select
                    className="rounded-lg border border-outline-variant/30 bg-white px-3 py-1.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/20"
                    onChange={(event) => setMemberRoles((prev) => ({ ...prev, [member]: event.target.value }))}
                    value={role}
                  >
                    <option>Viewer</option>
                    <option>Analyst</option>
                    <option>Editor</option>
                    <option>Admin</option>
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-xl border border-outline-variant/40 px-5 py-2 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container"
                onClick={() => setIsManageAccessOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                onClick={() => {
                  setFeedbackMessage('Access permissions saved.')
                  setIsManageAccessOpen(false)
                }}
                type="button"
              >
                Save Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedArchive && !isTimelineOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="absolute inset-0 bg-slate-900/35 backdrop-blur-sm" onClick={() => setSelectedArchive(null)} type="button" />
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-xl font-bold text-on-surface">Archive Preview</h4>
              <button className="rounded-full p-2 hover:bg-surface-container" onClick={() => setSelectedArchive(null)} type="button">
                <span className={iconClass}>close</span>
              </button>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-on-surface-variant">Period</dt><dd>{selectedArchive.period}</dd></div>
              <div className="flex justify-between"><dt className="text-on-surface-variant">Status</dt><dd>{selectedArchive.status}</dd></div>
              <div className="flex justify-between"><dt className="text-on-surface-variant">Net Cashflow</dt><dd className={selectedArchive.netCashflow >= 0 ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>{formatCurrency(selectedArchive.netCashflow, data.meta.currency)}</dd></div>
              <div className="flex justify-between"><dt className="text-on-surface-variant">Compliance</dt><dd>{selectedArchive.compliance}</dd></div>
            </dl>
          </div>
        </div>
      )}

      {isTimelineOpen && selectedArchive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="absolute inset-0 bg-slate-900/35 backdrop-blur-sm" onClick={() => setIsTimelineOpen(false)} type="button" />
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-xl font-bold text-on-surface">{selectedArchive.period} Timeline</h4>
              <button className="rounded-full p-2 hover:bg-surface-container" onClick={() => setIsTimelineOpen(false)} type="button">
                <span className={iconClass}>close</span>
              </button>
            </div>
            <ul className="space-y-3 text-sm text-on-surface">
              <li className="rounded-xl bg-surface-container-low p-3">Week 1: Monthly statements imported.</li>
              <li className="rounded-xl bg-surface-container-low p-3">Week 2: Compliance checks completed ({selectedArchive.compliance}).</li>
              <li className="rounded-xl bg-surface-container-low p-3">Week 3: Cashflow finalized at {formatCurrency(selectedArchive.netCashflow, data.meta.currency)}.</li>
            </ul>
          </div>
        </div>
      )}

      {feedbackMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-vault-slate px-4 py-2 text-sm font-medium text-white shadow-lg">
          {feedbackMessage}
          <button className="ml-3 text-xs underline" onClick={() => setFeedbackMessage(null)} type="button">dismiss</button>
        </div>
      )}
    </main>
  )
}