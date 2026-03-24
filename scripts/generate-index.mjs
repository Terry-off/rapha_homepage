import fs from 'node:fs';
import path from 'node:path';
import { generateSubpages, STATIC_ROUTE_SLUGS } from './generate-subpages.mjs';

const root = process.cwd();
const sourcePath = path.join(root, 'reference', 'playwright-snapshot.html');
const rootPages = ['index.html', '404.html'];
const SITE_ORIGIN = 'https://www.raphamedian.com';
const routePaths = STATIC_ROUTE_SLUGS.map((slug) => `/${slug}`);

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Missing source snapshot: ${sourcePath}`);
}

let html = fs.readFileSync(sourcePath, 'utf8');
const routeRedirectScript = `
<script>
  (function () {
    const staticRoutes = new Set(${JSON.stringify(routePaths)});
    const normalizedPath = window.location.pathname.replace(/\\/index\\.html$/i, '').replace(/\\/$/, '') || '/';

    if (!staticRoutes.has(normalizedPath)) {
      return;
    }

    window.location.replace(normalizedPath + '/index.html' + window.location.search + window.location.hash);
  })();
</script>`;

html = html
  .replace(/\b(href|src|action)=("|')\/(?!\/)/g, `$1=$2${SITE_ORIGIN}/`)
  .replace(/\b(href|src)=("|')\/\/(?!\/)/g, `$1=$2https://`)
  .replace(/url\((["']?)\/(?!\/)/g, `url($1${SITE_ORIGIN}/`)
  .replace(/<script\b(?![^>]*type=["']application\/ld\+json["'])[\s\S]*?<\/script>/gi, '')
  .replace(/<head>/i, `<head>\n<meta name="generator" content="Codex static snapshot of raphamedian.com">`)
  .replace(
    /<\/head>/i,
    `\n<link rel="stylesheet" href="./assets/css/clone-fixes.css">\n</head>`
  )
  .replace(
    /<\/body>/i,
    `\n<script type="module" src="./assets/js/bridge.js"></script>\n</body>`
  );

fs.writeFileSync(path.join(root, 'index.html'), html);
fs.writeFileSync(
  path.join(root, '404.html'),
  html.replace(/<\/body>/i, `${routeRedirectScript}\n</body>`)
);

await generateSubpages();

console.log(`Generated ${rootPages.join(', ')} and submenu pages from ${path.basename(sourcePath)}`);
