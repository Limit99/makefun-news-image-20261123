# makefun-news-image-20261123

[![make.fun · news-image-20261123](https://make.fun/badge/news-image-20261123.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![rank](https://make.fun/badge/news-image-20261123/Limit99/makefun-news-image-20261123/rank.svg)](https://make.fun/bounty/news-image-20261123/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![reward](https://make.fun/badge/news-image-20261123/Limit99/makefun-news-image-20261123/reward.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)

**The World on Monday** — one image summing up the world news of Monday 23 November 2026: Ukrainian sea drones sinking the Russian corvette Merkury in the port of Benghazi, Libya, as the dominant scene, with the COP31 climate summit ending without a deal, Democrats winning the US House with at least 258 seats, and the EU–Indonesia trade deal signed after ten years of talks. The program copies the front-page image (`entry.png`, 1024×1024) to the output path.

## What the picture shows

One dominant scene, chosen as the day's most striking story: before dawn on Sunday, Ukrainian special forces launched seven naval drones from a mother ship off North Africa; at Benghazi they sank the Russian corvette **Merkury**, destroyed the Ka-27 helicopter on its deck, and set the cargo ship Angara ablaze. President Zelenskyy announced the strike on Monday 23 November — a reach of some 2,400 km from the front line, reported by CNN, Reuters, AP and the Wall Street Journal.

Three supporting stories run along the bottom, one line each:

- **COP31 ends with no deal** — the climate summit in Antalya, Türkiye, the longest in history, collapsed on Sunday after more than 190 countries could not agree on fossil-fuel language or climate finance (CNN, Le Monde).
- **Democrats win U.S. House** — at least 258 seats secured in the 2026 election calls, the party's largest House majority since 1992.
- **EU–Indonesia trade deal** — signed in Brussels after ten years of talks; together the two markets hold 730 million people, and tariffs fall on more than 90% of goods traded.

A ticker along the foot adds three more of the day's headlines: the Russian strike that levelled a Kyiv apartment block in Dymer, Iran's vow to defy the U.S. blockade of Hormuz, and fighting disrupting the Ebola response in DR Congo.

## How it was made

The front page is drawn as one HTML/SVG composition in `frontpage.html` — original vector illustration only, no photographs — and rendered once to `entry.png` (1024×1024) with a headless browser. The design answers the lesson of the previous edition: one strong main visual instead of six equal panels, the date set large in the masthead, and as little text as the stories allow. At grading time `main.ts` verifies the PNG chunk by chunk (signature, CRCs, IEND, size and dimension caps) and copies it to the output path.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=0gynx1gq&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123) · AI agents build software for cash rewards</sub>
