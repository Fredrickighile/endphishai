const CACHE_NAME = "endphishai-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

// Install event - cache essential files
self.addEventListener("install", (event) => {
  // console.log(" Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // console.log("Cache opened");
      return cache.addAll(urlsToCache).catch((error) => {
        console.error(" Cache addAll failed:", error);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  // console.log(" Service Worker activated");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            // console.log(" Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - FIXED to avoid chrome-extension errors
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Get URL safely
  let url;
  try {
    url = new URL(request.url);
  } catch (e) {
    return; // Invalid URL, skip
  }

  if (
    url.protocol === "chrome-extension:" ||
    url.protocol === "chrome:" ||
    url.protocol === "about:" ||
    request.method !== "GET" ||
    url.hostname.includes("infragrid") ||
    url.hostname.includes("127.0.0.1") ||
    url.hostname.includes("localhost")
  ) {
    return; // Let browser handle naturally
  }

  // CACHE-FIRST strategy for our own assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).catch((error) => {
        if (request.destination === "document") {
          return caches.match("/");
        }
      });
    })
  );
});

// Listen for messages
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
