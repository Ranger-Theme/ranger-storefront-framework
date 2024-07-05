const nextConfig = require('@ranger-theme/nextjs-config')

const pkg = require('./package.json')

/** @type {import('next').NextConfig} */
module.exports = nextConfig({
  pkg,
  dirname: process.cwd(),
  basePath: '/en',
  timestamp: new Date().getTime(),
  transpilePackages: [],
  i18n: {
    locales: ['en', 'fr', 'de', 'it'],
    defaultLocale: 'en'
  },
  compiler: {
    reactRemoveProperties: isProd,
    removeConsole: false,
    emotion: {
      sourceMap: !isProd,
      autoLabel: 'dev-only',
      labelFormat: '[local]',
      importMap: {
        '@mui/system': {
          styled: {
            canonicalImport: ['@emotion/styled', 'default'],
            styledBaseImport: ['@mui/system', 'styled']
          }
        },
        '@mui/material/styles': {
          styled: {
            canonicalImport: ['@emotion/styled', 'default'],
            styledBaseImport: ['@mui/material/styles', 'styled']
          }
        }
      }
    }
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
