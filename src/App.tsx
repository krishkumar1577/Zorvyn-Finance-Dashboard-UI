function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center">
        <section className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-emerald-950/30 backdrop-blur md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
            Tailwind check
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Tailwind is working.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            If you can see the spacing, gradients, rounded corners, and hover
            state below, the Tailwind v4 setup is active.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
              <div className="text-sm text-emerald-200">Utility classes</div>
              <div className="mt-2 text-2xl font-semibold">Visible</div>
            </div>
            <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-5">
              <div className="text-sm text-sky-200">Responsive layout</div>
              <div className="mt-2 text-2xl font-semibold">Active</div>
            </div>
            <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/10 p-5">
              <div className="text-sm text-fuchsia-200">Dark surface</div>
              <div className="mt-2 text-2xl font-semibold">Styled</div>
            </div>
          </div>

          <button className="mt-8 inline-flex items-center rounded-xl bg-emerald-400 px-5 py-3 font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300">
            Sample button
          </button>
        </section>
      </div>
    </main>
  )
}

export default App
