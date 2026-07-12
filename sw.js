/* Trails + Camps service worker — bump VERSION whenever you update any file */
var VERSION = "tc-v1";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./lib/leaflet.min.css",
  "./lib/leaflet.min.js",
  "./lib/pako_inflate.min.js",
  "./lib/images/layers.png",
  "./lib/images/layers-2x.png",
  "./lib/images/marker-icon.png",
  "./lib/images/marker-icon-2x.png",
  "./lib/images/marker-shadow.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./data/usa.json.gz",
  "./data/canada.json.gz",
  "./data/mexico.json.gz"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== VERSION) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Same-origin: cache-first (app shell + data work offline).
   Cross-origin (map tiles, Trailforks, Overpass, Nominatim): network only. */
self.addEventListener("fetch", function (e) {
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin || e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      return hit || fetch(e.request).then(function (resp) {
        var copy = resp.clone();
        caches.open(VERSION).then(function (c) { c.put(e.request, copy); });
        return resp;
      });
    })
  );
});
