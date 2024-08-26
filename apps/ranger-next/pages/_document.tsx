import type { HelmetData } from 'react-helmet'
import { Helmet } from 'react-helmet'
import { CDNJavascript } from '@ranger-theme/ui'
import type { DocumentContext, DocumentInitialProps, DocumentProps } from 'next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class NextDocument extends Document<DocumentProps & { deviceType: string; helmet: HelmetData }> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { deviceType: string; helmet: HelmetData }> {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)
    const deviceType = (ctx.req?.headers['x-device-type'] as string) ?? 'PC'

    return { ...initialProps, deviceType, helmet: Helmet.renderStatic() }
  }

  get helmetHtmlAttr() {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  get helmetBodyAttr() {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  get helmetHead() {
    return Object.keys(this.props.helmet)
      .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map((el) => this.props.helmet[el].toComponent())
  }

  render() {
    return (
      <Html {...this.helmetHtmlAttr}>
        <Head>
          <meta name="robots" content="INDEX,FOLLOW" />
          <meta name="google" content="notranslate" />
          <link rel="preload" href="/styles/styles.css" as="style" />
          {...this.helmetHead}
          <CDNJavascript
            prodUrl="https://cdnjs.cloudflare.com"
            modules={[
              {
                name: 'react',
                path: '/ajax/libs/react/18.2.0/umd/react.production.min.js',
                defer: true,
                crossOrigin: 'anonymous'
              },
              {
                name: 'react-dom',
                path: '/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
                defer: true,
                crossOrigin: 'anonymous'
              }
            ]}
          />
        </Head>
        <body {...this.helmetBodyAttr}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextDocument
