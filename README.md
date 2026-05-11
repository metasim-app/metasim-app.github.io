# MetaSim

A search-engine UI for finding **functionally similar GitHub repositories**, built on top of the MetaSim metadata-embedding index (267.6K curated public repos).

> Masud, M. R., Rokon, M. O. F., Yan, P., Islam, R., & Faloutsos, M. (2024).
> **MetaSim: A Search Engine for Finding Similar GitHub Repositories.**
> *2024 IEEE International Conference on Software Maintenance and Evolution (ICSME).*
> <https://ieeexplore.ieee.org/document/10795110/>

Live: **<https://metasim-app.github.io>**
Demo video: **<https://youtu.be/HnFnN3JclQw>**

---

## Stack

- **Vite** + **React 18**
- **MUI 5** with a custom warm/editorial theme (Fraunces + IBM Plex)
- Static deploy to **GitHub Pages** via Actions

No backend — the frontend talks directly to the MetaSim API at
`https://metadatas.net/api/get_data/`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → ./dist
npm run preview  # serve the production build
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In the repository **Settings → Pages**, set source to **GitHub Actions**.

Because `metasim-app.github.io` is an organization/user page, `vite.config.js` uses `base: '/'`. If you fork this to a *project* page (`<user>.github.io/metasim-app`), change `base` to `'/metasim-app/'`.

## API

The client calls:

```
GET https://metadatas.net/api/get_data/?search={owner/repo}&radio={1|2}
```

- `search` — a GitHub repository in `owner/repo` form, e.g. `facebook/react`
- `radio` — embedding mode:
  - **1** — Readme only (≈ 90.1% similarity precision)
  - **2** — Description + Topics + Readme (≈ 97.8% — recommended)

The response is parsed defensively. We accept the result list at the top level or under any of `data`, `results`, `repositories`, `repos`, `matches`, `items`, `similar`, etc. Each item is normalised in `src/utils/normalize.js` — extra fields are preserved in `repo.raw`.

### CORS

For the page hosted at `metasim-app.github.io` to call `metadatas.net`, the API must set:

```
Access-Control-Allow-Origin: https://metasim-app.github.io
```

(or `*`). If you control the backend and the UI shows a connection error, that's the first thing to check.

## Layout overview

```
src/
├── App.jsx                   # state + composition
├── api.js                    # fetch + MODES
├── theme.js                  # MUI theme (warm off-white / slate / gold)
├── index.css                 # font imports, shimmer, reveal animation
├── main.jsx
├── components/
│   ├── HeroPanel.jsx         # initial landing surface
│   ├── AppHeader.jsx         # sticky masthead in results mode
│   ├── SearchControl.jsx     # input + mode toggle (hero & header)
│   ├── ResultsToolbar.jsx    # count, sort, view, CSV
│   ├── FiltersPanel.jsx      # language / stars / similarity / topics
│   ├── ResultsGrid.jsx       # card layout
│   ├── ResultsTable.jsx      # table view
│   ├── RepoCard.jsx          # single result card
│   ├── States.jsx            # empty / error / skeleton
│   └── AppFooter.jsx
└── utils/
    ├── normalize.js          # defensive shape mapping
    ├── filterSort.js         # filters, sort, language facets
    ├── csv.js                # RFC-4180 CSV export
    └── format.js             # number / date / percent formatters
```

## Design notes

- **Off-white paper** (`#FAF7F1`) with a faint dot grain so the surface isn't flat.
- **Slate ink** (`#1F2733`) for primary text; gold (`#B07A1A`) used sparingly — accent dot in the wordmark, similarity bars, focus glow, hover underlines.
- Display type is **Fraunces** (variable serif). Body and UI use **IBM Plex Sans**; repo names and stats use **IBM Plex Mono**. The pairing is intentionally editorial / academic.
- Restraint over decoration: the brand mark is one line, results are dense but airy, and animation is limited to a single staggered reveal on first paint.

## License

MIT.
