---
name: movie-feature
description: >-
  Adds or changes a Hev Merl Rg movie page or OMDb feature with Server
  Components, Zod DTOs, and Next.js caching. Use when the user runs
  /movie-feature or asks to add or change search, a movie page, posters, OMDb
  data, or files under lib/ or app/.
disable-model-invocation: true
---

# Movie feature

Follow `AGENTS.md`. This skill is the workflow for one feature. It does not replace those rules.

One run finishes the feature. Do not stop between steps to ask whether to continue. Do not start a second skill. Do not use `/loop`.

Stop only when every item in **Done** is true, or when a blocker below is real.

## Steps

1. Read the matching guide in `node_modules/next/dist/docs/` before writing Next.js code.
2. If `next.config.ts` does not yet set `cacheComponents`, `partialPrefetching`, and `typedRoutes`, turn those on before the first page that fetches OMDb.
3. Read `OMDB_API_KEY` only inside `lib/omdb/omdb.client.ts`. Never print the key. Never use `NEXT_PUBLIC_`.
4. Add or extend only the files this feature needs:
   - `lib/omdb/omdb.client.ts` — fetch, key, and URL
   - `lib/omdb/omdb.schema.ts` — Zod for the raw payload
   - `lib/<feature>/<feature>.types.ts` — DTOs
   - `lib/<feature>/<feature>.service.ts` — call the client, parse with Zod, return a DTO
5. Call the service from a Server Component. Add `loading.tsx` on any route that waits on OMDb. A movie route also gets `error.tsx`.
6. Cache movie details with `cacheLife('days')` on the service. Cache search with `cacheLife('minutes')`, keyed by the query. The search page reads `/search?q=`.
7. Render posters with `next/image`. Add the poster host to `images.remotePatterns` only after checking a real poster URL.
8. Run `npm run check`. If it fails, fix the failure and run it again.
9. If the UI changed, verify that flow in the browser, then fix anything that is broken and check again.
10. Commit on a `feature/` or `fix/` branch using `YYYYMMDD-<kind> <what it does>`, then merge into `develop`. Push `develop`. Leave `master` for a merge request.

## Done

- The requested page or data change is in the repo.
- `npm run check` passed on the last run.
- A visible UI change was exercised in the browser.
- The commit is on `develop`, and `develop` is pushed.
- `master` was not changed.

## Stop and report

Stop and say what is blocking when:

- `OMDB_API_KEY` is missing from `.env.local` and the task needs OMDb. Do not invent a key. Do not print a value.
- The same check failure remains after a real fix.
- The task needs a product choice that `AGENTS.md` does not already make.

## Do not

- Fetch or map OMDb JSON inside a component.
- Add a Route Handler that proxies OMDb.
- Add Axios, SWR, TanStack Query, Redux, Zustand, or an animation package.
