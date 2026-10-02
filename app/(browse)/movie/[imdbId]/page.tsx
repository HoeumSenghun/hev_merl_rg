import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MovieDetail } from "@/components/movie-detail";
import { MovieSkeleton } from "@/components/skeletons";
import { getMovie } from "@/lib/movie/movie.service";

export async function generateMetadata(
  props: PageProps<"/movie/[imdbId]">,
): Promise<Metadata> {
  const { imdbId } = await props.params;
  const movie = await getMovie(imdbId);
  if (!movie) {
    return { title: "Movie not found" };
  }

  const description = [movie.year, movie.plot].filter(Boolean).join(". ");
  return {
    title: movie.title,
    description: description || undefined,
  };
}

export default function MoviePage(props: PageProps<"/movie/[imdbId]">) {
  return (
    <Suspense fallback={<MovieSkeleton />}>
      <MovieFrame params={props.params} />
    </Suspense>
  );
}

async function MovieFrame({
  params,
}: {
  params: PageProps<"/movie/[imdbId]">["params"];
}) {
  const { imdbId } = await params;

  return (
    <Suspense fallback={<MovieSkeleton />}>
      <MovieBody imdbId={imdbId} />
    </Suspense>
  );
}

async function MovieBody({ imdbId }: { imdbId: string }) {
  const movie = await getMovie(imdbId);
  if (!movie) {
    notFound();
  }

  return <MovieDetail movie={movie} />;
}
