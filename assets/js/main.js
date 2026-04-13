async function includePartials() {
  const nodes = document.querySelectorAll('[data-include]');
  await Promise.all([...nodes].map(async (node) => {
    const url = node.getAttribute('data-include');
    const res = await fetch(url);
    if (!res.ok) return;
    node.innerHTML = await res.text();
  }));
}

function setActiveNav() {
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
    if (href && href === current) a.setAttribute('aria-current','page');
  });
}

function bindMenuButton() {
  const btn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('.nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(nav.classList.contains('open')));
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await includePartials();
  setActiveNav();
  bindMenuButton();
});
