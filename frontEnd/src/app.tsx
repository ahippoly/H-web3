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
import { Divider, Stack } from '@mui/material'
import SideDrawer from './components/General/SideDrawer'
import ProvideData from './pages/ProvideData'
import GlobalLayout from './layout/GlobalLaout'
import HomePage from './pages/HomePage'

export function App () {
  return (
    <MuiThemeProvider>
      <Web3ModalProvider>
        <BrowserRouter>
          <Stack bgcolor='background.default' direction='column' sx={{ height: '100%', maxHeight: '100%' }}>
            <Routes>
              <Route path='/create' element={<GlobalLayout> <CreateNft /></GlobalLayout>} />
              <Route path='/provide' element={<GlobalLayout><ProvideData /></GlobalLayout>} />
              <Route path='/' element={<HomePage />} />
            </Routes>
          </Stack>
        </BrowserRouter>
      </Web3ModalProvider>
    </MuiThemeProvider>
  )
}
