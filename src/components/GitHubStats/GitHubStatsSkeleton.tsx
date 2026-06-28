export function GitHubStatsSkeleton() {
  return (
    <div className="animate-pulse space-y-5" aria-busy="true" aria-label="Loading GitHub stats">
      <div className="space-y-1.5">
        <div className="h-4 w-28 rounded bg-surface-panel" />
        <div className="h-3 w-20 rounded bg-surface-panel" />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-14 rounded border border-surface-border bg-surface-panel" />
        ))}
      </div>

      <div className="h-10 w-full rounded bg-surface-panel" />

      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-9 rounded border border-surface-border bg-surface-panel" />
        ))}
      </div>
    </div>
  );
}
