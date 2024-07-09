import { createRoot } from 'react-dom/client'

import App from './App'
import './index.css'

const renderApp = () => {
  const rootElement: HTMLElement = document.getElementById('root') as HTMLElement
  if (rootElement) createRoot(rootElement).render(<App />)
}

renderApp()
