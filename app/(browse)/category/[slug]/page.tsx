import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MovieList } from "@/components/movie-list";
import { SearchSkeleton } from "@/components/skeletons";
import { findShelf, getCategory } from "@/lib/category/category.service";
import type { CategoryResult } from "@/lib/category/category.types";
import { OmdbError } from "@/lib/omdb/omdb.client";

export async function generateMetadata(
  props: PageProps<"/category/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const shelf = findShelf(slug);
  return { title: shelf?.title ?? "Category" };
}

export default function CategoryPage(props: PageProps<"/category/[slug]">) {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <CategoryFrame params={props.params} />
    </Suspense>
  );
}

async function CategoryFrame({
  params,
}: {
  params: PageProps<"/category/[slug]">["params"];
}) {
  const { slug } = await params;
  if (!findShelf(slug)) {
    notFound();
  }

  return (
    <Suspense fallback={<SearchSkeleton />}>
      <CategoryResults slug={slug} />
    </Suspense>
  );
}

async function CategoryResults({ slug }: { slug: string }) {
  let result: CategoryResult | null = null;
  let failure: string | null = null;

  try {
    result = await getCategory(slug);
  } catch (error) {
    if (!(error instanceof OmdbError)) {
      throw error;
    }
    failure = error.message;
  }

  if (!result && !failure) {
    notFound();
  }

  if (failure || !result) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Category failed
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {failure ?? "Category failed."}
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{result.title}</h1>
        <p className="text-sm text-zinc-500">
          {result.total === 0
            ? `No titles matching ${result.query}.`
            : `Titles matching ${result.query}. Showing ${result.movies.length} of ${result.total}.`}
        </p>
      </header>
      {result.movies.length > 0 ? <MovieList movies={result.movies} /> : null}
    </section>
  );
}
