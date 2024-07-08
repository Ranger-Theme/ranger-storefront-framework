const fs = require('fs')
const dateformat = require('dateformat')
const nextBuildId = require('next-build-id')

const BannerPlugin = require('./banner')

const isProd = process.env.NODE_ENV === 'production'
const isAnalyzer = process.env.NEXT_PUBLIC_BUNDLE_VISUALIZE === '1'

module.exports = ({ pkg = {}, dirname = __dirname, timestamp = 0, ...rest }) => {
  const { plugins, transpilePackages, cacheGroups, ...options } = rest
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    basePath: '',
    compress: true,
    distDir: '.next',
    generateEtags: false,
    pageExtensions: ['tsx', 'ts'],
    poweredByHeader: false,
    reactStrictMode: false,
    swcMinify: true,
    trailingSlash: false,
    transpilePackages: ['lodash-es', 'nanoid', ...(transpilePackages ?? [])],
    eslint: {
      ignoreDuringBuilds: true
    },
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '**'
        },
        {
          protocol: 'https',
          hostname: '**'
        }
      ]
    },
    typescript: {
      ignoreBuildErrors: isProd
    },
    ...options,
    generateBuildId: async () => {
      const commitId = await nextBuildId({ dir: dirname })
      const trunk = commitId.substring(0, 16)
      return `${trunk}_${timestamp.toString()}`
    },
    webpack: (config, { buildId, isServer }) => {
      // Write buildId to the version controll file
      fs.writeFileSync(
        'public/version.json',
        JSON.stringify({
          version: buildId,
          timestamp
        })
      )

      // Js trunk time hash
      if (isProd) {
        if (config.output.filename.startsWith('static')) {
          if (config.output.filename === 'static/chunks/[name]-[contenthash].js') {
            config.output.filename = `static/chunks/[name]-[contenthash]-${timestamp}.js`
          }

          if (config.output.chunkFilename === 'static/chunks/[name].[contenthash].js') {
            config.output.chunkFilename = `static/chunks/[name]-[contenthash]-${timestamp}.js`
          }
        }

        // Polyfill contorll version
        config.plugins.map((plugin) => {
          if (plugin.constructor.name === 'CopyFilePlugin') {
            plugin.name = `static/chunks/polyfills-[hash]-${timestamp}.js`
          }

          if (plugin.constructor.name === 'NextMiniCssExtractPlugin') {
            plugin.options = {
              ...plugin.options,
              filename: `static/css/[contenthash]-${timestamp}.css`,
              chunkFilename: `static/css/[contenthash]-${timestamp}.css`
            }
          }

          return plugin
        })
      }

      // Client webpack conifg
      if (!isServer) {
        if (isProd && pkg) {
          config.optimization.splitChunks.cacheGroups = {
            ...(cacheGroups ?? {}),
            ...config.optimization.splitChunks.cacheGroups
          }

          // Automatic injection of copyright annotation information
          config.optimization.minimizer.push(
            new BannerPlugin({
              banner: `/*!\n *  @name: ${pkg.name} \n *  @author: ${
                pkg.author
              } \n *  @date: ${dateformat(
                new Date(),
                'UTC:dddd, mmmm dS, yyyy, h:MM:ss TT'
              )} \n *  @version: ${pkg.version} \n *  @license: ${pkg.license} \n *  @copyright: ${
                pkg.copyright
              } \n */\n`
            })
          )
        }
      }

      return config
    }
  }

  const nextPlugins = [...(plugins ?? [])]

  if (isAnalyzer)
    nextPlugins.push(
      require('@next/bundle-analyzer')({
        enabled: true
      })
    )

  return nextPlugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig })
}
