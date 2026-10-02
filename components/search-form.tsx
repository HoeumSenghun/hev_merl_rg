type SearchFormProps = {
  defaultQuery?: string;
  inputId: string;
};

export function SearchForm({ defaultQuery = "", inputId }: SearchFormProps) {
  return (
    <form action="/search" className="flex w-full max-w-xl gap-2" method="get">
      <label className="sr-only" htmlFor={inputId}>
        Search movies
      </label>
      <input
        className="h-11 min-w-0 flex-1 rounded-full border border-zinc-300 bg-white px-4 text-base outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-100"
        defaultValue={defaultQuery}
        id={inputId}
        name="q"
        placeholder="Search movies"
        required
        type="search"
      />
      <button
        className="h-11 shrink-0 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
