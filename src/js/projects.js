// Single source of truth for the home reel (and anywhere else we need a
// project list). The first five are the "selected work" shown on the home reel
// and numbered index; the rest live in the archive.

export const projects = [
  {
    href: '/projects/synced.html',
    thumb: '/assets/images/synced-thumb.gif',
    title: 'SYNCED',
    meta: '2022 — 24'
  },
  {
    href: '/projects/vect0r.html',
    thumb: '/assets/images/vect0r-thumb.gif',
    title: 'VECT0R',
    meta: '2025'
  },
  {
    href: '/projects/epitaph-1997.html',
    thumb: '/assets/images/epitaph-thumb.gif',
    title: 'Epitaph 1997',
    meta: '2023'
  },
  {
    href: '/projects/flashlight.html',
    thumb: '/assets/images/flashlight-thumb.gif',
    title: 'Flashlight',
    meta: '2019'
  },
  {
    href: '/projects/vamp.html',
    thumb: '/assets/images/vamp-thumb.gif',
    title: 'VAMP',
    meta: '2024'
  },
  {
    href: '/projects/judge.html',
    thumb: '/assets/images/judge-thumb.gif',
    title: 'Judge',
    meta: '2022'
  },
  {
    href: '/projects/incite-infiltrate.html',
    thumb: '/assets/images/incite-thumb.gif',
    title: 'Incite & Infiltrate',
    meta: '2023'
  },
  {
    href: '/projects/pico8-prototypes.html',
    thumb: '/assets/images/pico8-thumb.gif',
    title: 'Pico-8',
    meta: '2021'
  },
  {
    href: '/projects/doom-e1m1.html',
    thumb: '/assets/images/doom-thumb.gif',
    title: 'Doom E1M1',
    meta: '2023'
  },
  {
    href: '/projects/vect0r-ld.html',
    thumb: '/assets/images/vect0r-grapple.gif',
    title: 'VECT0R · LD',
    meta: '2025'
  },
  {
    href: '/projects/epitaph-1997-ld.html',
    thumb: '/assets/images/epitaph-ld-thumb.gif',
    title: 'Epitaph · LD',
    meta: '2022'
  },
  {
    href: '/projects/zhuang-zhou-ld.html',
    thumb: '/assets/images/zhuangzhou-levelart.png',
    title: 'Zhuang Zhou · LD',
    meta: '2024'
  },
  {
    href: '/projects/portal2-light-bridge-ld.html',
    thumb: '/assets/images/portal2-thumb.gif',
    title: 'Portal 2 · LD',
    meta: '2021'
  }
];

// The front-page reel and numbered index only show the five main projects.
// Archive uses the rest of `projects`.
export const selectedProjects = projects.slice(0, 5);
