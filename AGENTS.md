<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hev Merl Rg (ហេវមើលរឿង)

Project memory for this repo. Cursor loads this file on every task, including skills and slash commands. A skill or command adds a workflow. It does not replace these rules.

This file is memory, not a task. Do not build the site from it unless the user asks.

## Product

Movie website. English name: Hev Merl Rg. Khmer name: ហេវមើលរឿង.

Movie data comes from the OMDb API. The app does not own a movie catalog.

## Stack

Installed:

- Next.js 16.3.8, App Router, React 19, TypeScript
- Tailwind CSS v4, loaded in `app/globals.css` with `@import "tailwindcss"` and `@theme`
- ESLint 9 with `eslint-config-next`

Chosen, not installed yet. Add them only when a task needs them:

- shadcn/ui for the interface
- Zod, to check OMDb JSON before it becomes a DTO
- OMDb API (`https://www.omdbapi.com/`)

Use Next.js for speed, navigation, images, fonts, and metadata. Do not add Axios, SWR, TanStack Query, Redux, Zustand, or an animation library. Do not add a database. OMDb is the catalog.

There is no `tailwind.config.js`. Keep Tailwind v4 in CSS. Do not add a v3 config file.

Before writing Next.js code, read the matching guide under `node_modules/next/dist/docs/`. This Next.js version differs from older App Router docs.

## Speed

Turn these on in `next.config.ts` when the first data page is built. They are not on yet.

- `cacheComponents: true` so services can use `"use cache"` and `cacheLife` from `next/cache`
- `partialPrefetching: true` so `next/link` can prefetch a page shell before the click
- `typedRoutes: true` so `href` values are checked by TypeScript
- `images.remotePatterns` for the poster host OMDb returns (`m.media-amazon.com`). Confirm the host from a real poster URL before allowing it.

Cache movie details with `cacheLife('days')`. Cache a search with `cacheLife('minutes')`, keyed by the query. Put `"use cache"` and `cacheLife` on the service function, not in a shared helper.

Search stays in the URL (`/search?q=`). The shell renders immediately. Wrap the result list in `<Suspense>` with a `loading.tsx` skeleton. Movie pages get `loading.tsx` and `error.tsx` too.

Posters use `next/image`. Give each image a width, height, and `alt`. Internal links use `next/link`. Fonts use `next/font` (Geist is already loaded). When the UI shows Khmer, add Noto Sans Khmer the same way. Do not add a font `<link>`.

Movie pages export `generateMetadata` from the movie DTO (title, year, plot). The root layout owns the site title template.

For the poster-to-detail move, use React `ViewTransition`. It needs no package. Skip it where the browser has no support; the page still works.

Pages call services directly. Do not add a Route Handler that proxies OMDb. That would expose a public API and a second place to cache.

## Structure

```text
app/
  layout.tsx                 site shell, fonts, metadata template
  page.tsx                   home
  search/page.tsx            /search?q=
  movie/[imdbId]/page.tsx    one movie
  search/loading.tsx         skeleton while search runs
  movie/[imdbId]/loading.tsx
  movie/[imdbId]/error.tsx
lib/omdb/
  omdb.client.ts             fetch, API key, URL only
  omdb.schema.ts             Zod schemas for the raw payload
lib/<feature>/
  <feature>.types.ts         DTOs the UI is allowed to see
  <feature>.service.ts       calls the client, parses with Zod, returns a DTO
components/                  app UI
components/ui/               shadcn primitives, after shadcn is installed
```

## Code

- Server Components by default. Add `"use client"` only for state, events, or browser APIs.
- Business logic lives in `lib/<feature>/<feature>.service.ts`. Components render. They do not fetch or map API data.
- DTOs live in `lib/<feature>/<feature>.types.ts`. Parse the OMDb payload with Zod inside the service. The UI receives DTOs only.
- Use clear names and small functions. Handle errors in the service and surface a useful failure to the UI. Do not swallow them.
- UI components go in `components/`. After shadcn is installed, its primitives live in `components/ui/`.

Example for search:

```text
lib/omdb/omdb.client.ts          fetch only
lib/omdb/omdb.schema.ts          raw OMDb shape
lib/search/search.types.ts       SearchMovie, SearchResult
lib/search/search.service.ts     searchMovies(), cached for minutes
app/search/page.tsx              Server Component, reads ?q=
```

## Secrets

Store `OMDB_API_KEY` in `.env.local`. Read it only on the server. Never use a `NEXT_PUBLIC_` variable for it. `.env*` is gitignored. Do not commit keys or print them in logs.

## Commands

- Dev: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Check: `npm run check` (lint, then build)
- Production server: `npm run start`

## Git

Remote: `git@github.com:HoeumSenghun/hev_merl_rg.git`

### Branches

- `master` is the released site. It changes only through a merge request from `develop`.
- `develop` is where finished work collects.
- `feature/<name>` is new work, cut from `develop`.
- `fix/<name>` is a bugfix, cut from `develop`.

### Flow

1. Update `develop`, then cut `feature/<name>` or `fix/<name>` from it.
2. Commit on that branch.
3. Run `npm run check`.
4. Merge that branch into `develop`. This step does not need a merge request.
5. Open a merge request from `develop` into `master`.
6. Deploy only after that merge request is on `master`. `develop` is not deployed.

Do not commit on `master`. Do not push straight to `master`. Do not force-push `master` or `develop`.

A bugfix uses the same path as a feature: branch from `develop`, fix, run `npm run check`, merge into `develop`, then a merge request into `master`.

### Commits

One line:

`YYYYMMDD-<kind> <what it does>`

The date is the commit day, eight digits, no separators. `<kind>` is `feature`, `fix`, or `setup`.

- `20261002-feature add movie search`
- `20261002-fix poster host`
- `20261002-setup git branches and checks`

### Env

`OMDB_API_KEY` lives in `.env.local`. Confirm the name is present when a task needs the API. Do not print the value, log it, or commit the file. Read it only in server code.

### Checks and deploy

`npm run check` is the gate before a merge into `develop` and before a merge request into `master`. GitHub Actions runs that command on pushes to `develop` and on merge requests into `master`.

Deploy the `master` branch only, after its merge request is merged.

## Skills

One project skill: `.cursor/skills/movie-feature/`. Run it with `/movie-feature` and the task. That run continues until the feature is on `develop` and `npm run check` has passed. Do not add skills for shadcn, caching, lint, or fonts. Those rules are in this file.

## Definition of done

A task is finished only after `npm run check` passes. If the change is visible in the UI, verify that flow in the browser before saying it is done. Merge the branch into `develop` after that. Open a merge request into `master` when `develop` is ready to release.

## Status

The app is still the `create-next-app` scaffold. `app/page.tsx` is the starter page. `lib/` does not exist yet. shadcn/ui, Zod, and OMDb are not wired up. `next.config.ts` does not enable cache components, prefetching, typed routes, or poster hosts yet.
