# Trailcamp — iPhone PWA

Your Trailforks × iOverlander map as an installable iPhone web app, with all
195,779 iOverlander places (North, Central & South America — full descriptions)
bundled in. No file uploads ever; pins work fully offline after the first load.
Map tiles, the Trailforks/Google views, OSM camps, route planning, and geocoder
search need a connection.

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

## Planet Fitness layer

**Last updated: August 4, 2026 — 2,940 clubs** (US, Puerto Rico, Canada, Mexico).

A separate POI category, toggled on and off like any other filter. It sits near
the top of the filter list, just below the three big camping categories. Pins
are purple with a yellow "PF" monogram, and obey the same minimum zoom as every
other pin, so they only appear once you're zoomed in.

Tapping a pin shows the street address, a tappable phone number, the full weekly
hours, and Apple Maps / Google Maps directions links.

97% of clubs have address, phone and hours. The exceptions are Mexico's 50
clubs (their site has no server-rendered club pages, so those are name and
coordinates only) plus a handful of stragglers.

### Refreshing it

There is no automatic refresh — Planet Fitness sits behind Cloudflare, which
blocks scripted requests, so this can't run on a schedule anywhere. Ask Claude
to "refresh the Planet Fitness data" and it'll redo the harvest through the
browser. Expect roughly 2% drift per year as clubs open.

When the data is regenerated, **bump `PF_UPDATED` in `index.html`** (it's shown
in the sidebar) and the version string in `sw.js`. Useful starting point: their
own public feed at
`https://cde-assets-planetfitness.s3.amazonaws.com/locations.json`, which lists
every club worldwide with coordinates.

## Good to know

- **Offline**: all 97k pins + full descriptions are cached on the phone. If iOS
  hasn't run the app in weeks it may evict the cache — open the app once while
  online before a long off-grid trip.
- **Privacy**: the site is public at that URL (nobody will find it, but it's
  not private). Location permission stays on your phone; nothing is tracked.
- **Trailforks region ID**: paste a `rid` in the Trailforks view toolbar to get
  trail rendering at every zoom level (tap "find" to look up your region).
