# homepage_rapha

Static snapshot rebuild of [raphamedian.com](https://www.raphamedian.com/) prepared for GitHub Pages.

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
|   `-- prepare-pages.mjs
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

This rebuilds `index.html` and `404.html` from `reference/playwright-snapshot.html`.

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

- The snapshot keeps remote asset URLs from the live site and CDN.
- `assets/css/clone-fixes.css` restores spacing and forces animated widgets visible for static hosting.
- `assets/js/bridge.js` reveals widgets that were captured with inline hidden styles.
