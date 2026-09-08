(() => {
  const translations = {
    'BEM-VINDO AO SITE OFICIAL': 'WELCOME TO THE OFFICIAL WEBSITE',
    'INÍCIO': 'HOME',
    'REGRAS': 'RULES',
    'FAQ': 'FAQ',
    'DISCORD': 'DISCORD',
    'COMUNIDADE': 'COMMUNITY',
    'DESTAQUES': 'HIGHLIGHTS',
    'VER TIKTOK': 'VIEW TIKTOK',
    'ÚLTIMOS VÍDEOS': 'LATEST VIDEOS',
    'ABRIR TIKTOK': 'OPEN TIKTOK',
    'Perguntas Frequentes': 'Frequently Asked Questions',
    'Encontra aqui as respostas às dúvidas mais comuns sobre o servidor.': 'Find answers to the most common questions about the server here.',
    'Como entro no servidor?': 'How do I join the server?',
    'Entra no nosso Discord para obteres todas as informações e novidades.': 'Join our Discord for all the information and latest news.',
    'Abre a consola do fivem e escreve:': 'Open the FiveM console and type:',
    'Onde posso esclarecer dúvidas?': 'Where can I get help?',
    'Podes contactar a staff diretamente através do nosso Discord.': 'You can contact our staff directly through our Discord.',
    'Regras do Servidor': 'Server Rules',
    'A leitura é obrigatória antes de entrares no servidor.': 'You must read these rules before joining the server.',
    'ÚLTIMA ATUALIZAÇÃO': 'LAST UPDATED',
    'Setembro 2026': 'September 2026',
    'REGRAS GERAIS': 'GENERAL RULES',
    '● Proibidos insultos discriminatórios, perseguição, ameaças reais ou divulgação de dados pessoais.': '● Discriminatory insults, harassment, real-life threats and sharing personal information are prohibited.',
    '● Proibido usar mais do que uma conta para contornar bans ou obter vantagens.': '● Using multiple accounts to evade bans or gain an advantage is prohibited.',
    '● Proibido usar cheats, macros ou explorar bugs.': '● Using cheats, macros or exploiting bugs is prohibited.',
    '● Proibido fazer-se passar por membros da staff.': '● Impersonating staff members is prohibited.',
    '● Proibido o uso de nomes, apelidos ou tags ofensivas.': '● Offensive names, nicknames or tags are prohibited.',
    '● Proibido vender contas, personagens ou itens do servidor (RMT).': '● Selling accounts, characters or server items for real money (RMT) is prohibited.',
    '● Proibido o uso de corpo/roupas invisíveis.': '● Using invisible bodies/clothes is prohibited.',
    '● Proibido abusar das safezones para evitar a morte, como entrar e sair repetidamente ou disparar com sniper junto ao limite para te refugiares rapidamente.': '● Abusing safe zones to avoid death, such as repeatedly entering and leaving or shooting with a sniper near the boundary to quickly take refuge, is prohibited.',
    '● Proibido jogar nas extremidades das Safe Zones.': '● Playing at the edges of Safe Zones is prohibited.',
    '● Proibido o uso de veículos para entrar ou obstruir entradas a locais fechados.': '● Using vehicles to enter enclosed areas or block their entrances is prohibited.',
    '● Proibido disparar enquanto estás em cima de veículos terrestres ou aéreos de outros jogadores (trick)': '● Shooting while standing on other players’ land or air vehicles (trick) is prohibited.',
    '● Proibido utilizar snipers ou armas explosivas quando estiverem menos de 15 jogadores online.': '● Using sniper rifles or explosive weapons when fewer than 15 players are online is prohibited.',
    '● Proibido combinar mortes com amigos ou outros jogadores para aumentar o KD de forma intencional (farm kill).': '● Coordinating kills with friends or other players to intentionally increase KD (kill farming) is prohibited.',
    '● Proibido jogar nos buracos com bugs existentes no interior do FBI e do IAA.': '● Playing in glitch holes inside the FBI and IAA is prohibited.',
    '● Proibido duplicar um veículo para permitir que seja utilizado por mais de um jogador.': '● Duplicating a vehicle so it can be used by more than one player is prohibited.',
    '● Proibido o uso de personagem inicial.': '● Using the default starter character is prohibited.',
    '● Proibido deluxo trick.': '● The Deluxo trick is prohibited.',
    'MODS PROIBIDOS': 'PROHIBITED MODS',
    '● Modificações, ficheiros ou ferramentas que removam, ocultem ou alterem edifícios, paredes ou as respetivas colisões, permitindo visualizar ou atravessar estruturas que normalmente impedem a visão ou a passagem.': '● Mods, files or tools that remove, hide or alter buildings, walls or their collisions, allowing players to see or move through structures that normally block visibility or passage.',
    'SERVIÇOS OBRIGATÓRIOS': 'REQUIRED SERVICES',
    'Se algum destes serviços estiver parado durante o PC check resultará em ban do servidor.': 'If any of these services is stopped during a PC check, you will be banned from the server.',
    'Dúvidas?': 'Questions?',
    'Se tiveres alguma dúvida sobre estas regras, contacta a staff através do nosso Discord.': 'If you have any questions about these rules, contact our staff through our Discord.',
    'Acesso rápido': 'Quick links',
    'Destaques PVP OU LARGA': 'PVP OU LARGA highlights',
    'Visita o TikTok PVP OU LARGA': 'Visit PVP OU LARGA on TikTok',
    'Abrir TikTok PVP OU LARGA': 'Open PVP OU LARGA on TikTok',
    'Abrir Discord': 'Open Discord',
    'Navegação principal': 'Main navigation',
    'PVP OU LARGA — página inicial': 'PVP OU LARGA — home page',
    'PL | Regras': 'PL | Rules',
    'Regras do servidor FiveM.': 'FiveM server rules.',
    'PVP OU LARGA — O teu cantinho da internet para conheceres as regras do melhor servidor de PVP de Portugal! Entra no Discord do PVP OU LARGA e fica a saber mais!': 'PVP OU LARGA — Your corner of the internet to learn the rules of Portugal’s best PVP server! Join the PVP OU LARGA Discord to find out more!'
  };
  const normalize = (text) => text.replace(/\s+/g, ' ').trim();
  // Keep original nodes so toggling never rebuilds links, line breaks or embeds.
  const entries = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, .tiktok-embed')) continue;
    const english = translations[normalize(node.nodeValue)];
    if (english) entries.push({ node, original: node.nodeValue, english });
  }
  document.querySelectorAll('[alt], [aria-label], [title], meta[name="description"]').forEach((node) => {
    for (const attribute of ['alt', 'aria-label', 'title', 'content']) {
      const original = node.getAttribute(attribute);
      if (original && translations[original]) entries.push({ node, attribute, original, english: translations[original] });
    }
  });
  const originalTitle = document.title;
  const button = document.querySelector('#language-toggle');
  let language = 'pt';
  try { if (localStorage.getItem('site-language') === 'en') language = 'en'; } catch {}
  function applyLanguage(next) {
    language = next;
    document.documentElement.lang = language;
    for (const entry of entries) {
      const value = language === 'en' ? entry.english : entry.original;
      if (entry.attribute) entry.node.setAttribute(entry.attribute, value);
      else entry.node.nodeValue = value;
    }
    document.title = language === 'en' ? (translations[originalTitle] || originalTitle) : originalTitle;
    button.textContent = language === 'pt' ? 'EN' : 'PT';
    button.lang = language === 'pt' ? 'en' : 'pt';
    button.setAttribute('aria-label', language === 'pt' ? 'Switch to English' : 'Mudar para português');
    button.title = button.getAttribute('aria-label');
    try { localStorage.setItem('site-language', language); } catch {}
  }
  button.addEventListener('click', () => applyLanguage(language === 'pt' ? 'en' : 'pt'));
  applyLanguage(language);
})();
