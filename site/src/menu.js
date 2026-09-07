const menuHost = document.querySelector('#site-menu');

if (menuHost) {
  const path = window.location.pathname.toLowerCase();
  const isHome = path.includes('/home/');
  const isRules = path.includes('/rules/');
  const isFaq = path.includes('/faq/');
  const prefix = isHome ? '../' : '../';
  const homeHref = isHome ? './' : `${prefix}home/`;
  const rulesHref = isRules ? './' : `${prefix}rules/`;
  const faqHref = isFaq ? './' : `${prefix}FAQ/`;

  menuHost.innerHTML = `
    <button class="side-menu-toggle" type="button" aria-controls="side-menu" aria-expanded="false">
      <span class="side-menu-icon">☰</span>
      <span class="side-menu-label">Menu</span>
    </button>
    <aside id="side-menu" class="side-menu" aria-label="Navegação principal" aria-hidden="true">
      <a class="side-menu-brand" href="${homeHref}">
        <img src="${prefix}site/images/pvpoularga.png" alt="Logo" />
      </a>
      <nav class="side-menu-nav">
        <a class="${isHome ? 'is-active' : ''}" href="${homeHref}">🏠 <span>Home</span></a>
        <details class="side-menu-section" ${isRules ? 'open' : ''}>
          <summary class="${isRules ? 'is-active' : ''}"><span>📌</span><a class="side-menu-section-label" href="${rulesHref}">Rules</a><span class="side-menu-chevron" aria-hidden="true"></span></summary>
          <div class="side-menu-children">
            <a href="${isRules ? '#regras-gerais' : `${rulesHref}#regras-gerais`}">💡 <span>Regras Gerais</span></a>
            <a href="${isRules ? '#pvp' : `${rulesHref}#pvp`}">🔫 <span>PVP</span></a>
            <a href="${isRules ? '#mods' : `${rulesHref}#mods`}">🎮 <span>Mods Proibidos</span></a>
            <a href="${isRules ? '#servicos' : `${rulesHref}#servicos`}">🔧 <span>Serviços Obrigatórios</span></a>

          </div>
        </details>
        <a class="${isFaq ? 'is-active' : ''}" href="${faqHref}">📝 <span>FAQ</span></a>
      </nav>
    </aside>
    <div class="side-menu-backdrop" data-close-menu></div>
  `;
}
