export function PageLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16" aria-live="polite" aria-busy="true">
      <div className="tch-loading-shell rounded-2xl px-6 py-8 lg:px-10 lg:py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-coastal-muted">Templeton Custom Homes</p>
        <div className="mt-5 tch-skeleton h-4 w-48 rounded-full" />
        <div className="mt-4 space-y-3">
          <div className="tch-skeleton h-10 w-full max-w-3xl rounded-full" />
          <div className="tch-skeleton h-10 w-full max-w-2xl rounded-full" />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="tch-skeleton aspect-[4/5] rounded-xl" />
          <div className="tch-skeleton aspect-[4/5] rounded-xl" />
          <div className="tch-skeleton aspect-[4/5] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
