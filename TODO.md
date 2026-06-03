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

## 2. Go through the archive projects ✅ DONE (2026-06-02)
Reviewed every archive entry (06–15) for copy, layout, and image sizing.
- **Copy** ✅ — done as part of #1 (all 10 archive pages de-AI'd).
- **Layout / image-sizing** ✅ — audited all 29 two-up image rows by actual
  aspect ratio. The `spread__media--2` grid forces 16:10 cover, so it crops
  tall/near-square level-design top-downs and ultra-wide blueprints. Stacked
  14 such rows to one-per-row (full-width, natural aspect) across vect0r,
  vect0r-ld, zhuang-zhou-ld, vamp, epitaph-1997-ld. Pico-8's 1:1 gifs got a
  new `.spread__media--sq` modifier (side-by-side but uncropped square). Kept
  the genuine clean-landscape comparison pairs (judge, incite, MHA,
  flashlight-ld + the ~1.6–1.84 beta/alpha/whitebox pairs) as 2-up.
- _Optional follow-up (not done): convert remaining heavy `.gif`s to muted
  autoplay mp4 for weight (the prior pattern). Pico-8 gifs intentionally
  left as gifs._

## 3. Add "Masterworks of Horror" ✅ DONE (2026-06-02)
Authored `projects/masterworks-of-horror.html` (flagship case study: technical
producer + network/gameplay engineering on a real-time server-authoritative PvP
card game). Researched from the real Unity repo + tooling, evidence-grounded.
Went to the **front page** (not archive) as a 2nd large feature tile beside SYNCED;
portfolio is now 16 pieces, whole next-chain + archive renumbered, projects.js +
vite.config wired. Includes a custom git heat-graph, the FROST/agent-friction
producer centerpiece, war-story cards, and a bot-AI code specimen. Shipped commit `8bf8595`.
- _Remaining: the **UI Lead** half is its own future page (deck editor, gacha/store,
  UI Toolkit data-binding). Optional asset swaps: Build Console screenshot, a free-cam
  GIF, a FROST/Reveries screenshot; the MoH front-page tile is currently a static crop
  (could be a gif/mp4 for motion)._

---
_Deploy reminder: changes auto commit + push to `redesign`, then `vercel --prod`
(the GitHub→Vercel auto-deploy isn't wired for this branch)._
