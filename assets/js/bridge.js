window.__RAPHA_CLONE__ = {
  source: 'https://www.raphamedian.com/',
  mode: 'static-snapshot',
  updatedAt: '2026-03-25'
};

if (typeof window.$ !== 'function') {
  window.$ = (value) => value;
}

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

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      revealWidgets();
      restoreSavedPopupState();
    },
    { once: true }
  );
} else {
  revealWidgets();
  restoreSavedPopupState();
}

window.addEventListener('load', () => {
  revealWidgets();
  restoreSavedPopupState();
});
