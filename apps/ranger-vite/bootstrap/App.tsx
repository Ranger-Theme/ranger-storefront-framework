import { useState } from 'react'

import TinymceEditor from '@/components/TinymceEditor'

import './App.css'

const App = () => {
  const [html, setHtml] = useState<string>('')

  const onEditorChange = (content: string) => {
    setHtml(content)
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <TinymceEditor onEditorChange={onEditorChange} />
    </>
  )
}

export default App
