"use client";

import { useSearchParams } from "next/navigation";
import { SearchForm } from "@/components/search-form";

export function HeaderSearchForm() {
  const params = useSearchParams();
  const query = params.get("q")?.trim() ?? "";

  return <SearchForm defaultQuery={query} inputId="site-search" key={query} />;
}
