// Workbox RuntimeCaching config: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.RuntimeCachingEntry
module.exports = [
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-font-assets',
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      }
    }
  },
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-image-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\/_next\/image\?url=.+$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'next-image',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:mp3|wav|ogg)$/i,
    handler: 'CacheFirst',
    options: {
      rangeRequests: true,
      cacheName: 'static-audio-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:mp4)$/i,
    handler: 'CacheFirst',
    options: {
      rangeRequests: true,
      cacheName: 'static-video-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:js)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-js-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:css|less)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-style-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:xml|csv)$/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'static-data-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  }
]
