"use client";

import { useEffect } from "react";

export default function MovieError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        Could not load this movie
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Something went wrong while reading OMDb.
      </p>
      <button
        className="h-11 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        onClick={() => retry()}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
