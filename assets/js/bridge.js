window.__RAPHA_CLONE__ = {
  source: 'https://www.raphamedian.com/',
  mode: 'static-snapshot',
  updatedAt: '2026-03-25'
};

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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', revealWidgets, { once: true });
} else {
  revealWidgets();
}

window.addEventListener('load', revealWidgets);
