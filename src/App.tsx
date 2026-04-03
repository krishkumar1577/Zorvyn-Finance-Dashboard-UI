import { useEffect, useMemo, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage.tsx'
import { TransactionsPage } from './pages/TransactionsPage'
import { InsightsPage } from './pages/InsightsPage'
import { ReportsPage } from './pages/ReportsPage'
import type { FinanceData } from './types/finance'

type PageType = 'landing' | 'dashboard' | 'transactions' | 'insights' | 'reports'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing')
  const [data, setData] = useState<FinanceData | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [activeRole, setActiveRole] = useState<string>('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      try {
        const response = await fetch('/data.json', { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Unable to load finance data (${response.status})`)
        }

        const payload = (await response.json()) as FinanceData
        setData(payload)
        setActiveRole(payload.roles.find((role) => role.active)?.name ?? payload.meta.role)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setLoadError(error instanceof Error ? error.message : 'Unable to load finance data')
      }
    }

    void loadData()

    return () => controller.abort()
  }, [])

  const dataWithRole = useMemo(() => {
    if (!data) return null

    if (!activeRole) return data

    return {
      ...data,
      meta: {
        ...data.meta,
        role: activeRole,
      },
      roles: data.roles.map((role) => ({
        ...role,
        active: role.name === activeRole,
      })),
    }
  }, [data, activeRole]) as FinanceData | null

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-6 text-center text-on-surface">
        <div className="max-w-md space-y-3 rounded-3xl bg-surface-container-lowest p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Unable to load dashboard data</h1>
          <p className="text-sm text-on-surface-variant">{loadError}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-6 text-on-surface">
        <div className="rounded-3xl bg-surface-container-lowest px-6 py-4 shadow-sm">Loading finance data...</div>
      </div>
    )
  }

  return (
    <div
      className={
        currentPage === 'landing'
          ? 'min-h-screen overflow-x-hidden bg-vault-background font-manrope text-vault-slate'
          : 'bg-surface text-on-surface'
      }
    >
      {currentPage === 'landing' ? (
        <LandingPage data={dataWithRole!} onDemoClick={() => setCurrentPage('dashboard')} />
      ) : currentPage === 'dashboard' ? (
        <>
          <Sidebar data={dataWithRole!} selectedView="dashboard" onNavigate={setCurrentPage} onRoleChange={setActiveRole} />
          <Header data={dataWithRole!} />
          <DashboardPage data={dataWithRole!} />
        </>
      ) : currentPage === 'transactions' ? (
        <>
          <Sidebar data={dataWithRole!} selectedView="transactions" onNavigate={setCurrentPage} onRoleChange={setActiveRole} />
          <TransactionsPage data={dataWithRole!} />
        </>
      ) : currentPage === 'insights' ? (
        <>
          <Sidebar data={dataWithRole!} selectedView="insights" onNavigate={setCurrentPage} onRoleChange={setActiveRole} />
          <InsightsPage data={dataWithRole!} />
        </>
      ) : (
        <>
          <Sidebar data={dataWithRole!} selectedView="reports" onNavigate={setCurrentPage} onRoleChange={setActiveRole} />
          <ReportsPage data={dataWithRole!} />
        </>
      )}
    </div>
  )
}

export default App
