const nextConfig = require('@ranger-theme/nextjs-config')

const pkg = require('./package.json')

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
module.exports = nextConfig({
  pkg,
  dirname: process.cwd(),
  timestamp: new Date().getTime(),
  transpilePackages: [],
  compiler: {
    reactRemoveProperties: isProd,
    removeConsole: false
  },
  async rewrites() {
    return [
      {
        source: '/:pathname*',
        destination: '/_resolver'
      }
    ]
  }
})
