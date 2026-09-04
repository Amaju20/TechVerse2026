# Techverse 2026 — Frontend

The client for [Techverse 2026](https://github.com/Amaju20/Backendserver4Project), a two-day
conference RSVP site: browse the schedule, RSVP to sessions, get a digital pass with a real
scannable QR code, add sessions to Google Calendar, and manage your account — all backed by a real
Express/MongoDB API, not mocked data.

## Stack

React 19 + Vite, Tailwind CSS v4 (`@theme` token system), Zustand for state, React Router v7,
Axios (httpOnly-cookie auth), `react-toastify`, `lucide-react`, `qrcode`.

## Getting started

```bash
npm install
cp .env.example .env    # point VITE_API_URL at your backend
npm run dev
```

This expects the [backend](https://github.com/Amaju20/Backendserver4Project) running and
`CLIENT_URL` on the backend matching this app's dev URL, for CORS.

### Scripts

| Command           | Does                                  |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Start the Vite dev server              |
| `npm run build`    | Production build to `dist/`            |
| `npm run preview`  | Preview the production build locally   |
| `npm run lint`     | ESLint                                 |
| `npm test`         | Run the test suite (Vitest)            |

## Structure

```
src/
  api/axios.js        Axios instance (httpOnly-cookie auth, withCredentials)
  store/               Zustand stores — authStore (session), rsvpStore (RSVP state, backend-persisted)
  pages/               Route-level views (Home, About, Contact, Login, Signup, Dashboard, Settings, NotFound)
  components/          Shared UI (Navbar, Footer, EventCard, VenueLink, TechCircuitBackground, ...)
  data/sessions.js     Static conference schedule + event/venue constants
  utils/               calendar.js (Google Calendar URL builder), getErrorMessage.js
```

## Key flows

- **Auth**: `authStore.js` talks to `/api/auth/*`, session lives in an httpOnly cookie (no tokens in
  localStorage). `loadUser()` runs once on app mount to restore a session on refresh.
- **RSVPs**: `rsvpStore.js` talks to `/api/rsvps` — RSVPs are persisted per-user in the real
  database, not localStorage. Toggling is optimistic (the UI updates immediately, then rolls back
  if the request fails).
- **Digital pass**: the Dashboard renders a real QR code (`qrcode` package, drawn to a `<canvas>`)
  encoding the user's ticket info, plus a Google Calendar link per RSVP'd session.

## Tests

```bash
npm test
```

Vitest + React Testing Library. Covers the RSVP store (optimistic updates and rollback), the
Google Calendar URL builder, and the RSVP button's states/behavior on `EventCard`.
