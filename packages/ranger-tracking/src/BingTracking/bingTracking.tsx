import type { FC } from 'react'

export interface BingTrackingProps {
  id: string
}

const BingTracking: FC<BingTrackingProps> = ({ id }) => {
  const getScriptTag = () => {
    return {
      __html: `
        (function(w,d,t,r,u){
          var f,n,i;
          w[u]=w[u]||[],f=function() {
            var o={ti: ${id}, enableAutoSpaTracking: true};
            o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")
          },
          n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){
            var s=this.readyState;
            s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)
          },
          i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)
        })(window,document,"script","//bat.bing.com/bat.js","uetq");
      `
    }
  }

  return <script dangerouslySetInnerHTML={getScriptTag()} />
}

export default BingTracking
