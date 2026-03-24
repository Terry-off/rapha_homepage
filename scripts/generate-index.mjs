import fs from 'node:fs';
import path from 'node:path';

import { renderSiteFrameHtml } from './site-frame-template.mjs';

const root = process.cwd();
const pages = ['index.html', '404.html'];
const html = renderSiteFrameHtml();

for (const page of pages) {
  const targetPath = path.join(root, page);
  fs.writeFileSync(targetPath, html);
}

console.log(`Generated ${pages.join(', ')} from live frame template`);
