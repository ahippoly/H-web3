import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Logo from './Logo'
import InfinityLogo from './InfinityLogo'
import logoInsane from '@/assets/LOGO-CR8.png'

export default function NavBar () {
  return (
    <Box>
      <AppBar
        position='static'
        sx={{
          backgroundColor: 'background.default',
          zIndex: 99,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={logoInsane} alt='logo'
              style={{ height: '50px', maxHeight: '50px' }}
            />
          </Box>
          {/* <Logo /> */}
          <w3m-button />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
