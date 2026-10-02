import Link from "next/link";
import { Suspense } from "react";
import { Poster } from "@/components/poster";
import { MovieSkeleton, PosterRowSkeleton } from "@/components/skeletons";
import { getCategory } from "@/lib/category/category.service";
import { categoryShelves } from "@/lib/category/category.types";
import { getMovie } from "@/lib/movie/movie.service";
import { OmdbError } from "@/lib/omdb/omdb.client";
import type { CategoryResult } from "@/lib/category/category.types";
import type { Movie } from "@/lib/movie/movie.types";

const featuredImdbId = "tt1375666";

function shortPlot(plot: string | null): string | null {
  if (!plot || plot.length <= 180) {
    return plot;
  }
  return `${plot.slice(0, 177).trimEnd()}…`;
}

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-2">
      <Suspense fallback={<MovieSkeleton />}>
        <Hero />
      </Suspense>
      {categoryShelves.map((shelf) => (
        <section className="space-y-3" key={shelf.slug}>
          <h2 className="text-lg font-semibold tracking-tight">
            <Link href={`/category/${shelf.slug}`}>{shelf.title}</Link>
          </h2>
          <Suspense fallback={<PosterRowSkeleton />}>
            <ShelfRow slug={shelf.slug} />
          </Suspense>
        </section>
      ))}
    </div>
  );
}

async function Hero() {
  let movie: Movie | null = null;
  let failure: string | null = null;

  try {
    movie = await getMovie(featuredImdbId);
  } catch (error) {
    if (!(error instanceof OmdbError)) {
      throw error;
    }
    failure = error.message;
  }

  if (failure || !movie) {
    return (
      <p className="text-zinc-600 dark:text-zinc-400">
        {failure ?? "The featured film is unavailable."}
      </p>
    );
  }

  const plot = shortPlot(movie.plot);

  return (
    <article className="grid items-end gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
      <div className="w-full max-w-56">
        <Poster
          imdbId={movie.imdbId}
          posterUrl={movie.posterUrl}
          priority
          title={movie.title}
        />
      </div>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          <Link href={`/movie/${movie.imdbId}`}>{movie.title}</Link>
        </h1>
        <p className="text-zinc-500">{movie.year}</p>
        {plot ? <p className="max-w-2xl leading-7">{plot}</p> : null}
      </div>
    </article>
  );
}

async function ShelfRow({ slug }: { slug: string }) {
  let result: CategoryResult | null = null;
  let failure: string | null = null;

  try {
    result = await getCategory(slug);
  } catch (error) {
    if (!(error instanceof OmdbError)) {
      throw error;
    }
    failure = error.message;
  }

  if (failure || !result) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {failure ?? "This shelf is unavailable."}
      </p>
    );
  }

  if (result.movies.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        No titles matching {result.query}.
      </p>
    );
  }

  return (
    <ul className="flex gap-3 overflow-x-auto pb-2">
      {result.movies.map((movie) => (
        <li className="w-28 shrink-0 sm:w-36" key={movie.imdbId}>
          <Link href={`/movie/${movie.imdbId}`}>
            <Poster
              imdbId={movie.imdbId}
              posterUrl={movie.posterUrl}
              title={movie.title}
              transitionName={`row-${slug}-${movie.imdbId}`}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
