export type SearchMovie = {
  imdbId: string;
  title: string;
  year: string;
  posterUrl: string | null;
};

export type SearchResult = {
  query: string;
  total: number;
  movies: SearchMovie[];
};
