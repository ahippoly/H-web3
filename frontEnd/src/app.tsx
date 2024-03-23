import { useState } from 'react'
import { ReactComponent as Logo } from './logo.svg'
import './app.scss'
import NavBar from './components/General/NavBar'
import { Web3ModalProvider } from './components/General/Web3ModalProvider'

export function App () {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Web3ModalProvider>
        <NavBar />
      </Web3ModalProvider>
    </div>
  )
}
