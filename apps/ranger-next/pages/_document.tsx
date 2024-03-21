import Script from 'next/script'
import { Html, Head, Main, NextScript } from 'next/document'
import {
  DocumentHeadTags,
  documentGetInitialProps,
  DocumentHeadTagsProps
} from '@mui/material-nextjs/v14-pagesRouter'
import createCache from '@emotion/cache'
import type { DocumentContext, DocumentProps } from 'next/document'

const Document = ({ ...props }: DocumentProps & DocumentHeadTagsProps) => {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
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

Document.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache: createCache({
      key: 'mui'
    })
  })
  return finalProps
}

export default Document
