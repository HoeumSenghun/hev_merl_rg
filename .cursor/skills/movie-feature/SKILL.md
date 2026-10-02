---
name: movie-feature
description: >-
  Adds or changes a Hev Merl Rg movie page or OMDb feature with Server
  Components, Zod DTOs, and Next.js caching. Use when the user asks to add or
  change search, a movie page, posters, OMDb data, or files under lib/ or app/.
---

# Movie feature

Follow `AGENTS.md`. This skill is the workflow for one feature. It does not replace those rules.

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
8. Finish only after `npm run lint` and `npm run build` pass. If the UI changed, verify that flow in the browser.

## Do not

- Fetch or map OMDb JSON inside a component.
- Add a Route Handler that proxies OMDb.
- Add Axios, SWR, TanStack Query, Redux, Zustand, or an animation package.
