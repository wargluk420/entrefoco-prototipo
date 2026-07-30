const root = document.documentElement;
const body = document.body;

const focusToggle = document.querySelector('#focusToggle');
const themeToggle = document.querySelector('#themeToggle');
const fontIncrease = document.querySelector('#fontIncrease');
const fontDecrease = document.querySelector('#fontDecrease');
const menuButton = document.querySelector('#menuButton');
const mobileMenu = document.querySelector('#mobileMenu');
const actionPanel = document.querySelector('#actionPanel');
const actionTitle = document.querySelector('#actionTitle');
const actionText = document.querySelector('#actionText');
const actionTime = document.querySelector('#actionTime');
const closeAction = document.querySelector('#closeAction');
const completeAction = document.querySelector('#completeAction');
const completionMessage = document.querySelector('#completionMessage');
const readingProgress = document.querySelector('#readingProgress');

const strategies = {
  start: {
    title: 'Reduza a tarefa até ela caber em dois minutos.',
    text: 'Não tente concluir tudo. Abra o arquivo, separe o material ou escreva apenas a primeira frase. O objetivo deste passo é iniciar, não terminar.',
    time: 'Tempo sugerido: 2 minutos'
  },
  distraction: {
    title: 'Escolha uma única distração para remover.',
    text: 'Feche somente uma aba, silencie apenas uma notificação ou tire um objeto do campo de visão. Depois trabalhe por cinco minutos antes de fazer outra mudança.',
    time: 'Tempo sugerido: 5 minutos'
  },
  impulse: {
    title: 'Crie uma pausa física de dez segundos.',
    text: 'Afaste as mãos do celular ou teclado, inspire lentamente e nomeie a ação que está prestes a realizar. Depois escolha conscientemente continuar ou adiar.',
    time: 'Tempo sugerido: 10 segundos'
  },
  overload: {
    title: 'Retire tudo da cabeça sem organizar.',
    text: 'Escreva em uma folha ou bloco digital tudo que está ocupando sua atenção. Não classifique agora. Ao terminar, circule apenas o item que precisa de ação primeiro.',
    time: 'Tempo sugerido: 3 minutos'
  },
  forgot: {
    title: 'Registre o que você ainda lembra.',
    text: 'Anote pessoas, lugar, horário aproximado e a última ação relacionada. Esses pontos ajudam a reconstruir o contexto sem depender apenas da memória.',
    time: 'Tempo sugerido: 2 minutos'
  },
  plan: {
    title: 'Escolha três resultados para hoje.',
    text: 'Defina uma tarefa obrigatória, uma importante e uma pequena. Tudo além disso entra em uma lista de espera, não no plano principal.',
    time: 'Tempo sugerido: 4 minutos'
  }
};

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.textContent = dark ? 'Tema claro' : 'Tema escuro';
  localStorage.setItem('entrefoco-theme', theme);
}

function setFontScale(scale) {
  const normalized = Math.min(1.25, Math.max(0.9, Number(scale.toFixed(2))));
  root.style.setProperty('--font-scale', normalized);
  localStorage.setItem('entrefoco-font-scale', String(normalized));
}

function updateReadingProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  readingProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

focusToggle.addEventListener('click', () => {
  const enabled = body.classList.toggle('focus-mode');
  focusToggle.setAttribute('aria-pressed', String(enabled));
  focusToggle.textContent = enabled ? 'Sair do foco' : 'Modo foco';
  localStorage.setItem('entrefoco-focus-mode', String(enabled));
  updateReadingProgress();
});

themeToggle.addEventListener('click', () => {
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

fontIncrease.addEventListener('click', () => {
  const current = Number.parseFloat(getComputedStyle(root).getPropertyValue('--font-scale')) || 1;
  setFontScale(current + 0.05);
});

fontDecrease.addEventListener('click', () => {
  const current = Number.parseFloat(getComputedStyle(root).getPropertyValue('--font-scale')) || 1;
  setFontScale(current - 0.05);
});

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  mobileMenu.hidden = expanded;
});

mobileMenu.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('.challenge-card').forEach((button) => {
  button.addEventListener('click', () => {
    const strategy = strategies[button.dataset.challenge];
    actionTitle.textContent = strategy.title;
    actionText.textContent = strategy.text;
    actionTime.textContent = strategy.time;
    completionMessage.hidden = true;
    completeAction.disabled = false;
    completeAction.textContent = 'Marcar como feito';
    actionPanel.hidden = false;
    actionPanel.focus();
  });
});

closeAction.addEventListener('click', () => {
  actionPanel.hidden = true;
});

completeAction.addEventListener('click', () => {
  completionMessage.hidden = false;
  completeAction.disabled = true;
  completeAction.textContent = 'Concluído';
});

window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress);

const savedTheme = localStorage.getItem('entrefoco-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

const savedScale = Number.parseFloat(localStorage.getItem('entrefoco-font-scale'));
if (Number.isFinite(savedScale)) setFontScale(savedScale);

const focusSaved = localStorage.getItem('entrefoco-focus-mode') === 'true';
if (focusSaved) {
  body.classList.add('focus-mode');
  focusToggle.setAttribute('aria-pressed', 'true');
  focusToggle.textContent = 'Sair do foco';
}

updateReadingProgress();
