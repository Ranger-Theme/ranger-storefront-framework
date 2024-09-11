import { useRef } from 'react'
import { fetchEdege, HeadElement, HtmlELement, ScriptElement } from '@ranger-theme/adobe-edege'

const url: string = process.env.NEXT_PUBLIC_EDEGE_URL
const host: string = process.env.NEXT_PUBLIC_HOST_URL

const Home = ({ html }: { html: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div>
      <HeadElement host={host} html={html} url={url} />
      <ScriptElement html={html} url={url} />
      <div ref={ref}>
        <HtmlELement html={html} url={url} />
      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  const isServer: boolean = typeof window === 'undefined'
  const apiPath: string = isServer ? process.env.NEXT_PUBLIC_HOST_URL : `${window.location.origin}/`

  const html = await fetchEdege({
    api: `${apiPath}api/edege`,
    url
  })

  return {
    html
  }
}

export default Home
