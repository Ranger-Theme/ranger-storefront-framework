const ExternalCDNPlugin =
  ({ enabled = true, externals = {} } = {}) =>
  (nextConfig = {}) => {
    return {
      ...nextConfig,
      webpack: (config, options) => {
        const { isServer } = options

        if (enabled) {
          if (!isServer) {
            config.externals = {
              ...config.externals,
              react: 'React',
              'react-dom': 'ReactDOM',
              ...externals
            }
          }
        }

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }

        return config
      }
    }
  }

module.exports = ExternalCDNPlugin
