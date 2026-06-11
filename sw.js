const CACHE_NAME = 'sinfonia-v2-beta';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './src/js/app.js',
    './src/js/config.js',
    './src/js/audio.js',
    './src/js/ui.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
