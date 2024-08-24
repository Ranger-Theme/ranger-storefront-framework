const fs = require('fs')
const dateformat = require('dateformat')

const nextBuildId = require('./build')
const BannerPlugin = require('./banner')
const BuildTimePlugin = require('./time')

const isProd = process.env.NODE_ENV === 'production'
const isAnalyzer = process.env.NEXT_PUBLIC_VISUALIZE_ENABLE === 'true'

module.exports = ({ dirname = __dirname, git = true, pkg = {}, timestamp = 0, ...rest }) => {
  const { plugins, transpilePackages, cacheGroups, ...options } = rest
  let buildIdOptions = {}

  if (git) {
    buildIdOptions = {
      generateBuildId: async () => {
        const commitId = await nextBuildId({ dir: dirname })
        const trunk = commitId.substring(0, 16)
        return `${trunk}_${timestamp.toString()}`
      }
    }
  }

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
    ...buildIdOptions,
    webpack: (config, { buildId, isServer, nextRuntime }) => {
      // Write buildId to the version controll file
      fs.writeFileSync(
        'public/version.json',
        JSON.stringify({
          version: buildId,
          timestamp
        })
      )

      config.resolve.extensions.push('.js', '.jsx', '.ts', '.tsx')

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

        config.plugins.push(
          new BuildTimePlugin({
            runtime: nextRuntime
          })
        )
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
