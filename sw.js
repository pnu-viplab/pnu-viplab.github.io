---
layout: null
---
// Service Worker — auto-versioned by Jekyll build time
const CACHE_NAME = 'viplab-{{ site.time | date: "%Y%m%d%H%M%S" }}';

// Pages to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/gallery/',
  '/research/',
  '/publication/',
  '/team/',
  '/contact/',
  '/lecture/',
  '/assets/css/main.css'
];

// ─── Install: pre-cache shell pages ──────────────────────────────────────────
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) { return cache.addAll(PRECACHE_URLS); })
      .then(function() { return self.skipWaiting(); })
  );
});

// ─── Activate: remove old caches ─────────────────────────────────────────────
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names
          .filter(function(n) { return n.startsWith('viplab-') && n !== CACHE_NAME; })
          .map(function(n) { return caches.delete(n); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

// ─── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  // Cross-origin requests (Google Maps, CDN, etc.): pass through
  if (url.origin !== location.origin) {
    return;
  }

  // Images: Cache-First (cached on first access, served from cache thereafter)
  if (/\.(jpe?g|png|gif|svg|webp)(\?.*)?$/.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        return cached || fetch(event.request).then(function(response) {
          return caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // CSS / JS: Cache-First (cache-busted via ?v= query string on updates)
  if (/\.(css|js)(\?.*)?$/.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        return cached || fetch(event.request).then(function(response) {
          return caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // HTML pages: Network-First (fresh content, fall back to cache if offline)
  event.respondWith(
    fetch(event.request).then(function(response) {
      return caches.open(CACHE_NAME).then(function(cache) {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch(function() {
      return caches.match(event.request);
    })
  );
});
