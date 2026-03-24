const source = 'https://www.raphamedian.com/';
const shell = document.querySelector('[data-site-shell]');
const frame = document.querySelector('[data-site-frame]');
const fallback = document.querySelector('[data-site-fallback]');
const sourceLinks = document.querySelectorAll('[data-open-source]');

const showFallback = () => {
  shell?.classList.add('is-fallback');
  fallback?.removeAttribute('hidden');
};

for (const link of sourceLinks) {
  link.href = source;
}

let loaded = false;
const fallbackTimer = window.setTimeout(() => {
  if (!loaded) {
    showFallback();
  }
}, 12000);

frame?.addEventListener('load', () => {
  loaded = true;
  window.clearTimeout(fallbackTimer);
});

frame?.addEventListener('error', () => {
  window.clearTimeout(fallbackTimer);
  showFallback();
});

window.__RAPHA_CLONE__ = {
  mode: 'live-frame',
  source,
  updatedAt: '2026-03-25'
};
