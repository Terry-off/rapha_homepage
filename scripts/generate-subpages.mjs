import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { menuTree, pages, siteInfo } from './page-data.mjs';

const root = process.cwd();
const staticRoutePaths = new Set(Object.keys(pages).map((slug) => `/${slug}`));

const htmlEscape = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const isActiveItem = (item, currentPath) =>
  item.href === currentPath || item.children?.some((child) => child.href === currentPath);

const toRouteHref = (href) => {
  if (!href || href === '/') {
    return href || '/';
  }

  return staticRoutePaths.has(href) ? `${href}/index.html` : href;
};

const renderDesktopMenu = (currentPath) =>
  menuTree
    .map((item) => {
      const activeClass = isActiveItem(item, currentPath) ? ' is-active' : '';
      const childrenMarkup = item.children?.length
        ? `
            <div class="site-nav__dropdown" role="menu">
              ${item.children
                .map((child) => {
                  const childClass = child.href === currentPath ? ' is-current' : '';
                  return `<a class="site-nav__dropdown-link${childClass}" href="${toRouteHref(child.href)}" role="menuitem">${htmlEscape(child.label)}</a>`;
                })
                .join('')}
            </div>
          `
        : '';

      return `
        <li class="site-nav__item${activeClass}">
          <a class="site-nav__link" href="${toRouteHref(item.href)}">${htmlEscape(item.label)}</a>
          ${childrenMarkup}
        </li>
      `;
    })
    .join('');

const renderMobileMenu = (currentPath) =>
  menuTree
    .map((item) => {
      const isOpen = isActiveItem(item, currentPath) ? ' open' : '';
      const childrenMarkup = item.children?.length
        ? `
            <details class="mobile-nav__group"${isOpen}>
              <summary class="mobile-nav__summary">
                <a class="mobile-nav__parent-link" href="${toRouteHref(item.href)}">${htmlEscape(item.label)}</a>
              </summary>
              <div class="mobile-nav__children">
                ${item.children
                  .map((child) => {
                    const childClass = child.href === currentPath ? ' is-current' : '';
                    return `<a class="mobile-nav__child${childClass}" href="${toRouteHref(child.href)}">${htmlEscape(child.label)}</a>`;
                  })
                  .join('')}
              </div>
            </details>
          `
        : `<a class="mobile-nav__single" href="${toRouteHref(item.href)}">${htmlEscape(item.label)}</a>`;

      return `<li class="mobile-nav__item">${childrenMarkup}</li>`;
    })
    .join('');

