const CACHE_NAME = 'alphabase-v1';
const ASSETS = [
    'index.html',
    'home.html',
    'market.html',
    'squad.html',
    'match.html',
    'admin.html',
    'images/jersey.png',
    'https://unpkg.com/lucide@latest'
];

// Install Event - Caching Assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting(); // Force the waiting service worker to become the active one
});

// Activate Event - Cleaning up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

// Fetch Event - Serve from cache, then update
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
