import { useEffect } from 'react'
import { fetchEdege, HeadElement, HtmlELement, ScriptElement } from '@ranger-theme/adobe-edege'

const url: string = process.env.NEXT_PUBLIC_EDEGE_URL
const host: string = process.env.NEXT_PUBLIC_HOST_URL

const Home = ({ html }: { html: string }) => {
  useEffect(() => {
    window?.edegeLoadPage?.()
  }, [])

  return (
    <div>
      <HeadElement host={host} html={html} url={url} />
      <ScriptElement html={html} url={url} />
      <div>
        <HtmlELement html={html} url={url} />
      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  const html = await fetchEdege({
    api: `${process.env.NEXT_PUBLIC_HOST_URL}api/edege`,
    url
  })

  return {
    html
  }
}

export default Home
