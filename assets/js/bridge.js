window.__RAPHA_CLONE__ = {
  source: 'https://www.raphamedian.com/',
  mode: 'static-snapshot',
  updatedAt: '2026-03-25'
};

window.SITE = window.SITE || {};

if (typeof window.$ !== 'function') {
  window.$ = (value) => value;
}

const RAPHA_HOSTS = new Set(['raphamedian.com', 'www.raphamedian.com', 'raphamedian.imweb.me']);
const STATIC_ROUTE_PATHS = new Set([
  '/service',
  '/21',
  '/24',
  '/23',
  '/prolo',
  '/25',
  '/26',
  '/download',
  '/27',
  '/28',
  '/29',
  '/30',
  '/31',
  '/32',
  '/news',
  '/33',
  '/34',
  '/35',
  '/36',
  '/37',
  '/38',
  '/39',
  '/40'
]);

document.documentElement.style.scrollBehavior = 'smooth';
document.body.classList.add('page_ready');

const revealWidgets = () => {
  const hiddenNodes = document.querySelectorAll(
    "._widget_data, [data-widget-anim], [style*='visibility: hidden']"
  );

  for (const node of hiddenNodes) {
    node.style.visibility = 'visible';
    node.style.opacity = '1';
    node.style.transform = 'none';
    node.style.animation = 'none';
  }
};

const openAbsoluteUrl = (url) => {
  if (!url) {
    return;
  }

  window.location.href = url;
};

const normalizeInternalLinks = () => {
  const links = document.querySelectorAll('a[href]');

  for (const link of links) {
    const rawHref = link.getAttribute('href');

    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('tel:') || rawHref.startsWith('mailto:')) {
      continue;
    }

    try {
      const url = new URL(rawHref, window.location.href);
      const normalizedPath = url.pathname.replace(/\/index\.html$/i, '').replace(/\/$/, '') || '/';

      if (!RAPHA_HOSTS.has(url.hostname)) {
        continue;
      }

      const href = STATIC_ROUTE_PATHS.has(normalizedPath)
        ? `${normalizedPath}/index.html${url.search}${url.hash}`
        : `${url.pathname}${url.search}${url.hash}`;

      link.setAttribute('href', href);
    } catch {
      // Ignore malformed href values in snapshot markup.
    }
  }
};

if (typeof window.SITE.openPolicy !== 'function') {
  window.SITE.openPolicy = () => openAbsoluteUrl('https://www.raphamedian.com/?mode=policy');
}

if (typeof window.SITE.openPrivacy !== 'function') {
  window.SITE.openPrivacy = () => openAbsoluteUrl('https://www.raphamedian.com/?mode=privacy');
}

const popupStorageKey = (id) => `rapha-popup-hidden:${id}`;

const getPopupElement = (id) => {
  if (!id) {
    return null;
  }

  return document.getElementById(`popup_${id}`);
};

const hidePopupElement = (popup) => {
  if (!popup) {
    return;
  }

  popup.classList.add('is-hidden');
  popup.setAttribute('aria-hidden', 'true');
};

const restoreSavedPopupState = () => {
  const popups = document.querySelectorAll('.popup-banner-wrap .pop-container[data-pop]');
  const now = Date.now();

  for (const popup of popups) {
    const id = popup.getAttribute('data-pop');
    const raw = window.localStorage.getItem(popupStorageKey(id));

    if (!raw) {
      continue;
    }

    const expiresAt = Number(raw);

    if (Number.isFinite(expiresAt) && expiresAt > now) {
      hidePopupElement(popup);
      continue;
    }

    window.localStorage.removeItem(popupStorageKey(id));
  }
};

window.popupClose = (id) => {
  hidePopupElement(getPopupElement(id));
  return false;
};

window.popupCookieMake = (id) => {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  window.localStorage.setItem(popupStorageKey(id), String(expiresAt));
  hidePopupElement(getPopupElement(id));
  return false;
};

const createMenuLink = (href, text, className) => {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = text;
  link.className = className;
  return link;
};

