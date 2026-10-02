import type { SearchMovie } from "@/lib/search/search.types";

export type CategoryType = "movie" | "series" | "episode";

export type CategoryShelf = {
  slug: string;
  title: string;
  type: CategoryType;
  query: string;
};

export type CategoryResult = {
  slug: string;
  title: string;
  query: string;
  total: number;
  movies: SearchMovie[];
};

export const categoryShelves: CategoryShelf[] = [
  { slug: "movies", title: "Movies", type: "movie", query: "star" },
  { slug: "series", title: "Series", type: "series", query: "star" },
  { slug: "episodes", title: "Episodes", type: "episode", query: "pilot" },
  { slug: "action", title: "Action", type: "movie", query: "action" },
  { slug: "comedy", title: "Comedy", type: "movie", query: "comedy" },
  { slug: "drama", title: "Drama", type: "movie", query: "drama" },
  { slug: "horror", title: "Horror", type: "movie", query: "horror" },
  { slug: "animation", title: "Animation", type: "movie", query: "animation" },
];
