import Head from 'next/head'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  console.info('app is start 111...')
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
