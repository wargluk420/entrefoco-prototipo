/* EntreFoco V0.11 — correção do retorno ao início */
(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const storage = {
    get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); } catch { /* Preferências continuam apenas nesta sessão. */ } },
    remove(key) { try { window.localStorage.removeItem(key); } catch { /* Sem armazenamento persistente. */ } }
  };

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
    if (persist) storage.set('entrefoco-theme', normalized);
  }

  function setFontScale(scale, persist = true) {
    const normalized = Math.min(1.25, Math.max(0.9, Math.round(scale * 100) / 100));
    root.style.setProperty('--font-scale', String(normalized));
    if (elements.fontScaleStatus) elements.fontScaleStatus.textContent = `${Math.round(normalized * 100)}%`;
    if (elements.fontDecrease) elements.fontDecrease.disabled = normalized <= 0.9;
    if (elements.fontIncrease) elements.fontIncrease.disabled = normalized >= 1.25;
    if (persist) storage.set('entrefoco-font-scale', String(normalized));
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

  const savedTheme = storage.get('entrefoco-theme');
  setTheme(savedTheme || 'light', false);

  const savedScale = Number.parseFloat(storage.get('entrefoco-font-scale'));
  setFontScale(Number.isFinite(savedScale) ? savedScale : 1, false);

  const isArticlePage = body.classList.contains('article-page');
  if (elements.focusToggle) elements.focusToggle.disabled = !isArticlePage && (!elements.actionPanel || elements.actionPanel.hidden);
  setFocusMode(false);
  updateReadingProgress();
})();


