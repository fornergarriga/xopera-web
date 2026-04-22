/* =====================================================
   LA XOPERA — Navegació Compartida
   Injecta nav, gestiona transicions i scroll reveal
   ===================================================== */
(function () {
  const LINKS = [
    ['edicions-anteriors.html', 'Edicions Anteriors'],
    ['proxima-edicio.html',     'Pròxima Edició'],
    ['xarxes-socials.html',     'Xarxes Socials'],
    ['marxandising.html',       'Botiga'],
    ['manifest.html',           'Manifest'],
    ['socis.html',              'Socis'],
    ['contacte.html',           'Contacte'],
  ];

  const current = location.pathname.split('/').pop() || 'index.html';

  /* ── Injecta nav ── */
  const nav = document.createElement('nav');
  nav.className = 'main-nav';
  nav.innerHTML = `
    <a href="index.html" class="nav-logo" data-trans>
      <img src="assets/logo-white-red.png" alt="La Xopera Festival">
    </a>
    <ul class="nav-links">
      ${LINKS.map(([h, l]) =>
        `<li><a href="${h}" class="${h === current ? 'active' : ''}" data-trans>${l}</a></li>`
      ).join('')}
    </ul>
  `;
  document.body.prepend(nav);

  /* ── Transicions de pàgina ── */
  function handleLink(el) {
    const href = el.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http') || href.startsWith('mailto') ||
        href.startsWith('tel')  || href.startsWith('#')) return;
    el.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.transition = 'opacity 0.28s ease';
      document.body.style.opacity = '0';
      setTimeout(() => { location.href = href; }, 300);
    });
  }

  document.querySelectorAll('a[data-trans], a[href]').forEach(handleLink);

  /* ── Fade in ── */
  requestAnimationFrame(() => {
    setTimeout(() => document.body.classList.add('loaded'), 30);
  });

  /* ── Scroll reveal ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── Paràmetre motiu (per a Socis → Contacte) ── */
  const params = new URLSearchParams(location.search);
  const motiu  = params.get('motiu');
  if (motiu) {
    const sel = document.getElementById('motiu');
    if (sel) {
      for (let opt of sel.options) {
        if (opt.value === motiu || opt.value.toLowerCase().includes(motiu.toLowerCase())) {
          sel.value = opt.value;
          break;
        }
      }
    }
  }
})();
