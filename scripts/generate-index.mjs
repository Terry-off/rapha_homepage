import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourcePath = path.join(root, 'reference', 'playwright-snapshot.html');
const targetPath = path.join(root, 'index.html');

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Missing source snapshot: ${sourcePath}`);
}

let html = fs.readFileSync(sourcePath, 'utf8');

const SITE_ORIGIN = 'https://www.raphamedian.com';

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

fs.writeFileSync(targetPath, html);
console.log(`Generated ${path.basename(targetPath)} from ${path.basename(sourcePath)}`);
