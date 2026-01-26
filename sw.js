// sw.js - Service Worker (Capacidade Offline)
const CACHE_NAME = 'aryanna-master-v1';
const ASSETS = [
  './',
  './index.html',
  './mentoria.html',
  './estilos.css',
  './app-master.js',
  './estruturas.js',
  './ui-components.js',
  './pdf-engine.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
