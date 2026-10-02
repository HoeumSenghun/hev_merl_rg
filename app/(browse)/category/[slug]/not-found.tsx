import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        Category not found
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        That shelf is not in the catalog.
      </p>
      <Link
        className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        href="/"
      >
        Back home
      </Link>
    </div>
  );
}
