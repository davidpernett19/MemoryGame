// Nombre del caché y lista de archivos que queremos almacenar
const CACHE_NAME = "memoria-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Instalación del Service Worker y almacenamiento en caché inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Archivos en caché");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación: limpiar cachés viejos si hay nuevas versiones
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Cache antiguo eliminado:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Interceptar las peticiones y servir primero desde caché
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