const restoreDesktopMenus = () => {
  const widgets = document.querySelectorAll('#doz_header_wrap [data-widget-type="inline_menu"]');

  for (const widget of widgets) {
    const visibleMenu = widget.querySelector('.viewport-nav.desktop._main_menu');
    const cloneMenu = widget.querySelector('.viewport-nav.desktop._main_clone_menu');

    if (!visibleMenu || !cloneMenu) {
      continue;
    }

    const currentItems = [...visibleMenu.children].filter(
      (item) => item.tagName === 'LI' && !item.classList.contains('_more_menu')
    );
    const cloneItems = [...cloneMenu.children].filter(
      (item) => item.tagName === 'LI' && !item.classList.contains('_more_menu')
    );

    if (!cloneItems.length) {
      continue;
    }

    const needsRestore =
      visibleMenu.querySelector(':scope > li._more_menu') ||
      currentItems.length < cloneItems.length;

    if (!needsRestore) {
      continue;
    }

    visibleMenu.innerHTML = cloneMenu.innerHTML;
  }
};

const buildMobileMenu = () => {
  if (document.querySelector('.rapha-mobile-menu-toggle')) {
    return;
  }

  const sourceRoot =
    document.querySelector('#doz_header_wrap ._main_clone_menu') ||
    document.querySelector('#doz_header_wrap .main_clone_menu') ||
    document.querySelector('#doz_header_wrap .viewport-nav.desktop._main_menu');

  if (!sourceRoot) {
    return;
  }

  const sourceItems = [...sourceRoot.children].filter(
    (item) => item.tagName === 'LI' && !item.classList.contains('_more_menu')
  );

  if (!sourceItems.length) {
    return;
  }

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'rapha-mobile-menu-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'rapha-mobile-menu');
  toggle.setAttribute('aria-label', '모바일 메뉴 열기');
  toggle.innerHTML = '<span></span><span></span><span></span>';

  const menu = document.createElement('div');
  menu.className = 'rapha-mobile-menu';
  menu.id = 'rapha-mobile-menu';
  menu.innerHTML = `
    <button type="button" class="rapha-mobile-menu__backdrop" aria-label="메뉴 닫기"></button>
    <aside class="rapha-mobile-menu__drawer" aria-hidden="true">
      <p class="rapha-mobile-menu__title">SITE MENU</p>
      <nav class="rapha-mobile-menu__nav" aria-label="모바일 메뉴">
        <ul class="rapha-mobile-menu__list"></ul>
      </nav>
    </aside>
  `;

  const list = menu.querySelector('.rapha-mobile-menu__list');

  for (const item of sourceItems) {
    const topLink = item.querySelector(':scope > a[href]');

    if (!topLink) {
      continue;
    }

    const li = document.createElement('li');
    li.className = 'rapha-mobile-menu__item';
    li.appendChild(
      createMenuLink(
        topLink.href,
        (topLink.textContent || '').trim(),
        'rapha-mobile-menu__link'
      )
    );

    const childLinks = [...item.querySelectorAll(':scope > ul > li > a[href]')];

    if (childLinks.length) {
      const subList = document.createElement('ul');
      subList.className = 'rapha-mobile-menu__sublist';

      for (const child of childLinks) {
        const subItem = document.createElement('li');
        subItem.appendChild(
          createMenuLink(
            child.href,
            (child.textContent || '').trim(),
            'rapha-mobile-menu__sublink'
          )
        );
        subList.appendChild(subItem);
      }

      li.appendChild(subList);
    }

    list.appendChild(li);
  }

  const openMenu = () => {
    document.body.classList.add('rapha-mobile-menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    menu.querySelector('.rapha-mobile-menu__drawer')?.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    document.body.classList.remove('rapha-mobile-menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.querySelector('.rapha-mobile-menu__drawer')?.setAttribute('aria-hidden', 'true');
  };

  toggle.addEventListener('click', () => {
    if (document.body.classList.contains('rapha-mobile-menu-open')) {
      closeMenu();
      return;
    }

    openMenu();
  });

  menu.querySelector('.rapha-mobile-menu__backdrop')?.addEventListener('click', closeMenu);
  menu.querySelector('.rapha-mobile-menu__nav')?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
      closeMenu();
    }
  });

  document.body.append(toggle, menu);
};

