---
name: clone-netflix
description: >-
  Rebuilds the Hev Merl Rg home page as a streaming-style browse page with a
  hero and horizontal poster rows from OMDb. Use when the user runs
  /clone-netflix or asks to clone Netflix or make the homepage look like a
  streaming catalog.
disable-model-invocation: true
---

# Clone Netflix

Follow `AGENTS.md`. This skill changes the home page into a browse layout. It does not replace those rules. Data still comes from OMDb through the existing services. Also follow `.cursor/skills/movie-feature/SKILL.md` if a service changes.

Build an original catalog page. Do not copy Netflix. Do not use that name, logo, wordmark, or downloaded assets. Do not ship a video player, accounts, or a database. This site does not play films.

## Steps

1. Keep the header: Khmer name, English name, About, and search.
2. Replace the centered home block in `app/(browse)/page.tsx` with a hero and one horizontal row per shelf in `categoryShelves`.
3. Hero: call `getMovie` for one known id (`tt1375666` until a featured id is chosen). Show the poster, title, year, and a short plot. Link the title to `/movie/[imdbId]`.
4. Rows: call `getCategory` for each shelf inside `<Suspense>`. Each row shows the shelf title, linked to `/category/[slug]`, and posters linked to `/movie/[imdbId]`. Reuse `Poster`.
5. Add `app/(browse)/loading.tsx` so the home wait has a skeleton. Keep search, movie, category, and about as they are.
6. Finish only after `npm run check` passes. If the UI changed, verify that flow in the browser.

## Example

Home shows a large Inception hero, then rows named Movies, Series, Episodes, Action, Comedy, Drama, Horror, and Animation. A poster opens that film. A row title opens that shelf. The header search still goes to `/search?q=`.

## Do not

- Fetch or map OMDb JSON inside a component.
- Add a Route Handler that proxies OMDb.
- Add Axios, SWR, TanStack Query, Redux, Zustand, or an animation package.
- Embed a trailer or a play button that pretends the film will start.
