import { LocaleProvider, withApollo } from '@ranger-theme/core'
import { NextPerformance } from '@ranger-theme/ui'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import AppLayout from '@/components/AppLayout'

const App = ({ Component, messages, pageProps }: { messages: any } & AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <LocaleProvider locale="en-US" messages={messages}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </LocaleProvider>
      <NextPerformance />
    </>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}
  const locale = 'en_US'
  const i18nJson = await import(`/public/i18n/${locale}.json`)
  const messages = i18nJson.default

  return { messages, pageProps }
}

export default withApollo(App)
