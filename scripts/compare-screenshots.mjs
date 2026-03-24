import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const root = process.cwd();
const referenceDir = path.join(root, 'screenshots', 'reference');
const localDir = path.join(root, 'screenshots', 'local');
const diffDir = path.join(root, 'screenshots', 'diff');

await fs.promises.mkdir(diffDir, { recursive: true });

const names = ['desktop', 'tablet', 'mobile'];

for (const name of names) {
  const refPath = path.join(referenceDir, `${name}.png`);
  const localPath = path.join(localDir, `${name}.png`);

  if (!fs.existsSync(refPath) || !fs.existsSync(localPath)) {
    console.log(`Skipping ${name}: screenshot missing`);
    continue;
  }

  const ref = PNG.sync.read(fs.readFileSync(refPath));
  const local = PNG.sync.read(fs.readFileSync(localPath));

  const width = Math.min(ref.width, local.width);
  const height = Math.min(ref.height, local.height);
  const refCrop = new PNG({ width, height });
  const localCrop = new PNG({ width, height });
  PNG.bitblt(ref, refCrop, 0, 0, width, height, 0, 0);
  PNG.bitblt(local, localCrop, 0, 0, width, height, 0, 0);

  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(refCrop.data, localCrop.data, diff.data, width, height, {
    threshold: 0.12
  });

  fs.writeFileSync(path.join(diffDir, `${name}.png`), PNG.sync.write(diff));

  const total = width * height;
  const percent = ((diffPixels / total) * 100).toFixed(3);
  console.log(
    `${name}: ${diffPixels} pixels differ (${percent}%) on shared area ${width}x${height} (reference ${ref.width}x${ref.height}, local ${local.width}x${local.height})`
  );
}
