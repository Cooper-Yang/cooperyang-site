// Sticky chapter nav (table of contents) for long project pages.
// Auto-built from each page's `.project-chapter` sections — no per-page markup.
// Desktop only (CSS hides it below the breakpoint); gives readers the gist
// of where they are and lets them jump between chapters.

const MIN_CHAPTERS = 3; // don't bother on very short pages

export function initChapterNav(lenis) {
  const page = document.querySelector('.page--project');
  if (!page) return;

  const chapters = Array.from(page.querySelectorAll('.project-chapter'));
  if (chapters.length < MIN_CHAPTERS) return;

  // Collect each chapter's anchor id, title, and number — taking the number
  // from the page's own label ("Chapter 03" → "03") so the rail mirrors the
  // in-content labels. Non-chapter interludes (e.g. "The effort") stay
  // unnumbered, exactly as the page presents them.
  const items = chapters.map((section, i) => {
    if (!section.id) section.id = `chapter-${i + 1}`;
    const h2 = section.querySelector('.project-chapter__head h2');
    const title = (h2 ? h2.textContent : `Chapter ${i + 1}`).trim();
    const label = section.querySelector('.project-chapter__head .label');
    const m = label ? label.textContent.match(/(\d+)/) : null;
    const num = m ? m[1].padStart(2, '0') : '';
    return { section, id: section.id, title, num };
  });

  // Build the nav.
  const nav = document.createElement('nav');
  nav.className = 'chapter-nav';
  nav.setAttribute('aria-label', 'Chapters');

  const list = document.createElement('ol');
  list.className = 'chapter-nav__list';

  const links = new Map();
  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'chapter-nav__item';

    const a = document.createElement('a');
    a.className = 'chapter-nav__link';
    a.href = `#${item.id}`;
    a.innerHTML =
      `<span class="chapter-nav__num">${item.num}</span>` +
      `<span class="chapter-nav__title">${item.title}</span>`;

    a.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(item.section, { offset: -96 });
      } else {
        item.section.scrollIntoView({ behavior: 'smooth' });
      }
    });

    li.appendChild(a);
    list.appendChild(li);
    links.set(item.id, li);
  });

  nav.appendChild(list);
  document.body.appendChild(nav);
  document.body.classList.add('has-chapter-nav');

  // Scrollspy — active = the last chapter whose top has crossed a trigger
  // line near the top of the viewport. Deterministic and lag-free, unlike an
  // intersection band, and it handles chapters taller than the viewport.
  let activeId = null;
  const setActive = (id) => {
    if (id === activeId) return;
    activeId = id;
    links.forEach((li, key) => li.classList.toggle('is-active', key === id));
  };

  const update = () => {
    const trigger = window.innerHeight * 0.28;
    let current = items[0].id;
    for (const item of items) {
      if (item.section.getBoundingClientRect().top - trigger <= 0) {
        current = item.id;
      } else {
        break;
      }
    }
    setActive(current);
  };

  // Lenis drives scrolling; fall back to native scroll if it's absent.
  if (lenis && typeof lenis.on === 'function') {
    lenis.on('scroll', update);
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}
