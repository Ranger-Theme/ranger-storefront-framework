import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { withApollo } from '@ranger-theme/core'
import { CountDown, CopyBoard, Portal, Resizable, HeadRoom } from '@ranger-theme/ui'
import type { AppProps } from 'next/app'

import Header from '@/components/Header'

const CsvLink = dynamic(
  import('@ranger-theme/ui').then((module) => module.CsvLink),
  {
    ssr: false
  }
)
const MediaQuery = dynamic(
  import('@ranger-theme/ui').then((module) => module.MediaQuery),
  {
    ssr: false
  }
)

const App = ({ Component, pageProps }: AppProps) => {
  const componentRef = useRef<any>(null)
  console.info('app is bootstrap...')

  const csvData = [
    ['firstname', 'lastname', 'email'],
    ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
    ['Raed', 'Labes', 'rl@smthing.co.com'],
    ['Yezzi', 'Min l3b', 'ymin@cocococo.com']
  ]

  const onCopy = (text: string) => {
    window.alert(text)
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <div ref={componentRef}>
        <HeadRoom>
          <Header />
        </HeadRoom>
      </div>
      <Component {...pageProps} />
      <div>
        <CountDown date={Date.now() + 10000} />
      </div>
      <CopyBoard text="hello world" onCopy={onCopy}>
        <span>Copy to clipboard</span>
      </CopyBoard>
      <div>
        <CsvLink data={csvData}>Download me</CsvLink>
      </div>
      <Portal selector=".header">
        <span>Logo</span>
      </Portal>
      {/* <Player
        className="react-player"
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        width="100%"
        height="100%"
      /> */}
      <MediaQuery minWidth={1224}>
        <p>You are a desktop or laptop</p>
        <MediaQuery minWidth={1824}>
          <p>You also have a huge screen</p>
        </MediaQuery>
      </MediaQuery>
      <Resizable width={200} height={200} minConstraints={[100, 100]} maxConstraints={[400, 400]}>
        <span>Contents</span>
      </Resizable>
      {/* <div>
        <PrintScreen
          trigger={() => {
            return <p>Print this out!</p>
          }}
          content={() => componentRef.current}
        />
      </div> */}
    </>
  )
}

export default withApollo(App)