const renderCards = (cards = []) => {
  if (!cards.length) {
    return '';
  }

  return `
    <section class="subpage-section">
      <div class="subpage-container">
        <div class="card-grid">
          ${cards
            .map(
              (card) => `
                <a class="info-card" href="${toRouteHref(card.href)}">
                  <span class="info-card__media">${card.image ? `<img src="${card.image}" alt="${htmlEscape(card.title)}">` : ''}</span>
                  <span class="info-card__body">
                    <strong>${htmlEscape(card.title)}</strong>
                    <span>${htmlEscape(card.text)}</span>
                  </span>
                </a>
              `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
};

const renderFeatureList = (title, items = [], variant = 'feature-list') => {
  if (!items.length) {
    return '';
  }

  return `
    <section class="subpage-section">
      <div class="subpage-container">
        <div class="${variant}">
          <div class="section-heading">
            <p class="section-heading__kicker">${htmlEscape(siteInfo.englishName)}</p>
            <h2>${htmlEscape(title)}</h2>
          </div>
          <div class="${variant}__items">
            ${items
              .map(
                (item, index) => `
                  <article class="${variant}__item">
                    <span class="${variant}__index">${String(index + 1).padStart(2, '0')}</span>
                    <p>${htmlEscape(item)}</p>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>
  `;
};

const renderBody = (body = []) => {
  if (!body.length) {
    return '';
  }

  return `
    <section class="subpage-section">
      <div class="subpage-container subpage-container--narrow">
        <div class="section-heading">
          <p class="section-heading__kicker">${htmlEscape(siteInfo.englishName)}</p>
          <h2>상세 안내</h2>
        </div>
        <div class="prose-block">
          ${body.map((paragraph) => `<p>${htmlEscape(paragraph)}</p>`).join('')}
        </div>
      </div>
    </section>
  `;
};

const renderImageSections = (imageSections = []) => {
  if (!imageSections.length) {
    return '';
  }

  return `
    <section class="subpage-section">
      <div class="subpage-container subpage-container--wide">
        <div class="image-stack">
          ${imageSections
            .map(
              (image) => `
                <figure class="image-stack__item">
                  <img src="${image.src}" alt="${htmlEscape(image.alt)}" loading="lazy">
                </figure>
              `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
};

const renderLocation = () => `
  <section class="subpage-section">
    <div class="subpage-container">
      <div class="location-panel">
        <div class="location-panel__content">
          <p class="section-heading__kicker">${htmlEscape(siteInfo.englishName)}</p>
          <h2>오시는 길</h2>
          <p class="location-panel__address">${htmlEscape(siteInfo.address)}</p>
          <ul class="location-panel__list">
            ${siteInfo.addressDetail.map((item) => `<li>${htmlEscape(item)}</li>`).join('')}
          </ul>
          <div class="location-panel__actions">
            <a class="action-button" href="tel:${siteInfo.phone.replaceAll('-', '')}">전화 문의</a>
            <a class="action-button action-button--ghost" href="${toRouteHref('/23')}">상세 위치 보기</a>
          </div>
        </div>
        <div class="location-panel__media">
          <img src="${siteInfo.mapImage}" alt="라파연세통증의원 위치 안내" loading="lazy">
        </div>
      </div>
    </div>
  </section>
`;

const renderNote = (note) => {
  if (!note) {
    return '';
  }

  return `
    <section class="subpage-section subpage-section--compact">
      <div class="subpage-container subpage-container--narrow">
        <div class="note-panel">
          <strong>안내</strong>
          <p>${htmlEscape(note)}</p>
        </div>
      </div>
    </section>
  `;
};

const renderFooter = () => `
  <footer class="site-footer">
    <div class="site-footer__logo">
      <img src="${siteInfo.logo}" alt="${htmlEscape(siteInfo.name)}">
    </div>
    <nav class="site-footer__nav" aria-label="푸터 메뉴">
      ${menuTree.map((item) => `<a href="${toRouteHref(item.href)}">${htmlEscape(item.label)}</a>`).join('')}
    </nav>
    <div class="site-footer__meta">
      <p>${htmlEscape(siteInfo.name)}</p>
      <p>${htmlEscape(siteInfo.address)}</p>
      <p>대표번호 ${htmlEscape(siteInfo.phone)}</p>
    </div>
    <div class="site-footer__links">
      <a href="/?mode=policy">이용약관</a>
      <a href="/?mode=privacy">개인정보처리방침</a>
      <a href="${siteInfo.blogUrl}" target="_blank" rel="noreferrer">네이버 블로그</a>
    </div>
  </footer>
`;

const renderPage = (page) => {
  const currentPath = `/${page.slug}`;
  const overviewBlock = renderCards(page.cards);
  const highlightBlock = renderFeatureList('핵심 포인트', page.highlights);
  const bodyBlock = renderBody(page.body);
  const symptomBlock = renderFeatureList('이런 경우 함께 살펴봅니다', page.symptoms, 'detail-list');
  const careBlock = renderFeatureList('라파연세 진료 포인트', page.carePoints, 'detail-list');
  const imageBlock = renderImageSections(page.imageSections);
  const noteBlock = renderNote(page.note);
  const heroImage = page.heroImage
    ? `
        <div class="hero-panel__media">
          <img src="${page.heroImage}" alt="${htmlEscape(page.title)}" loading="eager">
        </div>
      `
    : '';

  return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#3182f6">
    <meta name="generator" content="Codex static submenu generator">
    <title>${htmlEscape(page.title)} | ${htmlEscape(siteInfo.name)}</title>
    <meta name="description" content="${htmlEscape(page.description || page.lead)}">
    <link rel="canonical" href="https://raphamedian.com/${page.slug}">
    <link rel="preconnect" href="https://cdn.imweb.me">
    <link rel="preconnect" href="https://vendor-cdn.imweb.me">
    <link rel="stylesheet" href="https://vendor-cdn.imweb.me/fonts/pretendard/web/variable/pretendardvariable.css?1669875619">
    <link rel="stylesheet" href="/assets/css/subpages.css">
  </head>
  <body class="rapha-subpage">
    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-header__brand" href="/">
          <img src="${siteInfo.logo}" alt="${htmlEscape(siteInfo.name)}">
        </a>
        <nav class="site-nav" aria-label="주 메뉴">
          <ul class="site-nav__list">
            ${renderDesktopMenu(currentPath)}
          </ul>
        </nav>
        <div class="site-header__actions">
          <a class="site-header__cta" href="tel:${siteInfo.phone.replaceAll('-', '')}">진료문의</a>
          <button class="site-header__toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="메뉴 열기">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
      <button class="mobile-nav__backdrop" type="button" aria-label="메뉴 닫기"></button>
      <aside class="mobile-nav__drawer">
        <div class="mobile-nav__header">
          <img src="${siteInfo.logo}" alt="${htmlEscape(siteInfo.name)}">
        </div>
        <ul class="mobile-nav__list">
          ${renderMobileMenu(currentPath)}
        </ul>
      </aside>
    </div>

    <main>
      <section class="hero-panel">
        <div class="subpage-container hero-panel__inner">
          <div class="hero-panel__content">
            <p class="hero-panel__kicker">${htmlEscape(page.kicker || siteInfo.englishName)}</p>
            <h1>${htmlEscape(page.title)}</h1>
            <p class="hero-panel__lead">${htmlEscape(page.lead)}</p>
            <p class="hero-panel__description">${htmlEscape(page.description || '')}</p>
            <div class="hero-panel__actions">
              <a class="action-button" href="/">메인으로 돌아가기</a>
              <a class="action-button action-button--ghost" href="tel:${siteInfo.phone.replaceAll('-', '')}">전화 문의</a>
            </div>
          </div>
          ${heroImage}
        </div>
      </section>

      ${overviewBlock}
      ${highlightBlock}
      ${bodyBlock}
      ${symptomBlock}
      ${careBlock}
      ${imageBlock}
      ${noteBlock}
      ${renderLocation()}
    </main>

    ${renderFooter()}
    <script type="module" src="/assets/js/subpages.js"></script>
  </body>
</html>`;
};

export const generateSubpages = () => {
  for (const page of Object.values(pages)) {
    const dirPath = path.join(root, page.slug);
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(path.join(dirPath, 'index.html'), renderPage(page));
  }
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateSubpages();
  console.log(`Generated ${Object.keys(pages).length} submenu pages`);
}
