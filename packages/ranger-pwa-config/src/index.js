const withPWA = require('./pwa')

module.exports = ({ timestamp = 0, ...rest }) => {
  const plugin = []
  const isProd = process.env.NODE_ENV === 'production'
  const isEnable = process.env.NEXT_PUBLIC_PWA_ENABLE === 'true'

  if (isProd && isEnable) {
    plugin.push(
      withPWA({
        disable: !isProd,
        dest: 'public',
        sw: `/sw.js?v=${timestamp}`,
        register: true,
        skipWaiting: true,
        reloadOnOnline: true,
        cacheStartUrl: false,
        dynamicStartUrl: false,
        buildExcludes: [/middleware-manifest\.json$/],
        publicExcludes: ['!robots.txt', '!version.json'],
        ...rest
      })
    )
  }

  return plugin
}
