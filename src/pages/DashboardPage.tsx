import { iconClass } from '../constants/icons'
import { SummaryCard } from '../components/SummaryCard'

export function DashboardPage() {
  return (
    <main className="ml-64 max-w-[1600px] p-10 pt-24">
      {/* Dashboard Header */}
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="font-label mb-1 text-sm font-medium tracking-wide text-on-surface-variant">WELCOME BACK, ALEX</p>
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Portfolio Overview</h2>
        </div>
        <div className="flex items-center rounded-xl bg-surface-container-lowest p-2 shadow-sm">
          <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-on-surface transition-all hover:bg-surface-container-low">
            <span className={iconClass + ' text-lg'}>calendar_today</span>
            Last 6 Months
            <span className={iconClass + ' text-lg'}>expand_more</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <SummaryCard
          icon="wallet"
          iconBg="bg-primary-container"
          title="Total Balance"
          amount="$12,450.25"
          badge="+2.4% vs LY"
          badgeBg="bg-primary/10 text-primary"
          description="Primary Checking Account"
        />
        <SummaryCard
          icon="trending_up"
          iconBg="bg-emerald-500/10"
          title="Total Income"
          amount="$4,200"
          badge="Monthly High"
          badgeBg="bg-emerald-500/10 text-emerald-600"
          description="12% increase from last month"
          descriptionIcon="north_east"
        />
        <SummaryCard
          icon="shopping_cart"
          iconBg="bg-rose-500/10"
          title="Total Expenses"
          amount="$1,750"
          badge="On Track"
          badgeBg="bg-rose-500/10 text-rose-600"
          description="Highest spend: Housing (40%)"
          descriptionIcon="warning"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Balance Trend Chart */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-container-lowest p-10 shadow-sm lg:col-span-3">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h4 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">Balance Trend</h4>
              <p className="mt-1 text-sm text-on-surface-variant">Growth projection for current fiscal period</p>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant/30 transition-all hover:bg-surface-container-low">
              <span className={iconClass + ' text-sm'}>more_horiz</span>
            </button>
          </div>

          <div className="relative h-64 w-full">
            <svg className="h-full w-full" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0b1c30" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0b1c30" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line stroke="#eff4ff" strokeWidth="2" x1="0" x2="1000" y1="250" y2="250" />
              <line stroke="#eff4ff" strokeWidth="1" x1="0" x2="1000" y1="180" y2="180" />
              <line stroke="#eff4ff" strokeWidth="1" x1="0" x2="1000" y1="110" y2="110" />
              <line stroke="#eff4ff" strokeWidth="1" x1="0" x2="1000" y1="40" y2="40" />
              <path d="M0,220 C150,210 250,140 400,160 S600,60 800,80 S1000,30 1000,30 L1000,250 L0,250 Z" fill="url(#chartGradient)" />
              <path d="M0,220 C150,210 250,140 400,160 S600,60 800,80 S1000,30 1000,30" fill="none" stroke="#0b1c30" strokeLinecap="round" strokeWidth="4" />
              <circle cx="400" cy="160" fill="#0b1c30" r="6" stroke="white" strokeWidth="2" />
              <circle cx="800" cy="80" fill="#0b1c30" r="6" stroke="white" strokeWidth="2" />
            </svg>
            <div className="absolute left-[38%] top-16 -translate-x-1/2 transform rounded-xl bg-primary p-3 text-white shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">April 2024</p>
              <p className="text-sm font-bold">$10,120.00</p>
            </div>
          </div>

          <div className="mt-8 flex justify-between px-2">
            {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'].map((month) => (
              <span key={month} className="text-xs font-bold text-on-surface-variant">
                {month}
              </span>
            ))}
          </div>
        </div>

        {/* Spending Breakdown */}
        <div className="flex flex-col rounded-[2.5rem] bg-surface-container-lowest p-10 shadow-sm lg:col-span-2">
          <h4 className="font-headline mb-8 text-2xl font-extrabold tracking-tight text-on-surface">Spending Breakdown</h4>
          <div className="relative mb-8 flex flex-grow items-center justify-center">
            <svg className="h-48 w-48 -rotate-90 transform" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#eff4ff" strokeWidth="12" />
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#0b1c30" strokeDasharray="100.53 251.32" strokeDashoffset="0" strokeWidth="12" />
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#3980f4" strokeDasharray="50.26 251.32" strokeDashoffset="-100.53" strokeWidth="12" />
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#10b981" strokeDasharray="37.7 251.32" strokeDashoffset="-150.79" strokeWidth="12" />
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#f43f5e" strokeDasharray="25.13 251.32" strokeDashoffset="-188.49" strokeWidth="12" />
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#94a3b8" strokeDasharray="37.7 251.32" strokeDashoffset="-213.62" strokeWidth="12" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-on-surface">$1,750</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Total Spent</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { color: '#0b1c30', label: 'Housing', percent: '40%' },
              { color: '#3980f4', label: 'Food', percent: '20%' },
              { color: '#10b981', label: 'Transport', percent: '15%' },
              { color: '#f43f5e', label: 'Entertainment', percent: '10%' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-on-surface">{item.label}</span>
                </div>
                <span className="text-sm font-bold">{item.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-12 rounded-[2.5rem] bg-surface-container-low p-10">
        <div className="mb-8 flex items-center justify-between">
          <h4 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">Recent Transactions</h4>
          <a className="text-sm font-bold text-on-tertiary-container hover:underline">View All History</a>
        </div>
        <div className="space-y-4">
          {[
            {
              name: 'Netflix Subscription',
              category: 'Entertainment • 2 hours ago',
              amount: '-$15.99',
              status: 'Auto-pay',
              image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7KGLE7VYqXsKpxNV-rr0sJtU2Jent_mxfBivg758YIWh7lgDdALIgo0852GBy2KgihYZW5oiG3M388iZhyJLOvIY09ej-ze4fNzI7JF6pjkAgmi2TTf3d7NiW2jBcf5R4PQ1sRtLT3jEeb_93cTGcDKFl_NXJNNRe3Civ7Mi_kmFNM9GAsAD8PHOGGtFrEljHbalKcGwH8EBF-_TAqqDQ7tb008r5yApRVsbE3Pg1vTK6FVCG-cfK0D9JxqTh8ypwSC3M8sLwut0L',
              isImage: true,
            },
            {
              name: 'Corporate Salary',
              category: 'Income • Yesterday',
              amount: '+$3,200.00',
              status: 'Verified',
              icon: 'payments',
              isImage: false,
            },
            {
              name: 'Apple Store Soho',
              category: 'Tech • April 12',
              amount: '-$249.00',
              status: 'Pending',
              image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNM8KcN0SO_0ypKr_S04h9ofDqfMtOaIPPomf8kPl2gG4S5QF1Jboo_m2V3oEWZdjNdizNWFRqT9ouxQs1aKYEc2JqUAzZH57VGBXkxCYoyKZOeOb4mdN0djBzk7oq1au4bcLA8rlDZRY1Zn3y9O3TvDUsdhmAT69YVnmH8rXQRY0imqwZtUcoBHhq1KOL68vAsVpLL9Y4C6_bsP8x2D7FmFGPh9y1TkViD_3CGfZgWRmVLXwTUcZJ5ytgOMJXTs8R3lZMcY3JTZSS',
              isImage: true,
            },
          ].map((transaction, index) => (
            <div key={index} className="flex cursor-pointer items-center justify-between rounded-2xl bg-surface-container-lowest p-5 transition-all hover:scale-[1.01] hover:shadow-md">
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-surface">
                  {transaction.isImage ? (
                    <img alt={transaction.name} className="h-8 w-8 object-contain" src={transaction.image} />
                  ) : (
                    <span className={iconClass + ' text-primary'} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {transaction.icon}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-base font-bold text-on-surface">{transaction.name}</p>
                  <p className="text-xs text-on-surface-variant">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-base font-bold ${transaction.amount.startsWith('-') ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {transaction.amount}
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
