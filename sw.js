const offline = 'offlineV1'
const otherScriptsCache = 'scripts'

const offlineAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/main.js',
  '/js/placeholder.js'
]

const isCacheable = ( url ) => {
  return [
    /list.js/
  ].map(item => new RegExp(item).test(url)).some(v => v === true)
}

self.addEventListener('install', (event) => {
  console.log('Service worker: Installed')
  event.waitUntil(
    caches
      .open(offline)
      .then(cache => {
        console.log('Service worker: Caching offline file')
        cache.addAll(offlineAssets)
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  console.log('Service worker: Activated')
  event.waitUntil(
    clients.claim().then(() => {
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== offline) {
              console.log('Service worker: Clearing old cache')
              return caches.delete(cache)
            }
          })
        )
      })
    })
  )
})

self.addEventListener('fetch', (event) => {
  console.log('Service worker: Fetching', event.request.url)
  if(isCacheable(event.request.url)) {
    console.log('Service worker: Arquivo cacheável ', event.request.url)
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const resClone = res.clone()
          event.waitUntil(
            caches.open(otherScriptsCache)
            .then(cache => {
              cache.put(event.request, resClone)
            })
          )
          return res;
        })
        .catch(() => {
          return caches.match(event.request)          
            .then(res => {
              if (res) return res
              else {
                console.log('Não foi possível encontrar o cache para ', event.request.url)
                return caches.match('/js/placeholder.js')
              }
            })
        })
    )
  }
  else {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request)
          .then(res => {
            if(res) return res
            else {
              console.log('Não foi possível encontrar o cache para ', event.request.url)
              return caches.match('/js/placeholder.js')
            }
          })
      })
    )
  }
})