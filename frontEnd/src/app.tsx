import { useState } from 'react'
import { ReactComponent as Logo } from './logo.svg'
import './app.css'

export function App () {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <header className='App-header'>
        <Logo className='App-logo' title='logo' />
        <p>Hello Vite + React!</p>
        <p>
          <button type='button' onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
    </div>
  )
}
