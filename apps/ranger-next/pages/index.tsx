import { fetchEdege, HeadElement, HtmlELement, ScriptElement } from '@ranger-theme/adobe-edege'
import type { NextPageContext } from 'next/types'

const url: string = 'https://main--aem-block-collection--adobe.hlx.live'

const Home = ({ html }: { html: string }) => {
  return (
    <div>
      <HeadElement html={html} />
      <ScriptElement html={html} url={url} />
      <div>
        <HtmlELement html={html} url={url} />
      </div>
    </div>
  )
}

Home.getInitialProps = async ({ pathname }: NextPageContext) => {
  console.info('pathname:', pathname)
  const html = await fetchEdege({
    url: url + '/block-collection/modal'
    // url
  })

  return {
    html
  }
}

export default Home
