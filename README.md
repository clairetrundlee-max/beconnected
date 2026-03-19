# BeConnected — standalone demo

Next.js app for the **BeConnected** social-planning UI (mock data). This repo is **BeConnected only**—no main inKind dining app.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you’ll be redirected to `/connected`.

## Production build (“build out” folder)

From the **BeConnected** folder:

```bash
cd ~/Downloads/BeConnected
npm install
npm run build:out
```

That creates **`.next/standalone/`** — a self-contained Node server you can copy elsewhere or zip.

Run it:

```bash
cd .next/standalone
node server.js
```

Open **http://localhost:3000**. (Vercel still works the same; this is for running the built app on your machine or another server.)

## Deploy from scratch (GitHub + live URL)

Do these in order. Skip **Part 1** if your code is already on GitHub.

### Part 1 — Push code to GitHub

1. Create a repo on GitHub (e.g. **BeConnected**), empty, no README (or any is fine).
2. In your project folder on your Mac:

   ```bash
   cd ~/Downloads/BeConnected
   git init
   git add .
   git commit -m "Initial BeConnected app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/BeConnected.git
   git push -u origin main
   ```

   If `git remote` already exists, use `git remote set-url origin https://github.com/...` instead of `add`.

### Part 2 — Vercel (get your `.vercel.app` URL)

1. Go to **[vercel.com](https://vercel.com)** and sign in (GitHub login is easiest).
2. Click **Add New… → Project**.
3. **Import** your GitHub repo (`BeConnected` or whatever you named it).
4. On the **Configure Project** screen, check these fields:

   | Field | Set to |
   |-------|--------|
   | **Framework Preset** | Next.js (auto-detected) |
   | **Root Directory** | **Leave empty** — do not type `connected-app` or any subfolder |
   | **Build Command** | `next build` (default) |
   | **Output Directory** | Default (leave blank) |

5. Click **Deploy** and wait until it finishes (~1–2 minutes).
6. When you see **Congratulations**, click **Visit** — that URL (e.g. `https://connected-app-xxx.vercel.app`) is your live site. Opening `/` redirects to `/connected`.

### If the URL doesn’t work

- **Settings → General → Root Directory** must be **empty** for this repo (app is at the root).
- **Deployments**: open the latest row. If it’s **red**, open **Logs** and fix the error, then **Redeploy**.
- Use **Visit** on a **green (Ready)** Production deployment — old preview links can expire.

### Optional: deploy without GitHub (CLI)

```bash
npm i -g vercel
cd ~/Downloads/BeConnected
vercel login
vercel --prod
```

Follow prompts; Vercel will print a production URL.

## Stack

- Next.js 16, React 19, TypeScript, Tailwind v4, Lucide  
- Feed “inKind” buttons open [inkind.com](https://www.inkind.com) in a new tab  

## Structure

- `app/` — layouts, `/connected`, root redirect  
- `components/connected/` — UI + screens  
- `lib/connected/mock.ts` — demo data  
