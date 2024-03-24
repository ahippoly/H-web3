import { Box, Button, Stack, Typography } from '@mui/material'
import logoLetter from '@/assets/logo_letter.png'
import logoIcon from '@/assets/logo_icon.png'
import logoIconRight from '@/assets/icon_right_side.png'
import logoIconLeft from '@/assets/left_side.png'
import cube3D from '@/assets/cube3D.png'
import spring3D from '@/assets/spring 3D.png'
import { NavLink } from 'react-router-dom'

function HomePage () {
  return (
    <Box
      textAlign='center'
    >
      <img
        alt=''
        style={{
          position: 'absolute',
          left: 150,
          top: 120,
        }}
        src={cube3D}
      />
      <img
        alt=''
        style={{
          position: 'absolute',
          right: 80,
          top: 250,
        }}
        src={spring3D}
      />
      <Box
        mt={12}
      >
        <img
          alt=''
          src={logoIconLeft}
        />
        <img
          alt=''
          src={logoLetter}
        />
        <img
          alt=''
          src={logoIconRight}
        />
      </Box>

      <Typography
        maxWidth={1000}
        variant='h2'
        mx='auto'
        mt={12}
        mb={4}
      >The Ultimate NFT Ai generator that track intellectual property
      </Typography>
      <Typography
        color='text.secondary'
        variant='h6'
        mb={15}
      >
        Earn money with your Ai arts, generate crazy NFTs and use exclusive datasets for your models right now
      </Typography>

      <Stack direction='row' gap={2} justifyContent='center'>
        <NavLink to='/create'><Button size='large' variant='contained'> Create NFT </Button></NavLink>
        <NavLink to='/provide'><Button size='large' variant='outlined'>Sell your Datas </Button></NavLink>
      </Stack>
    </Box>
  )
}

export default HomePage
