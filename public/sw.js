self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          '/', 
          '/index.html'// Add other files you want to cache
        ]);
      })
    );
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== 'v1') {
              return caches.delete(cacheName);
            }
            return null;
          })
        );
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
  
    // Handle WebSocket requests
    if (url.origin === 'https://notifs-engine.onrender.com' && url.pathname.includes('/socket.io/')) {
      event.respondWith(handleSocketConnection(event.request));
    } else {
      event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
      );
    }
  });
  
  async function handleSocketConnection(request) {
    const response = await fetch(request);
  
    // You can do additional handling for WebSocket requests here if needed
  
    return response;
  }
  