import { withApollo } from '@ranger-theme/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import Header from '@/components/Header'

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
      <div>
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}

  return { pageProps }
}

export default withApollo(App)
