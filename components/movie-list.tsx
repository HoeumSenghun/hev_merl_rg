import Link from "next/link";
import { Poster } from "@/components/poster";
import type { SearchMovie } from "@/lib/search/search.types";

type MovieListProps = {
  movies: SearchMovie[];
};

export function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {movies.map((movie) => (
        <li key={movie.imdbId}>
          <Link
            className="block overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
            href={`/movie/${movie.imdbId}`}
          >
            <Poster
              imdbId={movie.imdbId}
              posterUrl={movie.posterUrl}
              title={movie.title}
            />
            <div className="space-y-1 p-3">
              <h2 className="line-clamp-2 text-sm font-medium">{movie.title}</h2>
              <p className="text-sm text-zinc-500">{movie.year}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
