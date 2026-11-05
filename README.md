# Course Report Site

A static Vue 3 + Vite site presenting a graduate course group project made of three sub-projects. All content lives in data files; components only render data, they never hard-code it.

## Editing content

Content is split across a few files so each project can be edited on its own, without touching the others:

- **`src/data/site.config.js`** — course info and group only:
  - `university`, `major`, `course`, `semester`, `year`, `teacher`, `group`, `repoLink` — shown on the home page and footer.
  - `members` — array of `{ fullName, id, role, gitLink }`. Rendered as cards on the home page and a compact list on each project page.
  - `projects` — do not edit the array literally here; it's assembled from the three files below. Keep exactly 3 imports/entries.

- **`src/data/projects/<slug>.js`** — one file per sub-project (`tabular-churn.js`, `text-sentiment.js`, `image-defect.js`). Each exports a single `project` object:
  - `slug` — used in the URL (`/#/projects/<slug>`). Must be unique; rename the file to match if you change it.
  - `title`, `dataType`, `summary`, `problem`, `dataset` — plain text/strings.
  - `notebook.github` / `notebook.colab` — links to notebooks. Leave empty (`''`) to show a disabled "Coming soon" button instead of a dead link.
  - `reportPdf` — path to a PDF under `public/reports/` (e.g. `'reports/p1.pdf'`), or `''` for "Coming soon".
  - `youtube` — a full YouTube URL (`watch?v=`, `youtu.be/...`, or `/shorts/...`) or a bare video id. Leave `''` to hide the embed and show "Coming soon".
  - `sections` — array of collapsible sections, each with `id`, `title`, `defaultOpen`, and `blocks`.

To **add or remove a project**: add/remove a file under `src/data/projects/`, then update the import and the `projects: [...]` array at the top of `site.config.js` to match — the site always expects exactly 3.

`src/data/projectTypes.js` holds the shared JSDoc shape (`Project`, `Section`, `Block`) referenced by each project file — editor-only, no need to touch it.

### Block types

Each section's `blocks` array can mix any of:

| type | fields |
|---|---|
| `text` | `content` (string, supports `**bold**`, `*italic*`, `` `code` ``) |
| `metrics` | `items: [{ label, value, hint? }]` |
| `table` | `caption?`, `columns: [{ key, label, align? }]`, `rows: [...]`, `highlightBest?: { key, mode: 'max'|'min' }` |
| `figure` | `src` (path under `public/`), `alt`, `caption?`, `explanation?`, `explanationPosition?: 'right'|'below'` |
| `chart` | `chartType: 'bar'|'line'|'pie'|'doughnut'|'scatter'|'radar'`, `labels?`, `datasets: [{ label, data }]`, `caption?`, `explanation?`, `explanationPosition?` |

`explanationPosition: 'right'` shows the explanation box beside the figure/chart on screens ≥1024px (it always drops below on smaller screens); `'below'` always places it underneath.

## Where to put files

- **PDF reports** → `public/reports/` (e.g. `public/reports/p1.pdf`), then reference them as `reportPdf: 'reports/p1.pdf'` in the config.
- **Figures/charts exported from notebooks** → `public/figures/` (PNG or SVG), then reference them as `src: 'figures/my-figure.png'` in a `figure` block.

Paths are resolved automatically with the GitHub Pages sub-path, so always write them **relative, without a leading slash** (e.g. `'figures/foo.svg'`, not `'/figures/foo.svg'`).

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173/<repo-name>/
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Enabling GitHub Pages

1. Confirm the repository name matches the `base` path in `vite.config.js` (`base: process.env.BASE_PATH ?? '/<repo-name>/'`). Update it if you rename or fork the repo.
2. Push to `main` — `.github/workflows/deploy.yml` builds the site and publishes `dist/` automatically.
3. In the repository settings, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. After the workflow run completes, the site is live at `https://<your-username>.github.io/<repo-name>/`.

The app uses hash-based routing (`/#/projects/<slug>`) specifically so that refreshing any route on GitHub Pages works without a server-side rewrite rule.
