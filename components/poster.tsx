import Image from "next/image";
import { ViewTransition } from "react";

type PosterProps = {
  imdbId: string;
  title: string;
  posterUrl: string | null;
  priority?: boolean;
};

export function Poster({
  imdbId,
  title,
  posterUrl,
  priority = false,
}: PosterProps) {
  const frame = posterUrl ? (
    <Image
      alt={`${title} poster`}
      className="h-auto w-full bg-zinc-200 object-cover dark:bg-zinc-800"
      height={445}
      priority={priority}
      src={posterUrl}
      width={300}
    />
  ) : (
    <div className="flex aspect-300/445 items-center justify-center bg-zinc-200 px-3 text-center text-sm text-zinc-500 dark:bg-zinc-800">
      No poster
    </div>
  );

  return <ViewTransition name={`poster-${imdbId}`}>{frame}</ViewTransition>;
}
