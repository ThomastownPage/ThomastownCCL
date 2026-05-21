# Thomastown Community Centre Limited — Website

Public website for **Thomastown Community Centre Limited (ThomastownCCL)**, Thomastown, Co. Kilkenny.  
Built with React 18 + TypeScript (Vite), an Express.js API backend, TailwindCSS 4, and shadcn/ui (Radix UI) components.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [NPM Scripts](#npm-scripts)
6. [Pages & Routes](#pages--routes)
7. [Data Flow & State Management](#data-flow--state-management)
8. [Backend API](#backend-api)
9. [Admin Panel](#admin-panel)
10. [Theme System](#theme-system)
11. [Image Optimization](#image-optimization)
12. [Production Build & Deployment](#production-build--deployment)
13. [GitHub Data Sync](#github-data-sync)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript |
| Build tool | Vite 6 |
| Styling | TailwindCSS 4, CSS custom properties |
| UI components | shadcn/ui (Radix UI primitives) |
| Icons | Lucide React, MUI Icons |
| Routing | React Router 7 |
| Backend | Node.js + Express 4 |
| File uploads | Multer |
| Data store | `server/data.json` (flat-file JSON) |
| Remote sync | GitHub Contents API (optional) |

---

## Project Structure

```
├── index.html                  # Vite HTML entry point
├── vite.config.ts              # Vite config (proxy, chunking, aliases)
├── postcss.config.mjs
├── package.json
├── .env                        # Local env vars (not committed)
├── .env.example                # Template for required env vars
│
├── scripts/
│   └── optimize-images.js      # Batch image optimizer (sharp)
│
├── server/
│   ├── server.js               # Express API server
│   ├── data.json               # Persistent data store (concerts, events, news)
│   └── uploads/                # Uploaded images (created automatically)
│
└── src/
    ├── main.tsx                # React entry point
    ├── public/
    │   └── images/             # Static assets (logo, photos, flyers)
    └── app/
        ├── App.tsx             # Root component — wraps providers + router
        ├── routes.tsx          # All client-side routes (lazy-loaded)
        ├── components/
        │   ├── Header.tsx      # Sticky nav with mobile hamburger menu
        │   ├── Footer.tsx
        │   ├── Layout.tsx      # Shared page wrapper (Header + Footer + Outlet)
        │   ├── ThemeSwitch.tsx # Theme colour switcher (currently hidden)
        │   └── ui/             # shadcn/ui components (Button, Dialog, etc.)
        ├── context/
        │   ├── AuthContext.tsx  # Admin auth (login/logout, Bearer token)
        │   ├── DataContext.tsx  # Global data (concerts, events, news) + CRUD
        │   └── ThemeContext.tsx # Colour theme (blue/orange/green/gradient)
        └── pages/
            ├── Home.tsx
            ├── History.tsx
            ├── Concerts.tsx
            ├── Facilities.tsx
            ├── News.tsx
            ├── TidyTowns.tsx
            ├── Contact.tsx
            ├── AdminLogin.tsx
            └── AdminPanel.tsx
```

---

## Getting Started

### Prerequisites

- **Node.js** 18 or later
- **npm** (or pnpm — a `pnpm-workspace.yaml` is present)

### Install & run locally

```bash
npm install          # install all dependencies

cp .env.example .env # create your local env file, then edit it
npm run dev          # start both Vite dev server and Express API together
```

Vite runs on **http://localhost:5173** and proxies `/api` and `/uploads` to the Express server on **http://localhost:3001**.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Default | Description |
|---|---|---|
| `ADMIN_USER` | `admin` | Admin panel username |
| `ADMIN_PASS` | `admin123` | Admin panel password — **change before going live** |
| `PORT` | `3001` | Port the Express server listens on |
| `CORS_ORIGIN` | `*` | Allowed CORS origin (set to your domain in production) |
| `GITHUB_TOKEN` | _(empty)_ | Personal access token for GitHub data sync (optional) |
| `GITHUB_REPO` | `RadiiYevstratov/ThomastownCCL` | Target repo for data sync (optional) |
| `GITHUB_BRANCH` | `main` | Branch for data sync (optional) |

If `GITHUB_TOKEN` and `GITHUB_REPO` are not set the app still works fine — data is only stored locally in `server/data.json`.

---

## NPM Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Runs Vite + Express concurrently (development) |
| `npm run dev:client` | Vite only |
| `npm run dev:server` | Express only |
| `npm run build` | Vite production build → `dist/` |
| `npm start` | Runs `server/server.js` in production (serves `dist/`) |
| `npm run optimize:images` | Batch-compress images in `src/public/images/` |

---

## Pages & Routes

All public pages share `Layout` (Header + Footer). Admin routes are standalone.

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Hero section, upcoming events preview, news highlights |
| `/history` | `History` | History of the community centre |
| `/concerts` | `Concerts` | Upcoming and past events/concerts (data from API) |
| `/facilities` | `Facilities` | Rooms and facilities available for hire |
| `/news` | `News` | News articles (data from API) |
| `/tidytowns` | `TidyTowns` | TidyTowns initiative page |
| `/contact` | `Contact` | Contact form and location info |
| `/admin/login` | `AdminLogin` | Admin login page |
| `/admin` | `AdminPanel` | Admin CMS (protected) |

All page components are **lazy-loaded** via `React.lazy()` for faster initial load.

---

## Data Flow & State Management

The app uses three React Contexts:

### `DataContext` (`src/app/context/DataContext.tsx`)

Global store for the three dynamic data types:

- `Concert` — events/concerts (title, artist, date, time, price, image, description, isPast, eventType, flyers, address)
- `Event` — calendar events (title, date, type)
- `NewsArticle` — news items (title, date, category, image, excerpt)

On mount, `DataProvider` fetches all three collections from the API (`/api/concerts`, `/api/events`, `/api/news`).  
All mutations (add, update, delete, reorder) apply **optimistically** to local state and immediately call the corresponding authenticated API endpoint in the background. If the server returns 401, the user is redirected to `/admin/login`.

### `AuthContext` (`src/app/context/AuthContext.tsx`)

Stores the admin Bearer token in `localStorage` under the key `cc_admin_token`.  
Provides `login(username, password)` (calls `POST /api/login`) and `logout()`.  
Helper exports `getAuthToken()` and `getAuthHeader()` are used by `DataContext` for authenticated requests.

### `ThemeContext` (`src/app/context/ThemeContext.tsx`)

Persists a colour theme (`blue` | `orange` | `green` | `gradient`) in `localStorage` under `site-theme`.  
Applies a CSS class (`theme-orange`, `theme-green`, `theme-gradient`) to `<html>` — the default blue theme has no extra class.  
Theme variables are defined in `src/styles/globals.css` as CSS custom properties (`--brand-light`, `--brand-dark`, etc.).

---

## Backend API

The Express server (`server/server.js`) runs on port 3001 and stores all data in `server/data.json`.

### Authentication

`POST /api/login` — body `{ username, password }` → returns `{ token }` on success.  
`POST /api/logout` — stateless; simply used to signal intent.

Protected routes require `Authorization: Bearer <token>` header. The token is a deterministic HMAC derived from the admin credentials — changing `ADMIN_USER` or `ADMIN_PASS` immediately invalidates all existing tokens.

### Concerts

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/concerts` | No | List all concerts |
| POST | `/api/concerts` | Yes | Create concert |
| PUT | `/api/concerts` | Yes | Replace entire array (used for reordering) |
| PUT | `/api/concerts/:id` | Yes | Update one concert |
| DELETE | `/api/concerts/:id` | Yes | Delete one concert |

### Events

Same pattern as Concerts: `GET/POST/PUT/PUT:id/DELETE` at `/api/events`.

### News

Same pattern: `GET/POST/PUT/PUT:id/DELETE` at `/api/news`.

### File Upload

`POST /api/upload` (Auth required) — multipart `file` field, max 20 MB.  
Returns `{ url: "/uploads/<filename>" }`. Uploaded files are stored locally in `server/uploads/` **and** pushed to the GitHub repository at `server/uploads/<filename>` (if `GITHUB_TOKEN` is configured). On server startup, any images present in the repo but missing locally are automatically downloaded, so uploads survive redeployments.

---

## Admin Panel

Navigate to `/admin/login` and log in with the credentials from your `.env` file.

The admin panel (`/admin`) has two tabs:
- **Events/Concerts** — add, edit, delete, and drag-reorder concerts. Supports image upload, flyer images, event type, address, and marking an item as past.
- **News** — add, edit, delete, and reorder news articles.

The panel is **not** accessible without a valid token. Attempting to load `/admin` while unauthenticated redirects to `/admin/login`.

---

## Theme System

Four colour themes are supported. Switch via `ThemeContext.setTheme()`:

| Theme key | CSS class on `<html>` |
|---|---|
| `blue` | _(none — default)_ |
| `orange` | `theme-orange` |
| `green` | `theme-green` |
| `gradient` | `theme-gradient` |

CSS variables (`--brand-light`, `--brand-dark`, etc.) are overridden per-theme in `src/styles/globals.css`.  
The `ThemeSwitch` component in the header is currently commented out but can be re-enabled.

---

## Image Optimization

Run before committing new images to keep page load times fast:

```bash
npm run optimize:images
```

The script (`scripts/optimize-images.js`) uses **sharp** to:
- Resize images larger than 1600 px on either dimension (preserves aspect ratio)
- Re-encode JPEG at quality 72 (progressive)
- Re-encode PNG at maximum compression
- Re-encode WebP at quality 82
- Print a per-file and total size savings summary

To optimize images in a different directory:

```bash
node scripts/optimize-images.js --dir=path/to/images
```

---

## Production Build & Deployment

```bash
npm run build   # outputs to dist/
npm start       # Express serves dist/ as static files + API
```

In production the Express server serves the built React app from `dist/` and all API routes remain at `/api/*`. No separate static host is needed — a single `npm start` runs everything.

Set `CORS_ORIGIN` in `.env` to your actual domain to restrict cross-origin requests.

---

## GitHub Data Sync

If `GITHUB_TOKEN` and `GITHUB_REPO` are configured, the server:

1. **On startup** — pulls `server/data.json` from the repo so the deployed instance always starts with the latest data.
2. **On every write** — schedules a push of the updated `data.json` back to GitHub after a 1.5 s debounce (so rapid successive edits are batched into one commit).

This means `data.json` in the repository acts as the persistent source of truth across deployments. To disable sync, simply leave `GITHUB_TOKEN` empty.

