import Link from "next/link";

export default function MovieNotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Movie not found</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        OMDb has no movie for that id.
      </p>
      <Link
        className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        href="/"
      >
        Search again
      </Link>
    </div>
  );
}
