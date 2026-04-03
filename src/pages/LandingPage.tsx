import { iconClass } from '../constants/icons'
import type { FinanceData } from '../types/finance'
import { formatCurrency } from '../utils/finance'

interface LandingPageProps {
  data: FinanceData
  onDemoClick: () => void
}

export function LandingPage({ data, onDemoClick }: LandingPageProps) {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-24 pt-12">
      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px 0 rgba(15, 23, 42, 0.05);
        }
      `}</style>

      <svg
        className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full"
        fill="none"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100 120H130" stroke="#0F172A" strokeWidth="1" />
        <path d="M1070 200V150H1100" stroke="#0F172A" strokeWidth="1" />
        <path d="M400 650C400 650 500 650 530 650C580 650 580 500 630 500C680 500 680 690 730 690H850" stroke="#0F172A" strokeOpacity="0.2" strokeWidth="1" />
      </svg>

      <div className="relative z-10 grid grid-cols-12 items-start gap-12">
        <section className="col-span-12 pt-8 lg:col-span-5" data-purpose="hero-content">
          <div className="mb-8 flex items-center space-x-3">
            <div className="h-px w-10 bg-vault-slate" />
            <div className="flex items-center space-x-2 rounded-full border border-white/30 bg-white/40 px-4 py-2">
              <span className={iconClass + ' text-sm'}>trending_up</span>
              <span className="text-sm font-medium">
                {data.landing.eyebrow.split('free trials')[0]}
                <span className="font-bold underline">free trials</span>
              </span>
            </div>
          </div>

          <h1 className="mb-8 text-7xl font-extrabold leading-[1.05] tracking-tight">
            {data.landing.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mb-10 max-w-md text-lg leading-relaxed text-vault-slate/70">{data.landing.description}</p>

          <div className="mb-16 flex items-center space-x-8">
            <button onClick={onDemoClick} className="rounded-full bg-black px-10 py-5 text-lg font-bold text-white shadow-lg shadow-black/10 transition-colors hover:bg-vault-slate">
              {data.landing.primaryCta}
            </button>
            <button onClick={onDemoClick} className="group flex items-center space-x-3 text-lg font-bold">
              <span className="flex items-center justify-center rounded-full bg-white p-3 shadow-sm transition-transform group-hover:scale-110">
                <span className={iconClass + ' text-black'}>play_arrow</span>
              </span>
              <span className="underline underline-offset-4">{data.landing.demoCta}</span>
            </button>
          </div>

          <div className="relative w-full max-w-sm">
            <div className="rounded-[40px] border border-white/20 bg-vault-card/60 p-8">
              <h3 className="mb-1 text-4xl font-bold">{data.landing.summaryTitle}</h3>
              <p className="text-sm text-vault-slate/60">{data.landing.summaryDescription}</p>
            </div>
            <div className="glass-panel absolute -bottom-6 -right-6 w-56 rounded-3xl p-5 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <span className={iconClass + ' rounded-full bg-black p-1 text-sm text-white'}>ads_click</span>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-black" />
                  <div className="h-2 w-2 rounded-full bg-black/20" />
                </div>
              </div>
              <svg className="h-8 w-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                <path d="M0 15 Q 10 5, 20 12 T 40 10 T 60 15 T 80 8 T 100 12" fill="none" stroke="black" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </section>

        <section className="relative col-span-12 h-[780px] lg:col-span-7" data-purpose="visual-dashboard">
          <div className="absolute inset-0 rounded-[60px] border border-white/20 bg-gradient-to-br from-white/10 to-transparent p-8 shadow-inner">
            <div className="absolute -top-12 left-1/2 z-40 -translate-x-1/2">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-vault-accent shadow-2xl shadow-vault-accent/30">
                <span className={iconClass + ' text-5xl font-bold text-black transform rotate-45'}>arrow_downward</span>
              </div>
            </div>

            <div className="grid h-full grid-cols-2 content-start gap-6 pt-12">
              <div className="glass-panel col-span-2 flex flex-col justify-between rounded-[40px] p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-vault-slate/50">{data.landing.previewTitle}</h4>
                    <p className="text-2xl font-bold">{formatCurrency(data.landing.previewAmount, data.meta.currency)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-700">{data.landing.previewDelta}</span>
                    <span className={iconClass + ' text-vault-slate/40'}>more_horiz</span>
                  </div>
                </div>
                <div className="flex h-32 items-end justify-between gap-3">
                  <div className="h-[40%] w-full rounded-t-xl bg-vault-slate opacity-20" />
                  <div className="h-[65%] w-full rounded-t-xl bg-vault-slate opacity-40" />
                  <div className="h-[30%] w-full rounded-t-xl bg-vault-slate opacity-10" />
                  <div className="h-[85%] w-full rounded-t-xl bg-vault-slate opacity-60" />
                  <div className="h-[50%] w-full rounded-t-xl bg-vault-slate opacity-30" />
                  <div className="h-[95%] w-full rounded-t-xl bg-vault-accent" />
                  <div className="h-[45%] w-full rounded-t-xl bg-vault-slate opacity-20" />
                  <div className="h-[70%] w-full rounded-t-xl bg-vault-slate opacity-50" />
                </div>
              </div>

              <div className="glass-panel flex flex-col items-center justify-center rounded-[40px] p-8 text-center">
                <div className="relative mb-2">
                  <h4 className="text-5xl font-extrabold">{Math.round(data.summary.totalBalance / 10000)} k</h4>
                  <div className="absolute -right-4 -top-2">
                    <span className={iconClass + ' scale-75 text-vault-accent'}>star_rate</span>
                  </div>
                </div>
                <p className="border-t border-vault-slate/20 px-4 pt-2 text-sm font-medium uppercase tracking-widest text-vault-slate/60">
                  Active Downloads
                </p>
              </div>

              <div className="rounded-[40px] border border-white/40 bg-vault-card/40 p-8 backdrop-blur-md">
                <div className="mb-6 grid grid-cols-4 gap-2 opacity-80">
                  <div className="h-3 w-3 rounded-sm bg-black/80" />
                  <div className="h-3 w-3 rounded-sm border border-black/20 bg-transparent" />
                  <div className="h-3 w-3 rounded-sm bg-black/60" />
                  <div className="h-3 w-3 rounded-sm bg-black/80" />
                </div>
                <h4 className="mb-2 text-xl font-bold leading-tight">Take control</h4>
                <p className="text-xs font-medium text-vault-slate/60">Automated expense classification across all connected vaults.</p>
              </div>

              <div className="glass-panel col-span-2 flex items-center space-x-6 overflow-hidden rounded-[40px] p-6">
                <div className="relative h-32 w-32 flex-shrink-0">
                  <svg className="h-full w-full -rotate-90 transform">
                    <circle cx="64" cy="64" fill="transparent" r="54" stroke="rgba(15,23,42,0.1)" strokeWidth="12" />
                    <circle cx="64" cy="64" fill="transparent" r="54" stroke="#F25221" strokeDasharray="339" strokeDashoffset="80" strokeWidth="12" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold">78%</span>
                    <span className="text-[10px] font-bold uppercase leading-none text-vault-slate/40">Goal</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="mb-1 text-lg font-bold">Savings Goal: Q4 Alpha</h4>
                  <p className="mb-4 text-sm text-vault-slate/60">On track to reach your target by December 12th.</p>
                  <div className="flex -space-x-3">
                    <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-slate-200">
                      <img alt="User" className="h-full w-full object-cover grayscale" src={data.profile.avatar} />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-vault-slate">
                      <span className="text-[10px] font-bold text-white">+2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <div className="rounded-full border border-white/60 bg-white/80 p-2 shadow-lg">
                <span className={iconClass + ' text-vault-slate'}>keyboard_double_arrow_down</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-32 grid grid-cols-1 gap-16 border-t border-vault-slate/10 pt-16 md:grid-cols-2">
        {data.landing.footerCards.map((card, index) => (
          <article key={card.title} className="flex space-x-6">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-vault-slate/5 bg-white shadow-sm">
                <span className={iconClass + ' text-vault-slate'}>{card.icon}</span>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold">{card.title}</h3>
              <p className="max-w-md leading-relaxed text-vault-slate/60">{card.description}</p>
              {index === 1 && (
                <div className="mt-6 flex space-x-4">
                  <button className="flex items-center space-x-2 rounded-lg border border-vault-slate/30 bg-vault-slate/10 px-4 py-2 text-sm font-semibold text-vault-slate transition-colors hover:bg-vault-slate/20">
                    <span className={iconClass}>apple</span>
                    <span>{data.landing.appButtons.appStore}</span>
                  </button>
                  <button className="flex items-center space-x-2 rounded-lg border border-vault-slate/30 bg-vault-slate/10 px-4 py-2 text-sm font-semibold text-vault-slate transition-colors hover:bg-vault-slate/20">
                    <span className={iconClass}>android</span>
                    <span>{data.landing.appButtons.googlePlay}</span>
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </footer>
    </main>
  )
}
