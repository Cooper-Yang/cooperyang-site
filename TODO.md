# Portfolio — To-Do

Working branch: **redesign** (this is what deploys to cooperyang.com).

## 1. Make the copy feel less AI-generated — kill the em-dashes ✅ DONE (2026-06-02)
Every prose em-dash is gone. All 15 project pages were rewritten (one agent per
page + an adversarial verify pass) and `about.html`/`archive.html` by hand;
appositives became real sentences, the glossary-dash cadence and "X, not Y" /
"isn't just X" tails were cut. Design separators kept: the `·` middots, the
`meta-accent` dashes, and date ranges (normalized to en-dashes). Page `<title>`s
now use the `·` brand separator. Shipped to `redesign` → cooperyang.com.
_Remaining literal `—` are intentional: meta-accent separators + one "no date"
year placeholder + `index.html` `&mdash;` meta labels._

## 2. Go through the archive projects
Review/iterate each archive entry (numbers 06–15) for layout, image sizing
(one-per-row where cramped), and copy:
- judge, incite-infiltrate, pico8-prototypes, doom-e1m1, vect0r-ld,
  epitaph-1997-ld, zhuang-zhou-ld, portal2-light-bridge-ld, flashlight-ld,
  my-hero-academia
- _Copy: ✅ done as part of #1 (all 10 archive pages de-AI'd)._
- _Still pending: layout + image-sizing pass (look at the rendered pages for
  cramped 2-up rows → one-per-row, heavy gifs → muted mp4)._

## 3. Add "Masterworks of Horror" to the portfolio
New project — not on the old cargo.site, so it needs source material.
- Need from Cooper: title/role/dates/engine, write-up, and images/clips.
- Then author the page in the editorial style, add to archive.html (becomes
  16 pieces / renumber `/15` → `/16`), wire the next-project chain + vite.config.js.

---
_Deploy reminder: changes auto commit + push to `redesign`, then `vercel --prod`
(the GitHub→Vercel auto-deploy isn't wired for this branch)._
