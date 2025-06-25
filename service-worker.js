const CACHE_NAME = 'celestial-equalizer-v1.0.0'; // Version du cache pour faciliter les mises à jour
const urlsToCache = [
  '/',
  '/index.html',
  '/colors.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-favicon.png', // Assurez-vous que ce fichier existe
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  // Ajoutez ici toutes les autres ressources statiques (images, sons, autres scripts, etc.)
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Mise en cache des fichiers');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Permet au nouveau service worker de prendre le contrôle immédiatement
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activation...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Permet au service worker de prendre le contrôle des clients non contrôlés
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retourner la réponse du cache
        if (response) {
          return response;
        }
        // Pas de cache - récupérer depuis le réseau
        return fetch(event.request).then(
          response => {
            // Vérifier si nous avons reçu une réponse valide
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloner la réponse car elle est un flux et ne peut être consommée qu'une seule fois
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(error => {
          console.log('[Service Worker] Échec de la récupération et mise en cache pour:', event.request.url, error);
          // Optionnel: servir une page hors ligne si la ressource demandée n'est pas dans le cache
          // if (event.request.mode === 'navigate') {
          //   return caches.match('/offline.html');
          // }
          return new Response('Network error or resource not cached.', { status: 503, statusText: 'Service Unavailable' });
        });
      })
  );
});