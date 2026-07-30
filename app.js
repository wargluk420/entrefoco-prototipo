const root = document.documentElement;
const body = document.body;

const readingToolsToggle = document.querySelector('#readingToolsToggle');
const readingToolsPanel = document.querySelector('#readingToolsPanel');
const closeReadingTools = document.querySelector('#closeReadingTools');
const focusToggle = document.querySelector('#focusToggle');
const focusHint = document.querySelector('#focusHint');
const focusStatus = document.querySelector('#focusStatus');
const focusStatusText = document.querySelector('#focusStatusText');
const exitFocus = document.querySelector('#exitFocus');
const themeToggle = document.querySelector('#themeToggle');
const fontIncrease = document.querySelector('#fontIncrease');
const fontDecrease = document.querySelector('#fontDecrease');
const fontScaleStatus = document.querySelector('#fontScaleStatus');
const resetReading = document.querySelector('#resetReading');
const menuButton = document.querySelector('#menuButton');
const mobileMenu = document.querySelector('#mobileMenu');
const actionPanel = document.querySelector('#actionPanel');
const actionTitle = document.querySelector('#actionTitle');
const actionText = document.querySelector('#actionText');
const actionDifficulty = document.querySelector('#actionDifficulty');
const actionTime = document.querySelector('#actionTime');
const actionEffort = document.querySelector('#actionEffort');
const actionSimplified = document.querySelector('#actionSimplified');
const actionEvidence = document.querySelector('#actionEvidence');
const closeAction = document.querySelector('#closeAction');
const completeAction = document.querySelector('#completeAction');
const completionMessage = document.querySelector('#completionMessage');
const readingProgress = document.querySelector('#readingProgress');
const challengeButtons = [...document.querySelectorAll('.challenge-card')];
const articleFocusContent = document.querySelector('[data-focus-content]');
const printChecklist = document.querySelector('#printChecklist');

let lastChallengeButton = null;
let activeFocusContent = null;

const strategies = {
  start: {
    difficulty: 'Início de tarefas',
    title: 'Reduza a tarefa até ela caber em dois minutos.',
    text: 'Não tente concluir tudo. Abra o arquivo, separe o material ou escreva apenas a primeira frase. O objetivo deste passo é iniciar, não terminar.',
    time: 'Tempo: 2 minutos',
    effort: 'Esforço: baixo',
    simplified: 'Apenas localize o arquivo, objeto ou lugar necessário. Você pode parar depois disso.',
    evidence: 'Estratégia prática demonstrativa — revisão científica pendente.'
  },
  distraction: {
    difficulty: 'Distração',
    title: 'Escolha uma única distração para remover.',
    text: 'Feche somente uma aba, silencie apenas uma notificação ou tire um objeto do campo de visão. Depois trabalhe por cinco minutos antes de fazer outra mudança.',
    time: 'Tempo: 5 minutos',
    effort: 'Esforço: baixo',
    simplified: 'Vire o celular com a tela para baixo ou feche apenas uma aba.',
    evidence: 'Estratégia prática demonstrativa — revisão científica pendente.'
  },
  impulse: {
    difficulty: 'Impulsividade',
    title: 'Crie uma pausa física de dez segundos.',
    text: 'Afaste as mãos do celular ou teclado, inspire lentamente e nomeie a ação que está prestes a realizar. Depois escolha conscientemente continuar ou adiar.',
    time: 'Tempo: 10 segundos',
    effort: 'Esforço: baixo',
    simplified: 'Afaste as mãos do objeto por um instante e diga em voz baixa o que está prestes a fazer.',
    evidence: 'Estratégia prática demonstrativa — revisão científica pendente.'
  },
  overload: {
    difficulty: 'Sobrecarga',
    title: 'Retire tudo da cabeça sem organizar.',
    text: 'Escreva em uma folha ou bloco digital tudo que está ocupando sua atenção. Não classifique agora. Ao terminar, circule apenas o item que precisa de ação primeiro.',
    time: 'Tempo: 3 minutos',
    effort: 'Esforço: médio',
    simplified: 'Escreva somente as três coisas que mais estão ocupando sua cabeça.',
    evidence: 'Estratégia prática demonstrativa — revisão científica pendente.'
  },
  forgot: {
    difficulty: 'Memória de trabalho',
    title: 'Registre o que você ainda lembra.',
    text: 'Anote pessoas, lugar, horário aproximado e a última ação relacionada. Esses pontos ajudam a reconstruir o contexto sem depender apenas da memória.',
    time: 'Tempo: 2 minutos',
    effort: 'Esforço: baixo',
    simplified: 'Anote apenas a última coisa que você lembra ter feito antes de esquecer.',
    evidence: 'Estratégia prática demonstrativa — revisão científica pendente.'
  },
  plan: {
    difficulty: 'Planejamento',
    title: 'Escolha três resultados para hoje.',
    text: 'Defina uma tarefa obrigatória, uma importante e uma pequena. Tudo além disso entra em uma lista de espera, não no plano principal.',
    time: 'Tempo: 4 minutos',
    effort: 'Esforço: médio',
    simplified: 'Escolha apenas uma tarefa obrigatória para hoje.',
    evidence: 'Estratégia prática demonstrativa — revisão científica pendente.'
  }
};

