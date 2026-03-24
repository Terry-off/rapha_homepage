const RAPHA_HOSTS = new Set(['raphamedian.com', 'www.raphamedian.com']);
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
      // Ignore malformed href values.
    }
  }
};

const bindMobileMenu = () => {
  const toggle = document.querySelector('.site-header__toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const backdrop = document.querySelector('.mobile-nav__backdrop');

  if (!toggle || !mobileNav || !backdrop) {
    return;
  }

  const openMenu = () => {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    if (mobileNav.classList.contains('is-open')) {
      closeMenu();
      return;
    }

    openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  mobileNav.addEventListener('click', (event) => {
    const target = event.target;

    if (target instanceof HTMLAnchorElement) {
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
};

normalizeInternalLinks();
bindMobileMenu();