/* EntreFoco V0.14 — leitura em voz alta com Web Speech API */
(() => {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const speechStorage = {
    get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); } catch { /* Recurso permanece funcional sem persistência. */ } },
    remove(key) { try { window.localStorage.removeItem(key); } catch { /* Sem persistência. */ } }
  };
  const synth = window.speechSynthesis;
  const supported = Boolean(synth && window.SpeechSynthesisUtterance);
  const controls = {
    start: $('#speechStart'),
    pause: $('#speechPause'),
    stop: $('#speechStop'),
    rate: $('#speechRate'),
    status: $('#speechStatus'),
    voiceStatus: $('#speechVoiceStatus'),
    reset: $('#resetReading')
  };

  if (!controls.start) return;

  let queue = [];
  let queueIndex = 0;
  let sessionId = 0;
  let paused = false;
  let activeElement = null;
  let selectedVoice = null;

  const setStatus = (message) => {
    if (controls.status) controls.status.textContent = message;
  };

  const clearHighlight = () => {
    if (activeElement) activeElement.removeAttribute('data-speech-active');
    activeElement = null;
  };

  const updateControls = (state) => {
    const active = state === 'speaking' || state === 'paused';
    controls.start.disabled = !supported;
    controls.pause.disabled = !supported || !active;
    controls.stop.disabled = !supported || !active;
    controls.pause.setAttribute('aria-pressed', String(state === 'paused'));
    controls.pause.textContent = state === 'paused' ? 'Continuar' : 'Pausar';
    controls.start.textContent = active ? 'Reiniciar leitura' : 'Ouvir esta página';
  };

  const choosePortugueseVoice = () => {
    if (!supported) return null;
    const voices = synth.getVoices();
    selectedVoice = voices.find((voice) => /^pt-BR$/i.test(voice.lang))
      || voices.find((voice) => /^pt([_-]|$)/i.test(voice.lang))
      || voices.find((voice) => voice.default)
      || voices[0]
      || null;

    if (controls.voiceStatus) {
      controls.voiceStatus.textContent = selectedVoice
        ? `Voz selecionada: ${selectedVoice.name} (${selectedVoice.lang || 'idioma não informado'}).`
        : 'O navegador ainda não disponibilizou uma voz. Tente novamente em alguns segundos.';
    }
    return selectedVoice;
  };

  const splitText = (text, maxLength = 220) => {
    const normalized = text.replace(/\s+/g, ' ').trim();
    if (!normalized) return [];
    if (normalized.length <= maxLength) return [normalized];

    const sentences = normalized.match(/[^.!?;:]+[.!?;:]?|[^.!?;:]+$/g) || [normalized];
    const chunks = [];
    let current = '';

    const pushWords = (value) => {
      let part = '';
      value.split(/\s+/).forEach((word) => {
        const candidate = part ? `${part} ${word}` : word;
        if (candidate.length > maxLength && part) {
          chunks.push(part);
          part = word;
        } else {
          part = candidate;
        }
      });
      if (part) chunks.push(part);
    };

    sentences.forEach((sentence) => {
      const clean = sentence.trim();
      if (!clean) return;
      if (clean.length > maxLength) {
        if (current) {
          chunks.push(current);
          current = '';
        }
        pushWords(clean);
        return;
      }
      const candidate = current ? `${current} ${clean}` : clean;
      if (candidate.length > maxLength && current) {
        chunks.push(current);
        current = clean;
      } else {
        current = candidate;
      }
    });
    if (current) chunks.push(current);
    return chunks;
  };

  const isVisible = (element) => {
    if (element.closest('[hidden], [aria-hidden="true"], .sr-only, nav, .article-toc, .article-jump-section, .stage-next, .study-links, .reading-tools, .focus-status, .progress-bar, [data-speech-ignore]')) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
  };

  const collectSpeechQueue = () => {
    const roots = document.body.classList.contains('article-page')
      ? [...document.querySelectorAll('.article-hero, .article-content')]
      : [document.querySelector('main#conteudo')];
    const items = [];
    let previousText = '';

    roots.filter(Boolean).forEach((root) => {
      root.querySelectorAll('h1, h2, h3, h4, p, li, dt, dd, summary').forEach((element) => {
        if (!isVisible(element)) return;
        const text = element.textContent.replace(/\s+/g, ' ').trim();
        if (!text || text === previousText) return;
        previousText = text;
        splitText(text).forEach((chunk) => items.push({ text: chunk, element }));
      });
    });
    return items;
  };

  const stopSpeech = (message = 'Leitura parada.') => {
    sessionId += 1;
    if (supported) synth.cancel();
    queue = [];
    queueIndex = 0;
    paused = false;
    clearHighlight();
    updateControls('idle');
    setStatus(message);
  };

  const finishSpeech = () => {
    queue = [];
    queueIndex = 0;
    paused = false;
    clearHighlight();
    updateControls('idle');
    setStatus('Leitura concluída.');
  };

  const speakNext = (currentSession) => {
    if (currentSession !== sessionId) return;
    if (queueIndex >= queue.length) {
      finishSpeech();
      return;
    }

    const item = queue[queueIndex];
    const utterance = new SpeechSynthesisUtterance(item.text);
    utterance.lang = selectedVoice?.lang || 'pt-BR';
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = Number.parseFloat(controls.rate?.value) || 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      if (currentSession !== sessionId) return;
      clearHighlight();
      activeElement = item.element;
      activeElement.setAttribute('data-speech-active', 'true');
      setStatus(`Lendo trecho ${queueIndex + 1} de ${queue.length}.`);
    };

    utterance.onend = () => {
      if (currentSession !== sessionId) return;
      clearHighlight();
      queueIndex += 1;
      speakNext(currentSession);
    };

    utterance.onerror = (event) => {
      if (currentSession !== sessionId || event.error === 'canceled' || event.error === 'interrupted') return;
      stopSpeech('Não foi possível continuar a leitura. Verifique as vozes disponíveis no navegador.');
    };

    synth.speak(utterance);
  };

  const startSpeech = () => {
    if (!supported) return;
    stopSpeech('Preparando a leitura…');
    queue = collectSpeechQueue();
    if (!queue.length) {
      setStatus('Nenhum conteúdo legível foi encontrado nesta página.');
      return;
    }
    choosePortugueseVoice();
    sessionId += 1;
    const currentSession = sessionId;
    queueIndex = 0;
    paused = false;
    updateControls('speaking');
    window.setTimeout(() => speakNext(currentSession), 80);
  };

  const togglePause = () => {
    if (!supported || (!synth.speaking && !synth.paused)) return;
    if (paused || synth.paused) {
      synth.resume();
      paused = false;
      updateControls('speaking');
      setStatus(`Leitura retomada no trecho ${queueIndex + 1} de ${queue.length}.`);
    } else {
      synth.pause();
      paused = true;
      updateControls('paused');
      setStatus('Leitura pausada.');
    }
  };

  controls.start.addEventListener('click', startSpeech);
  controls.pause?.addEventListener('click', togglePause);
  controls.stop?.addEventListener('click', () => stopSpeech());
  controls.rate?.addEventListener('change', () => {
    speechStorage.set('entrefoco-speech-rate', controls.rate.value);
    if (synth.speaking || synth.paused) setStatus('A nova velocidade será aplicada ao próximo trecho.');
  });
  controls.reset?.addEventListener('click', () => {
    if (controls.rate) controls.rate.value = '1';
    speechStorage.remove('entrefoco-speech-rate');
    stopSpeech();
  });

  window.addEventListener('beforeunload', () => {
    if (supported) synth.cancel();
  });

  if (!supported) {
    updateControls('unsupported');
    controls.rate.disabled = true;
    if (controls.voiceStatus) controls.voiceStatus.textContent = 'Este navegador não oferece leitura em voz alta pela Web Speech API.';
    setStatus('Recurso indisponível neste navegador.');
    return;
  }

  const savedRate = speechStorage.get('entrefoco-speech-rate');
  if (savedRate && controls.rate && [...controls.rate.options].some((option) => option.value === savedRate)) controls.rate.value = savedRate;
  choosePortugueseVoice();
  if ('onvoiceschanged' in synth) synth.addEventListener('voiceschanged', choosePortugueseVoice);
  updateControls('idle');
})();