const defaultHomeFocusTargets = [
  document.querySelector('.site-header'),
  document.querySelector('.hero'),
  document.querySelector('#agora .section-heading'),
  document.querySelector('#agora .challenge-grid'),
  document.querySelector('#fases'),
  document.querySelector('#pesquisas'),
  document.querySelector('#acolhimento'),
  document.querySelector('.site-footer')
].filter(Boolean);

const explicitFocusTargets = [...document.querySelectorAll('[data-focus-dim]')];
const focusModeTargets = explicitFocusTargets.length > 0 ? explicitFocusTargets : defaultHomeFocusTargets;

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.textContent = dark ? 'Tema claro' : 'Tema escuro';
  }

  localStorage.setItem('entrefoco-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#11141c' : '#f7f8fc');
}

function getCurrentFontScale() {
  return Number.parseFloat(getComputedStyle(root).getPropertyValue('--font-scale')) || 1;
}

function setFontScale(scale) {
  const normalized = Math.min(1.25, Math.max(0.9, Number(scale.toFixed(2))));
  root.style.setProperty('--font-scale', normalized);
  localStorage.setItem('entrefoco-font-scale', String(normalized));

  const percentage = Math.round(normalized * 100);

  if (fontScaleStatus) fontScaleStatus.textContent = `${percentage}%`;
  if (fontDecrease) {
    fontDecrease.disabled = normalized <= 0.9;
    fontDecrease.setAttribute('aria-label', `Diminuir tamanho do texto. Tamanho atual: ${percentage}%`);
  }
  if (fontIncrease) {
    fontIncrease.disabled = normalized >= 1.25;
    fontIncrease.setAttribute('aria-label', `Aumentar tamanho do texto. Tamanho atual: ${percentage}%`);
  }
}

function setReadingTools(open, returnFocus = false) {
  if (!readingToolsPanel || !readingToolsToggle) return;

  readingToolsPanel.hidden = !open;
  readingToolsToggle.setAttribute('aria-expanded', String(open));

  if (open) {
    closeReadingTools?.focus();
  } else if (returnFocus) {
    readingToolsToggle.focus();
  }
}

function setMenu(open, returnFocus = false) {
  if (!mobileMenu || !menuButton) return;

  mobileMenu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');

  if (!open && returnFocus) menuButton.focus();
}

function updateReadingProgress() {
  if (!readingProgress) return;

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  readingProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

function getFocusContent() {
  if (actionPanel && !actionPanel.hidden) return actionPanel;
  return articleFocusContent;
}

function updateFocusAvailability() {
  if (!focusToggle || !focusHint) return;

  const focusContent = getFocusContent();
  focusToggle.disabled = !focusContent;

  if (actionPanel) {
    focusHint.textContent = focusContent
      ? 'Reduz temporariamente os elementos ao redor da estratégia.'
      : 'Abra uma estratégia para usar o Modo foco.';
  } else {
    focusHint.textContent = focusContent
      ? 'Destaca o artigo e reduz os elementos ao redor.'
      : 'O Modo foco não está disponível nesta página.';
  }
}

function setTargetSuppressed(element, enabled) {
  if (enabled) {
    element.inert = true;
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.inert = false;
    element.removeAttribute('aria-hidden');
  }
}

function setFocusMode(enabled) {
  const focusContent = getFocusContent();
  if (enabled && !focusContent) return;

  body.classList.toggle('focus-mode', enabled);
  focusToggle?.setAttribute('aria-pressed', String(enabled));
  if (focusToggle) focusToggle.textContent = enabled ? 'Sair do foco' : 'Modo foco';
  if (focusStatus) focusStatus.hidden = !enabled;

  if (focusStatusText) {
    focusStatusText.textContent = actionPanel && !actionPanel.hidden
      ? 'Modo foco ativo: somente a estratégia atual está em destaque.'
      : 'Modo foco ativo: o artigo está em destaque.';
  }

  focusModeTargets.forEach((element) => setTargetSuppressed(element, enabled));

  if (enabled) {
    activeFocusContent = focusContent;
    activeFocusContent.classList.add('focus-content-active');
    setReadingTools(false);
    activeFocusContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => activeFocusContent?.focus(), 220);
  } else {
    activeFocusContent?.classList.remove('focus-content-active');
    activeFocusContent?.focus();
    activeFocusContent = null;
  }

  updateReadingProgress();
}

