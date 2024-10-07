import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'
import type { MessageFormatElement } from 'react-intl'
import { IntlProvider } from 'react-intl'
import { getItem, setItem } from '@ranger-theme/utils'

export interface LocaleProviderProps {
  children: ReactNode
  messages: Record<string, MessageFormatElement[]> | Record<string, string>
  locale: string
  storeCode?: string
  currncyCode?: string
}

const LocaleProvider: FC<LocaleProviderProps> = ({ children, messages, locale, ...props }) => {
  const onIntlError = (error: any) => {
    if (messages) {
      if (error.code === 'MISSING_TRANSLATION') {
        console.warn('Missing translation', error.message)
        return
      }
      throw error
    }
  }

  useEffect(() => {
    const cacheStore = getItem(null, 'store_code')

    if (!cacheStore) {
      if (props?.storeCode) setItem(null, 'store_code', props.storeCode)
      if (props?.currncyCode) setItem(null, 'currency_code', props.currncyCode)
    }
  }, [])

  return (
    <IntlProvider messages={messages} locale={locale} onError={onIntlError} {...props}>
      {children}
    </IntlProvider>
  )
}

export default LocaleProvider