const restoreVisualCarousel = () => {
  const section = document.querySelector('#s20251120fc103ab30a460');
  const outer = section?.querySelector('.owl-stage-outer');
  const stage = section?.querySelector('.owl-stage');

  if (!section || !outer || !stage) {
    return;
  }

  const items = [...stage.querySelectorAll(':scope > .owl-item')];
  const realItems = items.filter((item) => !item.classList.contains('cloned'));
  const dots = [...section.querySelectorAll('.owl-dot')];

  if (!items.length || !realItems.length) {
    return;
  }

  const options = {
    effectWaitMs: 4000,
    effectTimeMs: 700
  };

  section.classList.add('rapha-visual-fade');

  const getActiveRealIndex = () => {
    const activeDotIndex = dots.findIndex((dot) => dot.classList.contains('active'));

    if (activeDotIndex >= 0) {
      return activeDotIndex;
    }

    const activeRealItemIndex = realItems.findIndex((item) => item.classList.contains('active'));
    return activeRealItemIndex >= 0 ? activeRealItemIndex : 0;
  };

  const applyLayout = (requestedIndex, immediate = false) => {
    const width = Math.round(outer.getBoundingClientRect().width);
    const visualHeight = Math.round(
      section.getBoundingClientRect().height ||
        section.querySelector('.visual_section')?.getBoundingClientRect().height ||
        0
    );

    if (!width || !visualHeight) {
      return;
    }

    const realIndex = Math.max(0, Math.min(requestedIndex, realItems.length - 1));

    for (const item of items) {
      item.style.marginRight = '0px';
      item.style.width = `${width}px`;
    }

    outer.style.height = `${visualHeight}px`;
    outer.style.minHeight = `${visualHeight}px`;
    stage.style.width = `${width}px`;
    stage.style.height = `${visualHeight}px`;
    stage.style.minHeight = `${visualHeight}px`;
    stage.style.transform = 'none';
    stage.style.transition = 'none';
    section.dataset.raphaCarouselIndex = String(realIndex);

    realItems.forEach((item, index) => {
      item.classList.toggle('active', index === realIndex);
      item.classList.toggle('rapha-is-active', index === realIndex);
      item.setAttribute('aria-hidden', index === realIndex ? 'false' : 'true');
      item.style.transitionDuration = `${immediate ? 0 : options.effectTimeMs}ms`;
      item.style.height = `${visualHeight}px`;
    });

    items
      .filter((item) => item.classList.contains('cloned'))
      .forEach((item) => {
        item.classList.remove('active', 'rapha-is-active');
        item.setAttribute('aria-hidden', 'true');
      });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === realIndex);
      dot.style.cursor = 'pointer';
    });
  };

  const startAutoplay = () => {
    if (section.__raphaCarouselTimer) {
      window.clearInterval(section.__raphaCarouselTimer);
    }

    section.__raphaCarouselTimer = window.setInterval(() => {
      const currentIndex = Number(section.dataset.raphaCarouselIndex || '0');
      const nextIndex = (currentIndex + 1) % realItems.length;
      applyLayout(nextIndex);
    }, options.effectWaitMs);
  };

  const stopAutoplay = () => {
    if (section.__raphaCarouselTimer) {
      window.clearInterval(section.__raphaCarouselTimer);
      section.__raphaCarouselTimer = 0;
    }
  };

  if (section.dataset.raphaCarouselBound !== 'true') {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (event) => {
        event.preventDefault();
        applyLayout(index);
        startAutoplay();
      });
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
        return;
      }

      startAutoplay();
    });

    section.dataset.raphaCarouselBound = 'true';
  }

  const savedIndex = Number(section.dataset.raphaCarouselIndex);
  applyLayout(Number.isFinite(savedIndex) ? savedIndex : getActiveRealIndex(), true);
  startAutoplay();
};

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      revealWidgets();
      normalizeInternalLinks();
      restoreSavedPopupState();
      restoreDesktopMenus();
      buildMobileMenu();
      restoreVisualCarousel();
    },
    { once: true }
  );
} else {
  revealWidgets();
  normalizeInternalLinks();
  restoreSavedPopupState();
  restoreDesktopMenus();
  buildMobileMenu();
  restoreVisualCarousel();
}

window.addEventListener('load', () => {
  revealWidgets();
  normalizeInternalLinks();
  restoreSavedPopupState();
  restoreDesktopMenus();
  buildMobileMenu();
  restoreVisualCarousel();
});

window.addEventListener('resize', () => {
  normalizeInternalLinks();
  restoreDesktopMenus();
  restoreVisualCarousel();
});