function closeStrategy({ restoreFocus = true } = {}) {
  if (!actionPanel) return;
  if (body.classList.contains('focus-mode')) setFocusMode(false);

  actionPanel.hidden = true;
  challengeButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
  updateFocusAvailability();

  if (restoreFocus && lastChallengeButton) lastChallengeButton.focus();
}

function openStrategy(button) {
  if (!actionPanel) return;

  const strategy = strategies[button.dataset.challenge];
  if (!strategy) return;

  lastChallengeButton = button;
  challengeButtons.forEach((item) => item.setAttribute('aria-expanded', String(item === button)));

  actionTitle.textContent = strategy.title;
  actionText.textContent = strategy.text;
  actionDifficulty.textContent = `Dificuldade: ${strategy.difficulty}`;
  actionTime.textContent = strategy.time;
  actionEffort.textContent = strategy.effort;
  actionSimplified.textContent = strategy.simplified;
  actionEvidence.textContent = strategy.evidence;
  completionMessage.hidden = true;
  completeAction.disabled = false;
  completeAction.textContent = 'Marcar como feito';
  actionPanel.querySelector('details').open = false;
  actionPanel.hidden = false;
  updateFocusAvailability();
  actionPanel.focus();
}

readingToolsToggle?.addEventListener('click', () => {
  setReadingTools(readingToolsPanel.hidden);
});

closeReadingTools?.addEventListener('click', () => setReadingTools(false, true));

focusToggle?.addEventListener('click', () => {
  setFocusMode(!body.classList.contains('focus-mode'));
});

exitFocus?.addEventListener('click', () => setFocusMode(false));

themeToggle?.addEventListener('click', () => {
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

fontIncrease?.addEventListener('click', () => setFontScale(getCurrentFontScale() + 0.05));
fontDecrease?.addEventListener('click', () => setFontScale(getCurrentFontScale() - 0.05));

resetReading?.addEventListener('click', () => {
  setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setFontScale(1);
  if (body.classList.contains('focus-mode')) setFocusMode(false);
});

menuButton?.addEventListener('click', () => {
  setMenu(mobileMenu.hidden);
});

mobileMenu?.addEventListener('click', (event) => {
  if (event.target.matches('a')) setMenu(false);
});

challengeButtons.forEach((button) => {
  button.addEventListener('click', () => openStrategy(button));
});

closeAction?.addEventListener('click', () => closeStrategy());

completeAction?.addEventListener('click', () => {
  completionMessage.hidden = false;
  completeAction.disabled = true;
  completeAction.textContent = 'Concluído';
});

printChecklist?.addEventListener('click', () => window.print());

document.addEventListener('click', (event) => {
  const clickedInsideTools = event.target.closest('.reading-tools');
  if (!clickedInsideTools && readingToolsPanel && !readingToolsPanel.hidden) setReadingTools(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  if (body.classList.contains('focus-mode')) {
    setFocusMode(false);
    return;
  }

  if (readingToolsPanel && !readingToolsPanel.hidden) {
    setReadingTools(false, true);
    return;
  }

  if (mobileMenu && !mobileMenu.hidden) {
    setMenu(false, true);
    return;
  }

  if (actionPanel && !actionPanel.hidden) closeStrategy();
});

window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress);

const savedTheme = localStorage.getItem('entrefoco-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

const savedScale = Number.parseFloat(localStorage.getItem('entrefoco-font-scale'));
setFontScale(Number.isFinite(savedScale) ? savedScale : 1);

updateFocusAvailability();
updateReadingProgress();
