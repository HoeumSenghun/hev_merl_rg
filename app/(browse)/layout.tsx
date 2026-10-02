import { Suspense, type ReactNode } from "react";
import { BrowseFrame } from "./_components/browse-frame";
import { HeaderSearchForm } from "./_components/header-search-form";
import { SearchForm } from "@/components/search-form";

export default function BrowseLayout({ children }: { children: ReactNode }) {
  return (
    <BrowseFrame
      search={
        <Suspense fallback={<SearchForm inputId="site-search" />}>
          <HeaderSearchForm />
        </Suspense>
      }
    >
      {children}
    </BrowseFrame>
  );
}
