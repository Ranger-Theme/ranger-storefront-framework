import { shouldPolyfill as shouldPolyfillDatetime } from '@formatjs/intl-datetimeformat/should-polyfill'
import { shouldPolyfill as shouldPolyfillNumber } from '@formatjs/intl-numberformat/should-polyfill'

export const polyfillNumber = async (locale?: string) => {
  const unsupportedLocale = shouldPolyfillNumber(locale)

  // This locale is supported
  if (!unsupportedLocale) {
    return
  }

  // Load the polyfill 1st BEFORE loading data
  await import('@formatjs/intl-numberformat/polyfill-force')
  await import(`@formatjs/intl-numberformat/locale-data/${unsupportedLocale}`)
}

export const polyfillDatetime = async (locale: string) => {
  const unsupportedLocale = shouldPolyfillDatetime(locale)
  // This locale is supported
  if (!unsupportedLocale) {
    return
  }
  // Load the polyfill 1st BEFORE loading data
  await import('@formatjs/intl-datetimeformat/polyfill-force')

  // Parallelize CLDR data loading
  const dataPolyfills = [
    import('@formatjs/intl-datetimeformat/add-all-tz'),
    import(`@formatjs/intl-datetimeformat/locale-data/${unsupportedLocale}`)
  ]
  await Promise.all(dataPolyfills)
}
