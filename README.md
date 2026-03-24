# homepage_rapha

GitHub Pages wrapper for [raphamedian.com](https://www.raphamedian.com/) prepared to preserve the live layout and interactions as closely as possible on static hosting.

## Folder structure

```text
homepage_rapha/
|-- assets/
|   |-- css/
|   |   `-- clone-fixes.css
|   `-- js/
|       `-- bridge.js
|-- docs/
|   `-- section-map.md
|-- reference/
|   `-- playwright-snapshot.html
|-- scripts/
|   |-- capture-local.mjs
|   |-- capture-reference.mjs
|   |-- compare-screenshots.mjs
|   |-- generate-index.mjs
|   |-- prepare-pages.mjs
|   `-- site-frame-template.mjs
|-- 404.html
|-- index.html
|-- .nojekyll
|-- package.json
`-- README.md
```

## Run

```bash
npm install
npm run build
npm run dev
```

Default local URL:

```text
http://127.0.0.1:4173
```

## Re-generate the deploy entry

```bash
npm run build
```

This rebuilds `index.html` and `404.html` from the live frame template.

## GitHub Pages deploy

This repository can be published directly from the repository root.

On GitHub:

1. Open `Settings`
2. Open `Pages`
3. Under `Build and deployment`, set `Source` to `Deploy from a branch`
4. Select branch `main`
5. Select folder `/(root)`
6. Save

The committed deploy entry files are:

- `index.html`
- `404.html`
- `assets/`
- `.nojekyll`

## Visual verification

```bash
npm run capture:reference
npm run capture:local
npm run compare
```

Generated screenshots are stored in `screenshots/`.

## Notes

- The committed page uses a full-viewport iframe pointed at the live origin to preserve spacing, typography, hover states, animations, and popup behavior.
- `assets/css/clone-fixes.css` styles only the outer frame shell and fallback state.
- `assets/js/bridge.js` handles iframe load success and a minimal fallback if embedding is delayed or blocked.

## Difference from the original

- The GitHub Pages entry itself is only a shell. The rendered experience comes from the live site inside the frame.
- If a browser blocks third-party framing in a specific environment, the fallback button opens the original site in a new tab.
