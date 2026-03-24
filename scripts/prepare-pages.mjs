import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist-pages');

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

const copy = (from, to) => {
  fs.cpSync(path.join(root, from), path.join(distDir, to), { recursive: true });
};

copy('index.html', 'index.html');
copy('404.html', '404.html');
copy('assets', 'assets');

fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

console.log('Prepared dist-pages artifact');
