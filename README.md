# Daily Take

A tiny PWA for recording yourself talking to the camera once a day and watching your past takes.

- Tap **Record today's take**, hit the red button, talk, tap again to stop.
- Watch it back, then **Save** or **Retake**.
- Past takes are listed newest first with a day streak. Tap one to replay, delete, or save a copy.

Recordings live only on your device (in the browser's IndexedDB). Videos are never uploaded.
Use **Save a copy** on any take you want to keep elsewhere.

## Feedback and scoring

Every take gets two measurements on the phone itself, free and offline:
**pauses** (short, and over 2 seconds) and **vocal variety** (how much pitch and volume move).

Add an OpenAI API key in **Settings** (gear icon) to also get a score and tips:

- Only after you tap **Save**, a small audio-only copy of the take is sent to OpenAI. Never the video, and never discarded retakes.
- `whisper-1` transcribes it (prompted so "um" and "uh" are kept) → **pace** (words per minute) and **filler words**.
- `gpt-6.1-sol` reads the transcript and measurements and returns tips, and counts filler words like "like" or "you know".
- The **score** (0–100) is calculated by the app, 25 points each for pace, fillers, pauses and vocal variety, so every take is scored the same way.

The key is stored only on the device. Make a key just for this app and set a monthly budget limit in your OpenAI account.

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
