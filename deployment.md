# Deployment

**Live app:** https://coffee-brew-log-1vtl.onrender.com
**API:** https://coffee-brew-log-api-l33d.onrender.com

Both deployed on Render's free tier.

## Architecture

- **Database:** Render PostgreSQL (managed, free tier)
- **Backend:** Render Web Service, root directory backend, connects to the database over Render's internal network
- **Frontend:** Render Static Site, root directory frontend, built with Vite and served as static files

## How it was deployed

### 1. PostgreSQL database

1. Render dashboard -> New -> PostgreSQL
2. Free plan, region Ohio (US East)
3. Copied the Internal Database URL for use by the backend service (Internal is faster and stays on Render's private network since both services live on Render)

### 2. Backend (web service)

1. Render dashboard -> New -> Web Service, connected to the coffee-brew-log GitHub repo
2. Settings:
   - Root Directory: backend
   - Build Command: npm install && npx prisma generate
   - Start Command: npm start
   - Instance Type: Free
3. Environment variables:
   - DATABASE_URL - the Postgres Internal Database URL
   - CORS_ORIGIN - set to the frontend's live URL (https://coffee-brew-log-1vtl.onrender.com)
4. Deployed successfully; verified by visiting /api/brews directly and seeing real JSON data back.

### 3. Frontend (static site)

1. Render dashboard -> New -> Static Site, same GitHub repo
2. Settings:
   - Root Directory: frontend
   - Build Command: npm install && npm run build
   - Publish Directory: dist
3. Environment variable:
   - VITE_API_URL - the backend's live URL (https://coffee-brew-log-api-l33d.onrender.com)
4. Deployed successfully.

## Troubleshooting log

Real issues hit during this build and deploy, and how they were resolved:

- **npm scripts blocked on Windows (PowerShell execution policy)** — npm is a PowerShell script on Windows, and script execution is disabled by default. Fixed with Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned, run as Administrator.

- **Project accidentally created inside C:\Windows\System32** — the terminal opened there by default; moved the project folder to the user directory and re-initialized git there.

- **npm blocked Prisma's install scripts** — newer npm requires explicit approval for install scripts (a security default). Fixed with npm approve-scripts, then npm rebuild to actually run the previously-blocked scripts and download Prisma's engine binaries.

- **File permission errors saving .env in the backend folder** — leftover restrictive permissions from when the project briefly lived in System32. Fixed with takeown and icacls to reclaim ownership of the folder, run as Administrator.

- **Prisma 7 generator mismatch** — the default prisma-client generator outputs TypeScript, which plain require() in a CommonJS Express app can't load. Switched schema.prisma to provider = "prisma-client-js" for a plain JS output at the default node_modules/@prisma/client location.

- **"PrismaClient was instantiated without any options. A driver adapter is required"** — Prisma 7 requires an explicit driver adapter for PostgreSQL rather than connecting directly. Fixed by installing @prisma/adapter-pg and pg, and passing a PrismaPg adapter to PrismaClient.

- **"Server has closed the connection" (P1017) when querying** — Render's Postgres requires SSL for connections, which the pg driver doesn't enable by default. Fixed by passing ssl: { rejectUnauthorized: false } to the adapter.

- **GitHub push rejected with 403 Permission denied** — local Git credentials on Windows were cached for a different GitHub account than the one that owned the target repo. Fixed by removing the stale credentials from Windows Credential Manager and re-authenticating as the correct account.

- **VS Code file saves silently not writing to disk** — new files created and edited in VS Code sometimes never actually landed on disk, or landed in the wrong folder. Worked around by writing files directly from PowerShell using here-strings (@'...'@ | Out-File), which guarantees exact, verifiable file contents every time.

- **Blank white page on first load of the deployed frontend, with 404s on the JS/CSS bundle** — resolved by a hard refresh; looked like a transient caching issue right after the static site's first deploy.
