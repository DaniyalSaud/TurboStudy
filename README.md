# TurboStudy

TurboStudy is a full-stack React Router app for studying faster: generate AI-powered notes (optionally from PDFs), manage your notes, and chat as you learn.

## Tech stack

- React Router (SSR) + React
- TypeScript + Vite
- Tailwind CSS + shadcn/ui
- MongoDB (Mongoose) + Better Auth (email/password)
- LangChain + Google Gemini
- PDF parsing via `pdf-parse`

## What’s in the app

- Landing pages: `/`, `/about`, `/pricing`, `/login`, `/sign-up`
- Dashboard: `/dashboard/*` (notes, chat, history, upload)
- API routes (resource routes): `/api/*` + `/api/auth/*`

## Prerequisites

- Node.js 20+
- A MongoDB instance (local or hosted)
- A Google AI API key (Gemini)

## Setup

1) Install deps

```bash
npm install
```

2) Configure environment variables

Copy the template and fill it in:

```bash
cp .env.example .env
```

Required variables:

- `MONGO_URI` — MongoDB connection string
- `GOOGLE_API_KEY` — Gemini API key
- `BETTER_AUTH_SECRET` — random secret for Better Auth
- `BETTER_AUTH_URL` — public base URL of the app (used by Better Auth)
- `VITE_BASE_URL` — base URL for the Better Auth React client

Security note: never commit real secrets. If you accidentally exposed keys, rotate them.

3) Run in development

```bash
npm run dev
```

Open `http://localhost:5173`.

## Scripts

- `npm run dev` — dev server (HMR)
- `npm run build` — production build
- `npm run start` — run the production server (serves the `build/` output)
- `npm run typecheck` — generate types + TypeScript check

## Production

```bash
npm run build
npm run start
```

By default the production server listens on port 3000.

When deploying, make sure `BETTER_AUTH_URL` and `VITE_BASE_URL` match your deployed origin (e.g. `https://your-domain.com`).

## Docker

Build:

```bash
docker build -t turbostudy .
```

Run (expects MongoDB to be reachable from the container via `MONGO_URI`):

```bash
docker run --rm -p 3000:3000 --env-file .env turbostudy
```

## Project structure

Key folders:

- `app/routes/` — pages and API routes
	- `app/routes/_landing/*` — marketing pages
	- `app/routes/dashboard/*` — authenticated app pages
	- `app/routes/api/*` — resource routes (`/api/chat`, `/api/notes`, `/api/ai`)
	- `app/routes/auth.ts` — Better Auth handler (`/api/auth/*`)
- `app/background_jobs/` — in-process “background” generation (notes)
- `app/models/` — Mongoose models
- `build/` — production output (`npm run build`)

## API overview

- `POST /api/ai`
	- Accepts `multipart/form-data` with `file` (optional PDF), `prompt`, and `styles[]`
	- Creates a note entry and triggers note generation

- `POST /api/notes`
	- Updates an existing note (requires an authenticated session)

- `POST /api/chat`
	- Saves chat messages and triggers AI response generation

## Troubleshooting

- Auth redirects or “not trusted origin”: update `BETTER_AUTH_URL` and ensure your URL is included in `trustedOrigins` (see `app/lib/auth.server.ts`).
- “Failed to connect to MongoDB”: verify `MONGO_URI` and that MongoDB is running/reachable.
- AI features not responding: verify `GOOGLE_API_KEY` is set and valid.
