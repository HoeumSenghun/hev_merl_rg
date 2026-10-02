import type { Metadata } from "next";
import { Suspense } from "react";
import { MovieList } from "@/components/movie-list";
import { SearchSkeleton } from "@/components/skeletons";
import { OmdbError } from "@/lib/omdb/omdb.client";
import { searchMovies } from "@/lib/search/search.service";
import type { SearchResult } from "@/lib/search/search.types";

function readQuery(value: string | string[] | undefined): string {
  const query = Array.isArray(value) ? value[0] : value;
  return query?.trim() ?? "";
}

export async function generateMetadata(
  props: PageProps<"/search">,
): Promise<Metadata> {
  const { q } = await props.searchParams;
  const query = readQuery(q);
  return {
    title: query ? `Search: ${query}` : "Search",
  };
}

export default function SearchPage(props: PageProps<"/search">) {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchFrame searchParams={props.searchParams} />
    </Suspense>
  );
}

async function SearchFrame({
  searchParams,
}: {
  searchParams: PageProps<"/search">["searchParams"];
}) {
  const { q } = await searchParams;
  const query = readQuery(q);

  if (!query) {
    return <SearchPrompt />;
  }

  return (
    <Suspense fallback={<SearchSkeleton />}>
      <Results query={query} />
    </Suspense>
  );
}

function SearchPrompt() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">Search</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Type a movie title to see posters from OMDb.
      </p>
    </div>
  );
}

async function Results({ query }: { query: string }) {
  let result: SearchResult | null = null;
  let failure: string | null = null;

  try {
    result = await searchMovies(query);
  } catch (error) {
    if (!(error instanceof OmdbError)) {
      throw error;
    }
    failure = error.message;
  }

  if (failure || !result) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Search failed</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {failure ?? "Search failed."}
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Results for “{result.query}”
        </h1>
        <p className="text-sm text-zinc-500">
          {result.total === 0
            ? "No movies found."
            : `Showing ${result.movies.length} of ${result.total}`}
        </p>
      </header>
      {result.movies.length > 0 ? <MovieList movies={result.movies} /> : null}
    </section>
  );
}
