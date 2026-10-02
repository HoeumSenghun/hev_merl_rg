import { cacheLife } from "next/cache";
import { fetchOmdb, OmdbError } from "@/lib/omdb/omdb.client";
import {
  omdbMovieSchema,
  readOmdbText,
  readPosterUrl,
} from "@/lib/omdb/omdb.schema";
import type { Movie } from "@/lib/movie/movie.types";

const NOT_FOUND = new Set(["Movie not found!", "Incorrect IMDb ID."]);

function failureMessage(error: string): string {
  if (error === "Invalid API key!") {
    return "OMDb rejected the API key.";
  }
  return error;
}

export async function getMovie(imdbId: string): Promise<Movie | null> {
  "use cache";
  cacheLife("days");

  if (!/^tt\d+$/.test(imdbId)) {
    return null;
  }

  const parsed = omdbMovieSchema.safeParse(
    await fetchOmdb({ i: imdbId, plot: "full" }),
  );
  if (!parsed.success) {
    throw new OmdbError("OMDb returned data the app could not read.");
  }

  if (parsed.data.Response === "False") {
    if (NOT_FOUND.has(parsed.data.Error)) {
      return null;
    }
    throw new OmdbError(failureMessage(parsed.data.Error));
  }

  const movie = parsed.data;
  return {
    imdbId: movie.imdbID,
    title: readOmdbText(movie.Title) ?? movie.Title,
    year: readOmdbText(movie.Year) ?? movie.Year,
    rated: readOmdbText(movie.Rated),
    released: readOmdbText(movie.Released),
    runtime: readOmdbText(movie.Runtime),
    genre: readOmdbText(movie.Genre),
    director: readOmdbText(movie.Director),
    actors: readOmdbText(movie.Actors),
    plot: readOmdbText(movie.Plot),
    posterUrl: readPosterUrl(movie.Poster),
    imdbRating: readOmdbText(movie.imdbRating),
  };
}
