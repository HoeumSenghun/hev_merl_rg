import Link from "next/link";
import type { ReactNode } from "react";

type BrowseFrameProps = {
  children: ReactNode;
  search: ReactNode;
};

export function BrowseFrame({ children, search }: BrowseFrameProps) {
  return (
    <>
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link className="flex flex-col leading-tight" href="/">
            <span className="text-lg font-semibold" lang="km">
              ហេវមើលរឿង
            </span>
            <span className="text-sm text-zinc-500">Hev Merl Rg</span>
          </Link>
          {search}
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8">
        {children}
      </main>
    </>
  );
}
