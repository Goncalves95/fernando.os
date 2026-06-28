export function ProjectsSectionSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading projects">
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-7 w-20 rounded-full bg-surface-panel" />
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-64 rounded-lg border border-surface-border bg-surface-panel"
          />
        ))}
      </div>
    </div>
  );
}
