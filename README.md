# Tanvi's Learning World

A colourful UKG learning game for **Tanvi** (St Helena's Pune, ICSE) — Maths, English, Hindi, and EVS mini-games with stars, confetti, and auto difficulty.

Built with **React + TypeScript + Vite**. Progress is saved in the browser (`localStorage`).

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build |

## Features

- World-map home with four subject islands
- ~20 mini-games (count, phonics, Hindi swar/vyanjan, EVS, and more)
- Stars, confetti, and gentle Web Audio sounds
- Auto difficulty (levels up after correct streaks)
- Parent dashboard (PIN: `1234`) with progress report

## Deploy to Cloudflare Pages (free tier)

### Option A — GitHub (recommended)

1. Push this repo to GitHub.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → connect the repo.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Deploy command:** leave **empty** (do not use `npx wrangler deploy`)
   - **Node version:** 20 (or later)
4. Deploy. Cloudflare Pages uploads `dist/` automatically after the build. SPA routes are handled by `public/_redirects`.

> **Important:** `npx wrangler deploy` is for Cloudflare **Workers**, not Pages. If you set it as the deploy command, the build will succeed but deployment will fail.

### Option B — Wrangler CLI (manual deploy)

```bash
npm run build
npx wrangler pages deploy dist --project-name tanvi-learning-world
```

`wrangler.toml` is included with `pages_build_output_dir = "dist"`.

## Parent PIN

Default PIN is `1234`. Change it in [`src/config.ts`](src/config.ts).

## Notes

- Fonts (Nunito + Noto Sans Devanagari) load from Google Fonts on first visit, then are cached.
- No login or server is required after the static site is deployed.
