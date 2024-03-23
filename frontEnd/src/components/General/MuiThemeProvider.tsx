import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#444892',
    },
    secondary: {
      main: '#f8f9f9',
    },
  },
  typography: {
    fontFamily: 'Inter',
    fontWeightLight: 700,
    fontWeightRegular: 700,
    fontWeightMedium: 700,
  },
}

const theme = createTheme(themeOptions)

function MuiThemeProvider ({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default MuiThemeProvider
