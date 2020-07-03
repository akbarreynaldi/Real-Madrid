importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/match-detail.html', revision: '1' },
    { url: '/nav-menu.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/favicon.ico', revision: '1' },
    { url: '/src/css/font.css', revision: '1' },
    { url: '/src/css/main.css', revision: '1' },
    { url: '/src/css/materialize.min.css', revision: '1' },
    { url: '/src/font/2sDcZGJYnIjSi6H75xkzaGW5Kb8VZA.woff2', revision: '1' },
    { url: '/src/font/2sDcZGJYnIjSi6H75xkzamW5Kb8VZBHR.woff2', revision: '1' },
    { url: '/src/font/2sDZZGJYnIjSi6H75xk700CsBJ0YTivYtg.woff2', revision: '1' },
    { url: '/src/font/2sDZZGJYnIjSi6H75xk700CsBp0YTivYthYl.woff2', revision: '1' },
    { url: '/src/font/2sDZZGJYnIjSi6H75xk7p0SsBJ0YTivYtg.woff2', revision: '1' },
    { url: '/src/font/2sDZZGJYnIjSi6H75xk7p0SsBp0YTivYthYl.woff2', revision: '1' },
    { url: '/src/font/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },
    { url: '/src/js/main.js', revision: '1' },
    { url: '/src/js/data/api.js', revision: '1' },
    { url: '/src/js/data/cache.js', revision: '1' },
    { url: '/src/js/data/db.js', revision: '1' },
    { url: '/src/js/handler/handler.js', revision: '1' },
    { url: '/src/js/handler/matchDataHandler.js', revision: '1' },
    { url: '/src/js/handler/matchDetailHandler.js', revision: '1' },
    { url: '/src/js/handler/pathHandler.js', revision: '1' },
    { url: '/src/js/handler/standingsDataHandler.js', revision: '1' },
    { url: '/src/js/handler/teamDataHandler.js', revision: '1' },
    { url: '/src/js/library/idb.js', revision: '1' },
    { url: '/src/js/library/materialize.min.js', revision: '1' },
    { url: '/src/js/loader/loadNav.js', revision: '1' },
    { url: '/src/js/loader/loadPages.js', revision: '1' },
]);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'image-assets',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 2592000, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('match-detail.html?'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'match-detail'
    })
);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api-data'
    })
);

self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: '/src/images/notification.png',
        vibrate: [100, 50, 100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});