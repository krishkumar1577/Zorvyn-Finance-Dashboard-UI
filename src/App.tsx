import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage'

type PageType = 'landing' | 'dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing')

  return (
    <div
      className={
        currentPage === 'landing'
          ? 'min-h-screen overflow-x-hidden bg-vault-background font-manrope text-vault-slate'
          : 'bg-surface text-on-surface'
      }
    >
      {currentPage === 'dashboard' ? (
        <>
          <Sidebar />
          <Header />
          <DashboardPage />
        </>
      ) : (
        <LandingPage onDemoClick={() => setCurrentPage('dashboard')} />
      )}
    </div>
  )
}

export default App
