// Service worker installed.
self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...', event);

  // Cache everything!
  // precacheAssets(event);
});

// Service worker activated.
self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
  // Fix for older browsers.
  return self.clients.claim();
});



// The browser fetched something.
self.addEventListener('fetch', function (event) {
  console.log('[Service Worker] Fetching something ....', event);
  
  // Service worker is also a network proxy: it can modify all requests
  // before they are passed to the page.
  
  // For instance.
  
  // Nullifies every request:
  // event.respondWith(null);
  
  // Fetches the request (as intended):
  // event.respondWith(fetch(event.request)); 


  // activateStaticCache(event);

  // activateDynamicCache(event);


});

// Caching.
///////////

function precacheAssets(event) {
  event.waitUntil(
    caches.open('static')
      .then(cache => {
        console.log('[Service Worker] Precache ...', event);

        // Note. You can also use cache.addAll([...]).

        // HTML.
        cache.add('/');
        cache.add('index.html');
        cache.add('8_bootstrap_forms.html');

        // Manifest.
        cache.add('manifest.json');       

        // JS.
        cache.add('js/grid_create.js');
        cache.add('js/logic.js');
        cache.add('js/modal.js');
        cache.add('js/progress.js');
        cache.add('js/validation.js');
        cache.add('js/validation_feedback.js');
        cache.add('js/pwa.js');

        // CSS.
        cache.add('css/style_cool.css');
        cache.add('css/style_inputs.css');

        // IMG.
        cache.add('img/smile.png');
        cache.add('favicon.ico');

        // Bootstrap
        cache.add('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css');
        cache.add('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js');

        // jQuery
        cache.add('https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js');

        // Tab images.
        cache.add('https://img.prod.portals.aws.zehnder.ch/s/baf8b716b0f7efedd95887aa740d4708b1c9ed99-zna-343276-1200-816/441x300m.jpg');
        cache.add('https://i.pinimg.com/originals/71/28/c5/7128c55d18eb6e235dee15e32f8039f6.jpg');
        cache.add('https://api.time.com/wp-content/uploads/2018/04/trumpstormycover.jpg?quality=85&w=1012');

        // Activities.
        // Note! For our App it's ok to cache a JSON response, but normally
        // you should not do it. How do you know it's the same as last time?
        // You might still cache it under a different name and load the old
        // one if network is not available. Still it might be confusing for 
        // the user.
        cache.add('https://limitless-castle-38236.herokuapp.com/activities/');

      });
  );
}

function activateStaticCache(event) {
  // Only static assets.
  event.respondWith(
    caches.match(event.request)
      .then(res => {
        return res ? res : fetch(event.request);
      })
  );
}

function activateDynamicCache(event) {
  // Any asset from any request.
  event.respondWith(
    caches.match(event.request)
      .then(res => {
        // Already in cache.
        if (res) return res;
        // Fetch and cache.
        return fetch(event.request)
          .then(res2 => {
            return caches.open('dynamic')
              .then(cache => {
                // cache.add() fetches a resource and caches it.
                // cache.put() puts in the cache what we have,
                // so we avoid a double fetch.
                cache.put(event.request.url, res2.clone());
                return res2;
              });
          })
          .catch(err => console.log)
      })
  );
}