const CACHE_NAME = 'alphabase-v1';
const ASSETS = [
    'index.html',
    'home.html',
    'market.html',
    'squad.html',
    'match.html',
    'admin.html',
    'images/icon-512.png',
    'images/jersey.png',
    'https://unpkg.com/lucide@latest'
];

// Install: Cache all files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate: Remove old versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
