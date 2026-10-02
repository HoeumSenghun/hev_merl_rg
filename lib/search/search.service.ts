import { cacheLife } from "next/cache";
import { fetchOmdb, OmdbError } from "@/lib/omdb/omdb.client";
import {
  omdbSearchSchema,
  readOmdbText,
  readPosterUrl,
} from "@/lib/omdb/omdb.schema";
import type { SearchResult } from "@/lib/search/search.types";

const NOT_FOUND = new Set(["Movie not found!", "Incorrect IMDb ID."]);

function failureMessage(error: string): string {
  if (error === "Invalid API key!") {
    return "OMDb rejected the API key.";
  }
  return error;
}

export async function searchMovies(query: string): Promise<SearchResult> {
  "use cache";
  cacheLife("minutes");

  const trimmed = query.trim();
  if (!trimmed) {
    return { query: "", total: 0, movies: [] };
  }

  const parsed = omdbSearchSchema.safeParse(
    await fetchOmdb({ s: trimmed, type: "movie" }),
  );
  if (!parsed.success) {
    throw new OmdbError("OMDb returned data the app could not read.");
  }

  if (parsed.data.Response === "False") {
    if (NOT_FOUND.has(parsed.data.Error)) {
      return { query: trimmed, total: 0, movies: [] };
    }
    throw new OmdbError(failureMessage(parsed.data.Error));
  }

  const total = Number.parseInt(parsed.data.totalResults, 10);

  return {
    query: trimmed,
    total: Number.isFinite(total) ? total : parsed.data.Search.length,
    movies: parsed.data.Search.map((item) => ({
      imdbId: item.imdbID,
      title: readOmdbText(item.Title) ?? item.Title,
      year: readOmdbText(item.Year) ?? item.Year,
      posterUrl: readPosterUrl(item.Poster),
    })),
  };
}
