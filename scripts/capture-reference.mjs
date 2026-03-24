import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const outputDir = path.join(root, 'screenshots', 'reference');

await fs.promises.mkdir(outputDir, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 }
];

const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1, locale: 'ko-KR' });
    await page.goto('https://www.raphamedian.com/', { waitUntil: 'networkidle', timeout: 120000 });
    await page.screenshot({
      path: path.join(outputDir, `${viewport.name}.png`),
      fullPage: true
    });
    await page.close();
    console.log(`Captured reference ${viewport.name}`);
  }
} finally {
  await browser.close();
}
