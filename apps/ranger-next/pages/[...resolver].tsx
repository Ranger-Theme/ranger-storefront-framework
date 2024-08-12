import { useEffect } from 'react'
import { fetchEdege, HeadElement, HtmlELement, ScriptElement } from '@ranger-theme/adobe-edege'
import type { NextPageContext } from 'next/types'
import path from 'path'

const host: string = process.env.NEXT_PUBLIC_HOST_URL

const Resolver = ({ edegeURL, html }: { edegeURL: string; html: string }) => {
  useEffect(() => {
    window?.edegeLoadPage?.()
  }, [])

  return (
    <>
      <HeadElement host={host} html={html} url={edegeURL} />
      <ScriptElement html={html} url={edegeURL} />
      <div>
        <HtmlELement html={html} url={edegeURL} />
      </div>
    </>
  )
}

Resolver.getInitialProps = async ({ asPath }: NextPageContext) => {
  const match: string[] = (asPath || '').split('/').slice(1)
  const pathname: string = match.join('/')
  const url: any = match?.pop()
  const urlKey: string = url.split('.')?.shift() || ''
  const edegeURL: string = process.env.NEXT_PUBLIC_EDEGE_URL
  const extname = path.extname(pathname)

  if (extname) return { edegeURL, html: '', urlKey }

  const html = await fetchEdege({
    api: `${process.env.NEXT_PUBLIC_HOST_URL}api/edege/${pathname}`,
    url: edegeURL
  })

  return {
    edegeURL,
    html,
    urlKey
  }
}

export default Resolver
