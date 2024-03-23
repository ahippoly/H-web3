import { useState } from 'react'
import { ReactComponent as Logo } from './logo.svg'
import './app.scss'
import NavBar from './components/General/NavBar'
import { Web3ModalProvider } from './components/General/Web3ModalProvider'
import MuiThemeProvider from './components/General/MuiThemeProvider'
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import CreateNft from './pages/CreateNft'
import { Stack } from '@mui/material'

export function App () {
  return (
    <MuiThemeProvider>
      <Web3ModalProvider>
        <BrowserRouter>
          <Stack direction='column' sx={{ height: '100%', maxHeight: '100%' }}>
            <NavBar />
            <Stack direction='column' gap={2} p={3} flexGrow={1} justifyContent='center' minHeight={0}>
              <Routes>
                <Route path='/' element={<CreateNft />} />
              </Routes>
            </Stack>
          </Stack>
        </BrowserRouter>
      </Web3ModalProvider>
    </MuiThemeProvider>
  )
}