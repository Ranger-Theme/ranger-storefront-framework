const nextConfig = require('@ranger/nextjs-config')

const pkg = require('./package.json')

/** @type {import('next').NextConfig} */
module.exports = nextConfig({
  pkg,
  dirname: process.cwd(),
  basePath: '/en',
  timestamp: new Date().getTime(),
  transpilePackages: ['@ranger/ui-theme'],
  i18n: {
    locales: ['en', 'fr', 'de', 'it'],
    defaultLocale: 'en'
  },
  async rewrites() {
    return [
      {
        source: '/:locale/api/:path*',
        destination: '/api/:path*',
        locale: false
      },
      {
        source: '/:locale/:pathname*',
        destination: '/_resolver'
      }
    ]
  }
})
