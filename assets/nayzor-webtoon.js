(() => {
  const ICONS = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5V21h-6v-6H9v6H3z"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    collection: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v17l-7-4-7 4z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  const state = { screen: 'home', universe: false };
  const screens = new Set(['home', 'search', 'collection']);

  function readViewFromLocation() {
    const value = new URL(window.location.href).searchParams.get('nc');
    if (value === 'universe') return { screen: 'home', universe: true };
    if (screens.has(value)) return { screen: value, universe: false };
    return { screen: 'home', universe: false };
  }

  function urlForView(view) {
    const url = new URL(window.location.href);
    const value = view.universe ? 'universe' : view.screen;
    if (value === 'home') url.searchParams.delete('nc');
    else url.searchParams.set('nc', value);
    return `${url.pathname}${url.search}${url.hash}`;
  }

  function shell() {
    document.body.classList.add('nayzor-shell-active');
    const el = document.createElement('div');
    el.className = 'nayzor-shell';
    el.innerHTML = `
      <div class="nayzor-orb nayzor-orb-one"></div>
      <div class="nayzor-orb nayzor-orb-two"></div>
      <div class="nayzor-surface">
        <header class="nayzor-header">
          <div class="nayzor-brand">
            <div class="nayzor-logo" aria-hidden="true">N<em>&</em>C</div>
            <div class="nayzor-brand-copy">
              <strong>l’Univers De Nayzor&amp;Cappy</strong>
              <small>HISTOIRES • UNIVERS • PERSONNAGES</small>
            </div>
          </div>
          <div class="nayzor-profile" aria-label="Nayzor et Cappy">NC</div>
        </header>

        <main>
          <section class="nayzor-screen active" data-screen="home">
            <div class="nayzor-hero">
              <div class="nayzor-hero-copy">
                <span class="nayzor-kicker"><i></i> PORTAIL OFFICIEL</span>
                <h1>Des histoires.<br><em>Un seul univers.</em></h1>
                <p>Retrouve nos romans, nos personnages, les dossiers secrets et toutes les images de l’univers.</p>
                <div class="nayzor-hero-actions">
                  <button class="nayzor-primary" type="button" data-open-universe>
                    Entrer dans l’univers ${ICONS.arrow}
                  </button>
                  <button class="nayzor-secondary" type="button" data-go="collection">Voir la collection</button>
                </div>
                <div class="nayzor-hero-stats">
                  <span><b>2</b> romans</span>
                  <span><b>1</b> univers</span>
                  <span><b>∞</b> mystères</span>
                </div>
              </div>
              <div class="nayzor-hero-art" aria-hidden="true">
                <div class="nayzor-art-halo"></div>
                <img src="/apocalypse/group.webp" alt="">
                <span class="nayzor-floating-tag tag-top">JONAS • SHIDO</span>
                <span class="nayzor-floating-tag tag-bottom">L’HISTOIRE CONTINUE</span>
              </div>
            </div>

            <div class="nayzor-section-title">
              <div><small>À DÉCOUVRIR</small><h2>Nos univers</h2></div>
              <button type="button" data-go="collection">Tout voir ${ICONS.arrow}</button>
            </div>

            <div class="nayzor-card-row">
              <button class="nayzor-story-card" type="button" data-open-universe>
                <img src="/apocalypse/group.webp" alt="L’Univers de Jonas Valdés">
                <span class="nayzor-card-number">01</span>
                <span class="nayzor-badge">UNIVERS ORIGINAL</span>
                <div class="nayzor-card-copy">
                  <span class="nayzor-card-meta">APOCALYPSE • FOOTBALL • MYSTÈRES</span>
                  <h3>L’Univers de<br>Jonas Valdés</h3>
                  <p>L’Apocalypse avec nos idoles, l’édition spéciale, les personnages, les dossiers et toutes les images.</p>
                  <span class="nayzor-card-cta">OUVRIR ${ICONS.arrow}</span>
                </div>
              </button>
            </div>

            <div class="nayzor-section-title nayzor-inside-title">
              <div><small>TOUT AU MÊME ENDROIT</small><h2>À l’intérieur</h2></div>
            </div>
            <div class="nayzor-mini-grid">
              <div class="nayzor-mini"><i>📚</i><b>Histoires</b><span>Les tomes et chapitres déjà présents.</span></div>
              <div class="nayzor-mini"><i>👤</i><b>Personnages</b><span>Jonas, Shido et tous les autres.</span></div>
              <div class="nayzor-mini"><i>🗂️</i><b>Dossiers</b><span>Les fiches et informations de l’univers.</span></div>
              <div class="nayzor-mini"><i>🖼️</i><b>Images</b><span>Les visuels associés aux histoires.</span></div>
            </div>
          </section>

          <section class="nayzor-screen" data-screen="search">
            <div class="nayzor-page-intro">
              <span class="nayzor-kicker"><i></i> EXPLORER</span>
              <h1>Que cherches-tu ?</h1>
              <p>Un personnage, un roman ou un mystère de l’univers.</p>
            </div>
            <div class="nayzor-searchbox">
              ${ICONS.search}
              <input id="nayzor-search" type="search" placeholder="Rechercher une histoire, un personnage…" autocomplete="off">
            </div>
            <div class="nayzor-search-results" id="nayzor-results"></div>
          </section>

          <section class="nayzor-screen" data-screen="collection">
            <div class="nayzor-page-intro">
              <span class="nayzor-kicker"><i></i> BIBLIOTHÈQUE</span>
              <h1>Toute la collection</h1>
              <p>Les histoires et contenus de Nayzor &amp; Cappy.</p>
            </div>
            <button class="nayzor-collection-card" type="button" data-open-universe>
              <div class="nayzor-collection-image">
                <img src="/apocalypse/group.webp" alt="L’Univers de Jonas Valdés">
                <span>01</span>
              </div>
              <div>
                <small>UNIVERS ORIGINAL</small>
                <strong>L’Univers de Jonas Valdés</strong>
                <p>Tout l’univers original conservé : romans, personnages, dossiers, mystères, images et contenus.</p>
                <span class="nayzor-collection-cta">OUVRIR L’UNIVERS ${ICONS.arrow}</span>
              </div>
            </button>
          </section>
        </main>
      </div>

      <nav class="nayzor-bottomnav" aria-label="Navigation principale">
        <button class="active" type="button" data-nav="home">${ICONS.home}<span>Accueil</span></button>
        <button type="button" data-nav="search">${ICONS.search}<span>Rechercher</span></button>
        <button type="button" data-nav="collection">${ICONS.collection}<span>Collection</span></button>
      </nav>`;

    document.body.insertBefore(el, document.body.firstChild);

    const data = [
      ['L’Univers de Jonas Valdés', 'Univers complet'],
      ['L’Apocalypse avec nos idoles', 'Roman principal'],
      ['Tome – Édition Spéciale', 'Histoire spéciale'],
      ['Jonas Valdés', 'Personnage'],
      ['Shido', 'Personnage'],
      ['Mel', 'Personnage'],
      ['Elisa', 'Personnage']
    ];
    const results = el.querySelector('#nayzor-results');
    const input = el.querySelector('#nayzor-search');

    function draw(query = '') {
      const term = query.trim().toLowerCase();
      const list = term ? data.filter(item => item.join(' ').toLowerCase().includes(term)) : data.slice(0, 5);
      results.innerHTML = list.length
        ? list.map((item, index) => `
            <button type="button" class="nayzor-result" data-open-universe>
              <span class="nayzor-result-index">${String(index + 1).padStart(2, '0')}</span>
              <span class="nayzor-result-copy"><b>${item[0]}</b><small>${item[1]} • ouvrir dans l’univers</small></span>
              ${ICONS.arrow}
            </button>`).join('')
        : '<div class="nayzor-empty"><b>Aucun résultat</b><span>Essaie un autre mot-clé.</span></div>';
    }

    function applyView(view, options = {}) {
      state.screen = screens.has(view.screen) ? view.screen : 'home';
      state.universe = Boolean(view.universe);
      document.body.classList.toggle('nayzor-universe-open', state.universe);
      el.querySelectorAll('.nayzor-screen').forEach(screen => {
        screen.classList.toggle('active', screen.dataset.screen === state.screen);
      });
      el.querySelectorAll('[data-nav]').forEach(button => {
        button.classList.toggle('active', !state.universe && button.dataset.nav === state.screen);
      });
      if (options.focusSearch && state.screen === 'search' && !state.universe) {
        window.setTimeout(() => input.focus(), 100);
      }
      if (!state.universe && options.scroll !== false) {
        window.scrollTo({ top: 0, behavior: options.smooth ? 'smooth' : 'auto' });
      }
    }

    function navigate(view, options = {}) {
      const next = {
        screen: screens.has(view.screen) ? view.screen : state.screen,
        universe: Boolean(view.universe)
      };
      window.history.pushState({ nayzorView: next }, '', urlForView(next));
      applyView(next, options);
    }

    draw();
    input.addEventListener('input', event => draw(event.target.value));

    el.addEventListener('click', event => {
      const open = event.target.closest('[data-open-universe]');
      if (open) {
        navigate({ screen: state.screen, universe: true });
        return;
      }
      const nav = event.target.closest('[data-nav]');
      const go = event.target.closest('[data-go]');
      const target = nav?.dataset.nav || go?.dataset.go;
      if (target) {
        navigate({ screen: target, universe: false }, { focusSearch: target === 'search', smooth: true });
      }
    });

    window.addEventListener('popstate', event => {
      const saved = event.state?.nayzorView;
      applyView(saved || readViewFromLocation(), { scroll: false });
    });

    const initial = readViewFromLocation();
    window.history.replaceState({ ...window.history.state, nayzorView: initial }, '', window.location.href);
    applyView(initial, { scroll: false });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', shell);
  else shell();
})();
