const menuHost = document.querySelector('#site-menu');

if (menuHost) {
  const path = window.location.pathname.toLowerCase();
  const isRules = path.includes('/rules/');
  const isFaq = path.includes('/faq/');
  const isHome = path.includes('/home/') || (!isRules && !isFaq);
  const prefix = '../';
  const homeHref = isHome ? './' : `${prefix}home/`;
  const rulesHref = isRules ? './' : `${prefix}rules/`;
  const faqHref = isFaq ? './' : `${prefix}FAQ/`;

  menuHost.innerHTML = `
    <header class="site-image-banner">
      <a href="${homeHref}" aria-label="PVP OU LARGA — página inicial">
        <img src="${prefix}site/images/BANNER.png" alt="PVP OU LARGA" />
      </a>
    </header>
    <nav class="retro-tabs" aria-label="Navegação principal">
      <a class="${isHome ? 'is-active' : ''}" href="${homeHref}">INÍCIO</a>
      <a class="${isRules ? 'is-active' : ''}" href="${rulesHref}">REGRAS</a>
      <a class="${isFaq ? 'is-active' : ''}" href="${faqHref}">FAQ</a>
      <a href="https://discord.gg/DuPFGGCUEa" target="_blank" rel="noopener noreferrer">DISCORD</a>
      <button id="language-toggle" type="button" aria-label="Switch to English" lang="en">EN</button>
    </nav>
  `;
}
