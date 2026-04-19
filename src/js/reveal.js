import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initReveal() {
  // Wrap lines for split-reveal
  document.querySelectorAll('[data-split-lines]').forEach((el) => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="split-line"><span class="split-line__inner">${w}</span></span>`
      )
      .join(' ');
  });

  // Animate split inners up
  gsap.utils.toArray('[data-split-lines]').forEach((el) => {
    const inners = el.querySelectorAll('.split-line__inner');
    gsap.to(inners, {
      yPercent: 0,
      duration: 1,
      stagger: 0.04,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  // Generic fade+rise
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0');
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'expo.out',
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      }
    });
  });

  // Image mask reveal
  gsap.utils.toArray('[data-reveal-image]').forEach((wrap) => {
    gsap.fromTo(
      wrap,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: wrap, start: 'top 85%', once: true }
      }
    );

    const img = wrap.querySelector('img, video');
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: wrap, start: 'top 85%', once: true }
        }
      );
    }
  });
}
