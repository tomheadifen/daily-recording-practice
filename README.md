# Daily Take

A tiny PWA for recording yourself talking to the camera once a day and watching your past takes.

- Tap **Record today's take**, hit the red button, talk, tap again to stop.
- Watch it back, then **Save** or **Retake**.
- Past takes are listed newest first with a day streak. Tap one to replay, delete, or save a copy.

Recordings live only on your device (in the browser's IndexedDB). Nothing is uploaded.
Use **Save a copy** on any take you want to keep elsewhere.

## Files

- `index.html` – the whole app (HTML, CSS, JS)
- `sw.js` – service worker so it opens offline
- `manifest.webmanifest` + `icons/` – makes it installable

## Running it

The camera only works over **https** (or `localhost`), so it needs to be hosted:

- **Live:** https://tomheadifen.github.io/daily-recording-practice/ (GitHub Pages, deployed from `main`)
- **Local test:** `python3 -m http.server` in this folder, then open http://localhost:8000

## Installing on your phone

- **iPhone (Safari):** ⋯ → Share → Add to Home Screen → keep "Open as Web App" on → Add.
- **Android (Chrome):** ⋮ → Install app.

Install it before recording much: on iPhone, the home-screen app keeps its own storage, separate from Safari.
