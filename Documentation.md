# Coffee Brew Log — Documentation

A full-stack app for logging coffee brews at a hipster micro-roastery. Built for the XPL Full-stack developer bootcamp assessment.

## What it does

- Create a brew entry (beans, method, coffee grams, water grams, rating, tasting notes)
- View all brews in a list, with a color-coded rating badge (green 4-5, amber 3, red 0-2)
- Filter the list by brew method
- Edit and update an existing entry
- Delete an entry
- Client-side and server-side validation on all required fields

## Tech stack

| Layer     | Choice                          |
| --------- | -------------------------------- |
| Frontend  | React (Vite) + Tailwind CSS v4   |
| Backend   | Node.js + Express                |
| ORM / DB  | Prisma 7 + PostgreSQL            |
| Hosting   | Render (web service + static site + managed Postgres) |

## Project structure

- backend/ - Express API + Prisma schema
  - prisma/schema.prisma - the Brew model and BrewMethod enum
  - src/controllers/brewsController.js - CRUD logic and validation
  - src/routes/brews.js - Express routes for /api/brews
  - src/lib/prisma.js - shared Prisma client instance
  - src/index.js - server entry point
- frontend/ - React (Vite) app
  - src/App.jsx - top-level state and API wiring
  - src/components/ - Header, FilterBar, BrewList, BrewCard, BrewFormModal, RatingBadge
  - src/api/brews.js - fetch wrapper for the backend API
  - src/utils/methods.js - brew method enum-to-label mapping

## API

Base path: /api/brews

| Method | Path          | Description                         | Success | Errors          |
| ------ | -------------- | ------------------------------------ | ------- | ---------------- |
| GET    | /api/brews      | List all brews (optional ?method=)   | 200     | 400 (bad filter) |
| POST   | /api/brews      | Create a brew                        | 201     | 400 (validation) |
| PUT    | /api/brews/:id   | Update a brew                        | 200     | 400, 404         |
| DELETE | /api/brews/:id   | Delete a brew                        | 204     | 404              |

Valid method values: AEROPRESS, DRIP_COFFEE, V60, FRENCH_PRESS, ESPRESSO, MOKA_POT, COLD_BREW, CHEMEX.

All fields (beans, method, coffeeGrams, waterGrams, rating, tastingNotes) are required on create/update. The API returns 400 with a details array of validation messages if any are missing or blank.

## Local setup

### Prerequisites

- Node.js 18+ and npm
- A PostgreSQL database (local install, or a free hosted one like Render/Neon)

### 1. Backend

    cd backend
    npm install
    cp .env.example .env
    # edit .env and set DATABASE_URL to your Postgres connection string

    npx prisma migrate dev --name init
    npm run dev

The API starts on http://localhost:4000.

### 2. Frontend

In a separate terminal:

    cd frontend
    npm install
    cp .env.example .env
    # VITE_API_URL should point at your backend, e.g. http://localhost:4000

    npm run dev

The app starts on http://localhost:5173.

### Notes on this specific setup (Prisma 7)

This project uses Prisma 7, which changed a few things from earlier versions:

- Connection config lives in backend/prisma.config.ts as well as .env.
- PrismaClient requires an explicit driver adapter for PostgreSQL. See backend/src/lib/prisma.js — it uses @prisma/adapter-pg with ssl: { rejectUnauthorized: false }, which is required when connecting to Render-hosted Postgres.
- The generator in schema.prisma uses provider = "prisma-client-js" (not the newer prisma-client TypeScript-output generator) so the generated client is plain JavaScript, matching this CommonJS Express project.

## Design notes

The rating badge is color-coded to match the assessment wireframes: green for 4-5, amber for 3, red for 0-2, so brew quality can be scanned at a glance.
