const staticLP = "drfrau-tragoverdades"
const assets = [
  "/",
  "/index.html",
  "/css/main.css",
  "/css/main.min.css",
  "/js/main.js",
  "/js/main.min.js",
  "/plugins/**/*",
  "/favicon/*",
  "/fonts/*",
  "/img/*",
]

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})