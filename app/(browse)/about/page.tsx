import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "ហេវមើលរឿង (Hev Merl Rg) helps you find a film and read its facts. Movie facts come from OMDb. This site does not play films.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto flex w-full max-w-xl flex-col gap-6 py-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight" lang="km">
          ហេវមើលរឿង
        </h1>
        <p className="text-sm font-medium tracking-wide text-zinc-500">
          Hev Merl Rg
        </p>
      </header>
      <div className="space-y-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        <p>Search for a film, then read its year, plot, and poster.</p>
        <p>Movie facts come from OMDb.</p>
        <p>This site does not play films.</p>
      </div>
      <Link
        className="inline-flex h-11 w-fit items-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        href="/"
      >
        Search for a title
      </Link>
    </article>
  );
}
