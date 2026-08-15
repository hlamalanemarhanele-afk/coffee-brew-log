# Coffee Brew Log ☕

A full-stack app for logging coffee brews at a hipster micro-roastery. Built for the XPL Full-stack developer bootcamp assessment.

**Live app:** https://coffee-brew-log-1vtl.onrender.com
**API:** https://coffee-brew-log-api-l33d.onrender.com

> Note: both services run on Render's free tier, so the first request after a period of inactivity can take 30-60 seconds while the instance wakes up.

## Screenshots

### List view
![List view](./screenshots/list-view.png)

### Add a brew
![Add modal](./screenshots/add-modal.png)

### Edit a brew
![Edit modal](./screenshots/edit-modal.png)

## What it does

- Create a brew entry (beans, method, coffee grams, water grams, rating, tasting notes)
- View all brews in a list, with a color-coded rating badge (green/amber/red)
- Filter the list by brew method
- Edit and update an existing entry
- Delete an entry
- Client- and server-side validation on all required fields

## Tech stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **ORM / Database:** Prisma + PostgreSQL (hosted on Render)

## Project structure

- backend/ - Express API + Prisma schema
- frontend/ - React (Vite) app
- screenshots/ - App screenshots for this README
- Documentation.md - Setup instructions and API reference
- deployment.md - Deployment notes and troubleshooting log

## Local setup

See [Documentation.md](./Documentation.md) for full setup instructions, including environment variables and running the API/frontend locally.

## Deployment

See [deployment.md](./deployment.md) for how this was deployed to Render.
