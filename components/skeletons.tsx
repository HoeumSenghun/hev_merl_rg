export function SearchSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="space-y-3" key={index}>
            <div className="aspect-300/445 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PosterRowSkeleton() {
  return (
    <div className="flex gap-3 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          className="aspect-300/445 w-28 shrink-0 rounded-lg bg-zinc-200 sm:w-36 dark:bg-zinc-800"
          key={index}
        />
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="space-y-10" aria-hidden="true">
      <MovieSkeleton />
      {Array.from({ length: 3 }, (_, index) => (
        <div className="space-y-3" key={index}>
          <div className="h-6 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
          <PosterRowSkeleton />
        </div>
      ))}
    </div>
  );
}

export function MovieSkeleton() {
  return (
    <div
      className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]"
      aria-hidden="true"
    >
      <div className="aspect-300/445 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="space-y-4">
        <div className="h-9 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-20 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
