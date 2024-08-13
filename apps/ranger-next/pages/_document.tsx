import type { HelmetData } from 'react-helmet'
import { Helmet } from 'react-helmet'
import type { DocumentContext, DocumentInitialProps, DocumentProps } from 'next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'
// import Script from 'next/script'

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
      // <Html lang="en" style={{ fontSize: this.props.deviceType === 'H5' ? '50px' : '100px' }}>
      <Html {...this.helmetHtmlAttr}>
        <Head>
          <meta name="robots" content="INDEX,FOLLOW" />
          <meta name="google" content="notranslate" />
          <link rel="preload" href="/styles/styles.css" as="style" />
          {...this.helmetHead}
        </Head>
        <body {...this.helmetBodyAttr}>
          {/* <Script
            id="__html_font_size__"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              !(function(w) {
                var t = w.document,
                  n = t.documentElement,
                  a = 'orientationchange' in w ? 'orientationchange' : 'resize',
                  d = function() {
                    var e = w.innerWidth || 1200;
                    if (e <= 1200) {
                      n.style.fontSize = e / 7.5 + 'px';
                    } else {
                      n.style.fontSize = e / 19.2 + 'px'
                    }
                  };
                if (t.readyState === 'loading') d();
                document.documentElement.addEventListener(\"touchmove\",function(event){
                  if (event.touches.length > 1) event.preventDefault();
                }, false);
                t.addEventListener && (w.addEventListener(a, d, !1), 'interactive' === t.readyState || t.addEventListener('DOMContentLoaded', function() {
                  setTimeout(d);
                }, !1));
              })(window);
            `
            }}
          /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextDocument
