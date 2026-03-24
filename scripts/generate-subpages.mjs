import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
const IMWEB_ORIGIN = 'https://raphamedian.imweb.me';
const MIRRORED_GLOBAL_COMPAT_CSS = `<style>
body#doz_body #doz_footer_wrap .footer-section {
  padding: 50px 0 !important;
}

body#doz_body #doz_footer_wrap,
body#doz_body #doz_footer,
body#doz_body #doz_footer .footer-section,
body#doz_body #doz_footer .inside,
body#doz_body #doz_footer .doz_row {
  height: auto !important;
  min-height: 0 !important;
}

body#doz_body #doz_footer .inside,
body#doz_body #doz_footer .doz_row {
  display: flow-root !important;
}

body#doz_body #doz_footer .inside::after,
body#doz_body #doz_footer .doz_row::after {
  content: '';
  display: block;
  clear: both;
}

body#doz_body #doz_footer_wrap .inside {
  margin-left: 130px !important;
  margin-right: 130px !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
}

@media (max-width: 991px) {
  body#doz_body #doz_footer_wrap,
  body#doz_body #doz_footer,
  body#doz_body #doz_footer .footer-section {
    min-height: 220px !important;
  }

  body#doz_body #doz_footer_wrap .inside {
    margin-left: 20px !important;
    margin-right: 20px !important;
  }
}
</style>`;
const createPrivacyCompatCss = (formId) => `<style>
.doz_sys #${formId} .form-group.privacy .form-control {
  height: 160px !important;
  min-height: 160px !important;
  padding: 10px !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  line-height: 25.7143px !important;
  white-space: normal !important;
  word-break: keep-all !important;
  overflow-wrap: break-word !important;
}
</style>`;
const MIRRORED_COMPAT_CSS_BY_SLUG = {
  '23': createPrivacyCompatCss('addFormw2025112066e541ac21198'),
  '26': createPrivacyCompatCss('addFormw20251120e6d8f7b7e69ce')
};

export const STATIC_ROUTE_SLUGS = [
  'service',
  '21',
  '24',
  '23',
  'prolo',
  '25',
  '26',
  'download',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  'news',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40'
];

const STATIC_ROUTE_PATHS = new Set(STATIC_ROUTE_SLUGS.map((slug) => `/${slug}`));
const REDIRECT_ROUTES = {
  service: '21',
  prolo: '25',
  download: '27',
  news: '33',
  '37': '38'
};

const MIRROR_ROUTES = STATIC_ROUTE_SLUGS.filter((slug) => !Object.hasOwn(REDIRECT_ROUTES, slug));

const withIndexHtml = (pathname, search = '', hash = '') => {
  if (pathname === '/') {
    return `/${search}${hash}`;
  }

  const normalizedPath = pathname.replace(/\/$/, '');
  return `${normalizedPath}/index.html${search}${hash}`;
};

const rewriteAnchorHref = (rawPath) => {
  const url = new URL(rawPath, IMWEB_ORIGIN);
  const normalizedPath = url.pathname.replace(/\/$/, '') || '/';

  if (normalizedPath === '/') {
    return `/${url.search}${url.hash}`;
  }

  if (STATIC_ROUTE_PATHS.has(normalizedPath)) {
    return withIndexHtml(normalizedPath, url.search, url.hash);
  }

  return `${IMWEB_ORIGIN}${url.pathname}${url.search}${url.hash}`;
};

const transformMirroredHtml = (html, slug) => {
  const currentRoute = `/${slug}`;
  const compatCss = `${MIRRORED_GLOBAL_COMPAT_CSS}${MIRRORED_COMPAT_CSS_BY_SLUG[slug] ?? ''}`;

  return html
    .replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="https://raphamedian.com${withIndexHtml(currentRoute)}"`)
    .replace(/<link rel="canonical" href="[^"]*"/i, `<link rel="canonical" href="https://raphamedian.com${withIndexHtml(currentRoute)}"`)
    .replace(/(<link\b[^>]*href=)(["'])\/(?!\/)/gi, `$1$2${IMWEB_ORIGIN}/`)
    .replace(/\b(src|action)=("|')\/(?!\/)/gi, `$1=$2${IMWEB_ORIGIN}/`)
    .replace(/\b(href|src)=("|')\/\/(?!\/)/gi, `$1=$2https://`)
    .replace(/url\((["']?)\/(?!\/)/gi, `url($1${IMWEB_ORIGIN}/`)
    .replace(
      /(<a\b[^>]*\shref=)(["'])https?:\/\/(?:www\.)?raphamedian(?:\.com|\.imweb\.me)(\/[^"']*)\2/gi,
      (_, prefix, quote, pathname) => `${prefix}${quote}${rewriteAnchorHref(pathname)}${quote}`
    )
    .replace(
      /(<a\b[^>]*\shref=)(["'])\/(?!\/)([^"']*)\2/gi,
      (_, prefix, quote, pathname) => `${prefix}${quote}${rewriteAnchorHref(`/${pathname}`)}${quote}`
    )
    .replace(/<head>/i, `<head>\n<meta name="generator" content="Codex mirrored snapshot of raphamedian.imweb.me">`)
    .replace(/<\/head>/i, `${compatCss}\n</head>`);
};

const createRedirectHtml = (fromSlug, toSlug) => `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta http-equiv="refresh" content="0; url=/${toSlug}/index.html">
    <meta name="generator" content="Codex mirrored submenu redirect">
    <title>Redirecting...</title>
    <link rel="canonical" href="https://raphamedian.com/${toSlug}/index.html">
    <script>
      window.location.replace('/${toSlug}/index.html' + window.location.search + window.location.hash);
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="/${toSlug}/index.html">/${toSlug}/index.html</a></p>
  </body>
</html>
`;

const writeRouteFile = (slug, html) => {
  const dirPath = path.join(root, slug);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, 'index.html'), html);
};

const fetchRouteHtml = async (slug) => {
  const response = await fetch(`${IMWEB_ORIGIN}/${slug}`, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${slug}: ${response.status}`);
  }

  return response.text();
};

export const generateSubpages = async () => {
  for (const [fromSlug, toSlug] of Object.entries(REDIRECT_ROUTES)) {
    writeRouteFile(fromSlug, createRedirectHtml(fromSlug, toSlug));
  }

  for (const slug of MIRROR_ROUTES) {
    const html = await fetchRouteHtml(slug);
    writeRouteFile(slug, transformMirroredHtml(html, slug));
  }
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generateSubpages();
  console.log(`Generated ${STATIC_ROUTE_SLUGS.length} mirrored submenu routes`);
}
