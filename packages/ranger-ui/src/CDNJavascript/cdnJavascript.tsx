import type { FC, ReactNode } from 'react'

export interface CDNJavascriptProps {
  modules: Array<{
    name: string
    path: string
    tag?: string | ReactNode
    async?: boolean
    defer?: boolean
    crossOrigin: 'anonymous' | 'use-credential'
  }>
  prodUrl?: string
}

const CDNJavascript: FC<CDNJavascriptProps> = ({
  modules,
  prodUrl = 'https://cdn.jsdelivr.net'
}) => {
  return (
    <>
      {modules.map((module) => {
        const { crossOrigin, path, defer, async, tag } = module
        const Component: any = tag || 'script'
        const url: string = path.startsWith('http') ? path : `${prodUrl}${path}`

        return (
          <Component
            key={path}
            src={url}
            crossOrigin={crossOrigin}
            defer={defer}
            async={async}
            data-nscript="beforeInteractive"
          />
        )
      })}
    </>
  )
}

export default CDNJavascript
