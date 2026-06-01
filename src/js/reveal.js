import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initReveal() {
  // Wrap each word for split-reveal
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

  // Respect reduced-motion: render everything in its final state, no animation.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    gsap.set('[data-split-lines] .split-line__inner', { opacity: 1, y: 0 });
    gsap.set('[data-reveal]', { opacity: 1, y: 0 });
    gsap.set('[data-reveal-image]', { clipPath: 'inset(0% 0% 0% 0%)' });
    gsap.set('[data-reveal-image] img, [data-reveal-image] video', { scale: 1 });
    return;
  }

  // Elements already within the viewport at load animate immediately. This avoids
  // a ScrollTrigger race where webfont loading (the large Fraunces hero) shifts
  // layout after triggers are computed, leaving above-the-fold content stuck hidden.
  const inViewport = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.95 && r.bottom > 0;
  };

  // Split-line targets are page-title heroes at the very top of the document, so they
  // always animate in immediately on load — no ScrollTrigger, which previously failed
  // to fire here once the large webfont shifted layout, leaving the hero stuck hidden.
  gsap.utils.toArray('[data-split-lines]').forEach((el) => {
    const inners = el.querySelectorAll('.split-line__inner');
    gsap.to(inners, { opacity: 1, y: 0, duration: 0.9, stagger: 0.05, ease: 'expo.out' });
  });

  // Generic fade + rise
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0');
    const vars = { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', delay };
    if (inViewport(el)) {
      gsap.to(el, vars);
    } else {
      gsap.to(el, {
        ...vars,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    }
  });

  // Image mask reveal
  gsap.utils.toArray('[data-reveal-image]').forEach((wrap) => {
    const img = wrap.querySelector('img, video');
    const run = () => {
      gsap.fromTo(
        wrap,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' }
      );
      if (img) {
        gsap.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.6, ease: 'expo.out' });
      }
    };
    if (inViewport(wrap)) {
      run();
    } else {
      ScrollTrigger.create({ trigger: wrap, start: 'top 85%', once: true, onEnter: run });
    }
  });

  // Webfonts (Fraunces) change layout substantially — recompute trigger positions
  // once they're ready and after full load so below-the-fold triggers stay accurate.
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refresh);
  }
  window.addEventListener('load', refresh);

  // Failsafe: never leave content that is on-screen hidden. By the time this fires
  // the entrance animations have finished (so it is a no-op in the normal case); it
  // only matters if a tween failed to run — e.g. a ScrollTrigger position race after
  // the large webfont loads. Viewport membership is recomputed here, once layout has
  // settled, so it is correct even if innerHeight was unavailable at init.
  setTimeout(() => {
    // Split-line targets are page-title heroes at the top of the document, so they
    // must always end up visible — reveal them unconditionally.
    gsap.set('[data-split-lines] .split-line__inner', { opacity: 1, y: 0 });
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (inViewport(el)) gsap.set(el, { opacity: 1, y: 0 });
    });
    document.querySelectorAll('[data-reveal-image]').forEach((el) => {
      if (inViewport(el)) {
        gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' });
        const m = el.querySelector('img, video');
        if (m) gsap.set(m, { scale: 1 });
      }
    });
  }, 1600);
}
