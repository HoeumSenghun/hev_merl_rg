import { z } from "zod";

const omdbFailureSchema = z.object({
  Response: z.literal("False"),
  Error: z.string(),
});

const omdbSearchItemSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  imdbID: z.string(),
  Type: z.string(),
  Poster: z.string(),
});

const omdbSearchSuccessSchema = z.object({
  Response: z.literal("True"),
  Search: z.array(omdbSearchItemSchema),
  totalResults: z.string(),
});

const omdbMovieSuccessSchema = z.object({
  Response: z.literal("True"),
  Title: z.string(),
  Year: z.string(),
  Rated: z.string(),
  Released: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Actors: z.string(),
  Plot: z.string(),
  Poster: z.string(),
  imdbRating: z.string(),
  imdbID: z.string(),
});

export const omdbSearchSchema = z.union([
  omdbSearchSuccessSchema,
  omdbFailureSchema,
]);

export const omdbMovieSchema = z.union([
  omdbMovieSuccessSchema,
  omdbFailureSchema,
]);

export function readOmdbText(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.toUpperCase() === "N/A") {
    return null;
  }
  return trimmed;
}

export function readPosterUrl(value: string): string | null {
  const text = readOmdbText(value);
  if (!text) {
    return null;
  }

  let url: URL;
  try {
    url = new URL(text);
  } catch {
    return null;
  }

  if (
    url.protocol !== "https:" ||
    url.hostname !== "m.media-amazon.com" ||
    !url.pathname.startsWith("/images/") ||
    url.search !== ""
  ) {
    return null;
  }

  return url.toString();
}
