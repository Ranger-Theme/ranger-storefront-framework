import type { FC, ReactNode } from 'react'
import type { MessageFormatElement } from 'react-intl'
import { IntlProvider } from 'react-intl'

export interface LocaleProviderProps {
  children: ReactNode
  messages: Record<string, MessageFormatElement[]> | Record<string, string>
  locale: string
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

  return (
    <IntlProvider messages={messages} locale={locale} onError={onIntlError} {...props}>
      {children}
    </IntlProvider>
  )
}

export default LocaleProvider
