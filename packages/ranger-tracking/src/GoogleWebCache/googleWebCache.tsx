import type { FC } from 'react'

export interface GoogleWebCacheProps {
  origins?: string[]
}

const GoogleWebCache: FC<GoogleWebCacheProps> = ({
  origins = ['https://webcache.googleusercontent.com']
}) => {
  const getScriptTag = () => {
    return {
      __html: `
        if (${origins}.includes(window.location.origin)) {
          window.OhistoryReplaceState = window.history['replaceState'];
          window.history['replaceState'] = (...args)=> {
            try {
              return window.OhistoryReplaceState.apply(window.history, args);
            } catch (e) {
              console.log(e);
            }
          };
          window.OhistoryPushState = window.history['pushState'];
          window.history['pushState'] = (...args)=> {
            try {
              return window.OhistoryPushState.apply(window.history, args);
            } catch (e) {
              console.log(e);
            }
          };
        }
      `
    }
  }

  return <script dangerouslySetInnerHTML={getScriptTag()} />
}

export default GoogleWebCache
