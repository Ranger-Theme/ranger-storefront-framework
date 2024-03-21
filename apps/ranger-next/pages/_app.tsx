import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps, ...props }: AppProps) => {
  return (
    <AppCacheProvider {...props}>
      <Component {...pageProps} />
    </AppCacheProvider>
  )
}

export default App
