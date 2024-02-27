const withSentry = require("@sentry/nextjs");
const dateformat = require("dateformat");
const nextBuildId = require("next-build-id");
const fs = require("fs");
const BannerPlugin = require("./banner");
const nextCache = require("./cache");

const isProd = process.env.NODE_ENV === "production";
const isPWA = process.env.REACT_APP_PWA_ENABLE === "1";
const isAnalyzer = process.env.REACT_APP_BUNDLE_VISUALIZE === "1" && isProd;
const isSentry = process.env.REACT_SENTRY_ENABLE === "1";

module.exports = ({ pkg = {}, dir = __dirname, timeStamp = 0, ...rest }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    basePath: "",
    compress: true,
    distDir: ".next",
    generateEtags: false,
    pageExtensions: ["tsx", "ts"],
    poweredByHeader: false,
    reactStrictMode: isProd,
    swcMinify: true,
    trailingSlash: false,
    transpilePackages: ["lodash-es", "nanoid", "@ocloud/mui"],
    compiler: {
      reactRemoveProperties: isProd,
      removeConsole: false,
      emotion: {
        sourceMap: !isProd,
        autoLabel: "dev-only",
        labelFormat: "[local]",
        importMap: {
          "@mui/system": {
            styled: {
              canonicalImport: ["@emotion/styled", "default"],
              styledBaseImport: ["@mui/system", "styled"],
            },
          },
          "@mui/material/styles": {
            styled: {
              canonicalImport: ["@emotion/styled", "default"],
              styledBaseImport: ["@mui/material/styles", "styled"],
            },
          },
        },
      },
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      appDir: false,
      esmExternals: "loose",
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    modularizeImports: {
      lodash: {
        transform: "lodash/{{member}}",
      },
    },
    typescript: {
      ignoreBuildErrors: isProd,
    },
    generateBuildId: async () => {
      const commitId = await nextBuildId({ dir });
      const trunk = commitId.substring(0, 16);
      return `${trunk}_${timeStamp.toString()}`;
    },
    async headers() {
      return [
        {
          source: "/:all*(png|woff2|tff)",
          locale: false,
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=3600, immutable",
            },
          ],
        },
      ];
    },
    webpack: (config, { buildId, isServer, webpack }) => {
      // Write buildId to the version controll file
      fs.writeFileSync(
        "public/version.json",
        JSON.stringify({
          version: buildId,
          timeStamp,
        })
      );

      // Js trunk time hash
      if (isProd) {
        if (config.output.filename.startsWith("static")) {
          if (
            config.output.filename === "static/chunks/[name]-[contenthash].js"
          ) {
            config.output.filename = `static/chunks/[name]-[contenthash]-${timeStamp}.js`;
          }

          if (
            config.output.chunkFilename ===
            "static/chunks/[name].[contenthash].js"
          ) {
            config.output.chunkFilename = `static/chunks/[name]-[contenthash]-${timeStamp}.js`;
          }
        }

        // Polyfill contorll version
        config.plugins.map((plugin) => {
          if (plugin.constructor.name === "CopyFilePlugin") {
            plugin.name = `static/chunks/polyfills-[hash]-${timeStamp}.js`;
          }

          if (plugin.constructor.name === "NextMiniCssExtractPlugin") {
            plugin.options = {
              ...plugin.options,
              filename: `static/css/[contenthash]-${timeStamp}.css`,
              chunkFilename: `static/css/[contenthash]-${timeStamp}.css`,
            };
          }

          return plugin;
        });
      }

      // Client webpack conifg
      if (!isServer) {
        // Attention: It must be placed after terserplugin, otherwise the generated annotation description will be cleared by terserplugin or other compression plug-ins
        if (isProd && pkg) {
          config.optimization.splitChunks.cacheGroups = {
            ...(isSentry && {
              sentry: {
                chunks: "all",
                name: "sentry",
                test: /[\\/]node_modules[\\/](@sentry\/nextjs|@sentry\/core|@sentry\/replay|@sentry\/browser|@sentry\/utils|@sentry-internal\/tracing)[\\/]/,
                priority: 100,
                enforce: true,
                reuseExistingChunk: true,
              },
            }),
            runtime: {
              chunks: "all",
              name: "runtime",
              test: /[\\/]node_modules[\\/](redux-logger|react-toastify|react-intl|redux|@reduxjs\/toolkit|react-redux|@emotion\/cache|@emotion\/react|@emotion\/styled|axios|crypto-js|ua-parser-js|big.js|sa-sdk-javascript|dayjs|immer|qs|@mui\/x-date-pickers)[\\/]/,
              priority: 90,
              enforce: true,
              reuseExistingChunk: true,
            },
            mui: {
              name: "mui",
              test: /[\\/]node_modules[\\/]@mui\/material[\\/]/,
              chunks: "all",
              priority: 3,
              minSize: 300000,
              maxSize: 600000,
              reuseExistingChunk: true,
              enforce: true,
            },
            ...config.optimization.splitChunks.cacheGroups,
          };

          // Automatic injection of copyright annotation information
          config.optimization.minimizer.push(
            new BannerPlugin({
              banner: `/*!\n *  @name: ${pkg.name} \n *  @author: ${
                pkg.author
              } \n *  @date: ${dateformat(
                new Date(),
                "UTC:dddd, mmmm dS, yyyy, h:MM:ss TT"
              )} \n *  @version: ${pkg.version} \n *  @license: ${
                pkg.license
              } \n *  @copyright: ${pkg.copyright} \n */\n`,
            })
          );
        }
      }

      // Sentry webpack tree shaking
      config.plugins.push(
        new webpack.DefinePlugin({
          __SENTRY_DEBUG__: false,
          __SENTRY_TRACING__: false,
        })
      );
      // Important: return the modified config
      return config;
    },
  };

  const plugins = [];

  if (isAnalyzer)
    plugins.push(
      require("@next/bundle-analyzer")({
        enabled: true,
      })
    );

  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
