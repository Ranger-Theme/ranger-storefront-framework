const ALLOWED_CONFIGS = ['prod', 'stage', 'dev']

/**
 * This function calculates the environment in which the site is running based on the URL.
 * It defaults to 'prod'. In non 'prod' environments, the value can be overwritten using
 * the 'environment' key in sessionStorage.
 *
 * @returns {string} - environment identifier (dev, stage or prod'.
 */
export const calcEnvironment = () => {
  const { href } = window.location
  let environment = 'prod'
  if (href.includes('.hlx.page')) {
    environment = 'stage'
  }
  if (href.includes('localhost')) {
    environment = 'dev'
  }

  const environmentFromConfig = window.sessionStorage.getItem('environment')
  if (
    environmentFromConfig &&
    ALLOWED_CONFIGS.includes(environmentFromConfig) &&
    environment !== 'prod'
  ) {
    return environmentFromConfig
  }

  return environment
}

const getConfigForEnvironment = async () => {
  const configJSON = {
    data: [
      {
        key: 'commerce-endpoint',
        value: ''
      },
      {
        key: 'commerce-environment-id',
        value: ''
      },
      {
        key: 'commerce-website-code',
        value: ''
      },
      {
        key: 'commerce-store-view-code',
        value: ''
      },
      {
        key: 'commerce-store-code',
        value: ''
      },
      {
        key: 'commerce-customer-group',
        value: ''
      },
      {
        key: 'commerce-x-api-key',
        value: ''
      },
      {
        key: 'commerce-core-endpoint',
        value: ''
      },
      {
        key: 'commerce-root-category-id',
        value: ''
      },
      {
        key: 'commerce-environment',
        value: ''
      },
      {
        key: 'commerce-store-id',
        value: ''
      },
      {
        key: 'commerce-store-name',
        value: ''
      },
      {
        key: 'commerce-store-url',
        value: ''
      },
      {
        key: 'commerce-store-view-id',
        value: ''
      },
      {
        key: 'commerce-store-view-name',
        value: ''
      },
      {
        key: 'commerce-website-id',
        value: ''
      },
      {
        key: 'commerce-website-name',
        value: ''
      },
      {
        key: 'commerce-base-currency-code',
        value: ''
      }
    ]
  }
  return configJSON
}

/**
 * This function retrieves a configuration value for a given environment.
 *
 * @param {string} configParam - The configuration parameter to retrieve.
 * @param {string} [environment] - Optional, overwrite the current environment.
 * @returns {Promise<string|undefined>} - The value of the configuration parameter, or undefined.
 */
export const getConfigValue = async (configParam, environment) => {
  const env = environment || calcEnvironment()
  const configJSON = await getConfigForEnvironment(env)
  const configElements = configJSON.data
  return configElements.find((c) => c.key === configParam)?.value
}

export const getCookie = (cookieName) => {
  const cookies = document.cookie.split(';')
  let foundValue

  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split('=')
    if (name === cookieName) {
      foundValue = decodeURIComponent(value)
    }
  })

  return foundValue
}
