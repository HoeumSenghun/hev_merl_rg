import { Poster } from "@/components/poster";
import type { Movie } from "@/lib/movie/movie.types";

type MovieDetailProps = {
  movie: Movie;
};

export function MovieDetail({ movie }: MovieDetailProps) {
  const facts = [
    ["Rated", movie.rated],
    ["Released", movie.released],
    ["Runtime", movie.runtime],
    ["Genre", movie.genre],
    ["IMDb", movie.imdbRating],
    ["Director", movie.director],
    ["Actors", movie.actors],
  ].filter((entry): entry is [string, string] => entry[1] !== null);

  return (
    <article className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
      <Poster
        imdbId={movie.imdbId}
        posterUrl={movie.posterUrl}
        priority
        title={movie.title}
      />
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{movie.title}</h1>
          {movie.year ? (
            <p className="text-zinc-500">{movie.year}</p>
          ) : null}
        </header>
        {movie.plot ? (
          <p className="max-w-2xl text-base leading-7">{movie.plot}</p>
        ) : null}
        <dl className="grid gap-3 sm:grid-cols-2">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm text-zinc-500">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
