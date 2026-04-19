import { gsap } from 'gsap';

let cursorEl = null;

function attachTargets(root = document) {
  if (!cursorEl) return;
  root.querySelectorAll('[data-cursor]').forEach((el) => {
    if (el.dataset.cursorBound) return;
    el.dataset.cursorBound = '1';
    const label = el.getAttribute('data-cursor');
    el.addEventListener('mouseenter', () => {
      cursorEl.classList.add('is-hover');
      if (label) {
        cursorEl.classList.add('is-label');
        cursorEl.textContent = label;
      }
    });
    el.addEventListener('mouseleave', () => {
      cursorEl.classList.remove('is-hover', 'is-label');
      cursorEl.textContent = '';
    });
  });
}

export function initCursor() {
  if (matchMedia('(hover: none)').matches) return;

  cursorEl = document.createElement('div');
  cursorEl.className = 'cursor';
  document.body.appendChild(cursorEl);

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const target = { x: pos.x, y: pos.y };

  window.addEventListener('mousemove', (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  });

  gsap.ticker.add(() => {
    pos.x += (target.x - pos.x) * 0.22;
    pos.y += (target.y - pos.y) * 0.22;
    cursorEl.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
  });

  attachTargets();
}

export function bindCursorTargets(root) {
  attachTargets(root);
}
