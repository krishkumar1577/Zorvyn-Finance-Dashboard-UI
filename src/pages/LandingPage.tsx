import { iconClass } from '../constants/icons'

export function LandingPage({ onDemoClick }: { onDemoClick: () => void }) {
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

      <div className="relative z-10 grid grid-cols-12 gap-12 items-start">
        {/* Hero Section */}
        <section className="col-span-12 pt-8 lg:col-span-5" data-purpose="hero-content">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-px bg-vault-slate" />
            <div className="flex items-center space-x-2 bg-white/40 px-4 py-2 rounded-full border border-white/30">
              <span className={iconClass + ' text-sm'}>trending_up</span>
              <span className="text-sm font-medium">Explore 14 days <span className="font-bold underline">free trials</span></span>
            </div>
          </div>

          <h1 className="text-7xl font-extrabold tracking-tight leading-[1.05] mb-8">
            Financial<br />Tracking<br />Platform
          </h1>

          <p className="text-lg text-vault-slate/70 mb-10 max-w-md leading-relaxed">
            Elevate your wealth management with our transparent sanctuary. Track, analyze, and optimize your assets within a secure, high-tech vault environment.
          </p>

          <div className="flex items-center space-x-8 mb-16">
            <button className="bg-black text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-vault-slate transition-colors shadow-lg shadow-black/10">
              Try for free
            </button>
            <button onClick={onDemoClick} className="flex items-center space-x-3 font-bold text-lg group">
              <span className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform flex items-center justify-center">
                <span className={iconClass + ' text-black'}>play_arrow</span>
              </span>
              <span className="underline underline-offset-4">See Demo</span>
            </button>
          </div>

          {/* Metrics Summary */}
          <div className="relative w-full max-w-sm">
            <div className="bg-vault-card/60 p-8 rounded-[40px] border border-white/20">
              <h3 className="text-4xl font-bold mb-1">1 million +</h3>
              <p className="text-vault-slate/60 text-sm">Every month cash back for our clients</p>
            </div>
            <div className="absolute -bottom-6 -right-6 glass-panel p-5 rounded-3xl w-56 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <span className={iconClass + ' text-sm bg-black text-white p-1 rounded-full'}>ads_click</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-black" />
                  <div className="w-2 h-2 rounded-full bg-black/20" />
                </div>
              </div>
              <svg className="w-full h-8" preserveAspectRatio="none" viewBox="0 0 100 20">
                <path d="M0 15 Q 10 5, 20 12 T 40 10 T 60 15 T 80 8 T 100 12" fill="none" stroke="black" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </section>

        {/* Visual Dashboard Section */}
        <section className="col-span-12 relative h-[780px] lg:col-span-7" data-purpose="visual-dashboard">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[60px] border border-white/20 p-8 shadow-inner">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-40">
              <div className="bg-vault-accent w-24 h-24 rounded-full flex items-center justify-center shadow-2xl shadow-vault-accent/30">
                <span className={iconClass + ' text-black text-5xl font-bold transform rotate-45'}>arrow_downward</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 h-full content-start pt-12">
              {/* Portfolio Card */}
              <div className="col-span-2 glass-panel rounded-[40px] p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-vault-slate/50 mb-1">Portfolio Analysis</h4>
                    <p className="text-2xl font-bold">$482,950.00</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-700">+12.4%</span>
                    <span className={iconClass + ' text-vault-slate/40'}>more_horiz</span>
                  </div>
                </div>
                <div className="flex items-end justify-between h-32 gap-3">
                  <div className="bg-vault-slate w-full rounded-t-xl opacity-20 h-[40%]" />
                  <div className="bg-vault-slate w-full rounded-t-xl opacity-40 h-[65%]" />
                  <div className="bg-vault-slate w-full rounded-t-xl opacity-10 h-[30%]" />
                  <div className="bg-vault-slate w-full rounded-t-xl opacity-60 h-[85%]" />
                  <div className="bg-vault-slate w-full rounded-t-xl opacity-30 h-[50%]" />
                  <div className="bg-vault-accent w-full rounded-t-xl h-[95%]" />
                  <div className="bg-vault-slate w-full rounded-t-xl opacity-20 h-[45%]" />
                  <div className="bg-vault-slate w-full rounded-t-xl opacity-50 h-[70%]" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="glass-panel rounded-[40px] p-8 flex flex-col justify-center items-center text-center">
                <div className="relative mb-2">
                  <h4 className="text-5xl font-extrabold">70 k</h4>
                  <div className="absolute -right-4 -top-2">
                    <span className={iconClass + ' text-vault-accent scale-75'}>star_rate</span>
                  </div>
                </div>
                <p className="text-sm font-medium uppercase tracking-widest text-vault-slate/60 border-t border-vault-slate/20 pt-2 px-4">Active Downloads</p>
              </div>

              {/* Features */}
              <div className="bg-vault-card/40 backdrop-blur-md rounded-[40px] p-8 border border-white/40">
                <div className="grid grid-cols-4 gap-2 mb-6 opacity-80">
                  <div className="w-3 h-3 bg-black/80 rounded-sm" />
                  <div className="w-3 h-3 bg-transparent border border-black/20 rounded-sm" />
                  <div className="w-3 h-3 bg-black/60 rounded-sm" />
                  <div className="w-3 h-3 bg-black/80 rounded-sm" />
                </div>
                <h4 className="text-xl font-bold leading-tight mb-2">Take control</h4>
                <p className="text-xs text-vault-slate/60 font-medium">Automated expense classification across all connected vaults.</p>
              </div>

              {/* Goal Progress */}
              <div className="col-span-2 glass-panel rounded-[40px] p-6 flex items-center space-x-6 overflow-hidden">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" fill="transparent" r="54" stroke="rgba(15,23,42,0.1)" strokeWidth="12" />
                    <circle cx="64" cy="64" fill="transparent" r="54" stroke="#F25221" strokeDasharray="339" strokeDashoffset="80" strokeWidth="12" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-xl font-bold">78%</span>
                    <span className="text-[10px] uppercase font-bold text-vault-slate/40 leading-none">Goal</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-lg mb-1">Savings Goal: Q4 Alpha</h4>
                  <p className="text-sm text-vault-slate/60 mb-4">On track to reach your target by December 12th.</p>
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img alt="User" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida/ADBb0uj5_IFvTlmMj3GKckYi2YKwHWqwnMdwCM-DqsQMDYohIzGbugIiZm971v5ur45tVtQPLR37Y1Vch1ef-Lh0Ht1bbDfx4iTpHyjn24ewfo6Gc_dTbV6mDrQICWeE1RAL7xiP8M6Pyia63_APahHTZopxi0qe9Fs4iktDuYLkxrbJrrB-EhqT-pczcBLFYZ_JJaZgu5o0PSRm0ez59k36L_EeRNDYMerxPh-xcMn6zRufjLwtCTlTI3wUwCV-GZaFXmgr-8cGMT23PpA" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-vault-slate flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">+2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <div className="bg-white/80 p-2 rounded-full border border-white/60 shadow-lg">
                <span className={iconClass + ' text-vault-slate'}>keyboard_double_arrow_down</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-vault-slate/10 pt-16">
        <article className="flex space-x-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-white border border-vault-slate/5 flex items-center justify-center shadow-sm">
              <span className={iconClass + ' text-vault-slate'}>link</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Subscription</h3>
            <p className="text-vault-slate/60 max-w-sm leading-relaxed">Make your money analysis faster and create your own way of saving on payments. Consolidated view for all recurring costs.</p>
          </div>
        </article>

        <article className="flex space-x-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-white border border-vault-slate/5 flex items-center justify-center shadow-sm">
              <span className={iconClass + ' text-vault-slate'}>smartphone</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Mobile Application</h3>
            <p className="text-vault-slate/60 max-w-md leading-relaxed mb-6">Real-time alerts, anytime. Experience the full power of VaultTrack on your iOS or Android device. Cloud-synced, encrypted, and offline-ready.</p>
            <div className="flex space-x-4">
              <img alt="App Store" className="h-9 rounded opacity-90 hover:opacity-100 transition-opacity cursor-pointer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6VjhfUQD52n2a6sI6qbeV8j9LkLs42ZrD9AhJUm4BfAAtALu_tyfhp0l4ZbqM22SpAxP7KQYvSlV4zEPO63hVp_oOMrsVZ1oRDLiPlCrQJA2b116Vbp2MOOI2UzqrluDa7a0ND3PAO-cSELBuGtG47QdJftkaQS5zAIjaWpnto_AjlWASmHyZ2-iQrx49hbWtnUoRqRKTNtdfZBRDwXMelYXMVT2qEcIGAF1h-AU47BdTQU3KTj6cAWP_k48lHBR_9Vu5dDdZpmfz" />
              <img alt="Google Play" className="h-9 rounded opacity-90 hover:opacity-100 transition-opacity cursor-pointer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkGamCbQ6GrNBQQm_I-hxzp_OcvawnI0Zqqe3GnjTzjL-wxiLEhIz81dxhRMFt7kVDjLC09pc8LMcMtB4zhLly25IRJV81Rkek1aITEa7CoKrDrViobG1zbrJ5Z0oVOgwFycxhKNpnuZ23xrjVJ2WX42Nt3R7A8Wppgjz4sYdoBR6I40Cx3BV2zSeeWwL4Fw__zDA1hqRGxR5_lcRIRyZCYfxf4w_7Inaqrxidh4zTodh-2aFhI9w0a2Gs-GElVzQvKpkMZhm3NU0H" />
            </div>
          </div>
        </article>
      </footer>
    </main>
  )
}
