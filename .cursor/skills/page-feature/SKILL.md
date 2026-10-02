---
name: page-feature
description: >-
  Plans and adds a Hev Merl Rg page or web feature as an MVP. Compares movie
  sites for user experience, decides what home, about, search, movie, category,
  and any new page must show, then integrates the feature. Use when the user
  runs /page-feature or asks to add a page, about page, home section, or new
  website feature.
---

# Page feature

Follow `AGENTS.md`. This skill decides the pages and what they show. It does not replace those rules. When the feature reads OMDb, also follow `.cursor/skills/movie-feature/SKILL.md`.

The site helps someone find a film and read its facts. It does not play video. OMDb is the catalog. Do not add a database, accounts, or a watchlist that must be stored.

## Steps

1. Name the user job in one sentence. Example: "Find films by a mood word and open one."
2. Look at two or three movie sites for that job. Note what they show (search, poster grid, facts, empty state). Do not copy their layout, text, or branding.
3. Cut an MVP. Keep only what helps someone find a film or understand it. Leave accounts, payments, comments, and playback for later.
4. Write a page map before editing UI. For each page, list what is on screen. Include home, about, and every existing page the feature touches. Add a new page only when no existing page can show it.
5. Build the MVP. Search stays in the header. Each page has one primary action. Posters use `next/image`. Khmer uses the font already loaded in the root layout. Show loading, empty, and failure states.
6. Link the feature from home and from the page where the user would look for it.
7. Finish only after `npm run check` passes. If the UI changed, verify that flow in the browser.

## Pages

| Page | URL | Show |
| --- | --- | --- |
| Home | `/` | Khmer name, English name, search, links to every shelf |
| Search | `/search?q=` | The query, result count, posters, title, year |
| Movie | `/movie/[imdbId]` | Poster, title, year, plot, facts |
| Category | `/category/[slug]` | Shelf name, "Titles matching …", posters |
| About | `/about` | Both names, that facts come from OMDb, that the site does not play films |

Add a row for a new page before creating it.

## Design

- Mobile layout first. The header and the primary action stay visible.
- Posters are the way to browse. Text supports the poster.
- One type family already in the layout. Do not add a font link or an animation package.
- Empty, loading, and error states use the same shell as the page.

## Example

Job: explain the site.

MVP: an About page, plus a link in the header. Home, search, movie, and category stay as they are.

About shows ហេវមើលរឿង, Hev Merl Rg, a short line that movie facts come from OMDb, and a line that the site does not play films. No form and no account.

## Do not

- Fetch or map OMDb JSON inside a component.
- Add a Route Handler that proxies OMDb.
- Add Axios, SWR, TanStack Query, Redux, Zustand, or an animation package.
- Build a page that the page map does not list.
