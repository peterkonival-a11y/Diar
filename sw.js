None selected 

Skip to content
Using Gmail with screen readers
1 of 188
sw
Inbox

Peter Ihi <peter.konival@gmail.com>
Attachments
10:57 PM (3 minutes ago)
to me

 One attachment
  •  Scanned by Gmail
Anti-virus warning – 1 attachment contains a virus or blocked file. Downloading this attachment is disabled.

Mail Delivery Subsystem <mailer-daemon@googlemail.com>
10:57 PM (3 minutes ago)
to me

For security reasons, Gmail does not allow you to use this type of file as it violates Google policy for executables and archives.



const CACHE_NAME = 'diar-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      }).catch(() => cached);
    })
  );
});
sw.js
Displaying sw.js.