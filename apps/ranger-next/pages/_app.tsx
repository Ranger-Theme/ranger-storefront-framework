import Head from 'next/head'
import { withApollo } from '@ranger-theme/core'
import { CountDown } from '@ranger-theme/ui'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  console.info('app is bootstrap...')

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <CountDown date={Date.now() + 10000} />
      <header>
        <span>Header</span>
      </header>
      <Component {...pageProps} />
    </>
  )
}

export default withApollo(App)
