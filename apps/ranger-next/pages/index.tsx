import { fetchEdege, HeadElement, HtmlELement, ScriptElement } from '@ranger-theme/adobe-edege'

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
