import Script from 'next/script'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext, DocumentProps, DocumentInitialProps } from 'next/document'

class NextDocument extends Document<DocumentProps & { deviceType: string }> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { deviceType: string }> {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)
    const deviceType = (ctx.req?.headers['x-device-type'] as string) ?? 'PC'

    return { ...initialProps, deviceType }
  }

  render() {
    return (
      <Html lang="en" style={{ fontSize: this.props.deviceType === 'H5' ? '50px' : '100px' }}>
        <Head>
          <meta name="robots" content="INDEX,FOLLOW" />
        </Head>
        <body>
          <Script
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
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextDocument
