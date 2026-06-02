# Portfolio — To-Do

Working branch: **redesign** (this is what deploys to cooperyang.com).

## 1. Make the copy feel less AI-generated — kill the em-dashes
The biggest tell is the em-dash (`—`). There are **~339** across the site. Removing
them isn't find-and-replace: each one joins clauses, so the fix is to **rewrite**
into natural, human sentences (periods, commas, plain phrasing) and trim the
"X — Y" / "not X, but Y" cadence.

Counts by page (highest first):
- vect0r.html (43), epitaph-1997.html (30), vect0r-ld.html (26), vamp.html (24),
  judge.html (23), portal2-light-bridge-ld.html (22), zhuang-zhou-ld.html (22),
  epitaph-1997-ld.html (20), flashlight-ld.html (18), synced.html (18),
  incite-infiltrate.html (16), pico8-prototypes.html (16), flashlight.html (15),
  doom-e1m1.html (13), about.html (12), my-hero-academia.html (12),
  archive.html (9)
- Also relax other AI-isms: "isn't just X, it's Y", "from X to Y", triads, and
  over-polished captions.
- Keep the meta separators (the `·` middots in labels/meta) — those are design,
  not prose.

## 2. Go through the archive projects
Review/iterate each archive entry (numbers 06–15) for layout, image sizing
(one-per-row where cramped), and copy:
- judge, incite-infiltrate, pico8-prototypes, doom-e1m1, vect0r-ld,
  epitaph-1997-ld, zhuang-zhou-ld, portal2-light-bridge-ld, flashlight-ld,
  my-hero-academia

## 3. Add "Masterworks of Horror" to the portfolio
New project — not on the old cargo.site, so it needs source material.
- Need from Cooper: title/role/dates/engine, write-up, and images/clips.
- Then author the page in the editorial style, add to archive.html (becomes
  16 pieces / renumber `/15` → `/16`), wire the next-project chain + vite.config.js.

---
_Deploy reminder: changes auto commit + push to `redesign`, then `vercel --prod`
(the GitHub→Vercel auto-deploy isn't wired for this branch)._
