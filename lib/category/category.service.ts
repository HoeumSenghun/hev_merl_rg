import { cacheLife } from "next/cache";
import {
  categoryShelves,
  type CategoryResult,
  type CategoryShelf,
} from "@/lib/category/category.types";
import { fetchOmdb, OmdbError } from "@/lib/omdb/omdb.client";
import {
  omdbSearchSchema,
  readOmdbText,
  readPosterUrl,
} from "@/lib/omdb/omdb.schema";

const NOT_FOUND = new Set(["Movie not found!", "Incorrect IMDb ID."]);

export function findShelf(slug: string): CategoryShelf | undefined {
  return categoryShelves.find((shelf) => shelf.slug === slug);
}

function failureMessage(error: string): string {
  if (error === "Invalid API key!") {
    return "OMDb rejected the API key.";
  }
  return error;
}

export async function getCategory(slug: string): Promise<CategoryResult | null> {
  "use cache";
  cacheLife("minutes");

  const shelf = findShelf(slug);
  if (!shelf) {
    return null;
  }

  const parsed = omdbSearchSchema.safeParse(
    await fetchOmdb({ s: shelf.query, type: shelf.type }),
  );
  if (!parsed.success) {
    throw new OmdbError("OMDb returned data the app could not read.");
  }

  if (parsed.data.Response === "False") {
    if (NOT_FOUND.has(parsed.data.Error)) {
      return {
        slug: shelf.slug,
        title: shelf.title,
        query: shelf.query,
        total: 0,
        movies: [],
      };
    }
    throw new OmdbError(failureMessage(parsed.data.Error));
  }

  const total = Number.parseInt(parsed.data.totalResults, 10);

  return {
    slug: shelf.slug,
    title: shelf.title,
    query: shelf.query,
    total: Number.isFinite(total) ? total : parsed.data.Search.length,
    movies: parsed.data.Search.map((item) => ({
      imdbId: item.imdbID,
      title: readOmdbText(item.Title) ?? item.Title,
      year: readOmdbText(item.Year) ?? item.Year,
      posterUrl: readPosterUrl(item.Poster),
    })),
  };
}
