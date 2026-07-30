/* EntreFoco V0.11 — correção do retorno ao início */
(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const elements = {
    focusToggle: $('#focusToggle'),
    focusStatus: $('#focusStatus'),
    exitFocus: $('#exitFocus'),
    themeToggle: $('#themeToggle'),
    fontIncrease: $('#fontIncrease'),
    fontDecrease: $('#fontDecrease'),
    fontScaleStatus: $('#fontScaleStatus'),
    resetReading: $('#resetReading'),
    menuButton: $('#menuButton'),
    mobileMenu: $('#mobileMenu'),
    actionPanel: $('#actionPanel'),
    actionTitle: $('#actionTitle'),
    actionText: $('#actionText'),
    actionDifficulty: $('#actionDifficulty'),
    actionTime: $('#actionTime'),
    actionEffort: $('#actionEffort'),
    actionSimplified: $('#actionSimplified'),
    actionEvidence: $('#actionEvidence'),
    closeAction: $('#closeAction'),
    completeAction: $('#completeAction'),
    completionMessage: $('#completionMessage'),
    readingProgress: $('#readingProgress'),
    readingToolsToggle: $('#readingToolsToggle'),
    readingToolsPanel: $('#readingToolsPanel'),
    closeReadingTools: $('#closeReadingTools'),
    printChecklist: $('#printChecklist')
  };

  const strategies = {
    start: {
      title: 'Reduza a tarefa até ela caber em dois minutos.',
      text: 'Não tente concluir tudo. Abra o arquivo, separe o material ou escreva apenas a primeira frase. O objetivo deste passo é iniciar, não terminar.',
      difficulty: 'Início de tarefas',
      time: '2 minutos',
      effort: 'Esforço baixo',
      simplified: 'Apenas localize o arquivo ou material necessário. Não precisa abri-lo ainda.',
      evidence: 'Estratégia prática demonstrativa · revisão científica pendente.'
    },
    distraction: {
      title: 'Escolha uma única distração para remover.',
      text: 'Feche somente uma aba, silencie apenas uma notificação ou tire um objeto do campo de visão. Depois trabalhe por cinco minutos antes de fazer outra mudança.',
      difficulty: 'Distração',
      time: '5 minutos',
      effort: 'Esforço baixo',
      simplified: 'Coloque o celular fora do alcance por apenas cinco minutos.',
      evidence: 'Estratégia prática demonstrativa · revisão científica pendente.'
    },
    impulse: {
      title: 'Crie uma pausa física de dez segundos.',
      text: 'Afaste as mãos do celular ou teclado, inspire lentamente e nomeie a ação que está prestes a realizar. Depois escolha conscientemente continuar ou adiar.',
      difficulty: 'Impulsividade',
      time: '10 segundos',
      effort: 'Esforço baixo',
      simplified: 'Diga em voz baixa: “Eu posso esperar dez segundos”.',
      evidence: 'Estratégia prática demonstrativa · revisão científica pendente.'
    },
    overload: {
      title: 'Retire tudo da cabeça sem organizar.',
      text: 'Escreva em uma folha ou bloco digital tudo que está ocupando sua atenção. Não classifique agora. Ao terminar, circule apenas o item que precisa de ação primeiro.',
      difficulty: 'Sobrecarga',
      time: '3 minutos',
      effort: 'Esforço moderado',
      simplified: 'Escreva somente as três primeiras coisas que vierem à mente.',
      evidence: 'Estratégia prática demonstrativa · revisão científica pendente.'
    },
    forgot: {
      title: 'Registre o que você ainda lembra.',
      text: 'Anote pessoas, lugar, horário aproximado e a última ação relacionada. Esses pontos ajudam a reconstruir o contexto sem depender apenas da memória.',
      difficulty: 'Memória de trabalho',
      time: '2 minutos',
      effort: 'Esforço baixo',
      simplified: 'Anote apenas onde você estava quando lembrou do assunto.',
      evidence: 'Estratégia prática demonstrativa · revisão científica pendente.'
    },
    plan: {
      title: 'Escolha três resultados para hoje.',
      text: 'Defina uma tarefa obrigatória, uma importante e uma pequena. Tudo além disso entra em uma lista de espera, não no plano principal.',
      difficulty: 'Planejamento',
      time: '4 minutos',
      effort: 'Esforço moderado',
      simplified: 'Escolha apenas a tarefa obrigatória. As outras podem esperar.',
      evidence: 'Estratégia prática demonstrativa · revisão científica pendente.'
    }
  };

  let lastChallengeButton = null;

  function setTheme(theme, persist = true) {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = normalized;
    if (elements.themeToggle) {
      const dark = normalized === 'dark';
      elements.themeToggle.setAttribute('aria-pressed', String(dark));
      elements.themeToggle.textContent = dark ? 'Tema claro' : 'Tema escuro';
    }
    if (persist) localStorage.setItem('entrefoco-theme', normalized);
  }

  function setFontScale(scale, persist = true) {
    const normalized = Math.min(1.25, Math.max(0.9, Math.round(scale * 100) / 100));
    root.style.setProperty('--font-scale', String(normalized));
    if (elements.fontScaleStatus) elements.fontScaleStatus.textContent = `${Math.round(normalized * 100)}%`;
    if (elements.fontDecrease) elements.fontDecrease.disabled = normalized <= 0.9;
    if (elements.fontIncrease) elements.fontIncrease.disabled = normalized >= 1.25;
    if (persist) localStorage.setItem('entrefoco-font-scale', String(normalized));
  }

  function currentFontScale() {
    return Number.parseFloat(getComputedStyle(root).getPropertyValue('--font-scale')) || 1;
  }

  function updateReadingProgress() {
    if (!elements.readingProgress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    elements.readingProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  function setFocusMode(enabled) {
    body.classList.toggle('focus-mode', enabled);
    if (elements.focusToggle) {
      elements.focusToggle.setAttribute('aria-pressed', String(enabled));
      elements.focusToggle.textContent = enabled ? 'Sair do foco' : 'Modo foco';
    }
    if (elements.focusStatus) elements.focusStatus.hidden = !enabled;
    updateReadingProgress();
  }

  function closeMobileMenu() {
    if (!elements.mobileMenu || !elements.menuButton) return;
    elements.mobileMenu.hidden = true;
    elements.menuButton.setAttribute('aria-expanded', 'false');
    elements.menuButton.setAttribute('aria-label', 'Abrir menu');
  }

  function closeReadingPanel(restoreFocus = false) {
    if (!elements.readingToolsPanel || !elements.readingToolsToggle) return;
    elements.readingToolsPanel.hidden = true;
    elements.readingToolsToggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) elements.readingToolsToggle.focus();
  }

  function closeActionPanel(restoreFocus = true) {
    if (!elements.actionPanel) return;
    setFocusMode(false);
    elements.actionPanel.hidden = true;
    $$('.challenge-card[aria-expanded="true"]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
    if (elements.focusToggle) elements.focusToggle.disabled = true;
    const hint = $('#focusHint');
    if (hint) hint.textContent = 'Abra uma estratégia para usar o Modo foco.';
    if (restoreFocus && lastChallengeButton) lastChallengeButton.focus();
  }

  elements.themeToggle?.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  elements.fontIncrease?.addEventListener('click', () => setFontScale(currentFontScale() + 0.05));
  elements.fontDecrease?.addEventListener('click', () => setFontScale(currentFontScale() - 0.05));

  elements.resetReading?.addEventListener('click', () => {
    setTheme('light');
    setFontScale(1);
    setFocusMode(false);
  });

  elements.focusToggle?.addEventListener('click', () => {
    if (elements.focusToggle.disabled) return;
    setFocusMode(!body.classList.contains('focus-mode'));
  });
  elements.exitFocus?.addEventListener('click', () => setFocusMode(false));

  elements.menuButton?.addEventListener('click', () => {
    if (!elements.mobileMenu) return;
    const expanded = elements.menuButton.getAttribute('aria-expanded') === 'true';
    elements.menuButton.setAttribute('aria-expanded', String(!expanded));
    elements.menuButton.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
    elements.mobileMenu.hidden = expanded;
  });
  elements.mobileMenu?.addEventListener('click', (event) => {
    if (event.target.matches('a')) closeMobileMenu();
  });

  elements.readingToolsToggle?.addEventListener('click', () => {
    if (!elements.readingToolsPanel) return;
    const expanded = elements.readingToolsToggle.getAttribute('aria-expanded') === 'true';
    elements.readingToolsPanel.hidden = expanded;
    elements.readingToolsToggle.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) elements.closeReadingTools?.focus();
  });
  elements.closeReadingTools?.addEventListener('click', () => closeReadingPanel(true));

  $$('.challenge-card').forEach((button) => {
    button.addEventListener('click', () => {
      const strategy = strategies[button.dataset.challenge];
      if (!strategy || !elements.actionPanel) return;
      lastChallengeButton = button;
      $$('.challenge-card').forEach((item) => item.setAttribute('aria-expanded', String(item === button)));
      if (elements.actionTitle) elements.actionTitle.textContent = strategy.title;
      if (elements.actionText) elements.actionText.textContent = strategy.text;
      if (elements.actionDifficulty) elements.actionDifficulty.textContent = strategy.difficulty;
      if (elements.actionTime) elements.actionTime.textContent = strategy.time;
      if (elements.actionEffort) elements.actionEffort.textContent = strategy.effort;
      if (elements.actionSimplified) elements.actionSimplified.textContent = strategy.simplified;
      if (elements.actionEvidence) elements.actionEvidence.textContent = strategy.evidence;
      if (elements.completionMessage) elements.completionMessage.hidden = true;
      if (elements.completeAction) {
        elements.completeAction.disabled = false;
        elements.completeAction.textContent = 'Marcar como feito';
      }
      elements.actionPanel.hidden = false;
      if (elements.focusToggle) elements.focusToggle.disabled = false;
      const hint = $('#focusHint');
      if (hint) hint.textContent = 'Destaca somente a estratégia aberta.';
      elements.actionPanel.focus();
    });
  });

  elements.closeAction?.addEventListener('click', () => closeActionPanel(true));
  elements.completeAction?.addEventListener('click', () => {
    if (elements.completionMessage) elements.completionMessage.hidden = false;
    elements.completeAction.disabled = true;
    elements.completeAction.textContent = 'Concluído';
  });

  elements.printChecklist?.addEventListener('click', () => window.print());

  // Garante que os links do rodapé alcancem o início real do documento,
  // mesmo com o cabeçalho em posição sticky.
  $$('a[href="#topo"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = $('#topo');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      if (target) {
        window.setTimeout(() => target.focus({ preventScroll: true }), reduceMotion ? 0 : 350);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (body.classList.contains('focus-mode')) {
      setFocusMode(false);
      return;
    }
    if (elements.readingToolsPanel && !elements.readingToolsPanel.hidden) {
      closeReadingPanel(true);
      return;
    }
    if (elements.mobileMenu && !elements.mobileMenu.hidden) {
      closeMobileMenu();
      elements.menuButton?.focus();
      return;
    }
    if (elements.actionPanel && !elements.actionPanel.hidden) closeActionPanel(true);
  });

  window.addEventListener('scroll', updateReadingProgress, { passive: true });
  window.addEventListener('resize', updateReadingProgress);

  const savedTheme = localStorage.getItem('entrefoco-theme');
  setTheme(savedTheme || 'light', false);

  const savedScale = Number.parseFloat(localStorage.getItem('entrefoco-font-scale'));
  setFontScale(Number.isFinite(savedScale) ? savedScale : 1, false);

  const isArticlePage = body.classList.contains('article-page');
  if (elements.focusToggle) elements.focusToggle.disabled = !isArticlePage && (!elements.actionPanel || elements.actionPanel.hidden);
  setFocusMode(false);
  updateReadingProgress();
})();
