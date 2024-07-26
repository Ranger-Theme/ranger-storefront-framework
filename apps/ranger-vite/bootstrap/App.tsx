import { useState } from 'react'
import { useCookie } from '@ranger-theme/hooks'
import { CountDown } from '@ranger-theme/ui'

import './App.css'

const App = () => {
  const { cookie } = useCookie()
  const [count, setCount] = useState<number>(0)
  console.info(cookie.getItem('access_token'))

  return (
    <>
      <CountDown date={Date.now() + 10000} />
      <div>
        <a href="https://vitejs.dev">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((value) => value + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
