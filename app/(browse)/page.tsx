import Link from "next/link";
import { SearchForm } from "@/components/search-form";
import { categoryShelves } from "@/lib/category/category.types";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 py-16 text-center">
      <div className="flex flex-col items-center gap-6">
        <p className="text-sm font-medium tracking-wide text-zinc-500">
          Hev Merl Rg
        </p>
        <h1 className="text-4xl font-semibold tracking-tight" lang="km">
          ហេវមើលរឿង
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Search for a title, or open a shelf of movies, series, and episodes.
        </p>
        <SearchForm inputId="home-search" />
      </div>
      <nav aria-label="Categories" className="w-full">
        <ul className="flex flex-wrap justify-center gap-2">
          {categoryShelves.map((shelf) => (
            <li key={shelf.slug}>
              <Link
                className="inline-flex h-10 items-center rounded-full border border-zinc-300 px-4 text-sm dark:border-zinc-700"
                href={`/category/${shelf.slug}`}
              >
                {shelf.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
