const nextConfig = require('@ranger-theme/nextjs-config')
const pwaConfig = require('@ranger-theme/pwa-config')

const pkg = require('./package.json')

const isProd = process.env.NODE_ENV === 'production'
const timestamp = new Date().getTime()

/** @type {import('next').NextConfig} */
module.exports = nextConfig({
  dirname: process.cwd(),
  pkg,
  timestamp,
  transpilePackages: ['@ranger-theme/ui'],
  compiler: {
    reactRemoveProperties: isProd,
    removeConsole: false
  },
  externalOptions: {
    enabled: true
  },
  plugins: [...pwaConfig({ timestamp })]
})
