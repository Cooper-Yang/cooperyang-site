import { gsap } from 'gsap';

export function initIndexPreview() {
  const preview = document.querySelector('[data-index-preview]');
  if (!preview) return;
  if (matchMedia('(hover: none)').matches) return;

  const rows = document.querySelectorAll('[data-index-row]');
  if (!rows.length) return;

  const img = preview.querySelector('img');
  const pos = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let visible = false;

  window.addEventListener('mousemove', (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  });

  gsap.ticker.add(() => {
    pos.x += (target.x - pos.x) * 0.12;
    pos.y += (target.y - pos.y) * 0.12;
    preview.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${visible ? 1 : 0.92})`;
  });

  rows.forEach((row) => {
    const src = row.getAttribute('data-preview-src');
    row.addEventListener('mouseenter', () => {
      if (src && img) img.src = src;
      preview.classList.add('is-visible');
      visible = true;
    });
    row.addEventListener('mouseleave', () => {
      preview.classList.remove('is-visible');
      visible = false;
    });
  });
}
