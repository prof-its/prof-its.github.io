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

function bindLangToggle(){
  const ua = document.getElementById('lang-ua');
  const en = document.getElementById('lang-en');
  if(!ua || !en) return;

  const file = (location.pathname.split('/').pop() || 'index.html');
  const isEn = file.toLowerCase().endsWith('-en.html');

  const toEn = (name) => {
    if(name.toLowerCase().endsWith('-en.html')) return name;
    const m = name.match(/^(.*)\.html$/i);
    return m ? `${m[1]}-en.html` : name + '-en';
  };

  const toUa = (name) => name.replace(/-en\.html$/i, '.html');

  ua.setAttribute('href', isEn ? toUa(file) : file);
  en.setAttribute('href', isEn ? file : toEn(file));

  if(isEn){
    en.setAttribute('aria-current','true');
    ua.removeAttribute('aria-current');
  } else {
    ua.setAttribute('aria-current','true');
    en.removeAttribute('aria-current');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await includePartials();
  setActiveNav();
  bindMenuButton();
  bindLangToggle();
});
