import { gsap } from 'gsap';
import { selectedProjects as projects } from './projects.js';
import { bindCursorTargets } from './cursor.js';

// Hero reel — a single cinematic strip that crossfades through each project's
// footage. Think Marathon site: the video IS the hero. All UI floats on top.

export function initReel() {
  const reel = document.querySelector('[data-reel]');
  if (!reel) return;
  const stage = reel.querySelector('[data-reel-stage], .home-reel__media');
  const ticker = reel.querySelector('[data-reel-ticker]');
  if (!stage) return;

  // Build frames — img per project
  stage.innerHTML = projects
    .map(
      (p, i) => `
      <img
        class="home-reel__frame${i === 0 ? ' is-active' : ''}"
        src="${p.thumb}"
        alt=""
        aria-hidden="true"
        loading="${i === 0 ? 'eager' : 'lazy'}"
        decoding="async"
        data-idx="${i}"
      />
    `
    )
    .join('');

  const frames = Array.from(stage.querySelectorAll('.home-reel__frame'));
  const indexLinks = Array.from(reel.querySelectorAll('[data-reel-index]'));
  let current = 0;

  const updateIndexLinks = (idx) => {
    indexLinks.forEach((link) => {
      const isActive = Number(link.dataset.reelIndex) === idx;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const updateTicker = (idx) => {
    if (!ticker) return;
    const p = projects[idx];
    const titleEl = ticker.querySelector('.ticker__title');
    const numEl = ticker.querySelector('.ticker__num');
    const metaEl = ticker.querySelector('.ticker__meta');
    if (titleEl) titleEl.textContent = p.title;
    if (numEl) numEl.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
    if (metaEl) metaEl.textContent = p.meta;
    // fade the ticker text on change
    gsap.fromTo(
      [titleEl, metaEl, numEl].filter(Boolean),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
    );
  };

  // Make the active clickable link pointer to the current project
  const clickLink = reel.querySelector('[data-reel-link]');
  const updateClickLink = (idx) => {
    if (clickLink) clickLink.href = projects[idx].href;
  };

  const goTo = (idx) => {
    const target = (idx + frames.length) % frames.length;
    if (target === current) return;
    frames[current].classList.remove('is-active');
    frames[target].classList.add('is-active');
    current = target;
    updateTicker(current);
    updateClickLink(current);
    updateIndexLinks(current);
  };

  const advance = () => goTo(current + 1);

  updateTicker(current);
  updateClickLink(current);
  updateIndexLinks(current);

  // Cycle every 4s — long enough to read, short enough to feel alive
  const CYCLE_MS = 4200;
  let timer;
  const stopTimer = () => {
    clearInterval(timer);
    timer = null;
  };
  const startTimer = () => {
    stopTimer();
    timer = setInterval(advance, CYCLE_MS);
  };
  const resetTimer = startTimer;
  startTimer();

  // Manual prev/next buttons
  const prevBtn = reel.querySelector('[data-reel-prev]');
  const nextBtn = reel.querySelector('[data-reel-next]');
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goTo(current - 1);
      resetTimer();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goTo(current + 1);
      resetTimer();
    });
  }

  indexLinks.forEach((link) => {
    const idx = Number(link.dataset.reelIndex);
    if (!Number.isInteger(idx) || idx < 0 || idx >= frames.length) return;

    link.addEventListener('mouseenter', () => {
      goTo(idx);
      stopTimer();
    });
    link.addEventListener('focus', () => {
      goTo(idx);
      stopTimer();
    });
  });

  const dock = reel.querySelector('.home-work-dock');
  if (dock) {
    dock.addEventListener('mouseleave', startTimer);
    dock.addEventListener('focusout', () => {
      if (!dock.contains(document.activeElement)) startTimer();
    });
  }

  // Keyboard arrows when hero has focus
  reel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goTo(current - 1);
      resetTimer();
    } else if (e.key === 'ArrowRight') {
      goTo(current + 1);
      resetTimer();
    }
  });

  // Pause cycling when tab is hidden (battery friendly)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  bindCursorTargets(reel);
}
