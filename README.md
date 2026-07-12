# Trails + Camps — iPhone PWA

Your Trailforks × iOverlander map as an installable iPhone web app, with all
97,269 iOverlander places (USA, Canada, Mexico — full descriptions) bundled in.
No file uploads ever; pins work fully offline after the first load. Map tiles,
the Trailforks/Google views, OSM camps, and geocoder search need a connection.

## Put it on GitHub Pages (one-time, ~10 minutes, all in the browser)

1. **Create a GitHub account** at https://github.com/signup (skip if you have one).
2. **Create a repository**: https://github.com/new → name it `trailcamp` →
   Public → Create repository.
3. **Upload the app**: on the new repo page, click *uploading an existing file*
   (or Add file → Upload files). Drag in **everything inside this folder**
   (index.html, sw.js, manifest.webmanifest, and the data/, lib/, icons/ folders).
   Note: drag the folder *contents*, keeping folder structure — the browser
   upload preserves subfolders if you drag the folders themselves into the drop
   zone. Click **Commit changes**. The 13 MB upload takes a minute.
4. **Turn on Pages**: repo → Settings → Pages → under "Branch" pick `main`,
   folder `/ (root)` → Save. Wait 1–2 minutes.
5. Your app is live at: `https://YOURUSERNAME.github.io/trailcamp/`

## Install on your iPhone

1. Open that URL in **Safari** (must be Safari, not Chrome).
2. Wait for the loading bar to finish (first load downloads ~13 MB of places).
3. Tap the **Share** button → **Add to Home Screen** → Add.
4. Done. The icon launches full-screen; pins work offline.

Tip: tap the ◎ button on the map to jump to your location (Safari will ask
for permission once).

## Updating the app or place data later

- Any file change: edit/re-upload the files in the GitHub repo, **and bump the
  version string in `sw.js`** (line 2: `tc-v1` → `tc-v2`). The phone picks up
  the new version on the next launch with network (may take two launches —
  that's normal service-worker behavior).
- Fresh iOverlander data: re-export the country CSVs, then have Claude (or
  `TrailCamp-iOS/tools/convert.py`) regenerate `data/*.json.gz`, upload, bump
  `sw.js` version.

## Good to know

- **Offline**: all 97k pins + full descriptions are cached on the phone. If iOS
  hasn't run the app in weeks it may evict the cache — open the app once while
  online before a long off-grid trip.
- **Privacy**: the site is public at that URL (nobody will find it, but it's
  not private). Location permission stays on your phone; nothing is tracked.
- **Trailforks region ID**: paste a `rid` in the Trailforks view toolbar to get
  trail rendering at every zoom level (tap "find" to look up your region).
